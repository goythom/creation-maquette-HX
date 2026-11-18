import {buildAlbumPages,loadImage,mount2D,initialDetails,notebookConfig,renderSurface,notebookMaterial,COVERS,elementDefaults,renderElement,borderedSticker,renderVideoCard} from './current-rendering-helpers.mjs';
import {pixel} from './pixel-dom.mjs';

const FRAME_SPECS = {
  'instax-mini': { label:'Instax Mini', card:{w:4.47,h:7.12}, photo:{x:0.33,y:0.41,w:3.81,h:5.13}, thumbW:2.43 },
  polaroid: { label:'Polaroid', card:{w:4.48,h:4.43}, photo:{x:0.2,y:0.19,w:4.08,h:3.37}, thumbW:2.84 },
};
const CAPTION_REFERENCE_WIDTH = 340;
const MIN_CAPTION_SIZE = 12, MAX_CAPTION_SIZE = 40, DEFAULT_CAPTION_SIZE = 24;
const MIN_ZOOM = 1, MAX_ZOOM = 4;
const clamp = (v,min,max)=>Math.min(max,Math.max(min,v));
const clamp01 = v=>clamp(v,0,1);
const clampZoom = z=>clamp(Number.isFinite(z)?z:1,MIN_ZOOM,MAX_ZOOM);
const clampCaptionSize = s=>clamp(Number.isFinite(s)?Math.round(s):DEFAULT_CAPTION_SIZE,MIN_CAPTION_SIZE,MAX_CAPTION_SIZE);
const captionFontPx = (s,w)=>(clampCaptionSize(s)*w)/CAPTION_REFERENCE_WIDTH;
function coverRect(image,window,zoom,pan){
  if(image.width<=0||image.height<=0||window.width<=0||window.height<=0)return{x:0,y:0,width:0,height:0};
  const scale=Math.max(window.width/image.width,window.height/image.height)*clampZoom(zoom);
  const width=image.width*scale,height=image.height*scale;
  return{x:-(width-window.width)*clamp01(pan.x),y:-(height-window.height)*clamp01(pan.y),width,height};
}

const unit = v=>`calc(var(--u) * ${v})`;

function pageArrow(dir,s=24){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 24 24');
  svg.setAttribute('width',String(s));
  svg.setAttribute('height',String(s));
  svg.setAttribute('fill','none');
  svg.setAttribute('stroke','currentColor');
  svg.setAttribute('stroke-width','3.4');
  svg.setAttribute('stroke-linecap','round');
  svg.setAttribute('stroke-linejoin','round');
  svg.setAttribute('aria-hidden','true');
  svg.style.display='block';
  svg.style.margin='auto';
  svg.style.flexShrink='0';
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d',dir==='next'?'M4 12h14M12.5 5.5 19 12l-6.5 6.5':'M20 12H6M11.5 5.5 5 12l6.5 6.5');
  svg.appendChild(path);
  return svg;
}

function imageIcon(scale,color){
  const span=document.createElement('span');
  span.style.display='inline-flex';
  span.style.alignItems='center';
  span.style.justifyContent='center';
  span.style.color=color;
  const el=pixel('image',Math.round(24*scale),false);
  if(el)span.appendChild(el);
  return span;
}

export function renderDemoFrame({photo,cap,format='instax-mini'}={}){
  const spec=FRAME_SPECS[format];
  const frame={format,photo:{src:photo,width:photo.includes('trip-polaroid')?816:photo.includes('summer-2026')?596:700,height:photo.includes('trip-polaroid')?674:photo.includes('summer-2026')?950:700},caption:cap,captionSize:18,zoom:1,pan:{x:.5,y:.5}};
  const scale=1;
  const windowSize={width:spec.photo.w,height:spec.photo.h};
  const drawn=coverRect(frame.photo,windowSize,frame.zoom,frame.pan);
  const root=document.createElement('div');
  root.className=`frame frame--${frame.format}`;
  root.style.width=unit(spec.card.w*scale);
  root.style.height=unit(spec.card.h*scale);
  root.style.borderRadius=unit(scale*0.15);
  root.setAttribute('data-testid','frame');
  root.addEventListener('pointermove',event=>{
    const box=root.getBoundingClientRect();
    if(box.width){
      root.style.setProperty('--gx',`${((event.clientX-box.left)/box.width)*100}%`);
      root.style.setProperty('--gy',`${((event.clientY-box.top)/box.height)*100}%`);
    }
  });
  const win=document.createElement('div');
  win.className='frame__photo';
  win.style.left=unit(spec.photo.x*scale);
  win.style.top=unit(spec.photo.y*scale);
  win.style.width=unit(spec.photo.w*scale);
  win.style.height=unit(spec.photo.h*scale);
  win.style.borderRadius=unit(scale*0.08);
  const img=document.createElement('img');
  img.src=frame.photo.src;
  img.alt='';
  img.draggable=false;
  img.style.left=`${(drawn.x/spec.photo.w)*100}%`;
  img.style.top=`${(drawn.y/spec.photo.h)*100}%`;
  img.style.width=`${(drawn.width/spec.photo.w)*100}%`;
  img.style.height=`${(drawn.height/spec.photo.h)*100}%`;
  win.appendChild(img);
  root.appendChild(win);
  const captionBox={top:unit((spec.photo.y+spec.photo.h)*scale),height:unit((spec.card.h-spec.photo.y-spec.photo.h)*scale)};
  const fontSize=`max(8px, calc(var(--u) * ${spec.card.w*scale} * ${captionFontPx(frame.captionSize,1)}))`;
  const capEl=document.createElement('span');
  capEl.className='frame__caption';
  capEl.style.top=captionBox.top;
  capEl.style.height=captionBox.height;
  capEl.style.fontSize=fontSize;
  capEl.textContent=frame.caption;
  root.appendChild(capEl);
  return root;
}

const PLAY_MARKS = {
  Audio: { base:{w:480,h:150}, disc:{cx:55,cy:75,r:19,fill:'#fff'}, tri:{a:[51,68],b:[51,82],c:[61,75],fill:'#171717'} },
  Music: { base:{w:320,h:440}, disc:{cx:259,cy:383,r:25,fill:'#fff'}, tri:{a:[255,377],b:[255,389],c:[265,383],fill:'#171717'} },
  Video: { base:{w:640,h:480}, tri:{a:[294,154],b:[294,220],c:[352,187],fill:'#dedee1'} },
};

async function addPlayMark(src,mark){
  try{
    const img=new Image();
    img.src=src;
    await img.decode();
    const width=img.naturalWidth,height=img.naturalHeight;
    if(!width||!height)return src;
    const canvas=document.createElement('canvas');
    canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext('2d');
    if(!ctx)return src;
    ctx.drawImage(img,0,0);
    const s=width/mark.base.w;
    if(mark.disc){
      ctx.beginPath();
      ctx.arc(mark.disc.cx*s,mark.disc.cy*s,mark.disc.r*s,0,Math.PI*2);
      ctx.fillStyle=mark.disc.fill;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(mark.tri.a[0]*s,mark.tri.a[1]*s);
    ctx.lineTo(mark.tri.b[0]*s,mark.tri.b[1]*s);
    ctx.lineTo(mark.tri.c[0]*s,mark.tri.c[1]*s);
    ctx.closePath();
    ctx.fillStyle=mark.tri.fill;
    ctx.fill();
    return canvas.toDataURL('image/png');
  }catch{
    return src;
  }
}

export async function renderShowcaseArt({item,lang="en"}={}){
  const art=item.art;
  if(art==='frame')return '';
  const {kind,over}=art;
  let src;
  if(kind==='Stickers'){
    const v=await borderedSticker(over.image||'/stickers/kawaii_01.png','#ffffff',10);
    src=v.src;
  }else if(kind==='Video'){
    src=await renderVideoCard(over.image||'',over.text||'Video','');
  }else{
    src=await renderElement({...elementDefaults(kind),...over});
  }
  const mark=PLAY_MARKS[kind];
  return mark?addPlayMark(src,mark):src;
}

const photoLoadsCache={value:null};
function getPhotoLoads(){
  if(!photoLoadsCache.value){
    photoLoadsCache.value=[
      loadImage('/demo-couples/our-first-trip.webp'),
      loadImage('/demo-couples/just-because.webp'),
    ];
  }
  return photoLoadsCache.value;
}

const yieldToMain=()=>new Promise(r=>{setTimeout(r,0)});

const plans=new Map();

export function renderHomeNotebookDemo({lang="en"}={}){
  const fr=lang==='fr';
  const root=document.createElement('div');
  root.className='notebook-preview hv-notebook-demo';
  root.setAttribute('data-no-i18n','');
  root.setAttribute('aria-label',fr?'Vrai aperçu 2D, carnet de démonstration':'Real 2D preview, demonstration notebook');

  const spreadwrap=document.createElement('div');
  spreadwrap.className='hv-spreadwrap hv-notebook-object';
  const host=document.createElement('div');
  host.className='hv-notebook-host';
  host.setAttribute('aria-busy','true');
  host.tabIndex=0;
  spreadwrap.appendChild(host);

  const paint=document.createElement('div');
  paint.className='hv-paint';
  paint.setAttribute('aria-hidden','true');
  const paintIcons=[['crayon',true],['postit',false],['gomme',false],['image',false]];
  for(const [name,on] of paintIcons){
    const span=document.createElement('span');
    span.className='hv-bev hv-bev-sm'+(on?' on':'');
    const ic=pixel(name,18,false);
    if(ic)span.appendChild(ic);
    paint.appendChild(span);
  }
  spreadwrap.appendChild(paint);
  root.appendChild(spreadwrap);

  const status=document.createElement('p');
  status.setAttribute('role','status');
  status.textContent=fr?'Préparation du carnet…':'Preparing notebook…';
  root.appendChild(status);

  const alert=document.createElement('p');
  alert.setAttribute('role','alert');
  alert.style.display='none';
  const alertText=document.createElement('span');
  alertText.textContent=fr?'Aperçu indisponible.':'Preview unavailable.';
  alert.appendChild(alertText);
  alert.appendChild(document.createTextNode(' '));
  const retryBtn=document.createElement('button');
  retryBtn.textContent=fr?'Réessayer':'Try again';
  alert.appendChild(retryBtn);
  root.appendChild(alert);

  const controls=document.createElement('div');
  controls.className='hv-notebook-controls';
  const prevBtn=document.createElement('button');
  prevBtn.setAttribute('aria-label',fr?'Page précédente':'Previous page');
  prevBtn.appendChild(pageArrow('prev',26));
  const labelSpan=document.createElement('span');
  labelSpan.setAttribute('aria-live','polite');
  const nextBtn=document.createElement('button');
  nextBtn.setAttribute('aria-label',fr?'Page suivante':'Next page');
  nextBtn.appendChild(pageArrow('next',26));
  const coverBtn=document.createElement('button');
  controls.appendChild(prevBtn);
  controls.appendChild(labelSpan);
  controls.appendChild(nextBtn);
  controls.appendChild(coverBtn);
  root.appendChild(controls);

  const hint=document.createElement('p');
  hint.className='hv-notebook-hint';
  hint.textContent=fr?'Exemple à feuilleter, sans modifier votre carnet.':'Browse the example without changing your notebook.';
  root.appendChild(hint);

  let page=1;
  let busy=true;
  let failed=false;
  let attempt=0;
  let visible=false;
  let api=null;
  let cancelled=false;
  let owned=null;
  let io=null;
  let mo=null;
  let rafId=0;
  let retries=0;
  let started=false;

  const updateLabel=()=>{
    const label=page===0?(fr?'Couverture':'Cover'):page===5?(fr?'Dos du carnet':'Back cover'):`${fr?'Pages':'Pages'} ${page}-${Math.min(4,page+1)} / 4`;
    labelSpan.textContent=label;
    prevBtn.disabled=busy||failed||page===0;
    nextBtn.disabled=busy||failed||page===5;
    coverBtn.disabled=busy||failed;
    coverBtn.textContent=page===0?(fr?'Ouvrir':'Open'):(fr?'Couverture':'Cover');
  };
  const setPage=p=>{page=p;updateLabel();};
  const setBusy=b=>{busy=b;host.setAttribute('aria-busy',b?'true':'false');status.style.display=b?'':'none';updateLabel();};
  const setFailed=f=>{failed=f;alert.style.display=f?'':'none';updateLabel();};

  prevBtn.addEventListener('click',()=>api?.prev());
  nextBtn.addEventListener('click',()=>api?.next());
  coverBtn.addEventListener('click',()=>api?.goto(page===0?1:0));
  retryBtn.addEventListener('click',()=>{attempt++;started=false;start();});
  host.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'){e.preventDefault();api?.next();}
    if(e.key==='ArrowLeft'){e.preventDefault();api?.prev();}
  });

  updateLabel();
  setBusy(true);

  const fittedSurface=(d,i,pages,hostEl,surfaces)=>{
    const cover=i===0||i===pages+1;
    const source=cover?renderSurface(d,i):surfaces[i-1];
    const c=document.createElement('canvas');
    c.width=source.width;
    c.height=Math.round(c.width*hostEl.clientHeight/Math.floor(hostEl.clientWidth/2));
    const ctx=c.getContext('2d');
    ctx.fillStyle=ctx.createPattern(notebookMaterial(cover?COVERS[d.config.cover].color:'#212220',cover?.65:d.config.grain,cover),'repeat');
    ctx.fillRect(0,0,c.width,c.height);
    const gutter=cover?null:i%2===1?'right':'left';
    const crop=Math.round(source.width*.05);
    const sx=gutter==='left'?crop:0;
    const sw=source.width-(gutter?crop:0);
    const scale=Math.min(c.width/sw,c.height/source.height);
    const w=sw*scale,h=source.height*scale;
    ctx.drawImage(source,sx,0,sw,source.height,(c.width-w)/2,(c.height-h)/2,w,h);
    if(gutter){
      const span=Math.round(c.width*.14);
      const x0=gutter==='right'?c.width:0;
      const x1=gutter==='right'?c.width-span:span;
      const g=ctx.createLinearGradient(x0,0,x1,0);
      g.addColorStop(0,'rgba(0,0,0,.42)');
      g.addColorStop(.32,'rgba(0,0,0,.035)');
      g.addColorStop(.45,'rgba(255,255,245,.028)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;
      ctx.fillRect(Math.min(x0,x1),0,span,c.height);
    }
    return c;
  };

  const start=async()=>{
    if(started)return;
    started=true;
    cancelled=false;
    setBusy(true);
    setFailed(false);
    try{
      const langKey=fr?'fr':'en';
      let plan=plans.get(langKey);
      if(!plan){
        const photos=await Promise.all(getPhotoLoads());
        if(cancelled)return;
        await yieldToMain();
        if(cancelled)return;
        const frame=(i,x,y,rotation)=>({id:`demo-frame-${i}`,kind:'frame',x,y,w:350,h:560,rotation,frame:{id:`demo-photo-${i}`,format:'instax-mini',photo:{src:photos[i].src,width:photos[i].naturalWidth,height:photos[i].naturalHeight},zoom:1,pan:{x:.5,y:.5},caption:i===0?'our first trip':fr?'juste comme ça ♡':'just because',captionSize:24}});
        const text=(id,value,x,y,w)=>({id,kind:'text',text:value,x,y,w,h:120,rotation:0,font:'sans',fontSize:40});
        const album=[[frame(0,110,110,-4),text('demo-note-left','just you and me',90,900,650),frame(1,1280,130,5),text('demo-note-right',fr?"Ce jour-là,\non a oublié l'heure. ♡":'That day,\nwe forgot the time. ♡',1000,840,670)],[text('demo-last',fr?'Nos petits moments ♡':'Our little moments ♡',100,400,650)]];
        const details={...initialDetails,title:fr?'Nos souvenirs':'Our memories'};
        const config=notebookConfig(details,fr);
        const count=4;
        const images=await buildAlbumPages(album,false,false,false,{color:'#212220',grain:config.grain},[],'',undefined,count);
        if(cancelled)return;
        await yieldToMain();
        if(cancelled)return;
        const surfaces=[];
        for(const src of images.slice(1,-1)){
          const im=await loadImage(src);
          const c=document.createElement('canvas');
          c.width=im.naturalWidth;
          c.height=im.naturalHeight;
          c.getContext('2d').drawImage(im,0,0);
          surfaces.push(c);
          await yieldToMain();
          if(cancelled)return;
        }
        const doc={schema:1,revision:1,config,pages:Array.from({length:count},(_,i)=>({id:`demo-${i}`,title:'',items:[]}))};
        plan={doc,surfaces,count};
        plans.set(langKey,plan);
      }
      const {doc,surfaces,count:pages}=plan;
      const hostEl=host;
      if(!hostEl){if(!cancelled)setFailed(true);return;}
      const fitted=[];
      for(let i=0;i<=pages+1;i++){
        fitted[i]=fittedSurface(doc,i,pages,hostEl,surfaces);
        await yieldToMain();
        if(cancelled)return;
      }
      await yieldToMain();
      if(cancelled)return;
      const takeFitted=(d,i)=>{const c=fitted[i];delete fitted[i];return c||fittedSurface(d,i,pages,hostEl,surfaces);};
      hostEl.replaceChildren();
      owned=mount2D(hostEl,doc,1,setPage,takeFitted,1600,0,0,true);
      api=owned;
      setPage(1);
      setBusy(false);
    }catch(error){
      
      photoLoadsCache.value=null;
      if(!cancelled){setBusy(false);setFailed(true);}
    }
  };

  const tryStart=()=>{
    if(cancelled||!visible)return;
    if(!root.isConnected){return;}
    const w=host.clientWidth,h=host.clientHeight;
    if(w>0&&h>0){start();return;}
    if(retries++<60){rafId=requestAnimationFrame(tryStart);}
  };

  const onIntersect=entries=>{
    if(entries.some(e=>e.isIntersecting)){
      visible=true;
      if(io){io.disconnect();io=null;}
      retries=0;
      rafId=requestAnimationFrame(tryStart);
    }
  };

  if(typeof IntersectionObserver!=='undefined'){
    io=new IntersectionObserver(onIntersect,{rootMargin:'250px'});
    io.observe(root);
  }else{
    visible=true;
    rafId=requestAnimationFrame(tryStart);
  }

  const cleanup=()=>{
    cancelled=true;
    if(io){io.disconnect();io=null;}
    if(mo){mo.disconnect();mo=null;}
    if(rafId){cancelAnimationFrame(rafId);rafId=0;}
    if(owned){owned.dispose();owned=null;}
    if(api===owned)api=null;
  };

  if(typeof MutationObserver!=='undefined'){
    mo=new MutationObserver(()=>{
      if(!root.isConnected){
        cleanup();
        if(mo){mo.disconnect();mo=null;}
      }
    });
    mo.observe(document.documentElement,{childList:true,subtree:true});
  }

  return root;
}