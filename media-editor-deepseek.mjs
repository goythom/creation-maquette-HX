import {showLocalPhoneUnavailable} from "./local-import-dialogs.mjs";
import {renderLocalUploadChooser} from './upload-chooser-deepseek.mjs';
import {addLocalGenerated,elementFilename,downloadDataURL} from './local-gallery-deepseek.mjs';
import { renderGeneratedGallery, renderTextStyleMenus, renderCreationWorkspace, renderPreviewFooter, PreviewExpandIcon } from './generator-page-deepseek.mjs'
import { renderVideoCard,portraitCutout,stickerCanvas,borderedSticker } from './current-rendering-helpers.mjs'
import { frenchTree } from './translate-dom.mjs'

const TEXT_FONTS = {
  serif: { label: 'Serif', family: 'Georgia, "Times New Roman", serif' },
  sans: { label: 'Sans serif', family: 'Arial, Helvetica, sans-serif' },
  hand: { label: 'Handwritten', family: '"Bradley Hand", "Snell Roundhand", cursive' },
  mono: { label: 'Monospace', family: 'ui-monospace, Menlo, monospace' },
  kalam: { label: 'Kalam (handwriting)', family: 'Kalam, cursive' },
}
const FR_FONT_LABEL = { Serif: 'Serif', 'Sans serif': 'Sans serif', Handwritten: 'Manuscrite', Monospace: 'Chasse fixe', 'Kalam (handwriting)': 'Kalam (manuscrite)' }
function textFamily(font, fallback) {
  if (font && TEXT_FONTS[font]) return TEXT_FONTS[font].family
  return fallback
}
function sizeChoices(min, max, current) {
  const out = []
  for (let n = min; n <= max; n += 2) out.push(n)
  if (!out.includes(current)) out.push(current)
  out.sort((a, b) => a - b)
  return out
}

function el(tag, props = {}, ...children) {
  const n = document.createElement(tag)
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue
    if (k === 'className') n.className = v
    else if (k === 'style' && typeof v === 'object') Object.assign(n.style, v)
    else if (k === 'hidden') n.hidden = true
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'value') n.value = v
    else if (k === 'checked') n.checked = !!v
    else if (k === 'disabled') n.disabled = !!v
    else if (k === 'ariaPressed') n.setAttribute('aria-pressed', String(v))
    else if (k === 'ariaLabel') n.setAttribute('aria-label', v)
    else if (k === 'ariaDisabled') n.setAttribute('aria-disabled', String(v))
    else if (k === 'ariaHidden') n.setAttribute('aria-hidden', String(v))
    else if (k === 'ariaModal') n.setAttribute('aria-modal', String(v))
    else if (k === 'ariaHasPopup') n.setAttribute('aria-haspopup', v)
    else if (k === 'ariaExpanded') n.setAttribute('aria-expanded', String(v))
    else if (k === 'ariaLabelledby') n.setAttribute('aria-labelledby', v)
    else if (k === 'ariaSelected') n.setAttribute('aria-selected', String(v))
    else if (k === 'role') n.setAttribute('role', v)
    else if (k === 'tabIndex') n.tabIndex = v
    else if (k === 'title') n.title = v
    else if (k === 'type') n.type = v
    else if (k === 'accept') n.accept = v
    else if (k === 'maxLength') n.maxLength = v
    else if (k === 'placeholder') n.placeholder = v
    else if (k === 'min') n.min = v
    else if (k === 'max') n.max = v
    else if (k === 'step') n.step = v
    else if (k === 'ref') { /* ignore */ }
    else n.setAttribute(k, v)
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue
    n.append(c instanceof Node ? c : document.createTextNode(String(c)))
  }
  return n
}

export function renderElementCreationLayout({ title, settings, preview, actions, gallery, footer, onReset, lang }) {
  let expanded = false
  const root = el('div')
  const draw = () => {
    root.replaceChildren()
    const head = el('header', { className: 'creation-settings__head' },
      el('h2', {}, title === 'Stamps' ? 'Stamp' : title === 'Stickers' ? 'Sticker' : title)
    )
    const settingsSection = el('section', { className: 'creation-settings' },
      head,
      el('div', { className: 'creation-settings__body' }, settings),
      actions ? el('footer', { className: 'creation-settings__actions' }, actions) : null
    )
    const toolbar = el('div', { className: 'creation-toolbar' },
      el('span', {}, title),
      onReset ? el('button', { className: 'creation-toolbar__reset', onClick: onReset }, 'Reset') : null,
      el('button', {
        className: onReset ? undefined : 'creation-toolbar__reset',
        ariaLabel: 'Enlarge preview',
        ariaPressed: expanded,
        onClick: () => { expanded = !expanded; draw() },
      }, PreviewExpandIcon())
    )
    const previewSection = el('section', { className: 'creation-preview' },
      toolbar,
      el('div', { className: 'creation-preview__stage creation-element-stage' }, preview),
      footer ? renderPreviewFooter({ children: footer, lang }) : null
    )
    const galleryNode = gallery ?? renderGeneratedGallery({ kind: title, title, lang, pro: true })
    root.append(renderCreationWorkspace({
      lang,
      expanded,
      onClosePreview: () => { expanded = false; draw() },
      settings: settingsSection,
      preview: previewSection,
      gallery: galleryNode,
    }))
  }
  draw()
  return root.firstElementChild
}

function renderScrollMenu({ label, value, shown, options, onPick, up, lang }) {
  let open = false
  const box = el('div', { className: 'text-style__field', 'data-no-i18n': '' })
  const id = 'tsm-' + Math.random().toString(36).slice(2)
  const draw = () => {
    box.replaceChildren()
    box.append(el('span', { id }, label))
    box.append(el('button', {
      type: 'button',
      className: 'text-style__button',
      ariaHasPopup: 'listbox',
      ariaExpanded: open,
      ariaLabelledby: id,
      onClick: () => { open = !open; draw() },
    }, el('span', {}, shown), el('span', { ariaHidden: true }, '▾')))
    if (open) {
      const list = el('ul', { className: 'text-style__list' + (up ? ' text-style__list--up' : ''), role: 'listbox', ariaLabelledby: id })
      for (const o of options) {
        const li = el('li', { role: 'presentation' })
        const btn = el('button', {
          type: 'button',
          role: 'option',
          ariaSelected: o.value === value,
          className: 'text-style__option',
          onClick: () => { onPick(o.value); open = false; draw() },
        }, o.label)
        if (o.style) Object.assign(btn.style, o.style)
        li.append(btn)
        list.append(li)
      }
      box.append(list)
    }
  }
  draw()
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) { e.stopPropagation(); open = false; draw() }
  })
  return box
}

function renderTextStyleMenusLocal({ font, size, defaultFontLabel, minSize = 14, maxSize = 36, onFont, onSize, up, lang }) {
  const fr = lang === 'fr'
  const fontOptions = Object.entries(TEXT_FONTS).map(([key, f]) => ({
    value: key,
    label: fr ? (FR_FONT_LABEL[f.label] ?? f.label) : f.label,
    style: { fontFamily: f.family },
  }))
  const shownFont = font && font in TEXT_FONTS
    ? (fr ? (FR_FONT_LABEL[TEXT_FONTS[font].label] ?? TEXT_FONTS[font].label) : TEXT_FONTS[font].label)
    : (defaultFontLabel ? (fr ? defaultFontLabel.replace('(original)', '(d’origine)') : defaultFontLabel) : (fr ? 'Police d’origine' : 'Original font'))
  return el('div', { className: 'text-style' },
    renderScrollMenu({ label: fr ? 'Police' : 'Font', value: font ?? '', shown: shownFont, options: fontOptions, onPick: (v) => onFont(v), up, lang }),
    renderScrollMenu({ label: fr ? 'Taille' : 'Size', value: size, shown: `${Math.round(size)} px`, options: sizeChoices(minSize, maxSize, Math.round(size)).map(n => ({ value: n, label: `${n} px` })), onPick: onSize, up, lang })
  )
}

// Deferred workflows intentionally have no file, download or background-removal effects.
function downloadBlob(){}
function dataUrlToBlob(){}





function renderStickerEditor({ lang, onNavigate }) {
  const state = {
    name: '',
    whiteBorder: true,
    source: '',
    cutout: '',
    preview: '',
    colour: '#ffffff',
    size: 10,
    busy: false,
    status: '',
    error: '',
    eraser: false,
    brushMode: 'erase',
    eraseSize: 48,
    pointer: null,
  }
  const input = el('input', { hidden: true, type: 'file', accept: 'image/*' })
  const canvas = el('canvas', { className: 'sticker-erase' })
  canvas.style.touchAction = 'none'
  const original = { current: null }
  const stamp = { current: null }
  const last = { current: null }
  let addLock = false
  let root = null
  let settingsHost = null
  let previewHost = null
  let actionsHost = null

  const t = (fr, en) => (lang === 'fr' ? fr : en)

  const refreshPreview = () => {
    if (state.cutout) {
      void borderedSticker(state.cutout, state.whiteBorder ? '#ffffff' : state.colour, state.size).then((v) => {
        state.preview = v.src
        drawPreview();drawActions()
      })
    } else {
      state.preview = ''
      drawPreview();drawActions()
    }
  }

  const loadOriginal = () => {
    if (!state.source) { original.current = null; return }
    void stickerCanvas(state.source).then((c) => { original.current = c })
  }

  let canvasKey=''
  const loadCanvas = () => {
    if (!state.cutout||canvasKey===state.cutout) return
    canvasKey=state.cutout
    void stickerCanvas(state.cutout).then((base) => {
      canvas.width = base.width
      canvas.height = base.height
      canvas.getContext('2d').drawImage(base, 0, 0)
    })
  }

  let uploadDialog=null
  function openUpload(){uploadDialog=renderLocalUploadChooser({lang,onClose:()=>{uploadDialog?.remove();uploadDialog=null},onComputer:()=>{uploadDialog?.remove();uploadDialog=null;input.click()},onPhone:()=>{uploadDialog?.remove();uploadDialog=null;showLocalPhoneUnavailable({lang,host:root.closest('.app')||root})},onFiles:async files=>{const ok=await upload(files[0]);if(ok){uploadDialog?.remove();uploadDialog=null}return ok}});if(uploadDialog)(root.closest('.app')||root).append(uploadDialog)}
  const upload = async file => {
    if(!file||!file.type.startsWith('image/')||file.size>15*1024*1024){state.error='Choose an image smaller than 15 MB.';drawSettings();return false}
    let timer
    try{const c=await Promise.race([(async()=>{const src=await new Promise((ok,no)=>{const r=new FileReader;r.onload=()=>ok(String(r.result));r.onerror=no;r.readAsDataURL(file)});return stickerCanvas(src)})(),new Promise((_,no)=>timer=setTimeout(()=>no(Error('timeout')),20000))]);state.source=c.toDataURL('image/png');state.cutout=state.source;state.error='';loadOriginal();const alpha=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let transparent=false;for(let n=3;n<alpha.length;n+=4)if(alpha[n]<250){transparent=true;break}if(transparent)state.status='Transparent image ready.';else void remove(state.source,false);refreshPreview();drawSettings();return true}catch{state.error='Could not read image.';drawSettings();return false}finally{clearTimeout(timer)}
  }

  const remove = async (image = state.source, manual = true) => {
    state.busy = true
    state.error = ''
    drawSettings()
    try {
      state.cutout = await portraitCutout(image, (s) => { state.status = s; drawSettings() })
      state.status = 'Background removed. Check the edges.'
    } catch (e) {
      console.error('Background removal failed', e)
      if (manual) state.error = 'Automatic removal unavailable. Use a transparent PNG or the manual eraser.'
      state.status = ''
    } finally {
      state.busy = false
      refreshPreview()
      drawSettings()
    }
  }

  const showPointer = (e) => {
    const r = canvas.getBoundingClientRect()
    state.pointer = {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      w: (state.eraseSize * r.width) / canvas.width,
      h: (state.eraseSize * r.height) / canvas.height,
    }
    const wrap=previewHost.querySelector('.sticker-erase-wrap');if(wrap){let cursor=wrap.querySelector('.sticker-erase-cursor');if(!cursor){cursor=el('span',{className:'sticker-erase-cursor',ariaHidden:true});wrap.append(cursor)}Object.assign(cursor.style,{left:state.pointer.x+'px',top:state.pointer.y+'px',width:state.pointer.w+'px',height:state.pointer.h+'px'})}
  }

  const erase = (e) => {
    showPointer(e)
    if (!state.eraser) return
    if (e.type === 'pointerdown') {
      canvas.setPointerCapture(e.pointerId)
      last.current = null
    } else if (!canvas.hasPointerCapture(e.pointerId)) return
    const r = canvas.getBoundingClientRect()
    const x = canvas.getContext('2d')
    const pos = {
      x: ((e.clientX - r.left) * canvas.width) / r.width,
      y: ((e.clientY - r.top) * canvas.height) / r.height,
    }
    const brush = (target) => {
      target.lineWidth = state.eraseSize
      target.lineCap = 'round'
      if (last.current) {
        target.beginPath()
        target.moveTo(last.current.x, last.current.y)
        target.lineTo(pos.x, pos.y)
        target.stroke()
      }
      target.beginPath()
      target.arc(pos.x, pos.y, state.eraseSize / 2, 0, Math.PI * 2)
      target.fill()
    }
    if (state.brushMode === 'restore' && original.current) {
      const t2 = stamp.current ?? (stamp.current = document.createElement('canvas'))
      t2.width = canvas.width
      t2.height = canvas.height
      const tx = t2.getContext('2d')
      tx.clearRect(0, 0, t2.width, t2.height)
      tx.drawImage(original.current, 0, 0, t2.width, t2.height)
      tx.globalCompositeOperation = 'destination-in'
      brush(tx)
      tx.globalCompositeOperation = 'source-over'
      x.drawImage(t2, 0, 0)
    } else {
      x.globalCompositeOperation = 'destination-out'
      brush(x)
      x.globalCompositeOperation = 'source-over'
    }
    last.current = pos
  }

  canvas.addEventListener('pointerdown', erase)
  canvas.addEventListener('pointermove', erase)
  canvas.addEventListener('pointerleave', () => { state.pointer=null;previewHost.querySelector('.sticker-erase-cursor')?.remove() })
  canvas.addEventListener('pointercancel', () => {
    last.current = null
    state.pointer = null
    if (canvas.width) state.cutout = canvas.toDataURL('image/png')
    refreshPreview()
  })
  canvas.addEventListener('pointerup', (e) => {
    last.current = null
    if (e.pointerType !== 'mouse') state.pointer = null
    if (canvas.width) state.cutout = canvas.toDataURL('image/png')
    refreshPreview()
  })

  input.addEventListener('change', (e) => {
    const f = e.target.files?.[0]
    if (f) void upload(f)
    e.target.value = ''
  })

  const drawSettings = () => {
    if (!settingsHost) return
    settingsHost.replaceChildren()
    const sw = el('div', { className: 'switch' }, el('button', { className: 'switch__on' }, 'Sticker'))
    const controls = el('div', { className: 'controls element-controls' })
    controls.append(el('p', { className: 'note' }, 'Background removal runs on your device. First use downloads a small model.'))
    const row1 = el('div', { className: 'row' },
      el('button', { className: 'btn btn--white', disabled: state.busy, onClick: () => input.click() }, 'Upload image'),
      el('button', { className: 'btn btn--white', disabled: state.busy, onClick: () => showLocalPhoneUnavailable({lang,host:root.closest('.app')||root}) }, 'Phone'),
      el('button', { className: 'btn btn--white', disabled: state.busy || !state.source, onClick: () => void remove() }, 'Remove background')
    )
    controls.append(row1)
    if (state.busy) controls.append(el('p', { role: 'status', className: 'note' }, state.status))
    if (!state.busy && state.status) controls.append(el('p', { className: 'note' }, state.status))
    const row2 = el('div', { className: 'row' },
      el('button', {
        className: 'btn btn--white',
        disabled: !state.source || state.busy,
        onClick: () => { state.cutout = state.source; state.status = ''; refreshPreview(); drawSettings() },
      }, 'Restore image'),
      el('button', {
        className: 'btn btn--white',
        disabled: !state.cutout || state.busy,
        ariaPressed: state.eraser,
        onClick: () => { state.eraser = !state.eraser; drawSettings(); drawPreview() },
      }, 'Manual eraser')
    )
    controls.append(row2)
    if (state.eraser) {
      const group = el('div', { className: 'row', role: 'group', ariaLabel: 'Brush mode' },
        el('button', { className: 'btn btn--white', ariaPressed: state.brushMode === 'erase', onClick: () => { state.brushMode = 'erase'; drawSettings() } }, 'Erase'),
        el('button', { className: 'btn btn--white', ariaPressed: state.brushMode === 'restore', disabled: !state.source, onClick: () => { state.brushMode = 'restore'; drawSettings() } }, 'Restore')
      )
      controls.append(group)
      const label = el('label')
      const span = el('span', { className: 'sticker-eraser-label' },
        el('span', {}, 'Brush diameter'),
        `: ${state.eraseSize}px`
      )
      label.append(span)
      const range = el('input', {
        ariaLabel: 'Brush diameter',
        className: 'slider',
        type: 'range',
        min: '4',
        max: '160',
        step: '2',
        value: state.eraseSize,
        onInput: (e) => { state.eraseSize = Number(e.target.value); state.pointer = null; drawSettings() },
      })
      label.append(range)
      controls.append(label)
      controls.append(el('p', { className: 'note' }, 'Erase removes parts of the sticker; Restore paints the original image back. Restore image resets everything.'))
    }
    const nameLabel = el('label')
    nameLabel.append('Sticker name')
    nameLabel.append(el('input', {
      value: state.name,
      maxLength: 60,
      placeholder: 'Sticker',
      onInput: (e) => { state.name = e.target.value },
    }))
    controls.append(nameLabel)
    const wbLabel = el('label', { className: 'stamp-paper-option' })
    const wbInput = el('input', { type: 'checkbox', checked: state.whiteBorder, onChange: (e) => { state.whiteBorder = e.target.checked; refreshPreview(); drawSettings() } })
    wbLabel.append(wbInput, ' White border')
    controls.append(wbLabel)
    if (!state.whiteBorder) {
      const cLabel = el('label')
      cLabel.append('Border colour')
      cLabel.append(el('input', { type: 'color', value: state.colour, onInput: (e) => { state.colour = e.target.value; refreshPreview() } }))
      controls.append(cLabel)
    }
    const sizeLabel = el('label')
    sizeLabel.append(`Border thickness: ${state.size}px`)
    sizeLabel.append(el('input', {
      className: 'slider',
      type: 'range',
      min: '0',
      max: '24',
      value: state.size,
      onInput: (e) => { state.size = Number(e.target.value); refreshPreview(); drawSettings() },
    }))
    controls.append(sizeLabel)
    if (state.error) controls.append(el('p', { className: 'note', role: 'alert' }, state.error))
    settingsHost.append(sw, controls, input);if(lang==='fr')frenchTree(settingsHost)
  }

  const drawPreview = () => {
    if (!previewHost) return
    previewHost.replaceChildren()
    if (state.eraser) {
      const wrap = el('div', { className: 'sticker-erase-wrap' })
      wrap.append(canvas)
      if(!canvas.matches(':hover'))state.pointer=null
      if (state.pointer) {
        const cursor = el('span', { className: 'sticker-erase-cursor', ariaHidden: true })
        cursor.style.left = state.pointer.x + 'px'
        cursor.style.top = state.pointer.y + 'px'
        cursor.style.width = state.pointer.w + 'px'
        cursor.style.height = state.pointer.h + 'px'
        wrap.append(cursor)
      }
      previewHost.append(wrap)
      loadCanvas()
    } else {
      const box = el('div', {
        className: 'element-preview sticker-checker',
        role: 'button',
        tabIndex: 0,
        ariaLabel: 'Upload sticker image',
        title: 'Paste a copied image here (Ctrl/Cmd + V)',
        ariaDisabled: state.busy,
        onClick: () => { if (!state.busy) openUpload() },
        onKeydown: (e) => {
          if (!state.busy && ['Enter', ' '].includes(e.key)) { e.preventDefault(); openUpload() }
        },
      })
      if (state.preview || state.source) {
        box.append(el('img', { src: state.preview || state.source, alt: state.name || 'Sticker preview' }))
      }
      box.append(el('span', { className: 'image-upload-hint' }, (state.source ? 'Change image' : 'Add image'), ' · Computer, phone or paste'))
      previewHost.append(box)
    }
    if(lang==='fr')frenchTree(previewHost)
  }

  const drawActions = () => {
    if (!actionsHost) return
    actionsHost.replaceChildren()
    const row = el('div', { className: 'row row--actions' },
      el('button', {
        className: 'btn btn--white',
        disabled: !state.preview || state.busy,
        onClick: () => downloadDataURL(state.preview, elementFilename('sticker', state.name)),
      }, 'Download sticker'),
      el('button', {
        className: 'btn btn--rose',
        disabled: !state.preview || state.busy,
        onClick: () => {
          if (addLock || !state.preview || state.busy) return
          addLock = true
          state.busy = true
          drawSettings()
          void borderedSticker(state.cutout, state.whiteBorder ? '#ffffff' : state.colour, state.size).then(v => {
            addLocalGenerated({...v,kind:'Stickers',format:'sticker',text:state.name,id:'sticker-'+Date.now().toString(36)})
          }).finally(() => { addLock = false; state.busy = false; drawSettings() })
        },
      }, '+ Add to Gallery')
    )
    actionsHost.append(row);if(lang==='fr')frenchTree(actionsHost)
  }

  const settings = el('div')
  settingsHost = settings
  const preview = el('div')
  previewHost = preview
  const actions = el('div')
  actionsHost = actions

  root = renderElementCreationLayout({
    title: 'Stickers',
    settings,
    preview,
    actions,
    lang,
  })

  settingsHost=root.querySelector('.creation-settings__body');previewHost=root.querySelector('.creation-preview__stage');actionsHost=root.querySelector('.creation-settings__actions');
  drawSettings()
  drawPreview()
  drawActions()

  const paste=e=>{if(uploadDialog)return;const files=[...(e.clipboardData?.items||[])].filter(i=>i.kind==='file'&&i.type.startsWith('image/')).map(i=>i.getAsFile()).filter(Boolean);if(files.length){e.preventDefault();void upload(files[0])}};document.addEventListener('paste',paste);let attached=false;const cleanup=new MutationObserver(()=>{if(root.isConnected)attached=true;else if(attached){document.removeEventListener('paste',paste);uploadDialog?.remove();cleanup.disconnect()}});cleanup.observe(document.documentElement,{childList:true,subtree:true})
  return root
}

function renderVideoEditor({ lang, onNavigate }) {
  const state = {
    textSize: 26,
    textFont: undefined,
    link: '',
    title: '',
    skin: 'card',
    poster: '',
    preview: '',
    error: '',
    busy: false,
    videoAsset: null,
    playing: false,
    importLocked: false,
    picked: null,
  }
  const t = (fr, en) => (lang === 'fr' ? fr : en)
  const input = el('input', { hidden: true, type: 'file', accept: 'image/*' })
  const videoInput = el('input', { hidden: true, type: 'file', accept: 'video/mp4,video/quicktime,video/webm' })
  let addLock = false
  let settingsHost = null
  let previewHost = null
  let actionsHost = null

  const validLink = () => {
    const v = state.link.trim()
    if (!v) return ''
    try {
      const u = new URL(v)
      if (u.hostname.includes('drive.google.com') || u.hostname.includes('docs.google.com')) return u.href
    } catch { /* ignore */ }
    return ''
  }

  const refreshPreview = () => {
    void renderVideoCard(state.poster, state.title, validLink(), state.textSize, state.textFont)
      .then((v) => { state.preview = v; drawPreview() })
      .catch(() => { state.error = 'Could not create poster.'; drawSettings() })
  }

  const image = async file => {
    if(!file)return false;
    if(!file.type.startsWith('image/')||file.size>15*1024*1024){state.error='Choose an image smaller than 15 MB.';drawSettings();return false}
    let timer;
    try{
      state.poster=await Promise.race([new Promise((resolve,reject)=>{const r=new FileReader();r.onerror=reject;r.onload=async()=>{try{const value=String(r.result),im=new Image();im.src=value;await im.decode();resolve(value)}catch(e){reject(e)}};r.readAsDataURL(file)}),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('timeout')),20000)})]);
      state.error='';drawSettings();refreshPreview();return true;
    }catch{state.error='Could not read image.';drawSettings();return false}finally{clearTimeout(timer)}
  }
  const importVideo = async () => false
  const showVideoChooser=()=>{let chooser;chooser=renderLocalUploadChooser({lang,onClose:()=>chooser.remove(),onComputer:()=>{chooser.remove();videoInput.click()},onPhone:()=>{chooser?.remove();showLocalPhoneUnavailable({lang,host:root.closest('.app')||root})},onFiles:files=>{chooser.remove();void importVideo(files[0])}});root.append(chooser)}

  const add = async () => {
    if (addLock || state.busy) return
    const valid = validLink()
    if (!valid && !state.videoAsset && !(state.picked && !state.importLocked)) return
    addLock = true
    state.busy = true
    drawSettings()
    try {
      const src=await renderVideoCard(state.poster,state.title,valid,state.textSize,state.textFont);addLocalGenerated({kind:'Video',id:crypto.randomUUID(),text:state.title,textSize:state.textSize,textFont:state.textFont,image:state.poster,link:valid,src,width:640,height:480});state.error='';
    } finally {
      addLock = false
      state.busy = false
      drawSettings()
    }
  }

  input.addEventListener('change', (e) => {
    void image(e.target.files?.[0])
    e.target.value = ''
  })
  videoInput.addEventListener('change', (e) => {
    void importVideo(e.target.files?.[0])
    e.target.value = ''
  })

  const drawSettings = () => {
    if (!settingsHost) return
    settingsHost.replaceChildren()
    const sw = el('div', { className: 'switch' }, el('button', { className: 'switch__on' }, 'Video'))
    const controls = el('div', { className: 'controls element-controls' })

    const vpa = el('div', { className: 'video-poster-action' })
    const vLabel = el('label')
    vLabel.append('Video file (under 1 minute)')
    if (state.importLocked) vLabel.append(el('small', { className: 'pro-tag' }, 'PRO'))
    vpa.append(vLabel)
    vpa.append(el('button', {
      className: 'btn btn--white',
      disabled: state.busy || state.importLocked,
      title: state.importLocked ? 'Video import is part of Premium.' : undefined,
      onClick: showVideoChooser,
    }, state.videoAsset ? t('Changer la vidéo', 'Change video') : t('Importer la vidéo', 'Import video')))
    if (state.videoAsset) {
      vpa.append(el('button', { className: 'btn btn--white', onClick: () => { state.videoAsset = null; drawSettings() } }, 'Remove video'))
      vpa.append(el('p', { className: 'note', role: 'status' }, `${state.videoAsset.name} (${state.videoAsset.duration}s)`))
    }
    controls.append(vpa)

    const cpa = el('div', { className: 'video-poster-action' })
    cpa.append(el('label', {}, 'Cover image shown before playback'))
    cpa.append(el('button', { className: 'btn btn--white', onClick: () => input.click() }, state.poster ? t('Changer la couverture', 'Change cover') : t('Choisir la couverture', 'Choose cover')))
    cpa.append(el('button', { className: 'btn btn--white', onClick: () => showLocalPhoneUnavailable({lang,host:root.closest('.app')||root}) }, 'Phone'))
    if (state.poster) cpa.append(el('button', { className: 'btn btn--white', onClick: () => { state.poster = ''; refreshPreview(); drawSettings() } }, 'Reset poster'))
    controls.append(cpa)

    const titleLabel = el('label')
    titleLabel.append('Title')
    titleLabel.append(el('input', {
      value: state.title,
      maxLength: 80,
      placeholder: 'Video',
      onInput: (e) => { state.title = e.target.value; refreshPreview() },
    }))
    controls.append(titleLabel)

    const veskin = el('div', { className: 'veskin', role: 'group', ariaLabel: 'Habillage' })
    veskin.append(el('span', { className: 'veskin__label' }, 'Habillage'))
    const opts = el('div', { className: 'veskin__opts' })
    for (const [v, l] of [['card', 'Carte'], ['film', 'Pellicule'], ['vhs', 'VHS'], ['cam', 'Caméscope']]) {
      opts.append(el('button', {
        type: 'button',
        className: 'veskin__opt' + (state.skin === v ? ' on' : ''),
        ariaPressed: state.skin === v,
        onClick: () => { state.skin = v; drawSettings(); drawPreview() },
      }, l))
    }
    veskin.append(opts)
    controls.append(veskin)

    controls.append(renderTextStyleMenus({
      font: state.textFont,
      size: state.textSize,
      defaultFontLabel: 'Arial (original)',
      minSize: 18,
      maxSize: 44,
      onFont: (f) => { state.textFont = f; refreshPreview() },
      onSize: (n) => { state.textSize = n; refreshPreview() },
      lang,
    }))

    if (state.error) controls.append(el('p', { role: 'alert', className: 'note' }, state.error))
    settingsHost.append(sw, controls, input, videoInput);if(lang==='fr')frenchTree(settingsHost);drawActions()
  }

  const drawPreview = () => {
    if (!previewHost) return
    previewHost.replaceChildren()
    const box = el('div', { className: 'element-preview' })
    if (state.skin !== 'card' && (state.picked || state.videoAsset)) {
      // inert: alternate skins not implemented
      box.append(el('div', { className: 'vs-skin-host' }))
    } else if (state.preview) {
      box.append(el('img', { src: state.preview, alt: 'Silver video card preview' }))
    }
    previewHost.append(box)
    if (state.videoAsset) {
      previewHost.append(el('button', { className: 'btn btn--white btn--small', onClick: () => { state.playing = true; drawPreview() } }, 'Play video'))
    }
  }

  const drawActions = () => {
    if (!actionsHost) return
    actionsHost.replaceChildren()
    const valid = validLink()
    const row = el('div', { className: 'row row--actions' },
      el('button', {
        className: 'btn btn--rose',
        disabled: state.busy || (!valid && !state.videoAsset && !(state.picked && !state.importLocked)),
        onClick: () => void add(),
      }, '+ Add to Gallery')
    )
    actionsHost.append(row);if(lang==='fr')frenchTree(actionsHost)
  }

  const settings = el('div')
  settingsHost = settings
  const preview = el('div')
  previewHost = preview
  const actions = el('div')
  actionsHost = actions

  const root = renderElementCreationLayout({
    title: 'Video',
    settings,
    preview,
    actions,
    lang,
  })

  settingsHost=root.querySelector('.creation-settings__body');previewHost=root.querySelector('.creation-preview__stage');actionsHost=root.querySelector('.creation-settings__actions');
  drawSettings()
  refreshPreview()
  drawActions()

  return root
}

export function renderMediaEditor({ kind = 'Stickers', lang = 'en', onNavigate = () => {} } = {}) {
  const root = el('div')
  const draw = () => {
    root.replaceChildren()
    const node = kind === 'Video'
      ? renderVideoEditor({ lang, onNavigate })
      : renderStickerEditor({ lang, onNavigate })
    root.append(node)
    if (lang === 'fr') frenchTree(root)
  }
  draw()
  return root
}