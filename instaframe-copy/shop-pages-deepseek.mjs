import { pixel } from "./pixel-dom.mjs"

export const PRODUCTS = {
  'pack-basic': { id: 'pack-basic', name: 'Print My Notebook', price: 1499, blurb: '1 softcover notebook, 12 Instax Mini prints' },
  'pack-complete': { id: 'pack-complete', name: 'Complete Memory Pack', price: 2499, blurb: '1 hardcover notebook, 20 mixed frames + sleeve' },
  'pack-deluxe': { id: 'pack-deluxe', name: 'Deluxe Gift Pack', price: 3999, blurb: '2 hardcover copies + 30 frames, crayons, stickers + gift box' },
  notebook: { id: 'notebook', name: 'Notebook Copy', price: 1499, blurb: 'Your finished design' },
  'instax-1': { id: 'instax-1', name: 'Instax Frame', price: 99 },
  'instax-pack': { id: 'instax-pack', name: 'Instax Frame pack', price: 799 },
  'polaroid-1': { id: 'polaroid-1', name: 'Polaroid Frame', price: 119 },
  'polaroid-pack': { id: 'polaroid-pack', name: 'Polaroid Frame pack', price: 999 },
  'crayon-1': { id: 'crayon-1', name: 'Color Crayon', price: 49 },
  'crayon-set': { id: 'crayon-set', name: 'Color Crayons set', price: 599 },
  'sticker-1': { id: 'sticker-1', name: 'Kawaii Sticker', price: 39 },
  'sticker-pack': { id: 'sticker-pack', name: 'Kawaii Stickers pack', price: 499 },
}

export const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`

export const PRODUCT_IMAGES = {
  'pack-basic': '/shop/notebook.jpg',
  'pack-complete': '/shop/instax.jpg',
  'pack-deluxe': '/stickers/kawaii_17.png',
  notebook: '/shop/notebook.jpg',
  instax: '/shop/instax.jpg',
  polaroid: '/shop/polaroid.jpg',
  crayons: '/shop/crayons.jpg',
  stickers: '/stickers/kawaii_17.png',
}

export const EXTRAS = [
  { key: 'notebook', title: 'Notebook Copy', img: '/shop/notebook.jpg', single: 'notebook' },
  { key: 'instax', title: 'Instax Frame', img: '/shop/instax.jpg', single: 'instax-1', pack: 'instax-pack' },
  { key: 'polaroid', title: 'Polaroid Frame', img: '/shop/polaroid.jpg', single: 'polaroid-1', pack: 'polaroid-pack' },
  { key: 'crayon', title: 'Color Crayons', img: '/shop/crayons.jpg', single: 'crayon-1', pack: 'crayon-set' },
  { key: 'sticker', title: 'Kawaii Stickers', img: '/stickers/kawaii_17.png', single: 'sticker-1', pack: 'sticker-pack' },
]

export const TIERS = [
  { id: 'pack-basic', label: 'Basic', small: '1 softcover notebook, 12 Instax Mini prints', flag: undefined },
  { id: 'pack-complete', label: 'Complete', small: '1 hardcover notebook, 20 mixed frames + sleeve', flag: 'MOST POPULAR' },
  { id: 'pack-deluxe', label: 'Deluxe', small: '2 hardcover copies, 30 frames, crayons, stickers, gift box', flag: undefined },
]

export const CAROUSEL = ['/shop/notebook.jpg', '/shop/instax.jpg', '/shop/polaroid.jpg', '/shop/crayons.jpg', '/stickers/kawaii_17.png']

const NAV = [
  { key: 'inspired', to: '/get-inspired', label: 'Get Inspired' },
  { key: 'generator', to: '/generator', label: 'Generator' },
  { key: 'album', to: '/album', label: 'Album Studio' },
  { key: 'shop', to: '/shop', label: 'Shop' },
]

const NAV_ICONS = { account: 'utilisateur', inspired: 'ampoule', generator: 'ajouter', album: 'livre', shop: 'sac', 'saved-elements': 'calques', 'saved-notebooks': 'livre' }

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue
    if (k === 'class') node.className = v
    else if (k === 'text') node.textContent = v
    else if (k === 'html') node.innerHTML = v
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'dataset') Object.assign(node.dataset, v)
    else if (k in node && k !== 'list') { try { node[k] = v } catch { node.setAttribute(k, v) } }
    else node.setAttribute(k, v === true ? '' : v)
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return node
}

function svgEl(tag, props = {}, ...children) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag)
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue
    node.setAttribute(k, v)
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return node
}

function GoogleLogo() {
  return svgEl('svg', { viewBox: '0 0 48 48', 'aria-hidden': 'true' },
    svgEl('path', { fill: '#EA4335', d: 'M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z' }),
    svgEl('path', { fill: '#4285F4', d: 'M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z' }),
    svgEl('path', { fill: '#FBBC05', d: 'M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z' }),
    svgEl('path', { fill: '#34A853', d: 'M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z' })
  )
}

function StudioSignInDialog(onClose) {
  const dialog = el('div', { class: 'albums-dialog studio-signin', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'studio-signin-title' })
  const icon = el('span', { class: 'studio-signin__icon', 'aria-hidden': 'true' })
  icon.appendChild(svgEl('svg', { viewBox: '0 0 32 32', width: '32', height: '32', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' },
    svgEl('rect', { x: '7', y: '3', width: '21', height: '26', rx: '1' }),
    svgEl('path', { d: 'M12 3v26M4 8h6M4 16h6M4 24h6M17 12l3 3 4-5' })
  ))
  const header = el('header', {}, icon, el('h2', { id: 'studio-signin-title', text: 'Album Studio' }))
  const signInBtn = el('button', { type: 'button', class: 'btn btn--dark btn--small', text: 'Sign in with Google' })
  const cancelBtn = el('button', { type: 'button', class: 'btn btn--white btn--small', text: 'Cancel' })
  dialog.append(
    header,
    el('p', { text: 'Sign in with Google to use Album Studio. Your notebook saves automatically to your account.' }),
    el('div', { class: 'saved-actions' }, signInBtn, cancelBtn)
  )
  const backdrop = el('div', { class: 'albums-backdrop' }, dialog)
  const previous = document.activeElement
  const key = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); wrappedClose() }
    if (event.key === 'Tab') {
      const buttons = dialog.querySelectorAll('button')
      if (!buttons.length) return
      const first = buttons[0], last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
  }
  dialog.addEventListener('keydown', key)
  const cleanup = () => { dialog.removeEventListener('keydown', key); if (previous && previous.focus) previous.focus() }
  const origClose = onClose
  const wrappedClose = () => { cleanup(); origClose() }
  cancelBtn.onclick = wrappedClose
  backdrop.onclick = (e) => { if (e.target === e.currentTarget) wrappedClose() }
  setTimeout(() => signInBtn.focus(), 0)
  return backdrop
}

function NavIcon(name) {
  const span = el('span', { class: 'shared-nav-icon' })
  span.appendChild(pixel(NAV_ICONS[name] || 'dossier', 24, false))
  return span
}

export function WorkspaceNav(active, onStudioSignIn, onNavigate) {
  const nav = el('nav', { class: 'side__nav', 'aria-label': 'Main' })
  for (const item of NAV) {
    const isActive = item.key === active
    const link = el('a', {
      class: 'nav' + (isActive ? ' nav--active' : ''),
      href: item.to,
      'aria-label': item.label,
      'aria-current': isActive ? 'page' : undefined,
    }, NavIcon(item.key), el('span', { text: item.label }))
    link.addEventListener('click', (event) => {
      event.preventDefault()
      if (item.key === 'album' && onStudioSignIn) { onStudioSignIn(); return }
      onNavigate(item.to)
    })
    nav.appendChild(link)
  }
  return nav
}

export function SideFoot(onNavigate) {
  const foot = el('div', { class: 'side__foot' })
  const gbtn = el('button', { type: 'button', class: 'gbtn', 'aria-label': 'Continue with Google', title: 'Continue with Google' })
  gbtn.appendChild(GoogleLogo())
  gbtn.appendChild(el('span', { text: 'Continue with Google' }))
  const notice = el('p', { class: 'gnotice' })
  notice.appendChild(document.createTextNode('Only your name, email and Google picture. '))
  const privacy = el('a', { href: '/privacy', text: 'Privacy policy' })
  privacy.addEventListener('click', (e) => {e.preventDefault();onNavigate('/privacy')})
  notice.appendChild(privacy)
  foot.append(gbtn, notice)
  return foot
}

export function renderSidebar({ active = 'shop', tagline = 'Creative memory shop', lang = 'en', onNavigate = () => {} } = {}) {
  const aside = el('aside', { class: 'side side--modern' })
  let collapsed = false

  if (collapsed) aside.classList.add('side--collapsed')

  const home = el('a', { class: 'side__home', href: '/', 'aria-label': 'InstaFrame home' })
  const logo = el('div', { class: 'side__logo', 'aria-hidden': 'true' })
  logo.appendChild(pixel('s_coeur', 24, true))
  home.append(logo, el('p', { class: 'side__name', text: 'InstaFrame' }), el('p', { class: 'side__tag', text: tagline }))
  home.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/') })

  const toggle = el('button', {
    type: 'button',
    class: 'side__toggle',
    'aria-expanded': String(!collapsed),
    'aria-controls': 'side-nav-content',
    'aria-label': collapsed ? 'Open menu' : 'Close menu',
    title: collapsed ? 'Open menu' : 'Close menu',
    text: collapsed ? '»' : '«',
  })

  const content = el('div', { id: 'side-nav-content', class: 'side__content' })
  if (collapsed) content.hidden = true

  const section = el('p', { class: 'side__section' })
  section.textContent = 'CREATE & MANAGE'

  let dialogOpen = false
  const openDialog = () => {
    if (dialogOpen) return
    dialogOpen = true
    const dlg = StudioSignInDialog(() => { dialogOpen = false; if (dlg.parentNode) dlg.parentNode.removeChild(dlg) })
    document.body.appendChild(dlg)
  }

  const nav = WorkspaceNav(active, openDialog, onNavigate)
  const foot = SideFoot(onNavigate)
  const legal = el('nav', { class: 'side__legal', 'aria-label': 'Legal' })
  for (const [label, to] of [['FAQ', '/faq'], ['Privacy', '/privacy'], ['Legal notice', '/mentions-legales']]) {
    const a = el('a', { href: to, text: label })
    a.addEventListener('click', (e) => { e.preventDefault(); onNavigate(to) })
    legal.appendChild(a)
  }

  content.append(section, nav, foot, legal)

  toggle.addEventListener('click', () => {
    collapsed = !collapsed
    aside.classList.toggle('side--collapsed', collapsed)
    content.hidden = collapsed
    toggle.setAttribute('aria-expanded', String(!collapsed))
    toggle.setAttribute('aria-label', collapsed ? 'Open menu' : 'Close menu')
    toggle.title = collapsed ? 'Open menu' : 'Close menu'
    toggle.textContent = collapsed ? '»' : '«'

  })

  aside.append(home, toggle, content)
  return aside
}

function cartCount(cart) {
  let n = 0
  for (const v of Object.values(cart || {})) n += v
  return n
}

function cartTotal(cart) {
  let total = 0
  for (const [id, n] of Object.entries(cart || {})) {
    if (PRODUCTS[id]) total += PRODUCTS[id].price * n
  }
  return total
}

function ShopLayout({ children, page, lang, cart, onNavigate }) {
  const fr = lang === 'fr'
  const app = el('div', { class: 'app shop-flow' })
  app.appendChild(renderSidebar({ active: 'shop', tagline: 'Creative memory shop', lang, onNavigate }))
  const main = el('main', { id: 'page-content', class: 'main shop-flow__main' })
  const header = el('header', { class: 'shop-flow__header' })
  header.appendChild(el('h1', { text: fr ? 'BOUTIQUE' : 'SHOP' }))
  const nav = el('nav', { 'aria-label': fr ? 'Boutique' : 'Shop' })
  const links = [
    ['/shop/notebook', fr ? 'Kit carnet' : 'Notebook kit', page === 'product'],
    ['/shop/checkout', (fr ? 'Panier' : 'Cart') + ' (' + cartCount(cart) + ')', page === 'cart'],
    ['/shop/track', fr ? 'Suivi' : 'Tracking', page === 'track'],
  ]
  for (const [to, label, isActive] of links) {
    const a = el('a', { href: to, text: label, 'aria-current': isActive ? 'page' : undefined })
    a.addEventListener('click', (e) => { e.preventDefault(); onNavigate(to) })
    if(to==='/shop/checkout')segmented(a,[fr?'Panier':'Cart',' (',cartCount(cart),')']);
    nav.appendChild(a)
  }
  header.appendChild(nav)
  const test = el('p', { class: 'shop-flow__test', role: 'note' })
  test.dataset.noI18n = ''
  test.textContent = fr
    ? "Mode test : aucun paiement réel, aucune commande passée, aucun email envoyé. Prix de démonstration en USD, non confirmés pour la vente."
    : 'Test mode: no payment, no order placed, no email sent. Demo prices in USD, not confirmed for sale.'
  main.append(header, test, children)
  app.appendChild(main)
  return app
}

function ShopCartTable({ editable, lang, cart, onCartChange }) {
  const fr = lang === 'fr'
  const wrap = el('div', { class: 'shop-cart-table' })
  wrap.dataset.noI18n = ''
  const table = el('table')
  const thead = el('thead')
  const htr = el('tr')
  htr.append(el('th', { text: fr ? 'Article' : 'Item' }), el('th', { text: fr ? 'Qté' : 'Qty' }), el('th', { text: fr ? 'Prix' : 'Price' }))
  thead.appendChild(htr)
  const tbody = el('tbody')
  for (const [id, n] of Object.entries(cart || {})) {
    if (!PRODUCTS[id]) continue
    const tr = el('tr')
    tr.appendChild(el('td', { text: PRODUCTS[id].name }))
    const tdQty = el('td')
    if (editable) {
      const input = el('input', {
        type: 'number', min: 0, max: 99, value: n,
        'aria-label': (fr ? 'Quantité' : 'Quantity') + ' ' + PRODUCTS[id].name,
      })
      input.addEventListener('change', (e) => {
        const v = Math.max(0, Math.min(99, Number(e.target.value) || 0))
        const next = { ...cart }
        if (v === 0) delete next[id]; else next[id] = v
        onCartChange(next)
      })
      tdQty.appendChild(input)
    } else {
      tdQty.textContent = String(n)
    }
    tr.appendChild(tdQty)
    tr.appendChild(el('td', { text: formatPrice(PRODUCTS[id].price * n) }))
    tbody.appendChild(tr)
  }
  const tfoot = el('tfoot')
  const ftr = el('tr')
  const th = el('th', { colSpan: 2, text: fr ? 'Sous-total' : 'Subtotal' })
  ftr.append(th, el('td', { text: formatPrice(cartTotal(cart)) }))
  tfoot.appendChild(ftr)
  table.append(thead, tbody, tfoot)
  wrap.appendChild(table)
  return wrap
}

function renderShopWindow({ lang, onNavigate }) {
  const fr = lang === 'fr'
  const section = el('section', { class: 'shop-window', 'aria-labelledby': 'shop-title' })
  const bar = el('header', { class: 'shop-window__bar' })
  bar.appendChild(pixel('sac', 22, false))
  bar.appendChild(el('span', { text: 'The shop' }))
  bar.appendChild(el('span', { class: 'shop-window__dots', 'aria-hidden': 'true', text: '···' }))
  const body = el('div', { class: 'shop-window__body' })
  const copy = el('div', { class: 'shop-window__copy' })
  const badge = el('p', { class: 'shop-window__badge' })
  badge.appendChild(el('span', { 'aria-hidden': 'true' }))
  badge.appendChild(document.createTextNode('In preparation'))
  copy.appendChild(badge)
  copy.appendChild(el('h1', { id: 'shop-title', text: 'The shop is taking shape.' }))
  copy.appendChild(el('p', { class: 'shop-window__intro', text: fr ? 'Encore un peu de préparation. Tu peux déjà explorer le nouveau parcours de test.' : 'A little more time behind the scenes. For now, you can explore the new test journey.' }))
  const notice = el('p', { class: 'shop-window__notice' })
  notice.appendChild(pixel('info', 18, false))
  notice.appendChild(el('span', { text: 'Nothing is available to buy yet.' }))
  copy.appendChild(notice)
  const peek = el('a', { class: 'shop-window__peek', href: '/shop/notebook' })
  peek.appendChild(el('span', { text: 'See the preview' }))
  peek.appendChild(pixel('fleche', 20, false))
  peek.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/shop/notebook') })
  copy.appendChild(peek)

  const art = el('div', { class: 'shop-window__art', 'aria-hidden': 'true' })
  art.appendChild(pixel('s_etoile', 36, true))
  const store = el('div', { class: 'shop-store' })
  store.appendChild(el('div', { class: 'shop-store__roof' }))
  store.appendChild(el('div', { class: 'shop-store__awning' }))
  const glass = el('div', { class: 'shop-store__glass' })
  glass.appendChild(el('span', { class: 'shop-store__shine' }))
  const sign = el('div', { class: 'shop-store__sign' })
  sign.appendChild(pixel('sablier', 25, false))
  sign.appendChild(el('span', { text: 'Coming soon' }))
  glass.appendChild(sign)
  const door = el('div', { class: 'shop-store__door' })
  door.appendChild(el('i'))
  glass.appendChild(door)
  store.appendChild(glass)
  store.appendChild(el('div', { class: 'shop-store__base' }))
  art.appendChild(store)
  art.appendChild(pixel('s_coeur', 36, true))

  body.append(copy, art)
  const foot = el('footer', { class: 'shop-window__foot' })
  foot.appendChild(pixel('cadenas', 16, false))
  foot.appendChild(el('span', { text: fr ? 'Aperçu de test uniquement. Aucun paiement ni commande réelle.' : 'Test preview only. No real payment or order.' }))
  section.append(bar, body, foot)
  return section
}

function renderNotebookPage({ lang, cart, onCartChange, onNavigate }) {
  const fr = lang === 'fr'
  const requested = new URLSearchParams(location.search).get('pack')
  let pack = TIERS.some(t => t.id === requested) ? requested : 'pack-complete'
  let index = 0
  const qty = {}
  const pictures = ['/shop/kit-pixel.svg', ...CAROUSEL.slice(1)]

  const container = el('div', { class: 'shop-product' })
  container.dataset.noI18n = ''

  const gallery = el('section', { class: 'shop-panel shop-product__gallery', 'aria-label': fr ? 'Photos du kit' : 'Kit photos' })
  const hero = el('div', { class: 'shop-product__hero' })
  const heroImg = el('img', { src: pictures[0], alt: 'InstaFrame Notebook Kit' })
  hero.appendChild(heroImg)
  const thumbs = el('div', { class: 'shop-product__thumbs' })
  const thumbButtons = []
  pictures.forEach((src, i) => {
    const btn = el('button', { type: 'button', 'aria-label': (fr ? 'Voir la photo' : 'Show photo') + ' ' + (i + 1), 'aria-pressed': String(i === index) })
    btn.appendChild(el('img', { src, alt: '' }))
    btn.addEventListener('click', () => {
      index = i
      heroImg.src = pictures[i]
      heroImg.alt = i === 0 ? 'InstaFrame Notebook Kit' : (fr ? 'Photo' : 'Photo') + ' ' + (i + 1)
      thumbButtons.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)))
      counter.textContent = (fr ? 'photo' : 'photo') + ' ' + (i + 1) + '/' + pictures.length
    })
    thumbButtons.push(btn)
    thumbs.appendChild(btn)
  })
  const counter = el('small', { text: (fr ? 'photo' : 'photo') + ' 1/' + pictures.length })
  thumbs.appendChild(counter)
  gallery.append(hero, thumbs, el('p', { class: 'shop-muted', text: fr ? 'Visuels de démonstration.' : 'Demonstration images.' }))

  const panel = el('section', { class: 'shop-panel' })
  panel.appendChild(el('h2', { text: 'NOTEBOOK KIT' }))
  panel.appendChild(el('h3', { text: fr ? 'Pack' : 'Pack' }))
  const packs = el('div', { class: 'shop-packs' })
  const packButtons = []
  for (const t of TIERS) {
    const btn = el('button', { type: 'button', 'aria-pressed': String(t.id === pack), text: t.label + ' · ' + formatPrice(PRODUCTS[t.id].price) })
    segmented(btn,[t.label,' · ',formatPrice(PRODUCTS[t.id].price)]);
    btn.addEventListener('click', () => {
      pack = t.id
      packButtons.forEach((b, j) => b.setAttribute('aria-pressed', String(TIERS[j].id === pack)))
      blurb.textContent = PRODUCTS[pack].blurb || ''
    })
    packButtons.push(btn)
    packs.appendChild(btn)
  }
  const blurb = el('p', { class: 'shop-muted', text: PRODUCTS[pack].blurb || '' })
  panel.append(packs, blurb)
  panel.appendChild(el('h3', { text: 'Extras' }))
  const extras = el('div', { class: 'shop-extras' })
  for (const e of EXTRAS) {
    const row = el('div', { class: 'shop-extra' })
    const label = el('label', { htmlFor: 'qty-' + e.key, text: e.title + ' · ' + formatPrice(PRODUCTS[e.single].price) })
    segmented(label,[e.title,' · ',formatPrice(PRODUCTS[e.single].price)]);
    const stepper = el('div', { class: 'shop-stepper' })
    const minus = el('button', { type: 'button', 'aria-label': (fr ? 'Moins' : 'Less') + ' ' + e.title, text: '-' })
    const input = el('input', { id: 'qty-' + e.key, type: 'number', min: 0, max: 99, value: 0 })
    const plus = el('button', { type: 'button', 'aria-label': (fr ? 'Plus' : 'More') + ' ' + e.title, text: '+' })
    minus.addEventListener('click', () => { qty[e.key] = Math.max(0, (qty[e.key] || 0) - 1); input.value = qty[e.key] })
    plus.addEventListener('click', () => { qty[e.key] = Math.min(99, (qty[e.key] || 0) + 1); input.value = qty[e.key] })
    input.addEventListener('change', (ev) => { qty[e.key] = Math.max(0, Math.min(99, Number(ev.target.value) || 0)); input.value = qty[e.key] })
    stepper.append(minus, input, plus)
    row.append(label, stepper)
    if (e.pack) {
      const packBtn = el('button', { class: 'shop-extra__pack', type: 'button', text: (fr ? 'Ajouter le lot' : 'Add pack') + ' · ' + formatPrice(PRODUCTS[e.pack].price) })
      segmented(packBtn,[fr?'Ajouter le lot':'Add pack',' · ',formatPrice(PRODUCTS[e.pack].price)]);
      packBtn.addEventListener('click', () => {
        const next = { ...cart }
        next[e.pack] = (next[e.pack] || 0) + 1
        onCartChange(next)
        onNavigate('/shop/checkout')
      })
      row.appendChild(packBtn)
    }
    extras.appendChild(row)
  }
  panel.appendChild(extras)

  const addBtn = el('button', { class: 'shop-primary', type: 'button' })
  addBtn.appendChild(pixel('sac', 16, false))
  addBtn.appendChild(document.createTextNode(fr ? 'Ajouter au panier test' : 'Add to test cart'))
  addBtn.addEventListener('click', () => {
    const next = { ...cart }
    next[pack] = (next[pack] || 0) + 1
    for (const e of EXTRAS) {
      if (qty[e.key]) next[e.single] = (next[e.single] || 0) + qty[e.key]
    }
    onCartChange(next)
    onNavigate('/shop/checkout')
  })
  panel.appendChild(addBtn)
  panel.appendChild(el('p', { class: 'shop-muted', text: fr ? 'Boutique en mode test : aucun paiement réel.' : 'Shop in test mode: no real payment.' }))

  container.append(gallery, panel)
  return ShopLayout({ children: container, page: 'product', lang, cart, onNavigate })
}

function renderTrackPage({ lang, cart, onNavigate }) {
  const fr = lang === 'fr'
  let by = 'order'
  let searched = false
  const section = el('section', { class: 'shop-panel shop-track' })
  section.dataset.noI18n = ''
  section.appendChild(el('h2', { text: fr ? 'SUIVI DE COMMANDE' : 'ORDER TRACKING' }))
  const tabs = el('div', { class: 'shop-packs', role: 'tablist' })
  const tabButtons = []
  for (const v of ['order', 'track']) {
    const btn = el('button', { type: 'button', role: 'tab', 'aria-selected': String(by === v), text: v === 'order' ? (fr ? 'N° de commande + e-mail' : 'Order number + email') : (fr ? 'N° de suivi' : 'Tracking number') })
    btn.addEventListener('click', () => {
      by = v
      searched = false
      tabButtons.forEach((b, j) => b.setAttribute('aria-selected', String(['order', 'track'][j] === by)))
      rebuildForm()
      statusEl.remove()
    })
    tabButtons.push(btn)
    tabs.appendChild(btn)
  }
  section.appendChild(tabs)

  const form = el('form')
  const statusEl = el('p', { class: 'shop-flow__test', role: 'status', text: fr ? "Aucune commande réelle à rechercher en mode test. Aucune impression, expédition ou livraison n'est en cours." : 'There are no real orders to look up in test mode. No printing, shipping or delivery is in progress.' })

  function rebuildForm() {
    form.innerHTML = ''
    const label1 = el('label', { class: 'shop-field' })
    label1.appendChild(document.createTextNode(by === 'order' ? (fr ? 'N° de commande test' : 'Test order number') : (fr ? 'N° de suivi test' : 'Test tracking number')))
    label1.appendChild(el('input', { required: true, maxLength: 100, pattern: '.*\\S.*', autoComplete: 'off' }))
    form.appendChild(label1)
    if (by === 'order') {
      const label2 = el('label', { class: 'shop-field' })
      label2.appendChild(document.createTextNode('E-mail'))
      label2.appendChild(el('input', { required: true, type: 'email', maxLength: 254, autoComplete: 'off' }))
      form.appendChild(label2)
    }
    const submit = el('button', { type: 'submit', class: 'shop-primary', text: fr ? 'Rechercher (test)' : 'Search (test)' })
    form.appendChild(submit)
  }
  rebuildForm()
  form.addEventListener('submit', (e) => { e.preventDefault(); searched = true; if (!statusEl.parentNode) section.appendChild(statusEl) })
  section.appendChild(form)
  return ShopLayout({ children: section, page: 'track', lang, cart, onNavigate })
}

function renderCheckoutPage({ lang, cart, onCartChange, onNavigate }) {
  const fr = lang === 'fr'
  let step = 0
  let gift = false
  let placed = false
  let amount = 0
  let promo = ''
  let error = ''
  let fields = {}
  const t = (f, e) => fr ? f : e
  const labels = [t('Panier', 'Cart'), t('Contact', 'Contact'), t('Cadeau', 'Gift'), t('Livraison', 'Delivery'), t('Paiement test', 'Test payment')]

  const root = el('div')
  root.dataset.noI18n = ''

  function render() {
    root.innerHTML = ''
    if (placed) {
      const section = el('section', { class: 'shop-panel shop-confirm' })
      section.appendChild(el('span', { 'aria-hidden': 'true', text: '✓' }))
      section.appendChild(el('h2', { text: t('SIMULATION TERMINÉE', 'SIMULATION COMPLETE') }))
      section.appendChild(el('p', { text: t('Total de démonstration : ', 'Demo total: ') + formatPrice(amount) }))
      section.appendChild(el('p', { text: t("Aucun paiement, aucune commande réelle et aucun email envoyé. Rien ne sera expédié. Les coordonnées saisies ont été effacées.", 'No payment, no real order and no email sent. Nothing will ship. The entered contact details have been cleared.') }))
      const actions = el('div', { class: 'shop-actions' })
      const trackLink = el('a', { class: 'shop-primary', href: '/shop/track', text: t('Voir le suivi test', 'View test tracking') })
      trackLink.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/shop/track') })
      const backLink = el('a', { href: '/album', text: t('Retour au carnet', 'Back to notebook') })
      backLink.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/album') })
      actions.append(trackLink, backLink)
      section.appendChild(actions)
      root.appendChild(section)
      return
    }
    if (!Object.keys(cart).length) {
      const section = el('section', { class: 'shop-panel' })
      section.appendChild(el('h2', { text: t('PANIER', 'CART') }))
      section.appendChild(el('p', { text: t('Ton panier est vide.', 'Your cart is empty.') }))
      const link = el('a', { class: 'shop-primary', href: '/shop/notebook', text: t('Choisir un kit', 'Choose a kit') })
      link.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/shop/notebook') })
      section.appendChild(link)
      root.appendChild(section)
      return
    }
    if (step === 0) {
      const section = el('section', { class: 'shop-panel' })
      section.appendChild(el('h2', { text: t('PANIER', 'CART') }))
      section.appendChild(ShopCartTable({ editable: true, lang, cart, onCartChange: next => { cart = next; onCartChange(next); render(); } }))
      const label = el('label', { class: 'shop-field' })
      label.appendChild(document.createTextNode(t('Code promo (indisponible en mode test)', 'Promo code (unavailable in test mode)')))
      const promoInput = el('input', { disabled: true, value: promo })
      promoInput.addEventListener('input', (e) => { promo = e.target.value })
      label.appendChild(promoInput)
      section.appendChild(label)
      const actions = el('div', { class: 'shop-actions' })
      const cont = el('button', { type: 'button', class: 'shop-primary', text: t('Passer à la simulation', 'Continue to simulation') })
      cont.addEventListener('click', () => { step = 1; render() })
      const contShop = el('a', { href: '/shop/notebook', text: t('Continuer mes achats', 'Continue shopping') })
      contShop.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/shop/notebook') })
      actions.append(cont, contShop)
      section.appendChild(actions)
      root.appendChild(section)
      return
    }
    const wrap = el('div', { class: 'shop-checkout' })
    const section = el('section', { class: 'shop-panel' })
    const stepsNav = el('nav', { class: 'shop-steps', 'aria-label': t('Étapes', 'Steps') })
    labels.forEach((label, i) => {
      const btn = el('button', { type: 'button', 'aria-current': i === step ? 'step' : undefined, disabled: i > step, text: (i < step ? '✓' : String(i + 1)) + ' ' + label })
      btn.addEventListener('click', () => { step = i; error = ''; render() })
      stepsNav.appendChild(btn)
    })
    section.appendChild(stepsNav)

    const form = el('form')
    const input = (name, label, type = 'text', required = true) => {
      const l = el('label', { class: 'shop-field' })
      l.appendChild(document.createTextNode(label))
      const inp = el('input', { name, type, required, maxLength: name === 'message' ? 300 : 254, autoComplete: 'off', value: fields[name] || '' })
      inp.addEventListener('input', (e) => { fields[name] = e.target.value })
      l.appendChild(inp)
      return l
    }

    if (step === 1) {
      form.appendChild(el('h2', { text: 'CONTACT' }))
      form.appendChild(input('email', 'E-mail', 'email'))
      form.appendChild(el('p', { class: 'shop-muted', text: t('Coordonnées de démonstration uniquement, non transmises ni conservées.', 'Demo contact details only, not sent or saved.') }))
    } else if (step === 2) {
      form.appendChild(el('h2', { text: t('CADEAU', 'GIFT') }))
      const checkLabel = el('label', { class: 'shop-check' })
      const cb = el('input', { type: 'checkbox', checked: gift })
      cb.addEventListener('change', (e) => { gift = e.target.checked; render() })
      checkLabel.append(cb, document.createTextNode(t("C'est un cadeau", 'This is a gift')))
      form.appendChild(checkLabel)
      if (gift) {
        form.appendChild(input('recipient', t('Nom du destinataire', 'Recipient name')))
        form.appendChild(input('giftAddress', t('Adresse du destinataire (test)', 'Recipient address (test)')))
        form.appendChild(input('message', t('Mot sur la carte', 'Card message'), 'text', false))
        form.appendChild(input('before', t('Date souhaitée (non garantie en mode test)', 'Preferred date (not guaranteed in test mode)'), 'date', false))
      }
    } else if (step === 3) {
      form.appendChild(el('h2', { text: t('LIVRAISON', 'DELIVERY') }))
      form.appendChild(input('name', t('Nom', 'Name')))
      form.appendChild(input('address', t('Adresse de livraison (test)', 'Delivery address (test)')))
      form.appendChild(el('p', { class: 'shop-muted', text: t('Aucune expédition. Aucuns frais de livraison réels ne sont calculés.', 'Nothing will ship. No real delivery charges are calculated.') }))
    } else if (step === 4) {
      form.appendChild(el('h2', { text: t('PAIEMENT TEST', 'TEST PAYMENT') }))
      form.appendChild(el('div', { class: 'shop-disabled-payment', text: t('Carte désactivée', 'Card disabled') }))
      form.appendChild(el('p', { text: t("Aucun numéro de carte n'est demandé ou enregistré. Aucun paiement ne sera prélevé.", 'No card number is requested or saved. No payment will be taken.') }))
      form.appendChild(el('p', { text: t('Total de démonstration : ', 'Demo total: ') + formatPrice(cartTotal(cart)) }))
    }

    form.appendChild(el('p', { class: 'shop-flow__test', text: t('Mode test : aucune commande réelle.', 'Test mode: no real order.') }))
    if (error) form.appendChild(el('p', { role: 'alert', text: error }))

    const actions = el('div', { class: 'shop-actions' })
    const submit = el('button', { type: 'submit', class: 'shop-primary', text: step === 4 ? t('Simuler la commande', 'Simulate order') : t('Continuer', 'Continue') })
    const back = el('button', { type: 'button', text: t('Retour', 'Back') })
    back.addEventListener('click', () => { step = Math.max(0, step - 1); error = ''; render() })
    actions.append(submit, back)
    form.appendChild(actions)

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (step < 4) { step = step + 1; error = ''; render(); return }
      if (!fields.email || !fields.email.includes('@') || !fields.address || !fields.address.trim()) {
        error = t('Vérifie le contact et la livraison avant la simulation.', 'Check contact and delivery before simulating.')
        step = !fields.email ? 1 : 3
        render()
        return
      }
      amount = cartTotal(cart)
      fields = {}
      onCartChange({})
      placed = true
      render()
    })

    section.appendChild(form)
    wrap.appendChild(section)

    const aside = el('aside', { class: 'shop-panel' })
    aside.appendChild(el('h2', { text: t('PANIER', 'CART') }))
    aside.appendChild(ShopCartTable({ editable: false, lang, cart, onCartChange }))
    aside.appendChild(el('p', { class: 'shop-muted', text: t('Prix de test en USD. Aucun montant prélevé.', 'Demo prices in USD. Nothing charged.') }))
    wrap.appendChild(aside)
    root.appendChild(wrap)
  }

  render()
  return ShopLayout({ children: root, page: 'cart', lang, cart, onNavigate })
}

export function renderShopPage({ page = 'shop', lang = 'en', cart = {}, onCartChange = () => {}, onNavigate = () => {} } = {}) {
  if (page === 'notebook') return renderNotebookPage({ lang, cart, onCartChange, onNavigate })
  if (page === 'track') return renderTrackPage({ lang, cart, onNavigate })
  if (page === 'checkout') return renderCheckoutPage({ lang, cart, onCartChange, onNavigate })
  const app = el('div', { class: 'app shop' })
  app.appendChild(renderSidebar({ active: 'shop', tagline: 'Creative memory shop', lang, onNavigate }))
  const main = el('main', { class: 'main shop__main' })
  main.appendChild(renderShopWindow({ lang, onNavigate }))
  app.appendChild(main)
  return app
}
function segmented(node,parts){node.replaceChildren();parts.forEach((v,i)=>{if(i)node.append(document.createComment(""));node.append(document.createTextNode(String(v)))});return node}
