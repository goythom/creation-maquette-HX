import {renderSignInDialog} from './transfer-scenes-deepseek.mjs';
import {FR} from './french-dictionary.mjs';
import { pixel } from './pixel-dom.mjs'
import { renderHomeNotebookDemo, renderDemoFrame, renderShowcaseArt } from './home-visuals.mjs'

function coloredPixel(n,size,color){const svg=pixel(n,size,false);svg.style.color=color;return svg}

const PRICES = { free: 0, premium: 7.99 }

function fmtPrice(n, fr) {
  return `${n.toFixed(2).replace('.00', '').replace('.', fr ? ',' : '.')} €`
}

const STEPS = [
  { n: '01', title: 'Find inspiration', text: 'Browse Get Inspired for ideas of what you can tell.' },
  { n: '02', title: 'Create, then fill', text: 'Create your photos, stickers and drawings in the generator, then fill your notebook: the caption only you two understand, black pages, like a notebook passed in class.' },
  { n: '03', title: 'Give it', text: 'They discover it, and see that someone took the time.' },
]

const FAQ_ROWS = [
  { id: 'create', home: true, en: ['What can I create with InstaFrame?', 'Use the generator to create photo frames and other elements, then arrange them in a notebook in Album Studio. You can add text, stickers and drawings, personalise the cover, and browse your notebook in the preview.'], fr: ['Que peut-on créer avec InstaFrame ?', "Le générateur permet de créer des cadres photo et d'autres éléments, puis de les disposer dans un carnet dans Studio Album. Ajoutez du texte, des stickers et des dessins, personnalisez la couverture et feuilletez votre carnet dans l'aperçu."] },
  { id: 'elements', home: true, en: ['Is the generator only for photo frames?', 'No. Alongside Instax and Polaroid frames, it includes post-its, stickers, stamps, audio, music and video elements, letters, messages, dates and combinations. The available settings depend on the element. Some elements are marked PRO.'], fr: ['Le générateur sert-il uniquement aux cadres photo ?', "Non. En plus des cadres Instax et Polaroid, il propose des post-it, stickers, timbres, éléments audio, musique et vidéo, lettres, messages, dates et combinaisons. Les réglages disponibles dépendent de l'élément. Certains éléments portent la mention PRO."] },
  { id: 'account', home: true, en: ['Do I need an account?', 'You can start with the free generator without signing in. Sign in to save elements and notebooks to your account and find them again later. A local draft is not a substitute for an account save.'], fr: ["Faut-il un compte ?", "Vous pouvez commencer avec le générateur gratuit sans vous connecter. Connectez-vous pour sauvegarder vos éléments et carnets dans votre compte et les retrouver plus tard. Un brouillon local ne remplace pas une sauvegarde dans le compte."] },
  { id: 'devices', home: true, en: ['Which devices can I use?', 'Create and edit on a computer or iPad. The drawing tools accept a mouse, touch and Apple Pencil; pressure depends on the input device. Phone access is limited to shared notebooks and the dedicated photo-transfer and download links, not the full editor.'], fr: ['Quels appareils peut-on utiliser ?', "Créez et modifiez sur ordinateur ou iPad. Les outils de dessin acceptent la souris, le tactile et l'Apple Pencil ; la pression dépend du périphérique utilisé. Sur téléphone, l'accès est réservé aux carnets partagés et aux liens dédiés de transfert de photos et de téléchargement, pas à l'éditeur complet."] },
  { id: 'photos', en: ['How do I add and adjust a photo?', 'Choose a frame in the generator, then import a photo from your device. Use the crop, zoom and position controls to adjust it, and add a caption if you want. You can mix frame formats in the same notebook.'], fr: ['Comment ajouter et ajuster une photo ?', "Choisissez un cadre dans le générateur, puis importez une photo depuis votre appareil. Ajustez le cadrage, le zoom et la position, puis ajoutez une légende si vous le souhaitez. Vous pouvez mélanger plusieurs formats de cadres dans le même carnet."] },
  { id: 'notebook', en: ['How do I fill and personalise a notebook?', 'In Album Studio, place your elements on the pages, resize or rotate them, add text and stickers, and draw with the pen, marker or highlighter. The notebook settings let you choose the cover and paper appearance.'], fr: ['Comment remplir et personnaliser un carnet ?', "Dans Studio Album, disposez vos éléments sur les pages, redimensionnez-les ou faites-les pivoter, ajoutez du texte et des stickers, puis dessinez au stylo, au feutre ou au surligneur. Les réglages du carnet permettent de choisir l'apparence de la couverture et du papier."] },
  { id: 'preview', en: ['Can I flip through the notebook before sharing it?', 'Yes. Open the notebook preview to browse the pages and check the cover. The small notebook on the homepage is a separate example you can flip through; it does not change your own notebook.'], fr: ['Peut-on feuilleter le carnet avant de le partager ?', "Oui. Ouvrez l'aperçu du carnet pour parcourir les pages et vérifier la couverture. Le petit carnet de l'accueil est un exemple séparé que vous pouvez feuilleter ; il ne modifie pas votre propre carnet."] },
  { id: 'save', en: ['Where do I find my saved notebooks?', 'Sign in and open Saved notebooks from your account or Album Studio. Open a saved notebook to continue editing. While signed in, edits are saved automatically; check any save error before leaving. Name your notebook: unnamed automatic saves are removed after 30 days.'], fr: ['Où retrouver mes carnets sauvegardés ?', "Connectez-vous et ouvrez Carnets sauvegardés depuis votre compte ou Studio Album. Ouvrez un carnet sauvegardé pour reprendre sa création. Une fois connecté, les modifications sont enregistrées automatiquement ; vérifiez toute erreur de sauvegarde avant de quitter. Donnez un nom à votre carnet : les sauvegardes automatiques non nommées sont supprimées après 30 jours."] },
  { id: 'trash', en: ['Can I restore a deleted notebook?', 'A saved notebook moved to Trash can be restored within 30 days. Delete forever removes that saved notebook and cannot be undone. It does not delete account photos, already shared copies or existing backups.'], fr: ['Peut-on restaurer un carnet supprimé ?', "Un carnet sauvegardé placé dans la Corbeille peut être restauré pendant 30 jours. Supprimer définitivement retire cette sauvegarde sans possibilité de retour. Cela ne supprime pas les photos du compte, les copies déjà partagées ni les sauvegardes de sécurité existantes."] },
  { id: 'share', home: true, en: ['How do I share a notebook?', 'Use Share in the notebook preview, then Create link. Anyone with the link can view the shared copy for 30 days, including on a phone. The link is for reading, not collaborative editing. Share it only with people you want to give access to.'], fr: ['Comment partager un carnet ?', "Dans l'aperçu du carnet, choisissez Partager puis Créer le lien. Toute personne disposant du lien peut consulter la copie partagée pendant 30 jours, y compris sur téléphone. Ce lien permet la lecture, pas la modification à plusieurs. Ne le transmettez qu'aux personnes à qui vous souhaitez donner accès."] },
  { id: 'download', en: ['Can I download my creations?', 'The generator can download a single element or the gallery as a ZIP. Keep a downloaded copy if you need it outside InstaFrame. Image downloads are still images, not an interactive notebook with audio or video playback.'], fr: ['Peut-on télécharger ses créations ?', "Le générateur permet de télécharger un élément ou la galerie dans un fichier ZIP. Gardez une copie téléchargée pour utiliser vos créations en dehors d'InstaFrame. Les téléchargements d'images restent des images fixes, pas un carnet interactif avec lecture audio ou vidéo."] },
  { id: 'shop', home: true, en: ['Can I buy Premium or order a printed notebook?', 'Real payments and physical orders are not available yet. The shop is under construction. The free generator is available, and some features are marked PRO; a preview does not confirm a purchase or a physical order.'], fr: ['Peut-on acheter Premium ou commander un carnet imprimé ?', "Les paiements réels et les commandes physiques ne sont pas encore disponibles. La boutique est en construction. Le générateur gratuit est accessible et certaines fonctions portent la mention PRO ; un aperçu ne constitue pas un achat ni une confirmation de commande physique."] },
  { id: 'support', en: ['How do I report a problem?', 'Use the feedback bubble to describe the page and what happened, and include a screenshot when useful. You can also write to contact@instaframe.fr.'], fr: ['Comment signaler un problème ?', "Utilisez la bulle de retour pour décrire la page et ce qui s'est passé, avec une capture si elle est utile. Vous pouvez aussi écrire à contact@instaframe.fr."] },
]

function getFaq(fr, homeOnly = false) {
  return FAQ_ROWS.filter(r => !homeOnly || r.home).map(r => ({
    id: r.id,
    home: r.home,
    q: fr ? r.fr[0].replace(/ \?/g, '\u202f?') : r.en[0],
    a: r[fr ? 'fr' : 'en'][1],
  }))
}

const TICKER = [
  ['s_coeurv', 'Birthdays'],
  ['s_etoile', 'Dates that matter'],
  ['s_cerises', 'Just because'],
  ['s_papillon', 'A notebook passed in class'],
  ['s_coeur', 'Black pages'],
  ['s_eclat', 'Handwritten captions'],
]

const ELEMENTS = [
  ['Frames', 'photo', '#fbc856'],
  ['Post-its', 'postit', '#e73b0d'],
  ['Audio', 'micro', '#a71d08'],
  ['Music', 'note', '#6d1308'],
  ['Stamps', 'timbre', '#370f0c'],
  ['Stickers', 'coeur', '#2B2E33'],
  ['Video', 'video', '#100808'],
]

const SHOWCASE = [
  { key: 'frames', name: 'Frames', desc: 'Instax Mini and Polaroid. Crop, zoom, filters, a handwritten caption.', descFr: 'Instax Mini et Polaroid. Recadrage, zoom, filtres, légende manuscrite.', tab: 'Frames', art: 'frame' },
  { key: 'postits', name: 'Post-its', desc: 'Write straight onto the note.', descFr: 'Écrivez directement sur la note.', tab: 'Post-its', art: { kind: 'Post-its', over: { text: 'Post-it\nyou & me' } } },
  { key: 'audio', name: 'Audio', desc: 'A voice message that plays when you tap it.', descFr: 'Un message vocal qui se lit au toucher.', tab: 'Audio', art: { kind: 'Audio', over: { text: 'Voice message' } } },
  { key: 'music', name: 'Music', desc: 'A music card with its cover and a code to the song.', descFr: 'Une carte musique avec pochette et code vers le titre.', tab: 'Music', art: { kind: 'Music', over: { format: 'Card', image: '/demo-couples/just-because.webp', text: 'Our song', subtitle: 'The mixtape' } } },
  { key: 'stamps', name: 'Stamps', desc: 'Your photo with a perforated stamp edge. Filters like frames.', descFr: 'Votre photo avec un bord de timbre perforé. Des filtres comme les cadres.', tab: 'Stamps', art: { kind: 'Stamps', over: { image: '/demo-couples/summer-2026.webp', text: 'Summer 2026' } } },
  { key: 'stickers', name: 'Stickers', desc: 'A picture cut out with its outline, ready to place.', descFr: 'Une image détourée avec son contour, prête à poser.', tab: 'Stickers', art: { kind: 'Stickers', over: { image: '/stickers/kawaii_01.png' } } },
  { key: 'video', name: 'Video', desc: 'A clip in its own frame, played inside the notebook.', descFr: 'Un clip dans son propre cadre, lu dans le carnet.', tab: 'Video', art: { kind: 'Video', over: { image: '/demo-couples/trip-polaroid.webp', text: 'Our first trip' } } },
]

const STEP_ICONS = ['ampoule', 'image', 'coeur']
const STEP_COLORS = ['#fbc856', '#e73b0d', '#a71d08']

function generatorTabHref(tab) {
  return `/generator?type=${encodeURIComponent(tab)}`
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue
    if (k === 'class') node.className = v
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v)
    else if (k === 'dataset') Object.assign(node.dataset, v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'html') node.innerHTML = v
    else if (k in node && k !== 'list' && k !== 'form' && k !== 'type') {
      try { node[k] = v } catch { node.setAttribute(k, v) }
    } else node.setAttribute(k, v)
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue
    node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c)
  }
  return node
}

function link(href, props, ...children) {
  const a = el('a', { href, ...props }, ...children)
  return a
}

function makeNav(onNavigate) {
  return (target) => (e) => {
    e.preventDefault()
    onNavigate(target)
  }
}

function Win({ title, icon, tb, deco = false, x = true, className, style, children }) {
  const tbClass = 'hv-tb' + (tb ? ' hv-tb-' + tb : '')
  const titleChildren = []
  if (icon) titleChildren.push(pixel(icon, 18, false))
  titleChildren.push(el('span', {}, title))
  if (deco) {
    titleChildren.push(el('i', { class: 'hv-bev hv-bev-sm' }, '_'))
    titleChildren.push(el('i', { class: 'hv-bev hv-bev-sm' }, '□'))
  }
  if (x) {
    titleChildren.push(el('i', { class: 'hv-xb', 'aria-hidden': 'true' }, pixel('fermer', 16, false)))
  }
  return el('div', { class: 'hv-w' + (className ? ' ' + className : ''), style },
    el('div', { class: tbClass }, ...titleChildren),
    el('div', { class: 'hv-wb' }, ...children)
  )
}

function BtnFill({ to, onClick, icon, children, onNavigate }) {
  const a = el('a', { class: 'hv-btn hv-btn-fill', href: to })
  if (icon) a.appendChild(pixel(icon, 16, false))
  for (const c of children) a.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  a.addEventListener('click', (e) => {
    e.preventDefault()
    if (onClick) onClick(e)
    onNavigate(to)
  })
  return a
}

function BtnOut({ to, icon, children, onNavigate }) {
  const a = el('a', { class: 'hv-btn hv-btn-out', href: to })
  if (icon) a.appendChild(pixel(icon, 16, false))
  for (const c of children) a.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  a.addEventListener('click', (e) => { e.preventDefault(); onNavigate(to) })
  return a
}

function SecHead({ n, kicker, title }) {
  const frag = document.createDocumentFragment()
  frag.appendChild(el('div', { class: 'hv-sechead' },
    el('span', { class: 'hv-lcd' }, n),
    el('span', { class: 'hv-px' }, kicker)
  ))
  if (title) frag.appendChild(el('h2', { class: 'hv-sectitle' }, title))
  return frag
}

function Stk({ n, s, style }) {
  return el('span', { class: 'hv-stk', style, 'aria-hidden': 'true' }, pixel(n, s, true))
}

function DemoFrame({ photo, cap, format = 'instax-mini' }) {
  return renderDemoFrame({ photo, cap, format })
}

function ShowCard({ item, duplicate, art, fr, onNavigate }) {
  const body = el('div', { class: 'hv-card-body' })
  if (item.art === 'frame') {
    body.appendChild(DemoFrame({ photo: '/demo-couples/trip-polaroid.webp', cap: 'our first trip', format: 'polaroid' }))
  } else if (art) {
    body.appendChild(el('img', {
      class: 'hv-card-art',
      src: art,
      alt: duplicate ? '' : item.name,
      width: 240,
      height: 240,
      decoding: 'async',
      draggable: 'false',
    }))
  } else {
    body.appendChild(el('span', { class: 'hv-card-wait', role: 'status' }, '…'))
  }
  const cap = el('div', { class: 'hv-card-cap' },
    el('b', {}, item.name),
    el('p', {}, fr ? item.descFr : item.desc)
  )
  const tryBtn = el('a', {
    class: 'hv-btn hv-btn-fill hv-card-try',
    href: generatorTabHref(item.tab),
    tabindex: duplicate ? '-1' : undefined,
  }, 'Try it', el('span', { class: 'hv-sr' }, ' – ' + (fr?({Frames:'Cadres',Music:'Musique',Stamps:'Timbres',Video:'Vidéo'}[item.name]||item.name):item.name)))
  tryBtn.addEventListener('click', (e) => { e.preventDefault(); onNavigate(generatorTabHref(item.tab)) })
  const card = el('div', { class: 'hv-card', 'aria-hidden': duplicate ? 'true' : undefined }, body, cap, tryBtn)
  return card
}

function buildShowcaseLane({ fr, onNavigate, pausedRef }) {
  const lane = el('div', { class: 'hv-show-lane' })
  const track = el('div', { class: 'hv-show-track' })
  lane.appendChild(track)

  const artCache = new Map()
  const artState = {}

  const renderAll = () => {
    const items = [...SHOWCASE, ...SHOWCASE]
    items.forEach((item, i) => {
      const duplicate = i >= SHOWCASE.length
      const card = ShowCard({ item, duplicate, art: artState[item.key], fr, onNavigate })
      track.appendChild(card)
    })
  }
  renderAll()

  const loadArt = async () => {
    for (const item of SHOWCASE) {
      if (item.art === 'frame') continue
      await new Promise(r => setTimeout(r, 0))
      try {
        let src = artCache.get(item.key)
        if (!src) {
          src = await renderShowcaseArt({ item, lang: fr ? 'fr' : 'en' })
          artCache.set(item.key, src)
        }
        if (src) {
          artState[item.key] = src
          const cards = track.querySelectorAll('.hv-card')
          cards.forEach((card, idx) => {
            const it = [...SHOWCASE, ...SHOWCASE][idx]
            if (it && it.key === item.key) {
              const body = card.querySelector('.hv-card-body')
              if (body && !body.querySelector('img.hv-card-art')) {
                body.replaceChildren(el('img', {
                  class: 'hv-card-art',
                  src,
                  alt: idx >= SHOWCASE.length ? '' : item.name,
                  width: 240,
                  height: 240,
                  decoding: 'async',
                  draggable: 'false',
                }))
              }
            }
          })
        }
      } catch { /* ignore */ }
    }
  }

  if (typeof IntersectionObserver === 'undefined') {
    void loadArt()
  } else {
    const io = new IntersectionObserver((entries) => {
      if (!entries.some(e => e.isIntersecting)) return
      io.disconnect()
      void loadArt()
    }, { rootMargin: '600px 0px' })
    io.observe(lane)
  }

  // Lane animation
  let half = 0
  let offset = 0
  let velocity = 0
  let dragging = false
  let momentum = false
  let vertical = false
  let moved = false
  let hovering = false
  let focused = false
  let pointerId = null
  let startX = 0, startY = 0, startOffset = 0, lastX = 0, lastTime = 0, lastFrame = 0
  let raf = 0
  let reduced = false
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}

  const wrap = (x) => (half > 0 ? ((x % half) + half) % half : 0)
  const paint = () => {
    if (reduced || half <= 0) return
    track.style.transform = `translate3d(${-offset}px,0,0)`
  }
  const measure = () => {
    const width = track.scrollWidth / 2
    half = width > 0 ? width : 0
    offset = wrap(offset)
    paint()
  }
  measure()
  let resizeObs = null
  if (typeof ResizeObserver !== 'undefined') {
    resizeObs = new ResizeObserver(measure)
    resizeObs.observe(track)
  }

  const onDown = (e) => {
    if (reduced) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    momentum = false; dragging = false; vertical = false; moved = false; velocity = 0
    pointerId = e.pointerId
    startX = lastX = e.clientX
    startY = e.clientY
    startOffset = offset
    lastTime = performance.now()
  }
  const onMove = (e) => {
    if (pointerId !== e.pointerId || vertical) return
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    if (!dragging) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { vertical = true; return }
      if (Math.abs(dx) <= 8 || Math.abs(dx) <= Math.abs(dy)) return
      dragging = true; moved = true
      try { lane.setPointerCapture(e.pointerId) } catch {}
    }
    offset = wrap(startOffset - dx)
    const now = performance.now()
    const dt = now - lastTime
    if (dt > 0) {
      const v = -(e.clientX - lastX) / dt
      velocity = dt > 100 ? v : velocity * 0.5 + v * 0.5
      lastX = e.clientX
      lastTime = now
    }
    paint()
  }
  const onUp = (e) => {
    if (pointerId !== e.pointerId) return
    pointerId = null; vertical = false
    if (!dragging) return
    dragging = false
    if (Math.abs(velocity) > 0.05) momentum = true
    else velocity = 0
  }
  const onCancel = (e) => {
    if (pointerId !== e.pointerId) return
    pointerId = null; dragging = false; vertical = false; momentum = false; velocity = 0
  }
  const onClickCapture = (e) => {
    if (!moved) return
    e.preventDefault(); e.stopPropagation(); moved = false
  }
  const onEnter = (e) => { if (e.pointerType === 'mouse') hovering = true }
  const onLeave = (e) => { if (e.pointerType === 'mouse') hovering = false }
  const onFocusIn = () => { focused = true }
  const onFocusOut = () => { focused = false }

  const loop = (now) => {
    const dt = lastFrame ? Math.min(now - lastFrame, 64) : 0
    lastFrame = now
    if (dt > 0 && !reduced) {
      if (momentum) {
        offset = wrap(offset + velocity * dt)
        velocity *= Math.exp(-dt / 325)
        if (Math.abs(velocity) < 0.02) { velocity = 0; momentum = false }
        paint()
      } else if (!dragging && half > 0 && !pausedRef.current && !hovering && !focused) {
        offset = wrap(offset + (half / 46000) * dt)
        paint()
      }
    }
    raf = requestAnimationFrame(loop)
  }

  lane.addEventListener('pointerdown', onDown)
  lane.addEventListener('pointermove', onMove)
  lane.addEventListener('pointerup', onUp)
  lane.addEventListener('pointercancel', onCancel)
  lane.addEventListener('pointerenter', onEnter)
  lane.addEventListener('pointerleave', onLeave)
  lane.addEventListener('focusin', onFocusIn)
  lane.addEventListener('focusout', onFocusOut)
  lane.addEventListener('click', onClickCapture, true)
  raf = requestAnimationFrame(loop)

  return {
    lane,
    dispose() {
      cancelAnimationFrame(raf)
      if (resizeObs) resizeObs.disconnect()
      lane.removeEventListener('pointerdown', onDown)
      lane.removeEventListener('pointermove', onMove)
      lane.removeEventListener('pointerup', onUp)
      lane.removeEventListener('pointercancel', onCancel)
      lane.removeEventListener('pointerenter', onEnter)
      lane.removeEventListener('pointerleave', onLeave)
      lane.removeEventListener('focusin', onFocusIn)
      lane.removeEventListener('focusout', onFocusOut)
      lane.removeEventListener('click', onClickCapture, true)
    },
  }
}

export function renderHomePage({ lang = 'en', onNavigate = () => {} } = {}) {
  const fr = lang === 'fr'
  function openStudio(){const dialog=renderSignInDialog({onClose:()=>dialog.remove()});dialog.querySelector('p').style.margin='0 0 24px';if(fr){const walk=n=>{if(n.nodeType===3&&FR[n.nodeValue])n.nodeValue=FR[n.nodeValue];else n.childNodes?.forEach(walk)};walk(dialog)}root.append(dialog)}
  const nav = makeNav(onNavigate)
  const pausedRef = { current: false }

  const root = el('div', { class: 'home-v2' })

  // Skip link
  root.appendChild(el('a', { class: 'home-skip-link', href: '#home-content' }, 'Skip to content'))

  // Header
  const header = el('header', { class: 'hv-nav' })
  const logo = el('a', { class: 'hv-logo', href: '/' }, pixel('s_coeurv', 26, true), 'InstaFrame')
  logo.addEventListener('click', nav('/'))
  header.appendChild(logo)

  const mainNav = el('nav', { 'aria-label': 'Main' })
  const navLinks = [
    ['/get-inspired', 'Get Inspired'],
    ['/generator', 'Generator'],
    ['/album', 'Album Studio'],
    ['/shop', 'Shop'],
  ]
  for (const [href, label] of navLinks) {
    const a = el('a', { href }, label)
    a.addEventListener('click', (e) => {
      e.preventDefault()
      if (href === '/album') {
        openStudio();return
      }
      onNavigate(href)
    })
    mainNav.appendChild(a)
  }
  header.appendChild(mainNav)

  header.appendChild(el('span', { class: 'hv-nav-sp' }))
  header.appendChild(el('span', { class: 'hv-px hv-px-blue hv-navbadge' },
    pixel('tablette', 16, false),
    'Made for desktop and iPad'
  ))

  const langToggle=el('div',{class:'lang-toggle lang-toggle--inline',role:'group','aria-label':'Language','data-no-i18n':''});for(const value of ['en','fr'])langToggle.append(el('button',{type:'button','aria-pressed':String(lang===value)},value.toUpperCase()));header.append(langToggle)

  // Sign in button (inert)
  const signInBtn = el('button', { type: 'button', class: 'hv-account' }, fr ? 'Se connecter' : 'Sign in')
  signInBtn.disabled = false
  header.appendChild(signInBtn)

  header.appendChild(BtnFill({ to: '/generator', children: ['Open the app'], onNavigate }))
  root.appendChild(header)

  // Main
  const main = el('main', { id: 'home-content', tabindex: '-1' })

  // HERO
  const hero = el('section', { class: 'hv-hero hv-gp' })
  const heroCopy = el('div', { class: 'hv-hero-copy' })
  const h1 = el('h1', {},
    'Take the time to create something for ',
    el('span', { class: 'hv-mark' }, 'that special person')
  )
  heroCopy.appendChild(h1)
  heroCopy.appendChild(el('p', { class: 'hv-lead' },
    'A notebook made of memories, for the person who matters. Find inspiration in Get Inspired, create your elements, then fill yours with your photos, words and drawings.'
  ))
  const heroActions = el('div', { class: 'hv-row hv-hero-actions' })
  heroActions.appendChild(BtnFill({ to: '/generator', children: ['Start free'], onNavigate }))
  const tourLink = el('a', { class: 'hv-bev hv-bev-big', href: '/generator?tour=1' },
    pixel('lecture', 16, false),
    '30-second tour'
  )
  tourLink.addEventListener('click', nav('/generator?tour=1'))
  heroActions.appendChild(tourLink)
  heroCopy.appendChild(heroActions)

  const heroChips = el('div', { class: 'hv-row hv-hero-chips' })
  heroChips.appendChild(el('span', { class: 'hv-chip' }, 'No account needed to start'))
  heroChips.appendChild(el('span', { class: 'hv-chip' }, pixel('qr', 16, false), 'Import photos by QR code'))
  heroCopy.appendChild(heroChips)
  hero.appendChild(heroCopy)

  const scene = el('div', { class: 'hv-scene' })
  const sceneStage = el('div', { class: 'hv-scene-stage--notebook' })
  sceneStage.appendChild(renderHomeNotebookDemo({ lang }))
  scene.appendChild(sceneStage)
  hero.appendChild(scene)
  main.appendChild(hero)

  // TICKER
  const tick = el('div', { class: 'hv-tick', 'aria-hidden': 'true' })
  const tickTrack = el('div', { class: 'hv-tick-track' })
  for (const [st, label] of [...TICKER, ...TICKER]) {
    tickTrack.appendChild(el('span', {}, pixel(st, 26, true), label))
  }
  tick.appendChild(tickTrack)
  main.appendChild(tick)

  // HOW
  const howSec = el('section', { class: 'hv-sec hv-sec-w' })
  howSec.appendChild(SecHead({ n: '01', kicker: 'How it works', title: 'Three steps to say I care about you' }))
  const steps = el('div', { class: 'hv-steps' })
  STEPS.forEach((step, i) => {
    const cell = el('div', { class: 'hv-step-cell' })
    const win = Win({
      title: `Step ${step.n}`,
      x: true,
      children: [
        el('div', { class: 'hv-step-ic', style: { background: STEP_COLORS[i] } },
          coloredPixel(STEP_ICONS[i],48,i===0?'#100808':'#F7F4F1')
        ),
        el('b', { class: 'hv-step-title' }, step.title),
        el('p', {}, step.text),
      ],
    })
    cell.appendChild(win)
    steps.appendChild(cell)
  })
  howSec.appendChild(steps)
  main.appendChild(howSec)

  // CREATE
  const createSec = el('section', { class: 'hv-sec' })
  createSec.appendChild(SecHead({ n: '02', kicker: 'What you can create', title: 'Some memories deserve better than a camera roll' }))
  const create = el('div', { class: 'hv-create' })
  const createWin = Win({
    title: 'My elements',
    icon: 'dossier',
    deco: true,
    className: 'hv-create-win',
    children: [
      el('div', { class: 'hv-gl hv-deskwrap' },
        el('div', { class: 'hv-desk' },
          ...ELEMENTS.map(([label, icon, bg], i) => {
            const item = el('div', { class: i === 0 ? 'on' : undefined },
              el('i', { style: { background: bg } }, coloredPixel(icon,40,i===0?'#100808':'#F7F4F1')),
              el('span', {}, label)
            )
            return item
          })
        )
      ),
    ],
  })
  create.appendChild(createWin)
  const createSide = el('div', { class: 'hv-create-side' })
  createSide.appendChild(pixel('o_cd',110,true))
  createSide.appendChild(el('p', {},
    'Music and audio players, stamps, post-its, video: each element gets its pixel icon, like on an old desktop.'
  ))
  create.appendChild(createSide)
  createSec.appendChild(create)
  main.appendChild(createSec)

  // GENERATOR SHOWCASE
  const showSec = el('section', { class: 'hv-sec hv-sec-w hv-sec-show' })
  const showTop = el('div', { class: 'hv-show-top' })
  showTop.appendChild(SecHead({
    n: '03',
    kicker: 'The generator',
    title: fr ? 'Tout ce que vous pouvez créer pour votre carnet' : 'Everything you can create for your notebook',
  }))
  const pauseBtn = el('button', {
    type: 'button',
    class: 'hv-bev hv-bev-big hv-show-pause',
    'aria-pressed': 'false',
    'aria-label': fr ? 'Mettre le défilement en pause' : 'Pause the automatic scroll',
  }, el('span', { 'aria-hidden': 'true' }, pixel('pause', 20, false)))
  pauseBtn.addEventListener('click', () => {
    pausedRef.current = !pausedRef.current
    pauseBtn.setAttribute('aria-pressed', String(pausedRef.current))
    pauseBtn.setAttribute('aria-label', pausedRef.current
      ? (fr ? 'Reprendre le défilement automatique' : 'Resume the automatic scroll')
      : (fr ? 'Mettre le défilement en pause' : 'Pause the automatic scroll'))
    pauseBtn.replaceChildren(el('span', { 'aria-hidden': 'true' }, pixel(pausedRef.current ? 'lecture' : 'pause', 20, false)))
  })
  showTop.appendChild(pauseBtn)
  showSec.appendChild(showTop)
  showSec.appendChild(el('p', { class: 'hv-show-sub' },
    fr ? 'Sept sortes d’éléments, chacune créée dans le générateur.' : 'Seven kinds of elements, each made in the generator.'
  ))
  const laneObj = buildShowcaseLane({ fr, onNavigate, pausedRef })
  showSec.appendChild(laneObj.lane)
  showSec.appendChild(BtnFill({ to: '/generator', children: ['Try the generator'], onNavigate }))
  main.appendChild(showSec)

  // PLANS
  const plansSec = el('section', { class: 'hv-sec' })
  plansSec.appendChild(SecHead({ n: '04', kicker: 'Plans', title: "Start free. Upgrade when you're ready to send it." }))
  const plans = el('div', { class: 'hv-plans' })

  const freeWin = Win({
    title: 'Free',
    icon: 'livre',
    x: false,
    className: 'hv-plan',
    children: [
      el('p', { class: 'hv-price', 'data-no-i18n': '' }, fmtPrice(PRICES.free, fr)),
      el('p', {}, 'To get started, no account needed.'),
      el('ul', { class: 'hv-ul' },
        ...['Forever', 'The free generator elements', 'No account needed to start'].map(t => el('li', {}, t))
      ),
      BtnOut({ to: '/generator', children: ['Start free'], onNavigate }),
    ],
  })
  plans.appendChild(freeWin)

  const premiumWin = Win({
    title: 'Premium · to come',
    icon: 'etoile',
    tb: 'y',
    x: false,
    className: 'hv-plan hv-plan-hl',
    children: [
      el('span', { class: 'hv-pro' }, 'One-time payment, lifetime access'),
      el('p', { class: 'hv-price', 'data-no-i18n': '' }, fmtPrice(PRICES.premium, fr)),
      el('p', {}, 'All of InstaFrame, paid once.'),
      el('ul', { class: 'hv-ul' },
        ...['Premium generator elements marked PRO (including Letter, Messages, Date, Combination)', 'The notebook editor (Album Studio)', 'Lifetime access, no subscription'].map(t => el('li', {}, t))
      ),
      el('span', { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } },
        BtnFill({ to: '/generator', children: ['Choose Premium'], onNavigate }),
        el('span', { class: 'hv-pro' }, 'free for now')
      ),
      Stk({ n: 's_coeurv', s: 44, style: { right: '-18px', top: '-26px' } }),
    ],
  })
  plans.appendChild(premiumWin)
  plansSec.appendChild(plans)

  const coming = el('div', { class: 'hv-coming' },
    el('span', { class: 'hv-pro hv-pro-blue' }, 'Coming later'),
    el('b', {}, 'A gift they can hold'),
    el('span', {}, 'Later, get your physical notebook delivered. Pick a print pack, or shop frames, crayons and stickers individually.')
  )
  plansSec.appendChild(coming)
  plansSec.appendChild(el('p', { class: 'hv-note' }, 'Prices in EUR. The delivered physical notebook is not included.'))
  main.appendChild(plansSec)

  // FAQ
  const faqSec = el('section', { class: 'hv-sec hv-sec-w' })
  faqSec.appendChild(SecHead({ n: '05', kicker: 'FAQ' }))
  const faq = el('div', { class: 'hv-faq', 'data-no-i18n': '' })
  getFaq(fr, true).forEach((item, i) => {
    const details = el('details', i === 0 ? { open: true } : {})
    const summary = el('summary', {},
      item.q,
      el('span', { class: 'hv-faq-ic', 'aria-hidden': 'true' }, pixel('chevdroite', 20, false))
    )
    details.appendChild(summary)
    details.appendChild(el('p', {}, item.a))
    faq.appendChild(details)
  })
  faqSec.appendChild(faq)
  main.appendChild(faqSec)

  // FINAL CTA
  const finalSec = el('section', { class: 'hv-sec hv-gp hv-final' })
  finalSec.appendChild(Stk({ n: 's_etoile', s: 64, style: { left: '180px', top: '70px', transform: 'rotate(-10deg)' } }))
  finalSec.appendChild(Stk({ n: 's_papillon', s: 72, style: { right: '200px', top: '90px' } }))
  finalSec.appendChild(Stk({ n: 's_coeur', s: 60, style: { right: '300px', bottom: '70px', transform: 'rotate(6deg)' } }))
  const finalWin = Win({
    title: 'For you ♡',
    icon: 'coeur',
    deco: true,
    className: 'hv-final-win',
    children: [
      el('div', { class: 'hv-final-body' },
        el('h2', {}, 'Take the time to make them this notebook'),
        el('p', {}, 'Start by getting inspired. What you took the time to make, they will keep.'),
        el('div', { class: 'hv-row hv-final-actions' },
          BtnFill({ to: '/generator', children: ['Start free'], onNavigate }),
          BtnOut({ to: '/get-inspired', icon: 'ampoule', children: ['Get inspired'], onNavigate })
        )
      ),
    ],
  })
  finalSec.appendChild(finalWin)
  main.appendChild(finalSec)

  root.appendChild(main)

  // FOOTER
  const footer = el('footer', { class: 'hv-footer' })
  footer.appendChild(el('span', { class: 'hv-logo hv-footer-logo' }, pixel('s_coeurv', 24, true), 'InstaFrame'))
  footer.appendChild(el('span', { class: 'hv-nav-sp' }))
  const footerNav = el('nav', { 'aria-label': 'Footer' })
  const footerLinks = [
    ['/get-inspired', 'Get Inspired'],
    ['/generator', 'Generator'],
    ['/album', 'Album Studio'],
    ['/shop', 'Shop'],
    ['/faq', 'FAQ'],
  ]
  for (const [href, label] of footerLinks) {
    const a = el('a', { href }, label)
    a.addEventListener('click', (e) => {
      e.preventDefault()
      if (href === '/album') {openStudio();return}
      onNavigate(href)
    })
    footerNav.appendChild(a)
  }
  const llms = el('a', { href: '/llms.txt' }, 'llms.text')
  llms.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/llms.txt') })
  footerNav.appendChild(llms)
  const status = el('a', { href: '/status' }, 'Status')
  status.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/status') })
  footerNav.appendChild(status)
  const privacy = el('a', { href: '/privacy' }, 'Privacy')
  privacy.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/privacy') })
  footerNav.appendChild(privacy)
  const legal = el('a', { href: '/mentions-legales' }, 'Legal notice')
  legal.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/mentions-legales') })
  footerNav.appendChild(legal)
  const feedbackBtn = el('button', { type: 'button', class: 'hv-footer-feedback' }, 'Feedback')
  footerNav.appendChild(feedbackBtn)
  footer.appendChild(footerNav)
  root.appendChild(footer)

  let attached=false;const observer=new MutationObserver(()=>{if(root.isConnected)attached=true;else if(attached){observer.disconnect();laneObj.dispose()}});observer.observe(document.documentElement,{childList:true,subtree:true});
  return root
}