// Mobile page host. Reuses the copy renderers, then applies the mobile design layer.
import {renderLocalVideoEditor} from "../instaframe-copy/video-local-deepseek.mjs";
import {frenchTree} from '../instaframe-copy/translate-dom.mjs';
import {renderGeneratorPage} from '../instaframe-copy/generator-page-deepseek.mjs';
import {renderHomePage} from '../instaframe-copy/home-page-deepseek.mjs';
import {renderInspiredPage} from '../instaframe-copy/inspired-page-deepseek.mjs';
import {renderShopPage} from '../instaframe-copy/shop-pages-deepseek.mjs';
import {renderAccountVisitor} from '../instaframe-copy/account-visitors-deepseek.mjs';
import {renderTransferScene} from '../instaframe-copy/transfer-scenes-deepseek.mjs';
import {FR} from '../instaframe-copy/french-dictionary.mjs';
import {renderFaq} from '../instaframe-copy/faq-deepseek.mjs';
import {renderPublicPage} from '../instaframe-copy/public-pages-deepseek.mjs';
import {renderExtraPage} from '../instaframe-copy/extra-pages-deepseek.mjs';
import {renderAlbumMobile} from './album-mobile.mjs';
import {enhanceMobileScene} from './enhance-mobile.mjs';
export const implementedRoutes=['/generator/pro','/generator','/','/get-inspired','/faq','/privacy','/mentions-legales','/login','/aide','/pricing','/404','/shop','/shop/notebook','/shop/track','/shop/checkout','/saved/elements','/saved/notebooks','/compte','/compte/parametres','/owner','/admin','/phone','/album','/s/:id','/t/:id'];
const pages={'/privacy':'privacy','/mentions-legales':'legal','/login':'login','/404':'404'};
function toggle(lang){const root=document.createElement('div');root.className='lang-toggle';root.setAttribute('data-no-i18n','');root.setAttribute('role','group');root.setAttribute('aria-label','Language');for(const code of ['en','fr']){const b=document.createElement('button');b.type='button';b.textContent=code.toUpperCase();b.setAttribute('aria-pressed',String(code===lang));root.append(b)}return root;}
export function renderLocalScene({route='/faq',lang='en',state={},onNavigate=()=>{}}={}){
 const root=document.createElement('div');root.className='local-scene';root.dataset.route=route;root.dataset.lang=lang;
 const navigate=to=>{if(to.startsWith('__lang__:'))return;onNavigate(to)};
 if(route==='/generator'||route==='/generator/pro')root.append(renderGeneratorPage({lang,pro:route==='/generator/pro',kind:state.kind||'Frames',strip:state.strip||0,sub:state.sub||'Post-it',welcome:state.welcome!==false&&route!=='/generator/pro',onNavigate:navigate}),toggle(lang));
 else if(route==='/')root.append(renderHomePage({lang,onNavigate:navigate}));
 else if(route==='/get-inspired')root.append(renderInspiredPage({lang,onNavigate:navigate}),toggle(lang));
 else if(route==='/faq')root.append(renderFaq({lang,openIndex:state.openIndex??-1}));
 else if(route.startsWith('/shop')){root.append(renderShopPage({page:route==='/shop'?'shop':route.split('/')[2],lang,cart:state.cart||{},onCartChange:cart=>{state.cart=cart;},onNavigate:navigate}),toggle(lang));}
 else if(['/saved/elements','/saved/notebooks','/compte','/compte/parametres','/owner','/admin'].includes(route)){const page=({'/saved/elements':'elements','/saved/notebooks':'notebooks','/compte':'account','/compte/parametres':'settings','/owner':'owner','/admin':'admin'})[route];root.append(renderAccountVisitor({page,lang,onNavigate:navigate}));if(page!=='admin')root.append(toggle(lang));}
 else if(route==='/video/local-demo')root.append(renderGeneratorPage({lang,kind:'Video',welcome:false,videoLocalDemo:true,onNavigate:navigate}),toggle(lang));
 else if(route==='/album'||route==='/album/local-demo')root.append(renderAlbumMobile({lang,localDemo:route==='/album/local-demo',onNavigate:navigate}),toggle(lang));
 else if(route==='/phone'||route.startsWith('/s/')||route.startsWith('/t/')){const page=route==='/phone'?'phone':route.startsWith('/s/')?'share':'transfer';root.append(renderTransferScene({page,lang,status:state.status??null,onNavigate:navigate}));if(page!=='share')root.append(toggle(lang));}
 else if(pages[route])root.append(renderPublicPage({page:pages[route],lang,error:state.error===true,onNavigate:navigate}));
 else if(route==='/aide')root.append(renderExtraPage({page:'help',lang,onNavigate:navigate}));
 else if(route==='/pricing'){root.append(renderExtraPage({page:'pricing',lang,admin:state.admin===true,sim:state.sim||null,onNavigate:navigate}),toggle(lang));}
 root.addEventListener('inspired-language',e=>root.replaceWith(renderLocalScene({route,lang:e.detail,state,onNavigate})));
 root.addEventListener('generator-tab-request',e=>{const kind=({Photo:'Frames',Message:'Post-its'})[e.detail.type]||e.detail.type;if(!['Frames','Post-its','Audio','Music','Stamps','Stickers','Video','Combination'].includes(kind))return;state.kind=kind;state.welcome=false;const css=document.querySelector('#scene-styles');if(css)css.href='../instaframe-copy/styles/'+(route==='/generator/pro'?'generator-pro':kind==='Frames'?'generator':'generator-elements')+'.css';root.replaceWith(renderLocalScene({route,lang,state,onNavigate}))});
 if(lang==='fr')frenchTree(root);
 enhanceMobileScene(root,{route,lang,onNavigate});
 root.addEventListener('click',e=>{const b=e.target.closest('.lang-toggle button,.admin-login p button');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const next=b.textContent.trim().toLowerCase();root.replaceWith(renderLocalScene({route,lang:next,state,onNavigate}));},true);
 return root;
}
