// src/pages/phone-transfer-share-album.js
// Vanilla DOM ES module. No imports. No network. No storage. No auth.

const SVG_NS = 'http://www.w3.org/2000/svg'

function svg(tag, attrs = {}, children = []) {
  const el = document.createElementNS(SVG_NS, tag)
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v))
  for (const c of children) el.appendChild(c)
  return el
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue
    if (k === 'className') node.className = v
    else if (k === 'textContent') node.textContent = v
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else node.setAttribute(k, v === true ? '' : String(v))
  }
  for (const c of children) {
    if (c == null) continue
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return node
}

function copyFor(lang) {
  const fr = lang === 'fr'
  return {
    fr,
    phone: fr ? {
      title: 'Vos photos, sur grand écran.', subtitle: 'Envoyez vos photos dans InstaFrame, puis continuez sur votre ordinateur.',
      complete: 'Photos reçues sur l’ordinateur', ready: 'Ordinateur connecté', connecting: 'Connexion en cours', lost: 'Connexion interrompue', invalid: 'Lien non valide',
      pick: 'Choisir des photos', sending: 'Envoi en cours…', help: 'Gardez InstaFrame ouvert sur votre ordinateur.',
      received: (n, all) => `${n} sur ${all} reçues`, retry: 'Scannez à nouveau le QR code affiché sur votre ordinateur.',
      lostHelp: 'Vérifiez que la fenêtre InstaFrame est toujours ouverte, puis scannez à nouveau le QR code.',
      progress: (n, all) => `${n} sur ${all} envoyées`, done: 'Vous pouvez continuer sur votre ordinateur.',
      error: 'Impossible d’envoyer cette photo.', tryAgain: 'Réessayer l’envoi',
      back: 'Retour au générateur', sendMore: 'Envoyer d’autres photos',
    } : {
      title: 'Your photos, on the big screen.', subtitle: 'Send your photos to InstaFrame, then keep creating on your computer.',
      complete: 'Photos received on computer', ready: 'Computer connected', connecting: 'Connecting', lost: 'Connection lost', invalid: 'Invalid link',
      pick: 'Choose photos', sending: 'Sending photos…', help: 'Keep InstaFrame open on your computer.',
      received: (n, all) => `${n} of ${all} received`, retry: 'Scan the QR code shown on your computer again.',
      lostHelp: 'Make sure the InstaFrame window is still open, then scan the QR code again.',
      progress: (n, all) => `${n} of ${all} sent`, done: 'You can keep creating on your computer.',
      error: 'Unable to send this photo.', tryAgain: 'Try sending again',
      back: 'Back to the generator', sendMore: 'Send more photos',
    },
    transfer: fr ? {
      title: 'Vos fichiers InstaFrame', subtitle: 'Appuyez sur une image pour l’ouvrir, puis maintenez le doigt dessus pour l’ajouter à Photos.',
      loading: 'Préparation de vos fichiers…', invalid: 'Ce lien de téléchargement a expiré.',
      help: 'Le lien est valable 1 heure. Pour un nouveau lien, recommencez le téléchargement sur votre ordinateur.',
      save: 'Ouvrir l’image', back: 'Retour au générateur',
      error: 'Impossible de charger vos fichiers. Vérifiez votre connexion.', retry: 'Réessayer',
    } : {
      title: 'Your InstaFrame files', subtitle: 'Tap an image to open it, then long-press it to add it to Photos.',
      loading: 'Preparing your files…', invalid: 'This download link has expired.',
      help: 'The link works for 1 hour. For a new one, start the download again on your computer.',
      save: 'Open image', back: 'Back to the generator',
      error: 'Could not load your files. Check your connection.', retry: 'Try again',
    },
    share: fr ? {
      invalid: "Ce lien d'album n'est pas valide.",
      retry: 'Réessayer', backHome: "Retour à l'accueil",
      loading: "Chargement de l'album…",
    } : {
      invalid: 'This album link is not valid.',
      retry: 'Try again', backHome: 'Back to home',
      loading: 'Loading the album…',
    },
    album: {
      title: 'Album Studio',
      body: 'Sign in with Google to use Album Studio. Your notebook saves automatically to your account.',
      signIn: 'Sign in with Google',
      cancel: 'Cancel',
      skip: 'Skip to content',
    },
  }
}

function makeLink(href, className, text, onNavigate) {
  return el('a', {
    className,
    href,
    onClick: (e) => { e.preventDefault(); onNavigate(href) },
  }, [text])
}

function phoneStatusLabel(copy, state) {
  return copy[state]
}

function renderPhone({ lang, status, onNavigate }) {
  const copy = copyFor(lang).phone
  const state = ['connecting','lost','invalid'].includes(status)?status:'invalid'
  const main = el('main', { className: 'phone', 'data-no-i18n': '' })

  const brand = el('header', { className: 'phone__brand', 'aria-label': 'InstaFrame' }, [
    el('span', { className: 'phone__logo', 'aria-hidden': 'true' }),
    el('span', { className: 'phone__name' }, ['InstaFrame']),
  ])
  main.appendChild(brand)

  const content = el('section', { className: 'phone__content', 'aria-labelledby': 'phone-title' })

  const statusEl = el('div', { className: `phone__status phone__status--${state}`, role: 'status' }, [
    el('span', { className: 'phone__status-dot', 'aria-hidden': 'true' }),
    phoneStatusLabel(copy, state),
  ])
  content.appendChild(statusEl)

  content.appendChild(el('h1', { id: 'phone-title' }, [copy.title]))
  content.appendChild(el('p', { className: 'phone__intro' }, [copy.subtitle]))


    const hint = el('p', {
      className: 'phone__hint',
      role: state === 'connecting' ? 'status' : 'alert',
    }, [state === 'invalid' ? copy.retry : state === 'lost' ? copy.lostHelp : copy.help])
    content.appendChild(hint)

  if (state === 'invalid' || state === 'lost') {
    content.appendChild(makeLink('/generator', 'phone__pick', copy.back, onNavigate))
  }

  main.appendChild(content)
  return main
}

function renderTransfer({ lang, status, onNavigate }) {
  const copy = copyFor(lang).transfer
  const state = status || 'invalid'
  const main = el('main', { className: 'phone phone--download' })
  main.appendChild(el('h1', { className: 'phone__name' }, [copy.title]))

  if (state === 'loading') {
    main.appendChild(el('div', { className: 'phone__spinline', role: 'status' }, [
      el('span', { className: 'phone__spinner', 'aria-hidden': 'true' }),
      el('span', {}, [copy.loading]),
    ]))
  } else if (state === 'invalid') {
    main.appendChild(el('p', { className: 'phone__hint', role: 'alert' }, [copy.invalid]))
    main.appendChild(el('p', { className: 'phone__hint' }, [copy.help]))
    main.appendChild(makeLink('/generator', undefined, copy.back, onNavigate))
  } else if (state === 'error') {
    main.appendChild(el('p', { role: 'alert' }, [copy.error]))
    main.appendChild(el('button', {
      type: 'button',
      onClick: () => {
        // Local re-render of same error state; never network.
        const parent = main.parentNode
        if (parent) {
          const next = renderTransfer({ lang, status: 'error', onNavigate })
          parent.replaceChild(next, main)
        }
      },
    }, [copy.retry]))
  }

  return main
}

function renderShare({ lang, status, onNavigate }) {
  const copy = copyFor(lang).share
  const state = status || 'invalid'
  const main = el('main', { className: 'notebook-preview album-reader album-reader--share reader-2d', 'data-no-i18n': '' })

  if (state === 'loading') {
    main.appendChild(el('p', { className: 'reader-loading', role: 'status' }, [copy.loading]))
    return main
  }

  // invalid or error
  const p = el('p', { role: 'alert', className: 'reader-error', style: { marginTop: '80px' } })
  p.appendChild(document.createTextNode((state==='error'?(lang==='fr'?'Impossible de charger cet album. Réessayez.':'Could not load this album. Try again.'):copy.invalid)))
  p.appendChild(document.createTextNode(' '));
  if (state === 'error') {
    p.appendChild(el('button', {
      type: 'button',
      onClick: () => {
        const parent = main.parentNode
        if (parent) {
          const next = renderShare({ lang, status: 'error', onNavigate })
          parent.replaceChild(next, main)
        }
      },
    }, [copy.retry]))
    p.appendChild(document.createTextNode(' '))
  }
  p.appendChild(makeLink('/', undefined, copy.backHome, onNavigate))
  main.appendChild(p)
  return main
}

function renderSkipToContent() {
  return el('a', {
    className: 'skip-to-content',
    href: '#page-content',
    onClick: (e) => {
      e.preventDefault()
      const target = document.getElementById('page-content')
      if (target) target.focus()
    },
  }, ['Skip to content'])
}

export function renderSignInDialog({ onClose }) {
  const copy = copyFor('en').album
  const dialogRef = { current: null }
  const backdrop = el('div', {
    className: 'albums-backdrop',
    onClick: (event) => { if (event.target === event.currentTarget) onClose() },
  })

  const icon = el('span', { className: 'studio-signin__icon', 'aria-hidden': 'true' }, [
    svg('svg', { viewBox: '0 0 32 32', width: 32, height: 32, fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
      svg('rect', { x: 7, y: 3, width: 21, height: 26, rx: 1 }),
      svg('path', { d: 'M12 3v26M4 8h6M4 16h6M4 24h6M17 12l3 3 4-5' }),
    ]),
  ])

  const header = el('header', {style:{marginBottom:'10px'}}, [
    icon,
    el('h2', { id: 'studio-signin-title' }, [copy.title]),
  ])

  const signInBtn = el('button', { type: 'button', className: 'btn btn--dark btn--small' }, [copy.signIn])
  const cancelBtn = el('button', { type: 'button', className: 'btn btn--white btn--small', onClick: onClose }, [copy.cancel])

  const actions = el('div', { className: 'saved-actions' }, [signInBtn, cancelBtn])

  const dialog = el('div', {
    className: 'albums-dialog studio-signin',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'studio-signin-title',
  }, [
    header,
    el('p', {style:{margin:0}}, [copy.body]),
    actions,
  ])
  dialogRef.current = dialog
  backdrop.appendChild(dialog)

  // Dialog-local Escape / focus-trap handlers only.
  const previous = document.activeElement
  const keyHandler = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); onClose() }
    if (event.key === 'Tab') {
      const buttons = dialog.querySelectorAll('button')
      if (!buttons.length) return
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
  }
  dialog.addEventListener('keydown', keyHandler)
  // Focus first button after mount.
  queueMicrotask(() => {
    const first = dialog.querySelector('button')
    if (first) first.focus()
  })
  // Cleanup when removed from DOM.
  const observer = new MutationObserver(() => {
    if (!backdrop.isConnected) {
      dialog.removeEventListener('keydown', keyHandler)
      observer.disconnect()
      if (previous && typeof previous.focus === 'function') previous.focus()
    }
  })
  // Observe after insertion; use a microtask to attach.
  queueMicrotask(() => {
    if (backdrop.parentNode) observer.observe(backdrop.parentNode, { childList: true, subtree: true })
  })

  return backdrop
}

function renderAlbum({ onNavigate }) {
  const app = el('div', { className: 'app studio' })
  app.appendChild(renderSkipToContent())
  app.appendChild(renderSignInDialog({
    onClose: () => onNavigate('/generator'),
  }))
  return app
}

export function renderTransferScene({ page = 'phone', lang = 'en', status = null, onNavigate = () => {} } = {}) {
  if (page === 'phone') return renderPhone({ lang, status, onNavigate })
  if (page === 'transfer') return renderTransfer({ lang, status, onNavigate })
  if (page === 'share') return renderShare({ lang, status, onNavigate })
  if (page === 'album') return renderAlbum({ onNavigate })
  return renderPhone({ lang, status, onNavigate })
}