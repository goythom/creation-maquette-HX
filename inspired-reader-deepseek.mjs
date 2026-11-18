import {
  buildInspiredAlbum,
  buildAlbumPages,
  loadImage,
  renderSurface,
  mount2D,
  initialDetails,
  notebookConfig,
  INSPIRED_COVER,
  INSPIRED_PAPER,
  INSPIRED_THEME_COLORS,
  PAPERS,
  setRenderLanguage,
} from './current-rendering-helpers.mjs'

const PAGE_ARROW_PATHS = {
  prev: 'M20 12H6M11.5 5.5 5 12l6.5 6.5',
  next: 'M4 12h14M12.5 5.5 19 12l-6.5 6.5',
}

function pageArrow(dir, s) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', String(s))
  svg.setAttribute('height', String(s))
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('focusable', 'false')
  Object.assign(svg.style,{display:'block',margin:'auto',flexShrink:'0'})
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', PAGE_ARROW_PATHS[dir])
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke', 'currentColor')
  path.setAttribute('stroke-width', '3.4')
  path.setAttribute('stroke-linecap', 'round')
  path.setAttribute('stroke-linejoin', 'round')
  svg.appendChild(path)
  return svg
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue
    if (k === 'class') node.className = v
    else if (k === 'text') node.textContent = v
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'aria' && typeof v === 'object') {
      for (const [ak, av] of Object.entries(v)) if (av != null) node.setAttribute(`aria-${ak}`, String(av))
    } else node.setAttribute(k, String(v))
  }
  for (const c of children) {
    if (c == null) continue
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return node
}

function makeLanguageToggle(lang, onLanguage) {
  const wrap = el('div', {
    class: 'lang-toggle lang-toggle--inline',
    'data-no-i18n': '',
    role: 'group',
    'aria-label': 'Language',
  })
  const mk = (value) => {
    const on = lang === value
    const btn = el('button', {
      type: 'button',
      'aria-pressed': on ? 'true' : 'false',
      text: value.toUpperCase(),
    })
    btn.addEventListener('click', () => onLanguage?.(value))
    return btn
  }
  wrap.appendChild(mk('en'))
  wrap.appendChild(mk('fr'))
  return wrap
}

export function renderInspiredReader({
  item: { name, theme },
  lang = 'en',
  onClose,
  onUse,
  onLanguage,
}) {
  const t = (fr, en) => (lang === 'fr' ? fr : en)
  try { setRenderLanguage?.(lang) } catch { /* ignore */ }

  const details = {
    ...initialDetails,
    title: name,
    paper: INSPIRED_PAPER[name] || 'white',
    cover: INSPIRED_COVER[theme] || 'graphite',
  }
  const themeColors = INSPIRED_THEME_COLORS[theme] || {}
  const config = {
    ...notebookConfig(details, lang === 'fr'),
    title: name,
    ...(themeColors.cover ? { coverColor: themeColors.cover } : {}),
    ...(themeColors.ink ? { coverInk: themeColors.ink } : {}),
  }

  const main = el('main', {
    'data-no-i18n': '',
    class: 'notebook-preview album-reader hx-preview reader-discovery reader-2d',
  })

  // ---- header ----
  const backBtn = el('button', { class: 'reader-back reader-back--library', type: 'button' })
  backBtn.appendChild(el('span', { text: t('Bibliothèque', 'Library') }))
  backBtn.addEventListener('click', () => onClose?.())

  const title = el('h1', { text: name })

  const actions = el('div', { class: 'reader-actions' })
  actions.appendChild(makeLanguageToggle(lang, onLanguage))
  const useBtn = el('button', {
    class: 'reader-share-btn',
    type: 'button',
    text:t('Aller au générateur','Go to generator'),
  })
  useBtn.addEventListener('click', () => onUse?.())
  actions.appendChild(useBtn)

  const header = el('header', {}, [backBtn, title, actions])
  main.appendChild(header)

  // ---- stage ----
  const host = el('div', { class: 'notebook-host' })
  host.setAttribute('aria-busy', 'true')
  const loading = el('p', {
    class: 'reader-loading',
    role: 'status',
    text: t('Préparation de votre album…', 'Preparing your album…'),
  })
  const stage = el('section', { class: 'reader-stage', 'aria-label': 'Album' }, [host, loading])
  main.appendChild(stage)

  const errorEl = el('p', { class: 'reader-error', role: 'alert' })
  errorEl.style.display = 'none'
  main.appendChild(errorEl)

  // ---- footer ----
  const prevBtn = el('button', { type: 'button', 'aria-label': t('Page précédente', 'Previous page') })
  prevBtn.appendChild(pageArrow('prev', 26))
  prevBtn.disabled = true

  const positionSpan = el('span', { text: '' })
  const progress = el('progress', { 'aria-label': t("Position dans l'album", 'Position in album') })
  progress.value = 0
  progress.max = 1
  const position = el('div', { class: 'reader-position', 'aria-live': 'polite' }, [positionSpan, progress])

  const nextBtn = el('button', { type: 'button', 'aria-label': t('Page suivante', 'Next page') })
  nextBtn.appendChild(pageArrow('next', 26))
  nextBtn.disabled = true

  const coverBtn = el('button', {
    class: 'reader-cover',
    type: 'button',
    text: t('Couverture', 'Cover'),
  })
  coverBtn.disabled = true

  const footer = el('footer', { class: 'reader-navigation' }, [prevBtn, position, nextBtn, coverBtn])
  main.appendChild(footer)

  // ---- hint ----
  const hint = el('p', { class: 'reader-hint' })
  const discoveryHint = t('✓ Modèle retenu : retrouve-le dans Album Studio pour l’utiliser. ', '✓ Kept: find it in Album Studio to use it. ')
  hint.appendChild(document.createTextNode(discoveryHint))
  hint.appendChild(document.createTextNode(
    t(
      'Tournez les pages en glissant ou en cliquant, ou avec les flèches.',
      'Drag or click to turn the page, or use the arrows.',
    ),
  ))
  main.appendChild(hint)

  // ---- state ----
  prevBtn.addEventListener('click',()=>api?.prev());nextBtn.addEventListener('click',()=>api?.next());coverBtn.addEventListener('click',()=>api?.goto(0))
  let disposed = false
  let api = null
  let page = 0
  let count = 8
  let portrait = false
  let busy = true
  let previousFocus = null
  let resizeObserver = null
  let keyHandler = null
  let escapeHandler = null
  let connected = false

  const updatePosition = () => {
    const pos =
      page === 0
        ? t('Couverture avant', 'Front cover')
        : page === count + 1
          ? t('Couverture arrière', 'Back cover')
          : portrait
            ? `Page ${page} ${t('sur', 'of')} ${count}`
            : `${page === count ? 'Page' : 'Pages'} ${page}${page < count ? ` - ${page + 1}` : ''} ${t('sur', 'of')} ${count}`
    positionSpan.textContent = pos
    progress.value = page
    progress.max = count + 1
    prevBtn.disabled = busy || page === 0
    nextBtn.disabled = busy || page === count + 1
    coverBtn.disabled = busy || page === 0
  }

  const setBusy = (v) => {
    busy = v
    host.setAttribute('aria-busy', v ? 'true' : 'false')
    if (v) {
      if (!loading.isConnected) stage.appendChild(loading)
    } else {
      loading.remove()
    }
    updatePosition()
  }

  const showError = (msg) => {
    errorEl.textContent = msg
    errorEl.style.display = ''
  }

  const onChange = (i) => {
    page = i
    updatePosition()
  }

  const onKey = (e) => {
    if (busy) return
    if (e.altKey || e.metaKey || e.ctrlKey) return
    const target = e.target
    if (target instanceof HTMLElement && target.closest('input,select,textarea,audio,button,[contenteditable=true]')) return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      api?.next?.()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      api?.prev?.()
    } else if (e.key === 'Home') {
      e.preventDefault()
      api?.goto?.(0)
    }
  }

  const onEscape = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose?.()
    }
  }

  const attach = () => {
    if (connected) return
    connected = true
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    backBtn.focus()
    keyHandler = onKey
    escapeHandler = onEscape
    window.addEventListener('keydown', keyHandler)
    window.addEventListener('keydown', escapeHandler)
    resizeObserver = new ResizeObserver(() => {
      const next = (host.clientWidth || 0) < 700
      if (next !== portrait) {
        portrait = next
        updatePosition()
      }
    })
    resizeObserver.observe(host)
  }

  const detach = () => {
    if (!connected) return
    connected = false
    if (keyHandler) window.removeEventListener('keydown', keyHandler)
    if (escapeHandler) window.removeEventListener('keydown', escapeHandler)
    keyHandler = null
    escapeHandler = null
    resizeObserver?.disconnect()
    resizeObserver = null
    try { api?.dispose?.() } catch { /* ignore */ }
    api = null
    if (previousFocus?.isConnected) previousFocus.focus()
    previousFocus = null
  }

  // Observe connection to run attach/detach
  const mo = new MutationObserver(() => {
    if (main.isConnected) attach()
    else if(connected){disposed=true;mo.disconnect();detach()}
  })
  mo.observe(document.documentElement, { childList: true, subtree: true })

  // ---- async build ----
  const build = async () => {
    try {
      setBusy(true)
      errorEl.style.display = 'none'

      // Wait for fonts before drawing (source: ensureTextFont + document.fonts.ready)
      try { await document.fonts?.ready } catch { /* ignore */ }

      const { album } = await buildInspiredAlbum(name)
      if (disposed) return
      const albumArr = Array.isArray(album) ? album : []
      count = albumArr.length * 2 || 8

      const images = await buildAlbumPages(
        albumArr,
        false,
        config.paper !== 'black',
        false,
        { color: PAPERS[config.paper].color, grain: config.grain },
        [],
        '',
        undefined,
        count,
      )
      if (disposed) return

      const surfaces = await Promise.all(
        images.slice(1, -1).map(async (src) => {
          const image = await loadImage(src)
          const canvas = document.createElement('canvas')
          canvas.width = image.naturalWidth
          canvas.height = image.naturalHeight
          canvas.getContext('2d').drawImage(image, 0, 0)
          return canvas
        }),
      )
      if (disposed) return

      const doc = {
        schema: 1,
        revision: 1,
        config: { ...config },
        pages: Array.from({ length: count }, (_, i) => ({ id: `album-${i}`, title: '', items: [] })),
      }

      const surface = (d, i) => {
        if (i === 0) return renderSurface(d, 0)
        if (i === count + 1) return renderSurface(d, i)
        return surfaces[i - 1]
      }

      host.replaceChildren()
      api = mount2D(host, doc, 0, onChange, surface, 1600, 24, 700)
      page = 0
      setBusy(false)
      updatePosition()
    } catch (e) {
      if (disposed) return
      setBusy(false)
      showError(e instanceof Error ? e.message : t('Chargement impossible.', 'Could not load this notebook.'))
    }
  }

  void build()

  // Wrap dispose to also clean observers
  const originalDispose = () => {
    disposed = true
    mo.disconnect()
    detach()
  }

  // Expose a dispose on the returned element for callers
  main.dispose = originalDispose

  return main
}