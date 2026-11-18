import {FR} from './french-dictionary.mjs';
export function frenchTree(root){
  function translate(s){const t=s.trim(),key=t.replace(/\s+/g,' ');let value=FR[key];if(value===undefined&&/^Border thickness: (\d+)px$/.test(key))value=key.replace(/^Border thickness: (\d+)px$/, 'Épaisseur de la bordure : $1px');return value===undefined?s:s.replace(t,value);}
  function walk(node){
    if(node.nodeType===3){node.nodeValue=translate(node.nodeValue||'');return;}
    if(node.nodeType!==1||['STYLE','SCRIPT'].includes(node.tagName)||node.closest('[data-no-i18n]'))return;
    for(const k of ['placeholder','aria-label','title','alt']){const v=node.getAttribute(k);if(v!==null)node.setAttribute(k,translate(v));}
    [...node.childNodes].forEach(walk);
  }
  walk(root);
}
