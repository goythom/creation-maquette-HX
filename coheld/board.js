/* Coheld dans le board : onglet projet + sélection des pages sur le côté. Aucun autre projet n'est modifié. */
(function(){
 const tabbar=document.getElementById('tabbar');if(!tabbar)return;
 const groups=[
  ['Présentation',[["Page d'accueil",'home']]],
  ["Navigation de l'application",[['Tableau de bord','dashboard'],['Mes projets','projects'],['Ma mémoire','memory'],['Mes connexions IA','connections'],['Boîte de réception','inbox'],['Partages et transferts','shares'],['Recherche globale','search'],['Exports et sauvegardes','exports'],['Paramètres','settings']]],
  ['Projet : Refonte du site vitrine',[["Vue d'ensemble",'project'],['Brief','project-brief'],['Documents','project-docs'],['Décisions','project-decisions'],['Transfert','project-transfer']]],
  ['Bibliothèque',[["Système d'interface",'components']]]
 ];
 const base=new URL('./',document.currentScript?document.currentScript.src:location.href).href;
 let shell,frame,stage,title,current='dashboard',viewport=1440,actual=false,open=false;
 const make=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
 const label=id=>{for(const[,items]of groups)for(const i of items)if(i[1]===id)return i[0];return id};
 function resize(){if(!shell||shell.hidden)return;const area=shell.querySelector('.ch-stage'),scale=actual?1:Math.min(1,(area.clientWidth-32)/viewport);frame.style.width=viewport+'px';frame.style.height=Math.max(600,area.clientHeight-80)/Math.max(.1,scale)+'px';frame.style.transform='scale('+Math.max(.1,scale)+')';const sp=shell.querySelector('.ch-space');sp.style.width=viewport*Math.max(.1,scale)+'px';sp.style.height=parseFloat(frame.style.height)*Math.max(.1,scale)+'px'}
 function mark(id){current=id;shell.querySelectorAll('.ch-page').forEach(b=>b.classList.toggle('active',b.dataset.page===id));title.textContent=label(id)}
 function show(id){mark(id);frame.src=base+id+'.html';resize()}
 function build(){
  const st=make('style');st.textContent=`body[data-coheld] #tabbar{display:flex!important;position:fixed!important;z-index:100!important;top:16px;left:16px}body[data-coheld] #viewport,body[data-coheld] #subbar,body[data-coheld] #hxsub,body[data-coheld] #iup-side,body[data-coheld] #hud,body[data-coheld] #themebar,body[data-coheld] #controls{display:none!important}#coheld-board{position:fixed;inset:58px 0 0;z-index:26;display:grid;grid-template-columns:240px minmax(0,1fr);background:#efefed;color:#222;font:13px/1.4 Arial,sans-serif}#coheld-board[hidden]{display:none}#coheld-board .ch-global{position:fixed;top:12px;left:16px;display:flex;z-index:101}#coheld-board .ch-global button{padding:10px 16px;border:1px solid #222;background:white;color:#222;font-weight:700}#coheld-board .ch-global button:disabled{background:#222;color:white;cursor:default}#coheld-board nav{overflow:auto;background:#fafafa;border-right:1px solid #ddd;padding:16px 10px}#coheld-board h2{font:700 12px Arial;margin:20px 10px 6px}#coheld-board h2:first-child{margin-top:4px}#coheld-board button{font:13px Arial;cursor:pointer}.ch-page{display:block;width:100%;padding:9px 12px;text-align:left;border:0;background:none;color:#444;border-radius:5px}.ch-page.active{background:#dfe2df;color:#111;font-weight:700}.ch-stage{overflow:auto;padding:16px}.ch-tools{display:flex;gap:6px;align-items:center;margin-bottom:12px;flex-wrap:wrap}.ch-tools button,.ch-tools a{padding:6px 10px;border:1px solid #bbb;background:white;color:#222;text-decoration:none;font:13px Arial}.ch-title{font-weight:700;margin-right:12px}.ch-space{position:relative;background:white;overflow:hidden}#coheld-board iframe{display:block;border:0;max-width:none;transform-origin:top left;background:white}@media(max-width:900px){#coheld-board{grid-template-columns:160px minmax(0,1fr)}}`;
  document.head.append(st);
  shell=make('section');shell.id='coheld-board';shell.hidden=true;
  const top=make('header','ch-global');
  for(const[t,id]of [['PLANCHE HX','tab-hx'],['InstaFrame','tab-insta'],['InstaFrame - copie','tab-insta-copy'],['InstaFrame mobile','tab-insta-mobile'],['Coheld','']]){const b=make('button','',t);if(id)b.onclick=()=>leave(id);else b.disabled=true;top.append(b)}
  shell.append(top);
  const nav=make('nav');nav.setAttribute('aria-label','Pages Coheld');
  for(const[g,items]of groups){nav.append(make('h2','',g));for(const it of items){const b=make('button','ch-page',it[0]);b.dataset.page=it[1];b.onclick=()=>show(it[1]);nav.append(b)}}
  stage=make('main','ch-stage');const tools=make('header','ch-tools');title=make('span','ch-title');tools.append(title);
  for(const[t,fn]of [['1440',()=>{viewport=1440;actual=false;resize()}],['iPad 768',()=>{viewport=768;actual=false;resize()}],['390',()=>{viewport=390;actual=false;resize()}],['Ajuster',()=>{actual=false;resize()}],['100 %',()=>{actual=true;resize()}]]){const b=make('button','',t);b.onclick=fn;tools.append(b)}
  const ext=make('a','','Ouvrir la page seule');ext.target='_blank';ext.rel='noopener';tools.append(ext);
  const sp=make('div','ch-space');frame=make('iframe');frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-downloads');
  frame.addEventListener('load',()=>{try{const m=frame.contentWindow.location.pathname.match(/\/coheld\/([^/.]+)/);if(m&&m[1]!=='board'){mark(m[1]);ext.href=base+m[1]+'.html'}}catch(e){}});
  sp.append(frame);stage.append(tools,sp);shell.append(nav,stage);document.body.append(shell);
  shell._ext=ext;window.addEventListener('resize',resize)}
 function openCoheld(id){
  if(!shell)build();
  window.__cosDesign&&window.__cosDesign.deactivate&&window.__cosDesign.deactivate();
  document.body.removeAttribute('data-fresh-insta');document.querySelectorAll('#fresh-instaframe').forEach(e=>e.hidden=true);
  document.querySelectorAll('[data-code-on-screen-os]').forEach(e=>e.style.display='none');document.querySelectorAll('html>button').forEach(e=>{if(e.textContent==='Co·D'){e.dataset.chHidden='';e.style.display='none'}});document.body.setAttribute('data-coheld','');shell.hidden=false;open=true;
  tabbar.querySelectorAll('button').forEach(b=>b.classList.remove('on'));document.getElementById('tab-coheld')&&document.getElementById('tab-coheld').classList.add('on');
  shell._ext.href=base+(id||current)+'.html';
  show(id||current);history.replaceState(null,'','#coheld');document.documentElement.classList.remove('instaframe-loading')}
 function closeCoheld(){if(!open)return;open=false;if(shell)shell.hidden=true;document.body.removeAttribute('data-coheld');document.querySelectorAll('[data-code-on-screen-os]').forEach(e=>e.style.display='');document.querySelectorAll('[data-ch-hidden]').forEach(e=>{e.style.display='';e.removeAttribute('data-ch-hidden')});const t=document.getElementById('tab-coheld');t&&t.classList.remove('on')}
 function leave(id){closeCoheld();if(id==='tab-hx'){if(typeof window.showTab==='function')window.showTab('hx');return}const b=document.getElementById(id);b&&b.click()}
 window.openCoheld=openCoheld;
 const tab=document.getElementById('tab-coheld');if(tab){tab.removeAttribute('onclick');tab.onclick=()=>openCoheld();tabbar.append(tab)}
 /* Un clic sur un autre onglet referme Coheld, puis laisse l'onglet choisi faire son travail. */
 tabbar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.id==='tab-coheld'||!open)return;closeCoheld();if(/^tab-insta/.test(b.id)&&typeof window.openFreshInsta==='function')setTimeout(()=>window.openFreshInsta(),0)},true);
 const prev=window.showTab;if(typeof prev==='function')window.showTab=function(t){closeCoheld();return prev.apply(this,arguments)};
 if(location.hash==='#coheld')openCoheld();
})();
