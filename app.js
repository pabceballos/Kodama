(function () {
  'use strict';

  var SAMPLE_DIRTY = "Inicio > Tecnología > Ciencia\n\nÚLTIMA HORA: Suscribite a nuestro boletín y no te pierdas nada\n\nLos volcanes submarinos podrían albergar más vida de la que pensábamos\nPor Redacción Ciencia · Actualizado hace 3 horas · 6 min de lectura\n\nPUBLICIDAD\n\nCompartir: Facebook | Twitter | WhatsApp | Copiar link\n\nUn nuevo estudio publicado esta semana revela que los volcanes submarinos, lejos de ser entornos hostiles, funcionan como refugios para ecosistemas complejos. Los investigadores documentaron colonias de bacterias termófilas y crustáceos adaptados a temperaturas extremas cerca de las chimeneas hidrotermales.\n\nTE PUEDE INTERESAR\n- Descubren una nueva especie de pulpo en la fosa de las Marianas\n- Por qué el fondo del océano sigue siendo un misterio\n\nEl equipo, liderado por la oceanógrafa Marina Solís, utilizó un sumergible robótico para explorar profundidades de hasta 2.400 metros en el Pacífico sur. Las imágenes captadas muestran estructuras minerales nunca antes registradas.\n\nEste sitio usa cookies para mejorar tu experiencia. Aceptar | Más información\n\nLos hallazgos podrían cambiar la forma en que los científicos entienden el origen de la vida en la Tierra, ya que estos ambientes comparten condiciones con las que existían hace miles de millones de años.\n\n© 2026 Todos los derechos reservados. Términos y condiciones.";

  var ICON = {
    back: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
    clipboard: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><rect x="6" y="4" width="12" height="18"/><path d="M9 4V2h6v2"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>',
    link: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><rect x="3" y="9" width="8" height="6"/><rect x="13" y="9" width="8" height="6"/><path d="M11 12h2"/></svg>',
    upload: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    chevron: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:.4"><path d="M9 6l6 6-6 6"/></svg>',
    share: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:.6"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-4.6"/><path d="M8.2 13.2l7.6 4.6"/></svg>',
    play: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M7 5v14l12-7z"/></svg>',
    pause: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>',
    headphones: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7"/><rect x="17" y="14" width="5" height="7"/></svg>',
    home: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    sliders: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="18" r="1.8"/><path d="M4 6h5"/><path d="M15 6h5"/><path d="M4 12h5"/><path d="M15 12h5"/><path d="M4 18h5"/><path d="M15 18h5"/></svg>'
  };

  var SPEEDS = [0.75, 1, 1.25, 1.5, 2];

  function loadDefaults() {
    try { return Object.assign({ speed: 1, darkReading: false, bgPlayback: true }, JSON.parse(localStorage.getItem('kv_defaults') || '{}')); }
    catch (e) { return { speed: 1, darkReading: false, bgPlayback: true }; }
  }
  function saveDefaults() { localStorage.setItem('kv_defaults', JSON.stringify(state.defaults)); }
  function loadRecientes() {
    try { return JSON.parse(sessionStorage.getItem('kv_recientes') || '[]'); }
    catch (e) { return []; }
  }
  function saveRecientes() { sessionStorage.setItem('kv_recientes', JSON.stringify(state.recientes)); }

  var defaults = loadDefaults();
  var state = {
    screen: 'home', activeTab: 'nuevo',
    pasteInput: '', linkInput: '',
    loading: false, error: null,
    article: null, reviewView: 'limpio', cleanedEditable: '',
    playing: false, currentSentence: 0, speed: defaults.speed,
    highlightOn: true, darkReading: defaults.darkReading, bgPlayback: defaults.bgPlayback,
    recientes: loadRecientes(), defaults: defaults
  };

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function segControl(name, options) {
    return '<div class="seg">' + options.map(function (o) {
      return '<label class="seg-opt" style="flex:1;justify-content:center"><input type="radio" name="' + name + '" ' + (o.checked ? 'checked' : '') + ' data-action="' + o.action + '" data-value="' + o.value + '">' + o.label + '</label>';
    }).join('') + '</div>';
  }

  function screenHome() {
    return '<h4 style="margin-bottom:2px">Nuevo</h4>' +
      '<p class="kv-muted" style="font-size:13px;margin-bottom:16px">Elegí cómo vas a traer el contenido.</p>' +
      '<div style="display:flex;flex-direction:column;gap:12px">' +
      '<button class="kv-card-btn" data-action="open-paste-text">' + ICON.clipboard + '<div style="flex:1"><div class="card-title" style="font-size:15px">Pegar texto</div><div class="card-body">Texto copiado de una página web</div></div>' + ICON.chevron + '</button>' +
      '<button class="kv-card-btn" data-action="open-paste-link">' + ICON.link + '<div style="flex:1"><div class="card-title" style="font-size:15px">Pegar un link</div><div class="card-body">Kodama abre la página y lee el artículo</div></div>' + ICON.chevron + '</button>' +
      '<button class="kv-card-btn" data-action="open-upload-file">' + ICON.upload + '<div style="flex:1"><div class="card-title" style="font-size:15px">Subir archivo</div><div class="card-body">TXT (PDF: próximamente)</div></div>' + ICON.chevron + '</button>' +
      '</div><hr class="hr">' +
      '<div style="display:flex;gap:12px;align-items:flex-start">' + ICON.share +
      '<p class="kv-muted" style="font-size:12.5px;margin:0">También podés compartir texto o un link desde cualquier otra app usando el botón Compartir y eligiendo Kodama Virtual.</p></div>';
  }

  function screenPasteText() {
    return errorBanner() + '<div class="field"><label>Texto copiado</label>' +
      '<textarea class="input" id="paste-input" placeholder="Pegá aquí el texto copiado de la página…" style="min-height:340px;font-size:13px">' + esc(state.pasteInput) + '</textarea>' +
      '<p class="kv-muted" style="font-size:12px;margin-top:8px">Incluí todo tal cual lo copiaste — Kodama descarta menús, publicidad y notas relacionadas.</p>' +
      '<button class="btn btn-primary btn-block" data-action="clean-text">Limpiar y continuar</button></div>';
  }

  function screenPasteLink() {
    return errorBanner() + '<div class="field"><label>URL</label>' +
      '<input class="input" type="text" id="link-input" placeholder="https://ejemplo.com/articulo" value="' + esc(state.linkInput) + '">' +
      '<p class="kv-muted" style="font-size:12px;margin-top:8px">Kodama abre la página, descarta lo que no es el artículo y prepara el audio.</p>' +
      '<button class="btn btn-primary btn-block" data-action="clean-link">Leer desde el link</button></div>';
  }

  function screenUploadFile() {
    return errorBanner() + '<div style="border:2px dashed var(--color-divider);padding:32px 16px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center">' +
      ICON.upload + '<p class="kv-muted" style="margin:0;font-size:13px">TXT por ahora (PDF: próximamente)</p>' +
      '<input type="file" id="file-input" accept=".txt" style="display:none">' +
      '<button class="btn btn-secondary" data-action="pick-file">Elegir archivo</button></div>';
  }

  function screenLoading(msg) {
    return '<div class="kv-loading"><div class="kv-spinner"></div><p class="kv-muted" style="font-size:13px">' + esc(msg) + '</p></div>';
  }

  function errorBanner() {
    if (!state.error) return '';
    return '<div class="kv-error">' + esc(state.error) + '</div>';
  }

  function screenReview() {
    var a = state.article;
    return errorBanner() +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px"><span class="tag tag-accent">' + esc(a.sourceTag) + '</span><span class="tag tag-neutral">' + esc(a.readTime) + '</span></div>' +
      '<h5 style="margin-bottom:12px">' + esc(a.title) + '</h5>' +
      segControl('reviewview', [
        { label: 'Limpio', value: 'limpio', action: 'set-view', checked: state.reviewView === 'limpio' },
        { label: 'Original', value: 'original', action: 'set-view', checked: state.reviewView === 'original' }
      ]) +
      '<div style="margin-top:12px">' +
      (state.reviewView === 'limpio'
        ? '<textarea class="input" id="cleaned-editable" style="min-height:320px;font-size:13.5px;line-height:1.5">' + esc(state.cleanedEditable) + '</textarea>'
        : '<div class="input" style="min-height:320px;font-size:12.5px;line-height:1.5;white-space:pre-wrap;opacity:.65;overflow-y:auto">' + esc(a.dirtyText || '') + '</div>') +
      '</div>' +
      '<button class="btn btn-primary btn-block" data-action="go-player">Escuchar</button>';
  }

  function screenPlayer() {
    var a = state.article;
    var sentencesHtml = a.sentences.map(function (text, i) {
      var isHi = state.highlightOn && state.playing && i === state.currentSentence;
      var style = isHi
        ? (state.darkReading ? 'background:var(--color-accent-500);color:#1a1210' : 'background:var(--color-accent-100);color:var(--color-accent-800)')
        : (state.darkReading ? 'color:rgba(255,255,255,.82)' : 'color:var(--color-text)');
      return '<p class="kv-sentence" style="' + style + '">' + esc(text) + '</p>';
    }).join('');
    var total = a.sentences.length;
    var progress = total > 1 ? Math.round((state.currentSentence / (total - 1)) * 100) : (state.playing ? 100 : 0);
    var activeBtn = 'background:var(--color-accent);color:var(--color-bg);border-color:var(--color-accent)';
    return '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px"><span class="tag tag-accent">' + esc(a.sourceTag) + '</span></div>' +
      '<h5 style="margin-bottom:16px">' + esc(a.title) + '</h5>' +
      '<div style="margin-bottom:16px">' + sentencesHtml + '</div>' +
      '<div style="height:3px;background:var(--color-divider);margin-bottom:16px"><div style="height:3px;background:var(--color-accent);width:' + progress + '%"></div></div>' +
      '<div style="display:flex;align-items:center;justify-content:center;margin-bottom:16px">' +
      '<button class="btn btn-icon" style="width:56px;height:56px;background:var(--color-accent);color:var(--color-bg)" data-action="toggle-play">' + (state.playing ? ICON.pause : ICON.play) + '</button></div>' +
      segControl('speed', SPEEDS.map(function (v) { return { label: v + 'x', value: v, action: 'set-speed', checked: state.speed === v }; })) +
      '<div style="display:flex;gap:8px;margin-top:12px">' +
      '<button class="btn btn-secondary" style="flex:1;' + (state.highlightOn ? activeBtn : '') + '" data-action="toggle-highlight">Resaltar</button>' +
      '<button class="btn btn-icon btn-secondary" style="' + (state.darkReading ? activeBtn : '') + '" data-action="toggle-dark">' + ICON.moon + '</button>' +
      '<button class="btn btn-icon btn-secondary" style="' + (state.bgPlayback ? activeBtn : '') + '" data-action="toggle-bg">' + ICON.headphones + '</button>' +
      '</div>' +
      (state.bgPlayback ? '<p class="kv-muted" style="font-size:11.5px;margin-top:8px">Sigue sonando si no cerrás la pestaña.</p>' : '');
  }

  function screenRecientes() {
    if (state.recientes.length === 0) {
      return '<h4 style="margin-bottom:2px">Recientes</h4><p class="kv-muted" style="font-size:12.5px;margin-bottom:16px">Solo de esta sesión — se borran al cerrar la pestaña.</p>' +
        '<p class="kv-muted" style="font-size:13px">Todavía no escuchaste nada en esta sesión.</p>';
    }
    return '<h4 style="margin-bottom:2px">Recientes</h4><p class="kv-muted" style="font-size:12.5px;margin-bottom:16px">Solo de esta sesión — se borran al cerrar la pestaña.</p>' +
      '<div style="display:flex;flex-direction:column;gap:8px">' +
      state.recientes.map(function (r, i) {
        return '<button class="kv-card-btn" data-action="reopen" data-value="' + i + '"><div style="flex:1"><div class="card-title" style="font-size:14px">' + esc(r.article.title) + '</div><div class="card-meta">' + esc(r.article.sourceTag) + ' · ' + esc(r.article.readTime) + '</div></div>' + ICON.play + '</button>';
      }).join('') + '</div>';
  }

  function screenAjustes() {
    return '<h4 style="margin-bottom:16px">Ajustes</h4>' +
      '<div class="field" style="margin-bottom:16px"><label>Velocidad predeterminada</label>' +
      segControl('defspeed', SPEEDS.map(function (v) { return { label: v + 'x', value: v, action: 'set-default-speed', checked: state.defaults.speed === v }; })) + '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--color-divider)">' +
      '<div><div style="font-size:14px">Modo oscuro para leer</div><div class="kv-muted" style="font-size:12px">Activado por defecto en el reproductor</div></div>' +
      segControl('defdark', [{ label: 'Sí', value: '1', action: 'set-default-dark', checked: state.defaults.darkReading === true }, { label: 'No', value: '0', action: 'set-default-dark', checked: state.defaults.darkReading === false }]) + '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--color-divider);border-bottom:1px solid var(--color-divider);margin-bottom:16px">' +
      '<div><div style="font-size:14px">Reproducción en segundo plano</div><div class="kv-muted" style="font-size:12px">Seguir escuchando fuera de la app</div></div>' +
      segControl('defbg', [{ label: 'Sí', value: '1', action: 'set-default-bg', checked: state.defaults.bgPlayback === true }, { label: 'No', value: '0', action: 'set-default-bg', checked: state.defaults.bgPlayback === false }]) + '</div>' +
      '<p class="kv-muted" style="font-size:12px">Kodama Virtual · v0.1</p>';
  }

  var TITLES = { home: 'Nuevo', pasteText: 'Pegar texto', pasteLink: 'Pegar un link', uploadFile: 'Subir archivo', review: 'Revisar', player: 'Escuchando', recientes: 'Recientes', ajustes: 'Ajustes' };

  function render() {
    var app = document.getElementById('app');
    if (state.screen === 'onboarding') {
      app.innerHTML = '<div class="kv-shell"><div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;padding:32px 24px;box-sizing:border-box">' +
        '<div><div style="width:44px;height:44px;background:var(--color-accent)"></div>' +
        '<h6 style="margin-top:16px;color:var(--color-accent-700)">Lector de texto</h6>' +
        '<h1 style="font-size:34px;margin-top:8px">Kodama Virtual</h1></div>' +
        '<div><p style="opacity:.8;font-size:15px">Pegá un texto copiado de cualquier página, o un link. Kodama limpia el ruido — publicidad, menús, notas relacionadas — y te lo lee en voz alta.</p>' +
        '<hr class="hr"><button class="btn btn-primary btn-block" data-action="go-home">Empezar</button></div></div></div>';
      return;
    }
    var showBack = ['pasteText', 'pasteLink', 'uploadFile', 'review', 'player'].indexOf(state.screen) !== -1;
    var showTabs = ['home', 'recientes', 'ajustes'].indexOf(state.screen) !== -1;
    var content;
    if (state.loading) content = screenLoading(state.loadingMsg || 'Limpiando el contenido…');
    else if (state.screen === 'home') content = screenHome();
    else if (state.screen === 'pasteText') content = screenPasteText();
    else if (state.screen === 'pasteLink') content = screenPasteLink();
    else if (state.screen === 'uploadFile') content = screenUploadFile();
    else if (state.screen === 'review') content = screenReview();
    else if (state.screen === 'player') content = screenPlayer();
    else if (state.screen === 'recientes') content = screenRecientes();
    else if (state.screen === 'ajustes') content = screenAjustes();

    var activeColor = 'var(--color-accent-700)', inactiveColor = 'var(--color-neutral-600)';
    var tabbar = showTabs ? '<div class="kv-tabbar">' +
      '<button class="kv-tab" style="color:' + (state.activeTab === 'nuevo' ? activeColor : inactiveColor) + '" data-action="tab-nuevo">' + ICON.home + '<span>Nuevo</span></button>' +
      '<button class="kv-tab" style="color:' + (state.activeTab === 'recientes' ? activeColor : inactiveColor) + '" data-action="tab-recientes">' + ICON.clock + '<span>Recientes</span></button>' +
      '<button class="kv-tab" style="color:' + (state.activeTab === 'ajustes' ? activeColor : inactiveColor) + '" data-action="tab-ajustes">' + ICON.sliders + '<span>Ajustes</span></button>' +
      '</div>' : '';

    app.innerHTML = '<div class="kv-shell' + (state.screen === 'player' && state.darkReading ? ' kv-dark' : '') + '">' +
      '<div class="kv-header">' + (showBack ? '<button class="btn btn-icon" data-action="back" aria-label="Volver">' + ICON.back + '</button>' : '') +
      '<div class="kv-title">' + esc(TITLES[state.screen] || '') + '</div></div>' +
      '<div class="kv-content">' + content + '</div>' + tabbar + '</div>';
  }

  // ---- TTS ----
  var synth = window.speechSynthesis;
  function speakFrom(index) {
    synth.cancel();
    var a = state.article;
    if (!a || index >= a.sentences.length) { state.playing = false; render(); return; }
    var u = new SpeechSynthesisUtterance(a.sentences[index]);
    u.rate = state.speed; u.lang = 'es-ES';
    u.onend = function () {
      if (!state.playing) return;
      if (index + 1 >= a.sentences.length) { state.playing = false; state.currentSentence = index; render(); return; }
      state.currentSentence = index + 1; render(); speakFrom(index + 1);
    };
    synth.speak(u);
  }
  function togglePlay() {
    if (state.playing) { state.playing = false; synth.cancel(); render(); return; }
    state.playing = true; render(); speakFrom(state.currentSentence);
  }
  function stopPlayback() { state.playing = false; synth.cancel(); }

  // ---- API ----
  function requestClean(type, content, sourceHintText) {
    state.loading = true; state.error = null; state.loadingMsg = type === 'link' ? 'Abriendo el link…' : 'Limpiando el contenido…'; render();
    fetch('/api/clean', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: type, content: content }) })
      .then(function (r) {
        return r.text().then(function (raw) {
          var data;
          try { data = raw ? JSON.parse(raw) : {}; }
          catch (e) { data = { error: 'La función tardó demasiado o devolvió una respuesta vacía. Probá con un texto más corto, o reintentá.' }; }
          return { ok: r.ok, status: r.status, data: data };
        });
      })
      .then(function (res) {
        state.loading = false;
        if (!res.ok) { state.error = res.data.error || res.data.message || ('Error ' + res.status + ' — ' + JSON.stringify(res.data).slice(0, 200)); state.screen = type === 'link' ? 'pasteLink' : (type === 'text' ? 'pasteText' : 'uploadFile'); render(); return; }
        state.article = res.data; state.cleanedEditable = res.data.sentences.join('\n\n'); state.reviewView = 'limpio'; state.error = null; state.screen = 'review'; render();
      })
      .catch(function (err) {
        state.loading = false; state.error = 'Error de red: ' + err.message;
        state.screen = type === 'link' ? 'pasteLink' : (type === 'text' ? 'pasteText' : 'uploadFile'); render();
      });
  }

  // ---- events ----
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.dataset.action, value = el.dataset.value;
    switch (action) {
      case 'go-home': state.screen = 'home'; state.activeTab = 'nuevo'; break;
      case 'open-paste-text': state.error = null; state.screen = 'pasteText'; break;
      case 'open-paste-link': state.error = null; state.screen = 'pasteLink'; break;
      case 'open-upload-file': state.error = null; state.screen = 'uploadFile'; break;
      case 'back': stopPlayback(); state.error = null; state.screen = 'home'; state.activeTab = 'nuevo'; break;
      case 'clean-text': requestClean('text', state.pasteInput); return;
      case 'clean-link': requestClean('link', state.linkInput); return;
      case 'pick-file': document.getElementById('file-input').click(); return;
      case 'set-view': state.reviewView = value; break;
      case 'go-player':
        var art = state.article;
        state.recientes = [{ article: art }].concat(state.recientes); saveRecientes();
        state.speed = state.defaults.speed; state.darkReading = state.defaults.darkReading; state.bgPlayback = state.defaults.bgPlayback;
        state.currentSentence = 0; state.playing = false; state.screen = 'player'; break;
      case 'toggle-play': togglePlay(); return;
      case 'set-speed': state.speed = parseFloat(value); if (state.playing) speakFrom(state.currentSentence); break;
      case 'toggle-highlight': state.highlightOn = !state.highlightOn; break;
      case 'toggle-dark': state.darkReading = !state.darkReading; break;
      case 'toggle-bg': state.bgPlayback = !state.bgPlayback; break;
      case 'tab-nuevo': stopPlayback(); state.screen = 'home'; state.activeTab = 'nuevo'; break;
      case 'tab-recientes': stopPlayback(); state.screen = 'recientes'; state.activeTab = 'recientes'; break;
      case 'tab-ajustes': stopPlayback(); state.screen = 'ajustes'; state.activeTab = 'ajustes'; break;
      case 'reopen': var r = state.recientes[parseInt(value, 10)]; state.article = r.article; state.currentSentence = 0; state.playing = false; state.screen = 'player'; break;
      case 'set-default-speed': state.defaults.speed = parseFloat(value); saveDefaults(); break;
      case 'set-default-dark': state.defaults.darkReading = value === '1'; saveDefaults(); break;
      case 'set-default-bg': state.defaults.bgPlayback = value === '1'; saveDefaults(); break;
      default: return;
    }
    render();
  });

  document.addEventListener('change', function (e) {
    if (e.target.id === 'paste-input') state.pasteInput = e.target.value;
    else if (e.target.id === 'link-input') state.linkInput = e.target.value;
    else if (e.target.id === 'cleaned-editable') { state.cleanedEditable = e.target.value; state.article.sentences = e.target.value.split(/\n\n+/).filter(Boolean); }
    else if (e.target.id === 'file-input') {
      var file = e.target.files[0];
      if (!file) return;
      if (!/\.txt$/i.test(file.name)) { state.error = 'Por ahora solo se soportan archivos .txt.'; render(); return; }
      var reader = new FileReader();
      reader.onload = function () { requestClean('text', reader.result); };
      reader.readAsText(file);
    }
  });

  render();
})();
