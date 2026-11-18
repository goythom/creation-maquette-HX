import {INSPIRED_COVER,INSPIRED_PAPER} from './current-rendering-helpers.mjs';
import {renderInspiredReader} from './inspired-reader-deepseek.mjs';
import { renderSidebar } from './shop-pages-deepseek.mjs';
import { notebookSymbol, decideInk } from './get-inspired-assets/notebook-symbols-ee248634c72f.mjs';

const COLORS = ['#4a1c24','#8b5a2b','#1a1a1a','#1e2a3a','#a85b40','#dfd9ce','#c9a9b0','#edeae2'];
const DESCRIPTIONS = [
  'Une année de plus à deux.',
  'Les lieux que vous découvrez ensemble.',
  'Les moments qui méritent une fête.',
  'Pour ce qui commence.',
  'Le bonheur de se retrouver.',
  'Toutes vos premières fois.',
  'Les petits instants de chaque jour.',
  'Juste vous, sans occasion particulière.'
];
const DEFAULT_NOTEBOOKS = Object.freeze([
  { name: 'The Anniversary', theme: 't-graphite', mark: '♥', emboss: 'dark', description: 'For another year of you two.' },
  { name: 'Away Together', theme: 't-cognac', mark: '✈', emboss: 'dark', description: 'For the places you discover together.' },
  { name: 'The Big Night', theme: 't-black', mark: '★', emboss: 'dark', description: 'For the moments worth celebrating.' },
  { name: 'The New Chapter', theme: 't-cream', mark: '♥', emboss: 'dark', description: 'For what comes next.' },
  { name: 'The Reunion', theme: 't-linen', mark: '⌂', emboss: 'dark', description: 'For being together again.' },
  { name: 'The Firsts', theme: 't-pink', mark: '♥', emboss: 'light', description: 'For all your first times.' },
  { name: 'The Everyday', theme: 't-grey', mark: '○', emboss: 'light', description: 'For the little things, every day.' },
  { name: 'Just Because', theme: 't-white', mark: '—', emboss: 'light', description: 'No occasion needed. Just you.' },
].map((item, index) => Object.freeze({ ...item, id: `notebook-${index+1}` })));

const wrapIndex = (index, length) => ((index % length) + length) % length;

const LIBRARY_CSS = `
:host{display:block;color:#100808;font-family:'DM Sans',sans-serif;container-type:inline-size}*{box-sizing:border-box}button{font:inherit;color:inherit;cursor:pointer}button:focus-visible{outline:3px solid #e73b0d;outline-offset:4px}:host([hidden]),[hidden]{display:none!important}.library{position:relative;background:#f7f4f1;border:3px solid #100808;box-shadow:4px 4px #6d1308;padding:22px 18px 18px}.heading{position:absolute;top:24px;left:26px;z-index:2;margin:0;font-size:clamp(28px,4.2cqw,56px);line-height:1.15;font-family:'Silkscreen','Courier New',monospace;font-weight:700;letter-spacing:-2px}.intro{position:absolute;top:88px;left:26px;z-index:2;max-width:70%;margin:0;font-weight:600;font-size:clamp(14px,1.8cqw,21px)}.scene{position:relative;width:100%;aspect-ratio:1325/598;margin-top:0;background:url('/get-inspired-assets/library/shelf-objects-review.webp') center/100% 100% no-repeat;image-rendering:pixelated}.hint{position:absolute;top:32%;left:7%;margin:0;font-size:clamp(12px,1.65cqw,20px);font-weight:600}.row{position:absolute;left:8.2%;bottom:11.3%;height:49%;width:44%;display:flex;align-items:stretch;isolation:isolate}.book{position:relative;background:var(--base);width:8.2857%;height:100%;flex:none;border:2px solid #22262c;border-radius:0;padding:0;box-shadow:inset 3px 0 #ffffff4a,inset -3px 0 #0003;transition:width .25s ease;overflow:hidden}.book.selected{width:42%;outline:none;z-index:2}.book:focus-visible{outline:2px solid #100808;outline-offset:3px}.book .spine{position:absolute;left:50%;top:50%;display:block;transform:translate(-50%,-50%) rotate(-90deg);white-space:nowrap;width:max-content;font-size:clamp(10px,1.2cqw,16px);letter-spacing:.04em;font-weight:700;color:var(--ink)}.book:before,.book:after{content:'';position:absolute;left:0;right:0;height:5%;border-top:2px solid #ffffff4a;border-bottom:2px solid #0003;top:7%}.book:after{top:auto;bottom:7%}.book .face{display:none;position:absolute;inset:0;background:var(--base)}.book.selected .face{display:flex;flex-direction:column;align-items:center;justify-content:center}.book.selected .spine{display:none}.cover-mark{display:block;width:28%;aspect-ratio:1}.cover-mark svg{display:block;width:100%;height:100%}.spine-symbol{display:inline-flex;width:16px;height:16px;margin-left:10px;vertical-align:middle;transform:rotate(90deg)}.spine-symbol svg{display:block;width:100%;height:100%}.face .mark-pixel{display:block;width:100%;height:100%}.face{background-image:repeating-linear-gradient(35deg,transparent 0 2px,#ffffff04 2px 3px),repeating-linear-gradient(115deg,transparent 0 2px,#0000000a 2px 3px)!important}.cover-mark{font-size:clamp(24px,4cqw,58px);color:var(--ink);line-height:1}.book.selected .face{box-shadow:inset 0 0 0 3px #ffffff18;border:2px solid #837d74;outline:1px dashed #d7cfba;outline-offset:-10px;margin:5px}.book.selected:before,.book.selected:after{display:none}.face strong{position:relative;top:16%;font-size:clamp(9px,1.05cqw,16px);font-weight:500;text-transform:uppercase;text-align:center;letter-spacing:.04em;color:var(--ink);padding:0 8px}.choice{display:grid;grid-template-columns:auto 1fr auto auto;gap:14px;align-items:center;padding:12px;border:3px solid #100808;background:#fff;box-shadow:3px 3px #100808}.count{background:#a71d08;color:#f7f4f1;border:2px solid #100808;padding:12px;font-family:monospace;font-size:clamp(13px,1.6cqw,22px);font-weight:700;white-space:nowrap}.current{border-left:2px solid #a71d08;padding-left:14px;min-width:0}.current strong{display:block;font-size:clamp(17px,2.1cqw,28px)}.current p{margin:2px 0 0;font-size:clamp(12px,1.4cqw,18px)}.arrows{display:flex;gap:10px}.arrows button,.choose{height:56px;box-sizing:border-box;border:3px solid #100808;border-radius:0;box-shadow:3px 3px #100808;background:#fff;padding:10px 16px;font-weight:700;display:inline-flex;align-items:center;justify-content:center}.arrows button{padding:10px 14px}.arrows button svg,.choose svg{width:1.2em;height:1.2em;flex:none;display:block}.choose{background:#e73b0d;color:#100808;font-size:clamp(13px,1.5cqw,21px);padding:13px 22px;white-space:nowrap;gap:10px}.book:hover{filter:brightness(1.12)}
@container(max-width:850px){.heading{font-size:clamp(24px,4.2cqw,40px);left:20px;top:24px}.intro{font-size:clamp(12px,1.8cqw,17px)}.library{padding:18px 10px 14px}.choice{gap:8px;padding:10px;grid-template-columns:auto 1fr auto}.choose{grid-column:1/-1;width:100%}.scene{margin-top:0}.intro{top:62px;left:20px;max-width:64%}.count{padding:10px}.arrows button,.choose{height:48px}.arrows button{padding:6px 12px}.hint{font-size:12px;top:31%}.book{border-width:1px}.row{height:49%}.current p{line-height:1.35}}
@container(max-width:540px){.intro{top:58px;max-width:60%;font-size:12px}.scene{aspect-ratio:1.5;background-size:100% 100%}.hint{top:32%;font-size:10px}.row{width:52%;left:8%;height:47%;bottom:11%}.book .spine{font-size:9px}.cover-mark{font-size:clamp(24px,4cqw,58px);color:var(--ink);line-height:1}.book.selected .face{box-shadow:inset 0 0 0 3px #ffffff18;border:2px solid #837d74;outline:1px dashed #d7cfba;outline-offset:-10px;margin:5px}.book.selected:before,.book.selected:after{display:none}.face strong{font-size:8px}.choice{grid-template-columns:1fr auto}.count{display:none}.current{padding-left:0;border:0}.heading{font-size:25px}}
@media(prefers-reduced-motion:reduce){.book{transition:none}}
.heading{position:static;margin:0 6px 10px;letter-spacing:-1px}.intro{position:static;margin:0 6px 10px;max-width:100%;font-size:clamp(14px,1.7cqw,20px);line-height:1.5}.scene{margin-top:0}.hint{top:30%}
`;

const LIBRARY_HTML = `<section class="library"><div class="shelf-view"><h1 class="heading">GET INSPIRED</h1><p class="intro"></p><div class="scene"><p class="hint"></p><div class="row" role="group"></div></div><div class="choice"><span class="count"></span><div class="current" aria-live="polite"><strong></strong><p></p></div><div class="arrows"><button data-action="previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12H6M11.5 5.5 5 12l6.5 6.5"/></svg></button><button data-action="next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h14M12.5 5.5 19 12l-6.5 6.5"/></svg></button></div><button class="choose"></button></div></div></section>`;

function coverMark(index) {
  return notebookSymbol(index, COLORS[index]);
}

function createLibraryHost(lang, onDiscover) {
  const host = document.createElement('div');
  host.setAttribute('lang', lang);
  const shadow = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = LIBRARY_CSS + `
/* Copy design rules inside the existing library shadow boundary. */
.heading,.current strong{font-family:'Bricolage Grotesque','DM Sans',sans-serif!important;font-weight:800!important;letter-spacing:-.035em!important}.choice{align-items:stretch!important}.arrows{align-items:stretch!important}.arrows button,.choose{height:48px!important;min-height:48px!important;box-sizing:border-box!important;line-height:20px!important}
.library{padding:24px;border-radius:8px}.heading{font-size:clamp(28px,3.6cqw,44px);line-height:1.15;letter-spacing:-.035em;margin:0 0 12px}.intro{font-size:clamp(14px,1.5cqw,18px);line-height:1.55;margin:0 0 20px;max-width:60ch}.choice{padding:16px;gap:16px;border-radius:4px}.count{font-size:16px;padding:12px}.current strong{font-size:22px;line-height:28px}.current p{font-size:14px;line-height:21px;margin-top:4px}.arrows button,.choose{height:48px;border-radius:4px}.choose{font-size:15px;padding:12px 18px}.arrows{gap:8px}.hint{font-size:clamp(12px,1.4cqw,16px);line-height:1.5}
@container(max-width:850px){.library{padding:20px 16px}.heading{font-size:30px}.intro{font-size:15px;margin-bottom:16px}.choice{padding:12px;gap:12px}.current strong{font-size:19px;line-height:25px}.current p{font-size:13px;line-height:20px}}
@container(max-width:540px){.library{padding:20px 12px}.heading{font-size:26px}.intro{font-size:14px}.current strong{font-size:17px;line-height:23px}.choose{font-size:14px}}
`;
  shadow.appendChild(style);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = LIBRARY_HTML;
  while (wrapper.firstChild) shadow.appendChild(wrapper.firstChild);

  const q = (s) => shadow.querySelector(s);
  const items = DEFAULT_NOTEBOOKS;
  let chosen = 0;
  let language = lang === 'fr' ? 'fr' : 'en';

  const row = q('.row');
  items.forEach((item, i) => {
    const b = document.createElement('button');
    b.className = 'book';
    b.dataset.index = String(i);
    b.style.setProperty('--base', COLORS[i]);
    b.style.setProperty('--ink', decideInk(COLORS[i]) === 'white' ? '#fff9ee' : '#20252d');
    b.innerHTML = `<span class="spine">${item.name.replace(/^The /, '').toUpperCase()}<span class="spine-symbol">${notebookSymbol(i, COLORS[i])}</span></span><span class="face"><span class="cover-mark">${coverMark(i)}</span><strong>${item.name}</strong></span>`;
    b.onclick = () => select(i);
    row.append(b);
  });

  q('[data-action=previous]').onclick = () => browse(-1);
  q('[data-action=next]').onclick = () => browse(1);
  q('.choose').onclick = () => {
    const item = items[chosen];
    onDiscover({ name: item.name, theme: item.theme });
  };

  let drag = null;
  const scene = q('.scene');
  scene.onpointerdown = (e) => { if (e.button === 0) drag = { x: e.clientX, y: e.clientY }; };
  scene.onpointerup = (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    drag = null;
    if (Math.abs(dx) > 48 && Math.abs(dy) < 40) browse(dx < 0 ? 1 : -1);
  };
  scene.onpointercancel = () => { drag = null; };

  function select(i) {
    chosen = i;
    update();
  }
  function browse(d) {
    select(wrapIndex(chosen + d, 8));
  }
  function update() {
    const fr = language === 'fr';
    const item = items[chosen];
    q('.count').textContent = `${String(chosen + 1).padStart(2, '0')} / 08`;
    q('.current strong').textContent = item.name;
    q('.current p').textContent = fr ? DESCRIPTIONS[chosen] : item.description;
    shadow.querySelectorAll('.book').forEach((b, i) => {
      b.classList.toggle('selected', i === chosen);
      b.setAttribute('aria-pressed', String(i === chosen));
      b.setAttribute('aria-label', `${fr ? 'Découvrir' : 'Discover'} ${items[i].name}`);
    });
  }
  function setLanguage(l) {
    language = l === 'fr' ? 'fr' : 'en';
    const fr = language === 'fr';
    q('.intro').textContent = fr
      ? 'Une étagère, huit histoires. Choisis le carnet qui te parle.'
      : 'One shelf, eight stories. Choose the notebook that speaks to you.';
    q('.hint').textContent = fr
      ? 'Choisis une tranche pour découvrir sa couverture.'
      : 'Choose a spine to discover its cover.';
    q('.row').setAttribute('aria-label', fr ? 'Les huit carnets' : 'Eight notebooks');
    q('.choose').innerHTML = (fr ? 'Ouvrir ce carnet' : 'Open this notebook') + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h14M12.5 5.5 19 12l-6.5 6.5"/></svg>';
    q('[data-action=previous]').setAttribute('aria-label', fr ? 'Carnet précédent' : 'Previous notebook');
    q('[data-action=next]').setAttribute('aria-label', fr ? 'Carnet suivant' : 'Next notebook');
    update();
  }

  setLanguage(language);
  return host;
}

export function renderInspiredPage({ lang = 'en', onNavigate = () => {} } = {}) {
  const root = document.createElement('div');
  root.className = 'app inspired-app app--navigation';

  const skip = document.createElement('a');
  skip.className = 'skip-to-content';
  skip.href = '#page-content';
  skip.textContent = lang === 'fr' ? 'Aller au contenu' : 'Skip to content';
  root.appendChild(skip);

  const sidebar = renderSidebar({
    active: 'inspired',
    tagline: 'A notebook for every story',
    lang,
    onNavigate,
  });
  root.appendChild(sidebar);

  const main = document.createElement('main');
  main.id = 'page-content';
  main.tabIndex = -1;
  main.className = 'main inspired-page';

  let consulted=null
  try{const saved=JSON.parse(sessionStorage.getItem('inspired-consult')||'null');if(saved&&typeof saved.name==='string'&&typeof saved.theme==='string')consulted=saved}catch{}
  const host=createLibraryHost(lang,detail=>{
    try{localStorage.setItem('instaframe-inspired-pick-v1',JSON.stringify({name:detail.name,cover:INSPIRED_COVER[detail.theme]||'graphite',paper:INSPIRED_PAPER[detail.name]||'white',ts:Date.now()}))}catch{}
    consulted=detail;try{sessionStorage.setItem('inspired-consult',JSON.stringify(detail))}catch{}
    openReader()
  })
  main.appendChild(host)
  let reader=null
  function openReader(){
    reader?.dispose?.();reader?.remove();host.hidden=true
    reader=renderInspiredReader({item:consulted,lang,onClose:()=>{reader?.dispose?.();reader?.remove();reader=null;consulted=null;host.hidden=false;try{sessionStorage.removeItem('inspired-consult')}catch{};requestAnimationFrame(()=>host.shadowRoot.querySelector('.choose')?.focus({preventScroll:true}))},onUse:()=>onNavigate('/generator'),onLanguage:next=>root.dispatchEvent(new CustomEvent('inspired-language',{detail:next,bubbles:true}))})
    main.append(reader)
  }
  if(consulted)openReader()

  root.appendChild(main);
  return root;
}