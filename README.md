# Kodama Virtual — app web (Vercel)

Lector de texto: pegás texto sucio de una página, un link, o subís un .txt. Un modelo de Claude limpia el contenido (saca menús, publicidad, cookies, relacionados) y lo lee en voz alta con la síntesis de voz del navegador.

## Qué incluye
- `index.html`, `app.css`, `app.js`, `tokens.css` — frontend estático, sin build, sin frameworks.
- `api/clean.js` — función serverless de Vercel que llama a la API de Claude para limpiar el texto/artículo.
- Lectura en voz alta: Web Speech API del navegador (gratis, sin backend).
- "Recientes": se guarda en `sessionStorage` (se borra al cerrar la pestaña, a propósito).
- Ajustes (velocidad, modo oscuro, reproducción en segundo plano por defecto): en `localStorage`, persisten entre visitas.

## Cómo subirlo a Vercel

### 1. Subí esta carpeta a GitHub
```
cd vercel-app
git init
git add .
git commit -m "Kodama Virtual"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/kodama-virtual.git
git push -u origin main
```
(Creá el repo vacío en GitHub primero, o usá `gh repo create`.)

### 2. Importalo en Vercel
1. Entrá a vercel.com → **Add New → Project**.
2. Elegí el repo `kodama-virtual`.
3. Framework preset: **Other** (es HTML/JS plano, no hace falta build command).
4. Andá a **Environment Variables** y agregá:
   - `ANTHROPIC_API_KEY` = tu clave de la API de Anthropic (console.anthropic.com → API Keys).
5. Deploy.

Listo — Vercel sirve `index.html`/`app.css`/`app.js` como estáticos y `api/clean.js` como función serverless en `/api/clean` automáticamente, sin configuración adicional.

### 3. Probarlo
Abrí la URL que te da Vercel, pegá texto de ejemplo o un link, y tocá "Limpiar y continuar" → "Escuchar".

## Limitaciones a tener en cuenta
- **PDF**: no está implementado en este MVP (solo `.txt`). Agregar soporte requiere una librería de parseo de PDF en el servidor (ej. `pdf-parse`) dentro de `api/clean.js`.
- **Reproducción en segundo plano**: el navegador puede pausar la síntesis de voz si cerrás la pestaña o bloqueás el celular, según el navegador/SO. Para segundo plano real (con la app cerrada) hace falta generar audio real (TTS a archivo) y reproducirlo con la Media Session API — no está incluido acá.
- **Compartir desde otra app**: no está implementado (requiere configurar la app como PWA con Web Share Target API, o apps nativas). El botón "Compartir" mencionado en la pantalla de Nuevo es un placeholder de la idea.
- **Costo**: cada "Limpiar y continuar" hace una llamada a la API de Claude — revisá tu uso/facturación en console.anthropic.com.
- **Voces**: la voz depende del navegador/SO del usuario (Web Speech API); no hay control sobre qué voz específica usa.

## Estructura
```
vercel-app/
  index.html
  app.css       — estilos de layout de la app
  tokens.css    — tokens del design system (colores, tipografía, espaciado)
  app.js        — toda la lógica: pantallas, estado, TTS, llamadas a /api/clean
  api/clean.js  — función serverless (limpieza con Claude)
  package.json
```
