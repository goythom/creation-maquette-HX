/* home-site.mjs — mobile home page for the InstaFrame mobile edition.
 *
 * Reuses the real desktop home visuals (notebook demo + generator showcase)
 * from instaframe-copy/home-visuals.mjs, and loads the desktop home.css at
 * runtime so the mobile layer only has to reflow it (see home-mobile.css).
 *
 * Navigation contract: every CTA calls onNavigate(href, { source }).
 *   - "Start free" / "Commencer gratuitement" -> source: 'start-free'
 *   - "Open the app", "Try the generator", "Choose Premium", other /generator
 *     links -> source: 'generator'
 *   - everything else -> no source (plain href).
 */

const HOME_CSS_HREF = '../instaframe-copy/styles/home.css';

let homeCssPromise = null;
function ensureHomeCss() {
  if (homeCssPromise) return homeCssPromise;
  homeCssPromise = new Promise((resolve) => {
    if (typeof document === 'undefined') return resolve();
    const existing = document.querySelector('link[data-if-home-css]');
    if (existing) {
      if (existing.sheet) return resolve();
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => resolve(), { once: true });
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = HOME_CSS_HREF;
    link.dataset.ifHomeCss = '';
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => resolve(), { once: true });
    document.head.append(link);
  });
  return homeCssPromise;
}

/* Official English strings, mirroring instaframe-copy/home-page-deepseek.mjs.
 * French is produced at runtime by frenchTree() from translate-dom.mjs. */
const DICT = {
  skip: 'Skip to content',
  navMain: 'Main',
  navFooter: 'Footer',
  menu: 'Menu',
  getInspired: 'Get Inspired',
  generator: 'Generator',
  album: 'Album Studio',
  shop: 'Shop',
  faq: 'FAQ',
  madeFor: 'Made for desktop and iPad',
  signIn: 'Sign in',
  openApp: 'Open the app',
  startFree: 'Start free',
  tour: '30-second tour',
  noAccount: 'No account needed to start',
  importQr: 'Import photos by QR code',
  heroTitleA: 'Take the time to create something for ',
  heroTitleMark: 'that special person',
  heroLead:
    'A notebook made of memories, for the person who matters. Find inspiration in Get Inspired, create your elements, then fill yours with your photos, words and drawings.',
  ticker: [
    'Birthdays',
    'Dates that matter',
    'Just because',
    'A notebook passed in class',
    'Black pages',
    'Handwritten captions',
  ],
  howKicker: 'How it works',
  howTitle: 'Three steps to say I care about you',
  step: 'Step',
  steps: [
    { title: 'Find inspiration', text: 'Browse Get Inspired for ideas of what you can tell.' },
    {
      title: 'Create, then fill',
      text: 'Create your photos, stickers and drawings in the generator, then fill your notebook: the caption only you two understand, black pages, like a notebook passed in class.',
    },
    { title: 'Give it', text: 'They discover it, and see that someone took the time.' },
  ],
  createKicker: 'What you can create',
  createTitle: 'Some memories deserve better than a camera roll',
  createWin: 'My elements',
  createSide:
    'Music and audio players, stamps, post-its, video: each element gets its pixel icon, like on an old desktop.',
  elements: ['Frames', 'Post-its', 'Audio', 'Music', 'Stamps', 'Stickers', 'Video'],
  showKicker: 'The generator',
  showTitle: 'Everything you can create for your notebook',
  showTitleFr: 'Tout ce que vous pouvez créer pour votre carnet',
  showSub: 'Nine kinds of elements, each made in the generator.',
  showSubFr: 'Neuf sortes d’éléments, chacune créée dans le générateur.',
  showPause: 'Pause the automatic scroll',
  showResume: 'Resume the automatic scroll',
  tryGenerator: 'Try the generator',
  tryIt: 'Try it',
  plansKicker: 'Plans',
  plansTitle: "Start free. Upgrade when you're ready to send it.",
  free: 'Free',
  freePrice: '0 €',
  freeLead: 'To get started, no account needed.',
  freeList: ['Forever', 'The free generator elements', 'No account needed to start'],
  premium: 'Premium · to come',
  premiumBadge: 'One-time payment, lifetime access',
  premiumPrice: '7,99 €',
  premiumLead: 'All of InstaFrame, paid once.',
  premiumList: [
    'Premium generator elements marked PRO (including Letter, Messages, Date, Combination)',
    'The notebook editor (Album Studio)',
    'Lifetime access, no subscription',
  ],
  choosePremium: 'Choose Premium',
  freeForNow: 'free for now',
  comingBadge: 'Coming later',
  comingTitle: 'A gift they can hold',
  comingBody:
    'Later, get your physical notebook delivered. Pick a print pack, or shop frames, crayons and stickers individually.',
  pricesNote: 'Prices in EUR. The delivered physical notebook is not included.',
  faqKicker: 'FAQ',
  finalTitle: 'Take the time to make them this notebook',
  finalLead: 'Start by getting inspired. What you took the time to make, they will keep.',
  getInspiredCta: 'Get inspired',
  finalWin: 'For you ♡',
  llms: 'llms.text',
  status: 'Status',
  privacy: 'Privacy',
  legal: 'Legal notice',
  feedback: 'Feedback',
};

const SHOWCASE = [
  { key: 'frames', name: 'Photo', desc: 'Instax Mini and Polaroid. Crop, zoom, filters, a handwritten caption.', descFr: 'Instax Mini et Polaroid. Recadrage, zoom, filtres, légende manuscrite.', tab: 'Frames', screen: 'instax', art: 'frame' },
  { key: 'postits', name: 'Message', desc: 'Write straight onto the note.', descFr: 'Écrivez directement sur la note.', tab: 'Post-its', screen: 'message', art: { kind: 'Post-its', over: { text: 'Post-it\nyou & me' } } },
  { key: 'dates', name: 'Dates', desc: 'A date to remember, made into a card.', descFr: 'Une date à garder, mise en carte.', tab: 'Post-its', screen: 'date', art: { kind: 'Date', over: { text: 'Our day', subtitle: '2026-06-14', dateLabel: 'Anniversary', dateStyle: 'Calendar' } } },
  { key: 'messages', name: 'Messages', desc: 'A phone conversation screenshot. Fictional demonstration.', descFr: 'Une capture de conversation téléphone. Démonstration fictive.', tab: 'Post-its', screen: 'messages', art: { kind: 'Messages', over: { image: '/demo-conversations/conversation-0.svg' } } },
  { key: 'audio', name: 'Audio', desc: 'A voice message that plays when you tap it.', descFr: 'Un message vocal qui se lit au toucher.', tab: 'Audio', screen: 'audio', art: { kind: 'Audio', over: { text: 'Voice message' } } },
  { key: 'music', name: 'Music', desc: 'A music card with its cover and a code to the song.', descFr: 'Une carte musique avec pochette et code vers le titre.', tab: 'Music', screen: 'music', art: { kind: 'Music', over: { format: 'Card', image: '/demo-couples/just-because.webp', text: 'Our song', subtitle: 'The mixtape' } } },
  { key: 'stamps', name: 'Stamps', desc: 'Your photo with a perforated stamp edge. Filters like frames.', descFr: 'Votre photo avec un bord de timbre perforé. Des filtres comme les cadres.', tab: 'Stamps', screen: 'stamps', art: { kind: 'Stamps', over: { image: '/demo-couples/summer-2026.webp', text: 'Summer 2026' } } },
  { key: 'stickers', name: 'Stickers', desc: 'A picture cut out with its outline, ready to place.', descFr: 'Une image détourée avec son contour, prête à poser.', tab: 'Stickers', screen: 'stickers', art: { kind: 'Stickers', over: { image: '/stickers/kawaii_01.png' } } },
  { key: 'video', name: 'Video', desc: 'A clip in its own frame, played inside the notebook.', descFr: 'Un clip dans son propre cadre, lu dans le carnet.', tab: 'Video', screen: 'video', art: { kind: 'Video', over: { image: '/demo-couples/trip-polaroid.webp', text: 'Our first trip' } } },
];

const TICKER_ICONS = ['s_coeurv', 's_etoile', 's_cerises', 's_papillon', 's_coeur', 's_eclat'];
const ELEMENT_ICONS = [
  ['photo', '#fbc856'],
  ['postit', '#e73b0d'],
  ['micro', '#a71d08'],
  ['note', '#6d1308'],
  ['timbre', '#370f0c'],
  ['coeur', '#2B2E33'],
  ['video', '#100808'],
];
const STEP_ICONS = ['ampoule', 'image', 'coeur'];
const STEP_COLORS = ['#fbc856', '#e73b0d', '#a71d08'];

const FAQ_ROWS = [
  {
    en: [
      'What can I create with InstaFrame?',
      'Use the generator to create photo frames and other elements, then arrange them in a notebook in Album Studio. You can add text, stickers and drawings, personalise the cover, and browse your notebook in the preview.',
    ],
    fr: [
      'Que peut-on créer avec InstaFrame ?',
      "Le générateur permet de créer des cadres photo et d'autres éléments, puis de les disposer dans un carnet dans Studio Album. Ajoutez du texte, des stickers et des dessins, personnalisez la couverture et feuilletez votre carnet dans l'aperçu.",
    ],
  },
  {
    en: [
      'Is the generator only for photo frames?',
      'No. Alongside Instax and Polaroid frames, it includes post-its, stickers, stamps, audio, music and video elements, letters, messages, dates and combinations. The available settings depend on the element. Some elements are marked PRO.',
    ],
    fr: [
      'Le générateur sert-il uniquement aux cadres photo ?',
      "Non. En plus des cadres Instax et Polaroid, il propose des post-it, stickers, timbres, éléments audio, musique et vidéo, lettres, messages, dates et combinaisons. Les réglages disponibles dépendent de l'élément. Certains éléments portent la mention PRO.",
    ],
  },
  {
    en: [
      'Do I need an account?',
      'You can start with the free generator without signing in. Sign in to save elements and notebooks to your account and find them again later. A local draft is not a substitute for an account save.',
    ],
    fr: [
      'Faut-il un compte ?',
      'Vous pouvez commencer avec le générateur gratuit sans vous connecter. Connectez-vous pour sauvegarder vos éléments et carnets dans votre compte et les retrouver plus tard. Un brouillon local ne remplace pas une sauvegarde dans le compte.',
    ],
  },
  {
    en: [
      'Which devices can I use?',
      'Create and edit on a computer or iPad. The drawing tools accept a mouse, touch and Apple Pencil; pressure depends on the input device. Phone access is limited to shared notebooks and the dedicated photo-transfer and download links, not the full editor.',
    ],
    fr: [
      'Quels appareils peut-on utiliser ?',
      "Créez et modifiez sur ordinateur ou iPad. Les outils de dessin acceptent la souris, le tactile et l'Apple Pencil ; la pression dépend du périphérique utilisé. Sur téléphone, l'accès est réservé aux carnets partagés et aux liens dédiés de transfert de photos et de téléchargement, pas à l'éditeur complet.",
    ],
  },
  {
    en: [
      'How do I share a notebook?',
      'Use Share in the notebook preview, then Create link. Anyone with the link can view the shared copy for 30 days, including on a phone. The link is for reading, not collaborative editing. Share it only with people you want to give access to.',
    ],
    fr: [
      'Comment partager un carnet ?',
      "Dans l'aperçu du carnet, choisissez Partager puis Créer le lien. Toute personne disposant du lien peut consulter la copie partagée pendant 30 jours, y compris sur téléphone. Ce lien permet la lecture, pas la modification à plusieurs. Ne le transmettez qu'aux personnes à qui vous souhaitez donner accès.",
    ],
  },
  {
    en: [
      'Can I buy Premium or order a printed notebook?',
      'Real payments and physical orders are not available yet. The shop is under construction. The free generator is available, and some features are marked PRO; a preview does not confirm a purchase or a physical order.',
    ],
    fr: [
      'Peut-on acheter Premium ou commander un carnet imprimé ?',
      'Les paiements réels et les commandes physiques ne sont pas encore disponibles. La boutique est en construction. Le générateur gratuit est accessible et certaines fonctions portent la mention PRO ; un aperçu ne constitue pas un achat ni une confirmation de commande physique.',
    ],
  },
];

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'html') node.innerHTML = v;
    else if (k in node && k !== 'list' && k !== 'form' && k !== 'type') {
      try {
        node[k] = v;
      } catch {
        node.setAttribute(k, v);
      }
    } else node.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  }
  return node;
}

function pixelIcon(name, size, color) {
  const span = el('span', { class: 'if-home-px', 'aria-hidden': 'true' });
  span.style.display = 'inline-flex';
  span.style.alignItems = 'center';
  span.style.justifyContent = 'center';
  if (color) span.style.color = color;
  span.dataset.pixel = name;
  span.dataset.pixelSize = String(size);
  return span;
}

function hydratePixels(root) {
  const nodes = root.querySelectorAll('[data-pixel]');
  if (!nodes.length) return;
  import('../instaframe-copy/pixel-dom.mjs')
    .then(({ pixel }) => {
      nodes.forEach((node) => {
        if (node.dataset.pixelDone) return;
        const svg = pixel(node.dataset.pixel, Number(node.dataset.pixelSize) || 18, false);
        if (svg) {
          node.replaceChildren(svg);
          node.dataset.pixelDone = '1';
        }
      });
    })
    .catch(() => {
      /* pixel icons are decorative: a missing icon must not break the page */
    });
}

function Win({ title, icon, tb, deco = false, x = true, className, children }) {
  const tbClass = 'hv-tb' + (tb ? ' hv-tb-' + tb : '');
  const titleChildren = [];
  if (icon) titleChildren.push(pixelIcon(icon, 18));
  titleChildren.push(el('span', {}, title));
  if (deco) {
    titleChildren.push(el('i', { class: 'hv-bev hv-bev-sm' }, '_'));
    titleChildren.push(el('i', { class: 'hv-bev hv-bev-sm' }, '□'));
  }
  if (x) titleChildren.push(el('i', { class: 'hv-xb', 'aria-hidden': 'true' }, pixelIcon('fermer', 16)));
  return el(
    'div',
    { class: 'hv-w' + (className ? ' ' + className : '') },
    el('div', { class: tbClass }, ...titleChildren),
    el('div', { class: 'hv-wb' }, ...children),
  );
}

function SecHead({ n, kicker, title }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(
    el('div', { class: 'hv-sechead' }, el('span', { class: 'hv-lcd' }, n), el('span', { class: 'hv-px' }, kicker)),
  );
  if (title) frag.appendChild(el('h2', { class: 'hv-sectitle' }, title));
  return frag;
}

function Stk({ n, s, style }) {
  return el('span', { class: 'hv-stk', style, 'aria-hidden': 'true' }, pixelIcon(n, s));
}

function BtnFill({ to, label, source, onNavigate, icon }) {
  const a = el('a', { class: 'hv-btn hv-btn-fill', href: to });
  if (icon) a.appendChild(pixelIcon(icon, 16));
  a.appendChild(document.createTextNode(label));
  a.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate(to, source ? { source } : undefined);
  });
  return a;
}

function BtnOut({ to, label, onNavigate, icon }) {
  const a = el('a', { class: 'hv-btn hv-btn-out', href: to });
  if (icon) a.appendChild(pixelIcon(icon, 16));
  a.appendChild(document.createTextNode(label));
  a.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate(to);
  });
  return a;
}

function navLink({ href, label, onNavigate, source }) {
  const a = el('a', { href }, label);
  a.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate(href, source ? { source } : undefined);
  });
  return a;
}

/* ---------- Showcase lane ---------- */

/* Mobile showcase: a single vertical column of the 9 official cards.
 * No lane animation, no duplication, no horizontal swipe. */
function buildShowcase({ lang, onNavigate }) {
  const list = el('div', { class: 'hv-show-lane' });
  const track = el('div', { class: 'hv-show-track' });
  list.appendChild(track);

  const cards = [];

  const makeCard = (item) => {
    const body = el('div', { class: 'hv-card-body' });
    if (item.art === 'frame') {
      const frameHost = el('div', { class: 'if-home-frame-host' });
      body.appendChild(frameHost);
      import('../instaframe-copy/home-visuals.mjs')
        .then(({ renderDemoFrame }) => {
          frameHost.replaceChildren(
            renderDemoFrame({ photo: '/demo-couples/trip-polaroid.webp', cap: 'our first trip', format: 'polaroid' }),
          );
        })
        .catch(() => {
          frameHost.replaceChildren(el('span', { class: 'hv-card-wait', role: 'status' }, '…'));
        });
    } else {
      body.appendChild(el('span', { class: 'hv-card-wait', role: 'status' }, '…'));
    }
    const tryBtn = el(
      'a',
      {
        class: 'hv-btn hv-btn-fill hv-card-try',
        href: `/elements/${item.screen}`,
      },
      DICT.tryIt,
      el('span', { class: 'hv-sr' }, ' – ' + item.name),
    );
    tryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate(`/elements/${item.screen}`);
    });
    const card = el(
      'div',
      { class: 'hv-card', dataset: { key: item.key } },
      body,
      el('div', { class: 'hv-card-cap' }, el('b', {}, item.name), el('p', {}, lang === 'fr' ? item.descFr : item.desc)),
      tryBtn,
    );
    cards.push({ item, card });
    return card;
  };

  for (const item of SHOWCASE) track.appendChild(makeCard(item));

  const loadArt = async () => {
    let visuals;
    try {
      visuals = await import('../instaframe-copy/home-visuals.mjs');
    } catch {
      return;
    }
    for (const item of SHOWCASE) {
      if (item.art === 'frame') continue;
      await new Promise((r) => setTimeout(r, 0));
      try {
        const src = await visuals.renderShowcaseArt({ item, lang });
        if (!src) continue;
        for (const entry of cards) {
          if (entry.item.key !== item.key) continue;
          const body = entry.card.querySelector('.hv-card-body');
          if (!body) continue;
          body.replaceChildren(
            el('img', {
              class: 'hv-card-art',
              src,
              alt: item.name,
              width: 240,
              height: 240,
              decoding: 'async',
              draggable: 'false',
            }),
          );
        }
      } catch {
        /* one failed element must not block the others */
      }
    }
  };

  /* Load art immediately: the section sits below the fold on a phone, so an
   * IntersectionObserver gate would leave every card stuck on "…". */
  void loadArt();

  return { lane: list, dispose() {} };
}

/* ---------- Public entry ---------- */

/**
 * Renders the mobile home page.
 * @param {object} opts
 * @param {'en'|'fr'} [opts.lang]
 * @param {(href: string, meta?: { source?: string }) => void} [opts.onNavigate]
 * @returns {HTMLElement}
 */
export function renderHomeSite({ lang = 'en', onNavigate = () => {} } = {}) {
  const dict = DICT;
  const root = el('div', { class: 'home-v2 if-home' });

  void ensureHomeCss();

  root.appendChild(el('a', { class: 'home-skip-link', href: '#home-content' }, dict.skip));

  /* Header: logo + EN/FR + Menu button. Desktop nav lives in the menu panel. */
  const header = el('header', { class: 'hv-nav' });
  const logo = el('a', { class: 'hv-logo', href: '/' }, pixelIcon('s_coeurv', 26), 'InstaFrame');
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });
  header.appendChild(logo);

  header.appendChild(el('span', { class: 'hv-nav-sp' }));

  const langToggle = el('div', {
    class: 'lang-toggle lang-toggle--inline',
    role: 'group',
    'aria-label': 'Language',
    'data-no-i18n': '',
  });
  for (const value of ['en', 'fr']) {
    const btn = el('button', { type: 'button', 'aria-pressed': String(lang === value) }, value.toUpperCase());
    btn.addEventListener('click', () => {
      root.dispatchEvent(new CustomEvent('if-m-set-lang', { detail: value, bubbles: true }));
    });
    langToggle.append(btn);
  }
  header.append(langToggle);

  const menuBtn = el(
    'button',
    { type: 'button', class: 'hv-menu-btn', 'aria-expanded': 'false', 'aria-controls': 'hv-nav-menu' },
    el('span', { class: 'hv-menu-icon', 'aria-hidden': 'true' }),
    el('span', { class: 'hv-menu-label' }, dict.menu),
  );
  header.appendChild(menuBtn);

  const menuPanel = el('div', { class: 'hv-nav-menu', id: 'hv-nav-menu', hidden: true });
  const menuBackdrop = el('div', { class: 'hv-nav-backdrop', hidden: true });
  const closeMenu = () => {
    menuPanel.hidden = true;
    menuBackdrop.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    menuPanel.hidden = false;
    menuBackdrop.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
  };
  menuBtn.addEventListener('click', () => {
    if (menuPanel.hidden) openMenu();
    else closeMenu();
  });
  menuBackdrop.addEventListener('click', closeMenu);
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuPanel.hidden) closeMenu();
  });

  const menuLink = (href, label, source) => {
    const a = navLink({ href, label, onNavigate, source });
    a.addEventListener('click', closeMenu);
    return a;
  };
  for (const [href, label] of [
    ['/get-inspired', dict.getInspired],
    ['/generator', dict.generator],
    ['/album', dict.album],
    ['/shop', dict.shop],
  ]) {
    menuPanel.appendChild(menuLink(href, label));
  }
  const signInBtn = el('button', { type: 'button', class: 'hv-account' }, dict.signIn);
  signInBtn.addEventListener('click', () => {
    closeMenu();
    onNavigate('/login');
  });
  menuPanel.appendChild(signInBtn);
  const openApp = BtnFill({ to: '/generator', label: dict.openApp, source: 'generator', onNavigate });
  openApp.addEventListener('click', closeMenu);
  menuPanel.appendChild(openApp);
  menuPanel.appendChild(el('span', { class: 'hv-nav-note' }, dict.madeFor));

  root.appendChild(header);
  root.appendChild(menuBackdrop);
  root.appendChild(menuPanel);

  /* Main */
  const main = el('main', { id: 'home-content', tabindex: '-1' });

  /* Hero */
  const hero = el('section', { class: 'hv-hero hv-gp' });
  const heroCopy = el('div', { class: 'hv-hero-copy' });
  heroCopy.appendChild(
    el('h1', {}, dict.heroTitleA, el('span', { class: 'hv-mark' }, dict.heroTitleMark)),
  );
  heroCopy.appendChild(el('p', { class: 'hv-lead' }, dict.heroLead));

  const heroActions = el('div', { class: 'hv-row hv-hero-actions' });
  heroActions.appendChild(
    BtnFill({ to: '/generator', label: dict.startFree, source: 'start-free', onNavigate }),
  );
  const tourLink = el('a', { class: 'hv-bev hv-bev-big', href: '/generator?tour=1' }, pixelIcon('lecture', 16), dict.tour);
  tourLink.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/generator?tour=1', { source: 'generator' });
  });
  heroActions.appendChild(tourLink);
  heroCopy.appendChild(heroActions);

  const heroChips = el('div', { class: 'hv-row hv-hero-chips' });
  heroChips.appendChild(el('span', { class: 'hv-chip' }, dict.noAccount));
  heroChips.appendChild(el('span', { class: 'hv-chip' }, pixelIcon('qr', 16), dict.importQr));
  heroCopy.appendChild(heroChips);
  hero.appendChild(heroCopy);

  const scene = el('div', { class: 'hv-scene' });
  const sceneStage = el('div', { class: 'hv-scene-stage--notebook' });
  const notebookHost = el('div', { class: 'if-home-notebook-host' });
  sceneStage.appendChild(notebookHost);
  scene.appendChild(sceneStage);
  hero.appendChild(scene);
  main.appendChild(hero);

  import('../instaframe-copy/home-visuals.mjs')
    .then(({ renderHomeNotebookDemo }) => {
      notebookHost.replaceChildren(renderHomeNotebookDemo({ lang }));
    })
    .catch(() => {
      notebookHost.replaceChildren(
        el('p', { role: 'status' }, lang === 'fr' ? 'Aperçu indisponible.' : 'Preview unavailable.'),
      );
    });

  /* Ticker */
  const tick = el('div', { class: 'hv-tick', 'aria-hidden': 'true' });
  const tickTrack = el('div', { class: 'hv-tick-track' });
  for (const [i, label] of [...dict.ticker, ...dict.ticker].entries()) {
    tickTrack.appendChild(el('span', {}, pixelIcon(TICKER_ICONS[i % TICKER_ICONS.length], 26), label));
  }
  tick.appendChild(tickTrack);
  main.appendChild(tick);

  /* How */
  const howSec = el('section', { class: 'hv-sec hv-sec-w' });
  howSec.appendChild(SecHead({ n: '01', kicker: dict.howKicker, title: dict.howTitle }));
  const steps = el('div', { class: 'hv-steps' });
  dict.steps.forEach((step, i) => {
    const cell = el('div', { class: 'hv-step-cell' });
    cell.appendChild(
      Win({
        title: `${dict.step} ${String(i + 1).padStart(2, '0')}`,
        x: true,
        children: [
          el(
            'div',
            { class: 'hv-step-ic', style: { background: STEP_COLORS[i] } },
            pixelIcon(STEP_ICONS[i], 48, i === 0 ? '#100808' : '#F7F4F1'),
          ),
          el('b', { class: 'hv-step-title' }, step.title),
          el('p', {}, step.text),
        ],
      }),
    );
    steps.appendChild(cell);
  });
  howSec.appendChild(steps);
  main.appendChild(howSec);

  /* Create */
  const createSec = el('section', { class: 'hv-sec' });
  createSec.appendChild(SecHead({ n: '02', kicker: dict.createKicker, title: dict.createTitle }));
  const create = el('div', { class: 'hv-create' });
  const createWin = Win({
    title: dict.createWin,
    icon: 'dossier',
    deco: true,
    className: 'hv-create-win',
    children: [
      el(
        'div',
        { class: 'hv-gl hv-deskwrap' },
        el(
          'div',
          { class: 'hv-desk' },
          ...dict.elements.map((label, i) => {
            const [icon, bg] = ELEMENT_ICONS[i];
            return el(
              'div',
              { class: i === 0 ? 'on' : undefined },
              el('i', { style: { background: bg } }, pixelIcon(icon, 40, i === 0 ? '#100808' : '#F7F4F1')),
              el('span', {}, label),
            );
          }),
        ),
      ),
    ],
  });
  create.appendChild(createWin);
  const createSide = el('div', { class: 'hv-create-side' });
  createSide.appendChild(pixelIcon('o_cd', 110));
  createSide.appendChild(el('p', {}, dict.createSide));
  create.appendChild(createSide);
  createSec.appendChild(create);
  main.appendChild(createSec);

  /* Showcase: single column of the 9 official cards. */
  const showSec = el('section', { class: 'hv-sec hv-sec-w hv-sec-show' });
  const showTop = el('div', { class: 'hv-show-top' });
  showTop.appendChild(
    SecHead({ n: '03', kicker: dict.showKicker, title: lang === 'fr' ? dict.showTitleFr : dict.showTitle }),
  );
  showSec.appendChild(showTop);
  showSec.appendChild(el('p', { class: 'hv-show-sub' }, lang === 'fr' ? dict.showSubFr : dict.showSub));
  const laneObj = buildShowcase({ lang, onNavigate });
  showSec.appendChild(laneObj.lane);
  showSec.appendChild(
    BtnFill({ to: '/generator', label: dict.tryGenerator, source: 'generator', onNavigate }),
  );
  main.appendChild(showSec);

  /* Plans */
  const plansSec = el('section', { class: 'hv-sec' });
  plansSec.appendChild(SecHead({ n: '04', kicker: dict.plansKicker, title: dict.plansTitle }));
  const plans = el('div', { class: 'hv-plans' });

  plans.appendChild(
    Win({
      title: dict.free,
      icon: 'livre',
      x: false,
      className: 'hv-plan',
      children: [
        el('p', { class: 'hv-price', 'data-no-i18n': '' }, dict.freePrice),
        el('p', {}, dict.freeLead),
        el('ul', { class: 'hv-ul' }, ...dict.freeList.map((t) => el('li', {}, t))),
        BtnOut({ to: '/generator', label: dict.startFree, onNavigate }),
      ],
    }),
  );

  plans.appendChild(
    Win({
      title: dict.premium,
      icon: 'etoile',
      tb: 'y',
      x: false,
      className: 'hv-plan hv-plan-hl',
      children: [
        el('span', { class: 'hv-pro' }, dict.premiumBadge),
        el('p', { class: 'hv-price', 'data-no-i18n': '' }, dict.premiumPrice),
        el('p', {}, dict.premiumLead),
        el('ul', { class: 'hv-ul' }, ...dict.premiumList.map((t) => el('li', {}, t))),
        el(
          'span',
          { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } },
          BtnFill({ to: '/generator', label: dict.choosePremium, source: 'generator', onNavigate }),
          el('span', { class: 'hv-pro' }, dict.freeForNow),
        ),
        Stk({ n: 's_coeurv', s: 44, style: { right: '-18px', top: '-26px' } }),
      ],
    }),
  );
  plansSec.appendChild(plans);

  plansSec.appendChild(
    el(
      'div',
      { class: 'hv-coming' },
      el('span', { class: 'hv-pro hv-pro-blue' }, dict.comingBadge),
      el('b', {}, dict.comingTitle),
      el('span', {}, dict.comingBody),
    ),
  );
  plansSec.appendChild(el('p', { class: 'hv-note' }, dict.pricesNote));
  main.appendChild(plansSec);

  /* FAQ */
  const faqSec = el('section', { class: 'hv-sec hv-sec-w' });
  faqSec.appendChild(SecHead({ n: '05', kicker: dict.faqKicker }));
  const faq = el('div', { class: 'hv-faq', 'data-no-i18n': '' });
  FAQ_ROWS.forEach((row, i) => {
    const [q, a] = lang === 'fr' ? row.fr : row.en;
    const details = el('details', i === 0 ? { open: true } : {});
    details.appendChild(
      el('summary', {}, q, el('span', { class: 'hv-faq-ic', 'aria-hidden': 'true' }, pixelIcon('chevdroite', 20))),
    );
    details.appendChild(el('p', {}, a));
    faq.appendChild(details);
  });
  faqSec.appendChild(faq);
  main.appendChild(faqSec);

  /* Final CTA */
  const finalSec = el('section', { class: 'hv-sec hv-gp hv-final' });
  finalSec.appendChild(Stk({ n: 's_etoile', s: 64, style: { left: '180px', top: '70px', transform: 'rotate(-10deg)' } }));
  finalSec.appendChild(Stk({ n: 's_papillon', s: 72, style: { right: '200px', top: '90px' } }));
  finalSec.appendChild(Stk({ n: 's_coeur', s: 60, style: { right: '300px', bottom: '70px', transform: 'rotate(6deg)' } }));
  finalSec.appendChild(
    Win({
      title: dict.finalWin,
      icon: 'coeur',
      deco: true,
      className: 'hv-final-win',
      children: [
        el(
          'div',
          { class: 'hv-final-body' },
          el('h2', {}, dict.finalTitle),
          el('p', {}, dict.finalLead),
          el(
            'div',
            { class: 'hv-row hv-final-actions' },
            BtnFill({ to: '/generator', label: dict.startFree, source: 'start-free', onNavigate }),
            BtnOut({ to: '/get-inspired', label: dict.getInspiredCta, onNavigate, icon: 'ampoule' }),
          ),
        ),
      ],
    }),
  );
  main.appendChild(finalSec);

  root.appendChild(main);

  /* Footer */
  const footer = el('footer', { class: 'hv-footer' });
  footer.appendChild(el('span', { class: 'hv-logo hv-footer-logo' }, pixelIcon('s_coeurv', 24), 'InstaFrame'));
  footer.appendChild(el('span', { class: 'hv-nav-sp' }));
  const footerNav = el('nav', { 'aria-label': dict.navFooter });
  for (const [href, label] of [
    ['/get-inspired', dict.getInspired],
    ['/generator', dict.generator],
    ['/album', dict.album],
    ['/shop', dict.shop],
    ['/faq', dict.faq],
    ['/llms.txt', dict.llms],
    ['/status', dict.status],
    ['/privacy', dict.privacy],
    ['/mentions-legales', dict.legal],
  ]) {
    footerNav.appendChild(navLink({ href, label, onNavigate }));
  }
  footerNav.appendChild(el('button', { type: 'button', class: 'hv-footer-feedback' }, dict.feedback));
  footer.appendChild(footerNav);
  root.appendChild(footer);

  hydratePixels(root);

  /* French: translate the whole tree with the official dictionary. */
  if (lang === 'fr') {
    import('../instaframe-copy/translate-dom.mjs')
      .then(({ frenchTree }) => {
        if (root.isConnected) frenchTree(root);
      })
      .catch(() => {
        /* a missing dictionary must not blank the page */
      });
  }

  /* Dispose the lane when the page is detached, like the desktop home. */
  let attached = false;
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      if (root.isConnected) attached = true;
      else if (attached) {
        observer.disconnect();
        laneObj.dispose();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  return root;
}
