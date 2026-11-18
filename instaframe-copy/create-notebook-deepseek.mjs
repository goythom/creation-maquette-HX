// src/components/CreateNotebookDialog.mjs
// Vanilla DOM port of CreateNotebookDialog.tsx.
// No React, no network, no auth, no account save/upload.
// Caller appends the returned backdrop to .app or body.

import { renderTextStyleMenus } from './generator-page-deepseek.mjs'
import {
  initialDetails,
  COVERS,
  PAPERS,
  notebookMaterial,
  renderFramePng,textFamily,isTextFont,ensureTextFont,
} from './current-rendering-helpers.mjs'

// ---------------------------------------------------------------------------
// Constants mirrored from source (text-style.ts / notebook/creation.ts)
// ---------------------------------------------------------------------------

export const NOTEBOOK_TITLE_SIZE = 42

const DRAFT_KEY = 'instaframe-notebook-creation-v1'
const DRAFT_TTL_MS = 3600000

const DEFAULT_SPREADS = 4 // source: DEFAULT_SPREADS (4 spreads = 8 inner pages)

const COVER_NAMES_EN = {
  graphite: 'Graphite black',
  cognac: 'Cognac brown',
  burgundy: 'Deep burgundy',
  midnight: 'Midnight blue',
  forest: 'Forest green',
  terracotta: 'Terracotta',
  linen: 'Light beige',
  cream: 'Off-white',
  rose: 'Powder pink',
}

const PAPER_NAMES_EN = {
  black: 'Black',
  white: 'White',
  beige: 'Beige',
}

// ---------------------------------------------------------------------------
// Small helpers (mirrors of creation.ts / model.ts)
// ---------------------------------------------------------------------------

function coverInkFor(id) {
  const c = COVERS[id]
  return c && typeof c.ink === 'string' ? c.ink : undefined
}

function validDetails(value) {
  const d = value && typeof value === 'object' ? value : {}
  const out = {
    title: typeof d.title === 'string' ? d.title.slice(0, 80) : undefined,
    recipient: typeof d.recipient === 'string' ? d.recipient.slice(0, 60) : '',
    date:
      typeof d.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.date)
        ? d.date
        : '',
    dedication:
      typeof d.dedication === 'string' ? d.dedication.slice(0, 160) : '',
    cover:
      d.cover && Object.hasOwn(COVERS, d.cover) ? d.cover : 'graphite',
    paper:
      d.paper && Object.hasOwn(PAPERS, d.paper) ? d.paper : 'black',
    grain:
      typeof d.grain === 'number' && Number.isFinite(d.grain)
        ? Math.max(0, Math.min(1, d.grain))
        : 0.35,
  }
  if (typeof d.font === 'string' && isTextFont(d.font)) out.font = d.font
  if (typeof d.titleSize === 'number' && Number.isFinite(d.titleSize)) {
    out.titleSize = Math.max(12, Math.min(96, d.titleSize))
  }
  return out
}

function notebookTitle(d, fr) {
  return (
    (d.title && d.title.trim()) ||
    (d.recipient && d.recipient.trim()
      ? `${fr ? 'Pour' : 'For'} ${d.recipient.trim()}`
      : fr
        ? 'Mon carnet'
        : 'My notebook')
  )
}

function displayNotebookDate(value, fr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return ''
  const date = new Date(value + 'T12:00:00')
  if (Number.isNaN(date.getTime())) return ''
  return date
    .toLocaleDateString(fr ? 'fr-FR' : 'en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replaceAll('/', ' · ')
}

function newAlbumClientId() {
  try {
    return globalThis.crypto.randomUUID()
  } catch {
    return 'local-' + Math.random().toString(36).slice(2)
  }
}

function createNotebookState(_frames, _elements, details, fr) {
  // Source: createNotebookState — 8 empty inner pages (4 spreads), empty cover.
  return {
    innerPageCount: DEFAULT_SPREADS * 2,
    album: Array.from({ length: DEFAULT_SPREADS }, () => []),
    cover: [],
    open: false,
    page: 0,
    savedId: null,
    savedName: notebookTitle(details, fr),
    clientId: newAlbumClientId(),
    details,
  }
}

// ---------------------------------------------------------------------------
// Draft persistence (localStorage, no secrets)
// ---------------------------------------------------------------------------

function readCreationDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const d = JSON.parse(raw)
    if (!d || typeof d !== 'object') return null
    if (Date.now() - d.ts >= DRAFT_TTL_MS) return null
    if (!Array.isArray(d.frameIds) || !Array.isArray(d.elementIds)) return null
    return { ...d, details: validDetails(d.details) }
  } catch {
    return null
  }
}

function writeCreationDraft(draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, ts: Date.now() }))
  } catch {
    /* storage unavailable */
  }
}

function clearCreationDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    /* storage unavailable */
  }
}

// ---------------------------------------------------------------------------
// Google logo (inline SVG, no external action)
// ---------------------------------------------------------------------------

function googleLogoSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 48 48')
  svg.setAttribute('aria-hidden', 'true')
  const paths = [
    ['#EA4335', 'M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z'],
    ['#4285F4', 'M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z'],
    ['#FBBC05', 'M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z'],
    ['#34A853', 'M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z'],
  ]
  for (const [fill, d] of paths) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    p.setAttribute('fill', fill)
    p.setAttribute('d', d)
    svg.appendChild(p)
  }
  return svg
}

// ---------------------------------------------------------------------------
// Slideshow frame (async renderFramePng, falls back to frame.photo.src)
// ---------------------------------------------------------------------------

function createSlideshowFrame(frame) {
  const wrap = document.createElement('div')
  wrap.className = 'create-book__thumb'
  let alive = true
  const img = document.createElement('img')
  img.alt = frame.caption || 'Photo'
  wrap.appendChild(img)
  renderFramePng(frame, 800)
    .then((url) => {
      if (alive) img.src = url
    })
    .catch(() => {
      if (alive && frame.photo && frame.photo.src) img.src = frame.photo.src
    })
  return {
    el: wrap,
    dispose() {
      alive = false
    },
  }
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function renderCreateNotebookDialog({
  items = [],
  lang = 'en',
  onClose = () => {},
  onDone = () => {},
  onLocalCreate,
} = {}) {
  const fr = lang === 'fr'
  const t = (a, b) => (fr ? a : b)

  // Split items into frames vs generated elements (source: frames + elements).
  const frames = []
  const elements = []
  for (const it of items) {
    if (!it || typeof it !== 'object') continue
    if (it.kind === 'Frames' || it.frame) frames.push({...it.frame,id:it.id})
    else elements.push(it)
  }

  // Restore draft or start from initialDetails.
  const restored = readCreationDraft()
  let details = restored ? { ...restored.details } : { ...initialDetails }

  // UI state.
  let opened = false
  let loginNeeded = false
  let busy = false
  let error = ''
  let marqueePaused = false
  let submitGuard = false

  // -------------------------------------------------------------------------
  // Root
  // -------------------------------------------------------------------------
  const backdrop = document.createElement('div')
  backdrop.className = 'create-book-backdrop'

  const dialog = document.createElement('div')
  dialog.tabIndex = -1
  dialog.className = 'create-book'
  dialog.setAttribute('role', 'dialog')
  dialog.setAttribute('aria-modal', 'true')
  dialog.setAttribute('aria-labelledby', 'create-book-title')
  dialog.setAttribute('data-no-i18n', '')
  backdrop.appendChild(dialog)

  // -------------------------------------------------------------------------
  // Header
  // -------------------------------------------------------------------------
  const header = document.createElement('header')
  header.className = 'create-book__header'
  const h2 = document.createElement('h2')
  h2.id = 'create-book-title'
  h2.textContent = t('Pour qui est ce carnet ?', 'Who is this notebook for?') + ' ♡'
  header.appendChild(h2)
  const closeBtn = document.createElement('button')
  closeBtn.className = 'create-book__close'
  closeBtn.setAttribute('aria-label', t('Fermer', 'Close'))
  closeBtn.textContent = '×'
  closeBtn.addEventListener('click', () => {
    if (!busy) onClose()
  })
  header.appendChild(closeBtn)
  dialog.appendChild(header)

  // -------------------------------------------------------------------------
  // Top layout
  // -------------------------------------------------------------------------
  const top = document.createElement('div')
  top.className = 'create-book__top'
  dialog.appendChild(top)

  // ---- Form column --------------------------------------------------------
  const form = document.createElement('form')
  form.id = 'create-book-form'
  form.className = 'create-book__form'
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    void create()
  })
  top.appendChild(form)

  // Login strip (only when no session and no local fixture caller).
  const loginStrip = document.createElement('div')
  loginStrip.className = 'create-book__login'
  loginStrip.hidden = !!onLocalCreate
  {
    const icon = document.createElement('span')
    icon.setAttribute('aria-hidden', 'true')
    icon.textContent = 'ⓘ'
    loginStrip.appendChild(icon)
    const b = document.createElement('b')
    b.textContent = t('Connecte-toi pour continuer', 'Sign in to continue')
    loginStrip.appendChild(b)
    const gbtn = document.createElement('button')
    gbtn.type = 'button'
    gbtn.appendChild(googleLogoSvg())
    gbtn.appendChild(
      document.createTextNode(
        t('Continuer avec Google', 'Continue with Google'),
      ),
    )
    gbtn.addEventListener('click', () => {
      // Source: google() writes draft then signIn(). No auth here — no-op.
      // We keep the draft write so the caller can resume, but never pretend sign-in.
      try {
        writeCreationDraft({
          details,
          frameIds: frames.map((f) => f.id),
          elementIds: elements.map((e) => e.id),
          returnPath: location.pathname,
        })
      } catch {
        /* ignore */
      }
    })
    loginStrip.appendChild(gbtn)
  }
  form.appendChild(loginStrip)

  // Fields: recipient + date
  const fields = document.createElement('div')
  fields.className = 'create-book__fields'
  form.appendChild(fields)

  const recipientLabel = document.createElement('label')
  recipientLabel.textContent = t('Son prénom', 'Their first name')
  const recipientInput = document.createElement('input')
  recipientInput.maxLength = 60
  recipientInput.value = details.recipient || ''
  recipientInput.addEventListener('input', () => {
    details = { ...details, recipient: recipientInput.value }
    scheduleDraftWrite()
    updatePreview()
  })
  recipientLabel.appendChild(recipientInput)
  fields.appendChild(recipientLabel)

  const dateLabel = document.createElement('label')
  dateLabel.textContent = t('Date spéciale', 'Special date')
  const dateWrap = document.createElement('span')
  dateWrap.className = 'create-book__date'
  const dateDisplay = document.createElement('span')
  dateDisplay.setAttribute('aria-hidden', 'true')
  const dateInput = document.createElement('input')
  dateInput.type = 'date'
  dateInput.value = details.date || ''
  dateInput.addEventListener('input', () => {
    details = { ...details, date: dateInput.value }
    scheduleDraftWrite()
    updatePreview()
  })
  dateWrap.appendChild(dateDisplay)
  dateWrap.appendChild(dateInput)
  dateLabel.appendChild(dateWrap)
  fields.appendChild(dateLabel)

  // Title field
  const titleLabel = document.createElement('label')
  titleLabel.className = 'create-book__title-field'
  titleLabel.textContent = t(
    'Titre du carnet (obligatoire)',
    'Notebook title (required)',
  )
  const titleInput = document.createElement('input')
  titleInput.required = true
  titleInput.maxLength = 80
  titleInput.value = details.title || ''
  titleInput.addEventListener('input', () => {
    details = { ...details, title: titleInput.value }
    scheduleDraftWrite()
    updatePreview()
    updateSubmitDisabled()
  })
  titleLabel.appendChild(titleInput)
  form.appendChild(titleLabel)

  // TextStyleMenus (imported)
  const textStyleHost = document.createElement('div')
  form.appendChild(textStyleHost)
  let textStyleMenus = null
  function mountTextStyleMenus() {
    textStyleHost.innerHTML = ''
    textStyleMenus = renderTextStyleMenus({
      font: details.font,
      size: details.titleSize ?? NOTEBOOK_TITLE_SIZE,
      defaultFontLabel: t('Georgia (d’origine)', 'Georgia (original)'),
      minSize: 24,
      maxSize: 56,
      onFont: (font) => {
        details = { ...details, font };void ensureTextFont(font);mountTextStyleMenus()
        scheduleDraftWrite()
        updatePreview()
      },
      onSize: (titleSize) => {
        details = { ...details, titleSize };mountTextStyleMenus()
        scheduleDraftWrite()
        updatePreview()
      },
      lang,
    })
    if (textStyleMenus) textStyleHost.appendChild(textStyleMenus)
  }
  mountTextStyleMenus()

  // Generated elements section
  const generatedSection = document.createElement('section')
  generatedSection.className = 'create-book__generated'
  generatedSection.setAttribute('aria-labelledby', 'create-book-elements')
  const genH3 = document.createElement('h3')
  genH3.id = 'create-book-elements'
  genH3.textContent = t('Vos éléments générés', 'Your generated elements')
  generatedSection.appendChild(genH3)

  const slideCount = frames.length + elements.length
  const marquee = document.createElement('div')
  marquee.className = 'create-book__thumbs create-book__marquee'
  if (slideCount <= 3) marquee.classList.add('create-book__marquee--static')
  marquee.tabIndex = 0
  marquee.setAttribute(
    'aria-label',
    t(
      'Éléments générés, défilement horizontal',
      'Generated elements, scroll horizontally',
    ),
  )
  marquee.style.setProperty('--preview-count', String(slideCount))
  marquee.style.setProperty('--preview-duration', `${slideCount * 1.2}s`)

  const track = document.createElement('div')
  track.className = 'create-book__track'
  marquee.appendChild(track)

  const slideshowDisposers = []
  function buildSequence(ariaHidden) {
    const seq = document.createElement('div')
    seq.className = 'create-book__sequence'
    if (ariaHidden) seq.setAttribute('aria-hidden', 'true')
    for (const f of frames) {
      const s = createSlideshowFrame(f)
      slideshowDisposers.push(s.dispose)
      seq.appendChild(s.el)
    }
    for (const e of elements) {
      const thumb = document.createElement('div')
      thumb.className = 'create-book__thumb'
      const img = document.createElement('img')
      img.src = e.src || ''
      img.alt = e.text || e.kind || ''
      thumb.appendChild(img)
      seq.appendChild(thumb)
    }
    return seq
  }
  track.appendChild(buildSequence(false))
  if (slideCount > 3) track.appendChild(buildSequence(true))
  generatedSection.appendChild(marquee)

  let motionBtn = null
  if (slideCount > 3) {
    motionBtn = document.createElement('button')
    motionBtn.type = 'button'
    motionBtn.className = 'create-book__motion'
    motionBtn.setAttribute('aria-pressed', 'false')
    motionBtn.textContent = t('Mettre en pause', 'Pause scrolling')
    motionBtn.addEventListener('click', () => {
      marqueePaused = !marqueePaused
      marquee.classList.toggle('create-book__marquee--paused', marqueePaused)
      motionBtn.setAttribute('aria-pressed', String(marqueePaused))
      motionBtn.textContent = marqueePaused
        ? t('Reprendre le défilement', 'Resume scrolling')
        : t('Mettre en pause', 'Pause scrolling')
    })
    generatedSection.appendChild(motionBtn)
  }
  form.appendChild(generatedSection)

  // ---- Right column -------------------------------------------------------
  const right = document.createElement('div')
  right.className = 'create-book__right'
  top.appendChild(right)

  // Toggle closed/open
  const toggle = document.createElement('div')
  toggle.className = 'create-book__toggle'
  toggle.setAttribute('role', 'group')
  toggle.setAttribute('aria-label', t('Vue du carnet', 'Notebook view'))
  const closedBtn = document.createElement('button')
  closedBtn.textContent = t('Fermé', 'Closed')
  closedBtn.setAttribute('aria-pressed', 'true')
  const openBtn = document.createElement('button')
  openBtn.textContent = t('Ouvert', 'Open')
  openBtn.setAttribute('aria-pressed', 'false')
  closedBtn.addEventListener('click', () => {
    opened = false
    closedBtn.setAttribute('aria-pressed', 'true')
    openBtn.setAttribute('aria-pressed', 'false')
    updatePreview()
  })
  openBtn.addEventListener('click', () => {
    opened = true
    closedBtn.setAttribute('aria-pressed', 'false')
    openBtn.setAttribute('aria-pressed', 'true')
    updatePreview()
  })
  toggle.appendChild(closedBtn)
  toggle.appendChild(openBtn)
  right.appendChild(toggle)

  // Preview
  const preview = document.createElement('div')
  preview.className = 'create-book__preview'
  preview.setAttribute('aria-label', t('Aperçu du carnet', 'Notebook preview'))
  right.appendChild(preview)

  // Settings
  const settings = document.createElement('div')
  settings.className = 'create-book__settings'
  right.appendChild(settings)

  // Cover swatches
  const coverFieldset = document.createElement('fieldset')
  const coverLegend = document.createElement('legend')
  coverLegend.textContent = t('Couleur du cuir', 'Leather colour')
  coverFieldset.appendChild(coverLegend)
  const swatches = document.createElement('div')
  swatches.className = 'create-book__swatches'
  for (const [key, c] of Object.entries(COVERS)) {
    const btn = document.createElement('button')
    const label = fr ? c.name : COVER_NAMES_EN[key] || c.name
    btn.title = label
    btn.setAttribute('aria-label', label)
    btn.setAttribute('aria-pressed', String(details.cover === key))
    btn.style.setProperty('--swatch', c.color)
    btn.addEventListener('click', () => {
      details = { ...details, cover: key }
      for (const b of swatches.children) {
        b.setAttribute(
          'aria-pressed',
          String(b.dataset.cover === key),
        )
      }
      scheduleDraftWrite()
      updatePreview()
    })
    btn.dataset.cover = key
    swatches.appendChild(btn)
  }
  coverFieldset.appendChild(swatches)
  settings.appendChild(coverFieldset)

  // Paper swatches
  const paperFieldset = document.createElement('fieldset')
  const paperLegend = document.createElement('legend')
  paperLegend.textContent = t('Couleur du papier', 'Paper colour')
  paperFieldset.appendChild(paperLegend)
  const papers = document.createElement('div')
  papers.className = 'create-book__papers'
  for (const [key, p] of Object.entries(PAPERS)) {
    const btn = document.createElement('button')
    btn.setAttribute('aria-pressed', String(details.paper === key))
    btn.dataset.paper = key
    const swatch = document.createElement('span')
    swatch.style.background = p.color
    btn.appendChild(swatch)
    btn.appendChild(
      document.createTextNode(fr ? p.name : PAPER_NAMES_EN[key] || p.name),
    )
    btn.addEventListener('click', () => {
      details = { ...details, paper: key }
      for (const b of papers.children) {
        b.setAttribute('aria-pressed', String(b.dataset.paper === key))
      }
      scheduleDraftWrite()
      updatePreview()
    })
    papers.appendChild(btn)
  }
  paperFieldset.appendChild(papers)
  settings.appendChild(paperFieldset)

  // Grain slider
  const grainLabel = document.createElement('label')
  grainLabel.className = 'create-book__grain'
  grainLabel.textContent = t('Grain fin', 'Fine grain')
  const grainInput = document.createElement('input')
  grainInput.type = 'range'
  grainInput.min = '0'
  grainInput.max = '100'
  grainInput.step = '5'
  grainInput.value = String(Math.round(details.grain * 100))
  grainInput.addEventListener('input', () => {
    details = { ...details, grain: Number(grainInput.value) / 100 }
    scheduleDraftWrite()
    updatePreview()
  })
  grainLabel.appendChild(grainInput)
  settings.appendChild(grainLabel)

  // -------------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------------
  const actions = document.createElement('div')
  actions.className = 'create-book__actions'
  dialog.appendChild(actions)

  const cancelBtn = document.createElement('button')
  cancelBtn.type = 'button'
  cancelBtn.textContent = t('Annuler', 'Cancel')
  cancelBtn.addEventListener('click', () => {
    if (!busy) onClose()
  })
  actions.appendChild(cancelBtn)

  const createBtn = document.createElement('button')
  createBtn.type = 'submit'
  createBtn.setAttribute('form', 'create-book-form')
  createBtn.textContent = t('Créer mon carnet', 'Create my notebook')
  actions.appendChild(createBtn)

  // Error / login-required messages
  const loginError = document.createElement('p')
  loginError.setAttribute('role', 'alert')
  loginError.className = 'create-book__error'
  loginError.hidden = true
  loginError.textContent = t(
    'Connecte-toi avec Google pour continuer.',
    'Sign in with Google to continue.',
  )
  dialog.appendChild(loginError)

  const errorEl = document.createElement('p')
  errorEl.setAttribute('role', 'alert')
  errorEl.className = 'create-book__error'
  errorEl.hidden = true
  dialog.appendChild(errorEl)

  // -------------------------------------------------------------------------
  // Texture memoization (per cover / per paper+grain)
  // -------------------------------------------------------------------------
  let coverTextureCache = { key: null, url: '' }
  let paperTextureCache = { key: null, url: '' }

  function getCoverTexture() {
    const key = details.cover
    if (coverTextureCache.key === key) return coverTextureCache.url
    try {
      const url = notebookMaterial(COVERS[key].color, 0.65, true).toDataURL()
      coverTextureCache = { key, url }
      return url
    } catch {
      return ''
    }
  }

  function getPaperTexture() {
    const key = `${details.paper}:${details.grain}`
    if (paperTextureCache.key === key) return paperTextureCache.url
    try {
      const url = notebookMaterial(
        PAPERS[details.paper].color,
        details.grain,
      ).toDataURL()
      paperTextureCache = { key, url }
      return url
    } catch {
      return ''
    }
  }

  // -------------------------------------------------------------------------
  // Preview rendering (only rebuilds the preview subtree, not the whole form)
  // -------------------------------------------------------------------------
  function updatePreview() {
    const coverK = (details.titleSize ?? NOTEBOOK_TITLE_SIZE) / NOTEBOOK_TITLE_SIZE
    const coverStyle = details.font
      ? { fontFamily: textFamily(details.font, 'inherit') }
      : {}
    const title = notebookTitle(details, fr)
    const date = displayNotebookDate(details.date, fr)
    const coverTexture = getCoverTexture()
    const paperTexture = getPaperTexture()

    preview.classList.toggle('create-book__preview--open', opened)
    preview.style.setProperty('--book-cover', COVERS[details.cover].color)
    preview.style.setProperty('--book-paper', PAPERS[details.paper].color)
    preview.style.setProperty(
      '--book-ink',
      coverInkFor(details.cover) || PAPERS[details.paper].ink,
    )
    preview.style.backgroundImage = coverTexture ? `url(${coverTexture})` : ''

    preview.innerHTML = ''

    if (!opened) {
      const cover = document.createElement('div')
      cover.className = 'create-book__cover'
      Object.assign(cover.style, coverStyle)

      const b = document.createElement('b')
      b.style.fontSize = Math.round(18 * coverK) + 'px'
      b.textContent = title
      cover.appendChild(b)

      if (details.recipient && details.recipient.trim()) {
        const rec = document.createElement('span')
        rec.className = 'create-book__recipient'
        rec.textContent = `${t('Pour', 'For')} ${details.recipient.trim()}`
        cover.appendChild(rec)
      }

      const dateSpan = document.createElement('span')
      dateSpan.className = 'create-book__cover-date'
      dateSpan.textContent = date
      cover.appendChild(dateSpan)

      const heart = document.createElement('span')
      heart.className = 'create-book__heart'
      heart.setAttribute('aria-hidden', 'true')
      heart.textContent = '♡'
      cover.appendChild(heart)

      preview.appendChild(cover)
    } else {
      const left = document.createElement('div')
      left.setAttribute('aria-hidden', 'true')
      left.className = 'create-book__page create-book__page--left'
      left.style.backgroundImage = paperTexture ? `url(${paperTexture})` : ''
      preview.appendChild(left)

      const rightPage = document.createElement('div')
      rightPage.setAttribute('aria-hidden', 'true')
      rightPage.className = 'create-book__page'
      rightPage.style.backgroundImage = paperTexture
        ? `url(${paperTexture})`
        : ''
      preview.appendChild(rightPage)
    }

    // Date display in the form
    dateDisplay.textContent = details.date
      ? new Date(details.date + 'T12:00:00').toLocaleDateString(
          fr ? 'fr-FR' : 'en-GB',
          { day: '2-digit', month: '2-digit', year: 'numeric' },
        )
      : t('Date…', 'Date…')
  }

  // -------------------------------------------------------------------------
  // Submit state
  // -------------------------------------------------------------------------
  function updateSubmitDisabled() {
    const hasTitle = !!(details.title && details.title.trim())
    createBtn.disabled = busy || !hasTitle
    closeBtn.disabled = busy
    cancelBtn.disabled = busy
  }

  // -------------------------------------------------------------------------
  // Draft write (debounced)
  // -------------------------------------------------------------------------
  let draftTimer = null
  function scheduleDraftWrite() {
    try {writeCreationDraft({details,frameIds:frames.map(f=>f.id),elementIds:elements.map(e=>e.id),returnPath:location.pathname})}
    catch {error=t('Le stockage local est indisponible. Garde cette page ouverte pour conserver tes réponses.','Local storage is unavailable. Keep this page open to keep your answers.');errorEl.textContent=error;errorEl.hidden=false}
  }

  // -------------------------------------------------------------------------
  // Create
  // -------------------------------------------------------------------------
  async function create() {
    if (submitGuard) return
    if (!details.title || !details.title.trim()) return

    // Default anonymous: no session, no local fixture -> login required.
    if (!onLocalCreate) {
      loginNeeded = true
      loginStrip.hidden = false
      loginStrip.classList.add('create-book__login--required')
      loginStrip.setAttribute('role', 'alert')
      loginError.hidden = false
      return
    }

    submitGuard = true
    busy = true
    error = ''
    errorEl.hidden = true
    updateSubmitDisabled()
    createBtn.textContent = t('Création…', 'Creating…')

    try {
      const state = createNotebookState(
        frames,
        elements,
        { ...details, title: details.title.trim(), dedication: '' },
        fr,
      )
      onLocalCreate(state)
      clearCreationDraft()
      onDone()
    } catch (e) {
      error = t(
        'Impossible de créer ton carnet. Tes réponses et tes éléments sont conservés. Réessaie.',
        'Could not create your notebook. Your answers and elements are kept. Try again.',
      )
      errorEl.textContent = error
      errorEl.hidden = false
    } finally {
      submitGuard = false
      busy = false
      createBtn.textContent = t('Créer mon carnet', 'Create my notebook')
      updateSubmitDisabled()
    }
  }

  // -------------------------------------------------------------------------
  // Backdrop click
  // -------------------------------------------------------------------------
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop && !busy) onClose()
  })

  // -------------------------------------------------------------------------
  // Focus trap + Escape + overflow restore
  // -------------------------------------------------------------------------
  const previousActive =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
  const oldOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialog.focus()

  function onKeyDown(e) {
    if (e.key === 'Escape' && !submitGuard) {
      e.preventDefault()
      onClose()
      return
    }
    if (e.key === 'Tab') {
      const nodes = Array.from(
        dialog.querySelectorAll(
          'button:not(:disabled),input,textarea,[tabindex="0"]',
        ),
      ).filter((n) => n instanceof HTMLElement && !n.hidden)
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (!first || !last) return
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === dialog)
      ) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
  document.addEventListener('keydown', onKeyDown)

  // -------------------------------------------------------------------------
  // Initial render
  // -------------------------------------------------------------------------
  updatePreview()
  updateSubmitDisabled()

  // -------------------------------------------------------------------------
  // Cleanup
  // -------------------------------------------------------------------------
  function cleanup() {
    if (draftTimer) {
      clearTimeout(draftTimer)
      draftTimer = null
    }
    document.removeEventListener('keydown', onKeyDown)
    document.body.style.overflow = oldOverflow
    for (const dispose of slideshowDisposers) {
      try {
        dispose()
      } catch {
        /* ignore */
      }
    }
    slideshowDisposers.length = 0
    if (previousActive && previousActive.isConnected) {
      try {
        previousActive.focus()
      } catch {
        /* ignore */
      }
    }
  }

  let connected=false;const observer=new MutationObserver(()=>{if(backdrop.isConnected){if(!connected){connected=true;dialog.focus()}}else if(connected){cleanup();observer.disconnect()}});observer.observe(document.documentElement,{childList:true,subtree:true});scheduleDraftWrite();
  backdrop.__cleanup = ()=>{cleanup();observer.disconnect()}
  return backdrop
}