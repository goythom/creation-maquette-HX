import {getLocalGenerated} from './local-gallery-deepseek.mjs';
export function renderLocalStudioDemo({lang='en',onNavigate=()=>{}}={}){
 const root=document.createElement('div');root.className='local-studio-fixture';
 const message=document.createElement('p');message.textContent=lang==='fr'?'Chargement du Studio de démonstration local...':'Loading local Studio demo...';root.append(message);
 const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href=new URL('./studio-local-bundle.css',import.meta.url).href;root.append(stylesheet);
 let handle,services,disposed=false,attached=false;
 const cleanup=()=>{if(disposed)return;disposed=true;handle?.unmount();services?.resetLocalStudio();watch.disconnect()};root.__cleanup=cleanup;
 const watch=new MutationObserver(()=>{if(root.isConnected)attached=true;else if(attached)cleanup()});watch.observe(document.documentElement,{childList:true,subtree:true});
 import('./studio-local-bundle.mjs').then(module=>{
  if(disposed)return;services=module;message.remove();module.resetLocalStudio();
  const frames=getLocalGenerated().filter(item=>item.frame).map(item=>({...item.frame,id:item.id}));
  const elements=getLocalGenerated().filter(item=>!item.frame);
  const container=document.createElement('div');root.append(container);
  handle=module.mountLocalStudio(container,{lang,frames,elements,onNavigate,details:{title:lang==='fr'?'Carnet de démonstration':'Demo notebook',recipient:'',date:'',dedication:'',cover:'burgundy',paper:'beige',grain:.35},onClose:()=>onNavigate('/album')});
 }).catch(()=>{message.textContent=lang==='fr'?"Le Studio local n'a pas pu se charger. Aucune connexion ni sauvegarde de compte.":'The local Studio could not load. No sign-in or account save.'});
 return root;
}
