// Vercel serverless function: POST { type: 'text'|'link', content: string }
// Returns { title, sourceTag, readTime, sentences: string[] }
// Requires env var ANTHROPIC_API_KEY set in the Vercel project.

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function estimateReadTime(sentences) {
  const words = sentences.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 150));
  return `~${minutes} min de audio`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(typeof body === 'string' ? body : '{}'); } catch (e) { body = {}; }
  }
  const { type, content } = body || {};
  if (!content || !content.trim()) {
    res.status(400).json({ error: 'Falta contenido para limpiar.' });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'Falta configurar ANTHROPIC_API_KEY en el proyecto de Vercel.' });
    return;
  }

  let rawText = String(content).slice(0, 9000);
  let sourceTag = 'Texto pegado';

  try {
    if (type === 'link') {
      const url = content.trim();
      let hostname = 'link';
      try { hostname = new URL(url).hostname; } catch (e) {}
      sourceTag = hostname;
      const pageResp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (KodamaVirtual)' } });
      if (!pageResp.ok) {
        res.status(502).json({ error: `No se pudo abrir el link (${pageResp.status}).` });
        return;
      }
      const html = await pageResp.text();
      rawText = stripHtml(html).slice(0, 9000);
    }

    const prompt = `Sos un extractor de contenido. Te paso texto crudo copiado de una página web o pegado por un usuario. Puede tener menús de navegación, publicidad, banners de cookies, botones de compartir, notas de "artículos relacionados", comentarios y pies de página.

Devolvé SOLO un objeto JSON válido, sin texto adicional antes ni después, con esta forma exacta:
{"title": "título del contenido principal", "sentences": ["oración o párrafo corto 1", "oración o párrafo corto 2", "..."]}

Reglas:
- "sentences" es el cuerpo del contenido principal limpio, dividido en oraciones o párrafos cortos, en el mismo idioma del original.
- No agregues, resumas ni parafrasees nada del contenido original: solo quitá el ruido (menús, publicidad, cookies, compartir, relacionados, pies de página, comentarios, metadatos).
- Si no encontrás un título claro, usá las primeras palabras del contenido.

Texto crudo:
"""
${rawText}
"""`;

    const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 1400,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      res.status(502).json({ error: `Error del modelo: ${errText.slice(0, 200)}` });
      return;
    }

    const aiData = await aiResp.json();
    const textOut = (aiData.content || []).map((b) => b.text || '').join('');
    const jsonStart = textOut.indexOf('{');
    const jsonEnd = textOut.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) {
      res.status(502).json({ error: 'El modelo no devolvió un resultado interpretable.' });
      return;
    }
    const parsed = JSON.parse(textOut.slice(jsonStart, jsonEnd + 1));
    const sentences = Array.isArray(parsed.sentences) ? parsed.sentences.filter(Boolean) : [];
    if (sentences.length === 0) {
      res.status(502).json({ error: 'No se encontró contenido para leer.' });
      return;
    }

    res.status(200).json({
      title: parsed.title || 'Sin título',
      sourceTag,
      readTime: estimateReadTime(sentences),
      sentences,
      dirtyText: rawText.slice(0, 4000)
    });
  } catch (err) {
    res.status(500).json({ error: 'Error inesperado: ' + err.message });
  }
};
