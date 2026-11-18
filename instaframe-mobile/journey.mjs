/* journey.mjs — InstaFrame mobile V1 SPA. */

const PHOTOS = [
  { src: '../demo-couples/our-first-trip.webp', caption: { en: 'our first trip', fr: 'our first trip' } },
  { src: '../demo-couples/just-because.webp', caption: { en: 'just because', fr: 'just because' } },
  { src: '../demo-couples/summer-2026.webp', caption: { en: 'summer', fr: 'Été 2026' } },
  { src: '../demo-couples/trip-polaroid.webp', caption: { en: 'Souvenirs', fr: 'Souvenirs' } },
];

const STICKERS = ['../stickers/kawaii_01.png', '../stickers/kawaii_17.png'];

const TYPES = [
  { id: 'Photo', label: { en: 'Photo', fr: 'Photo' }, pro: false },
  { id: 'Message', label: { en: 'Message', fr: 'Message' }, pro: false },
  { id: 'Audio', label: { en: 'Audio', fr: 'Audio' }, pro: false },
  { id: 'Music', label: { en: 'Music', fr: 'Music' }, pro: false },
  { id: 'Stamp', label: { en: 'Stamps', fr: 'Timbre' }, pro: false },
  { id: 'Sticker', label: { en: 'Stickers', fr: 'Sticker' }, pro: false },
  { id: 'Video', label: { en: 'Video', fr: 'Vidéo' }, pro: false },
  { id: 'Letter', label: { en: 'Letter', fr: 'Lettre' }, pro: true },
  { id: 'Conversation', label: { en: 'Conversation', fr: 'Conversation' }, pro: true },
  { id: 'Date', label: { en: 'Date', fr: 'Date' }, pro: true },
  { id: 'Combination', label: { en: 'Combination', fr: 'Combinaison' }, pro: true },
  { id: 'PhotoPro', label: { en: 'Photo Pro', fr: 'Photo Pro' }, pro: true },
];

const FAQ = [
  { q: { en: 'What can I create with InstaFrame?', fr: 'Que peut-on créer avec InstaFrame ?' }, a: { en: 'Use the generator to create photo frames and other elements, then arrange them in a notebook in Album Studio. You can add text, stickers and drawings, personalise the cover, and browse your notebook in the preview.', fr: 'Le générateur permet de créer des cadres photo et d\'autres éléments, puis de les disposer dans un carnet dans Studio Album. Ajoutez du texte, des stickers et des dessins, personnalisez la couverture et feuilletez votre carnet dans l\'aperçu.' } },
  { q: { en: 'Is the generator only for photo frames?', fr: 'Le générateur sert-il uniquement aux cadres photo ?' }, a: { en: 'No. Alongside Instax and Polaroid frames, it includes post-its, stickers, stamps, audio, music and video elements, letters, messages, dates and combinations. The available settings depend on the element. Some elements are marked PRO.', fr: 'Non. En plus des cadres Instax et Polaroid, il propose des post-it, stickers, timbres, éléments audio, musique et vidéo, lettres, messages, dates et combinaisons. Les réglages disponibles dépendent de l\'élément. Certains éléments portent la mention PRO.' } },
  { q: { en: 'Do I need an account?', fr: 'Faut-il un compte ?' }, a: { en: 'You can start with the free generator without signing in. Sign in to save elements and notebooks to your account and find them again later. A local draft is not a substitute for an account save.', fr: 'Vous pouvez commencer avec le générateur gratuit sans vous connecter. Connectez-vous pour sauvegarder vos éléments et carnets dans votre compte et les retrouver plus tard. Un brouillon local ne remplace pas une sauvegarde dans le compte.' } },
  { q: { en: 'Which devices can I use?', fr: 'Quels appareils peut-on utiliser ?' }, a: { en: 'Create and edit on a computer or iPad. The drawing tools accept a mouse, touch and Apple Pencil; pressure depends on the input device. Phone access is limited to shared notebooks and the dedicated photo-transfer and download links, not the full editor.', fr: 'Créez et modifiez sur ordinateur ou iPad. Les outils de dessin acceptent la souris, le tactile et l\'Apple Pencil ; la pression dépend du périphérique utilisé. Sur téléphone, l\'accès est réservé aux carnets partagés et aux liens dédiés de transfert de photos et de téléchargement, pas à l\'éditeur complet.' } },
  { q: { en: 'How do I add and adjust a photo?', fr: 'Comment ajouter et ajuster une photo ?' }, a: { en: 'Choose a frame in the generator, then import a photo from your device. Use the crop, zoom and position controls to adjust it, and add a caption if you want. You can mix frame formats in the same notebook.', fr: 'Choisissez un cadre dans le générateur, puis importez une photo depuis votre appareil. Ajustez le cadrage, le zoom et la position, puis ajoutez une légende si vous le souhaitez. Vous pouvez mélanger plusieurs formats de cadres dans le même carnet.' } },
  { q: { en: 'How do I fill and personalise a notebook?', fr: 'Comment remplir et personnaliser un carnet ?' }, a: { en: 'In Album Studio, place your elements on the pages, resize or rotate them, add text and stickers, and draw with the pen, marker or highlighter. The notebook settings let you choose the cover and paper appearance.', fr: 'Dans Studio Album, disposez vos éléments sur les pages, redimensionnez-les ou faites-les pivoter, ajoutez du texte et des stickers, puis dessinez au stylo, au feutre ou au surligneur. Les réglages du carnet permettent de choisir l\'apparence de la couverture et du papier.' } },
  { q: { en: 'Can I flip through the notebook before sharing it?', fr: 'Peut-on feuilleter le carnet avant de le partager ?' }, a: { en: 'Yes. Open the notebook preview to browse the pages and check the cover. The small notebook on the homepage is a separate example you can flip through; it does not change your own notebook.', fr: 'Oui. Ouvrez l\'aperçu du carnet pour parcourir les pages et vérifier la couverture. Le petit carnet de l\'accueil est un exemple séparé que vous pouvez feuilleter ; il ne modifie pas votre propre carnet.' } },
  { q: { en: 'Where do I find my saved notebooks?', fr: 'Où retrouver mes carnets sauvegardés ?' }, a: { en: 'Sign in and open Saved notebooks from your account or Album Studio. Open a saved notebook to continue editing. While signed in, edits are saved automatically; check any save error before leaving. Name your notebook: unnamed automatic saves are removed after 30 days.', fr: 'Connectez-vous et ouvrez Carnets sauvegardés depuis votre compte ou Studio Album. Ouvrez un carnet sauvegardé pour reprendre sa création. Une fois connecté, les modifications sont enregistrées automatiquement ; vérifiez toute erreur de sauvegarde avant de quitter. Donnez un nom à votre carnet : les sauvegardes automatiques non nommées sont supprimées après 30 jours.' } },
  { q: { en: 'Can I restore a deleted notebook?', fr: 'Peut-on restaurer un carnet supprimé ?' }, a: { en: 'A saved notebook moved to Trash can be restored within 30 days. Delete forever removes that saved notebook and cannot be undone. It does not delete account photos, already shared copies or existing backups.', fr: 'Un carnet sauvegardé placé dans la Corbeille peut être restauré pendant 30 jours. Supprimer définitivement retire cette sauvegarde sans possibilité de retour. Cela ne supprime pas les photos du compte, les copies déjà partagées ni les sauvegardes de sécurité existantes.' } },
  { q: { en: 'How do I share a notebook?', fr: 'Comment partager un carnet ?' }, a: { en: 'Use Share in the notebook preview, then Create link. Anyone with the link can view the shared copy for 30 days, including on a phone. The link is for reading, not collaborative editing. Share it only with people you want to give access to.', fr: 'Dans l\'aperçu du carnet, choisissez Partager puis Créer le lien. Toute personne disposant du lien peut consulter la copie partagée pendant 30 jours, y compris sur téléphone. Ce lien permet la lecture, pas la modification à plusieurs. Ne le transmettez qu\'aux personnes à qui vous souhaitez donner accès.' } },
  { q: { en: 'Can I download my creations?', fr: 'Peut-on télécharger ses créations ?' }, a: { en: 'The generator can download a single element or the gallery as a ZIP. Keep a downloaded copy if you need it outside InstaFrame. Image downloads are still images, not an interactive notebook with audio or video playback.', fr: 'Le générateur permet de télécharger un élément ou la galerie dans un fichier ZIP. Gardez une copie téléchargée pour utiliser vos créations en dehors d\'InstaFrame. Les téléchargements d\'images restent des images fixes, pas un carnet interactif avec lecture audio ou vidéo.' } },
  { q: { en: 'Can I buy Premium or order a printed notebook?', fr: 'Peut-on acheter Premium ou commander un carnet imprimé ?' }, a: { en: 'Real payments and physical orders are not available yet. The shop is under construction. The free generator is available, and some features are marked PRO; a preview does not confirm a purchase or a physical order.', fr: 'Les paiements réels et les commandes physiques ne sont pas encore disponibles. La boutique est en construction. Le générateur gratuit est accessible et certaines fonctions portent la mention PRO ; un aperçu ne constitue pas un achat ni une confirmation de commande physique.' } },
  { q: { en: 'How do I report a problem?', fr: 'Comment signaler un problème ?' }, a: { en: 'Use the feedback bubble to describe the page and what happened, and include a screenshot when useful. You can also write to contact@instaframe.fr.', fr: 'Utilisez la bulle de retour pour décrire la page et ce qui s\'est passé, avec une capture si elle est utile. Vous pouvez aussi écrire à contact@instaframe.fr.' } },
];

const DICT = {
  en: {
    startFree: 'Start free',
    tryIt: 'Try it',
    tour: '30-SECOND TOUR',
    noAccount: 'No account needed to start',
    importQr: 'Import photos by QR code',
    homeTitle: 'Take the time to create something for <span class="if-m-mark">that special person</span>',
    homeLead: 'A notebook made of memories, for the person who matters. Find inspiration in Get Inspired, create your elements, then fill yours with your photos, words and drawings.',
    createElements: 'Create your elements',
    proGroup: 'Pro',
    freeGroup: 'Free',
    back: 'Back',
    backToGenerator: 'Back to the generator',
    backToHome: 'Back to home',
    importPhoto: 'Import a photo',
    choosePhoto: 'Choose a photo',
    frameStyle: 'Frame style',
    instax: 'Instax Mini',
    polaroid: 'Polaroid',
    options: 'Options',
    download: 'Download',
    share: 'Share',
    signInGoogle: 'Sign in with Google',
    continueGoogle: 'Continue with Google',
    signInSave: 'Sign in with Google to use Album Studio. Your notebook is saved automatically to your account.',
    handoffLead: 'Creating a notebook takes room. Open InstaFrame on your computer or tablet to bring your memories to life.',
    handoffSub: 'Shared notebooks stay accessible on your phone by link',
    albumStudio: 'Album Studio',
    getInspired: 'Get Inspired',
    generator: 'Generator',
    openNotebook: 'Open notebook',
    makeYourOwn: 'Make your own',
    close: 'Close',
    proSheetTitle: 'Made for desktop and tablet',
    proSheetBody: 'Create and edit on a computer or iPad. Phone access is limited to shared notebooks and the dedicated photo-transfer and download links, not the full editor.',
    tourTitle: 'Welcome',
    tourBody: 'Put your photos in frames, build a notebook, share it with a link. Want a 30-second tour?',
    tourStep1: 'Create',
    tourStep2: 'Compose',
    tourStep3: 'Share',
    showMe: 'Show me',
    skip: 'Skip',
    faq: 'FAQ',
    shop: 'Shop',
    privacy: 'Privacy policy',
    legal: 'Legal notice',
    legalBody: 'The full text lives on instaframe.fr.',
    shopTitle: 'The shop is taking shape.',
    shopBody: 'Nothing is available to buy yet.',
    seePreview: 'See the preview',
    shareInvalid: 'This album link is not valid.',
    galleryEmpty: 'Your generated elements are saved here.',
    galleryTitle: 'Saved elements',
    phoneTitle: 'Your photos, on the big screen.',
    phoneInvalid: 'This link is not valid.',
    choosePhotos: 'Choose photos',
    loginTitle: 'Sign in',
    loginNote: 'We receive your name, email address and Google profile picture to create your account. We never access your contacts, Drive or other Google photos. Privacy policy',
    inspiredTitle: 'Get Inspired',
    inspiredSub: 'One shelf, eight stories. Choose the notebook that speaks to you.',
    useSample: 'See the preview',
    messagePlaceholder: 'Write a note for your notebook',
    stampMotif: 'Stamps',
    dropPhoto: 'Drop a photo on the preview, or import one from your computer or phone.',
    saved: 'Saved',
    addToGallery: '+ Add to Gallery',
    next: 'Next',
    prev: 'Previous',
    typeTitle: 'Create your elements',
    saveTitle: 'Sign in',
    handoffTitle: 'Your photos, on the big screen.',
    albumTitle: 'Album Studio',
    gallery: 'Elements',
    phone: 'Photo transfer',
    share: 'Notebook link',
    login: 'Sign in',
    legalPrivacy: 'Privacy policy',
    legalMentions: 'Legal notice',
    inspired: 'Get Inspired',
    album: 'Album Studio',
    home: 'Home',
    type: 'Choose an element',
    create: 'Create',
    result: 'Result',
    save: 'Save',
    handoff: 'Continue the notebook',
  },
  fr: {
    startFree: 'Commencer gratuitement',
    tryIt: 'Essayer',
    tour: 'VISITE 30 SECONDES',
    noAccount: 'Pas de compte pour commencer',
    importQr: 'Importer des photos par QR code',
    homeTitle: 'Prenez le temps de créer quelque chose pour <span class="if-m-mark">cette personne spéciale</span>',
    homeLead: 'Un carnet fait de souvenirs, pour la personne qui compte. Prenez de l\'inspiration dans Get Inspired, créez vos éléments, puis remplissez le vôtre de vos photos, de vos mots et de vos dessins.',
    createElements: 'Créer tes éléments',
    proGroup: 'Pro',
    freeGroup: 'Gratuit',
    back: 'Retour',
    backToGenerator: 'Retour au générateur',
    backToHome: 'Retour à l’accueil',
    importPhoto: 'Importer une photo',
    choosePhoto: 'Choisir une photo',
    frameStyle: 'Style de cadre',
    instax: 'Instax Mini',
    polaroid: 'Polaroid',
    options: 'Options',
    download: 'Télécharger',
    share: 'Partager',
    signInGoogle: 'Se connecter avec Google',
    continueGoogle: 'Continuer avec Google',
    signInSave: 'Connectez-vous avec Google pour utiliser Album Studio. Votre carnet est enregistré automatiquement dans votre compte.',
    handoffLead: 'Créer un carnet demande de la place. Ouvrez InstaFrame sur votre ordinateur ou votre tablette pour donner vie à vos souvenirs.',
    handoffSub: 'Les carnets partagés restent accessibles sur votre téléphone par lien',
    albumStudio: 'Album Studio',
    getInspired: 'Get Inspired',
    generator: 'Générateur',
    openNotebook: 'Ouvrir le carnet',
    makeYourOwn: 'Créez le vôtre',
    close: 'Fermer',
    proSheetTitle: 'Conçu pour ordinateur et tablette',
    proSheetBody: 'Créez et modifiez sur ordinateur ou iPad. L’accès téléphone se limite aux carnets partagés et aux liens dédiés de transfert et de téléchargement, pas à l’éditeur complet.',
    tourTitle: 'Bienvenue',
    tourBody: 'Mets tes photos dans des cadres, compose un carnet, partage-le par un lien. Un tour de 30 secondes ?',
    tourStep1: 'Créer',
    tourStep2: 'Composer',
    tourStep3: 'Partager',
    showMe: 'Montre-moi',
    skip: 'Passer',
    faq: 'FAQ',
    shop: 'Boutique',
    privacy: 'Politique de confidentialité',
    legal: 'Mentions légales',
    legalBody: 'Le texte complet se trouve sur instaframe.fr.',
    shopTitle: 'La boutique prend forme.',
    shopBody: 'Rien n’est encore disponible à l’achat.',
    seePreview: 'Voir l’aperçu',
    shareInvalid: 'Ce lien de carnet n’est pas valide.',
    galleryEmpty: 'Vos éléments générés sont enregistrés ici.',
    galleryTitle: 'Éléments sauvegardés',
    phoneTitle: 'Vos photos, sur le grand écran.',
    phoneInvalid: 'Ce lien n’est pas valide.',
    choosePhotos: 'Choisir des photos',
    loginTitle: 'Connexion',
    loginNote: 'Nous recevons votre nom, votre adresse e-mail et votre photo de profil Google pour créer votre compte. Nous n\'accédons ni à vos contacts, ni à votre Drive, ni à vos autres photos Google. Politique de confidentialité',
    inspiredTitle: 'Get Inspired',
    inspiredSub: 'One shelf, eight stories. Choose the notebook that speaks to you.',
    useSample: 'Voir l’aperçu',
    messagePlaceholder: 'Post-it pour ton carnet.',
    stampMotif: 'Timbres',
    dropPhoto: 'Dépose une photo sur l’aperçu ou importe-la depuis ton ordinateur ou téléphone.',
    saved: 'Enregistré',
    addToGallery: '+ Ajouter à la galerie',
    next: 'Suivant',
    prev: 'Précédent',
    typeTitle: 'Créer tes éléments',
    saveTitle: 'Connexion',
    handoffTitle: 'Vos photos, sur le grand écran.',
    albumTitle: 'Album Studio',
    gallery: 'Éléments',
    phone: 'Envoi de photos',
    share: 'Lien de carnet',
    login: 'Connexion',
    legalPrivacy: 'Politique de confidentialité',
    legalMentions: 'Mentions légales',
    inspired: 'Get Inspired',
    album: 'Album Studio',
    home: 'Accueil',
    type: 'Choisir un élément',
    create: 'Créer',
    result: 'Résultat',
    save: 'Sauvegarder',
    handoff: 'Continuer le carnet',
  },
};

const params = new URLSearchParams(location.search);
const state = {
  screen: params.get('screen') || 'home',
  lang: params.get('lang') === 'fr' ? 'fr' : 'en',
  type: params.get('type') || 'Photo',
  frameStyle: 'instax',
  photoSrc: null,
  photoCaption: null,
  messageText: '',
  motif: null,
  mediaSample: null,
  saved: false,
  gallery: [],
  sheet: null,
  inspiredIndex: 0,
  inspiredOpen: false,
};

const t = (key) => (DICT[state.lang] && DICT[state.lang][key]) || DICT.en[key] || key;
const typeLabel = (type) => {
  const def = TYPES.find((x) => x.id === type);
  return def ? def.label[state.lang] || def.label.en : type;
};

const app = document.getElementById('if-m-app');

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const child of [].concat(children)) {
    if (child == null || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

function arrow(dir, onClick, label) {
  const path = dir === 'prev' ? 'M20 12H6M11.5 5.5 5 12l6.5 6.5' : 'M4 12h14M12.5 5.5 19 12l-6.5 6.5';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', path);
  svg.append(p);
  return el('button', { class: 'if-m-arrow', type: 'button', 'aria-label': label, onclick: onClick }, [svg]);
}

function go(screen, patch = {}) {
  Object.assign(state, patch, { screen });
  state.sheet = null;
  if (screen !== 'inspired') state.inspiredOpen = false;
  const url = new URL(location.href);
  url.searchParams.set('screen', state.screen);
  url.searchParams.set('lang', state.lang);
  url.searchParams.set('type', state.type);
  history.replaceState(null, '', url.pathname + '?' + url.searchParams.toString());
  render();
}

function setLang(lang) {
  state.lang = lang;
  const url = new URL(location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url.pathname + '?' + url.searchParams.toString());
  render();
}

function openSheet(kind) {
  state.sheet = kind;
  render();
}

function closeSheet() {
  state.sheet = null;
  render();
}

/* ---------- Chrome ---------- */

function header() {
  const logo = el('button', { class: 'if-m-logo', type: 'button', onclick: () => go('home') }, [
    el('span', { class: 'if-m-logo-mark', 'aria-hidden': 'true' }, Array.from({ length: 16 }, () => el('i'))),
    el('span', { text: 'InstaFrame' }),
  ]);
  const lang = el('div', { class: 'if-m-lang', role: 'group', 'aria-label': 'Language' }, [
    el('button', { type: 'button', 'aria-pressed': String(state.lang === 'en'), onclick: () => setLang('en') }, ['EN']),
    el('button', { type: 'button', 'aria-pressed': String(state.lang === 'fr'), onclick: () => setLang('fr') }, ['FR']),
  ]);
  return el('header', { class: 'if-m-header' }, [logo, lang]);
}

function thumbs() {
  const items = [
    { id: 'create', label: t('generator') },
    { id: 'inspired', label: t('getInspired') },
    { id: 'album', label: t('albumStudio') },
  ];
  return el('nav', { class: 'if-m-thumbs', 'aria-label': 'App' }, items.map((it) =>
    el('button', {
      type: 'button',
      'aria-current': state.screen === it.id ? 'page' : null,
      onclick: () => go(it.id),
    }, [it.label])
  ));
}

function sticky(children, withThumbs = true) {
  return el('div', { class: 'if-m-sticky' }, [].concat(children, withThumbs ? [thumbs()] : []));
}

/* ---------- Screens ---------- */

function screenHome() {
  const title = el('h1', { html: t('homeTitle') });
  const lead = el('p', { class: 'if-m-lead', text: t('homeLead') });
  const start = el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('startFree')]);
  const tour = el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => openSheet('tour') }, [t('tour')]);
  const chips = el('div', { class: 'if-m-chips' }, [
    el('span', { class: 'if-m-chip', text: t('noAccount') }),
    el('span', { class: 'if-m-chip', text: t('importQr') }),
  ]);
  const tryList = el('div', { class: 'if-m-list' }, TYPES.filter((x) => !x.pro).map((x) =>
    el('button', { class: 'if-m-list-item', type: 'button', onclick: () => go('create', { type: x.id }) }, [
      el('span', { text: `${t('tryIt')} – ${x.label[state.lang] || x.label.en}` }),
      el('span', { 'aria-hidden': 'true', text: '→' }),
    ])
  ));
  const footer = el('div', { class: 'if-m-footer' }, [
    el('button', { type: 'button', onclick: () => go('faq') }, [t('faq')]),
    el('button', { type: 'button', onclick: () => go('shop') }, [t('shop')]),
    el('button', { type: 'button', onclick: () => go('legal-privacy') }, [t('privacy')]),
    el('button', { type: 'button', onclick: () => go('legal-mentions') }, [t('legal')]),
  ]);
  return {
    main: el('main', { class: 'if-m-main' }, [title, lead, chips, tour, el('h2', { text: t('tryIt') }), tryList, footer]),
    sticky: sticky([start]),
  };
}

function screenType() {
  const free = TYPES.filter((x) => !x.pro);
  const pro = TYPES.filter((x) => x.pro);
  const card = (x) => el('button', {
    class: 'if-m-type' + (x.pro ? ' pro' : ''),
    type: 'button',
    onclick: () => (x.pro ? openSheet('pro') : go('create', { type: x.id })),
  }, [
    el('strong', { text: x.label[state.lang] || x.label.en }),
    x.pro ? el('span', { class: 'if-m-badge', text: 'PRO' }) : null,
  ]);
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('home'), t('back')), el('h1', { text: t('typeTitle') })]),
    el('div', { class: 'if-m-types' }, free.map(card)),
    el('h2', { text: t('proGroup') }),
    el('div', { class: 'if-m-types' }, pro.map(card)),
  ]);
  return { main, sticky: sticky([el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => go('home') }, [t('backToHome')])]) };
}

function previewFor(type) {
  if (type === 'Photo') {
    if (!state.photoSrc) {
      return el('div', { class: 'if-m-preview' }, [
        el('p', { class: 'if-m-preview-empty', text: t('dropPhoto') }),
      ]);
    }
    const frame = el('div', { class: 'if-m-frame' + (state.frameStyle === 'polaroid' ? ' polaroid' : '') }, [
      el('img', { src: state.photoSrc, alt: '' }),
      el('div', { class: 'if-m-frame-caption', text: state.photoCaption || '' }),
    ]);
    return el('div', { class: 'if-m-preview filled' }, [frame]);
  }
  if (type === 'Message') {
    const text = state.messageText.trim();
    return el('div', { class: 'if-m-preview filled' }, [el('div', { class: 'if-m-postit', text })]);
  }
  if (type === 'Stamp' || type === 'Sticker') {
    if (!state.motif) {
      return el('div', { class: 'if-m-preview' }, [
        el('p', { class: 'if-m-preview-empty', text: t('useSample') }),
      ]);
    }
    const inner = state.motif.startsWith('img:')
      ? el('img', { src: state.motif.slice(4), alt: '' })
      : el('span', { text: state.motif });
    return el('div', { class: 'if-m-preview filled' }, [el('div', { class: 'if-m-motif' }, [inner])]);
  }
  // Audio / Music / Video
  if (!state.mediaSample) {
    return el('div', { class: 'if-m-preview' }, [
      el('p', { class: 'if-m-preview-empty', text: t('useSample') }),
    ]);
  }
  const wave = el('div', { class: 'if-m-wave', 'aria-hidden': 'true' }, Array.from({ length: 24 }, (_, i) =>
    el('i', { style: `height:${20 + ((i * 37) % 80)}%` })
  ));
  return el('div', { class: 'if-m-preview filled' }, [
    el('div', { class: 'if-m-media' }, [
      el('div', { class: 'if-m-media-title', text: typeLabel(type) }),
      wave,
    ]),
  ]);
}

function hasContent() {
  if (state.type === 'Photo') return !!state.photoSrc;
  if (state.type === 'Message') return !!state.messageText.trim();
  if (state.type === 'Stamp' || state.type === 'Sticker') return !!state.motif;
  return !!state.mediaSample;
}

function screenCreate() {
  const type = state.type;
  const ready = hasContent();
  const back = () => go('type');
  const head = el('div', { class: 'if-m-row' }, [
    arrow('prev', back, t('back')),
    el('h1', { text: typeLabel(type) }),
  ]);

  const preview = previewFor(type);

  const controls = [];
  if (type === 'Photo') {
    controls.push(el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => openSheet('photo') }, [t('importPhoto')]));
  } else if (type === 'Message') {
    const field = el('textarea', {
      class: 'if-m-field',
      placeholder: t('messagePlaceholder'),
      rows: '3',
      oninput: (e) => {
        state.messageText = e.target.value;
        const postit = document.querySelector('.if-m-postit');
        if (postit) postit.textContent = state.messageText.trim();
        const dl = document.querySelector('.if-m-sticky .hv-btn-fill');
        if (dl) dl.disabled = !state.messageText.trim();
      },
    });
    field.value = state.messageText;
    controls.push(field);
  } else if (type === 'Stamp' || type === 'Sticker') {
    controls.push(el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => openSheet('motif') }, [t('options')]));
  } else {
    controls.push(el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => { state.mediaSample = type; render(); } }, [typeLabel(type)]));
  }

  const optionsBtn = el('button', { class: 'if-m-textbtn', type: 'button', onclick: () => openSheet('options') }, [t('options')]);

  const main = el('main', { class: 'if-m-main' }, [head, preview, ...controls, optionsBtn]);

  const stickyChildren = [
    el('div', { class: 'if-m-row' }, [
      el('button', { class: 'hv-btn-fill', type: 'button', disabled: !ready, onclick: () => { if (hasContent()) go('result'); } }, [t('download')]),
      el('button', { class: 'hv-btn-ghost', type: 'button', disabled: !ready, onclick: () => { if (hasContent()) go('result'); } }, [t('share')]),
    ]),
  ];
  return { main, sticky: sticky(stickyChildren) };
}

function screenResult() {
  const type = state.type;
  const preview = previewFor(type);
  const download = el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => downloadResult() }, [t('download')]);
  const share = el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => openSheet('share') }, [t('share')]);
  const signIn = el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => go('save') }, [t('signInGoogle')]);
  const album = el('button', { class: 'if-m-textbtn', type: 'button', onclick: () => go('handoff') }, [t('albumStudio')]);
  const another = el('button', { class: 'if-m-textbtn', type: 'button', onclick: () => go('type') }, [t('startFree')]);
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('create'), t('back')), el('h1', { text: typeLabel(type) })]),
    preview,
    el('p', { class: 'if-m-muted', text: t('signInSave') }),
    signIn,
    album,
    another,
  ]);
  return { main, sticky: sticky([ el('div', { class: 'if-m-row' }, [download, share]) ]) };
}

function screenSave() {
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('result'), t('back')), el('h1', { text: t('saveTitle') })]),
    el('p', { class: 'if-m-lead', text: t('signInSave') }),
    el('p', { class: 'if-m-muted', text: t('loginNote') }),
  ]);
  const cont = el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => { saveCurrentToGallery(); go('gallery'); } }, [t('continueGoogle')]);
  return { main, sticky: sticky([cont, el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => go('create') }, [t('backToGenerator')])]) };
}

function saveCurrentToGallery() {
  if (!hasContent()) return;
  const exists = state.gallery.some((it) => it.type === state.type);
  if (!exists) state.gallery.push({ type: state.type, saved: true });
  state.saved = true;
}

function screenHandoff() {
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('result'), t('back')), el('h1', { text: t('handoffTitle') })]),
    el('p', { class: 'if-m-lead', text: t('handoffLead') }),
    el('div', { class: 'if-m-qr', 'aria-hidden': 'true' }),
    el('p', { class: 'if-m-muted', text: t('handoffSub') }),
  ]);
  return { main, sticky: sticky([el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create') }, [t('backToGenerator')])]) };
}

const INSPIRED = [
  { name: 'The Anniversary', description: { en: 'For another year of you two.', fr: 'Une année de plus à deux.' } },
  { name: 'Away Together', description: { en: 'For the places you discover together.', fr: 'Les lieux que vous découvrez ensemble.' } },
  { name: 'The Big Night', description: { en: 'For the moments worth celebrating.', fr: 'Les moments qui méritent une fête.' } },
  { name: 'The New Chapter', description: { en: 'For what comes next.', fr: 'Pour ce qui commence.' } },
  { name: 'The Reunion', description: { en: 'For being together again.', fr: 'Le bonheur de se retrouver.' } },
  { name: 'The Firsts', description: { en: 'For all your first times.', fr: 'Toutes vos premières fois.' } },
  { name: 'The Everyday', description: { en: 'For the little things, every day.', fr: 'Les petits instants de chaque jour.' } },
  { name: 'Just Because', description: { en: 'No occasion needed. Just you.', fr: 'Juste vous, sans occasion particulière.' } },
];

function screenInspired() {
  const idx = state.inspiredIndex % INSPIRED.length;
  const item = INSPIRED[idx];
  const desc = item.description[state.lang] || item.description.en;

  if (state.inspiredOpen) {
    const cover = el('div', { class: 'if-m-cover' }, [
      el('div', { class: 'if-m-cover-title', text: item.name }),
      el('div', { class: 'if-m-cover-sub', text: desc }),
    ]);
    const main = el('main', { class: 'if-m-main' }, [
      el('div', { class: 'if-m-row' }, [
        arrow('prev', () => { state.inspiredOpen = false; render(); }, t('back')),
        el('h1', { text: item.name }),
      ]),
      cover,
      el('p', { class: 'if-m-lead', text: desc }),
    ]);
    return {
      main,
      sticky: sticky([
        el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('makeYourOwn')]),
        el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => { state.inspiredOpen = false; render(); } }, [t('back')]),
      ]),
    };
  }

  const cover = el('div', { class: 'if-m-cover' }, [
    el('div', { class: 'if-m-cover-title', text: item.name }),
    el('div', { class: 'if-m-cover-sub', text: desc }),
  ]);
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [
      arrow('prev', () => go('home'), t('back')),
      el('h1', { text: t('inspiredTitle') }),
    ]),
    el('p', { class: 'if-m-lead', text: t('inspiredSub') }),
    cover,
    el('div', { class: 'if-m-row' }, [
      arrow('prev', () => { state.inspiredIndex = (idx - 1 + INSPIRED.length) % INSPIRED.length; render(); }, t('prev')),
      arrow('next', () => { state.inspiredIndex = (idx + 1) % INSPIRED.length; render(); }, t('next')),
    ]),
  ]);
  return {
    main,
    sticky: sticky([
      el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('startFree')]),
      el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => { state.inspiredOpen = true; render(); } }, [t('openNotebook')]),
    ]),
  };
}

function screenAlbum() {
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('home'), t('back')), el('h1', { text: t('albumTitle') })]),
    el('p', { class: 'if-m-lead', text: t('handoffLead') }),
    el('p', { class: 'if-m-muted', text: t('handoffSub') }),
  ]);
  return {
    main,
    sticky: sticky([
      el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create') }, [t('backToGenerator')]),
      el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => go('save') }, [t('signInGoogle')]),
    ]),
  };
}

function screenGallery() {
  const items = state.gallery;
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('home'), t('back')), el('h1', { text: t('galleryTitle') })]),
    items.length
      ? el('div', { class: 'if-m-list' }, items.map((it) =>
          el('div', { class: 'if-m-list-item static' }, [
            el('span', { text: typeLabel(it.type) }),
            el('span', { class: 'if-m-muted', text: it.saved ? t('saved') : '' }),
          ])
        ))
      : el('p', { class: 'if-m-muted', text: t('galleryEmpty') }),
  ]);
  return {
    main,
    sticky: sticky([el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('startFree')])]),
  };
}

function screenPhone() {
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('home'), t('back')), el('h1', { text: t('phoneTitle') })]),
    el('p', { class: 'if-m-lead', text: t('handoffSub') }),
    el('div', { class: 'if-m-qr', 'aria-hidden': 'true' }),
  ]);
  return {
    main,
    sticky: sticky([
      el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create') }, [t('backToGenerator')]),
      el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('choosePhotos')]),
    ]),
  };
}

function screenShare() {
  const main = el('main', { class: 'if-m-main' }, [
    el('h1', { text: t('share') }),
    el('p', { class: 'if-m-lead', text: t('shareInvalid') }),
  ]);
  return { main, sticky: sticky([el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('home') }, [t('backToHome')])]) };
}

function screenFaq() {
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('home'), t('back')), el('h1', { text: t('faq') })]),
    el('div', { class: 'if-m-faq' }, FAQ.map((item) =>
      el('details', {}, [
        el('summary', { text: item.q[state.lang] || item.q.en }),
        el('p', { text: item.a[state.lang] || item.a.en }),
      ])
    )),
  ]);
  return {
    main,
    sticky: sticky([el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('startFree')])]),
  };
}

function screenLogin() {
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('save'), t('back')), el('h1', { text: t('loginTitle') })]),
    el('p', { class: 'if-m-lead', text: t('signInSave') }),
    el('p', { class: 'if-m-muted', text: t('loginNote') }),
  ]);
  return {
    main,
    sticky: sticky([
      el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => { saveCurrentToGallery(); go('gallery'); } }, [t('continueGoogle')]),
      el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => go('create') }, [t('backToGenerator')]),
    ]),
  };
}

function screenShop() {
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('home'), t('back')), el('h1', { text: t('shop') })]),
    el('p', { class: 'if-m-lead', text: t('shopTitle') }),
    el('p', { class: 'if-m-muted', text: t('shopBody') }),
  ]);
  return {
    main,
    sticky: sticky([
      el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('startFree')]),
      el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => go('home') }, [t('backToHome')]),
    ]),
  };
}

function screenLegal(kind) {
  const title = kind === 'privacy' ? t('legalPrivacy') : t('legalMentions');
  const main = el('main', { class: 'if-m-main' }, [
    el('div', { class: 'if-m-row' }, [arrow('prev', () => go('home'), t('back')), el('h1', { text: title })]),
    el('p', { class: 'if-m-muted', text: t('legalBody') }),
  ]);
  return { main, sticky: sticky([el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('home') }, [t('backToHome')])]) };
}

/* ---------- Sheets ---------- */

function sheetPhoto() {
  const samples = el('div', { class: 'if-m-samples' }, PHOTOS.map((p) =>
    el('button', {
      class: 'if-m-sample',
      type: 'button',
      'aria-pressed': String(state.photoSrc === p.src),
      onclick: () => {
        state.photoSrc = p.src;
        state.photoCaption = p.caption[state.lang] || p.caption.en;
        closeSheet();
      },
    }, [el('img', { src: p.src, alt: '' }), el('span', { text: p.caption[state.lang] || p.caption.en })])
  ));
  const fileLabel = el('label', { class: 'if-m-file' }, [t('importPhoto')]);
  const fileInput = el('input', {
    type: 'file',
    accept: 'image/*',
    onchange: (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        state.photoSrc = reader.result;
        state.photoCaption = '';
        closeSheet();
      };
      reader.readAsDataURL(file);
    },
  });
  fileLabel.append(fileInput);
  const styles = el('div', { class: 'if-m-styles' }, [
    el('button', { class: 'if-m-style', type: 'button', 'aria-pressed': String(state.frameStyle === 'instax'), onclick: () => { state.frameStyle = 'instax'; render(); } }, [t('instax')]),
    el('button', { class: 'if-m-style', type: 'button', 'aria-pressed': String(state.frameStyle === 'polaroid'), onclick: () => { state.frameStyle = 'polaroid'; render(); } }, [t('polaroid')]),
  ]);
  return el('div', { class: 'if-m-sheet' }, [
    sheetHead(t('choosePhoto')),
    samples,
    fileLabel,
    el('h3', { text: t('frameStyle') }),
    styles,
  ]);
}

function sheetMotif() {
  const options = [
    ...STICKERS.map((src) => ({ value: 'img:' + src, label: '' })),
    { value: 'InstaFrame', label: 'InstaFrame' },
    { value: '2026', label: '2026' },
  ];
  return el('div', { class: 'if-m-sheet' }, [
    sheetHead(t('stampMotif')),
    el('div', { class: 'if-m-samples' }, options.map((o) =>
      el('button', {
        class: 'if-m-sample',
        type: 'button',
        'aria-pressed': String(state.motif === o.value),
        onclick: () => { state.motif = o.value; closeSheet(); },
      }, [o.value.startsWith('img:') ? el('img', { src: o.value.slice(4), alt: '' }) : el('span', { text: o.label })])
    )),
  ]);
}

function sheetOptions() {
  const styles = el('div', { class: 'if-m-styles' }, [
    el('button', { class: 'if-m-style', type: 'button', 'aria-pressed': String(state.frameStyle === 'instax'), onclick: () => { state.frameStyle = 'instax'; render(); } }, [t('instax')]),
    el('button', { class: 'if-m-style', type: 'button', 'aria-pressed': String(state.frameStyle === 'polaroid'), onclick: () => { state.frameStyle = 'polaroid'; render(); } }, [t('polaroid')]),
  ]);
  return el('div', { class: 'if-m-sheet' }, [sheetHead(t('options')), styles]);
}

function sheetPro() {
  return el('div', { class: 'if-m-sheet' }, [
    sheetHead(t('proSheetTitle')),
    el('p', { class: 'if-m-lead', text: t('proSheetBody') }),
    el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('backToGenerator')]),
  ]);
}

function sheetTour() {
  return el('div', { class: 'if-m-sheet' }, [
    sheetHead(t('tourTitle')),
    el('p', { class: 'if-m-lead', text: t('tourBody') }),
    el('div', { class: 'if-m-list' }, [
      el('div', { class: 'if-m-list-item static' }, [el('span', { text: '1 · ' + t('tourStep1') })]),
      el('div', { class: 'if-m-list-item static' }, [el('span', { text: '2 · ' + t('tourStep2') })]),
      el('div', { class: 'if-m-list-item static' }, [el('span', { text: '3 · ' + t('tourStep3') })]),
    ]),
    el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => go('create', { type: 'Photo' }) }, [t('showMe')]),
    el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => closeSheet() }, [t('skip')]),
  ]);
}

function sheetShare() {
  return el('div', { class: 'if-m-sheet' }, [
    sheetHead(t('share')),
    el('p', { class: 'if-m-lead', text: t('handoffSub') }),
    el('button', { class: 'hv-btn-fill', type: 'button', onclick: () => { closeSheet(); downloadResult(); } }, [t('download')]),
    el('button', { class: 'hv-btn-ghost', type: 'button', onclick: () => closeSheet() }, [t('close')]),
  ]);
}

function sheetHead(title) {
  return el('div', { class: 'if-m-sheet-head' }, [
    el('h2', { text: title }),
    el('button', { class: 'if-m-sheet-close', type: 'button', 'aria-label': t('close'), onclick: () => closeSheet() }, ['×']),
  ]);
}

function currentSheet() {
  switch (state.sheet) {
    case 'photo': return sheetPhoto();
    case 'motif': return sheetMotif();
    case 'options': return sheetOptions();
    case 'pro': return sheetPro();
    case 'tour': return sheetTour();
    case 'share': return sheetShare();
    default: return null;
  }
}

/* ---------- Download ---------- */

function downloadResult() {
  if (state.type === 'Photo' && state.photoSrc) {
    const a = document.createElement('a');
    a.href = state.photoSrc;
    a.download = 'instaframe-photo';
    document.body.append(a);
    a.click();
    a.remove();
    return;
  }
  // Fallback: draw a simple PNG of the preview.
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f7f4f1';
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = '#100808';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(typeLabel(state.type), 300, 300);
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instaframe-' + state.type.toLowerCase() + '.png';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}

/* ---------- Render ---------- */

function render() {
  const screens = {
    home: screenHome,
    type: screenType,
    create: screenCreate,
    result: screenResult,
    save: screenSave,
    handoff: screenHandoff,
    inspired: screenInspired,
    album: screenAlbum,
    gallery: screenGallery,
    phone: screenPhone,
    share: screenShare,
    faq: screenFaq,
    login: screenLogin,
    shop: screenShop,
    'legal-privacy': () => screenLegal('privacy'),
    'legal-mentions': () => screenLegal('mentions'),
  };
  const fn = screens[state.screen] || screenHome;
  const { main, sticky: stickyBar } = fn();
  const sheet = currentSheet();
  app.replaceChildren(
    header(),
    main,
    stickyBar,
    sheet ? el('div', { class: 'if-m-scrim', onclick: (e) => { if (e.target === e.currentTarget) closeSheet(); } }, [sheet]) : document.createComment('no-sheet')
  );
  document.documentElement.lang = state.lang;
}

render();
