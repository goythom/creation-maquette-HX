import {localGenerated,addLocalGenerated,elementFilename,downloadDataURL} from './local-gallery-deepseek.mjs';
import {PreviewExpandIcon,renderTextStyleMenus,renderGeneratedGallery} from './generator-page-deepseek.mjs';
import {frenchTree} from './translate-dom.mjs';
import {
  elementDefaults,elementSize,
  renderCompositionSide,
  COMP_TEMPLATE_SIZES,
  COMP_ZONES,
} from './current-rendering-helpers.mjs'

const TEMPLATES = ['Postcard', 'Concert Ticket']
const TEXT_KINDS = ['Post-its', 'Messages', 'Letter', 'Date']
const ZOOM_MIN = 0.5
const ZOOM_MAX = 3
const ZOOM_STEP = 1.25

function emptyState(template) {
  const fields = {}
  for (const side of ['front', 'back'])
    for (const zone of COMP_ZONES[template][side]) for (const field of zone.fields || []) fields[field.key] = ''
  if(template==='Concert Ticket')fields.serial=String(100000+Math.floor(Math.random()*900000));
  return { photo: '', photoId: null, stamp: '', stampId: null, fields, photoPan: { x: 0.5, y: 0.5 }, zoneImages: {} }
}

function toDesign(template, st) {
  const d = elementDefaults('Combination')
  d.comboFormat = template
  d.image = st.photo
  d.image2 = st.stamp
  d.text = (st.fields.caption || st.fields.event || '').trim()
  d.comboFields = st.fields
  d.comboImages = st.zoneImages
  d.comboPan = st.photoPan ?? { x: 0.5, y: 0.5 }
  if (st.textFont) d.textFont = st.textFont
  if (st.textSize) d.textSize = st.textSize
  return d
}

function zoneFilled(zone, st) {
  if (zone.accepts === 'photo') return !!st.photo
  if (zone.accepts === 'stamp') return !!st.stamp
  return (zone.fields || []).some((f) => (st.fields[f.key] || '').trim().length > 0) || !!st.zoneImages?.[zone.key]
}

function pageArrowSvg(dir, s = 24) {
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
  svg.style.display = 'block'
  svg.style.margin = 'auto'
  svg.style.flexShrink = '0'
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', dir === 'next' ? 'M4 12h14M12.5 5.5 19 12l-6.5 6.5' : 'M20 12H6M11.5 5.5 5 12l6.5 6.5')
  svg.appendChild(path)
  return svg
}

function previewExpandIconSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '16')
  svg.setAttribute('height', '16')
  svg.setAttribute('viewBox', '0 0 20 20')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '1.6')
  svg.setAttribute('aria-hidden', 'true')
  const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  p1.setAttribute('d', 'M3 8V3h5')
  const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  p2.setAttribute('d', 'M17 12v5h-5')
  const p3 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  p3.setAttribute('d', 'M3 3l5 5')
  const p4 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  p4.setAttribute('d', 'M17 17l-5-5')
  svg.appendChild(p1); svg.appendChild(p2); svg.appendChild(p3); svg.appendChild(p4)
  return svg
}

function swapLibIconSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '16')
  svg.setAttribute('height', '16')
  svg.setAttribute('viewBox', '0 0 20 20')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '1.6')
  svg.setAttribute('aria-hidden', 'true')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', 'M4 7h12m0 0-3-3m3 3-3 3M16 13H4m0 0 3 3m-3-3 3-3')
  svg.appendChild(path)
  return svg
}

export function renderCombinationStudio({ lang = 'en', onNavigate = () => {}, onCreateElement = () => {},localState }  = {}) {
  const fr = lang === 'fr'

  const templateName = (t) => (fr ? (t === 'Postcard' ? 'Carte postale' : 'Ticket de concert') : t)
  const faceLabel = (s) => (fr ? (s === 'front' ? 'Recto' : 'Verso') : s === 'front' ? 'Front' : 'Back')
  const kindLabel = (kind) => {
    const frMap = {
      Frames: 'Photos',
      Audio: 'Audio',
      'Post-its': 'Textes',
      Messages: 'Messages',
      Letter: 'Lettres',
      Date: 'Dates',
      Stamps: 'Timbres',
      Music: 'Musique',
      Stickers: 'Stickers',
      Video: 'Vidéos',
      Combination: 'Combinaisons',
    }
    const enMap = { Frames: 'Photos', 'Post-its': 'Texts', Stamps: 'Stamps' }
    return (fr ? frMap[kind] : enMap[kind]) || kind
  }
  const itemKindLabel = (kind) =>
    kind === 'Frames' ? (fr ? 'Photo' : 'Photo') : kind === 'Post-its' ? (fr ? 'Note' : 'Note') : kind === 'Stamps' ? (fr ? 'Timbre' : 'Stamp') : kindLabel(kind)
  const zoneKindLabel = (zone) =>
    zone.accepts === 'photo' ? (fr ? 'Photo' : 'Photo') : zone.accepts === 'stamp' ? (fr ? 'Timbre' : 'Stamp') : fr ? 'Texte' : 'Text'

  const model=localState||{template:'Postcard',side:'front',states:{Postcard:emptyState('Postcard'),'Concert Ticket':emptyState('Concert Ticket')},selected:null,filter:'all',zoom:1,libSide:'left',expanded:false,combosOpen:false};
  const {template,side,states,selected,filter,zoom,libSide,expanded,combosOpen}=model;
  const st=states[template],zones=COMP_ZONES[template][side],size=COMP_TEMPLATE_SIZES[template];
  const selectedZone=zones.find(z=>z.key===selected)||null;let preview='',error=model.error||'',notice=model.notice||'',busy=!!model.busy;
  const redraw=()=>{const mounted=model.root||root;const focused=document.activeElement,field=focused?.dataset.field,start=focused?.selectionStart,end=focused?.selectionEnd;const next=renderCombinationStudio({lang,onNavigate,onCreateElement,localState:model});mounted.replaceWith(next);if(field){const input=next.querySelector(`[data-field="${field}"]`);input?.focus();if(input?.setSelectionRange)input.setSelectionRange(start,end)}};
  const patch=values=>{model.states[template]={...st,...values};redraw()};
  const switchTemplate=next=>{model.template=next;model.selected=null;redraw()};
  const stepTemplate=dir=>switchTemplate(TEMPLATES[(TEMPLATES.indexOf(template)+dir+TEMPLATES.length)%TEMPLATES.length]);
  const frames=localGenerated.filter(i=>i.frame).map(i=>({...i.frame,id:i.id})),elements=localGenerated.filter(i=>!i.frame),stamps=elements.filter(i=>i.kind==='Stamps'),comboCount=elements.filter(i=>i.kind==='Combination').length;
  const galleryItems=[...frames.map(frame=>({key:'frame:'+frame.id,kind:'Frames',label:frame.caption.trim()||frame.photo.name?.replace(/\.[^.]*$/,'')||(frame.format==='polaroid'?'Polaroid':'Instax Mini'),frame,element:null})),...elements.map(element=>({key:'element:'+element.id,kind:element.kind,label:element.text||element.kind,frame:null,element}))];
  const filteredItems=galleryItems.filter(i=>filter==='all'||(filter==='texts'?TEXT_KINDS.includes(i.kind):i.kind===filter));
  if(template==='Postcard'&&!st.stamp&&stamps.length){st.stamp=stamps.at(-1).src;st.stampId=stamps.at(-1).id}
  async function rasterPhoto(src){const img=new Image;img.src=src;await img.decode();const w=Math.min(1400,img.naturalWidth||1400),h=Math.round(w*(img.naturalHeight||w)/(img.naturalWidth||w)),c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);return c.toDataURL('image/jpeg',.9)}
  async function assignPhoto(id){const frame=frames.find(f=>f.id===id);if(!frame)return;try{const photo=await rasterPhoto(frame.photo.src);patch({photo,photoId:id,photoPan:{x:.5,y:.5}})}catch{model.error=fr?'Impossible de lire cette photo.':'Could not read that photo.';redraw()}}
  function pickItem(item){if(item.frame){const zone=zones.find(z=>z.accepts==='photo');if(zone)model.selected=zone.key;void assignPhoto(item.frame.id);return}const target=selectedZone||zones.find(z=>zoneAccepts(z,item.kind));if(!target||!zoneAccepts(target,item.kind))return;model.selected=target.key;patch({stamp:item.element.src,stampId:item.element.id})}
  function swapZone(zone){if(zone.accepts==='photo'&&frames.length){const i=frames.findIndex(f=>f.id===st.photoId);void assignPhoto(frames[(i+1+frames.length)%frames.length].id)}else if(zone.accepts==='stamp'&&stamps.length){const i=stamps.findIndex(f=>f.id===st.stampId),e=stamps[(i+1+stamps.length)%stamps.length];patch({stamp:e.src,stampId:e.id})}}

  const selectedNN=selectedZone?String(zones.indexOf(selectedZone)+1).padStart(2,'0'):''

  const chips = [
    { key: 'all', label: fr ? 'Tout' : 'All' },
    { key: 'Frames', label: fr ? 'Photos' : 'Photos' },
    { key: 'Audio', label: 'Audio' },
    { key: 'texts', label: fr ? 'Textes' : 'Texts' },
    ...[...new Set(galleryItems.map(i=>i.kind))].filter(k=>!['Frames','Audio',...TEXT_KINDS].includes(k)).map(k=>({key:k,label:kindLabel(k)})),
  ]
  const zoneAccepts = (zone, kind) =>
    (zone.accepts === 'photo' && kind === 'Frames') || (zone.accepts === 'stamp' && kind === 'Stamps')
  const templateAccepts = (kind) =>
    ['front', 'back'].some((s) => COMP_ZONES[template][s].some((z) => zoneAccepts(z, kind)))
  const chipCompatible = (chipKey) =>
    chipKey === 'all' || (chipKey === 'texts' ? TEXT_KINDS.some((k) => templateAccepts(k)) : templateAccepts(chipKey))
  const incompatibleLabels = chips.filter((c) => !chipCompatible(c.key)).map((c) => c.label)
  const selHint=selectedZone?.accepts==='photo'?(fr?'Choisis une photo pour cet emplacement':'Pick a photo for the selected zone'):selectedZone?.accepts==='stamp'?(fr?'Choisis un timbre pour cet emplacement':'Pick a stamp for the selected zone'):''

  // Root
  const root = document.createElement('div')
  root.className = 'comb'

  // Header
  const head = document.createElement('header')
  head.className = 'comb__head'

  const h2 = document.createElement('h2')
  h2.textContent = fr ? 'Combinaison' : 'Combination'
  head.appendChild(h2)

  const modelSpan = document.createElement('span')
  modelSpan.className = 'comb__model'
  const select = document.createElement('select')
  select.value = template
  select.setAttribute('aria-label', fr ? 'Modèle' : 'Template')
  for (const t of TEMPLATES) {
    const opt = document.createElement('option')
    opt.value = t
    opt.textContent = templateName(t)
    select.appendChild(opt)
  }
  select.value=template;select.addEventListener('change',()=>switchTemplate(select.value));
  modelSpan.appendChild(select)
  head.appendChild(modelSpan)

  const sideSwitch = document.createElement('span')
  sideSwitch.className = 'switch comb__side'
  sideSwitch.setAttribute('role', 'group')
  sideSwitch.setAttribute('aria-label', fr ? 'Face' : 'Side')
  for (const s of ['front', 'back']) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = side === s ? 'switch__on' : ''
    btn.setAttribute('aria-pressed', String(side === s))
    btn.textContent = faceLabel(s)
    btn.addEventListener('click',()=>{model.side=s;model.selected=null;redraw()});sideSwitch.appendChild(btn)
  }
  head.appendChild(sideSwitch)

  const combosBtn = document.createElement('button')
  combosBtn.type = 'button'
  combosBtn.className = 'comb__combos'
  combosBtn.setAttribute('aria-expanded', String(combosOpen))
  combosBtn.append(fr ? 'Mes combinaisons' : 'My combinations',' ',String(comboCount))
  combosBtn.addEventListener('click',()=>{model.combosOpen=!combosOpen;redraw()});head.appendChild(combosBtn)

  root.appendChild(head)

  // Body
  const body = document.createElement('div')
  body.className = 'comb__body'
  body.setAttribute('data-lib', libSide)

  // Library aside
  const lib = document.createElement('aside')
  lib.className = 'comb__lib'
  lib.setAttribute('aria-label', fr ? 'Mes éléments' : 'My elements')

  const libHead = document.createElement('div')
  libHead.className = 'comb__lib-head'
  const libH3 = document.createElement('h3')
  libH3.textContent = fr ? 'Mes éléments' : 'My elements'
  libHead.appendChild(libH3)
  const swapBtn = document.createElement('button')
  swapBtn.type = 'button'
  swapBtn.className = 'comb__swap-lib'
  swapBtn.title = fr ? 'Inverser la bibliothèque et l’aperçu' : 'Swap the library and the preview'
  swapBtn.setAttribute('aria-label', fr ? 'Inverser la bibliothèque et l’aperçu' : 'Swap the library and the preview')
  swapBtn.addEventListener('click',()=>{model.libSide=libSide==='left'?'right':'left';redraw()});swapBtn.appendChild(swapLibIconSvg())
  const swapSpan = document.createElement('span')
  swapSpan.textContent = fr ? 'Inverser' : 'Swap'
  swapBtn.appendChild(swapSpan)
  libHead.appendChild(swapBtn)
  lib.appendChild(libHead)

  const libHint = document.createElement('p')
  libHint.className = 'comb__lib-hint'
  libHint.textContent = fr ? 'Choisis un emplacement, puis un élément.' : 'Pick a slot, then an element.'
  lib.appendChild(libHint)

  const chipsWrap = document.createElement('div')
  chipsWrap.className = 'comb__chips'
  chipsWrap.setAttribute('role', 'group')
  chipsWrap.setAttribute('aria-label', fr ? 'Filtrer les éléments' : 'Filter elements')
  for (const chip of chips) {
    const compatible = chipCompatible(chip.key)
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.setAttribute('aria-pressed', String(filter === chip.key))
    btn.disabled = !compatible
    if (!compatible) btn.title = fr ? 'Aucun emplacement compatible dans ce modèle' : 'No compatible slot in this template'
    btn.textContent = chip.label
    btn.addEventListener('click',()=>{model.filter=chip.key;redraw()});chipsWrap.appendChild(btn)
  }
  lib.appendChild(chipsWrap)

  if (incompatibleLabels.length > 0) {
    const note = document.createElement('p')
    note.className = 'comb__chips-note'
    note.append(incompatibleLabels.join(', '),' :',' ',fr ? 'aucun emplacement compatible dans ce modèle.' : 'no compatible slot in this template.')
    lib.appendChild(note)
  }

  if (selHint) {
    const sh = document.createElement('p')
    sh.className = 'comb__sel-hint'
    sh.textContent = selHint
    lib.appendChild(sh)
  }

  // Empty library
  const empty = document.createElement('div')
  empty.className = 'comb__empty'
  const emptyPlus = document.createElement('span')
  emptyPlus.className = 'comb__empty-plus'
  emptyPlus.setAttribute('aria-hidden', 'true')
  emptyPlus.textContent = '+'
  empty.appendChild(emptyPlus)
  const emptyP = document.createElement('p')
  const emptyStrong = document.createElement('strong')
  emptyStrong.textContent = fr ? "Aucun élément pour l'instant" : 'No elements yet'
  emptyP.appendChild(emptyStrong)
  const emptySpan = document.createElement('span')
  emptySpan.textContent = fr
    ? 'Crée un élément compatible dans un autre onglet pour remplir ce modèle.'
    : 'Create a compatible element in another tab to fill this template.'
  emptyP.appendChild(emptySpan)
  empty.appendChild(emptyP)
  const createBtn = document.createElement('button')
  createBtn.type = 'button'
  createBtn.className = 'btn btn--dark'
  createBtn.textContent = fr ? 'Créer un élément' : 'Create an element'
  createBtn.addEventListener('click', () => onCreateElement())
  empty.appendChild(createBtn)
  if(!galleryItems.length)lib.appendChild(empty);else{const ul=document.createElement('ul');ul.className='comb__items';for(const item of filteredItems){const usable=item.frame?templateAccepts('Frames'):zones.some(z=>zoneAccepts(z,item.kind))&&(!selectedZone||zoneAccepts(selectedZone,item.kind)),dim=item.frame?false:!!((selectedZone&&!zoneAccepts(selectedZone,item.kind))||(!selectedZone&&!zones.some(z=>zoneAccepts(z,item.kind)))),on=!!((item.frame&&item.frame.id===st.photoId)||(item.element&&item.element.id===st.stampId)),li=document.createElement('li'),btn=document.createElement('button');btn.type='button';btn.className='pro-comp__item'+(dim?' pro-comp__item--dim':'');btn.disabled=!usable;btn.setAttribute('aria-label',(fr?'Utiliser ':'Use ')+item.label);btn.setAttribute('aria-pressed',String(on));btn.addEventListener('click',()=>pickItem(item));const thumb=document.createElement('span');thumb.className='pro-comp__item-thumb'+(on?' pro-comp__item-thumb--on':'');const img=new Image;img.src=item.frame?item.frame.photo.src:item.element.src;img.alt='';thumb.append(img);const label=document.createElement('span');label.className='comb__item-label';label.setAttribute('data-no-i18n','');label.textContent=item.label;const kind=document.createElement('span');kind.className='pro-comp__item-kind';kind.textContent=itemKindLabel(item.kind);btn.append(thumb,label,kind);li.append(btn);ul.append(li)}lib.append(ul);if(!filteredItems.length){const p=document.createElement('p');p.className='comb__empty-filter';p.textContent=fr?'Aucun élément de ce type.':'No elements of this type.';lib.append(p)}}

  body.appendChild(lib)

  // Work section
  const work = document.createElement('section')
  work.className = 'comb__work'
  work.setAttribute('aria-label', fr ? 'Aperçu de la combinaison' : 'Combination preview')

  const stageHead = document.createElement('div')
  stageHead.className = 'comb__stage-head'
  const stageLabel = document.createElement('span')
  stageLabel.className = 'comb__stage-label'
  stageLabel.append(faceLabel(side),' / ',templateName(template))
  stageHead.appendChild(stageLabel)

  const zoomWrap = document.createElement('span')
  zoomWrap.className = 'comb__zoom'
  zoomWrap.setAttribute('role', 'group')
  zoomWrap.setAttribute('aria-label', 'Zoom')

  const zoomOut = document.createElement('button')
  zoomOut.type = 'button'
  zoomOut.setAttribute('aria-label', fr ? 'Réduire' : 'Zoom out')
  zoomOut.disabled = zoom <= ZOOM_MIN
  zoomOut.textContent = '−'
  zoomOut.addEventListener('click',()=>{model.zoom=Math.max(ZOOM_MIN,+(zoom/ZOOM_STEP).toFixed(3));redraw()});zoomWrap.appendChild(zoomOut)

  const zoomFit = document.createElement('button')
  zoomFit.type = 'button'
  zoomFit.className = 'comb__zoom-fit'
  zoomFit.disabled = zoom === 1
  zoomFit.textContent = fr ? 'Ajuster' : 'Fit'
  zoomFit.addEventListener('click',()=>{model.zoom=1;redraw()});zoomWrap.appendChild(zoomFit)

  const zoomIn = document.createElement('button')
  zoomIn.type = 'button'
  zoomIn.setAttribute('aria-label', fr ? 'Agrandir' : 'Zoom in')
  zoomIn.disabled = zoom >= ZOOM_MAX
  zoomIn.textContent = '+'
  zoomIn.addEventListener('click',()=>{model.zoom=Math.min(ZOOM_MAX,+(zoom*ZOOM_STEP).toFixed(3));redraw()});zoomWrap.appendChild(zoomIn)

  const expandBtn = document.createElement('button')
  expandBtn.type = 'button'
  expandBtn.setAttribute('aria-label', fr ? 'Aperçu plein écran' : 'Expand preview')
  expandBtn.setAttribute('aria-expanded', String(expanded))
  expandBtn.addEventListener('click',()=>{model.expanded=true;redraw()});expandBtn.appendChild(PreviewExpandIcon())
  zoomWrap.appendChild(expandBtn)

  stageHead.appendChild(zoomWrap)
  work.appendChild(stageHead)

  const stage = document.createElement('div')
  stage.className = 'comb__stage'

  const previewEl = document.createElement('div')
  previewEl.className = 'pro-comp__preview'
  previewEl.style.aspectRatio = `${size.w} / ${size.h}`
  // preview is empty initially, so no img

  // Zones
  zones.forEach((zone, zi) => {
    const filled = zoneFilled(zone, st)
    const on = selected === zone.key
    const nn = String(zi + 1).padStart(2, '0')
    const btn = document.createElement('button')
    btn.type = 'button'
    let cls = 'comp-zone'
    if (filled) cls += ' comp-zone--filled'
    if (on) cls += ' comp-zone--on'
    if (zone.rect.h / size.h < 0.18) cls += ' comp-zone--short'
    btn.className = cls
    btn.style.left = `${(zone.rect.x / size.w) * 100}%`
    btn.style.top = `${(zone.rect.y / size.h) * 100}%`
    btn.style.width = `${(zone.rect.w / size.w) * 100}%`
    btn.style.height = `${(zone.rect.h / size.h) * 100}%`
    btn.setAttribute('data-zone-kind', zone.accepts)
    btn.title = zone.label
    btn.setAttribute('aria-label', `${zone.label}${filled ? (fr ? ', rempli' : ', filled') : fr ? ', vide' : ', empty'}`)
    btn.setAttribute('aria-pressed', String(on))

    const labelSpan = document.createElement('span')
    labelSpan.className = 'comp-zone__label'
    labelSpan.append(nn,' · ',fr&&zone.label==='Caption'?'Légende':zone.label)
    btn.appendChild(labelSpan)

    if (!filled) {
      const addSpan = document.createElement('span')
      addSpan.className = 'comp-zone__add'
      addSpan.setAttribute('aria-hidden', 'true')
      const b = document.createElement('b')
      b.textContent = '＋'
      addSpan.appendChild(b)
      addSpan.appendChild(document.createTextNode(zone.label))
      btn.appendChild(addSpan)
    }

    if (filled && zone.accepts !== 'text') {
      const swapSpan = document.createElement('span')
      swapSpan.className = 'comp-zone__swap'
      swapSpan.setAttribute('role', 'button')
      swapSpan.setAttribute('aria-label', `${fr ? 'Changer' : 'Swap'} ${zone.label}`)
      swapSpan.textContent = '↻';swapSpan.addEventListener('click',e=>{e.stopPropagation();swapZone(zone)})
      btn.appendChild(swapSpan)
    }

    let drag=null,suppressClick=false,photoDims=null,panSeq=0
    if(zone.accepts==='photo'&&filled){const image=new Image;image.onload=()=>photoDims={w:image.naturalWidth,h:image.naturalHeight};image.src=st.photo;btn.addEventListener('pointerdown',e=>{try{btn.setPointerCapture(e.pointerId)}catch{}drag={id:e.pointerId,x:e.clientX,y:e.clientY,pan:st.photoPan||{x:.5,y:.5},moved:false}});btn.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId||!photoDims)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.moved&&Math.hypot(dx,dy)<5)return;drag.moved=true;const factor=size.w/previewEl.clientWidth,cover=Math.max(zone.rect.w/photoDims.w,zone.rect.h/photoDims.h),ew=Math.max(1,photoDims.w*cover-zone.rect.w),eh=Math.max(1,photoDims.h*cover-zone.rect.h),clamp=v=>Math.min(1,Math.max(0,v));st.photoPan={x:clamp(drag.pan.x-dx*factor/ew),y:clamp(drag.pan.y-dy*factor/eh)};const seq=++panSeq;void renderCompositionSide(toDesign(template,st),side,true).then(src=>{if(seq!==panSeq)return;preview=src;const img=previewEl.querySelector('img');if(img)img.src=src})});btn.addEventListener('pointerup',e=>{suppressClick=!!drag?.moved;drag=null;try{btn.releasePointerCapture(e.pointerId)}catch{}});btn.addEventListener('pointercancel',()=>{drag=null})}
    btn.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return}model.selected=on?null:zone.key;redraw()});previewEl.appendChild(btn)
  })

  stage.appendChild(previewEl)
  work.appendChild(stage)

  // Slot info
  const slot = document.createElement('div')
  slot.className = 'comb__slot'
  const node=(tag,cls,children=[])=>{const e=document.createElement(tag);if(cls)e.className=cls;e.append(...children);return e};
  if(selectedZone?.accepts==='text'){
    const edit=node('div','pro-comp__edit');edit.setAttribute('role','group');edit.setAttribute('aria-label',`${fr?'Modifier':'Edit'} ${selectedZone.label}`);
    edit.append(node('span','pro-comp__edit-title',[fr?'Emplacement':'Slot',' ',selectedNN,' · ',zoneKindLabel(selectedZone),' — ',selectedZone.label]));
    if(selectedZone.key==='message'&&st.zoneImages?.[selectedZone.key]){const box=node('div','pro-comp__imgchoice'),img=new Image;img.src=st.zoneImages[selectedZone.key];img.alt=selectedZone.label;const remove=node('button','btn btn--white btn--small',[fr?"Retirer l'image":'Remove image']);remove.type='button';remove.onclick=()=>patch({zoneImages:{...st.zoneImages,[selectedZone.key]:''}});box.append(img,remove);edit.append(box)}else{
      for(const field of selectedZone.fields||[]){const label=node('label','',[field.label]);const input=node(field.multi?'textarea':'input');if(field.multi)input.rows=3;input.value=st.fields[field.key]||'';input.placeholder=field.placeholder||'';input.dataset.field=field.key;input.addEventListener('input',()=>patch({fields:{...st.fields,[field.key]:input.value}}));label.append(input);edit.append(label)}
      if(selectedZone.fields?.length)edit.append(renderTextStyleMenus({font:st.textFont,size:st.textSize??24,defaultFontLabel:fr?'Police d’origine':'Original font',minSize:14,maxSize:36,onFont:textFont=>patch({textFont}),onSize:textSize=>patch({textSize}),lang}));
      if(selectedZone.key==='message'){const label=node('label','btn btn--white btn--small pro-comp__imgup',[fr?'Ou importer une image':'Or import an image']);const input=node('input');Object.assign(input,{type:'file',accept:'image/*',hidden:true});input.onchange=async()=>{const file=input.files?.[0];input.value='';if(!file)return;const url=URL.createObjectURL(file);try{const data=await rasterPhoto(url);patch({zoneImages:{...st.zoneImages,[selectedZone.key]:data}})}catch{model.error=fr?'Impossible de lire cette image.':'Could not read that image.';redraw()}finally{URL.revokeObjectURL(url)}};label.append(input);edit.append(label)}
    }
    const done=node('button','btn btn--white btn--small',[fr?'Terminé':'Done']);done.type='button';done.addEventListener('click',()=>{model.selected=null;redraw()});edit.append(done);slot.append(edit);
  }else if(selectedZone){const p=node('p','comb__slot-info');p.append(node('strong','',[fr?'Emplacement':'Slot',' ',selectedNN,' · ',zoneKindLabel(selectedZone)]),node('span','',[galleryItems.length?(fr?'Sélectionne un élément à gauche pour le remplacer.':'Select an element on the left to replace it.'):(fr?"Crée d'abord un élément depuis la bibliothèque.":'Create an element in the library first.')]));slot.append(p)}else{
    slot.append(node('p','comb__slot-info comb__slot-info--idle',[node('span','',[fr?'Clique sur un emplacement pour le remplir ou le modifier.':'Click a slot to fill or edit it.'])]));
  }
  work.appendChild(slot)

  body.appendChild(work)
  root.appendChild(body)

  // Footer
  const foot = document.createElement('footer')
  foot.className = 'comb__foot'

  const pager = document.createElement('div')
  pager.className = 'comb__pager'
  const pagerSpan = document.createElement('span')
  pagerSpan.append(fr?'Modèle':'Model',' ',String(TEMPLATES.indexOf(template)+1),' / ',String(TEMPLATES.length))
  pager.appendChild(pagerSpan)

  const prevBtn = document.createElement('button')
  prevBtn.type = 'button'
  prevBtn.setAttribute('aria-label', fr ? 'Modèle précédent' : 'Previous template')
  prevBtn.appendChild(pageArrowSvg('prev', 26))
  prevBtn.addEventListener('click',()=>stepTemplate(-1));pager.appendChild(prevBtn)

  const nextBtn = document.createElement('button')
  nextBtn.type = 'button'
  nextBtn.setAttribute('aria-label', fr ? 'Modèle suivant' : 'Next template')
  nextBtn.appendChild(pageArrowSvg('next', 26))
  nextBtn.addEventListener('click',()=>stepTemplate(1));pager.appendChild(nextBtn)

  foot.appendChild(pager)

  const actions = document.createElement('div')
  actions.className = 'comb__actions'

  const resetBtn = document.createElement('button')
  resetBtn.type = 'button'
  resetBtn.className = 'btn btn--white'
  resetBtn.textContent = fr ? 'Réinitialiser' : 'Reset'
  resetBtn.addEventListener('click',()=>{model.states[template]=emptyState(template);model.selected=null;redraw()});actions.appendChild(resetBtn)

  const regenBtn = document.createElement('button')
  regenBtn.type = 'button'
  regenBtn.className = 'btn btn--white'
  regenBtn.disabled = !frames.length && !stamps.length
  regenBtn.textContent = fr ? 'Régénérer' : 'Regenerate'
  regenBtn.addEventListener('click',()=>{if(frames.length)void assignPhoto(frames[Math.floor(Math.random()*frames.length)].id);if(template==='Postcard'&&stamps.length){const e=stamps[Math.floor(Math.random()*stamps.length)];st.stamp=e.src;st.stampId=e.id;redraw()}});actions.appendChild(regenBtn)

  const downloadBtn = document.createElement('button')
  downloadBtn.type = 'button'
  downloadBtn.className = 'btn btn--white'
  downloadBtn.disabled = busy || !preview
  downloadBtn.textContent = fr ? 'Télécharger' : 'Download'
  downloadBtn.addEventListener('click',()=>{if(preview)downloadDataURL(preview,elementFilename(template+' '+side))});actions.appendChild(downloadBtn)

  const addBtn = document.createElement('button')
  addBtn.type = 'button'
  addBtn.className = 'btn btn--dark'
  addBtn.disabled = busy || !preview
  addBtn.textContent = fr ? 'Ajouter à la galerie' : 'Add to Gallery'
  addBtn.addEventListener('click',async()=>{if(model.busy)return;model.busy=true;addBtn.disabled=true;try{const d=toDesign(template,st),src=await renderCompositionSide(d,'front'),{w,h}=elementSize(d);addLocalGenerated({...d,src,width:w,height:h,id:crypto.randomUUID()});model.notice=fr?'Ajouté à ta galerie.':'Added to your gallery.'}catch(e){model.error=e.message}finally{model.busy=false;redraw()}});actions.appendChild(addBtn)

  foot.appendChild(actions)
  root.appendChild(foot)

  if (error) {
    const errP = document.createElement('p')
    errP.setAttribute('role', 'alert')
    errP.className = 'note'
    errP.textContent = error
    root.appendChild(errP)
  }
  if (notice) {
    const noticeP = document.createElement('p')
    noticeP.setAttribute('role', 'status')
    noticeP.className = 'note'
    noticeP.textContent = notice
    root.appendChild(noticeP)
  }

  let expandedStage=null,expandedPreview=null;
  const closeOverlays=()=>{model.expanded=false;model.combosOpen=false;redraw()};
  if(combosOpen){const overlay=node('div','comb__overlay');Object.entries({role:'dialog','aria-modal':'true','aria-label':fr?'Mes combinaisons':'My combinations'}).forEach(([k,v])=>overlay.setAttribute(k,v));const panel=node('div','comb__overlay-panel'),head=node('div','comb__overlay-head');head.append(node('h3','',[fr?'Mes combinaisons':'My combinations']));const close=node('button','comb__overlay-close',['✕']);close.type='button';close.setAttribute('aria-label',fr?'Fermer':'Close');close.addEventListener('click',closeOverlays);head.append(close);panel.append(head,renderGeneratedGallery({kind:'Combination',title:'Combination Gallery',lang,pro:true,pageSize:7}));overlay.append(panel);root.append(overlay)}
  if(expanded){const overlay=node('div','comb__expand');Object.entries({role:'dialog','aria-modal':'true','aria-label':fr?'Aperçu plein écran':'Expanded preview'}).forEach(([k,v])=>overlay.setAttribute(k,v));expandedStage=node('div','comb__expand-stage');expandedPreview=previewEl.cloneNode(true);expandedPreview.querySelectorAll('.comp-zone').forEach((btn,i)=>btn.addEventListener('click',()=>{model.selected=model.selected===zones[i].key?null:zones[i].key;redraw()}));expandedStage.append(expandedPreview);const close=node('button','comb__expand-close',['✕']);close.type='button';close.setAttribute('aria-label',fr?'Fermer':'Close');close.addEventListener('click',closeOverlays);overlay.append(expandedStage,close);root.append(overlay)}
  if(combosOpen||expanded){const onKey=e=>{if(e.key==='Escape')closeOverlays()};document.addEventListener('keydown',onKey);const mo=new MutationObserver(()=>{if(!root.isConnected){document.removeEventListener('keydown',onKey);mo.disconnect()}});queueMicrotask(()=>mo.observe(document.documentElement,{childList:true,subtree:true}))}
  // Async render of preview
  renderCompositionSide(toDesign(template, st), side, true)
    .then((src) => {
      if (!src) return
      preview=src
      const img = document.createElement('img')
      img.src = src
      img.alt = `${templateName(template)} ${faceLabel(side)}`
      previewEl.insertBefore(img, previewEl.firstChild);if(expandedPreview)expandedPreview.insertBefore(img.cloneNode(true),expandedPreview.firstChild);downloadBtn.disabled=false;addBtn.disabled=false;
      const fit=()=>{for(const [area,prev] of [[stage,previewEl],[expandedStage,expandedPreview]]){if(!area||!prev)continue;const cs=getComputedStyle(area);const w=area.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),h=area.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom);prev.style.width=`${Math.round(Math.max(1,Math.min(w,h*size.w/size.h))*zoom)}px`}};const ro=new ResizeObserver(fit);ro.observe(stage);if(expandedStage)ro.observe(expandedStage);fit();let seen=root.isConnected;const detach=new MutationObserver(()=>{if(root.isConnected)seen=true;else if(seen){ro.disconnect();detach.disconnect()}});detach.observe(document.documentElement,{childList:true,subtree:true});
    })
    .catch(() => {})

  if(fr)frenchTree(root);model.root=root;
  return root
}