// Mobile Album Studio presentation. View / share + continue on tablet/desktop.
// Reuses existing product strings only. No new features, no full editor.
const STRINGS = {
  en: {
    title: 'Album Studio',
    lead: 'Creating a notebook takes room. Open InstaFrame on your computer or tablet to bring your memories to life.',
    shared: 'Shared notebooks stay accessible on your phone by link',
    send: 'Send your photos to InstaFrame, then keep creating on your computer.',
    keep: 'You can keep creating on your computer.',
    back: 'Back to the generator',
    signInBody: 'Sign in with Google to use Album Studio. Your notebook saves automatically to your account.',
    signIn: 'Sign in with Google',
    cancel: 'Cancel',
    menu: 'Menu',
    close: 'Close',
  },
  fr: {
    title: 'Album Studio',
    lead: 'Composer un carnet demande de la place. Retrouvez InstaFrame sur votre ordinateur ou votre tablette pour donner vie à vos souvenirs.',
    shared: 'Les carnets partagés restent accessibles par lien, et le QR code permet d\'envoyer vos photos et vidéos vers InstaFrame.',
    send: 'Envoyez vos photos dans InstaFrame, puis continuez sur votre ordinateur.',
    keep: 'Vous pouvez continuer sur votre ordinateur.',
    back: 'Retour au générateur',
    signInBody: 'Connectez-vous avec Google pour utiliser Album Studio. Votre carnet est enregistré automatiquement dans votre compte.',
    signIn: 'Se connecter avec Google',
    cancel: 'Annuler',
    menu: 'Menu',
    close: 'Fermer',
  },
};

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'className') node.className = v;
    else if (k === 'textContent') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of children) {
    if (c == null) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

function coverArt() {
  // Reuse the local studio demo cover palette (burgundy / beige) as a CSS-only preview.
  return el('div', { className: 'album-mobile__cover', 'aria-hidden': 'true' }, [
    el('span', { className: 'album-mobile__cover-band' }),
    el('span', { className: 'album-mobile__cover-title' }, ['InstaFrame']),
  ]);
}

function openPreview() {
  return el('div', { className: 'album-mobile__open', 'aria-hidden': 'true' }, [
    el('span', { className: 'album-mobile__open-page album-mobile__open-page--left' }),
    el('span', { className: 'album-mobile__open-page album-mobile__open-page--right' }),
  ]);
}

export function renderAlbumMobile({ lang = 'en', localDemo = false, onNavigate = () => {} } = {}) {
  const t = STRINGS[lang] || STRINGS.en;
  const root = el('main', { className: 'album-mobile', 'data-no-i18n': '' });

  const header = el('header', { className: 'album-mobile__header' }, [
    el('span', { className: 'album-mobile__logo', 'aria-hidden': 'true' }),
    el('span', { className: 'album-mobile__brand' }, ['InstaFrame']),
    el('button', {
      type: 'button',
      className: 'album-mobile__menu',
      'aria-label': t.menu,
      onClick: () => onNavigate('/'),
    }, [t.menu]),
  ]);
  root.appendChild(header);

  const body = el('section', { className: 'album-mobile__body' });
  body.appendChild(el('h1', { className: 'album-mobile__title' }, [t.title]));

  if (localDemo) {
    body.appendChild(el('div', { className: 'album-mobile__preview' }, [coverArt(), openPreview()]));
    body.appendChild(el('p', { className: 'album-mobile__lead' }, [t.lead]));
    body.appendChild(el('p', { className: 'album-mobile__note' }, [t.shared]));
    body.appendChild(el('p', { className: 'album-mobile__note' }, [t.keep]));
    body.appendChild(el('button', {
      type: 'button',
      className: 'hv-btn-fill album-mobile__cta',
      onClick: () => onNavigate('/generator'),
    }, [t.back]));
  } else {
    body.appendChild(el('p', { className: 'album-mobile__lead' }, [t.lead]));
    body.appendChild(el('p', { className: 'album-mobile__note' }, [t.send]));
    body.appendChild(el('p', { className: 'album-mobile__note' }, [t.shared]));
    body.appendChild(el('button', {
      type: 'button',
      className: 'hv-btn-fill album-mobile__cta',
      onClick: () => onNavigate('/generator'),
    }, [t.back]));
    const signIn = el('div', { className: 'album-mobile__signin' }, [
      el('p', { className: 'album-mobile__signin-body' }, [t.signInBody]),
      el('button', {
        type: 'button',
        className: 'album-mobile__ghost album-mobile__ghost--google',
        onClick: () => {},
      }, [t.signIn]),
    ]);
    body.appendChild(signIn);
  }

  root.appendChild(body);
  return root;
}
