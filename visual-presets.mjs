// Visual fixtures only. Uses the existing local renderers and their existing controls.
// Never calls account APIs, exports, sign-in, or a remote model.
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const $=s=>document.querySelector(s);
async function wait(s){for(let i=0;i<100;i++){const e=$(s);if(e)return e;await pause(50)}throw Error('Visual fixture missing: '+s)}
async function click(s){(await wait(s)).click();await pause(90)}
async function fill(s,value){const e=await wait(s),proto=e.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));await pause(180)}
async function photo(s='input[type=file]',count=1){const e=await wait(s),dt=new DataTransfer();for(let i=0;i<count;i++){const blob=await(await fetch('./visual-fixtures/photo'+(i%2+1)+'.png')).blob();dt.items.add(new File([blob],'demo-'+i+'.png',{type:'image/png'}))}e.files=dt.files;e.dispatchEvent(new Event('change',{bubbles:true}));await pause(650)}
async function gallery(){if(!$('.creation-gallery--open'))await click('.creation-gallery__toggle')}
async function addPhoto(){await click('.creation-settings__actions .btn--rose');await pause(500)}
export const visualRoutes={
 photo:'/generator', 'photo-gallery':'/generator',upload:'/generator',download:'/generator',reuse:'/generator',message:'/generator?type=Message',letter:'/generator/pro?type=Message&sub=Letter',conversation:'/generator/pro?type=Message&sub=Messages',stamp:'/generator?type=Stamps','stamp-gallery':'/generator?type=Stamps',strip3:'/generator/pro?strip=3',strip5:'/generator/pro?strip=5',postcard:'/generator', 'postcard-back':'/generator',ticket:'/generator',notebook:'/generator?type=Music','notebook-open':'/generator?type=Music',slideshow:'/generator','slideshow-tiktok':'/generator','studio-cover':'/album/local-demo','studio-open':'/album/local-demo','studio-text':'/album/local-demo','video-film':'/video/local-demo','video-vhs':'/video/local-demo'
};
export async function initializeVisualPreset(id){
 document.documentElement.dataset.visualPreset='loading';
 try{
 if(id.startsWith('studio-')){
  await wait('.studio__bar');await pause(250);
  if(id!=='studio-cover'){const b=[...document.querySelectorAll('button')].find(e=>['Open notebook','Ouvrir le carnet'].includes(e.getAttribute('aria-label')));if(!b)throw Error('Open notebook unavailable');b.click();await pause(700)}
  if(id==='studio-text'){
   const tools=[...document.querySelectorAll('button')].find(e=>/Text and shapes|Textes? et formes/i.test(e.getAttribute('aria-label')||''));if(!tools)throw Error('Text tools unavailable');tools.click();await pause(100);await click('.text-shape-tools__add button:nth-child(2)');await click('.studio__primary-tool');await fill('textarea.studio__edit','Bonjour Camille');await click('.inline-text-actions button:first-child');
  }
 }else if(id.startsWith('video-')){await wait('.local-video-editor');await click('.video-poster-action button');const e=await wait('input[accept^="video/"]'),blob=await(await fetch('./visual-fixtures/video.mp4')).blob(),dt=new DataTransfer();dt.items.add(new File([blob],'demo-video.mp4',{type:'video/mp4'}));e.files=dt.files;e.dispatchEvent(new Event('change',{bubbles:true}));await pause(600);await click('.veskin__opt:nth-child('+(id==='video-film'?2:3)+')')}
 else if(['message','letter','conversation'].includes(id)){
  if(id==='conversation')await photo();else if(id==='message'){const e=await wait('[contenteditable=true]');e.textContent='Bonjour Camille';e.dispatchEvent(new Event('input',{bubbles:true}));await pause(300)}else await fill('textarea','Bonjour Camille');
  if(id==='letter'){await click('.row--actions .btn--rose');await pause(500);await gallery()}
 }else if(id==='stamp'||id==='stamp-gallery'){
  await photo();if($('.photo-filters__strip button:nth-child(2)'))await click('.photo-filters__strip button:nth-child(2)');
  if(id==='stamp-gallery'){await click('.row--actions .btn--rose');await pause(500);await gallery()}
 }else if(id==='notebook'||id==='notebook-open'){
  await fill('textarea,input[maxlength="100"]','Bonjour');await click('.row--actions .btn--rose');await pause(350);await gallery();await click('.album');
  if(id==='notebook-open'){await fill('.create-book__title-field input','Notre voyage');await fill('.create-book__fields input','Camille');await click('.create-book__toggle button:nth-child(2)')}
 }else{
  await photo('input[type=file]',id.startsWith('strip')?Number(id.slice(5)):id.startsWith('slideshow')||id==='reuse'?2:1);
  if($('.frame__caption'))await fill('.frame__caption','Bonjour');
  if(id==='upload')await click('.creation-upload');
  else if(id==='reuse'){await click('.creation-upload');await click('.upload-chooser .creation-modal__choice')}
  else if(id.startsWith('slideshow')){await addPhoto();await click('.creation-photos button:nth-child(2)');await addPhoto();await gallery();await click('.ss-open');if(id==='slideshow-tiktok')await click('.ss__toggle button:first-child')}
  else if(['postcard','postcard-back','ticket'].includes(id)){
   await addPhoto();const b=[...document.querySelectorAll('.creator-header__tabs button')].find(e=>/Combination|Combinaison/.test(e.textContent));if(!b)throw Error('Combination tab unavailable');b.click();await pause(250);
   if(id==='ticket'){const e=await wait('.comb__model select,select[aria-label=Template],select[aria-label=Modèle]');e.value='Concert Ticket';e.dispatchEvent(new Event('change',{bubbles:true}));await pause(200)}
   if($('.comp-zone')){await click('.comp-zone');if($('.pro-comp__item'))await click('.pro-comp__item')}
   if(id==='postcard-back')await click('.comb__side button:nth-child(2)');
   if(id!=='postcard'){const zones=[...document.querySelectorAll('.comp-zone')];(id==='postcard-back'?zones[0]:zones[1])?.click();await pause(100);for(const field of [...document.querySelectorAll('.pro-comp__edit [data-field]')].map(e=>e.dataset.field)){await fill('[data-field="'+field+'"]',field==='serial'?'102938':field==='message'?'Bonjour Camille, souvenirs de notre voyage.':'Notre voyage')} }
  }else if(id==='photo-gallery'||id==='download'){await addPhoto();await gallery();if(id==='download'){await click('.element-thumb');await click('.gallery__actions .btn--white')}}
 }
 await document.fonts.ready;await pause(200);document.documentElement.dataset.visualPreset='ready';
 }catch(e){document.documentElement.dataset.visualPreset='error';const n=document.createElement('p');n.setAttribute('role','alert');n.textContent='Visual state not initialized: '+e.message;document.body.prepend(n);console.error(e)}
}
