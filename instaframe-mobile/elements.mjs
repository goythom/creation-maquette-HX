/* elements.mjs — InstaFrame mobile "Les éléments" board.
   Tiny SPA: reads ?screen=&lang=, renders overview or a type screen.
   No network calls, no images, no video. All elements are CSS. */

const TYPES = [
  { id: 'instax',    en: 'Instax Mini',    fr: 'Instax Mini' },
  { id: 'polaroid',  en: 'Polaroid',       fr: 'Polaroid' },
  { id: 'message',   en: 'Message',        fr: 'Message' },
  { id: 'audio',     en: 'Audio',          fr: 'Audio' },
  { id: 'music',     en: 'Music',          fr: 'Music' },
  { id: 'stamps',    en: 'Stamps',         fr: 'Timbres' },
  { id: 'stickers',  en: 'Stickers',       fr: 'Stickers' },
  { id: 'video',     en: 'Video',          fr: 'Vidéo' },
  { id: 'letter',    en: 'Letter',         fr: 'Lettre' },
  { id: 'messages',  en: 'Messages',       fr: 'Messages' },
  { id: 'date',      en: 'Date',           fr: 'Date' },
  { id: 'postcard',  en: 'Postcard',       fr: 'Postcard' },
  { id: 'ticket',    en: 'Concert Ticket', fr: 'Billet de concert' },
  { id: 'strip',     en: 'Photo strip',    fr: 'Photo strip' }
];

const STR = {
  en: {
    brand: 'InstaFrame',
    overviewTitle: 'Your elements',
    download: 'Download',
    addToGallery: '+ Add to Gallery',
    options: 'Options',
    close: 'Close',
    reset: 'Reset',
    upload: 'Replace photo',
    addPhoto: 'Add your photo',
    example: 'Example',
    caption: 'Caption',
    captionSize: 'Caption size',
    format: 'Format',
    skin: 'Skin',
    film: 'Film',
    vhs: 'VHS',
    cam: 'Camcorder',
    instaxMini: 'Instax Mini',
    polaroid: 'Polaroid',
    lang: 'EN'
  },
  fr: {
    brand: 'InstaFrame',
    overviewTitle: 'Vos éléments',
    download: 'Télécharger',
    addToGallery: '+ Ajouter à la galerie',
    options: 'Options',
    close: 'Fermer',
    reset: 'Réinitialiser',
    upload: 'Remplacer la photo',
    addPhoto: 'Ajouter ta photo',
    example: 'Exemple',
    caption: 'Légende',
    captionSize: 'Taille de la légende',
    format: 'Format',
    skin: 'Habillage',
    film: 'Pellicule',
    vhs: 'Cassette',
    cam: 'Caméscope',
    instaxMini: 'Instax Mini',
    polaroid: 'Polaroid',
    lang: 'FR'
  }
};

const state = {
  screen: 'overview',
  lang: 'fr',
  caption: 'Souvenirs',
  captionSize: 24,
  frameFormat: 'instax',   // instax | polaroid
  videoSkin: 'film'        // film | vhs | cam
};

const app = document.getElementById('if-el-app');

// Types that render a photo area (get the on-preview "Add your photo" chip).
const PHOTO_TYPES = new Set(['instax', 'polaroid', 'strip', 'stamps', 'stickers', 'video', 'postcard', 'ticket']);

function t(key) { return (STR[state.lang] || STR.en)[key] || key; }
function typeLabel(type) { return state.lang === 'fr' ? type.fr : type.en; }
function typeById(id) { return TYPES.find(x => x.id === id); }

function readUrl() {
  const p = new URLSearchParams(location.search);
  const s = p.get('screen');
  const l = p.get('lang');
  if (s) state.screen = s;
  if (l === 'en' || l === 'fr') state.lang = l;
}

function writeUrl() {
  const p = new URLSearchParams(location.search);
  p.set('screen', state.screen);
  p.set('lang', state.lang);
  history.replaceState(null, '', location.pathname + '?' + p.toString());
}

function navigate(screen) {
  state.screen = screen;
  writeUrl();
  render();
}

/* ---------- Element renderers ---------- */

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function photo(cls) {
  return el('div', 'if-el-photo ' + (cls || ''));
}

function renderFrame(kind) {
  // kind: 'instax' | 'polaroid' | 'strip'
  const u = kind === 'polaroid' ? 62 : kind === 'strip' ? 62 : 62;
  const card = el('div', 'frame frame--' + (kind === 'strip' ? 'instax-mini frame--strip' : kind === 'polaroid' ? 'polaroid' : 'instax-mini'));
  card.style.setProperty('--u', u + 'px');
  if (kind === 'strip') {
    for (let i = 0; i < 3; i++) card.append(photo('frame__photo'));
  } else {
    card.append(photo('frame__photo'));
  }
  const cap = el('div', 'frame__caption', state.caption);
  // Caption size: (24 * cardWidthPx) / 340
  const cardW = kind === 'polaroid' ? u * 4.48 : u * 4.47;
  const capPx = (state.captionSize * cardW) / 340;
  cap.style.fontSize = capPx.toFixed(2) + 'px';
  card.append(cap);
  return card;
}

function renderPostit() {
  const wrap = el('div', 'if-el-postit');
  wrap.append(el('div', 'if-el-postit-text', 'you & me'));
  return wrap;
}

function renderAudio() {
  const wrap = el('div', 'if-el-audio');
  wrap.append(el('div', 'if-el-audio-art'));
  const wave = el('div', 'if-el-audio-wave');
  for (let i = 0; i < 36; i++) {
    const bar = el('i');
    const h = 12 + ((i * 17) % 40);
    bar.style.height = h + 'px';
    wave.append(bar);
  }
  wrap.append(wave);
  const meta = el('div', 'if-el-audio-meta');
  meta.append(el('div', 'if-el-audio-title', 'Voice message'));
  meta.append(el('div', 'if-el-audio-sub', '0:12'));
  wrap.append(meta);
  wrap.append(el('div', 'if-el-audio-play'));
  return wrap;
}

function renderMusic() {
  const wrap = el('div', 'if-el-music');
  wrap.append(el('div', 'if-el-music-cover'));
  const meta = el('div', 'if-el-music-meta');
  meta.append(el('div', 'if-el-music-title', 'Our song'));
  meta.append(el('div', 'if-el-music-sub', 'The mixtape'));
  wrap.append(meta);
  wrap.append(el('div', 'if-el-music-qr', 'QR'));
  return wrap;
}

function renderStamp() {
  const wrap = el('div', 'if-el-stamp');
  const inner = el('div', 'if-el-stamp-inner');
  inner.append(el('div', 'if-el-stamp-photo'));
  inner.append(el('div', 'if-el-stamp-caption', 'Summer 2026'));
  wrap.append(inner);
  return wrap;
}

function renderSticker() {
  const wrap = el('div', 'if-el-sticker');
  wrap.append(el('div', 'if-el-sticker-shape'));
  return wrap;
}

function renderVideo() {
  const host = el('div', 'vs-skin-host');
  if (state.videoSkin === 'vhs') {
    const vhs = el('div', 'vs-vhs');
    vhs.append(el('div', 'vs-screw tl'));
    vhs.append(el('div', 'vs-screw tr'));
    vhs.append(el('div', 'vs-screw bl'));
    vhs.append(el('div', 'vs-screw br'));
    const top = el('div', 'vs-vhs-top');
    top.append(el('span', '', 'T-120'));
    top.append(el('span', '', 'SP'));
    vhs.append(top);
    const label = el('div', 'vs-vhs-label');
    const stripes = el('div', 'vs-vhs-stripes');
    stripes.append(el('div', 'r'));
    stripes.append(el('div', 'b'));
    label.append(stripes);
    label.append(el('div', 'vs-vhs-title', 'Our first trip'));
    const sub = el('div', 'vs-vhs-sub');
    sub.append(el('span', '', '2026'));
    sub.append(el('span', '', 'PAL'));
    label.append(sub);
    vhs.append(label);
    const win = el('div', 'vs-vhs-window');
    win.append(el('div', 'vs-tape-line'));
    const r1 = el('div', 'vs-reel full');
    r1.append(el('div', 'spokes'));
    r1.append(el('div', 'hub'));
    const r2 = el('div', 'vs-reel');
    r2.append(el('div', 'spokes'));
    r2.append(el('div', 'hub'));
    win.append(r1, r2);
    vhs.append(win);
    const ribs = el('div', 'vs-vhs-ribs');
    for (let i = 0; i < 3; i++) ribs.append(el('i'));
    vhs.append(ribs);
    host.append(vhs);
  } else if (state.videoSkin === 'cam') {
    const cam = el('div', 'vs-cam');
    const screen = el('div', 'vs-cam-screen');
    screen.append(photo());
    screen.append(el('div', 'vs-scanlines'));
    screen.append(el('div', 'vs-cam-corner tl'));
    screen.append(el('div', 'vs-cam-corner tr'));
    screen.append(el('div', 'vs-cam-corner bl'));
    screen.append(el('div', 'vs-cam-corner br'));
    const rec = el('div', 'vs-cam-rec');
    const recInner = el('span', 'vs-rec');
    recInner.append(el('i'));
    recInner.append(document.createTextNode('REC'));
    rec.append(recInner);
    screen.append(rec);
    screen.append(el('div', 'vs-cam-brand', 'INSTAFRAME'));
    screen.append(el('div', 'vs-cam-batt'));
    screen.append(el('div', 'vs-cam-tc', '00:12:04'));
    screen.append(el('div', 'vs-cam-date', '2026-06-14'));
    cam.append(screen);
    const foot = el('div', 'vs-cam-foot');
    foot.append(el('span', '', 'SP'));
    foot.append(el('span', '', 'AUTO'));
    foot.append(el('span', '', 'HD'));
    cam.append(foot);
    host.append(cam);
  } else {
    const film = el('div', 'vs-film');
    const sp1 = el('div', 'vs-sprockets');
    for (let i = 0; i < 12; i++) sp1.append(el('span'));
    film.append(sp1);
    const edge = el('div', 'vs-film-edge');
    edge.append(el('span', 'vs-fo', 'OUR FIRST TRIP'));
    edge.append(el('span', 'vs-film-arrows', '◄ ►'));
    film.append(edge);
    const mid = el('div', 'vs-film-mid');
    mid.append(el('div', 'vs-film-neighbor left'));
    const screen = el('div', 'vs-film-screen');
    screen.append(photo());
    screen.append(el('div', 'vs-play-tri'));
    const rec = el('div', 'vs-film-rec');
    const recInner = el('span', 'vs-rec');
    recInner.append(el('i'));
    recInner.append(document.createTextNode('REC'));
    rec.append(recInner);
    screen.append(rec);
    screen.append(el('div', 'vs-film-tc', '00:12:04'));
    mid.append(screen);
    mid.append(el('div', 'vs-film-neighbor right'));
    film.append(mid);
    const sp2 = el('div', 'vs-sprockets');
    for (let i = 0; i < 12; i++) sp2.append(el('span'));
    film.append(sp2);
    host.append(film);
  }
  return host;
}

function renderLetter() {
  const wrap = el('div', 'if-el-letter');
  wrap.append(el('div', 'if-el-letter-date', '14 June 2026'));
  wrap.append(el('div', 'if-el-letter-rule'));
  const body = el('div', 'if-el-letter-body');
  const p1 = el('p');
  p1.append(el('span', 'dropcap', 'D'));
  p1.append(document.createTextNode('ear you,'));
  body.append(p1);
  body.append(el('p', '', 'I keep thinking of that afternoon by the sea.'));
  body.append(el('p', '', 'Thank you for everything.'));
  wrap.append(body);
  wrap.append(el('div', 'if-el-letter-sign', 'With love'));
  wrap.append(el('div', 'if-el-letter-seal'));
  return wrap;
}

function renderMessages() {
  const wrap = el('div', 'if-el-messages');
  const inner = el('div', 'if-el-messages-inner');
  const top = el('div', 'if-el-messages-top');
  top.append(el('div', 'if-el-messages-name', 'Alex'));
  top.append(el('div', 'if-el-messages-status', 'online'));
  inner.append(top);
  const thread = el('div', 'if-el-messages-thread');
  thread.append(el('div', 'if-el-bubble in', 'Hey! Are you around this weekend?'));
  thread.append(el('div', 'if-el-bubble out', 'Yes — Saturday works.'));
  thread.append(el('div', 'if-el-bubble in', 'Perfect. See you at 3?'));
  thread.append(el('div', 'if-el-bubble out', 'See you then.'));
  inner.append(thread);
  wrap.append(inner);
  return wrap;
}

function renderDate() {
  const wrap = el('div', 'if-el-date');
  wrap.append(el('div', 'if-el-date-label', 'Anniversary'));
  wrap.append(el('div', 'if-el-date-title', 'Our day'));
  wrap.append(el('div', 'if-el-date-month', 'June 2026'));
  const grid = el('div', 'if-el-date-grid');
  ['S','M','T','W','T','F','S'].forEach(d => grid.append(el('div', 'dow', d)));
  // June 2026 starts on Monday (1st). Show 31 days.
  const startOffset = 1; // Sunday=0, Monday=1
  for (let i = 0; i < startOffset; i++) grid.append(el('div', 'day muted', ''));
  for (let d = 1; d <= 30; d++) {
    const cell = el('div', 'day' + (d === 14 ? ' on' : ''), String(d));
    grid.append(cell);
  }
  wrap.append(grid);
  wrap.append(el('div', 'if-el-date-foot', '2026-06-14'));
  return wrap;
}

function renderPostcard() {
  const wrap = el('div', 'if-el-postcard');
  wrap.append(el('div', 'if-el-postcard-photo'));
  wrap.append(el('div', 'if-el-postcard-caption', 'Greetings from Biarritz'));
  return wrap;
}

function renderTicket() {
  const wrap = el('div', 'if-el-ticket');
  wrap.append(el('div', 'if-el-ticket-photo'));
  const main = el('div', 'if-el-ticket-main');
  main.append(el('div', 'if-el-ticket-presenter', 'Live Nation presents'));
  main.append(el('div', 'if-el-ticket-event', 'The Midnight Sun Tour'));
  const meta = el('div', 'if-el-ticket-meta');
  meta.append(el('span', '', '14 June 2026 · 20:00'));
  meta.append(el('span', '', 'Biarritz — Arena'));
  main.append(meta);
  wrap.append(main);
  wrap.append(el('div', 'if-el-ticket-perf'));
  const stub = el('div', 'if-el-ticket-stub');
  stub.append(el('div', 'if-el-ticket-barcode'));
  stub.append(el('div', 'if-el-ticket-serial', 'N° 0426'));
  wrap.append(stub);
  return wrap;
}

function renderElement(id) {
  switch (id) {
    case 'instax':    return renderFrame('instax');
    case 'polaroid':  return renderFrame('polaroid');
    case 'strip':     return renderFrame('strip');
    case 'message':   return renderPostit();
    case 'audio':     return renderAudio();
    case 'music':     return renderMusic();
    case 'stamps':    return renderStamp();
    case 'stickers':  return renderSticker();
    case 'video':     return renderVideo();
    case 'letter':    return renderLetter();
    case 'messages':  return renderMessages();
    case 'date':      return renderDate();
    case 'postcard':  return renderPostcard();
    case 'ticket':    return renderTicket();
    default:          return el('div', '', '');
  }
}

/* ---------- Chrome ---------- */

function renderTop() {
  const top = el('header', 'if-el-top');
  const brand = el('button', 'if-el-brand', t('brand'));
  brand.type = 'button';
  brand.onclick = () => navigate('overview');
  top.append(brand);
  const lang = el('button', 'if-el-lang', t('lang'));
  lang.type = 'button';
  lang.setAttribute('aria-label', state.lang === 'fr' ? 'Switch to English' : 'Passer en français');
  lang.onclick = () => {
    state.lang = state.lang === 'fr' ? 'en' : 'fr';
    writeUrl();
    render();
  };
  top.append(lang);
  return top;
}

function renderChips() {
  const chips = el('nav', 'if-el-chips');
  chips.setAttribute('aria-label', state.lang === 'fr' ? 'Types d’éléments' : 'Element types');
  for (const type of TYPES) {
    const b = el('button', 'if-el-chip' + (state.screen === type.id ? ' on' : ''), typeLabel(type));
    b.type = 'button';
    b.onclick = () => navigate(type.id);
    chips.append(b);
  }
  return chips;
}

function renderBar() {
  const bar = el('div', 'if-el-bar');
  const dl = el('button', 'hv-btn-fill', t('download'));
  dl.type = 'button';
  dl.onclick = () => {
    // No-op export: real 44px button, no network, no canvas.
    dl.textContent = state.lang === 'fr' ? 'Prêt' : 'Ready';
    setTimeout(() => { dl.textContent = t('download'); }, 900);
  };
  bar.append(dl);
  const add = el('button', 'hv-btn-ghost', t('addToGallery'));
  add.type = 'button';
  add.onclick = () => {
    add.textContent = state.lang === 'fr' ? 'Ajouté' : 'Added';
    setTimeout(() => { add.textContent = t('addToGallery'); }, 900);
  };
  bar.append(add);
  const opt = el('button', 'hv-btn-icon', '⚙');
  opt.type = 'button';
  opt.setAttribute('aria-label', t('options'));
  opt.onclick = openSheet;
  bar.append(opt);
  return bar;
}

/* ---------- Bottom sheet ---------- */

let sheetEls = null;

function buildSheet() {
  const backdrop = el('div', 'if-el-sheet-backdrop');
  backdrop.onclick = closeSheet;
  const sheet = el('div', 'if-el-sheet');
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  const head = el('div', 'if-el-sheet-head');
  head.append(el('div', 'if-el-sheet-title', t('options')));
  const close = el('button', 'if-el-sheet-close', '×');
  close.type = 'button';
  close.setAttribute('aria-label', t('close'));
  close.onclick = closeSheet;
  head.append(close);
  sheet.append(head);
  const body = el('div', 'if-el-sheet-body');
  sheet.append(body);
  document.body.append(backdrop, sheet);
  sheetEls = { backdrop, sheet, body };
}

function fillSheet() {
  if (!sheetEls) return;
  const { body } = sheetEls;
  body.replaceChildren();

  // Format switch for frames
  if (state.screen === 'instax' || state.screen === 'polaroid') {
    const f = el('div', 'if-el-field');
    f.append(el('div', 'if-el-field-label', t('format')));
    const seg = el('div', 'if-el-seg');
    const b1 = el('button', (state.frameFormat === 'instax' ? 'on' : ''), t('instaxMini'));
    b1.type = 'button';
    b1.onclick = () => { state.frameFormat = 'instax'; navigate('instax'); };
    const b2 = el('button', (state.frameFormat === 'polaroid' ? 'on' : ''), t('polaroid'));
    b2.type = 'button';
    b2.onclick = () => { state.frameFormat = 'polaroid'; navigate('polaroid'); };
    seg.append(b1, b2);
    f.append(seg);
    body.append(f);
  }

  // Video skin switch
  if (state.screen === 'video') {
    const f = el('div', 'if-el-field');
    f.append(el('div', 'if-el-field-label', t('skin')));
    const seg = el('div', 'if-el-seg');
    for (const [id, label] of [['film', t('film')], ['vhs', t('vhs')], ['cam', t('cam')]]) {
      const b = el('button', (state.videoSkin === id ? 'on' : ''), label);
      b.type = 'button';
      b.onclick = () => { state.videoSkin = id; fillSheet(); render(); };
      seg.append(b);
    }
    f.append(seg);
    body.append(f);
  }

  // Caption text + size for frames
  if (state.screen === 'instax' || state.screen === 'polaroid' || state.screen === 'strip') {
    const f = el('div', 'if-el-field');
    f.append(el('div', 'if-el-field-label', t('caption')));
    const input = document.createElement('input');
    input.type = 'text';
    input.value = state.caption;
    input.oninput = () => { state.caption = input.value; render(); };
    f.append(input);
    body.append(f);

    const s = el('div', 'if-el-field');
    s.append(el('div', 'if-el-field-label', t('captionSize') + ' — ' + state.captionSize));
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '12';
    range.max = '40';
    range.value = String(state.captionSize);
    range.oninput = () => {
      state.captionSize = Number(range.value);
      s.querySelector('.if-el-field-label').textContent = t('captionSize') + ' — ' + state.captionSize;
      render();
    };
    s.append(range);
    body.append(s);
  }

  // Actions
  const actions = el('div', 'if-el-sheet-actions');
  const reset = el('button', '', t('reset'));
  reset.type = 'button';
  reset.onclick = () => {
    state.caption = 'Souvenirs';
    state.captionSize = 24;
    state.frameFormat = 'instax';
    state.videoSkin = 'film';
    fillSheet();
    render();
  };
  const upload = el('button', '', t('upload'));
  upload.type = 'button';
  upload.onclick = () => {
    // Maquette: no-op. The example stays filled; label never changes.
  };
  actions.append(reset, upload);
  body.append(actions);
}

function openSheet() {
  if (!sheetEls) buildSheet();
  fillSheet();
  sheetEls.backdrop.classList.add('on');
  sheetEls.sheet.classList.add('on');
}
function closeSheet() {
  if (!sheetEls) return;
  sheetEls.backdrop.classList.remove('on');
  sheetEls.sheet.classList.remove('on');
}

/* ---------- Screens ---------- */

function renderOverview() {
  const wrap = el('main', 'if-el-overview');
  wrap.append(el('h1', 'if-el-overview-title', t('overviewTitle')));
  const grid = el('div', 'if-el-grid');
  for (const type of TYPES) {
    const tile = el('button', 'if-el-tile');
    tile.type = 'button';
    tile.setAttribute('aria-label', typeLabel(type));
    const stage = el('div', 'if-el-tile-stage');
    const inner = renderElement(type.id);
    // Scale down to fit the tile stage.
    inner.style.transform = 'scale(0.42)';
    stage.append(inner);
    tile.append(stage);
    tile.append(el('div', 'if-el-tile-label', typeLabel(type)));
    tile.onclick = () => navigate(type.id);
    grid.append(tile);
  }
  wrap.append(grid);
  return wrap;
}

function renderTypeScreen() {
  const type = typeById(state.screen);
  if (!type) { navigate('overview'); return null; }
  const frag = document.createDocumentFragment();
  const stage = el('main', 'if-el-stage');
  const preview = el('div', 'if-el-preview');
  const wrap = el('div', 'if-el-preview-wrap');
  wrap.append(renderElement(type.id));

  const badge = el('div', 'if-el-example-badge', t('example'));
  badge.setAttribute('aria-hidden', 'true');
  wrap.append(badge);

  if (PHOTO_TYPES.has(type.id)) {
    const chip = el('button', 'if-el-upload-chip', t('addPhoto'));
    chip.type = 'button';
    chip.onclick = () => {
      // Maquette: no-op. The example stays filled.
    };
    wrap.append(chip);
  }

  preview.append(wrap);
  stage.append(preview);
  frag.append(stage);
  frag.append(renderBar());
  return frag;
}

function render() {
  if (!app) return;
  app.replaceChildren();
  app.append(renderTop());
  if (state.screen === 'overview') {
    app.append(renderOverview());
  } else {
    app.append(renderChips());
    const body = renderTypeScreen();
    if (body) app.append(body);
  }
}

readUrl();
render();
