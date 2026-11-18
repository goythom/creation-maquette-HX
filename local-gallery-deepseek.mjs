import {renderSlideshowWorkspace} from './slideshow-deepseek.mjs';
import {renderCreateNotebookDialog} from './create-notebook-deepseek.mjs';
import {renderFrameCard} from './generator-page-deepseek.mjs';
// src/components/generated-gallery.mjs
// Vanilla ES module port of GeneratedGallery.tsx (local-only scope).
//
// CORE CAVEAT: This module intentionally omits account/auth/network/QR/clipboard/
// real-upload features. It only manages a shared in-memory `localGenerated` store
// and renders a local gallery into an existing empty section element. No data is
// persisted to localStorage. The Saved tab renders the exact logged-out sign-in
// content but its button is inert. The album and slideshow buttons are enabled
// when local items exist but their onClick handlers are inert (scoped unfinished).
// The DownloadChooserDialog's "phone" path is inert; only "this device" downloads.
// ZIP is implemented inline (store method + CRC32) so multiple PNGs work offline.

import {pixel} from './pixel-dom.mjs'
import { frenchTree } from './translate-dom.mjs'

// ---------------------------------------------------------------------------
// Shared local store
// ---------------------------------------------------------------------------

/** @typedef {{id:string,kind:string,text?:string,src?:string,format?:string,media?:string,link?:string,[k:string]:any}} LocalElement */

/** @type {LocalElement[]} */
export const localGenerated = []

/** @type {Set<(v:LocalElement[])=>void>} */
const subscribers = new Set()

function notify() {
  const snapshot = localGenerated.slice()
  for (const cb of subscribers) {
    try { cb(snapshot) } catch { /* ignore subscriber errors */ }
  }
}

export function addLocalGenerated(element) {
  localGenerated.unshift({...element,...(element.frame?{frame:{...element.frame,photo:element.frame.photo?{...element.frame.photo}:null,pan:{...element.frame.pan},stripPhotos:element.frame.stripPhotos?.map(s=>({...s,pan:{...s.pan},photo:{...s.photo}}))}}:{})})
  notify()
}

/** @param {(v:LocalElement[])=>void} cb @returns {()=>void} */
export function subscribe(cb) {
  subscribers.add(cb)
  return () => subscribers.delete(cb)
}

/** @returns {LocalElement[]} shallow copy */
export function getLocalGenerated() {
  return localGenerated.slice()
}

// ---------------------------------------------------------------------------
// elementFilename (exact source)
// ---------------------------------------------------------------------------

let sequence = 0
const slug = (text) =>
  String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/g, '')

export function elementFilename(kind, title = '', now = Date.now()) {
  const stamp = new Date(now).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  return ['instaframe', slug(kind) || 'element', slug(title), stamp, String(++sequence)]
    .filter(Boolean)
    .join('-') + '.png'
}

// ---------------------------------------------------------------------------
// downloadDataURL — local anchor download
// ---------------------------------------------------------------------------

export function downloadDataURL(data, name) {
  const a = document.createElement('a')
  a.href = data
  a.download = name
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// ---------------------------------------------------------------------------
// Minimal ZIP (store method) + CRC32 — no dependencies
// ---------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32(bytes) {
  let c = 0xffffffff
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function dataURLToBytes(dataURL) {
  const comma = dataURL.indexOf(',')
  const meta = dataURL.slice(0, comma)
  const body = dataURL.slice(comma + 1)
  if (/;base64/i.test(meta)) {
    const bin = atob(body)
    const out = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
    return out
  }
  const text = decodeURIComponent(body)
  const out = new Uint8Array(text.length)
  for (let i = 0; i < text.length; i++) out[i] = text.charCodeAt(i)
  return out
}

function u16(v) { return [v & 0xff, (v >>> 8) & 0xff] }
function u32(v) { return [v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff] }

export function buildZip(files) {
  // files: [{name, bytes:Uint8Array}]
  const enc = new TextEncoder()
  const chunks = []
  const central = []
  let offset = 0
  for (const f of files) {
    const nameBytes = enc.encode(f.name)
    const crc = crc32(f.bytes)
    const size = f.bytes.length
    const local = new Uint8Array([
      0x50, 0x4b, 0x03, 0x04,
      ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0),
      ...u32(crc), ...u32(size), ...u32(size),
      ...u16(nameBytes.length), ...u16(0),
    ])
    chunks.push(local, nameBytes, f.bytes)
    central.push({ nameBytes, crc, size, offset })
    offset += local.length + nameBytes.length + size
  }
  const centralStart = offset
  for (const c of central) {
    const rec = new Uint8Array([
      0x50, 0x4b, 0x01, 0x02,
      ...u16(20), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0),
      ...u32(c.crc), ...u32(c.size), ...u32(c.size),
      ...u16(c.nameBytes.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0),
      ...u32(0), ...u32(c.offset),
    ])
    chunks.push(rec, c.nameBytes)
    offset += rec.length + c.nameBytes.length
  }
  const centralSize = offset - centralStart
  const end = new Uint8Array([
    0x50, 0x4b, 0x05, 0x06,
    ...u16(0), ...u16(0),
    ...u16(central.length), ...u16(central.length),
    ...u32(centralSize), ...u32(centralStart),
    ...u16(0),
  ])
  chunks.push(end)
  let total = 0
  for (const c of chunks) total += c.length
  const out = new Uint8Array(total)
  let p = 0
  for (const c of chunks) { out.set(c, p); p += c.length }
  return out
}

function bytesToDataURL(bytes, mime = 'application/zip') {
  let bin = ''
  const CHUNK = 0x8000
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK))
  }
  return `data:${mime};base64,${btoa(bin)}`
}

// ---------------------------------------------------------------------------
// CommandIcon (exact source)
// ---------------------------------------------------------------------------

function commandIcon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('class', 'command-icon')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', '14')
  svg.setAttribute('height', '14')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '1.8')
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('focusable', 'false')
  const paths = name === 'download'
    ? ['M12 3v12m-5-5 5 5 5-5', 'M4 15v5h16v-5']
    : name === 'save'
      ? ['M4 3h13l4 4v14H3V3Z M7 3v6h10V3 M7 21v-8h10v8']
      : ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7']
  for (const d of paths) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    p.setAttribute('d', d)
    svg.appendChild(p)
  }
  return svg
}

// ---------------------------------------------------------------------------
// PageArrow (exact source shape)
// ---------------------------------------------------------------------------

function pageArrow(dir, s = 26) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', String(s))
  svg.setAttribute('height', String(s))
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '3.4')
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  svg.setAttribute('aria-hidden', 'true')
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  Object.assign(svg.style,{display:'block',margin:'auto',flexShrink:'0'});p.setAttribute('d', dir === 'prev' ? 'M20 12H6M11.5 5.5 5 12l6.5 6.5' : 'M4 12h14M12.5 5.5 19 12l-6.5 6.5')
  svg.appendChild(p)
  return svg
}

// ---------------------------------------------------------------------------
// SavedBadge (exact source)
// ---------------------------------------------------------------------------

function savedBadge({ saved = true, message = 'Saved to your account' } = {}) {
  const wrap = document.createElement('span')
  wrap.className = 'save-dot-wrap'
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = `save-dot ${saved ? 'save-dot--saved' : 'save-dot--pending'}`
  btn.setAttribute('aria-label', message)
  btn.title = message
  const dot = document.createElement('span')
  dot.setAttribute('aria-hidden', 'true')
  btn.appendChild(dot)
  wrap.appendChild(btn)
  let timer = 0
  let msgEl = null
  btn.addEventListener('click', () => {
    if (msgEl) {
      msgEl.remove()
      msgEl = null
      clearTimeout(timer)
      return
    }
    msgEl = document.createElement('span')
    msgEl.setAttribute('role', 'status')
    msgEl.className = 'save-dot-message'
    msgEl.textContent = message
    wrap.appendChild(msgEl)
    timer = window.setTimeout(() => {
      if (msgEl) { msgEl.remove(); msgEl = null }
    }, 3000)
  })
  return wrap
}

// ---------------------------------------------------------------------------
// AudioGalleryItem (exact source)
// ---------------------------------------------------------------------------

function audioGalleryItem(element, selected, onSelect) {
  const root = document.createElement('div')
  root.className = `gallery-audio gallery-audio--${String(element.format || '').toLowerCase()}`

  const art = document.createElement('button')
  art.type = 'button'
  art.className = 'gallery-audio__artwork'
  art.setAttribute('data-cos-element', 'gallery-audio')
  art.setAttribute('aria-label', `${'Play'} ${element.text || 'audio'}`)
  art.setAttribute('aria-pressed', 'false')
  const img = document.createElement('img')
  img.src = element.src || ''
  img.alt = element.text || 'Audio'
  art.appendChild(img)
  const playSpan = document.createElement('span')
  playSpan.className = 'gallery-audio__play'
  playSpan.setAttribute('aria-hidden', 'true')
  const inner = document.createElement('span')
  inner.className = 'audio-play'
  playSpan.appendChild(inner)
  art.appendChild(playSpan)

  const audio = document.createElement('audio')
  audio.src = element.media || ''
  audio.controls = true
  audio.preload = 'metadata'

  const selectBtn = document.createElement('button')
  selectBtn.type = 'button'
  selectBtn.className = 'gallery-audio__select'
  selectBtn.setAttribute('aria-label', `Select ${element.text || 'audio'}`)
  selectBtn.setAttribute('aria-pressed', selected ? 'true' : 'false')
  selectBtn.textContent = selected ? 'Selected' : 'Select'
  selectBtn.addEventListener('click', onSelect)

  const errEl = document.createElement('small')
  errEl.setAttribute('role', 'alert')
  errEl.hidden = true

  let playing = false
  function setPlaying(v) {
    playing = v
    art.setAttribute('aria-pressed', v ? 'true' : 'false')
    art.setAttribute('aria-label', `${v ? 'Pause' : 'Play'} ${element.text || 'audio'}`)
    inner.className = v ? 'audio-pause' : 'audio-play'
  }
  art.addEventListener('click', () => {
    errEl.hidden = true
    errEl.textContent = ''
    if (audio.paused) {
      const p = audio.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          errEl.textContent = 'Could not play audio. Try the controls.'
          errEl.hidden = false
        })
      }
    } else {
      audio.pause()
    }
  })
  audio.addEventListener('play', () => setPlaying(true))
  audio.addEventListener('pause', () => setPlaying(false))
  audio.addEventListener('ended', () => setPlaying(false))

  root.appendChild(art)
  root.appendChild(audio)
  root.appendChild(selectBtn)
  root.appendChild(errEl)
  return root
}

// ---------------------------------------------------------------------------
// DownloadChooserDialog (local-only: phone path inert)
// ---------------------------------------------------------------------------

function creationModalHeader({ title, description, onClose, icon = 'download' }) {
  const header = document.createElement('header')
  header.className = 'creation-modal__head'
  const iconSpan = document.createElement('span')
  iconSpan.className = 'creation-modal__icon'
  iconSpan.setAttribute('aria-hidden', 'true')
  iconSpan.appendChild(pixel(icon==='phone'?'telephone':icon==='download'?'telecharger':'importer',20))
  header.appendChild(iconSpan)

  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  h2.textContent = title
  div.appendChild(h2)
  if (description) {
    const pEl = document.createElement('p')
    pEl.textContent = description
    div.appendChild(pEl)
  }
  header.appendChild(div)

  const close = document.createElement('button')
  close.className = 'creation-modal__close'
  close.type = 'button'
  close.setAttribute('aria-label', 'Close')
  close.textContent = '×'
  close.addEventListener('click', onClose)
  header.appendChild(close)
  return header
}

export function openLocalDownloadChooser({ files, onThisDevice, onClose, lang, host }) {
  const fr = lang === 'fr'
  const backdrop = document.createElement('div')
  backdrop.className = 'proposals-backdrop'
  backdrop.setAttribute('role', 'dialog')
  backdrop.setAttribute('aria-modal', 'true')
  backdrop.setAttribute('aria-label', 'Download')

  const box = document.createElement('div')
  box.className = 'dlq creation-modal'
  box.tabIndex = -1
  backdrop.appendChild(box)

  let summary = []
  let prepared = null
  let active = true
  try { prepared = files() } catch { prepared = Promise.resolve([]) }
  Promise.resolve(prepared).then((v) => {
    if (!active) return
    summary = Array.isArray(v) ? v : []
    render()
  }).catch(() => {})

  let qr = null
  let link = ''
  let busy = false
  let error = ''

  const previous = document.activeElement
  const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden'

  function focusable() {
    return [...box.querySelectorAll('button:not(:disabled),a[href]')]
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      close()
      return
    }
    if (e.key !== 'Tab') return
    const items = focusable()
    const first = items[0]
    const last = items[items.length - 1]
    if (!first) { e.preventDefault(); box.focus(); return }
    if (e.shiftKey && (document.activeElement === first || !box.contains(document.activeElement))) {
      e.preventDefault(); last.focus()
    } else if (!e.shiftKey && (document.activeElement === last || !box.contains(document.activeElement))) {
      e.preventDefault(); first.focus()
    }
  }

  function close() {
    active = false
    window.removeEventListener('keydown', onKey)
    backdrop.remove()
    document.body.style.overflow=oldOverflow
    if (previous instanceof HTMLElement && previous.isConnected) previous.focus()
    onClose()
  }

  window.addEventListener('keydown', onKey)

  function render() {
    box.innerHTML = ''
    const title = qr
      ? (fr ? 'Télécharger sur ton téléphone' : 'Download on your phone')
      : summary.length > 1
        ? (fr ? `Télécharger ${summary.length} éléments` : `Download ${summary.length} elements`)
        : (fr ? 'Télécharger' : 'Download')
    const description = qr
      ? (fr ? 'Scanne ce code avec ton téléphone. Le lien fonctionne pendant 1 heure.' : 'Scan this code with your phone. The link works for 1 hour.')
      : (fr ? 'Un élément : PNG haute définition. Plusieurs : ZIP avec les mêmes résolutions.' : 'One element: full-resolution PNG. Multiple elements: ZIP at the same resolutions.')
    box.appendChild(creationModalHeader({ title, description, onClose: close, icon: 'download' }))

    if (!qr && summary.length > 0) {
      const sum = document.createElement('div')
      sum.className = 'creation-modal__download-summary'
      for (const file of summary.slice(0, 5)) {
        const img = document.createElement('img')
        img.src = file.data
        img.alt = ''
        sum.appendChild(img)
      }
      const span = document.createElement('span')
      span.textContent = summary.length > 1
        ? (fr ? `${summary.length} fichiers · ZIP` : `${summary.length} files · ZIP`)
        : 'PNG'
      sum.appendChild(span)
      box.appendChild(sum)
    }

    if (!qr) {
      const choices = document.createElement('div')
      choices.className = 'dlq__choices creation-modal__choices'

      const deviceBtn = document.createElement('button')
      deviceBtn.type = 'button'
      deviceBtn.className = 'btn btn--white creation-modal__choice'
      deviceBtn.disabled = busy
      const dSpan = document.createElement('span')
      const dStrong = document.createElement('strong')
      dStrong.textContent = fr ? 'Sur cet appareil' : 'On this device'
      const dSmall = document.createElement('small')
      dSmall.textContent = fr ? 'Enregistre les fichiers ici' : 'Save the files here'
      dSpan.appendChild(dStrong); dSpan.appendChild(dSmall)
      deviceBtn.appendChild(dSpan)
      const dB = document.createElement('b'); dB.setAttribute('aria-hidden', 'true'); dB.textContent = '›'
      deviceBtn.appendChild(dB)
      deviceBtn.addEventListener('click', () => { onThisDevice(); close() })
      choices.appendChild(deviceBtn)

      const phoneBtn = document.createElement('button')
      phoneBtn.type = 'button'
      phoneBtn.className = 'btn btn--white creation-modal__choice'
      phoneBtn.disabled = busy
      const pSpan = document.createElement('span')
      const pStrong = document.createElement('strong')
      pStrong.textContent = busy
        ? (fr ? 'Préparation…' : 'Preparing…')
        : (fr ? 'Sur mon téléphone (QR code)' : 'On my phone (QR code)')
      const pSmall = document.createElement('small')
      pSmall.textContent = fr ? 'Scanne un code et télécharge sur ton téléphone' : 'Scan a code and download on your phone'
      pSpan.appendChild(pStrong); pSpan.appendChild(pSmall)
      phoneBtn.appendChild(pSpan)
      const pB = document.createElement('b'); pB.setAttribute('aria-hidden', 'true'); pB.textContent = '›'
      phoneBtn.appendChild(pB)
      // INERT: no network / no QR creation in this local-only module.
      phoneBtn.addEventListener('click', () => {
        error = fr ? 'Indisponible hors ligne.' : 'Unavailable offline.'
        render()
      })
      choices.appendChild(phoneBtn)

      if (error) {
        const p = document.createElement('p')
        p.setAttribute('role', 'alert')
        p.className = 'note'
        p.textContent = error
        choices.appendChild(p)
      }
      box.appendChild(choices)

      const footer = document.createElement('div')
      footer.className = 'creation-modal__footer'
      footer.appendChild(document.createElement('span'))
      const cancel = document.createElement('button')
      cancel.type = 'button'
      cancel.className = 'btn btn--white'
      cancel.textContent = fr ? 'Annuler' : 'Cancel'
      cancel.addEventListener('click', close)
      footer.appendChild(cancel)
      box.appendChild(footer)
    } else {
      const qrWrap = document.createElement('div')
      qrWrap.className = 'dlq__qr'
      const img = document.createElement('img')
      img.src = qr
      img.alt = 'QR code to download on your phone'
      img.width = 200
      img.height = 200
      qrWrap.appendChild(img)
      const pLink = document.createElement('p')
      pLink.className = 'dlq__link'
      const a = document.createElement('a')
      a.href = link
      a.textContent = fr ? 'Ouvrir le lien de téléchargement' : 'Open download link'
      pLink.appendChild(a)
      qrWrap.appendChild(pLink)
      const footer = document.createElement('div')
      footer.className = 'creation-modal__footer'
      const back = document.createElement('button')
      back.type = 'button'
      back.className = 'btn btn--white'
      back.textContent = fr ? 'Retour' : 'Back'
      back.addEventListener('click', () => { qr = null; render() })
      footer.appendChild(back)
      const done = document.createElement('button')
      done.type = 'button'
      done.className = 'btn btn--white'
      done.textContent = 'Done'
      done.addEventListener('click', close)
      footer.appendChild(done)
      qrWrap.appendChild(footer)
      box.appendChild(qrWrap)
    }

    focusable()[0]?.focus()
  }

  render()
  host.appendChild(backdrop)
  return { close }
}

// ---------------------------------------------------------------------------
// enhanceLocalGallery
// ---------------------------------------------------------------------------

/**
 * Enhance an existing empty gallery section in place.
 *
 * @param {HTMLElement} section
 * @param {{
 *   kind: string,
 *   kinds?: string[],
 *   title?: string,
 *   lang?: 'fr'|'en',
 *   pro?: boolean,
 *   pageSize?: number
 * }} opts
 * @returns {{ destroy: () => void }}
 */
export function enhanceLocalGallery(section, opts) {
  const {
    kind,
    kinds,
    title,
    lang = 'en',
    pageSize,
  } = opts || {}
  const fr = lang === 'fr'
  const group = kinds && kinds.length ? kinds.slice() : ['Message','Post-its'].includes(kind) ? ['Post-its','Letter','Messages','Date'] : [kind]

  // --- state ---
  let tab = 'kind' // 'kind' | 'all' | 'saved'
  const selected = new Set()
  let page = 0
  let busy = false
  let error = ''
  let notice = ''
  let chooser = null
  const rows=new Map()

  // --- DOM refs (created once, reused) ---
  const head = section.querySelector('.gallery__head')
  const headingH2 = head?.querySelector('.gallery__heading h2')
  const headingP = head?.querySelector('.gallery__heading p')
  const tabsEl = section.querySelector('.gallery-tabs')
  const panel = section.querySelector('.gallery__panel')
  const noticeEl = section.querySelector('.gallery__notice')
  const pagerEl = section.querySelector('.gallery-pager')
  const ssOpenEl = section.querySelector('.ss-open')
  const albumEl = section.querySelector('button.album')

  if (!head || !tabsEl || !panel) {
    // Section doesn't match expected shape; do nothing.
    return { destroy() {} }
  }

  // Preserve initial empty markup for the panel (byte-visually) — we snapshot
  // the initial innerHTML so we can restore it if needed, but we rebuild the
  // panel contents on each render.
  const initialPanelHTML = panel.innerHTML

  // --- helpers ---
  function kindLabel() {
    if (kind === 'Frames' && title === 'Photo Gallery') return fr ? 'Photo' : 'Photo'
    if (kind === 'Letter' || kind === 'Post-its') return fr ? 'Message' : 'Message'
    return kind
  }

  function headingSub() {
    if (tab === 'all') return fr ? 'Tout' : 'All'
    if (tab === 'saved') return fr ? 'Enregistrés' : 'Saved'
    if (kind === 'Frames' && title === 'Photo Gallery') return fr ? 'Photos' : 'Photos'
    if (kind === 'Message' || kind === 'Post-its') return fr ? 'Message' : 'Message'
    return kind
  }

  function allItems() {
    const items = localGenerated.slice()
    if (tab === 'all') return items
    if (tab === 'saved') return [] // logged-out: no saved rows
    return items.filter((i) => group.includes(i.kind))
  }

  function pagesCount(total) {
    if (!pageSize) return 1
    return Math.max(1, Math.ceil(total / pageSize))
  }

  function currentItems() {
    const all = allItems()
    if (!pageSize) return all
    const pages = pagesCount(all.length)
    const safe = Math.min(page, pages - 1)
    return all.slice(safe * pageSize, (safe + 1) * pageSize)
  }

  function toggle(key) {
    if (selected.has(key)) selected.delete(key)
    else selected.add(key)
    render()
  }

  function chosenItems() {
    const items = currentItems()
    return items.filter((i) => selected.has(`element:${i.id}`))
  }

  // --- render ---
  function render() {
    // Heading
    if (headingH2) headingH2.textContent = fr ? 'Galerie' : 'Gallery'
    if (headingP) headingP.textContent = headingSub()

    // Tabs
    tabsEl.innerHTML = ''
    const tabDefs = [
      { id: 'kind', label: kindLabel() },
      { id: 'all', label: fr ? 'Tout' : 'All' },
      { id: 'saved', label: fr ? 'Enregistrés' : 'Saved' },
    ]
    for (const t of tabDefs) {
      const b = document.createElement('button')
      b.type = 'button'
      b.setAttribute('aria-pressed', tab === t.id ? 'true' : 'false')
      b.textContent = t.label
      b.addEventListener('click', () => {
        if (tab === t.id) return
        tab = t.id
        page = 0
        render()
      })
      tabsEl.appendChild(b)
    }

    // Action bar (only when chosen)
    const existingActions = section.querySelector('.gallery__actions')
    if (existingActions) existingActions.remove()
    const chosen = chosenItems()
    if (tab !== 'saved' && chosen.length > 0) {
      const actions = document.createElement('div')
      actions.className = 'gallery__actions gallery__actions--selected'

      const count = document.createElement('span')
      count.className = 'gallery__selection-count'
      count.setAttribute('data-no-i18n', '')
      count.append(document.createTextNode(String(selected.size)),document.createTextNode(' '),document.createTextNode(fr?`sélectionné${selected.size>1?'s':''}`:'selected'))
      actions.appendChild(count)

      const dl = document.createElement('button')
      dl.className = 'btn btn--white btn--small'
      dl.disabled = busy
      dl.title = fr ? 'Télécharger' : 'Download'
      dl.setAttribute('aria-label', fr ? 'Télécharger' : 'Download')
      dl.appendChild(commandIcon('download'))
      const dlSpan = document.createElement('span')
      dlSpan.textContent = 'Download'
      dl.appendChild(dlSpan)
      dl.addEventListener('click', () => openChooser())
      actions.appendChild(dl)

      const del = document.createElement('button')
      del.className = 'btn btn--danger btn--small'
      del.disabled = busy
      del.title = fr ? 'Supprimer' : 'Delete'
      del.setAttribute('aria-label', fr ? 'Supprimer' : 'Delete')
      del.appendChild(commandIcon('delete'))
      const delSpan = document.createElement('span')
      delSpan.textContent = 'Delete'
      del.appendChild(delSpan)
      del.addEventListener('click', () => {
        for (const key of [...selected]) {
          const id = key.slice('element:'.length)
          const idx = localGenerated.findIndex((e) => e.id === id)
          if (idx >= 0) localGenerated.splice(idx, 1)
        }
        selected.clear()
        notify()
        render()
      })
      actions.appendChild(del)

      // Insert after tabs
      tabsEl.insertAdjacentElement('afterend', actions)
    }

    // Panel
    panel.innerHTML = ''
    if (tab === 'saved') {
      renderSavedPanel()
    } else {
      renderGalleryPanel()
    }

    // Notice (bottom sign-in notice)
    if (noticeEl) {
      noticeEl.textContent = fr
        ? 'Connecte-toi avec Google pour sauvegarder automatiquement les nouveaux éléments générés.'
        : 'Sign in with Google to save new generated elements automatically.'
    }

    // Pager
    if (pagerEl) {
      pagerEl.hidden=tab==='saved'
      if (pageSize && tab !== 'saved') {
        const all = allItems()
        const pages = pagesCount(all.length)
        const safe = Math.min(page, pages - 1)
        pagerEl.innerHTML = ''
        pagerEl.setAttribute('role', 'group')
        pagerEl.setAttribute('aria-label', fr ? 'Pages de la galerie' : 'Gallery pages')

        const prev = document.createElement('button')
        prev.type = 'button'
        prev.setAttribute('aria-label', fr ? 'Page précédente' : 'Previous page')
        prev.disabled = safe === 0
        prev.appendChild(pageArrow('prev', 26))
        prev.addEventListener('click', () => { page = safe - 1; render() })
        pagerEl.appendChild(prev)

        const span = document.createElement('span')
        span.setAttribute('aria-live', 'polite')
        span.textContent = fr
          ? `Page ${safe + 1} sur ${pages} · ${all.length} objet${all.length===1?'':'s'}`
          : `Page ${safe + 1} of ${pages} · ${all.length} objects`
        pagerEl.appendChild(span)

        const next = document.createElement('button')
        next.type = 'button'
        next.setAttribute('aria-label', fr ? 'Page suivante' : 'Next page')
        next.disabled = safe >= pages - 1
        next.appendChild(pageArrow('next', 26))
        next.addEventListener('click', () => { page = safe + 1; render() })
        pagerEl.appendChild(next)
      } else {
        pagerEl.innerHTML = ''
      }
    }

    // Slideshow button (inert)
    if (ssOpenEl) {
      const has = localGenerated.length > 0
      ssOpenEl.disabled = !has || busy
      ssOpenEl.title = !has
        ? (fr ? 'Ajoute d\u2019abord un élément à ta galerie' : 'Add an element to your gallery first')
        : busy ? (fr ? 'Patiente…' : 'Please wait') : ''
      ssOpenEl.textContent = (fr ? 'Créer un diaporama' : 'Create slideshow') + ' '
      const newSpan = document.createElement('span')
      newSpan.className = 'ss-open__new'
      newSpan.setAttribute('aria-hidden', 'true')
      newSpan.textContent = 'NEW'
      ssOpenEl.appendChild(newSpan)
      // INERT: no slideshow in this local-only module.
      ssOpenEl.onclick = e => {e.preventDefault();let dialog;const close=()=>{dialog?.__cleanup?.();dialog?.remove()};dialog=renderSlideshowWorkspace({gallery:localGenerated.filter(it=>it.frame).map(it=>({...it.frame,id:it.id})),lang,onClose:close});section.append(dialog)}
    }

    // Album button (inert)
    if (albumEl) {
      const has = localGenerated.length > 0
      albumEl.classList.toggle('album--on',has);albumEl.disabled = !has || busy
      albumEl.title = !has
        ? (fr ? 'Ajoute d\u2019abord un élément à ta galerie' : 'Add an element to your gallery first')
        : busy ? (fr ? 'Patiente…' : 'Please wait') : ''
      albumEl.textContent = fr ? 'Composer mon carnet' : 'Compose my notebook'
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      arrow.setAttribute('class', 'album__arrow')
      arrow.setAttribute('viewBox', '0 0 24 24')
      arrow.setAttribute('fill', 'none')
      arrow.setAttribute('stroke', 'currentColor')
      arrow.setAttribute('stroke-width', '3.4')
      arrow.setAttribute('stroke-linecap', 'round')
      arrow.setAttribute('stroke-linejoin', 'round')
      arrow.setAttribute('aria-hidden', 'true')
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      p.setAttribute('d', 'M4 12h14M12.5 5.5 19 12l-6.5 6.5')
      arrow.appendChild(p)
      albumEl.appendChild(arrow)
      // INERT: no notebook navigation in this local-only module.
      albumEl.onclick = (e) => { e.preventDefault();const chosen=chosenItems();let dialog;dialog=renderCreateNotebookDialog({lang,items:chosen.length?chosen:[...localGenerated],onClose:()=>{dialog.__cleanup?.();dialog.remove()}});document.body.append(dialog) }
    }

    // Error / notice
    const existingErr = section.querySelector('[data-local-gallery-error]')
    if (existingErr) existingErr.remove()
    if (error) {
      const p = document.createElement('p')
      p.setAttribute('role', 'alert')
      p.setAttribute('data-local-gallery-error', '')
      p.textContent = error
      section.appendChild(p)
    }
    const existingNotice = section.querySelector('[data-local-gallery-notice]')
    if (existingNotice) existingNotice.remove()
    if (notice) {
      const p = document.createElement('p')
      p.className = 'gallery__notice'
      p.setAttribute('role', 'status')
      p.setAttribute('data-local-gallery-notice', '')
      p.textContent = notice
      section.appendChild(p)
    }

    // Translate newly authored markup
    try { if(fr)frenchTree(section) } catch { /* ignore */ }
  }

  function renderSavedPanel() {
    // Logged-out: exact sign-in content, button INERT.
    rows.clear()
    const signin = document.createElement('div')
    signin.className = 'gallery__signin'
    const p1 = document.createElement('p')
    p1.textContent = fr
      ? 'Connecte-toi pour garder tes éléments dans ton compte et les retrouver ici.'
      : 'Sign in to keep your elements in your account and find them here.'
    signin.appendChild(p1)
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'btn btn--dark btn--small'
    btn.textContent = fr ? 'Continuer avec Google' : 'Continue with Google'
    // INERT: no auth in this local-only module.
    btn.addEventListener('click', (e) => { e.preventDefault() })
    signin.appendChild(btn)
    const p2 = document.createElement('p')
    p2.className = 'gnotice'
    p2.textContent = fr
      ? 'Seuls votre nom, votre e-mail et votre photo Google. '
      : 'Only your name, email and Google picture. '
    const link = document.createElement('a')
    link.href = '/privacy'
    link.textContent = fr ? 'Politique de confidentialité' : 'Privacy policy'
    p2.appendChild(link)
    signin.appendChild(p2)
    panel.appendChild(signin)
  }

  function renderGalleryPanel() {
    const items = currentItems()
    if (!items.length) {
      const empty = document.createElement('p')
      empty.className = 'gallery__empty'
      const span = document.createElement('span')
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('class', 'creation-empty-icon')
      svg.setAttribute('viewBox', '0 0 24 24')
      svg.setAttribute('fill', 'none')
      svg.setAttribute('stroke', 'currentColor')
      svg.setAttribute('stroke-width', '1.6')
      svg.setAttribute('aria-hidden', 'true')
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', 'm3 8 9-5 9 5-9 5Z M3 12l9 5 9-5 M3 16l9 5 9-5')
      svg.appendChild(path)
      span.appendChild(svg)
      const strong = document.createElement('strong')
      strong.textContent = fr ? 'Ta galerie est vide' : 'Your gallery is empty'
      span.appendChild(strong)
      const sub = document.createElement('span')
      sub.textContent = fr
        ? 'Crée un élément dans les réglages, puis clique sur « Ajouter à la galerie ».'
        : 'Create an element on the left, then add it to your gallery.'
      span.appendChild(sub)
      empty.appendChild(span)
      panel.appendChild(empty)
      return
    }

    const ul = document.createElement('ul')
    ul.className = 'gallery__grid'
    ul.setAttribute('key', String(allItems().length))

    for (const item of items) {
      const key = `element:${item.id}`
      const isSelected = selected.has(key)
      if(rows.has(key)){const li=rows.get(key);const audioSelect=li.querySelector('.gallery-audio__select');if(audioSelect){audioSelect.setAttribute('aria-pressed',String(isSelected));audioSelect.textContent=isSelected?'Selected':'Select'}const btn=li.querySelector('.element-thumb');if(btn){btn.classList.toggle('thumb--on',isSelected);btn.setAttribute('aria-pressed',String(isSelected))}ul.append(li);continue}
      const li = document.createElement('li')
      rows.set(key,li)
      li.className = 'thumbwrap'

      if (item.kind === 'Audio') {
        li.appendChild(audioGalleryItem(item, isSelected, () => toggle(key)))
      } else {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = `thumb element-thumb${isSelected ? ' thumb--on' : ''}`
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false')
        btn.setAttribute('aria-label', `Select ${item.text || item.kind}`)
        btn.addEventListener('click', () => toggle(key))
        if(item.frame){const scale=item.frame.format==='polaroid'?2.84/4.48:2.43/4.47;btn.append(renderFrameCard({frame:item.frame,scale}))}else{const img=document.createElement('img');img.src=item.src||'';img.alt=item.text||item.kind;btn.append(img)}
        li.appendChild(btn)
      }

      const meta = document.createElement('span')
      meta.className = 'thumbwrap__meta'
      meta.appendChild(savedBadge({
        saved: false,
        message: fr
          ? 'Connecte-toi pour enregistrer dans ton compte.'
          : 'Sign in to save to your account.',
      }))
      const caption = (item.kind==='Letter'?'':item.text || item.frame?.photo?.name?.replace(/\.[^.]*$/,'') || '').trim()
      const small = document.createElement('small')
      small.className = 'gallery-kind'
      if (caption) small.setAttribute('data-no-i18n', '')
      small.textContent = caption || item.kind
      meta.appendChild(small)
      li.appendChild(meta)

      ul.appendChild(li)
    }
    panel.appendChild(ul)
  }

  // --- download ---
  function openChooser() {
    if (chooser) return
    const chosen = chosenItems()
    if (!chosen.length) return
    chooser = openLocalDownloadChooser({
      lang,host:section,
      files: async () => chosen.map((i) => ({
        name: elementFilename(i.kind, i.text || ''),
        data: i.src || '',
      })),
      onThisDevice: () => { void doDownload(chosen) },
      onClose: () => { chooser = null },
    })
  }

  async function doDownload(chosen) {
    busy = true
    error = ''
    render()
    try {
      const files = chosen.map((i) => ({
        name: elementFilename(i.kind, i.text || ''),
        data: i.src || '',
      }))
      if (files.length === 1) {
        downloadDataURL(files[0].data, files[0].name)
      } else {
        const zipFiles = files.map((f) => ({
          name: f.name,
          bytes: dataURLToBytes(f.data),
        }))
        const zipBytes = buildZip(zipFiles)
        const zipURL = bytesToDataURL(zipBytes)
        const zipName = elementFilename('elements').replace(/\.png$/, '.zip')
        downloadDataURL(zipURL, zipName)
      }
    } catch {
      error = fr ? 'Téléchargement impossible. Réessaie.' : 'Could not download. Try again.'
    } finally {
      busy = false
      render()
    }
  }

  // --- subscription ---
  let unsubscribe = null
  let observer = null
  let attached = false

  function attach() {
    if (attached) return
    attached = true
    unsubscribe = subscribe(() => { render() })
    render()
  }

  function detach() {
    if (!attached) return
    attached = false
    if (unsubscribe) { unsubscribe(); unsubscribe = null }
  }

  // Handle detached-then-removed: only unsubscribe when the section is
  // connected and then removed. If it's already detached at setup, wait for
  // first attach.
  if (section.isConnected) {
    attach()
  } else {
    // Wait for first attach via observer.
    observer = new MutationObserver(() => {
      if (section.isConnected) {
        attach()
        if (observer) { observer.disconnect(); observer = null }
      }
    })
    observer.observe(document.documentElement, { childList: true, subtree: true })
  }

  // Watch for removal from DOM to clean up.
  const removalObserver = new MutationObserver(() => {
    if (attached && !section.isConnected) {
      detach();removalObserver.disconnect()
      if(chooser){chooser.close();chooser=null}
    }
  })
  removalObserver.observe(document.documentElement, { childList: true, subtree: true })

  // Initial render (even if not yet attached, so markup is ready).
  render()

  return {
    destroy() {
      detach()
      if (observer) { observer.disconnect(); observer = null }
      removalObserver.disconnect()
      if (chooser) { chooser.close(); chooser = null }
      // Restore initial empty panel markup.
      panel.innerHTML = initialPanelHTML
    },
  }
}