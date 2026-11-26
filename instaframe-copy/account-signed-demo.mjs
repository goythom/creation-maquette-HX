// InstaFrame copy only: signed-in account pages, redrawn from the owner's
// captures (Compte, Éléments enregistrés, Carnets) with the homogeneity layer.
// Demo identity and demo items; no account, no network.
import { renderSidebar } from './shop-pages-deepseek.mjs';
import { pixel } from './pixel-dom.mjs';

const T = (lang, en, fr) => (lang === 'fr' ? fr : en);

function el(tag, props = {}, kids = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2).toLowerCase(), v);
    else n.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of [].concat(kids)) if (c != null && c !== false) n.append(typeof c === 'string' ? document.createTextNode(c) : c);
  return n;
}

const USER = { name: 'Camille Martin', email: 'camille@example.com', used: 132, total: 2048 };

function accountCard(lang) {
  const pct = Math.max(2, Math.round((USER.used / USER.total) * 100));
  return el('div', { class: 'if-me' }, [
    el('div', { class: 'if-me__row' }, [
      el('span', { class: 'if-me__av', text: USER.name[0] }),
      el('span', { class: 'if-me__id' }, [el('b', { text: USER.name }), el('span', { text: USER.email })]),
    ]),
    el('div', { class: 'if-me__storage' }, [
      el('span', { text: T(lang, 'Storage', 'Stockage') }),
      el('span', { text: `${USER.used} MB / 2 GB` }),
    ]),
    el('div', { class: 'if-me__bar', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100 }, el('i', { style: `width:${pct}%` })),
  ]);
}

function shell({ lang, active, main, onNavigate }) {
  const side = renderSidebar({ active, tagline: T(lang, 'Frame print generator', 'Générateur de cadres photo'), lang, onNavigate });
  const foot = side.querySelector('.side__foot');
  if (foot) foot.replaceChildren(accountCard(lang));
  // Signed in: the nav gains My account, and Album Studio opens directly.
  const nav = side.querySelector('.side__nav');
  if (nav) {
    for (const a of [...nav.querySelectorAll('a.nav')]) {
      const c = a.cloneNode(true);
      const to = a.getAttribute('href') === '/album' ? '/album/local-demo' : a.getAttribute('href');
      c.addEventListener('click', e => { e.preventDefault(); onNavigate(to + '?signed=true'); });
      a.replaceWith(c);
    }
    const me = el('a', { class: 'nav' + (active === 'account' ? ' nav--active' : ''), href: '/compte', 'aria-current': active === 'account' ? 'page' : null, onclick: e => { e.preventDefault(); onNavigate('/compte?signed=true'); } }, [pixel('utilisateur', 24), el('span', { text: 'My account' })]);
    nav.prepend(me);
  }
  return el('div', { class: 'app app--workbench app--navigation if-signed' }, [side, main]);
}

function head(lang, title, sub, extra) {
  return el('header', { class: 'if-head' }, [el('h1', { text: title }), sub ? el('p', { text: sub }) : null, extra || null]);
}

function segmented(items) {
  return el('div', { class: 'if-seg', role: 'group' }, items.map(([label, on]) => el('button', { type: 'button', 'aria-pressed': String(!!on), text: label })));
}

function tile(icon, title, desc, to, onNavigate, extra = '') {
  const b = el('button', { type: 'button', class: 'if-tile ' + extra, onclick: () => to && onNavigate(to + '?signed=true') }, [
    el('span', { class: 'if-tile__icon' }, pixel(icon, 24)),
    el('span', { class: 'if-tile__txt' }, [el('b', { text: title }), el('span', { text: desc })]),
    el('span', { class: 'if-tile__go', 'aria-hidden': 'true', text: '→' }),
  ]);
  return b;
}

function group(title, tiles) {
  return el('section', { class: 'if-group' }, [el('h2', { text: title }), el('div', { class: 'if-grid' }, tiles)]);
}

function accountPage({ lang, onNavigate }) {
  const main = el('main', { class: 'main if-main', 'data-no-i18n': '' }, [
    head(lang, T(lang, 'My account', 'Mon compte'), `${USER.name} · ${USER.email}`),
    group(T(lang, 'My creations', 'Mes créations'), [
      tile('photo', T(lang, 'Saved elements', 'Éléments enregistrés'), T(lang, '1 element in your account', '1 élément dans ton compte'), '/saved/elements', onNavigate),
      tile('livre', T(lang, 'Notebooks', 'Carnets'), T(lang, 'No notebook yet', 'Aucun carnet pour l’instant'), '/saved/notebooks', onNavigate),
    ]),
    group(T(lang, 'Account', 'Compte'), [
      tile('utilisateur', T(lang, 'Settings', 'Paramètres'), T(lang, 'Name, language, emails', 'Nom, langue, e-mails'), '/compte/parametres', onNavigate),
      tile('telecharger', T(lang, 'Download my data', 'Télécharger mes données'), T(lang, 'A copy of everything, as a ZIP file', 'Une copie de tout, en fichier ZIP'), null, onNavigate),
      tile('lecture', T(lang, 'Take the tour', 'Faire la visite'), T(lang, 'Two minutes to see the main tools', 'Deux minutes pour voir les outils principaux'), null, onNavigate),
    ]),
    group(T(lang, 'Owner', 'Propriétaire'), [
      tile('cadenas', T(lang, 'Owner console', 'Console propriétaire'), T(lang, 'Visible to the owner account only', 'Visible uniquement par le compte propriétaire'), '/owner', onNavigate, 'if-tile--quiet'),
    ]),
    el('footer', { class: 'if-danger' }, [
      el('button', { type: 'button', class: 'if-btn', text: T(lang, 'Sign out', 'Se déconnecter') }),
      el('button', { type: 'button', class: 'if-link-danger', text: T(lang, 'Delete my account', 'Supprimer mon compte') }),
    ]),
  ]);
  return shell({ lang, active: 'account', main, onNavigate });
}

const ITEMS = [
  ['./demo-couples/trip-polaroid.webp', 'Photo', 'Our first trip', 'Notre premier voyage'],
  ['./demo-couples/summer-2026.webp', 'Photo', 'Summer 2026', 'Été 2026'],
  ['./demo-couples/just-because.webp', 'Message', 'Just because', 'Juste comme ça'],
];

function elementsPage({ lang, onNavigate }) {
  const grid = el('div', { class: 'if-items' }, ITEMS.map(([src, kind, en, fr]) => el('article', { class: 'if-item' }, [
    el('div', { class: 'if-item__img' }, el('img', { src, alt: '' })),
    el('label', { class: 'if-item__title' }, [el('input', { type: 'checkbox' }), el('span', {}, [el('small', { text: kind === 'Photo' ? 'Photo' : 'Message' }), el('b', { text: T(lang, en, fr) })])]),
    el('div', { class: 'if-item__actions' }, [
      el('button', { type: 'button', class: 'if-btn', text: T(lang, 'Add to gallery', 'Ajouter à la galerie') }),
      el('button', { type: 'button', class: 'if-btn if-btn--icon', 'aria-label': T(lang, 'Delete', 'Supprimer') }, pixel('corbeille', 18)),
    ]),
  ])));
  const tools = el('div', { class: 'if-tools' }, [
    segmented([[T(lang, 'All', 'Tout'), true], ['Photo'], ['Message'], [T(lang, 'Music', 'Musique')]]),
    el('span', { class: 'if-count', text: T(lang, '0 selected', '0 sélectionné') }),
    el('button', { type: 'button', class: 'if-btn if-btn--primary', disabled: true, text: T(lang, 'Send to notebook', 'Envoyer au carnet') }),
  ]);
  const main = el('main', { class: 'main if-main', 'data-no-i18n': '' }, [head(lang, T(lang, 'Saved elements', 'Éléments enregistrés'), T(lang, 'Everything you created in the generator, kept in your account.', 'Tout ce que tu as créé dans le générateur, gardé dans ton compte.'), tools), grid]);
  return shell({ lang, active: 'saved-elements', main, onNavigate });
}

function notebooksPage({ lang, onNavigate }) {
  const empty = el('section', { class: 'if-empty' }, [
    el('span', { class: 'if-empty__icon' }, pixel('livre', 32)),
    el('h2', { text: T(lang, 'No notebook yet', 'Aucun carnet pour l’instant') }),
    el('p', { text: T(lang, 'Start one in Album Studio, or from a notebook in Get Inspired.', 'Commence-en un dans Album Studio, ou à partir d’un carnet de Get Inspired.') }),
    el('div', { class: 'if-empty__actions' }, [
      el('button', { type: 'button', class: 'if-btn if-btn--primary', text: T(lang, 'Open Album Studio', 'Ouvrir Album Studio'), onclick: () => onNavigate('/album/local-demo') }),
      el('button', { type: 'button', class: 'if-btn', text: 'Get Inspired', onclick: () => onNavigate('/get-inspired?signed=true') }),
    ]),
  ]);
  const main = el('main', { class: 'main if-main', 'data-no-i18n': '' }, [head(lang, T(lang, 'Notebooks', 'Carnets'), null, segmented([[T(lang, 'Notebooks', 'Carnets'), true], [T(lang, 'Trash', 'Corbeille')]])), empty]);
  return shell({ lang, active: 'saved-notebooks', main, onNavigate });
}

export function renderSignedAccount({ page, lang = 'en', onNavigate = () => {} }) {
  if (page === 'elements') return elementsPage({ lang, onNavigate });
  if (page === 'notebooks') return notebooksPage({ lang, onNavigate });
  return accountPage({ lang, onNavigate });
}
