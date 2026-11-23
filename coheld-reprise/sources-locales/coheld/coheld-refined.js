(()=>{
 const en=new URLSearchParams(location.search).get('lang')==='en'; document.documentElement.lang=en?'en':'fr';
 document.querySelectorAll('[data-fr][data-en]').forEach(e=>e.innerHTML=e.dataset[en?'en':'fr'].replace(/<br\s*\/?\s*>/gi,'<br> '));
 if(window.lucide)lucide.createIcons();
 document.querySelector('.c2-output>span').textContent=en?'Suggested structure · based on the shared brief':'Structure proposée · à partir du brief partagé';document.querySelector('.c2-output>small').textContent=en?'Sources: brief.md + decision.md · Camille. Private notes excluded.':'Sources : brief.md + decision.md · Camille. Notes privées exclues.';
 if(en){const titles=['The promise','How it works','Trust'],bodies=['Explain what the product changes for the team.','Show the path: choose, share, continue.','Explain what is shared and what stays private.'];document.querySelectorAll('.m-outline li').forEach((li,i)=>{li.querySelector('strong').textContent=titles[i];li.querySelector('p').textContent=bodies[i]})}
 const demo=document.querySelector('.c2-demo');if(!demo)return;
 const $=s=>demo.querySelector(s), $$=s=>[...demo.querySelectorAll(s)], f=$('.c2-flow');
 const waiting=$('.c2-waiting'), notification=$('.c2-notification'),question=$('.c2-question'), accept=$('.c2-accept'),output=$('.c2-output');
 const parts=[waiting,notification,question,accept,output];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const captions=en?['Camille selects two items. Her personal notes stay private.','Only the selected context moves, with its source.','Karim accepts in his chat, then uses the shared context.']:['Camille choisit deux éléments. Ses notes personnelles restent privées.','Seul le contexte choisi circule, avec sa source.','Karim accepte dans son chat, puis utilise le contexte reçu.'];
 let active=[],run=0,paused=false,scene=0;
 function show(el,yes){el.hidden=!yes;el.style.setProperty('display',yes?(el===notification||el===waiting?'flex':'block'):'none','important');el.style.setProperty('opacity','1','important');el.style.transform='none';el.setAttribute('aria-hidden',String(!yes))}
 function frame(n){scene=n;parts.forEach(x=>show(x,false));show(n===0||n===1?waiting:notification,true);if(n===2){show(question,true);show(accept,true);show(output,true)};$$('.c2-selection').forEach(x=>{x.style.background=n===0?'transparent':'#f6f6f2';x.querySelector('.c2-check').style.opacity=n===0?'.25':'1'});$$('[data-scene]').forEach((b,i)=>{b.classList.toggle('is-active',i===n);b.setAttribute('aria-pressed',String(i===n))});$('.c2-scene-caption').textContent=captions[n]}
 function stop(){run++;active.forEach(a=>a.stop?.());active=[];$$('.flight-sheet').forEach(x=>x.remove())}
 const wait=ms=>new Promise(resolve=>{let elapsed=0,last=performance.now(),token=run;function tick(now){if(token!==run){resolve();return}if(!paused)elapsed+=Math.min(now-last,80);last=now;if(elapsed>=ms)resolve();else requestAnimationFrame(tick)}requestAnimationFrame(tick)});
 function anim(el,props,opts){if(reduced.matches)return {finished:Promise.resolve(),stop(){}};const a=Motion.animate(el,props,opts);active.push(a);return a}
 function button(){const b=$('[data-pause]');b.textContent=paused?(en?'Play':'Lire'):'Pause';b.setAttribute('aria-pressed',String(paused))}
 async function play(){stop();paused=false;button();let token=run;frame(0);if(reduced.matches){frame(2);paused=true;button();return}
  await wait(900);if(token!==run)return;
  for(const row of $$('.c2-selection')){anim(row,{backgroundColor:['#fff','#eeeeea','#f6f6f2']},{duration:.6});row.querySelector('.c2-check').style.opacity='1';await wait(230);if(token!==run)return}
  await wait(1100);if(token!==run)return;frame(1);
  const packet=document.createElement('div');packet.className='flight-sheet';packet.setAttribute('aria-hidden','true');packet.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 17h6"/></svg><span><b>'+(en?'2 .md files':'2 fichiers .md')+'</b><small>Camille · brief v4</small></span>';f.append(packet);
  const box=f.getBoundingClientRect(),a=$('.c2-selection').getBoundingClientRect(),b=notification.parentElement.getBoundingClientRect(),c=$('.platform i').getBoundingClientRect();
  const start={x:a.x-box.x+25,y:a.y-box.y+8},mid={x:c.x-box.x-45,y:c.y-box.y},end={x:b.x-box.x+18,y:b.y-box.y+20};
  packet.style.transform=`translate(${start.x}px,${start.y}px)`;
  await anim(packet,{x:[start.x,mid.x,end.x],y:[start.y,mid.y,end.y],opacity:[0,1,1,1,0],scale:[.94,.85,1]},{duration:2.4,times:[0,.5,1],ease:[.22,1,.36,1]}).finished;if(token!==run)return;packet.remove();
  show(waiting,false);show(notification,true);show(question,true);anim(notification,{opacity:[0,1],y:[5,0]},{duration:.3});await wait(1500);if(token!==run)return;show(accept,true);anim(accept,{opacity:[0,1],y:[4,0]},{duration:.25});await wait(950);if(token!==run)return;frame(2);anim(output,{opacity:[0,1],y:[8,0]},{duration:.45});paused=true;button();
 }
 $$('[data-scene]').forEach((b,i)=>b.addEventListener('click',()=>{stop();paused=true;frame(i);button()}));
 $('[data-replay]').addEventListener('click',play);$('[data-pause]').addEventListener('click',()=>{if(paused){if(scene===2)play();else{paused=false;active.forEach(a=>a.play?.());button()}}else{paused=true;active.forEach(a=>a.pause?.());button()}});
 window.coheldPreview={play,show:n=>{stop();paused=true;frame(n);button()},getState:()=>({scene,paused,reduced:reduced.matches})};
 frame(0);if(reduced.matches){frame(2);paused=true;button()}
 else{let started=false;new IntersectionObserver(es=>{if(es[0].isIntersecting&&!started){started=true;play()}},{threshold:.35}).observe(demo);}
 const heroAnimations=[];function unfold(){heroAnimations.forEach(a=>a.stop());if(reduced.matches)return;heroAnimations.push(Motion.animate('.art-note-back',{y:[310,310,0],rotate:[-2,-2,-10],opacity:[0,1,1]},{duration:1.9,times:[0,.12,1],ease:[.22,1,.36,1]}),Motion.animate('.art-note-front',{y:[260,260,0],rotate:[-2,-2,8],opacity:[0,1,1]},{duration:1.8,delay:.3,times:[0,.12,1],ease:[.22,1,.36,1]}));}window.coheldPreview.unfold=unfold;unfold();document.querySelector('.replay-art')?.addEventListener('click',unfold);
 reduced.addEventListener('change',()=>{stop();if(reduced.matches){frame(2);paused=true;button()}});
})();
