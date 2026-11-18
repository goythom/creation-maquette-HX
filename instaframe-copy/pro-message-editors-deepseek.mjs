import {renderLocalUploadChooser} from './upload-chooser-deepseek.mjs';
import {addLocalGenerated,downloadDataURL,elementFilename} from './local-gallery-deepseek.mjs';
// src/components/pro-editors.mjs
import {
  elementDefaults,elementSize,readPhoto,validatePhotoFile,
  renderElement,
  setRenderLanguage,
} from './current-rendering-helpers.mjs'
import {
  renderGeneratedGallery,renderScrollMenu,
  renderTextStyleMenus,
  renderCreationWorkspace,
  renderPreviewFooter,
  PreviewExpandIcon,
} from './generator-page-deepseek.mjs'
import { frenchTree as applyFrenchTree } from './translate-dom.mjs'

const LETTER_FONT_FAMILY = {
  Calligraphy: "'Pinyon Script', cursive",
  Flourish: "'Great Vibes', cursive",
  Gothic: "'UnifrakturCook', serif",
  Classic: "'Cormorant Garamond', serif",
}

const TEXT_SIZES = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 42, 48, 56, 64, 72]

function sizeChoices(min, max, current) {
  const list = TEXT_SIZES.filter((n) => n >= min && n <= max)
  if (typeof current === 'number' && Number.isFinite(current) && !list.includes(current)) list.push(current)
  return list.sort((a, b) => a - b)
}

function todayDateLabel() {
  const n = new Date()
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${n.getDate()} ${months[n.getMonth()]} ${n.getFullYear()}`
}

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue
    if (k === 'className') node.className = v
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v)
    else if (k === 'dataset' && typeof v === 'object') Object.assign(node.dataset, v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'text') node.textContent = v
    else if (k === 'html') node.innerHTML = v
    else if (k in node) {
      try { node[k] = v } catch { node.setAttribute(k, v) }
    } else node.setAttribute(k, v)
  }
  const kids = Array.isArray(children) ? children : [children]
  for (const c of kids) {
    if (c == null || c === false) continue
    if (c instanceof Node) node.appendChild(c)
    else node.appendChild(document.createTextNode(String(c)))
  }
  return node
}

function replaceEditorChildren(root,layout){
  const fields=[...root.querySelectorAll('input,textarea')],active=document.activeElement,index=fields.indexOf(active)
  const selection=index>=0&&typeof active.selectionStart==='number'?[active.selectionStart,active.selectionEnd]:null
  root.replaceChildren(layout)
  if(index>=0){const field=root.querySelectorAll('input,textarea')[index];field?.focus({preventScroll:true});if(selection)try{field.setSelectionRange(...selection)}catch{}}
}

function fragment(children) {
  const f = document.createDocumentFragment()
  for (const c of children) {
    if (c == null || c === false) continue
    if (c instanceof Node) f.appendChild(c)
    else f.appendChild(document.createTextNode(String(c)))
  }
  return f
}

function pills({ label, options, value, onChange, fonts }) {
  const group = el('div', { className: 'switch', role: 'group', 'aria-label': label })
  for (const option of options) {
    const btn = el('button', {
      type: 'button',
      className: value === option ? 'switch__on' : '',
      'aria-pressed': value === option ? 'true' : 'false',
      onClick: () => onChange(option),
    }, [option])
    if (fonts && fonts[option]) btn.style.fontFamily = fonts[option]
    group.appendChild(btn)
  }
  return el('div', { className: 'pro-control' }, [
    el('span', { className: 'pro-control__label' }, [label]),
    group,
  ])
}

function scrollMenu(props){return renderScrollMenu(props)}

function letterZoom({ preview, onClose }) {
  const backdrop = el('div', { className: 'ready letter-zoom-backdrop', onClick: onClose })
  const box = el('div', {
    className: 'ready__box letter-zoom',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Letter preview enlarged',
    onClick: (e) => e.stopPropagation(),
  })
  const closeBtn = el('button', {
    type: 'button',
    className: 'letter-zoom__close',
    'aria-label': 'Close letter preview',
    onClick: onClose,
  })
  closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg>'
  box.appendChild(closeBtn)
  box.appendChild(el('img', { src: preview, alt: 'Letter preview enlarged' }))
  backdrop.appendChild(box)
  const previous = document.activeElement
  const key = (e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus() }
  }
  document.addEventListener('keydown', key)
  queueMicrotask(() => closeBtn.focus())
  const cleanup = () => {
    document.removeEventListener('keydown', key)
    if (previous && previous.focus) previous.focus()
  }
  return { node: backdrop, cleanup }
}

function creationLayout({ title, settings, preview, actions, gallery, footer, onReset, lang }) {
  let expanded = false
  const settingsSection = el('section', { className: 'creation-settings' })
  const head = el('header', { className: 'creation-settings__head' })
  const h2 = el('h2', {}, [title === 'Stamps' ? 'Stamp' : title === 'Stickers' ? 'Sticker' : title])
  head.appendChild(h2)
  settingsSection.appendChild(head)
  const body = el('div', { className: 'creation-settings__body' })
  body.appendChild(settings)
  settingsSection.appendChild(body)
  if (actions) {
    const foot = el('footer', { className: 'creation-settings__actions' })
    foot.appendChild(actions)
    settingsSection.appendChild(foot)
  }

  const previewSection = el('section', { className: 'creation-preview' })
  const toolbar = el('div', { className: 'creation-toolbar' })
  toolbar.appendChild(el('span', {}, [title]))
  if (onReset) {
    toolbar.appendChild(el('button', { className: 'creation-toolbar__reset', onClick: onReset }, ['Reset']))
  }
  const expandBtn = el('button', {
    className: onReset ? undefined : 'creation-toolbar__reset',
    'aria-label': 'Enlarge preview',
    'aria-pressed': 'false',
  })
  expandBtn.appendChild(PreviewExpandIcon())
  expandBtn.addEventListener('click', () => {
    expanded = !expanded
    expandBtn.setAttribute('aria-pressed', expanded ? 'true' : 'false')
    if (typeof workspace.setExpanded === 'function') workspace.setExpanded(expanded)
  })
  toolbar.appendChild(expandBtn)
  previewSection.appendChild(toolbar)
  const stage = el('div', { className: 'creation-preview__stage creation-element-stage' })
  stage.appendChild(preview)
  previewSection.appendChild(stage)
  if (footer) {
    const pf = renderPreviewFooter({ children: footer, lang })
    previewSection.appendChild(pf)
  }

  const workspace = renderCreationWorkspace({
    settings: settingsSection,
    preview: previewSection,
    gallery,
    lang,
  })
  return workspace
}

function useProEditor(kind, lang) {
  const state = {
    design: elementDefaults(kind),
    preview: '',
    error: '',
    busy: false,
    addLock: false,
  }
  let active = true
  let onUpdate = () => {}
  const setDesign = (updater) => {
    state.design = typeof updater === 'function' ? updater(state.design) : updater
    void refresh()
    onUpdate()
  }
  const patch = (v) => setDesign((d) => ({ ...d, ...v }))
  let renderVersion=0
  async function refresh() {
    const version=++renderVersion
    try {
      setRenderLanguage(lang)
      const src = await renderElement(state.design)
      if (!active||version!==renderVersion) return
      state.preview = src
      state.error = ''
    } catch (e) {
      if (!active||version!==renderVersion) return
      state.preview = ''
      state.error = e && e.message ? e.message : String(e)
    }
    onUpdate()
  }
  async function add(){
    if(state.addLock||state.busy)return
    state.addLock=true;state.busy=true;state.error='';onUpdate()
    try{setRenderLanguage(lang);const design={...state.design},src=await renderElement(design),{w,h}=elementSize(design);addLocalGenerated({...design,src,width:w,height:h,id:crypto.randomUUID()})}
    catch(e){state.error=e?.message||String(e)}finally{state.addLock=false;state.busy=false;onUpdate()}
  }
  function download() {if(state.preview&&!state.error)downloadDataURL(state.preview,elementFilename(kind,state.design.text))}
  function dispose() { active = false }
  return {
    state,
    patch,
    setDesign,
    add,
    download,
    dispose,
    setOnUpdate: (fn) => { onUpdate = fn },
    refresh,
  }
}

function buildTabs({ sub, onNavigate, lang }) {
  const SUBS = ['Post-it', 'Letter', 'Messages', 'Date']
  const group = el('div', { className: 'switch pro-subtabs', role: 'group', 'aria-label': 'Message format' })
  for (const option of SUBS) {
    const btn = el('button', {
      type: 'button',
      className: sub === option ? 'switch__on' : '',
      'aria-pressed': sub === option ? 'true' : 'false',
      onClick: () => onNavigate('/generator/pro?type=Message&sub=' + option),
    }, [option])
    if (option !== 'Post-it') {
      btn.appendChild(el('small', { className: 'pro-tag' }, ['PRO']))
    }
    group.appendChild(btn)
  }
  return group
}

function buildGallery(lang) {
  return renderGeneratedGallery({
    kind: 'Message',
    title: 'Message Gallery',
    lang,
    pro: true,
    pageSize: 7,
  })
}

function buildActions({ busy, preview, error, design, onDownload, onAdd, downloadLabel, addDisabled,downloadDisabled }) {
  const row = el('div', { className: 'row row--actions' })
  const dl = el('button', {
    className: 'btn btn--white',
    disabled: downloadDisabled!=null?downloadDisabled:busy || !preview,
    onClick: onDownload,
  }, [downloadLabel])
  row.appendChild(dl)
  const add = el('button', {
    className: 'btn btn--rose',
    disabled: addDisabled != null ? addDisabled : (busy || !!error || !preview || !design.text.trim()),
    onClick: onAdd,
  }, ['+ Add to Gallery'])
  row.appendChild(add)
  return row
}

function renderLetterEditor({ sub, lang, onNavigate }) {
  const editor = useProEditor('Letter', lang)
  const fr = lang === 'fr'
  const root = el('div')
  let letterFontTouched = false
  let zoomCleanup = null

  const rebuild = () => {
    const { design, preview, error, busy } = editor.state
    const extras = new Set(design.letterExtras || [])
    const toggleExtra = (extra) => {
      const next = extras.has(extra)
        ? [...extras].filter((e) => e !== extra)
        : [...extras, extra]
      editor.patch({ letterExtras: next })
    }
    const EXTRA_LABELS = [
      ['capital', 'Illuminated capital'],
      ['seal', 'Wax seal'],
      ['ornaments', 'Ornaments'],
    ]

    const tabs = buildTabs({ sub, onNavigate, lang })

    const settingsFrag = document.createDocumentFragment()
    settingsFrag.appendChild(tabs)
    settingsFrag.appendChild(document.createTextNode(' '))

    const controls = el('div', { className: 'controls element-controls' })

    const textLabel = el('label', {}, ['Letter text'])
    const textarea = el('textarea', {
      placeholder: 'Write your letter...',
      maxLength: 1200,
      value: design.text,
      onInput: (e) => editor.patch({ text: e.target.value }),
    })
    textLabel.appendChild(textarea)
    controls.appendChild(textLabel)

    const letterRow = el('div', { className: 'pro-letter-row' })
    const dateLabel = el('label', {}, ['Date line (optional)'])
    const dateInput = el('input', {
      value: design.letterDate || '',
      maxLength: 40,
      placeholder: fr ? 'Ex. 12 octobre 2026' : 'Ex. 12 October 2026',
      onInput: (e) => editor.patch({ letterDate: e.target.value }),
    })
    dateLabel.appendChild(dateInput)
    letterRow.appendChild(dateLabel)
    letterRow.appendChild(scrollMenu({
      label: fr ? 'Taille' : 'Size',
      value: design.textSize,
      shown: `${design.textSize} px`,
      options: sizeChoices(14, 36, design.textSize).map((n) => ({ value: n, label: `${n} px` })),
      onPick: (textSize) => editor.patch({ textSize }),
    }))
    controls.appendChild(letterRow)

    controls.appendChild(scrollMenu({
      label: fr ? 'Police' : 'Font',
      value: design.letterFont || 'Calligraphy',
      shown: fr && letterFontTouched ? ({Calligraphy:'Calligraphie',Flourish:'Fioritures',Gothic:'Gothique',Classic:'Classique'}[design.letterFont || 'Calligraphy']) : design.letterFont || 'Calligraphy',
      options: ['Calligraphy', 'Flourish', 'Gothic', 'Classic'].map((f) => ({
        value: f,
        label: f,
        style: { fontFamily: LETTER_FONT_FAMILY[f] },
      })),
      onPick: (v) => {letterFontTouched=true;editor.patch({ letterFont: v })},
    }))

    controls.appendChild(pills({
      label: 'Paper',
      options: ['Parchment', 'Aged', 'Scroll', 'Plain'],
      value: design.letterPaper || 'Parchment',
      onChange: (v) => editor.patch({ letterPaper: v }),
    }))

    const extrasGroup = el('div', { className: 'switch', role: 'group', 'aria-label': 'Extras' })
    for (const [extra, label] of EXTRA_LABELS) {
      extrasGroup.appendChild(el('button', {
        type: 'button',
        className: extras.has(extra) ? 'switch__on' : '',
        'aria-pressed': extras.has(extra) ? 'true' : 'false',
        onClick: () => toggleExtra(extra),
      }, [label]))
    }
    controls.appendChild(el('div', { className: 'pro-control' }, [
      el('span', { className: 'pro-control__label' }, ['Extras']),
      extrasGroup,
    ]))

    if (error) {
      controls.appendChild(el('p', { role: 'alert', className: 'note' }, [error]))
    }
    settingsFrag.appendChild(controls)
    settingsFrag.appendChild(el('div', { className: 'controls element-controls pro-actions' }))

    const previewFrag = document.createDocumentFragment()
    previewFrag.appendChild(document.createTextNode(' '))
    const zone = el('div', {
      className: 'element-preview morph-object pro-letter-zone',
      role: 'button',
      tabIndex: 0,
      'aria-label': 'Enlarge letter preview',
      title: 'Click to enlarge',
      onClick: () => {
        if (editor.state.preview) openZoom()
      },
      onKeyDown: (e) => {
        if (['Enter', ' '].includes(e.key)) {
          e.preventDefault()
          if (editor.state.preview) openZoom()
        }
      },
    })
    const artwork = el('div', { className: 'element-artwork element-artwork--letter' })
    if (preview) {
      artwork.appendChild(el('img', {
        src: preview,
        alt: 'Letter preview',
        style: { width: '190px', height: '269px', borderRadius: '4px' },
      }))
    }
    zone.appendChild(artwork)
    previewFrag.appendChild(zone)

    const actions = buildActions({
      busy,
      preview,
      error,
      design,
      onDownload: () => editor.download(),
      onAdd: () => void editor.add(),
      downloadLabel: 'Download letter',
    })

    const layout = creationLayout({
      title: 'Letter',
      settings: settingsFrag,
      preview: previewFrag,
      actions,
      gallery: buildGallery(lang),
      onReset: () => editor.setDesign({ ...elementDefaults('Letter') }),
      lang,
    })

    replaceEditorChildren(root,layout)
    if (lang === 'fr') applyFrenchTree(root)
  }

  function openZoom() {
    if (zoomCleanup) zoomCleanup()
    const { node, cleanup } = letterZoom({
      preview: editor.state.preview,
      onClose: () => { cleanup(); zoomCleanup = null },
    })
    zoomCleanup = cleanup
    document.body.appendChild(node)
  }

  editor.setOnUpdate(rebuild)
  rebuild()
  void editor.refresh()

  const observer = new MutationObserver(() => {
    if (!root.isConnected) {
      editor.dispose()
      if (zoomCleanup) zoomCleanup()
      observer.disconnect()
    }
  })
  queueMicrotask(() => {
    if (root.parentNode) observer.observe(root.parentNode, { childList: true })
  })

  return root
}

function renderDateEditor({ sub, lang, onNavigate }) {
  const editor = useProEditor('Date', lang)
  const root = el('div')

  // Initial defaults: subtitle = today, dateStyle = Calendar
  if (!editor.state.design.subtitle || !editor.state.design.subtitle.trim()) {
    editor.state.design = { ...editor.state.design, subtitle: todayDateLabel() }
  }
  if (editor.state.design.dateStyle !== 'Calendar') {
    editor.state.design = { ...editor.state.design, dateStyle: 'Calendar' }
  }

  const rebuild = () => {
    const { design, preview, error, busy } = editor.state
    const tabs = buildTabs({ sub, onNavigate, lang })

    const settingsFrag = document.createDocumentFragment()
    settingsFrag.appendChild(tabs)
    settingsFrag.appendChild(document.createTextNode(' '))

    const controls = el('div', { className: 'controls element-controls' })

    const fieldRow = el('div', { className: 'pro-fieldrow' })
    const wordLabel = el('label', {}, ['Word'])
    wordLabel.appendChild(el('input', {
      value: design.text,
      maxLength: 40,
      placeholder: 'Our day',
      onInput: (e) => editor.patch({ text: e.target.value }),
    }))
    fieldRow.appendChild(wordLabel)
    const dateLabel = el('label', {}, ['Date'])
    dateLabel.appendChild(el('input', {
      value: design.subtitle,
      maxLength: 30,
      placeholder: '12 October 2024',
      onInput: (e) => editor.patch({ subtitle: e.target.value }),
    }))
    fieldRow.appendChild(dateLabel)
    controls.appendChild(fieldRow)

    controls.appendChild(renderTextStyleMenus({
      font: design.textFont,
      size: design.textSize,
      defaultFontLabel: 'Georgia (original)',
      minSize: 12,
      maxSize: 72,
      onFont: (textFont) => editor.patch({ textFont }),
      onSize: (textSize) => editor.patch({ textSize }),
      up: false,
      lang,
    }))

    const colourRow = el('div', { className: 'pro-colorrow', role: 'group', 'aria-label': 'Calendar colour' })
    for (const colour of ['#171717', '#7A2E2E', '#2E4A7A', '#2E5D3A', '#6B4E8E']) {
      colourRow.appendChild(el('button', {
        type: 'button',
        className: 'pro-swatch',
        'aria-label': `Calendar colour ${colour}`,
        'aria-pressed': (design.dateColor || '#171717') === colour ? 'true' : 'false',
        style: { background: colour },
        onClick: () => editor.patch({ dateColor: colour }),
      }))
    }
    colourRow.appendChild(el('input', {
      type: 'color',
      'aria-label': 'Custom calendar colour',
      title: 'Custom calendar colour',
      value: design.dateColor || '#171717',
      onInput: (e) => editor.patch({ dateColor: e.target.value }),
    }))
    controls.appendChild(el('div', { className: 'pro-control' }, [
      el('span', { className: 'pro-control__label' }, ['Colour']),
      colourRow,
    ]))

    controls.appendChild(el('div', { className: 'row' }))

    if (error) {
      controls.appendChild(el('p', { role: 'alert', className: 'note' }, [error]))
    }
    settingsFrag.appendChild(controls)

    const previewFrag = document.createDocumentFragment()
    previewFrag.appendChild(document.createTextNode(' '))
    const previewWrap = el('div', { className: 'element-preview pro-preview--date morph-object' })
    const artwork = el('div', { className: 'element-artwork' })
    if (preview) {
      artwork.appendChild(el('img', {
        src: preview,
        alt: 'Date card preview',
        style: {
          width: design.dateStyle === 'Calendar' ? '169px' : '210px',
          height: design.dateStyle === 'Calendar' ? '190px' : '263px',
          borderRadius: '8px',
        },
      }))
    }
    previewWrap.appendChild(artwork)
    previewFrag.appendChild(previewWrap)

    const actions = buildActions({
      busy,
      preview,
      error,
      design,
      onDownload: () => editor.download(),
      onAdd: () => void editor.add(),
      downloadLabel: 'Download card',
    })

    const layout = creationLayout({
      title: 'Date',
      settings: settingsFrag,
      preview: previewFrag,
      actions,
      gallery: buildGallery(lang),
      onReset: () => editor.setDesign({ ...elementDefaults('Date') }),
      lang,
    })

    replaceEditorChildren(root,layout)
    if (lang === 'fr') applyFrenchTree(root)
  }

  editor.setOnUpdate(rebuild)
  rebuild()
  void editor.refresh()

  const observer = new MutationObserver(() => {
    if (!root.isConnected) {
      editor.dispose()
      observer.disconnect()
    }
  })
  queueMicrotask(() => {
    if (root.parentNode) observer.observe(root.parentNode, { childList: true })
  })

  return root
}

function renderScreenshotEditor({ sub, lang, onNavigate }) {
  const editor = useProEditor('Messages', lang)
  const root = el('div')
  let uploadOpen = false
  let phoneOpen = false
  let fileInput = null

  const rebuild = () => {
    const { design, preview, error, busy } = editor.state
    const tabs = buildTabs({ sub, onNavigate, lang })

    const settingsFrag = document.createDocumentFragment()
    settingsFrag.appendChild(tabs)
    settingsFrag.appendChild(document.createTextNode(' '))

    const uploadBtn = el('button', {
      className: 'btn btn--white',
      onClick: () => {uploadOpen=true;rebuild()},
    }, ['Upload screenshot'])
    settingsFrag.appendChild(uploadBtn)
    settingsFrag.appendChild(el('button', {
      className: 'btn btn--white',
      onClick: () => { phoneOpen = true; rebuild() },
    }, ['Phone']))

    const controls = el('div', { className: 'controls element-controls' })
    fileInput = el('input', {
      type: 'file',
      hidden: true,
      accept: 'image/*',
      onChange: (e) => {
        const f = e.target.files && e.target.files[0]
        e.target.value = ''
        if (f) void handleUpload(f)
      },
    })
    controls.appendChild(fileInput)

    if (error) {
      controls.appendChild(el('p', { role: 'alert', className: 'note' }, [error]))
    }
    settingsFrag.appendChild(controls)

    const previewFrag = document.createDocumentFragment()
    previewFrag.appendChild(document.createTextNode(' '))
    const zone = el('div', {
      className: 'element-preview morph-object pro-shot-zone',
      role: 'button',
      tabIndex: 0,
      'aria-label': 'Upload a message screenshot',
      onClick: () => { uploadOpen = true; rebuild() },
      onKeyDown: (e) => {
        if (['Enter', ' '].includes(e.key)) {
          e.preventDefault()
          uploadOpen = true
          rebuild()
        }
      },
    })
    zone.appendChild(el('span', { className: 'pro-shot-zone__label' }, ['Screenshot preview']))
    const artwork = el('div', { className: 'element-artwork' })
    if (preview) {
      artwork.appendChild(el('img', {
        src: preview,
        alt: 'Message screenshot preview',
        className: 'pro-shot-zone__img',
      }))
    } else {
      artwork.appendChild(el('span', { className: 'pro-shot-zone__hint' }, ['Tap to upload a screenshot']))
    }
    zone.appendChild(artwork)
    previewFrag.appendChild(zone)

    const actions = buildActions({
      busy,
      preview,
      error,
      design,
      onDownload: () => editor.download(),
      onAdd: () => void editor.add(),
      downloadLabel: 'Download',downloadDisabled:busy||!design.image,
      addDisabled: busy || !design.image,
    })

    const layout = creationLayout({
      title: 'Messages',
      settings: settingsFrag,
      preview: previewFrag,
      actions,
      gallery: buildGallery(lang),
      onReset: () => editor.setDesign({ ...elementDefaults('Messages') }),
      lang,
    })

    replaceEditorChildren(root,layout)
    if(uploadOpen)root.prepend(renderLocalUploadChooser({lang,onClose:()=>{uploadOpen=false;rebuild()},onComputer:()=>{uploadOpen=false;rebuild();fileInput?.click()},onPhone:()=>{uploadOpen=false;phoneOpen=true;rebuild()},onFiles:async files=>files[0]?await handleUpload(files[0]):false}))

    if (lang === 'fr') applyFrenchTree(root)
  }

  async function handleUpload(file){
    editor.state.error=''
    const invalid=validatePhotoFile(file);if(invalid){editor.state.error=invalid;rebuild();return false}
    try{const photo=await readPhoto(file);const data=await new Promise((ok,no)=>{const reader=new FileReader();reader.onload=()=>ok(String(reader.result));reader.onerror=()=>no(Error('Could not read file.'));reader.readAsDataURL(file)});URL.revokeObjectURL(photo.src);editor.patch({image:data});return true}
    catch(e){editor.state.error=e?.message||String(e);rebuild();return false}
  }

  editor.setOnUpdate(rebuild)
  rebuild()
  void editor.refresh()

  const observer = new MutationObserver(() => {
    if (!root.isConnected) {
      editor.dispose()
      observer.disconnect()
    }
  })
  queueMicrotask(() => {
    if (root.parentNode) observer.observe(root.parentNode, { childList: true })
  })

  return root
}

export function renderProMessageEditor({ sub = 'Letter', lang = 'en', onNavigate = () => {} } = {}) {
  if (sub === 'Letter') return renderLetterEditor({ sub, lang, onNavigate })
  if (sub === 'Date') return renderDateEditor({ sub, lang, onNavigate })
  if (sub === 'Messages') return renderScreenshotEditor({ sub, lang, onNavigate })
  // Post-it is handled by the existing ElementEditor; return empty container.
  return el('div')
}