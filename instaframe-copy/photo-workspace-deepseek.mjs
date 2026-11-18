import {showLocalPhoneUnavailable,renderLocalImportedPhotoPicker} from "./local-import-dialogs.mjs";
import {frenchTree} from './translate-dom.mjs';
// src/components/photo-creation-workspace.mjs
import {
  renderFrameCard,
  renderTextStyleMenus,
  renderCreationWorkspace,
  renderPreviewFooter,
  renderGeneratedGallery,
  PreviewExpandIcon,
} from './generator-page-deepseek.mjs'
import { readPhoto, validatePhotoFile, renderFramePng, filterPhoto,stripLayout } from './current-rendering-helpers.mjs'
import { renderLocalUploadChooser } from './upload-chooser-deepseek.mjs'
import { localGenerated, addLocalGenerated, downloadDataURL, elementFilename, openLocalDownloadChooser } from './local-gallery-deepseek.mjs'

const FRAME_SPECS = {
  'instax-mini': { label: 'Instax Mini', card: { w: 4.47, h: 7.12 } },
  polaroid: { label: 'Polaroid', card: { w: 4.48, h: 4.43 } },
}
const FRAME_FORMATS = Object.keys(FRAME_SPECS)
const MIN_CAPTION_SIZE = 12
const MAX_CAPTION_SIZE = 40
const DEFAULT_CAPTION_SIZE = 24
const clampZoom = (z) => Math.min(4, Math.max(1, Number.isFinite(z) ? z : 1))
const clampCaptionSize = (n) =>
  Math.min(MAX_CAPTION_SIZE, Math.max(MIN_CAPTION_SIZE, Number.isFinite(n) ? Math.round(n) : DEFAULT_CAPTION_SIZE))

const el = (tag, attrs, children) => {
  const node = document.createElement(tag)
  if (attrs) for (const k in attrs) {
    const v = attrs[k]
    if (v == null || v === false) continue
    if (k === 'class') node.className = v
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v)
    else if (v === true) node.setAttribute(k, '')
    else node.setAttribute(k, String(v))
  }
  if (children) for (const c of children) {
    if (c == null || c === false) continue
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return node
}
const svgEl = (tag, attrs) => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag)
  if (attrs) for (const k in attrs) node.setAttribute(k, String(attrs[k]))
  return node
}

const newFrame = (format = 'instax-mini') => ({
  format,
  photo: null,
  zoom: 1,
  pan: { x: 0.5, y: 0.5 },
  caption: '',
  captionSize: DEFAULT_CAPTION_SIZE,
  captionFont: undefined,
})

export function renderLocalPhotoWorkspace({ lang = 'en', onNavigate = () => {}, pro = false,initialStrip=0 } = {}) {
  const fr = lang === 'fr'
  const frames = [newFrame()]
  const importedPool=[]
  let stripCount=0;
  let index = 0
  let filterBusy = false
  let busy = false
  let importing = false
  let error = null
  let expanded = false
  let hintOn = false
  let hintTimer = 0
  let addLock = false
  let filterRequest = 0
  let unit = 45
  let disposed = false

  const current = () => frames[Math.min(index, frames.length - 1)]
  const hasPhoto = () => stripCount>=2?!!current().stripPhotos?.length:!!current().photo

  // ---- DOM skeleton (built once, mutated in place) ----
  const settings = el('section', { class: 'creation-settings', 'aria-label': 'Photo settings' })
  const head = el('header', { class: 'creation-settings__head' })
  head.appendChild(el('h2', null, ['Photo']))
  head.appendChild(el('p', null, ['Import a photo and choose its frame.']))
  const formatSwitch = el('div', { class: 'switch frame-format-switch', role: 'group', 'aria-label': 'Frame format' })
  const formatButtons = {}
  for (const f of FRAME_FORMATS) {
    const btn = el('button', {
      class: current().format === f ? 'switch__on' : '',
      'aria-pressed': current().format === f ? 'true' : 'false',
      onclick: () => {
        current().format = f
        for (const k in formatButtons) {
          formatButtons[k].className = k === f ? 'switch__on' : ''
          formatButtons[k].setAttribute('aria-pressed', k === f ? 'true' : 'false')
        }
        recomputeUnit();redrawPreview()
      },
    }, [FRAME_SPECS[f].label])
    formatButtons[f] = btn
    formatSwitch.appendChild(btn)
  }
  head.appendChild(formatSwitch)
  settings.appendChild(head)

  const body = el('div', { class: 'creation-settings__body' })

  // Photos details
  const photosDetails = el('details', { open: '' })
  photosDetails.appendChild(el('summary', null, ['Photos']))
  let uploadHost = el('div')
  photosDetails.appendChild(uploadHost)
  const phoneBtn = el('button', { type: 'button', class: 'btn btn--white', onclick: () => showLocalPhoneUnavailable({lang,host:workspace.closest('.app')||workspace}) }, [fr ? 'Téléphone' : 'Phone'])
  photosDetails.appendChild(phoneBtn)
  const fileInput = el('input', {
    type: 'file',
    accept: 'image/*',
    multiple: '',
    hidden: '',
    'aria-label': 'Upload photo',
  })
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    void addFiles(files)
  })
  photosDetails.appendChild(fileInput)
  const importingStatus = el('p', { role: 'status' })
  importingStatus.style.display = 'none'
  photosDetails.appendChild(importingStatus)
  body.appendChild(photosDetails)

  // Layout details
  const layoutDetails = el('details', { open: '' })
  const layoutSummary = el('summary')
  layoutSummary.appendChild(document.createTextNode('Layout '))
  layoutSummary.appendChild(el('small', { 'data-no-i18n': '' }, [fr ? 'Bande = Premium' : 'Strip = Premium']))
  layoutDetails.appendChild(layoutSummary)
  const layoutRow = el('div', { class: 'creation-layout',...(pro?{role:'group','aria-label':'Format'}:{}) })
  layoutRow.appendChild(el(pro?'button':'span', { class: 'creation-pill',...(pro?{'aria-pressed':'true',onclick:()=>setStripMode(0)}:{}) }, ['Single']))
  for (const n of [3, 4, 5]) {
    layoutRow.appendChild(el('button', {
      type: 'button',
      onclick: () => pro?setStripMode(n):onNavigate('/generator/pro?strip=' + n),
    }, [...(pro?[`Strip ${n}`,' ']:['x',String(n),' ']), el('small', { class: 'pro-tag' }, ['PRO'])]))
  }
  layoutDetails.appendChild(layoutRow)
  body.appendChild(layoutDetails)

  // Filter details
  const filterDetails = el('details', {})
  const filterSummary = el('summary')
  filterSummary.appendChild(document.createTextNode('Filter'))
  const filterHint = el('small', null, [fr ? 'après import' : 'after import'])
  filterSummary.appendChild(filterHint)
  filterDetails.appendChild(filterSummary)
  const filterHost = el('div')
  filterDetails.appendChild(filterHost)
  body.appendChild(filterDetails)

  const errorEl = el('p', { role: 'alert' })
  errorEl.style.display = 'none'
  body.appendChild(errorEl)

  settings.appendChild(body)

  // Actions
  const actions = el('footer', { class: 'creation-settings__actions' })
  const downloadBtn = el('button', {
    class: 'btn btn--white',
    'aria-disabled': 'true',
    disabled: '',
    onclick: () => openDownload(),
  }, ['Download'])
  const addBtn = el('button', {
    class: 'btn btn--rose',
    'aria-disabled': 'true',
    disabled: '',
    onclick: () => addToGallery(),
  }, ['+ Add to Gallery'])
  actions.appendChild(downloadBtn)
  actions.appendChild(addBtn)
  settings.appendChild(actions)

  // Preview
  const preview = el('section', { class: 'creation-preview', 'aria-label': 'Photo preview' })
  const toolbar = el('div', { class: 'creation-toolbar' })
  const zoomOut = el('button', {
    'aria-label': 'Zoom out',
    disabled: '',
    onclick: () => changeZoom(-0.1),
  }, ['−'])
  const zoomLabel = el('span', { 'data-no-i18n': '' }, ['100 %'])
  const zoomIn = el('button', {
    'aria-label': 'Zoom in',
    disabled: '',
    onclick: () => changeZoom(0.1),
  }, ['+'])
  const resetBtn = el('button', {
    class: 'creation-toolbar__reset',
    onclick: () => resetCurrent(),
  }, ['Reset'])
  const expandBtn = el('button', {
    'aria-label': 'Enlarge preview',
    'aria-pressed': 'false',
    onclick: () => toggleExpanded(),
  }, [PreviewExpandIcon()])
  toolbar.appendChild(zoomOut)
  toolbar.appendChild(zoomLabel)
  toolbar.appendChild(zoomIn)
  toolbar.appendChild(resetBtn)
  toolbar.appendChild(expandBtn)
  preview.appendChild(toolbar)

  const stage = el('div', { 'data-tour': 'frames', class: 'creation-preview__stage' })
  stage.style.setProperty('--u', `${unit}px`)
  preview.appendChild(stage)

  const hintEl = el('span', { class: 'creation-preview__hint', 'aria-hidden': 'true' }, [fr?'Glisser pour recadrer':'Drag to reposition'])
  hintEl.style.opacity = '0'
  stage.appendChild(hintEl)

  let textStyleHost = el('div')
  preview.appendChild(textStyleHost)

  let footerHost = el('div')
  preview.appendChild(footerHost)

  // ---- helpers ----
  function setError(msg) {
    error = msg
    if (msg) {
      errorEl.textContent = msg
      errorEl.style.display = ''
    } else {
      errorEl.textContent = ''
      errorEl.style.display = 'none'
    }
  }

  function setImporting(v) {
    importing = v
    importingStatus.textContent = v ? 'Loading photo…' : ''
    importingStatus.style.display = v ? '' : 'none'
  }

  function updateActionState() {
    const hp = hasPhoto()
    const disabled = !hp || busy || filterBusy
    downloadBtn.disabled = disabled
    downloadBtn.setAttribute('aria-disabled', hp ? 'false' : 'true')
    addBtn.disabled = !hp || filterBusy
    addBtn.setAttribute('aria-disabled', hp ? 'false' : 'true')
    zoomOut.disabled = !hp
    zoomIn.disabled = !hp
  }

  function setStripMode(n){const c=current();stripCount=n;if(n>=2)c.stripPhotos=(c.stripPhotos||(c.photo?[{photo:c.photo,zoom:c.zoom,pan:c.pan}]:[])).slice(0,n);else{const f=c.stripPhotos?.[0];if(f)Object.assign(c,{photo:f.photo,zoom:f.zoom,pan:f.pan});delete c.stripPhotos}for(const [i,b]of [...layoutRow.children].entries()){const active=i===0?n===0:n===i+2;b.className=active?'creation-pill':'';b.setAttribute('aria-pressed',String(active))}recomputeUnit();redrawAll()}
  function updateUploadArea() {
    uploadHost.innerHTML = ''
    const c = current()
    if (hasPhoto()) {
      const btn = el('button', {
        'data-tour': 'upload',
        class: 'creation-upload creation-upload--filled',
        onclick: () => openUpload(),
      })
      const img = el('img', { src: (c.photo||c.stripPhotos?.[0]?.photo).src, alt: '' })
      btn.appendChild(img)
      const count = new Set([...importedPool,...localGenerated.filter(f=>f.frame).map(f=>f.frame.photo)].filter(Boolean).map(p=>p.assetId||p.src)).size
      btn.appendChild(el('span', { 'data-no-i18n': '' }, [
        fr
          ? `${count} photo${count === 1 ? '' : 's'} disponible${count === 1 ? '' : 's'}`
          : `${count} available photo${count === 1 ? '' : 's'}`,
      ]))
      btn.appendChild(el('strong', null, [fr ? 'Changer' : 'Change']))
      uploadHost.replaceWith(btn);uploadHost=btn
    } else {
      const btn = el('button', {
        'data-tour': 'upload',
        class: 'creation-upload',
        onclick: () => openUpload(),
        ondragover: (e) => e.preventDefault(),
        ondrop: (e) => {
          e.preventDefault()
          const f = e.dataTransfer.files[0]
          if (f) void addFiles([f])
        },
      })
      const svg = svgEl('svg', {
        viewBox: '0 0 24 24', width: '20', height: '20',
        fill: 'none', stroke: 'currentColor', 'stroke-width': '1.7',
      })
      svg.appendChild(svgEl('path', { d: 'M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5' }))
      btn.appendChild(svg)
      btn.appendChild(el('small', null, [fr ? 'Importer une photo' : 'Import a photo']))
      uploadHost.replaceWith(btn);uploadHost=btn
    }
  }

  function updateFilterArea() {
    filterHost.innerHTML = ''
    const c = current()
    filterHint.style.display=stripCount?'none':''
    if (c.photo && !stripCount) {
      filterHint.style.display = 'none'
      filterDetails.open = true
      filterHost.appendChild(renderFilterStrip(c.photo))
    } else {
      filterHint.style.display = hasPhoto()?'none':''
      if(stripCount&&hasPhoto())filterDetails.open=true
      filterHost.appendChild(el('p', { class: 'creation-muted' }, [stripCount?(fr?'Les filtres sont disponibles en mise en page Simple.':'Filters are available in Single layout.'):(fr?'Disponible après import':'Available after import')]))
    }
  }

  function renderFilterStrip(photo) {
    // Inline minimal filter strip (mirrors PhotoFilterStrip markup).
    const PHOTO_FILTERS = [{id:'original',en:'Original',fr:'Original'},{id:'mono',en:'B&W',fr:'N&B'},{id:'sepia',en:'Sepia',fr:'Sépia'},{id:'vintage',en:'Vintage',fr:'Vintage'},{id:'warm',en:'Warm',fr:'Chaud'},{id:'cool',en:'Cool',fr:'Froid'},{id:'fade',en:'Fade',fr:'Doux'},{id:'contrast',en:'Contrast',fr:'Contraste'}]

    const wrap = el('div', { 'data-no-i18n': '', class: 'photo-filters', role: 'group', 'aria-label': fr ? 'Filtres photo' : 'Photo filters' })
    const headEl = el('div', { class: 'photo-filters__head' })
    headEl.appendChild(el('span', null, [fr ? 'Filtres' : 'Filters']))
    headEl.appendChild(el('small', null, [fr ? 'Faites défiler' : 'Scroll to browse']))
    wrap.appendChild(headEl)
    const strip = el('div', { class: 'photo-filters__strip', tabIndex: '0' })
    const source = photo.originalSrc ?? photo.src
    for (const preset of PHOTO_FILTERS) {
      const btn = el('button', {
        type: 'button',
        disabled: filterBusy ? '' : null,
        'aria-pressed': (photo.filter ?? 'original') === preset.id ? 'true' : 'false',
        onclick: () => void applyFilter(preset.id),
      })
      const thumb = el('span', { class: 'photo-filters__thumb' })
      const img=el('img', { src: source, alt: '', draggable: 'false' });thumb.append(img)
      btn.appendChild(thumb)
      btn.appendChild(el('span', null, [fr ? preset.fr : preset.en]))
      strip.appendChild(btn)
      filterPhoto(photo,preset.id,160).then(p=>{if(img.isConnected)img.src=p.src}).catch(()=>{})
    }
    wrap.appendChild(strip)
    const bar=el('div',{class:'photo-filters__bar','aria-hidden':'true'},[el('span')]);wrap.append(bar);const sync=()=>{const extent=strip.scrollWidth,client=strip.clientWidth,max=extent-client,w=extent?Math.min(100,client/extent*100):100;bar.hidden=max<=1;Object.assign(bar.firstChild.style,{width:w+'%',left:(max>0?strip.scrollLeft/max*(100-w):0)+'%'})};strip.addEventListener('scroll',sync);requestAnimationFrame(sync);strip.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&strip.scrollWidth>strip.clientWidth){strip.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});strip.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();strip.scrollBy({left:e.key==='ArrowRight'?130:-130,behavior:'smooth'})}})
    return wrap
  }

  function updateThumbnailTray() {
    // Rebuild footer (tip vs tray).
    footerHost.innerHTML = ''
    if (hasPhoto()) {
      const footer = el('footer', { class: 'creation-preview__footer' })
      const tray = el('div', { class: 'creation-photos', role: 'group', 'aria-label': 'Photos' })
      frames.forEach((f, n) => {
        const btn = el('button', {
          class: n === index ? 'creation-photo--selected' : '',
          'aria-pressed': n === index ? 'true' : 'false',
          onclick: () => {
            index = n
            redrawAll()
          },
        })
        if (f.photo||f.stripPhotos?.[0]?.photo) {
          btn.appendChild(el('img', { src: (f.photo||f.stripPhotos[0].photo).src, alt: `Photo ${n + 1}` }))
        } else {
          btn.appendChild(el('span', null, [`Photo ${n + 1}`]))
        }
        tray.appendChild(btn)
      })
      tray.appendChild(el('button', {
        'aria-label': 'Add photos',
        onclick: () => openUpload(),
      }, ['+']))
      if (frames.length > 1) {
        tray.appendChild(el('button', {
          'aria-label': 'Remove this photo',
          onclick: () => removeCurrent(),
        }, ['×']))
      }
      footer.appendChild(tray)
      footerHost.replaceWith(footer);footerHost=footer
    } else {
      const footer = renderPreviewFooter({
        lang,
        children: el('p', { class: 'creation-tip' }, [
          (() => {
            const svg = svgEl('svg', {
              viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
              'stroke-width': '1.6', 'aria-hidden': 'true',
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
      footerHost.replaceWith(footer);footerHost=footer
    }
  }

  function updateTextStyle() {
    textStyleHost.innerHTML = ''
    const c = current()
    const menus = renderTextStyleMenus({
      font: c.captionFont,
      size: c.captionSize,
      defaultFontLabel: 'Helvetica',
      minSize: MIN_CAPTION_SIZE,
      maxSize: MAX_CAPTION_SIZE,
      onFont: (f) => {
        current().captionFont = f
        redrawPreview()
      },
      onSize: (n) => {
        current().captionSize = clampCaptionSize(n)
        redrawPreview()
      },
      lang,
    })
    textStyleHost.replaceWith(menus);textStyleHost=menus
  }

  function redrawPreview() {
    // Preserve focus/selection inside stage if possible.
    const active = document.activeElement
    const focusInStage = active && stage.contains(active)
    const selStart = focusInStage && typeof active.selectionStart === 'number' ? active.selectionStart : null
    const selEnd = focusInStage && typeof active.selectionEnd === 'number' ? active.selectionEnd : null
    const activeTag = focusInStage ? active.tagName : null
    const activeDesc = focusInStage ? active.getAttribute('data-caption-input') : null

    // Remove old card (keep hintEl).
    stage.replaceChildren()

    const c = current()
    const card = renderFrameCard({
      frame: {
        stripPhotos:c.stripPhotos,
        format: c.format,
        photo: c.photo,
        zoom: c.zoom,
        pan: c.pan,
        caption: c.caption,
        captionSize: c.captionSize,
        captionFont: c.captionFont,
      },
      interactive: true,
      captionDescriptionId: 'creation-caption',
      lang,
      captionPlaceholder: stripCount?'Title':pro ? '' : 'Caption',
      stripTarget:stripCount,
      onStripPan:(i,pan)=>{current().stripPhotos[i].pan=pan;hintEl.style.opacity='0'},
      onStripZoom:(i,zoom)=>{current().stripPhotos[i].zoom=zoom;zoomLabel.textContent=`${Math.round((current().stripPhotos[0]?.zoom||1)*100)} %`},
      onStripPickFile:()=>openUpload(),
      onStripDropFile:async(i,file)=>{const invalid=validatePhotoFile(file);if(invalid){setError(invalid);return}try{const photo=await readPhoto(file);importedPool.push(photo);const list=current().stripPhotos||[];if(i<list.length)list[i]={photo,zoom:1,pan:{x:.5,y:.5}};else list.push({photo,zoom:1,pan:{x:.5,y:.5}});current().stripPhotos=list.slice(0,stripCount);redrawAll()}catch(e){setError(e.message)}},
      onCaption: (v) => {
        current().caption = v
      },
      onPan: (p) => {
        current().pan = p
        hintOn = false
        hintEl.style.opacity = '0'
        const img=stage.querySelector('.frame__photo img'),spec=({ 'instax-mini':{w:3.81,h:5.13},polaroid:{w:4.08,h:3.37}})[current().format]
        if(img&&current().photo){const photo=current().photo,ratio=Math.max(spec.w/photo.width,spec.h/photo.height)*current().zoom,dw=photo.width*ratio,dh=photo.height*ratio;img.style.left=`${-(dw-spec.w)*p.x/spec.w*100}%`;img.style.top=`${-(dh-spec.h)*p.y/spec.h*100}%`}

      },
      onZoom: (z) => {
        current().zoom = clampZoom(z)
        redrawPreview()
      },
      onPickFile: () => openUpload(),
      onDropFile: (file) => void addFiles([file]),
    })
    stage.appendChild(card);if(hasPhoto())stage.appendChild(hintEl);else hintEl.remove()

    zoomLabel.textContent = `${Math.round((stripCount?(current().stripPhotos?.[0]?.zoom||1):current().zoom) * 100)} %`

    // Restore focus if it was inside the stage.
    if (focusInStage && activeTag) {
      const candidates = stage.querySelectorAll(activeTag.toLowerCase())
      for (const node of candidates) {
        if (activeDesc && node.getAttribute('data-caption-input') === activeDesc) {
          node.focus()
          if (selStart != null && typeof node.setSelectionRange === 'function') {
            try { node.setSelectionRange(selStart, selEnd) } catch {}
          }
          break
        }
      }
    }

    updateTextStyle()
    updateThumbnailTray()
    updateActionState()
  }

  function redrawAll() {
    updateUploadArea()
    updateFilterArea()
    redrawPreview()
  }

  function changeZoom(amount) {
    if(stripCount)for(const p of current().stripPhotos||[])p.zoom=clampZoom(p.zoom+amount);else current().zoom = clampZoom(current().zoom + amount)
    redrawPreview()
  }

  function resetCurrent() {
    const c = current()
    if(stripCount){for(const p of c.stripPhotos||[]){p.zoom=1;p.pan={x:.5,y:.5}}c.captionSize=DEFAULT_CAPTION_SIZE;redrawPreview();return}
    c.zoom = 1
    c.pan = { x: 0.5, y: 0.5 }
    c.captionSize = DEFAULT_CAPTION_SIZE
    if (c.photo) void applyFilter('original')
    else redrawPreview()
  }

  function removeCurrent() {
    if (frames.length <= 1) {
      const f = frames[0]
      f.photo = null
      f.caption = ''
      f.zoom = 1
      f.pan = { x: 0.5, y: 0.5 }
    } else {
      frames.splice(index, 1)
      index = Math.max(0, Math.min(index, frames.length - 1))
    }
    redrawAll()
  }

  function toggleExpanded() {
    expanded = !expanded
    expandBtn.setAttribute('aria-pressed', expanded ? 'true' : 'false')
    expandBtn.setAttribute('aria-label', expanded ? 'Close enlarged preview' : 'Enlarge preview')
    workspace.classList.toggle('creation-workspace--expanded', expanded)
    // Recompute unit.
    recomputeUnit()
  }

  function recomputeUnit() {
    const spec = FRAME_SPECS[current().format]
    const w = stage.clientWidth
    const h = stage.clientHeight
    if (w > 0 && h > 0) {
      unit = Math.max(1, Math.min((w - 32) / spec.card.w, (h - 32) / (stripCount?stripLayout(current().format,stripCount).cardH:spec.card.h)))
      stage.style.setProperty('--u', `${unit}px`)
    }
  }

  async function addFiles(files) {
    if (!files.length) return false
    setImporting(true)
    let problem = null
    const photos = []
    try {
      for (const file of files) {
        const invalid = validatePhotoFile(file)
        if (invalid) { problem = invalid; continue }
        try {
          photos.push(await readPhoto(file))
        } catch (e) {
          problem = e instanceof Error ? e.message : 'Unable to read this photo.'
        }
      }
    } finally {
      setImporting(false)
    }
    setError(problem)
    if (!photos.length) return false
    usePhotos(photos)
    return true
  }

  function usePhotos(photos) {
    importedPool.push(...photos)
    if(stripCount>=2){const c=current(),existing=c.stripPhotos||(c.photo?[{photo:c.photo,zoom:c.zoom,pan:c.pan}]:[]),fresh=photos.map(photo=>({photo,zoom:1,pan:{x:.5,y:.5}}));c.stripPhotos=photos.length>1?fresh.slice(0,stripCount):existing.length<stripCount?[...existing,...fresh]:[...existing.slice(0,stripCount-1),...fresh];hintEl.style.opacity='1';if(hintTimer)clearTimeout(hintTimer);hintTimer=setTimeout(()=>hintEl.style.opacity='0',2600);redrawAll();return true}
    const firstImported = frames.length === 1 && frames[0].photo === null ? 0 : frames.length
    const template = frames[0]
    let fillFirst = firstImported === 0
    for (const photo of photos) {
      const base = fillFirst ? frames[0] : { ...template, caption: '', photo: null }
      const frame = { ...base, photo, zoom: 1, pan: { x: 0.5, y: 0.5 } }
      if (fillFirst) {
        frames[0] = frame
        fillFirst = false
      } else {
        frames.push(frame)
      }
    }
    index = firstImported
    hintOn=true;hintEl.style.opacity='1';if(hintTimer)clearTimeout(hintTimer);hintTimer=setTimeout(()=>{hintOn=false;hintEl.style.opacity='0'},2600);redrawAll()
  }

  async function applyFilter(id) {
    const c = current()
    if (!c.photo || filterBusy) return
    const request = ++filterRequest
    const target = index
    const source = c.photo
    filterBusy = true
    updateActionState()
    try {
      const photo = await filterPhoto(source, id)
      if (request === filterRequest && frames[target] && frames[target].photo === source) {
        frames[target].photo = photo;hintEl.style.opacity='1';if(hintTimer)clearTimeout(hintTimer);hintTimer=setTimeout(()=>{hintEl.style.opacity='0'},2600)
      }
      setError(null)
    } catch {
      setError('Could not apply this filter. Your photo has not changed. Try again or choose another photo.')
    } finally {
      if (request === filterRequest) {
        filterBusy = false
        redrawAll()
      }
    }
  }

  function stripReady(){if(stripCount&&current().stripPhotos?.length!==stripCount){setError(fr?'Remplis toutes les photos de la bande avant de l’ajouter ou de la télécharger.':'Fill every photo in the strip before adding or downloading it.');return false}return true}
  function addToGallery() {
    if(!stripReady())return
    const c = current()
    if (addLock || !hasPhoto() || filterBusy) return
    addLock = true
    void (async () => {
      try {
        const dataUrl = await renderFramePng(c, 1200)
        addLocalGenerated({
          kind: 'Frames',
          frame: {...c,pan:{...c.pan}},
          src: dataUrl,
          width: 1200,
          height: Math.round(1200 * ((stripCount?stripLayout(c.format,stripCount).cardH:FRAME_SPECS[c.format].card.h) / FRAME_SPECS[c.format].card.w)),
          text: c.caption,
          id: `frame-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        });updateUploadArea()
      } catch {
        setError('Could not add to gallery. Try again.')
      } finally {
        window.setTimeout(() => { addLock = false }, 400)
      }
    })()
  }

  function openDownload() {
    const c = current()
    if (!hasPhoto() || busy || filterBusy) return
    const host = workspace
    openLocalDownloadChooser({
      lang,
      files: async () => {
        if(!stripReady())throw Error('Fill every photo in the strip before adding or downloading it.');const data = await renderFramePng(c)
        const name = elementFilename(c.format,c.caption)
        return [{ name, data }]
      },
      onThisDevice: async () => {
        busy = true
        updateActionState()
        try {
          if(!stripReady())throw Error('Fill every photo in the strip before adding or downloading it.');const data = await renderFramePng(c)
          const name = elementFilename(c.format,c.caption)
          downloadDataURL(data, name)
          setError(null)
        } catch {
          setError('Export failed. Try again.')
        } finally {
          busy = false
          updateActionState()
        }
      },
      onClose: () => {},
      host,
    })
  }

  function availableLocalPhotos(){const found=[],seen=new Set();for(const photo of [...importedPool,...frames.flatMap(f=>[f.photo,...(f.stripPhotos||[]).map(s=>s.photo)]),...localGenerated.flatMap(f=>f.frame?[f.frame.photo,...(f.frame.stripPhotos||[]).map(s=>s.photo)]:[])]){if(!photo)continue;const key=photo.assetId||photo.src;if(!seen.has(key)){seen.add(key);found.push(photo)}}return found}
  function openUpload(){const available=availableLocalPhotos(),host=workspace.closest('.app')||workspace;const dialog=renderLocalUploadChooser({lang,onClose:()=>dialog?.remove(),onComputer:()=>{dialog?.remove();fileInput.click()},onPhone:()=>{dialog?.remove();showLocalPhoneUnavailable({lang,host})},onFiles:addFiles,existingPhotoCount:available.length,onReuse:available.length?()=>{dialog?.remove();host.append(renderLocalImportedPhotoPicker({lang,photos:available,count:stripCount,onUse:usePhotos}))}:undefined});if(dialog)host.append(dialog)}

  // ---- ResizeObserver ----
  const ro = new ResizeObserver(() => recomputeUnit())
  ro.observe(stage)

  // ---- Escape to close expanded ----
  const onKey = (e) => {
    if (e.key === 'Escape' && expanded) {
      toggleExpanded()
    }
  }
  document.addEventListener('keydown', onKey)

  // ---- Initial render ----
  updateUploadArea()
  updateFilterArea()
  redrawPreview()

  const gallery = renderGeneratedGallery({ kind: 'Frames', title: 'Photo Gallery', lang, pro })

  const workspace = renderCreationWorkspace({
    settings,
    preview,
    gallery,
    lang,
    expanded,
    onClosePreview: () => { if (expanded) toggleExpanded() },
  })

  // Attach cleanup to workspace.
  workspace.__cleanup = () => {
    if (disposed) return
    disposed = true
    ro.disconnect()
    document.removeEventListener('keydown', onKey)
    if (hintTimer) window.clearTimeout(hintTimer)
  }

  let connected=false;const detach=new MutationObserver(()=>{if(workspace.isConnected)connected=true;else if(connected){workspace.__cleanup();detach.disconnect()}});detach.observe(document.documentElement,{childList:true,subtree:true})
  if(pro&&Number(initialStrip)>=3&&Number(initialStrip)<=5)setStripMode(Number(initialStrip));
  if(fr)frenchTree(workspace)
  return workspace
}