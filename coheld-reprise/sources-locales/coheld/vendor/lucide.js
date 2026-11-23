(()=>{var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var C=([e,a,t])=>{let r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(a).forEach(o=>{r.setAttribute(o,String(a[o]))}),t?.length&&t.forEach(o=>{let s=C(o);r.appendChild(s)}),r},h=(e,a={})=>{let r={...u,...a};return C(["svg",r,e])};var S=(...e)=>{let a=new Set;for(let t of e)if(typeof t=="string")for(let r of t.split(/\s+/))r&&a.add(r);return[...a].join(" ")};var g=e=>{if(e==null||typeof e!="object")return!1;for(let a in e)if(Object.prototype.hasOwnProperty.call(e,a)&&(a.startsWith("aria-")||a==="role"||a==="title")&&e[a]!=null)return!0;return!1};var w=e=>{let a="",t=!1;for(let r of e){if(r==="-"||r==="_"||r<=" "){t=a.length>0;continue}a.length===0?a+=r.toLowerCase():a+=t?r.toUpperCase():r,t=!1}return a};var P=e=>{let a=w(e);return a.charAt(0).toUpperCase()+a.slice(1)};var M=e=>Array.from(e.attributes).reduce((a,t)=>(a[t.name]=t.value,a),{}),A=e=>typeof e=="string"?e.split(" ").filter(Boolean):!e||!e.class?[]:e.class&&typeof e.class=="string"?e.class.split(" ").filter(Boolean):e.class&&Array.isArray(e.class)?e.class.filter(Boolean):[],p=(e,{nameAttr:a,icons:t,attrs:r})=>{let o=e.getAttribute(a);if(o==null)return;let s=P(o),f=t[s];if(!f)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);let l=M(e),k=g(l)?{}:{"aria-hidden":"true"},n={...u,"data-lucide":o,...k,...r,...l},L=A(l),B=A(r),c=S("lucide",`lucide-${o}`,...L,...B);c&&Object.assign(n,{class:c});let D=h(f,n);return e.parentNode?.replaceChild(D,e)};var d=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 9-5.5 5.5L8 12"}]];var m=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];var x=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]];var i=({icons:e={},nameAttr:a="data-lucide",attrs:t={},root:r=document,inTemplates:o}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof r>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${a}]`)).forEach(f=>p(f,{nameAttr:a,icons:e,attrs:t})),o&&Array.from(r.querySelectorAll("template")).forEach(l=>i({icons:e,nameAttr:a,attrs:t,root:l.content,inTemplates:o})),a==="data-lucide"){let f=r.querySelectorAll("[icon-name]");f.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(f).forEach(l=>p(l,{nameAttr:"icon-name",icons:e,attrs:t})))}};window.lucide={createIcons:()=>i({icons:{FileText:m,CircleCheck:d,FolderOpen:x}})};})();
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide/dist/esm/replaceElement.mjs:
lucide/dist/esm/icons/circle-check.mjs:
lucide/dist/esm/icons/file-text.mjs:
lucide/dist/esm/icons/folder-open.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.78.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
