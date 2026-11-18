import {renderLocalVideoEditor} from "./video-local-deepseek.mjs";
import {renderStripFrame} from './strip-frame-deepseek.mjs';
import {renderLocalPhotoWorkspace} from './photo-workspace-deepseek.mjs';
import {enhanceLocalGallery} from './local-gallery-deepseek.mjs';
import {renderProMessageEditor} from './pro-message-editors-deepseek.mjs';
import {renderCombinationStudio} from './combination-studio-deepseek.mjs';
import {renderMediaEditor} from './media-editor-deepseek.mjs';
import {renderElementEditor} from './element-editor-deepseek.mjs';
import {renderGeneratorWelcome} from './generator-welcome.mjs';
import { renderSidebar, WorkspaceNav, SideFoot } from './shop-pages-deepseek.mjs'

const FRAME_SPECS = {
  'instax-mini': {
    label: 'Instax Mini',
    card: { w: 4.47, h: 7.12 },
    photo: { x: 0.33, y: 0.41, w: 3.81, h: 5.13 },
    thumbW: 2.43,
  },
  polaroid: {
    label: 'Polaroid',
    card: { w: 4.48, h: 4.43 },
    photo: { x: 0.2, y: 0.19, w: 4.08, h: 3.37 },
    thumbW: 2.84,
  },
}
const FRAME_FORMATS = ['instax-mini', 'polaroid']
const MIN_CAPTION_SIZE = 12
const MAX_CAPTION_SIZE = 40
const DEFAULT_CAPTION_SIZE = 24
const CAPTION_REFERENCE_WIDTH = 340
const MIN_ZOOM = 1
const MAX_ZOOM = 4

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const clampZoom = (z) => clamp(Number.isFinite(z) ? z : 1, MIN_ZOOM, MAX_ZOOM)
const clampCaptionSize = (s) =>
  clamp(Number.isFinite(s) ? Math.round(s) : DEFAULT_CAPTION_SIZE, MIN_CAPTION_SIZE, MAX_CAPTION_SIZE)
const captionFontPx = (size, cardWidth) => (clampCaptionSize(size) * cardWidth) / CAPTION_REFERENCE_WIDTH

export const TEXT_FONTS = {
  serif: { label: 'Serif', family: 'Georgia, serif' },
  sans: { label: 'Sans serif', family: 'Arial, sans-serif' },
  handwritten: { label: 'Handwritten', family: 'cursive' },
  mono: { label: 'Monospace', family: 'monospace' },
  kalam: { label: 'Kalam (handwriting)', family: "'Kalam', cursive" },
  dmsans: { label: 'DM Sans', family: "'DM Sans', Arial, sans-serif" },
  geist: { label: 'Geist', family: "'Geist', Arial, sans-serif" },
  poppins: { label: 'Poppins', family: "'Poppins', Arial, sans-serif" },
  pixel: { label: 'Pixel', family: "'Silkscreen', monospace" },
}
const FR_FONT_LABEL = {
  Serif: 'Serif',
  'Sans serif': 'Sans serif',
  Handwritten: 'Manuscrite',
  Monospace: 'Chasse fixe',
  'Kalam (handwriting)': 'Kalam (manuscrite)',
}
const textFamily = (key, fallback) => (key && TEXT_FONTS[key] ? TEXT_FONTS[key].family : fallback)

const CREATOR_TYPES = ['Photo', 'Message', 'Audio', 'Music', 'Stamps', 'Stickers', 'Video', 'Combination']

function svgEl(tag, attrs, children) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag)
  if (attrs) for (const k in attrs) {
    if (k === 'style' && typeof attrs[k] === 'object') {
      for (const s in attrs[k]) el.style[s] = attrs[k][s]
    } else el.setAttribute(k, attrs[k])
  }
  if (children) for (const c of children) el.appendChild(c)
  return el
}

export function ImageIcon({ scale, color, className }) {
  const weight = 0.72
  const strokeWidth = weight / 28.3465 / scale
  const svg = svgEl('svg', {
    'aria-hidden': 'true',
    class: className || '',
    viewBox: '-0.5 -0.5 1 1',
    style: { width: `calc(var(--u) * ${scale})`, height: `calc(var(--u) * ${scale})`, flex: 'none' },
  })
  const g = svgEl('g', {
    transform: 'scale(1,-1)',
    fill: 'none',
    stroke: color,
    'stroke-width': String(strokeWidth),
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })
  g.appendChild(svgEl('rect', { x: '-0.34', y: '-0.29', width: '0.68', height: '0.58' }))
  g.appendChild(svgEl('polyline', { points: '-0.27,-0.20 -0.03,0.05 0.09,-0.06 0.28,0.14' }))
  g.appendChild(svgEl('circle', { cx: '-0.16', cy: '0.15', r: '0.06' }))
  svg.appendChild(g)
  return svg
}

export function PreviewExpandIcon() {
  const svg = svgEl('svg', {
    class: 'creation-expand-icon',
    viewBox: '0 0 24 24',
    width: '18',
    height: '18',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.5',
    'aria-hidden': 'true',
  })
  svg.appendChild(svgEl('path', { d: 'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5' }))
  return svg
}

function CommandIcon({ name }) {
  const svg = svgEl('svg', {
    class: 'command-icon',
    viewBox: '0 0 24 24',
    width: '14',
    height: '14',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.8',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
    focusable: 'false',
  })
  if (name === 'download') {
    svg.appendChild(svgEl('path', { d: 'M12 3v12m-5-5 5 5 5-5' }))
    svg.appendChild(svgEl('path', { d: 'M4 15v5h16v-5' }))
  } else if (name === 'save') {
    svg.appendChild(svgEl('path', { d: 'M4 3h13l4 4v14H3V3Z M7 3v6h10V3 M7 21v-8h10v8' }))
  } else {
    svg.appendChild(svgEl('path', { d: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7' }))
  }
  return svg
}

function el(tag, attrs, children) {
  const node = document.createElement(tag)
  if (attrs) for (const k in attrs) {
    const v = attrs[k]
    if (v === undefined || v === null || v === false) continue
    if (k === 'class') node.className = v
    else if (k === 'style' && typeof v === 'object') {
      for (const s in v) node.style[s] = v[s]
    } else if (k === 'text') node.textContent = v
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'dataset' && typeof v === 'object') {
      for (const d in v) node.dataset[d] = v[d]
    } else node.setAttribute(k, v === true ? '' : v)
  }
  if (children) {
    for (const c of children) {
      if (c === null || c === undefined || c === false) continue
      if (typeof c === 'string' || typeof c === 'number') node.appendChild(document.createTextNode(String(c)))
      else node.appendChild(c)
    }
  }
  return node
}

function renderCreatorHeader({ active, onSelect,onNavigate }) {
  const tabs = CREATOR_TYPES.map((type) => {
    const label = type === 'Stamps' ? 'Stamp' : type === 'Stickers' ? 'Sticker' : type
    const children = [label]
    if (type === 'Combination' || type === 'Video') children.push(el('small', null, ['PRO']))
    return el(
      'button',
      {
        'aria-pressed': active === type ? 'true' : 'false',
        onclick: () => onSelect(type),
      },
      children
    )
  })
  return el('header', { class: 'creator-header' }, [
    el('div', { class: 'creator-header__top' }, [
      el('div', null, [
        el('h1', null, ['Create your elements']),
        el('p', null, ['Generate a variety of elements to add to your notebook in the editor.']),
      ]),
      el('details', { class: 'creator-header__menu' }, [
        el('summary', null, ['Menu']),
        el('div', null, [
          WorkspaceNav('generator',null,onNavigate),SideFoot(onNavigate),
        ]),
      ]),
    ]),
    el('nav', { class: 'creator-header__tabs', 'aria-label': 'Element types' }, tabs),
  ])
}

export function renderFrameCard({ frame, interactive, onCaption, onPan, onZoom, onPickFile, onDropFile, captionDescriptionId, lang='en', captionPlaceholder='Caption', scale=1,stripTarget=0,onStripPan,onStripZoom,onStripPickFile,onStripDropFile }) {
  if(frame.stripPhotos?.length>=2||interactive&&stripTarget>=2)return renderStripFrame({frame,interactive,onCaption,scale,stripTarget,onStripPan,onStripZoom,onStripPickFile,onStripDropFile,captionPlaceholder,captionDescriptionId,lang});
  const spec = FRAME_SPECS[frame.format]
  const unit = (v) => `calc(var(--u) * ${v})`
  const empty = !frame.photo
  const windowRef = { current: null }
  const pointers = new Map()
  let gesture = null

  const captionBox = {
    top: unit((spec.photo.y + spec.photo.h) * scale),
    height: unit((spec.card.h - spec.photo.y - spec.photo.h) * scale),
  }
  const fontSize = (min) =>
    `max(${min}px, calc(var(--u) * ${spec.card.w * scale} * ${captionFontPx(frame.captionSize, 1)}))`

  const photoChildren = []
  if (frame.photo) {
    const ratio=Math.max(spec.photo.w/frame.photo.width,spec.photo.h/frame.photo.height)*frame.zoom, dw=frame.photo.width*ratio,dh=frame.photo.height*ratio;
    const img = el('img', {
      src: frame.photo.src,
      alt: '',
      draggable: 'false',
      style: {
        left: `${-(dw-spec.photo.w)*frame.pan.x/spec.photo.w*100}%`,
        top: `${-(dh-spec.photo.h)*frame.pan.y/spec.photo.h*100}%`,
        width: `${dw/spec.photo.w*100}%`,
        height: `${dh/spec.photo.h*100}%`,
      },
    })
    photoChildren.push(img)
  } else {
    photoChildren.push(ImageIcon({ scale: (frame.format === 'polaroid' ? 1.15 : 1.22) * scale, color: '#747C8C' }))
    photoChildren.push(el('p', null, lang==='fr'?['Glisse une photo ici']:['Drag & drop or click to',el('br'),'upload']))
  }

  const photoEl = el(
    'div',
    {
      class: `frame__photo${empty ? ' frame__photo--empty' : ''}${interactive && !empty ? ' frame__photo--drag' : ''}`,
      style: {
        left: unit(spec.photo.x * scale),
        top: unit(spec.photo.y * scale),
        width: unit(spec.photo.w * scale),
        height: unit(spec.photo.h * scale),
        borderRadius: unit(scale * 0.08),
      },
      role: interactive && empty ? 'button' : undefined,
      tabindex: interactive && empty ? '0' : undefined,
      'aria-label': interactive && empty ? 'Drag & drop or click to upload' : undefined,
    },
    photoChildren
  )
  windowRef.current = photoEl

  if (interactive && empty) {
    photoEl.addEventListener('click', () => onPickFile && onPickFile())
    photoEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onPickFile && onPickFile()
      }
    })
  }
  if (interactive) {
    photoEl.addEventListener('dragover', (e) => e.preventDefault())
    photoEl.addEventListener('drop', (e) => {
      e.preventDefault()
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]
      if (f && onDropFile) onDropFile(f)
    })
    photoEl.addEventListener('pointerdown', (e) => {
      if (!frame.photo) return
      photoEl.setPointerCapture(e.pointerId)
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      gesture = { pan: frame.pan, x: e.clientX, y: e.clientY, distance: 0, zoom: frame.zoom }
    })
    photoEl.addEventListener('pointermove', (e) => {
      if (!frame.photo || !gesture || !pointers.has(e.pointerId)) return
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      const box = photoEl.getBoundingClientRect()
      if (!box.width) return
      const pxPerUnit = box.width / spec.photo.w
      const ratio=Math.max(spec.photo.w/frame.photo.width,spec.photo.h/frame.photo.height)*frame.zoom,dw=frame.photo.width*ratio,dh=frame.photo.height*ratio;const start={x:-(dw-spec.photo.w)*gesture.pan.x,y:-(dh-spec.photo.h)*gesture.pan.y}
      const moved = {
        x: start.x + (e.clientX - gesture.x) / pxPerUnit,
        y: start.y + (e.clientY - gesture.y) / pxPerUnit,
      }
      const pan={x:dw>spec.photo.w?Math.max(0,Math.min(1,-moved.x/(dw-spec.photo.w))):.5,y:dh>spec.photo.h?Math.max(0,Math.min(1,-moved.y/(dh-spec.photo.h))):.5};frame.pan=pan;const img=photoEl.querySelector('img');if(img){img.style.left=(-(dw-spec.photo.w)*pan.x/spec.photo.w*100)+'%';img.style.top=(-(dh-spec.photo.h)*pan.y/spec.photo.h*100)+'%'}if(onPan)onPan(pan)
    })
    photoEl.addEventListener('pointerup', (e) => {
      pointers.delete(e.pointerId)
      gesture = null
    })
    photoEl.addEventListener('pointercancel', (e) => {
      pointers.delete(e.pointerId)
      gesture = null
    })
    photoEl.addEventListener('wheel', (e) => {
      if (frame.photo && onZoom) onZoom(clampZoom(frame.zoom * (e.deltaY < 0 ? 1.06 : 1 / 1.06)))
    })
  }

  const captionEl = interactive
    ? el('input', {
        class: 'frame__caption',
        'aria-label': 'Caption',
        'aria-describedby': captionDescriptionId,
        placeholder: captionPlaceholder,
        maxlength: '40',
        value: frame.caption,
        style: {
          ...captionBox,
          fontSize: fontSize(9),
          ...(frame.captionFont ? { fontFamily: textFamily(frame.captionFont, 'inherit') } : {}),
        },
        oninput: (e) => onCaption && onCaption(e.target.value),
      })
    : el(
        'span',
        {
          class: 'frame__caption',
          style: {
            ...captionBox,
            fontSize: fontSize(8),
            ...(frame.captionFont ? { fontFamily: textFamily(frame.captionFont, 'inherit') } : {}),
          },
        },
        [frame.caption]
      )

  const card = el(
    'div',
    {
      class: `frame frame--${frame.format}`,
      style: {
        width: unit(spec.card.w * scale),
        height: unit(spec.card.h * scale),
        borderRadius: unit(scale * 0.15),
      },
      'data-testid': 'frame',
    },
    [photoEl, captionEl]
  )
  card.addEventListener('pointermove', (e) => {
    const box = card.getBoundingClientRect()
    if (box.width) {
      card.style.setProperty('--gx', `${((e.clientX - box.left) / box.width) * 100}%`)
      card.style.setProperty('--gy', `${((e.clientY - box.top) / box.height) * 100}%`)
    }
  })
  return card
}

export function renderScrollMenu({ label, value, shown, options, onPick, up }) {
  const id = `tsm-${Math.random().toString(36).slice(2, 9)}`
  let open = false
  let detachObserver
  const away = (event) => { if (!box.contains(event.target)) close() }
  const box = el('div', { class: 'text-style__field', 'data-no-i18n': '' })
  const labelEl = el('span', { id }, [label])
  const button = el(
    'button',
    {
      type: 'button',
      class: 'text-style__button',
      'aria-haspopup': 'listbox',
      'aria-expanded': 'false',
      'aria-labelledby': id,
    },
    [el('span', null, [shown]), el('span', { 'aria-hidden': 'true' }, ['▾'])]
  )
  const list = el('ul', {
    class: `text-style__list${up ? ' text-style__list--up' : ''}`,
    role: 'listbox',
    'aria-labelledby': id,
  })
  for (const o of options) {
    const optBtn = el(
      'button',
      {
        type: 'button',
        role: 'option',
        'aria-selected': o.value === value ? 'true' : 'false',
        class: 'text-style__option',
        style: o.style || {},
        onclick: () => {
          onPick(o.value)
          close()
        },
      },
      [o.label]
    )
    list.appendChild(el('li', { role: 'presentation' }, [optBtn]))
  }
  function close() {
    document.removeEventListener('pointerdown', away)
    detachObserver?.disconnect()
    open = false
    button.setAttribute('aria-expanded', 'false')
    if (list.parentNode) list.parentNode.removeChild(list)
  }
  function openMenu() {
    open = true
    button.setAttribute('aria-expanded', 'true')
    box.appendChild(list)
    document.addEventListener('pointerdown', away)
    list.querySelector('[aria-selected=true]')?.scrollIntoView({ block: 'nearest' })
    detachObserver = new MutationObserver(() => { if (!box.isConnected) close() })
    detachObserver.observe(document.body, {childList: true, subtree: true})
  }
  button.addEventListener('click', () => {
    if (open) close()
    else openMenu()
  })
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation()
      close()
    }
  })
  box.appendChild(labelEl)
  box.appendChild(button)
  return box
}

export function renderTextStyleMenus({ font, size, defaultFontLabel, minSize = 14, maxSize = 36, onFont, onSize, up, lang }) {
  const fr = lang === 'fr'
  const fontOptions = Object.entries(TEXT_FONTS).map(([key, f]) => ({
    value: key,
    label: fr ? FR_FONT_LABEL[f.label] || f.label : f.label,
    style: { fontFamily: f.family },
  }))
  const shownFont =
    font && font in TEXT_FONTS
      ? fr
        ? FR_FONT_LABEL[TEXT_FONTS[font].label] || TEXT_FONTS[font].label
        : TEXT_FONTS[font].label
      : defaultFontLabel
      ? fr
        ? defaultFontLabel.replace('(original)', '(d’origine)')
        : defaultFontLabel
      : fr
      ? 'Police d’origine'
      : 'Original font'
  const cur = Math.round(size)
  const choices = [12,14,16,18,20,22,24,26,28,30,32,36,40,42,48,56,64,72].filter(n => n >= minSize && n <= maxSize)
  if (Number.isFinite(cur) && !choices.includes(cur)) choices.push(cur)
  const sizeOptions = choices.sort((a,b) => a-b).map(n => ({value:n,label:`${n} px`}))
  return el('div', { class: 'text-style' }, [
    renderScrollMenu({
      label: fr ? 'Police' : 'Font',
      value: font || '',
      shown: shownFont,
      options: fontOptions,
      onPick: (v) => onFont(v),
      up,
    }),
    renderScrollMenu({
      label: fr ? 'Taille' : 'Size',
      value: size,
      shown: `${Math.round(size)} px`,
      options: sizeOptions,
      onPick: onSize,
      up,
    }),
  ])
}

function renderPhotoFilterStrip({ photo, busy, onChange, lang }) {
  if (!photo) return null
  const fr = lang === 'fr'
  const PHOTO_FILTERS = [
    { id: 'original', en: 'Original', fr: 'Original' },
    { id: 'warm', en: 'Warm', fr: 'Chaud' },
    { id: 'cool', en: 'Cool', fr: 'Froid' },
    { id: 'mono', en: 'Mono', fr: 'Mono' },
    { id: 'vivid', en: 'Vivid', fr: 'Vif' },
  ]
  const source = photo.originalSrc || photo.src
  const strip = el('div', { class: 'photo-filters__strip', tabindex: '0' })
  for (const preset of PHOTO_FILTERS) {
    const btn = el(
      'button',
      {
        type: 'button',
        disabled: busy ? '' : undefined,
        'aria-pressed': (photo.filter || 'original') === preset.id ? 'true' : 'false',
        onclick: () => onChange(preset.id),
      },
      [
        el('span', { class: 'photo-filters__thumb' }, [
          source
            ? el('img', { src: source, alt: '', draggable: 'false' })
            : el('span', { 'aria-hidden': 'true', class: 'photo-filters__placeholder' }),
        ]),
        el('span', null, [fr ? preset.fr : preset.en]),
      ]
    )
    strip.appendChild(btn)
  }
  return el('div', { 'data-no-i18n': '', class: 'photo-filters', role: 'group', 'aria-label': fr ? 'Filtres photo' : 'Photo filters' }, [
    el('div', { class: 'photo-filters__head' }, [
      el('span', null, [fr ? 'Filtres' : 'Filters']),
      el('small', null, [fr ? 'Faites défiler' : 'Scroll to browse']),
    ]),
    strip,
  ])
}

export function renderGeneratedGallery({ kind, title, lang,pro=false,pageSize }) {
  const fr = lang === 'fr'
  const galleryRef = { current: null }
  const section = el('section', {
    class: 'card card--gallery',
    'aria-label': 'Generated elements gallery',
    'data-tour': 'save',
  })
  galleryRef.current = section

  const heading = el('div', { class: 'gallery__head' }, [
    el('div', { class: 'gallery__heading' }, [
      el('h2', null, ['Gallery']),
      el('p', null, [kind === 'Frames' && title === 'Photo Gallery' ? 'Photos' : kind]),
    ]),
  ])
  section.appendChild(heading)

  const tabs = el('div', { class: 'gallery-tabs', role: 'group', 'aria-label': 'Gallery filter' }, [
    el('button', { 'aria-pressed': 'true', onclick: () => {} }, [kind === 'Frames' && title === 'Photo Gallery' ? 'Photo' : kind]),
    el('button', { 'aria-pressed': 'false', onclick: () => {} }, ['All']),
    el('button', { 'aria-pressed': 'false', onclick: () => {} }, ['Saved']),
  ])
  section.appendChild(tabs)

  const panel = el('div', { class: 'gallery__panel' }, [
    el('p', { class: 'gallery__empty' }, [
      el('span', null, [
        (() => {
          const svg = svgEl('svg', {
            class: 'creation-empty-icon',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '1.6',
            'aria-hidden': 'true',
          })
          svg.appendChild(svgEl('path', { d: 'm3 8 9-5 9 5-9 5Z M3 12l9 5 9-5 M3 16l9 5 9-5' }))
          return svg
        })(),
        el('strong', null, ['Your gallery is empty']),
        el('span', null, ['Create an element on the left, then add it to your gallery.']),
      ]),
    ]),
  ])
  section.appendChild(panel)

  section.appendChild(
    el('p', { class: 'gallery__notice' }, ['Sign in with Google to save new generated elements automatically.'])
  )

  if(pageSize){const pager=el('div',{class:'gallery-pager',role:'group','aria-label':'Gallery pages'});for(const dir of ['prev','next']){const b=el('button',{type:'button','aria-label':dir==='prev'?'Previous page':'Next page',disabled:''});const icon=svgEl('svg',{viewBox:'0 0 24 24',width:'26',height:'26',fill:'none',stroke:'currentColor','stroke-width':'3.4','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true'});Object.assign(icon.style,{display:'block',margin:'auto',flexShrink:'0'});icon.append(svgEl('path',{d:dir==='next'?'M4 12h14M12.5 5.5 19 12l-6.5 6.5':'M20 12H6M11.5 5.5 5 12l6.5 6.5'}));b.append(icon);if(dir==='next')pager.append(el('span',{'aria-live':'polite'},[fr?'Page 1 sur 1 · 0 objets':'Page 1 of 1 · 0 objects']));pager.append(b)}section.append(pager)}
  const slideshowBtn = el(
    'button',
    {
      type: 'button',
      class: 'ss-open',
      disabled: '',
      title: fr ? 'Ajoute d\u2019abord un élément à ta galerie' : 'Add an element to your gallery first',
      onclick: () => {},
    },
    [fr ? 'Créer un diaporama' : 'Create slideshow', ' ', el('span', { class: 'ss-open__new', 'aria-hidden': 'true' }, ['NEW'])]
  )
  if(!pro)section.appendChild(slideshowBtn)

  const albumBtn = el(
    'button',
    {
      class: 'album',
      disabled: '',
      title: 'Add an element to your gallery first',
      onclick: () => {},
    },
    [
      'Compose my notebook',
      (() => {
        const svg = svgEl('svg', {
          class: 'album__arrow',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '3.4',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'aria-hidden': 'true',
        })
        svg.appendChild(svgEl('path', { d: 'M4 12h14M12.5 5.5 19 12l-6.5 6.5' }))
        return svg
      })(),
    ]
  )
  section.appendChild(albumBtn)

  enhanceLocalGallery(section,{kind,title,lang,pro,pageSize})
  return section
}

export function renderCreationWorkspace({ settings, preview, gallery, lang }) {
  const fr = lang === 'fr'
  const root = el('div', { class: 'creation-workspace' })
  const status = el('span', { class: 'creation-panel__status', role: 'status' })
  root.appendChild(status)

  const defaults = matchMedia('(max-width:1023px)').matches ? ['preview','settings','gallery'] : ['settings','preview','gallery']
  let layout={order:defaults,anchored:[]}
  try {const saved=JSON.parse(localStorage.getItem('if_panels_v1')||'null');if(saved?.order?.length===3&&new Set(saved.order).size===3&&saved.order.every(p=>defaults.includes(p))&&Array.isArray(saved.anchored)) layout={order:saved.order,anchored:saved.anchored.filter(p=>defaults.includes(p))}} catch {}
  const names={settings:fr?'Réglages':'Settings',preview:fr?'Aperçu':'Preview',gallery:fr?'Galerie':'Gallery'}
  const panels=new Map()
  function updateLayout(){
    try {localStorage.setItem('if_panels_v1',JSON.stringify(layout))}catch{}
    for(const [id,content] of panels){
      const index=layout.order.indexOf(id),anchored=layout.anchored.includes(id),buttons=content.firstElementChild.querySelectorAll('button')
      content.dataset.panelPosition=String(index+1)
      content.style.setProperty('--panel-order',String(index+1));content.style.setProperty('--panel-mobile-order',String(index+1))
      buttons[0].disabled=anchored
      buttons[1].disabled=anchored||index===0||layout.anchored.includes(layout.order[index-1])
      buttons[2].disabled=anchored||index===2||layout.anchored.includes(layout.order[index+1])
      const pin=buttons[3];pin.setAttribute('aria-pressed',String(anchored));pin.setAttribute('aria-label',`${anchored?(fr?'Désépingler':'Unpin'):(fr?'Épingler':'Pin')} ${names[id]}`);pin.title=anchored?(fr?'Désépingler':'Unpin'):(fr?'Épingler ici':'Pin here');pin.querySelector('svg').setAttribute('fill',anchored?'currentColor':'none')
    }
  }
  function move(id,target){
    if(!target||target===id||layout.anchored.includes(id)||layout.anchored.includes(target))return
    const order=[...layout.order],a=order.indexOf(id),b=order.indexOf(target);[order[a],order[b]]=[order[b],order[a]];layout.order=order
    const gallery=panels.get('gallery');gallery?.classList.remove('creation-gallery--open');gallery?.querySelectorAll('[aria-expanded]').forEach(e=>e.setAttribute('aria-expanded','false'));const plus=gallery?.querySelector('.creation-gallery__toggle span');if(plus)plus.textContent='+'
    status.textContent=`${names[id]} : position ${b+1}`;updateLayout()
  }
  function panel(content,id){
    const controls=el('div',{class:'creation-panel__controls'})
    const grip=el('button',{type:'button',class:'creation-panel__grip','aria-label':`${fr?'Déplacer':'Move'} ${names[id]}`,title:fr?'Glisse vers un autre panneau':'Drag to another panel'})
    const dots=svgEl('svg',{width:'12',height:'18',viewBox:'0 0 12 18',fill:'currentColor','aria-hidden':'true'})
    for(const y of [3,9,15])for(const x of [3,9])dots.appendChild(svgEl('circle',{cx:String(x),cy:String(y),r:'1.3'}));grip.append(dots)
    let drag=null,destination=null
    const clearDrag=()=>{drag=null;destination=null;for(const p of panels.values())p.classList.remove('is-dragging','is-drop-target')}
    grip.addEventListener('pointerdown',e=>{if(layout.anchored.includes(id))return;grip.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY,moved:false}})
    grip.addEventListener('pointermove',e=>{if(!drag||(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<6))return;drag.moved=true;content.classList.add('is-dragging');const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-creation-panel]')?.dataset.creationPanel;destination=target&&!layout.anchored.includes(target)?target:null;for(const [pid,p]of panels)p.classList.toggle('is-drop-target',pid===destination&&pid!==id)})
    grip.addEventListener('pointerup',e=>{if(drag?.moved&&destination)move(id,destination);clearDrag();if(grip.hasPointerCapture(e.pointerId))grip.releasePointerCapture(e.pointerId)})
    grip.addEventListener('pointercancel',clearDrag)
    grip.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();move(id,layout.order[layout.order.indexOf(id)+(e.key==='ArrowLeft'?-1:1)])}})
    controls.append(grip,el('button',{type:'button','aria-label':`${fr?'Déplacer à gauche':'Move left'} : ${names[id]}`,onclick:()=>move(id,layout.order[layout.order.indexOf(id)-1])},['‹']),el('button',{type:'button','aria-label':`${fr?'Déplacer à droite':'Move right'} : ${names[id]}`,onclick:()=>move(id,layout.order[layout.order.indexOf(id)+1])},['›']))
    const pin=el('button',{type:'button',onclick:()=>{layout.anchored=layout.anchored.includes(id)?layout.anchored.filter(p=>p!==id):[...layout.anchored,id];updateLayout()}})
    const pinSvg=svgEl('svg',{width:'14',height:'14',viewBox:'0 0 20 20',fill:'none',stroke:'currentColor','stroke-width':'1.5','aria-hidden':'true'});pinSvg.append(svgEl('path',{d:'M7 2h6l-1 6 3 3v2H5v-2l3-3zM10 13v5'}));pin.append(pinSvg);controls.append(pin)
    content.dataset.creationPanel=id;content.classList.add('creation-panel');content.prepend(controls);panels.set(id,content);updateLayout();return content
  }

  root.appendChild(panel(settings, 'settings', 0))
  root.appendChild(panel(preview, 'preview', 1))

  const galleryWrap = el('div', { class: 'creation-gallery' })
  const toggle = el(
    'button',
    {
      class: 'creation-gallery__toggle',
      'aria-expanded': 'false',
      onclick: () => {
        const open = galleryWrap.classList.toggle('creation-gallery--open')
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
        toggle.querySelector('span').textContent = open ? '−' : '+'
      },
    },
    [fr ? 'Galerie' : 'Gallery', ' ', el('span', null, ['+'])]
  )
  galleryWrap.appendChild(toggle)
  const expandBtn = el(
    'button',
    {
      type: 'button',
      class: 'creation-gallery__expand',
      'aria-label': fr ? 'Agrandir la galerie' : 'Expand gallery',
      'aria-expanded': 'false',
      onclick: () => {
        const open = galleryWrap.classList.toggle('creation-gallery--open')
        expandBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
        toggle.querySelector('span').textContent = open ? '−' : '+'
      },
    },
    [PreviewExpandIcon()]
  )
  galleryWrap.appendChild(expandBtn)
  galleryWrap.appendChild(gallery)
  root.appendChild(panel(galleryWrap, 'gallery', 2))

  if(matchMedia('(max-width:1023px)').matches){
    const keepOnly=d=>d.closest('.creation-settings__body')?.querySelectorAll('details[open]').forEach(other=>{if(other!==d)other.open=false});
    root.querySelectorAll('.creation-settings__body').forEach(body=>{const first=body.querySelector('details[open]');if(first)keepOnly(first)});
    root.addEventListener('toggle',e=>{if(e.target.tagName==='DETAILS'&&e.target.open)keepOnly(e.target)},true);
  }
  const stages=[...root.querySelectorAll('.creation-element-stage,.creation-preview__stage--message')];
  const fit=()=>stages.forEach(stage=>{const css=getComputedStyle(stage),w=stage.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight),h=stage.clientHeight-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom);stage.querySelectorAll('.element-preview > img,.element-artwork > img,.creation-note > img').forEach(img=>{if(!img.naturalWidth||!img.naturalHeight)return;const cap=parseFloat(getComputedStyle(img).getPropertyValue('--fit-max-w'));const bound=cap>0?Math.min(w,cap):w,scale=Math.min(bound/img.naturalWidth,h/img.naturalHeight);img.style.setProperty('width',`${img.naturalWidth*scale}px`,'important');img.style.setProperty('height',`${img.naturalHeight*scale}px`,'important');img.style.setProperty('max-height','none','important');const art=img.closest('.element-artwork');if(art){art.style.setProperty('width',`${img.naturalWidth*scale}px`,'important');art.style.setProperty('height',`${img.naturalHeight*scale}px`,'important')}})});
  const ro=new ResizeObserver(fit),mo=new MutationObserver(fit);stages.forEach(stage=>{ro.observe(stage);mo.observe(stage,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});stage.addEventListener('load',fit,true)});let attached=false;const detach=new MutationObserver(()=>{if(root.isConnected)attached=true;else if(attached){detach.disconnect();ro.disconnect();mo.disconnect();stages.forEach(stage=>stage.removeEventListener('load',fit,true))}});detach.observe(document.documentElement,{childList:true,subtree:true});

  return root
}

export function renderPreviewFooter({ children, lang }) {
  const fr = lang === 'fr'
  let open = false
  const footer = el('footer', { class: 'creation-preview__footer creation-preview__footer--hint' })
  const toggle = el(
    'button',
    {
      type: 'button',
      class: 'creation-preview__hint-toggle',
      'aria-expanded': 'false',
      'aria-label': fr ? 'Afficher l\u2019aide' : 'Show help',
      onclick: () => {
        open = !open
        footer.classList.toggle('is-open', open)
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
        toggle.setAttribute('aria-label', open ? (fr ? 'Masquer l\u2019aide' : 'Hide help') : fr ? 'Afficher l\u2019aide' : 'Show help')
      },
    },
    ['?']
  )
  footer.appendChild(toggle)
  footer.appendChild(el('div', { class: 'creation-preview__footer-body' }, [children]))
  return footer
}

function renderPhotoCreationWorkspace({ lang, onNavigate, pro=false }) {
  const fr = lang === 'fr'
  const state = {
    format: 'instax-mini',
    caption: '',
    captionSize: DEFAULT_CAPTION_SIZE,
    captionFont: undefined,
    zoom: 1,
    pan: { x: 0.5, y: 0.5 },
    photo: null,
  }
  const unit = 45

  const settings = el('section', { class: 'creation-settings', 'aria-label': 'Photo settings' })
  const head = el('header', { class: 'creation-settings__head' }, [
    el('h2', null, ['Photo']),
    el('p', null, ['Import a photo and choose its frame.']),
  ])
  const formatSwitch = el('div', { class: 'switch frame-format-switch', role: 'group', 'aria-label': 'Frame format' })
  const formatButtons = {}
  for (const f of FRAME_FORMATS) {
    const btn = el(
      'button',
      {
        class: state.format === f ? 'switch__on' : '',
        'aria-pressed': state.format === f ? 'true' : 'false',
        onclick: () => {
          state.format = f
          for (const k in formatButtons) {
            formatButtons[k].className = k === f ? 'switch__on' : ''
            formatButtons[k].setAttribute('aria-pressed', k === f ? 'true' : 'false')
          }
          redrawPreview()
        },
      },
      [FRAME_SPECS[f].label]
    )
    formatButtons[f] = btn
    formatSwitch.appendChild(btn)
  }
  head.appendChild(formatSwitch)
  settings.appendChild(head)

  const body = el('div', { class: 'creation-settings__body' })

  const photosDetails = el('details', { open: '' })
  photosDetails.appendChild(el('summary', null, ['Photos']))
  const uploadBtn = el(
    'button',
    {
      'data-tour': 'upload',
      class: 'creation-upload',
      onclick: () => {},
      ondragover: (e) => e.preventDefault(),
      ondrop: (e) => e.preventDefault(),
    },
    [
      (() => {
        const svg = svgEl('svg', {
          viewBox: '0 0 24 24',
          width: '20',
          height: '20',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '1.7',
        })
        svg.appendChild(svgEl('path', { d: 'M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5' }))
        return svg
      })(),
      el('small', null, [fr ? 'Importer une photo' : 'Import a photo']),
    ]
  )
  photosDetails.appendChild(uploadBtn)
  photosDetails.appendChild(
    el('button', { type: 'button', class: 'btn btn--white', onclick: () => {} }, [fr ? 'Téléphone' : 'Phone'])
  )
  photosDetails.appendChild(
    el('input', {
      type: 'file',
      accept: 'image/*',
      multiple: '',
      hidden: '',
      'aria-label': 'Upload photo',
    })
  )
  body.appendChild(photosDetails)

  const layoutDetails = el('details', matchMedia('(max-width:1023px)').matches?{}:{open:''})
  layoutDetails.appendChild(
    el('summary', null, ['Layout ', el('small', { 'data-no-i18n': '' }, [fr ? 'Bande = Premium' : 'Strip = Premium'])])
  )
  const layoutRow = el('div', { class: 'creation-layout',...(pro?{role:'group','aria-label':'Format'}:{}) }, [el(pro?'button':'span', { class: 'creation-pill',...(pro?{'aria-pressed':'true'}:{}) }, ['Single'])])
  for (const n of [3, 4, 5]) {
    layoutRow.appendChild(
      el('button', { type: 'button', onclick: () => onNavigate('/generator/pro?strip=' + n) }, [
        ...(pro?[`Strip ${n}`,' ']:['x',String(n),' ']),
        el('small', { class: 'pro-tag' }, ['PRO']),
      ])
    )
  }
  layoutDetails.appendChild(layoutRow)
  body.appendChild(layoutDetails)

  const filterDetails = el('details', {})
  filterDetails.appendChild(
    el('summary', null, ['Filter', el('small', null, [fr ? 'après import' : 'after import'])])
  )
  filterDetails.appendChild(el('p', { class: 'creation-muted' }, ['Available after import']))
  body.appendChild(filterDetails)

  settings.appendChild(body)

  const actions = el('footer', { class: 'creation-settings__actions' })
  const downloadBtn = el(
    'button',
    {
      class: 'btn btn--white',
      'aria-disabled': 'true',
      disabled: '',
      onclick: () => {},
    },
    ['Download']
  )
  const addBtn = el(
    'button',
    {
      class: 'btn btn--rose',
      'aria-disabled': 'true',
      disabled: '',
      onclick: () => {},
    },
    ['+ Add to Gallery']
  )
  actions.appendChild(downloadBtn)
  actions.appendChild(addBtn)
  settings.appendChild(actions)

  const preview = el('section', { class: 'creation-preview', 'aria-label': 'Photo preview' })
  const toolbar = el('div', { class: 'creation-toolbar' })
  const zoomOut = el(
    'button',
    {
      'aria-label': 'Zoom out',
      disabled: '',
      onclick: () => {
        state.zoom = clampZoom(state.zoom - 0.1)
        redrawPreview()
      },
    },
    ['−']
  )
  const zoomLabel = el('span', { 'data-no-i18n': '' }, [`${Math.round(state.zoom * 100)} %`])
  const zoomIn = el(
    'button',
    {
      'aria-label': 'Zoom in',
      disabled: '',
      onclick: () => {
        state.zoom = clampZoom(state.zoom + 0.1)
        redrawPreview()
      },
    },
    ['+']
  )
  const resetBtn = el(
    'button',
    {
      class: 'creation-toolbar__reset',
      onclick: () => {
        state.zoom = 1
        state.pan = { x: 0.5, y: 0.5 }
        state.captionSize = DEFAULT_CAPTION_SIZE
        redrawPreview()
      },
    },
    ['Reset']
  )
  const expandBtn = el(
    'button',
    {
      'aria-label': 'Enlarge preview',
      'aria-pressed': 'false',
      onclick: () => {},
    },
    [PreviewExpandIcon()]
  )
  toolbar.appendChild(zoomOut)
  toolbar.appendChild(zoomLabel)
  toolbar.appendChild(zoomIn)
  toolbar.appendChild(resetBtn)
  toolbar.appendChild(expandBtn)
  preview.appendChild(toolbar)

  const stage = el('div', { 'data-tour': 'frames', class: 'creation-preview__stage' })
  stage.style.setProperty('--u', `${unit}px`)
  preview.appendChild(stage)

  let textStyleHost = el('div')
  preview.appendChild(textStyleHost)

  let footerHost = el('div')
  preview.appendChild(footerHost)

  function redrawPreview() {
    stage.innerHTML = ''
    const card = renderFrameCard({
      frame: {
        format: state.format,
        photo: state.photo,
        zoom: state.zoom,
        pan: state.pan,
        caption: state.caption,
        captionSize: state.captionSize,
        captionFont: state.captionFont,
      },
      interactive: true,
      captionDescriptionId: 'creation-caption',lang,captionPlaceholder:pro?'':'Caption',
      onCaption: (v) => {
        state.caption = v
      },
      onPan: (p) => {
        state.pan = p
      },
      onZoom: (z) => {
        state.zoom = z
        redrawPreview()
      },
      onPickFile: () => {},
      onDropFile: () => {},
    })
    stage.appendChild(card)
    zoomLabel.textContent = `${Math.round(state.zoom * 100)} %`

    const nextStyle = 
      renderTextStyleMenus({
        font: state.captionFont,
        size: state.captionSize,
        defaultFontLabel: 'Helvetica',
        minSize: MIN_CAPTION_SIZE,
        maxSize: MAX_CAPTION_SIZE,
        onFont: (f) => {
          state.captionFont = f
          redrawPreview()
        },
        onSize: (n) => {
          state.captionSize = clampCaptionSize(n)
          redrawPreview()
        },
        lang,
      })
    ;textStyleHost.replaceWith(nextStyle);textStyleHost=nextStyle

    const nextFooter = 
      renderPreviewFooter({
        lang,
        children: el('p', { class: 'creation-tip' }, [
          (() => {
            const svg = svgEl('svg', {
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '1.6',
              'aria-hidden': 'true',
            })
            svg.appendChild(svgEl('path', { d: 'M9 18h6M10 21h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3Z' }))
            return svg
          })(),
          el('span', null, [
            fr
              ? "Astuce : glisse une photo directement sur l'aperçu, ou importe-la depuis ton téléphone (QR)."
              : 'Tip: drop a photo directly onto the preview, or import it from your phone (QR).',
          ]),
        ]),
      })
    ;footerHost.replaceWith(nextFooter);footerHost=nextFooter
  }

  const observer=new ResizeObserver(()=>{const spec=FRAME_SPECS[state.format];stage.style.setProperty('--u',`${Math.max(1,Math.min((stage.clientWidth-32)/spec.card.w,(stage.clientHeight-32)/spec.card.h))}px`)});observer.observe(stage);let wasConnected=false;const detachObserver=new MutationObserver(()=>{if(stage.isConnected)wasConnected=true;else if(wasConnected){observer.disconnect();detachObserver.disconnect()}});detachObserver.observe(document.documentElement,{childList:true,subtree:true});
  redrawPreview()

  const gallery = renderGeneratedGallery({ kind: 'Frames', title: 'Photo Gallery', lang,pro })

  return renderCreationWorkspace({ settings, preview, gallery, lang })
}

export function renderGeneratorPage({ lang = 'en', pro=false, kind='Frames',sub='Post-it', videoLocalDemo=false,strip=0,welcome=!pro, onNavigate = () => {} } = {}) {
  const root = el('div', {
    class: 'app app--workbench app--creation-reference',
    'data-feedback-tab': kind==='Frames'?(pro?'Photo':'Frames'):kind,
  })

  root.appendChild(
    el('a', { class: 'generator-skip-link', href: '#generator-content' }, ['Skip to content'])
  )

  const sidebar = renderSidebar({ active: 'generator', tagline: 'Frame print generator', lang, onNavigate })
  root.appendChild(sidebar)

  const main = el('main', { class: 'main', id: 'generator-content', tabindex: '-1' })

  const header = renderCreatorHeader({
    onNavigate,
    active: kind==='Frames'?'Photo':kind==='Post-its'?'Message':kind,
    onSelect: (type) => {

      const detail = { type }
      root.dispatchEvent(new CustomEvent('generator-tab-request', { detail, bubbles: true }))
    },
  })
  main.appendChild(header)

  const content=videoLocalDemo?renderLocalVideoEditor({lang,onNavigate}):pro&&kind==='Post-its'&&sub!=='Post-it'?renderProMessageEditor({sub,lang,onNavigate}):kind==='Combination'?renderCombinationStudio({lang,onNavigate,onCreateElement:()=>root.dispatchEvent(new CustomEvent('generator-tab-request',{detail:{type:'Photo'},bubbles:true}))}):kind==='Frames'?renderLocalPhotoWorkspace({lang,onNavigate,pro,initialStrip:strip}):["Stickers","Video"].includes(kind)?renderMediaEditor({kind,lang,onNavigate}):renderElementEditor({kind,lang,pro,onNavigate});if(pro&&kind!=='Frames'){const shield=el('div',{class:'peek-shield'});shield.append(content);main.append(shield)}else main.append(content)

  root.appendChild(main)
  if(welcome){const dialog=renderGeneratorWelcome({lang,renderFrameCard,onClose:()=>dialog.remove()});root.append(dialog)}
  return root
}