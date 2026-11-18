import {showLocalPhoneUnavailable} from "./local-import-dialogs.mjs";
import {renderLocalAudioRecorder} from './audio-recorder-deepseek.mjs';
import {renderLocalUploadChooser} from './upload-chooser-deepseek.mjs';
import {addLocalGenerated,downloadDataURL,elementFilename} from './local-gallery-deepseek.mjs';
import {frenchTree} from './translate-dom.mjs';
import {
  TEXT_FONTS,
  renderGeneratedGallery,
  renderTextStyleMenus,
  renderCreationWorkspace,
  renderPreviewFooter,
  PreviewExpandIcon,
} from './generator-page-deepseek.mjs'
import { elementDefaults, elementSize as sourceElementSize, renderElement,setRenderLanguage,readPhoto,validatePhotoFile,STAMP_EXTRAS } from './current-rendering-helpers.mjs'

function textFamily(font, fallback) {
  if (font && TEXT_FONTS[font]) return TEXT_FONTS[font].family
  return fallback
}
function elementSize(d) {
  if (d.kind === 'Music' && d.format === 'Wide') return { w: 520, h: 390 }
  if (d.kind === 'Stamps' && d.format === 'Perforated') return { w: 280, h: 360 }
  if (d.kind === 'Music' && d.format === 'Card') return { w: 320, h: 440 }
  if (d.kind === 'Audio' && d.format === 'Pill') return { w: 480, h: 150 }
  if (d.format === 'Rectangle' || d.format === 'Card') return { w: 360, h: 260 }
  return { w: 320, h: 320 }
}
function youtubeVideoId(link) {
  if (!link) return ''
  try {
    const u = new URL(link)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0] || ''
    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v') || ''
      const m = u.pathname.match(/^\/(embed|shorts|v)\/([^/?#]+)/)
      if (m) return m[2]
    }
  } catch {}
  return ''
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue
    if (k === 'className') node.className = v
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v)
    else if (k === 'dataset') Object.assign(node.dataset, v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'html') node.innerHTML = v
    else if (k in node) {
      try { node[k] = v } catch { node.setAttribute(k, v) }
    } else node.setAttribute(k, v)
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return node
}
function svgEl(tag, attrs = {}, ...children) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue
    node.setAttribute(k, v)
  }
  for (const c of children.flat()) {
    if (c == null) continue
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return node
}

function renderAudioRecorder({ onRecorded, onBusyChange }) {
  const wrap = el('div', { className: 'audio-recorder' })
  const btn = el('button', {
    type: 'button',
    className: 'audio-record-button',
    'aria-label': 'Record audio',
    title: 'Record audio',
  })
  const svg = svgEl('svg', {
    width: '14', height: '16', viewBox: '0 0 16 20', fill: 'none',
    stroke: 'currentColor', 'stroke-width': '1.5', 'aria-hidden': 'true',
  })
  svg.appendChild(svgEl('rect', { x: '5', y: '1', width: '6', height: '11', rx: '3' }))
  svg.appendChild(svgEl('path', { d: 'M2 8v2a6 6 0 0 0 12 0V8M8 16v3M5 19h6' }))
  btn.appendChild(svg)
  btn.addEventListener('click', () => {})
  wrap.appendChild(btn)
  wrap.appendChild(el('small', { role: 'status' }, 'Audio saved here only. No transcription or upload.'))
  return wrap
}

function renderMusicCoverSearch({ title, artist }) {
  const wrap = el('div', { className: 'music-cover-search' })
  const btn = el('button', {
    type: 'button',
    className: 'btn btn--white',
    'aria-expanded': 'false',
  }, 'Search cover (optional)')
  let panel = null
  btn.addEventListener('click', () => {
    if (panel) { panel.remove(); panel = null; btn.setAttribute('aria-expanded', 'false'); return }
    btn.setAttribute('aria-expanded', 'true')
    panel = el('div', { className: 'music-cover-search__panel' })
    const input = el('input', {
      'aria-label': 'Cover search query',
      maxLength: 160,
      value: `${title} ${artist}`.trim(),
    })
    const label = el('label', {}, 'Album or title + artist', input)
    const searchBtn = el('button', {
      type: 'button',
      className: 'btn btn--white',
      disabled: true,
    }, 'Search MusicBrainz')
    const note = el('p', { className: 'note' }, 'Cover art is copyrighted. Search does not grant permission to print, crop or sell it. Upload your own image if unsure.')
    const ul = el('ul')
    panel.appendChild(label)
    panel.appendChild(searchBtn)
    panel.appendChild(note)
    panel.appendChild(ul)
    wrap.appendChild(panel)
  })
  wrap.appendChild(btn)
  return wrap
}

function renderYouTubePreview({ link, colour, onSmallPlay }) {
  const id = youtubeVideoId(link)
  if (!id) return null
  const frag = document.createDocumentFragment()
  const control = el('div', { className: 'youtube-card-control', style: { background: colour || '#252525' } })
  const btn = el('button', {
    type: 'button',
    'aria-label': 'Play YouTube',
    title: 'Play YouTube',
    'aria-pressed': 'false',
  })
  const svg = svgEl('svg', { 'aria-hidden': 'true', viewBox: '0 0 24 24' })
  svg.appendChild(svgEl('path', { d: 'M8 5.5a1 1 0 0 1 1.5-.86l10 6a1 1 0 0 1 0 1.72l-10 6A1 1 0 0 1 8 17.5z' }))
  btn.appendChild(svg)
  btn.addEventListener('click', (e) => { e.stopPropagation() })
  control.appendChild(btn)
  frag.appendChild(control)
  return frag
}

function renderPhotoFilterStrip() {
  return el('div', { className: 'photo-filter-strip' })
}

function renderUploadChooser() {
  return el('div', { className: 'upload-chooser' })
}

function renderPhoneImportDialog() {
  return el('div', { className: 'phone-import-dialog' })
}

function renderMusicPlaybackDialog() {
  return el('div', { className: 'music-playback-dialog' })
}

export function renderElementEditor({ kind = 'Audio', lang = 'en', pro = false, onNavigate = () => {} } = {}) {
  const state = {
    designs: [elementDefaults(kind)],
    index: 0,
    preview: '',
    error: '',
    renderError: '',
    busy: false,
    importBusy: false,
    filterBusy: false,
    audioPreparing: false,
    recorderBusy: false,
    playing: false,
    linkProposed: false,
    uploadOpen: false,
    phoneOpen: false,
    musicDialog: false,
    selected: new Set(),
  }
  let audioRecorder=null;
  const root = el('div', {})
  root.setAttribute('data-kind', kind)

  const design = () => state.designs[state.index] || state.designs[0]
  const patch = (v) => {
    const d = design()
    state.designs = state.designs.map((x, i) => (i === state.index ? { ...x, ...v } : x))
    refreshPreview()
  }
  const setDesign = (v) => {
    const d = design()
    const next = typeof v === 'function' ? v(d) : v
    state.designs = state.designs.map((x, i) => (i === state.index ? next : x))
    scheduleRender()
  }

  function buildStampFilters(){
    const d=design();if(!d.image)return renderPhotoFilterStrip();const fr=lang==='fr';
    const wrap=el('div',{className:'photo-filters','data-no-i18n':'',role:'group','aria-label':fr?'Filtres photo':'Photo filters'});
    wrap.append(el('div',{className:'photo-filters__head'},el('span',{},fr?'Filtres':'Filters'),el('small',{},fr?'Faites défiler':'Scroll to browse')));
    const strip=el('div',{className:'photo-filters__strip',tabIndex:0});
    for(const preset of STAMP_EXTRAS){const im=el('img',{src:d.image,alt:'',draggable:false});preset.render({src:d.image}).then(src=>{im.src=src}).catch(()=>{});const b=el('button',{type:'button',disabled:state.filterBusy||state.importBusy,'aria-pressed':String(d.stampFilter===preset.id)},el('span',{className:'photo-filters__thumb'},im),el('span',{},fr?preset.fr:preset.en));b.addEventListener('click',async()=>{if(state.filterBusy||state.importBusy)return;const source=design().image,update={stampPhotoFilter:'original',stampFilter:preset.id};state.filterBusy=true;scheduleRender();try{await renderElement({...design(),...update});if(design().image===source)Object.assign(design(),update);state.error='';refreshPreview()}catch{state.error='Could not apply this filter. Your photo has not changed. Try again or choose another photo.'}finally{state.filterBusy=false;scheduleRender()}});strip.append(b)}
    wrap.append(strip);const bar=el('div',{className:'photo-filters__bar','aria-hidden':'true'},el('span'));wrap.append(bar);requestAnimationFrame(()=>{const w=strip.clientWidth/strip.scrollWidth*100;bar.hidden=w>=100;bar.firstChild.style.width=w+'%'});strip.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&strip.scrollWidth>strip.clientWidth){strip.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});strip.addEventListener('scroll',()=>{bar.firstChild.style.left=(strip.scrollLeft/strip.scrollWidth*100)+'%'});strip.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();strip.scrollBy({left:e.key==='ArrowRight'?130:-130,behavior:'smooth'})}});return wrap;
  }
  let uploadDialog=null
  const readData=file=>new Promise((ok,no)=>{const r=new FileReader;r.onload=()=>ok(String(r.result));r.onerror=no;r.readAsDataURL(file)})
  async function upload(file){
    if(!file)return false
    state.error='';const audio=kind==='Audio';if(file.size>(audio?25:15)*1024*1024){state.error=audio?'Choose an audio file smaller than 25 MB.':'Choose a photo smaller than 15 MB.';scheduleRender();return false}if(!file.type.startsWith(audio?'audio/':'image/')){state.error='Choose a supported file.';scheduleRender();return false}
    const url=URL.createObjectURL(file);state.audioPreparing=audio;scheduleRender()
    try{await new Promise((ok,no)=>{const e=audio?document.createElement('audio'):new Image;const timer=setTimeout(()=>{e.src='';no(Error(audio?'Could not read audio.':'Could not read image.'))},audio?10000:20000);const done=error=>{clearTimeout(timer);if(audio){e.removeAttribute('src');e.load()}error?no(error):ok()};e[audio?'onloadedmetadata':'onload']=()=>done();e.onerror=()=>done(Error(audio?'Could not read audio.':'Could not read image.'));if(audio)e.preload='metadata';e.src=url});patch(audio?{media:await readData(file)}:{image:await readData(file)});return true}catch(e){state.error=e.message;state.audioPreparing=false;scheduleRender();return false}finally{URL.revokeObjectURL(url)}
  }
  async function uploadStamps(files){if(!files.length||state.importBusy||state.filterBusy)return false;state.importBusy=true;scheduleRender();const images=[];let problem='';try{for(const file of files){const invalid=validatePhotoFile(file);if(invalid){problem=invalid;continue}let url='';try{const photo=await readPhoto(file);url=photo.src;images.push(await readData(file))}catch(e){problem=e.message}finally{if(url)URL.revokeObjectURL(url)}}state.error=problem;if(!images.length)return false;const first=state.designs.length===1&&!design().image?0:state.designs.length,template=state.designs[0];for(const image of images){if(first===0&&!state.designs[0].image)state.designs[0]={...template,image};else state.designs.push({...template,text:'',image})}state.index=first;refreshPreview();return true}finally{state.importBusy=false;scheduleRender()}}
  function openUpload(){if(uploadDialog)return;uploadDialog=renderLocalUploadChooser({lang,pasteOnly:kind==='Music',onClose:()=>{uploadDialog?.remove();uploadDialog=null},onComputer:()=>{uploadDialog?.remove();uploadDialog=null;root.querySelector('input[type=file]')?.click()},onPhone:kind==='Stamps'?()=>{uploadDialog?.remove();uploadDialog=null;showLocalPhoneUnavailable({lang,host:root.closest('.app')||root})}:undefined,onFiles:async files=>{const ok=kind==='Stamps'?await uploadStamps(files):await upload(files[0]);if(ok){uploadDialog?.remove();uploadDialog=null}return ok}});if(uploadDialog)(root.closest('.app')||root).append(uploadDialog)}
  let renderScheduled = false
  function scheduleRender() {
    if (renderScheduled) return
    renderScheduled = true
    queueMicrotask(() => {
      renderScheduled = false
      rebuild()
    })
  }

  let renderToken = 0
  async function refreshPreview() {
    const token = ++renderToken
    try {
      setRenderLanguage(lang);const src = await renderElement(design())
      if (token !== renderToken) return
      state.preview = src
      state.renderError = ''
    } catch (e) {
      if (token !== renderToken) return
      state.renderError = e.message || String(e)
    }
    scheduleRender()
  }

  function playAudio() {
    if (state.audioPreparing || state.recorderBusy) return
    if (!design().media) { state.error = 'Record or upload audio first.'; scheduleRender(); return }
    const audio = root.querySelector('audio')
    if (!audio) return
    if (audio.paused) audio.play().catch(() => { state.error = 'Could not play audio. Use the audio controls.'; scheduleRender() })
    else audio.pause()
  }

  function download() {if(!state.renderError&&state.preview)downloadDataURL(state.preview,elementFilename(kind,design().text))}
  async function add() {
    if(state.busy)return
    state.busy=true;state.error='';scheduleRender()
    try{const d={...design()};if(kind==='Post-its'&&!d.text.trim())throw Error('Add some note text first.');if(kind==='Audio'&&!d.media)throw Error('Upload an audio recording first.');if(kind==='Music'&&!d.text.trim())throw Error('Add a track title.');setRenderLanguage(lang);const src=await renderElement(d),{w,h}=sourceElementSize(d);addLocalGenerated({...d,src,width:w,height:h,id:crypto.randomUUID()})}
    catch(e){state.error=e.message||String(e)}finally{state.busy=false;scheduleRender()}
  }

  function buildFormats() {
    if (kind === 'Audio') return ['Pill', 'Card']
    if (kind === 'Music') return ['Card', 'Wide']
    if (kind === 'Stamps') return ['Perforated', 'Dotted']
    return ['Square', 'Rectangle']
  }

  function buildSettings() {
    const d = design()
    const frag = document.createDocumentFragment()
    const formats = buildFormats()
    const switchEl = el('div', {
      className: 'switch' + (['Audio', 'Music', 'Stamps'].includes(kind) ? ' media-format-switch' : ''),
      role: 'group',
      'aria-label': `${kind} format`,
    })
    for (const format of formats) {
      const btn = el('button', {
        type: 'button',
        className: d.format === format ? 'switch__on' : '',
        'aria-pressed': String(d.format === format),
      }, format)
      btn.addEventListener('click', () => {
        if (kind === 'Music' && format === 'Wide' && d.format !== 'Wide' && !d.cardColour) patch({ format, cardColour: '#252525' })
        else patch({ format })
      })
      switchEl.appendChild(btn)
    }
    frag.appendChild(switchEl)

    if (kind === 'Stamps' && state.designs.length > 1) {
      const pager = el('div', { className: 'pager', role: 'group', 'aria-label': 'Stamp photos' })
      const prev = el('button', { type: 'button', 'aria-label': 'Previous photo', disabled: state.index === 0 || state.filterBusy || state.importBusy }, '<')
      prev.addEventListener('click', () => { state.index = Math.max(0, state.index - 1); refreshPreview() })
      const span = el('span', { 'aria-live': 'polite', 'data-testid': 'stamp-pager-value' }, String(state.index + 1))
      span.appendChild(el('small', {}, ` / ${state.designs.length}`))
      const next = el('button', { type: 'button', 'aria-label': 'Next photo', disabled: state.index >= state.designs.length - 1 || state.filterBusy || state.importBusy }, '>')
      next.addEventListener('click', () => { state.index = Math.min(state.designs.length - 1, state.index + 1); refreshPreview() })
      const del = el('button', { type: 'button', className: 'pager__del', 'aria-label': 'Remove this photo', disabled: state.filterBusy || state.importBusy }, '×')
      del.addEventListener('click', () => {
        if (state.designs.length <= 1) { patch({ image: '' }); return }
        state.designs = state.designs.filter((_, i) => i !== state.index)
        state.index = Math.max(0, state.index - 1)
        refreshPreview()
      })
      pager.appendChild(prev)
      pager.appendChild(span)
      pager.appendChild(next)
      pager.appendChild(del)
      frag.appendChild(pager)
    }

    const controls = el('div', { className: 'controls element-controls' })

    if (kind === 'Stamps') {
      controls.appendChild(buildStampFilters())
      const label = el('label', { className: 'stamp-paper-option' })
      const cb = el('input', { type: 'checkbox', checked: !!d.agedPaper })
      cb.addEventListener('change', (e) => patch({ agedPaper: e.target.checked }))
      label.appendChild(cb)
      label.appendChild(document.createTextNode(' Aged paper'))
      controls.appendChild(label)
    }

    if (kind === 'Audio') {
      if(!audioRecorder)audioRecorder=renderLocalAudioRecorder({lang,onRecorded:upload,onBusyChange:b=>{state.recorderBusy=b;const play=root.querySelector('.preview-play');if(play)play.disabled=b||state.audioPreparing}});controls.appendChild(audioRecorder)
    }

    if (kind === 'Music') {
      const row = el('div', { className: 'music-title-row' })
      const titleLabel = el('label', {}, 'Track title')
      const titleInput = el('input', { value: d.text, maxLength: 100 })
      titleInput.addEventListener('input', (e) => patch({ text: e.target.value }))
      titleLabel.appendChild(titleInput)
      const artistLabel = el('label', {}, 'Artist')
      const artistInput = el('input', { value: d.subtitle, maxLength: 80 })
      artistInput.addEventListener('input', (e) => patch({ subtitle: e.target.value }))
      artistLabel.appendChild(artistInput)
      row.appendChild(titleLabel)
      row.appendChild(artistLabel)
      controls.appendChild(row)
    } else if (kind !== 'Stamps') {
      const label = el('label', {}, kind === 'Post-its' ? 'Note text' : 'Title')
      const ta = el('textarea', {
        value: d.text,
        maxLength: kind === 'Post-its' ? 600 : 100,
      })
      if (kind === 'Post-its') ta.placeholder = 'Your note'
      else if (kind === 'Audio') ta.placeholder = 'Your audio title'
      ta.addEventListener('input', (e) => patch({ text: e.target.value }))
      label.appendChild(ta)
      controls.appendChild(label)
    }

    if (kind === 'Music') {
      const label = el('label', {}, 'Music link (optional)')
      const input = el('input', { type: 'url', value: d.link, placeholder: 'https://' })
      input.addEventListener('input', (e) => { patch({ link: e.target.value }); state.linkProposed = false })
      label.appendChild(input)
      controls.appendChild(label)
      if (state.linkProposed) {
        controls.appendChild(el('p', { className: 'note' }, 'Suggested Spotify search link, not a direct track. You can edit or replace it.'))
      }
    }

    if (kind === 'Music' && d.format === 'Card') {
      const fs = el('fieldset', { className: 'paper-palette' })
      fs.appendChild(el('legend', {}, 'Card colour'))
      const sw = el('div', { className: 'paper-swatches' })
      const colours = ['#252525', '#171717', '#1f3a5f', '#2f5233', '#5b2a4a', '#8a5a2b', '#e6d4ae', '#f4e6ba', '#ffffff']
      for (const colour of colours) {
        const b = el('button', {
          type: 'button',
          'aria-label': `Card ${colour}`,
          'aria-pressed': String((d.cardColour || '#252525') === colour),
          style: { background: colour },
        })
        b.addEventListener('click', () => patch({ cardColour: colour === '#252525' ? undefined : colour }))
        sw.appendChild(b)
      }
      const custom = el('input', {
        'aria-label': 'Custom card colour',
        title: 'Custom card colour',
        type: 'color',
        value: d.cardColour || '#252525',
      })
      custom.addEventListener('input', (e) => patch({ cardColour: e.target.value }))
      sw.appendChild(custom)
      fs.appendChild(sw)
      controls.appendChild(fs)
    }

    if (kind === 'Post-its') {
      const fs = el('fieldset', { className: 'paper-palette' })
      fs.appendChild(el('legend', {}, 'Paper colour'))
      const sw = el('div', { className: 'paper-swatches' })
      const colours = ['#f4e6ba', '#fff7d6', '#f9d8d8', '#f0dcef', '#dedcf4', '#dceaf4', '#dceee4', '#e7efce', '#f4deca', '#ffffff', '#e9e9e9', '#d5c3a8']
      for (const colour of colours) {
        const b = el('button', {
          type: 'button',
          'aria-label': `Paper ${colour}`,
          'aria-pressed': String(d.colour === colour),
          style: { background: colour },
        })
        b.addEventListener('click', () => patch({ colour }))
        sw.appendChild(b)
      }
      const custom = el('input', {
        'aria-label': 'Custom paper colour',
        title: 'Custom paper colour',
        type: 'color',
        value: d.colour,
      })
      custom.addEventListener('input', (e) => patch({ colour: e.target.value }))
      sw.appendChild(custom)
      fs.appendChild(sw)
      controls.appendChild(fs)
    }

    const defaultFontLabel = kind === 'Post-its'
      ? 'Georgia (original)'
      : kind === 'Music' && d.format === 'Wide'
        ? 'Kalam (original)'
        : 'Arial (original)'
    const maxSize = kind === 'Music' && d.format === 'Wide'
      ? 26
      : kind === 'Music' && d.format === 'Disc'
        ? 25
        : kind === 'Music'
          ? 30
          : kind === 'Audio' && d.format === 'Pill'
            ? 28
            : 36
    controls.appendChild(renderTextStyleMenus({
      font: d.textFont,
      size: d.textSize,
      defaultFontLabel,
      maxSize,
      onFont: (textFont) => patch({ textFont }),
      onSize: (textSize) => patch({ textSize }),
      lang,
    }))

    const row = el('div', { className: 'row' })
    if (kind !== 'Post-its') {
      const uploadBtn = el('button', {
        className: 'btn btn--white',
        disabled: state.importBusy || state.filterBusy,
      }, kind === 'Audio' ? 'Upload audio' : kind === 'Music' ? 'Paste cover image' : 'Upload image')
      uploadBtn.addEventListener('click', () => {
        if (kind === 'Music' || kind === 'Stamps') openUpload()
        else root.querySelector('input[type=file]')?.click()
        scheduleRender()
      })
      row.appendChild(uploadBtn)
    }
    if (kind !== 'Post-its' && kind !== 'Audio' && kind !== 'Music') {
      const phoneBtn = el('button', { className: 'btn btn--white', disabled: state.importBusy || state.filterBusy }, 'Phone')
      phoneBtn.addEventListener('click', () => { showLocalPhoneUnavailable({lang,host:root.closest('.app')||root}) })
      row.appendChild(phoneBtn)
    }
    const resetBtn = el('button', { className: 'btn btn--white', disabled: state.importBusy || state.filterBusy }, 'Reset')
    resetBtn.addEventListener('click', () => {
      state.designs = state.designs.map((x, i) => (i === state.index ? elementDefaults(kind) : x))
      state.error = ''
      refreshPreview()
    })
    row.appendChild(resetBtn)
    if (kind === 'Audio' || kind === 'Music') {
      const details = el('details', { className: 'note-help' })
      const summary = el('summary', { 'aria-label': 'Export and session info' }, '?')
      details.appendChild(summary)
      details.appendChild(el('p', { className: 'note' }, 'PNG is the visual print. Audio and music links stay with the element in this browser session.'))
      row.appendChild(details)
    }
    controls.appendChild(row)

    if (kind === 'Music') {
      controls.appendChild(renderMusicCoverSearch({ title: d.text, artist: d.subtitle }))
    }

    const fileInput = el('input', {
      type: 'file',
      hidden: true,
      multiple: kind === 'Stamps',
      accept: kind === 'Audio' ? 'audio/*' : 'image/*',
    })
    fileInput.addEventListener('change', (e) => {const files=[...e.target.files];e.target.value='';void(kind==='Stamps'?uploadStamps(files):upload(files[0]))})
    controls.appendChild(fileInput)

    if (kind === 'Audio' || kind === 'Music') {
      controls.appendChild(el('p', { className: 'note note--full' }, 'PNG is the visual print. Audio and music links stay with the element in this browser session.'))
    }
    if (state.importBusy) {
      controls.appendChild(el('p', { role: 'status', className: 'note' }, 'Importing photos…'))
    }
    if (state.error || state.renderError) {
      controls.appendChild(el('p', { role: 'alert', className: 'note' }, state.error || state.renderError))
    }

    frag.appendChild(controls)
    return frag
  }

  function buildPreview() {
    const d = design()
    const youtubeCover = kind === 'Music' && ['Card', 'Wide'].includes(d.format) && !!youtubeVideoId(d.link)
    const frag = document.createDocumentFragment()
    const previewWrap = el('div', {
      className: 'element-preview morph-object',
      role: kind === 'Stamps' || (kind === 'Music' && !youtubeCover) ? 'button' : undefined,
      tabIndex: kind === 'Stamps' || (kind === 'Music' && !youtubeCover) ? 0 : undefined,
      'aria-label': kind === 'Stamps'
        ? 'Upload stamp photos'
        : kind === 'Music' && !youtubeCover
          ? 'Import music cover'
          : undefined,
      title: kind === 'Music' ? 'Paste a copied image here (Ctrl/Cmd + V)' : undefined,
      'aria-disabled': kind === 'Stamps' && (state.importBusy || state.filterBusy) ? 'true' : undefined,
    })
    previewWrap.addEventListener('click', () => {
      if (state.importBusy || state.filterBusy) return
      if (kind === 'Stamps') { openUpload() }
      else if (kind === 'Music' && !youtubeCover) { openUpload() }
    })
    previewWrap.addEventListener('keydown', (e) => {
      if ((kind === 'Stamps' || (kind === 'Music' && !youtubeCover)) && !state.importBusy && !state.filterBusy && ['Enter', ' '].includes(e.key)) {
        e.preventDefault()
        openUpload()
      }
    })

    const artwork = el('div', {
      className: 'element-artwork'
        + (kind === 'Music' && d.format === 'Wide' ? ' element-artwork--wide' : '')
        + (youtubeCover ? ' element-artwork--youtube' : '')
        + (kind === 'Audio' ? ' element-artwork--audio' : ''),
      'data-format': d.format,
      'data-cos-element': kind === 'Audio' ? 'audio-preview' : undefined,
      'aria-label': kind === 'Audio' ? `Audio ${d.text || d.format}` : undefined,
    })

    const width = kind === 'Music' && d.format === 'Wide' ? 416
      : youtubeCover ? 260
      : kind === 'Stamps' && d.format === 'Perforated' ? 179
      : kind === 'Music' && d.format === 'Card' ? 218
      : kind === 'Audio' && d.format === 'Pill' ? 260
      : 230
    const height = kind === 'Music' && d.format === 'Wide' ? 312
      : youtubeCover ? 357.5
      : kind === 'Stamps' && d.format === 'Perforated' ? 230
      : kind === 'Music' && d.format === 'Card' ? 300
      : kind === 'Audio' && d.format === 'Pill' ? 81
      : d.format === 'Rectangle' || d.format === 'Card' ? 166
      : 230
    const borderRadius = kind === 'Music' && d.format === 'Disc' ? '50%'
      : kind === 'Audio' && d.format === 'Pill' ? '50px'
      : '8px'

    const img = el('img', {
      src: state.preview,
      alt: `${kind} preview`,
      role: kind === 'Audio' && d.media ? 'button' : undefined,
      tabIndex: kind === 'Audio' && d.media ? 0 : undefined,
      'aria-label': kind === 'Audio' && d.media ? 'Play audio' : undefined,
      'aria-disabled': kind === 'Stamps' && (state.importBusy || state.filterBusy) ? 'true' : undefined,
      style: { width: width + 'px', height: height + 'px', borderRadius },
    })
    img.addEventListener('click', () => { if (kind === 'Audio' && d.media) playAudio() })
    img.addEventListener('keydown', (e) => {
      if (kind === 'Audio' && d.media && ['Enter', ' '].includes(e.key)) { e.preventDefault(); playAudio() }
    })
    artwork.appendChild(img)

    if (youtubeCover) {
      const yt = renderYouTubePreview({
        link: d.link,
        colour: d.format === 'Wide' ? '#E73B0D' : d.cardColour,
        onSmallPlay: () => { state.musicDialog = true; scheduleRender() },
      })
      if (yt) artwork.appendChild(yt)
    }

    if (kind === 'Audio') {
      const playBtn = el('button', {
        className: 'preview-play',
        'aria-label': state.playing ? 'Pause preview audio' : 'Play preview audio',
        'aria-pressed': String(state.playing),
        disabled: state.audioPreparing || state.recorderBusy,
        type: 'button',
      })
      playBtn.appendChild(el('span', { className: state.playing ? 'audio-pause' : 'audio-play', 'aria-hidden': 'true' }))
      playBtn.addEventListener('click', playAudio)
      artwork.appendChild(playBtn)
    }

    if (kind === 'Stamps') {
      const size = elementSize(d)
      const upload = el('span', {
        className: 'stamp-photo-upload' + (d.image ? ' stamp-photo-upload--filled' : ''),
        style: {
          left: `${(30 / size.w) * 100}%`,
          top: `${(30 / size.h) * 100}%`,
          width: `${((size.w - 60) / size.w) * 100}%`,
          height: `${((size.h - 100) / size.h) * 100}%`,
        },
      })
      upload.appendChild(el('span', { className: 'image-upload-hint' }, (d.image ? 'Change photos' : 'Add photos'),' · Computer, phone or paste'))
      artwork.appendChild(upload)

      const titleEdit = el('input', {
        className: 'element-artwork__title-edit',
        'aria-label': 'Stamp title',
        maxLength: 40,
        spellCheck: false,
        value: d.text,
        style: {
          top: `calc(${((size.h - 35) / size.h) * 100}% - 0.905em)`,
          height: '1em',
          left: `${(20 / size.w) * 100}%`,
          right: `${(20 / size.w) * 100}%`,
          fontSize: `calc(${d.textSize}px * var(--artwork-scale, 1))`,
          ...(d.textFont ? { fontFamily: textFamily(d.textFont, 'inherit') } : {}),
          lineHeight: '1',
        },
      })
      titleEdit.addEventListener('click', (e) => e.stopPropagation())
      titleEdit.addEventListener('keydown', (e) => e.stopPropagation())
      titleEdit.addEventListener('input', (e) => patch({ text: e.target.value }))
      artwork.appendChild(titleEdit)
    }

    previewWrap.appendChild(artwork)

    if (kind === 'Audio' && state.audioPreparing) {
      previewWrap.appendChild(el('p', { role: 'status' }, 'Preparing audio…'))
    }
    if (kind === 'Audio' && d.media) {
      const audio = el('audio', { controls: true, src: d.media, preload: 'metadata' })
      audio.addEventListener('loadedmetadata', () => { if(state.audioPreparing&&audio.isConnected){state.audioPreparing=false;scheduleRender()} })
      audio.addEventListener('error', () => { if(!audio.isConnected)return;state.audioPreparing = false; state.error = 'Could not play audio. Use the audio controls.'; scheduleRender() })
      audio.addEventListener('play', () => { if(audio.isConnected){state.playing=true;root.querySelector('.preview-play')?.classList.add('preview-play--active')} })
      audio.addEventListener('pause', () => { if(audio.isConnected){state.playing=false;root.querySelector('.preview-play')?.classList.remove('preview-play--active')} })
      audio.addEventListener('ended', () => {state.playing=false;root.querySelector('.preview-play')?.classList.remove('preview-play--active')})
      previewWrap.appendChild(audio)
    }

    frag.appendChild(previewWrap)
    return frag
  }

  function buildActions() {
    const row = el('div', { className: 'row row--actions' })
    const dl = el('button', {
      className: 'btn btn--white',
      disabled: state.busy || state.importBusy || state.filterBusy || !state.preview || !!state.renderError,
      title: state.filterBusy ? 'Applying the filter'
        : state.importBusy ? 'Import in progress'
        : state.busy ? 'Please wait'
        : !state.preview || state.renderError ? 'Preview is not ready yet'
        : undefined,
    }, kind === 'Post-its' ? 'Download note' : 'Download element')
    dl.addEventListener('click', download)
    const addBtn = el('button', {
      className: 'btn btn--rose',
      disabled: state.busy || state.importBusy || state.filterBusy,
      title: state.filterBusy ? 'Applying the filter'
        : state.importBusy ? 'Import in progress'
        : state.busy ? 'Please wait'
        : undefined,
    }, '+ Add to Gallery')
    addBtn.addEventListener('click', add)
    row.appendChild(dl)
    row.appendChild(addBtn)
    return row
  }

  function buildMessageWorkspace() {
    const d = design()
    const settings = el('section', { className: 'creation-settings', 'aria-label': 'Message settings' })
    const head = el('header', { className: 'creation-settings__head' })
    head.appendChild(el('h2', {}, 'Message'))
    head.appendChild(el('p', {}, 'Post-it, letter, conversation or date.'))
    const subtabs = el('div', { className: 'switch pro-subtabs', role: 'group', 'aria-label': 'Message format' })
    ;['Post-it', 'Letter', 'Messages', 'Date'].forEach((type, n) => {
      const b = el('button', {
        className: n === 0 ? 'switch__on' : '',
        'aria-pressed': String(n === 0),
      }, type)
      if (n > 0) b.appendChild(el('small', { className: 'pro-tag' }, 'PRO'))
      b.addEventListener('click', () => { if (n) onNavigate(`/generator/pro?type=Message&sub=${type}`) })
      subtabs.appendChild(b)
    })
    head.appendChild(subtabs)
    settings.appendChild(head)

    const body = el('div', { className: 'creation-settings__body' })

    const fmtDetails = el('details', { open: true })
    fmtDetails.appendChild(el('summary', {}, 'Format'))
    const fmtSwitch = el('div', { className: 'switch', role: 'group', 'aria-label': 'Note format' })
    for (const format of ['Square', 'Rectangle']) {
      const b = el('button', {
        'aria-pressed': String(d.format === format),
        className: d.format === format ? 'switch__on' : '',
      }, format)
      b.addEventListener('click', () => patch({ format }))
      fmtSwitch.appendChild(b)
    }
    fmtDetails.appendChild(fmtSwitch)
    body.appendChild(fmtDetails)

    const textDetails = el('details', matchMedia('(max-width:1023px)').matches?{}:{open:true})
    const textSummary = el('summary', {}, 'Text ')
    textSummary.appendChild(el('small', { 'data-no-i18n': 'true' }, String(d.text.length),' / 600'))
    textDetails.appendChild(textSummary)
    textDetails.appendChild(renderTextStyleMenus({
      font: d.textFont,
      size: d.textSize,
      defaultFontLabel: 'Georgia (original)',
      onFont: (textFont) => patch({ textFont }),
      onSize: (textSize) => patch({ textSize }),
      lang,
    }))
    body.appendChild(textDetails)

    const paperDetails = el('details', matchMedia('(max-width:1023px)').matches?{}:{open:true})
    paperDetails.appendChild(el('summary', {}, 'Paper colour'))
    const sw = el('div', { className: 'paper-swatches' })
    const colours = ['#f4e6ba', '#fff7d6', '#f9d8d8', '#f0dcef', '#dedcf4', '#dceaf4', '#dceee4', '#e7efce', '#f4deca', '#ffffff', '#e9e9e9', '#d5c3a8']
    for (const colour of colours) {
      const b = el('button', {
        'aria-label': `Paper ${colour}`,
        'aria-pressed': String(d.colour === colour),
        style: { background: colour },
      })
      b.addEventListener('click', () => patch({ colour }))
      sw.appendChild(b)
    }
    const custom = el('input', { type: 'color', 'aria-label': 'Custom paper colour', value: d.colour })
    custom.addEventListener('input', (e) => patch({ colour: e.target.value }))
    sw.appendChild(custom)
    paperDetails.appendChild(sw)
    body.appendChild(paperDetails)

    if (state.error || state.renderError) {
      body.appendChild(el('p', { role: 'alert' }, state.error || state.renderError))
    }
    settings.appendChild(body)

    const actions = el('footer', { className: 'creation-settings__actions' })
    const dl = el('button', {
      className: 'btn btn--white',
      disabled: state.busy || !state.preview,
      title: state.busy ? 'Please wait' : !state.preview ? 'Your note will appear here' : undefined,
    }, 'Download')
    dl.addEventListener('click', download)
    const addBtn = el('button', {
      className: 'btn btn--rose',
      disabled: state.busy || !state.preview,
      title: state.busy ? 'Please wait' : !state.preview ? 'Your note will appear here' : undefined,
    }, '+ Add to Gallery')
    addBtn.addEventListener('click', add)
    actions.appendChild(dl)
    actions.appendChild(addBtn)
    settings.appendChild(actions)

    const previewSection = el('section', { className: 'creation-preview', 'aria-label': 'Message preview' })
    const toolbar = el('div', { className: 'creation-toolbar' })
    toolbar.appendChild(el('span', {}, 'Message'))
    const resetBtn = el('button', { className: 'creation-toolbar__reset' }, 'Reset')
    resetBtn.addEventListener('click', () => {
      state.designs = state.designs.map((x, i) => (i === state.index ? elementDefaults(kind) : x))
      state.error = ''
      scheduleRender()
    })
    toolbar.appendChild(resetBtn)
    const expandBtn = el('button', { 'aria-label': 'Enlarge preview', 'aria-pressed': 'false' })
    expandBtn.appendChild(PreviewExpandIcon())
    toolbar.appendChild(expandBtn)
    previewSection.appendChild(toolbar)

    const stage = el('div', { className: 'creation-preview__stage creation-preview__stage--message' })
    const note = el('div', { className: 'creation-note' })
    if (state.preview) {
      note.appendChild(el('img', { src: state.preview, alt: 'Note preview' }))
    } else {
      note.appendChild(el('p', { className: 'creation-note__empty' }, 'Your note will appear here'))
    }
    const size = elementSize(d)
    const overlay = el('div', {
      className: 'creation-note__overlay',
      style: {
        left: `${(25 / size.w) * 100}%`,
        right: `${(25 / size.w) * 100}%`,
        top: `${(35 / size.h) * 100}%`,
        bottom: `${(35 / size.h) * 100}%`,
      },
    })
    const editor = el('div', {
      className: 'creation-note__editor',
      role: 'textbox',
      'aria-multiline': 'true',
      'aria-label': 'Note text on the preview',
      contentEditable: 'true',
      spellCheck: false,
      style: {
        fontSize: `calc(${d.textSize}px * var(--note-scale, 1))`,
        ...(d.textFont ? { fontFamily: textFamily(d.textFont, 'inherit') } : {}),
      },
    })
    editor.textContent = d.text
    editor.addEventListener('input', (e) => {
      let text = e.currentTarget.innerText.replace(/\n$/, '')
      if (text.length > 600) text = text.slice(0, 600)
      patch({ text })
    })
    overlay.appendChild(editor)
    note.appendChild(overlay)
    stage.appendChild(note)
    previewSection.appendChild(stage)

    const footer = renderPreviewFooter({ children: el('p', {}, 'Type directly on the note.'), lang })
    previewSection.appendChild(footer)

    const gallery = renderGeneratedGallery({
      kind: 'Message',
      kinds: ['Post-its', 'Letter', 'Messages', 'Date'],
      title: 'Message Gallery',
      albumLabel: 'Compose my notebook',
      lang,
      pro:true,pageSize:pro?7:undefined,
    })

    return renderCreationWorkspace({
      settings,
      preview: previewSection,
      gallery,
      lang,
    })
  }

  function rebuild() {
    const details=[...root.querySelectorAll('.creation-settings__body details')].map(e=>e.open)
    const active=document.activeElement,fields=[...root.querySelectorAll('input,textarea,[contenteditable=true]')],index=fields.indexOf(active)
    const selection=index>=0&&typeof active.selectionStart==='number'?[active.selectionStart,active.selectionEnd]:null
    rebuildContents()
    if(details.length)root.querySelectorAll('.creation-settings__body details').forEach((e,i)=>{if(i<details.length)e.open=details[i]})
    if(index>=0){const field=root.querySelectorAll('input,textarea,[contenteditable=true]')[index];field?.focus({preventScroll:true});if(selection)try{field.setSelectionRange(...selection)}catch{}}
  }
  function rebuildContents() {
    root.replaceChildren()
    if (kind === 'Post-its') {
      root.appendChild(buildMessageWorkspace());if(lang==='fr')frenchTree(root);
      return
    }

    if (state.musicDialog) root.appendChild(renderMusicPlaybackDialog())
    if (state.uploadOpen) root.appendChild(renderUploadChooser())
    if (state.phoneOpen) root.appendChild(renderPhoneImportDialog())

    const settings = el('section', { className: 'creation-settings' })
    const head = el('header', { className: 'creation-settings__head' })
    head.appendChild(el('h2', {}, kind === 'Stamps' ? 'Stamp' : kind === 'Stickers' ? 'Sticker' : kind))
    settings.appendChild(head)
    const body = el('div', { className: 'creation-settings__body' })
    body.appendChild(buildSettings())
    settings.appendChild(body)
    const actions = el('footer', { className: 'creation-settings__actions' })
    actions.appendChild(buildActions())
    settings.appendChild(actions)

    const previewSection = el('section', { className: 'creation-preview' })
    const toolbar = el('div', { className: 'creation-toolbar' })
    toolbar.appendChild(el('span', {}, kind))
    const expandBtn = el('button', { className: 'creation-toolbar__reset', 'aria-label': 'Enlarge preview', 'aria-pressed': 'false' })
    expandBtn.appendChild(PreviewExpandIcon())
    toolbar.appendChild(expandBtn)
    previewSection.appendChild(toolbar)
    const stage = el('div', { className: 'creation-preview__stage creation-element-stage' })
    stage.appendChild(buildPreview())
    previewSection.appendChild(stage)

    const gallery = renderGeneratedGallery({ kind, lang, pro:true })

    root.appendChild(renderCreationWorkspace({
      settings,
      preview: previewSection,
      gallery,
      lang,
    }))

    if(lang==='fr')frenchTree(root);
    // Scale artwork
    const artwork = root.querySelector('.element-artwork')
    const img = artwork?.querySelector('img')
    if (artwork && img) {
      const update = () => {
        const scale = img.clientWidth / elementSize(design()).w || 1
        artwork.style.setProperty('--artwork-scale', String(Math.max(0.1, scale)))
        if (kind === 'Music' && design().format === 'Wide') {
          artwork.style.width = img.clientWidth + 'px'
          artwork.style.height = img.clientHeight + 'px'
        }
      }
      update()
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(update)
        ro.observe(img)
        img.addEventListener('load', update)
        const cleanup = () => {
          ro.disconnect()
          img.removeEventListener('load', update)
        }
        const mo = new MutationObserver(() => {
          if (!root.isConnected) { cleanup(); mo.disconnect() }
        })
        mo.observe(root, { childList: true, subtree: true })
      }
    }
  }

  rebuild()
  refreshPreview()
  return root
}