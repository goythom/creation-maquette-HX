let instance=null,frame=null,observed=null,observer=null,key='',loading=null;
const load=src=>new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.append(s)});
export function detachReviewFeedback(){frame?.removeEventListener('load',sync);frame?.contentWindow?.__cosDesign?.deactivate();instance?.unmount();instance=null;observer?.disconnect();observer=null;observed=null;key='';frame=null}
export async function attachReviewFeedback(target){
 if(frame!==target){detachReviewFeedback();frame=target;target.addEventListener('load',sync)}
 if(!loading)loading=load('/code-on-screen-review.js');await loading;sync();
}
function sync(){
 if(!frame||!window.CodeOnScreenReview||!document.body.hasAttribute('data-fresh-insta'))return;
 const doc=frame.contentDocument,scene=doc?.querySelector('.local-scene');if(!scene)return;
 if(observed!==doc){observer?.disconnect();observed=doc;observer=new MutationObserver(sync);observer.observe(doc.body,{childList:true,subtree:true})}
 const next=[frame.src,scene.dataset.route,scene.dataset.lang,scene.querySelector('[data-kind]')?.dataset.kind||'',doc.querySelector('.pro-subtabs .switch__on')?.textContent||''].join('|');if(next===key&&instance)return;key=next;instance?.unmount();
 async function geometry(){const doc=frame.contentDocument;window.__cosDesign?.deactivate();document.querySelectorAll('html>button').forEach(e=>{if(e.textContent==='Co·D')e.style.display='none'});if(!frame.contentWindow.__cosDesign){await new Promise((ok,no)=>{const s=doc.createElement('script');s.src='/cos-design-overlay.js';s.onload=ok;s.onerror=no;doc.head.append(s)})}frame.contentWindow.__cosDesign.activate()}
 instance=CodeOnScreenReview.mount({targetFrame:frame,language:scene.dataset.lang||'fr',storageKey:'maquette-cos-preview:'+key,appName:'Maquette InstaFrame - '+scene.dataset.route,enabled:true,canUseAdmin:false,dockBottom:20,privacyNotice:'Test local : aucun envoi externe configuré. Les notes restent sur cet appareil.',onDesignRequest:geometry});
}
