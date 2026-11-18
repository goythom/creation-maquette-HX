import { renderFrameCard } from './generator-page-deepseek.mjs';
import { stripLayout } from './current-rendering-helpers.mjs';
import { renderFramePng } from './current-rendering-helpers.mjs';
import { elementFilename, downloadDataURL, buildZip } from './local-gallery-deepseek.mjs';

const MAX_SLIDES = 10;
let savedDraft={slideIds:[],caption:'',platform:'instagram'};
const frameFilename=(frame,index)=>elementFilename(frame.format,[frame.caption,index===undefined?'':String(index+1)].filter(Boolean).join(' '));

const FRAME_SPECS = {
  'instax-mini': { card: { w: 4.47, h: 7.12 } },
  'polaroid': { card: { w: 4.48, h: 4.43 } },
};

function cardHeight(frame) {
  const spec = FRAME_SPECS[frame.format] || FRAME_SPECS['instax-mini'];
  return frame.stripPhotos && frame.stripPhotos.length >= 2
    ? stripLayout(frame.format, frame.stripPhotos.length).cardH
    : spec.card.h;
}

function slideFrameEl(frame, width, maxHeight) {
  const spec = FRAME_SPECS[frame.format] || FRAME_SPECS['instax-mini'];
  let scale = width / spec.card.w;
  if (maxHeight) scale = Math.min(scale, maxHeight / cardHeight(frame));
  const wrap = document.createElement('div');
  wrap.style.setProperty('--u', '1px');
  wrap.setAttribute('aria-hidden', 'true');
  const card = renderFrameCard({ frame, scale, lang: 'en', interactive: false });
  wrap.appendChild(card);
  return wrap;
}

function el(tag, cls, attrs) {
  if(cls&&typeof cls==='object'){attrs=cls;cls=null}
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (attrs) for (const k in attrs) {
    if (k === 'text') n.textContent = attrs[k];
    else if (k === 'html') n.innerHTML = attrs[k];
    else if (k.startsWith('on') && typeof attrs[k] === 'function') n.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
    else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(n.style, attrs[k]);
    else if (attrs[k] === true) n.setAttribute(k, '');
    else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k]);
  }
  return n;
}

function svgIcon(paths, opts = {}) {
  const { w = 24, h = 24, fill = 'none', stroke = '#fff', sw = 1.7, cap = 'round', join = 'round' } = opts;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', fill);
  if (stroke) svg.setAttribute('stroke', stroke);
  if (sw) svg.setAttribute('stroke-width', sw);
  if (cap) svg.setAttribute('stroke-linecap', cap);
  if (join) svg.setAttribute('stroke-linejoin', join);
  for (const p of paths) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', p);
    svg.appendChild(path);
  }
  return svg;
}

function svgIconFilled(paths, opts = {}) {
  const { w = 24, h = 24, fill = '#fff' } = opts;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', fill);
  for (const p of paths) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', p);
    svg.appendChild(path);
  }
  return svg;
}

export function renderSlideshowWorkspace({ gallery = [], lang = 'en', onClose = () => {}, onNavigate = () => {} } = {}) {
  const fr = lang === 'fr';
  const previousFocus=document.activeElement;
  if(!document.querySelector('link[data-slideshow-css]')){const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('./styles/slideshow.css',import.meta.url).href;css.dataset.slideshowCss='';document.head.append(css)}
  const state = {
    slideIds: [...savedDraft.slideIds],
    caption: savedDraft.caption,
    platform: savedDraft.platform,
    previewIndex: 0,
    busy: false,
    error: '',
    note: '',
    ready: null,
    qrOpen: false,
    qrError: '',
    qr: null,
    dragOver: null,
    dragFrom: null,
    swipeStart: null,
    initialized: false,
  };

  const blobUrls = [];
  const trackUrl = (u) => { blobUrls.push(u); return u; };

  const root = el('div', 'proposals-backdrop ss__popup', {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': fr ? 'Diaporama' : 'Slideshow',
  });

  const win = el('div', 'ss__win', { tabindex: '-1' });
  root.appendChild(win);

  const titleBar = el('div', 'ss__win-title');
  titleBar.appendChild(el('span', 'ss__grip', { 'aria-hidden': 'true', text: '⠿' }));
  titleBar.appendChild(el('span', 'ss__win-name', { text: 'S L I D E S H O W' }));
  const ctrl = el('span', 'ss__win-ctrl');
  ctrl.appendChild(el('span', { 'aria-hidden': 'true', text: '⋯' }));
  ctrl.appendChild(el('span', { 'aria-hidden': 'true', text: '☐' }));
  const closeBtn = el('button', 'ss__win-close', {
    type: 'button',
    'aria-label': fr ? 'Fermer le diaporama' : 'Close the slideshow',
    text: '✕',
    onclick: () => onClose(),
  });
  ctrl.appendChild(closeBtn);
  titleBar.appendChild(ctrl);
  win.appendChild(titleBar);

  const ss = el('div', 'ss');
  win.appendChild(ss);

  const left = el('div', 'ss__left');
  const right = el('div', 'ss__right');
  ss.appendChild(left);
  ss.appendChild(right);

  // ---- helpers ----
  function getSlides() {
    return state.slideIds.map((id) => gallery.find((f) => f.id === id)).filter(Boolean);
  }
  function getAvailable() {
    return gallery.filter((f) => !state.slideIds.includes(f.id));
  }

  function reorder(from, to) {
    const slides = getSlides();
    if (from === to || from < 0 || to < 0 || from >= slides.length || to >= slides.length) return;
    const next = [...state.slideIds];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    state.slideIds = next;
    state.previewIndex = to;
    render();
  }

  function removeAt(i) {
    state.slideIds = state.slideIds.filter((_, k) => k !== i);
    render();
  }

  function addFrame(id) {
    if (state.slideIds.length >= MAX_SLIDES) return;
    state.slideIds = [...state.slideIds, id];
    render();
  }

  function setPreviewIndex(i) {
    state.previewIndex = i;
    render();
  }

  // ---- render ----
  function render() {
    const slides = getSlides();
    const available = getAvailable();
    const cover = slides[0];
    if (state.previewIndex > slides.length - 1) state.previewIndex = 0;
    const shown = slides[Math.min(state.previewIndex, Math.max(0, slides.length - 1))];

    savedDraft={slideIds:[...state.slideIds],caption:state.caption,platform:state.platform};
    ss.querySelectorAll(':scope > .proposals-backdrop,:scope > .ready').forEach(n=>n.remove());
    left.innerHTML = '';
    right.innerHTML = '';

    // ---- LEFT ----
    if (slides.length > 0) {
      left.appendChild(el('p', 'ss__hint', {
        text: fr
          ? `${slides.length} diapo${slides.length === 1 ? '' : 's'} depuis ta galerie · glisse pour réordonner · la première diapo est la couverture`
          : `${slides.length} slide${slides.length === 1 ? '' : 's'} from your gallery · drag to reorder · first slide is the cover`,
      }));
    }

    if (slides.length > 0) {
      const slidesWrap = el('div', 'ss__slides', {
        'aria-label': fr ? 'Diapos du diaporama' : 'Slideshow slides',
      });
      slides.forEach((frame, i) => {
        const wrap = el('div', 'ss__slide-wrap' + (state.dragOver === i ? ' ss__slide--dragover' : ''));
        wrap.addEventListener('dragover',e=>{e.preventDefault();state.dragOver=i;wrap.classList.add('ss__slide--dragover')});
        wrap.addEventListener('dragleave',()=>{state.dragOver=null;wrap.classList.remove('ss__slide--dragover')});
        wrap.addEventListener('drop', (e) => {
          e.preventDefault();
          state.dragOver = null;
          if (state.dragFrom !== null) reorder(state.dragFrom, i);
          state.dragFrom = null;
        });

        const btn = el('button', 'ss__slide', {
          type: 'button',
          draggable: 'true',
          'aria-label': fr
            ? `Diapo ${i + 1}, afficher dans l'aperçu. Flèches gauche et droite pour réordonner.`
            : `Slide ${i + 1}, show in the preview. Left and right arrows to reorder.`,
        });
        btn.addEventListener('dragstart', () => { state.dragFrom = i; });
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); reorder(i, i - 1); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); reorder(i, i + 1); }
        });
        btn.addEventListener('click', () => setPreviewIndex(i));
        btn.appendChild(slideFrameEl(frame, 58));
        if (i === 0) btn.appendChild(el('span', 'ss__cover', { text: 'COVER' }));
        wrap.appendChild(btn);
        wrap.appendChild(el('span', 'ss__num', { 'aria-hidden': 'true', text: String(i + 1) }));
        const x = el('button', 'ss__x', {
          type: 'button',
          'aria-label': fr ? `Retirer la diapo ${i + 1}` : `Remove slide ${i + 1}`,
          text: '✕',
        });
        x.addEventListener('click', () => removeAt(i));
        wrap.appendChild(x);
        slidesWrap.appendChild(wrap);
      });
      if (slides.length < MAX_SLIDES && available.length > 0) {
        slidesWrap.appendChild(el('span', 'ss__slide--drop', { 'aria-hidden': 'true' }));
      }
      left.appendChild(slidesWrap);
    }

    if (available.length > 0) {
      const picker = el('div', 'ss__picker');
      picker.appendChild(el('p', 'ss__picker-title', {
        text: slides.length
          ? (fr ? 'Ajouter depuis ta galerie' : 'Add from your gallery')
          : (fr ? 'Ta galerie — touche un cadre pour commencer' : 'Your gallery — tap a frame to start'),
      }));
      const row = el('div', 'ss__picker-row');
      available.forEach((frame) => {
        const b = el('button', 'ss__pick', {
          type: 'button',
          'aria-label': fr ? 'Ajouter ce cadre au diaporama' : 'Add this frame to the slideshow',
        });
        if (state.slideIds.length >= MAX_SLIDES) b.disabled = true;
        b.addEventListener('click', () => addFrame(frame.id));
        b.appendChild(slideFrameEl(frame, 40));
        row.appendChild(b);
      });
      picker.appendChild(row);
      left.appendChild(picker);
    }

    if (!gallery.length) {
      const empty = el('div', 'ss__empty');
      empty.appendChild(document.createTextNode(
        fr
          ? "Ta galerie est vide. Crée des cadres dans l'onglet Photo et ajoute-les à ta galerie : ils apparaîtront ici pour composer le diaporama."
          : 'Your gallery is empty. Create frames in the Photo tab and add them to your gallery: they will appear here to build the slideshow.'
      ));
      empty.appendChild(document.createElement('br'));
      const link = el('a', 'btn btn--dark', {
        href: '/generator?type=Photo',
        text: fr ? "Ouvrir l'onglet Photo" : 'Open the Photo tab',
      });
      link.addEventListener('click', (e) => { e.preventDefault(); onNavigate('/generator?type=Photo'); });
      empty.appendChild(link);
      left.appendChild(empty);
    }

    left.appendChild(el('p', 'ss__label', { text: 'Format' }));
    const seg = el('div', 'ss__seg', { role: 'group', 'aria-label': 'Format' });
    seg.appendChild(el('button', null, { type: 'button', 'aria-pressed': 'true', text: fr ? 'Photos (swipe)' : 'Photos (swipe)' }));
    const vidBtn = el('button', null, {
      type: 'button',
      'aria-pressed': 'false',
      disabled: true,
      title: fr
        ? 'Pas encore disponible : la génération vidéo arrive plus tard.'
        : 'Not available yet: video generation comes later.',
      text: fr ? 'Vidéo (lecture auto)' : 'Video (auto-play)',
    });
    seg.appendChild(vidBtn);
    left.appendChild(seg);
    left.appendChild(el('p', 'ss__sub', {
      text: fr
        ? 'Chacun fait défiler à son rythme. Vidéo : 3 s par diapo (plus tard).'
        : 'Viewers swipe at their own pace. Video: 3 s per slide (later).',
    }));

    const labelP = el('p', 'ss__label');
    const capLabel = el('label', null, { for: 'ss-caption', text: fr ? 'Légende' : 'Caption' });
    labelP.appendChild(capLabel);
    left.appendChild(labelP);

    const capInput = el('input', 'ss__caption', {
      id: 'ss-caption',
      maxlength: '150',
      placeholder: fr ? 'notre dimanche ✳︎ #souvenirs' : 'our sunday ✳︎ #memories',
    });
    capInput.value = state.caption;
    capInput.addEventListener('input', (e) => {
      state.caption = e.target.value;savedDraft.caption=state.caption;
      // live update caption preview without re-rendering whole tree
      updateCaptionPreview();
    });
    left.appendChild(capInput);

    left.appendChild(el('p', 'ss__sound', {
      text: fr
        ? '♪ Le son se choisit dans TikTok ou Instagram au moment de publier — un seul titre couvre tout le diaporama.'
        : '♪ The sound is picked in TikTok or Instagram when you post — one track covers the whole slideshow.',
    }));
    left.appendChild(el('p', 'ss__live', {
      text: fr
        ? "Chaque changement à gauche met à jour l'aperçu à droite instantanément."
        : 'Every change on the left updates the preview on the right instantly.',
    }));

    left.appendChild(el('p', 'ss__export-title', { text: fr ? 'Export, sans compte' : 'Export, no account needed' }));
    const dlBtn = el('button', 'ss__download', {
      type: 'button',
      text: state.busy ? (fr ? 'Préparation…' : 'Preparing…') : (fr ? 'Télécharger les images' : 'Download images'),
    });
    if (!slides.length || state.busy) dlBtn.disabled = true;
    dlBtn.addEventListener('click', () => void downloadAll());
    left.appendChild(dlBtn);

    // story block
    const story = el('div', 'ss__story');
    const storyHead = el('div', 'ss__story-head');
    storyHead.appendChild(el('span', 'ss__story-icon', { 'aria-hidden': 'true', text: '✳︎' }));
    const storyText = el('div');
    storyText.appendChild(el('div', 'ss__story-title', { text: fr ? 'Story, depuis ton téléphone' : 'Story, from your phone' }));
    storyText.appendChild(el('div', 'ss__story-desc', {
      text: fr
        ? 'Récupère la diapo de couverture sur ton téléphone, puis poste-la toi-même'
        : 'Get the cover slide on your phone, then post it yourself',
    }));
    storyHead.appendChild(storyText);
    story.appendChild(storyHead);

    const storyBtns = el('div', 'ss__story-btns');
    const qrBtn = el('button', null, {
      type: 'button',
      text: fr ? 'Envoyer sur mon téléphone (QR)' : 'Send to my phone (QR)',
    });
    if (!cover || state.busy) qrBtn.disabled = true;
    qrBtn.addEventListener('click', () => void sendCoverToPhone());
    storyBtns.appendChild(qrBtn);
    const shareBtn = el('button', null, {
      type: 'button',
      text: fr ? 'Partager…' : 'Share…',
    });
    if (!cover || state.busy) shareBtn.disabled = true;
    shareBtn.addEventListener('click', () => void shareCover());
    storyBtns.appendChild(shareBtn);
    story.appendChild(storyBtns);
    left.appendChild(story);

    left.appendChild(el('p', 'ss__fineprint', {
      text: fr
        ? "« Envoyer sur mon téléphone » transfère l'image via un lien QR (1 heure, sans compte). « Partager… » ouvre la feuille de partage de ton appareil — les apps disponibles décident des destinations. La story est toujours terminée par toi dans Instagram ; le site ne la pré-remplit pas."
        : '"Send to my phone" transfers the image over a QR link (1 hour, no account). "Share…" opens your device\'s share sheet — the available apps decide the targets. The story is always finished by you in Instagram; the site does not pre-fill it.',
    }));

    if (state.note) left.appendChild(el('p', 'ss__note', { role: 'status', text: state.note }));
    if (state.error) left.appendChild(el('p', 'ss__error', { role: 'alert', text: state.error }));

    // ---- RIGHT ----
    right.appendChild(el('p', 'ss__r-title', { text: fr ? 'Aperçu de la publication' : 'Post preview' }));

    const toggle = el('div', 'ss__toggle', { role: 'group', 'aria-label': fr ? 'Plateforme' : 'Platform' });
    const ttBtn = el('button', null, { type: 'button', 'aria-pressed': state.platform === 'tiktok' ? 'true' : 'false', text: '♪ TikTok' });
    ttBtn.addEventListener('click', () => { state.platform = 'tiktok'; render(); });
    const igBtn = el('button', null, { type: 'button', 'aria-pressed': state.platform === 'instagram' ? 'true' : 'false', text: '◎ Instagram' });
    igBtn.addEventListener('click', () => { state.platform = 'instagram'; render(); });
    toggle.appendChild(ttBtn);
    toggle.appendChild(igBtn);
    right.appendChild(toggle);

    const phone = el('div', 'ss__phone', { 'data-no-i18n': '' });

    if (shown) {
      const content = el('div', 'ss__content');
      content.addEventListener('pointerdown', (e) => {
        if (slides.length < 2) return;
        state.swipeStart = { x: e.clientX, y: e.clientY };
        try { content.setPointerCapture(e.pointerId); } catch {}
      });
      const endSwipe = (e) => {
        const start = state.swipeStart;
        state.swipeStart = null;
        if (!start || slides.length < 2) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          const dir = dx < 0 ? 1 : -1;
          state.previewIndex = Math.min(Math.max(state.previewIndex + dir, 0), slides.length - 1);
          render();
        }
      };
      content.addEventListener('pointerup', endSwipe);
      content.addEventListener('pointercancel', endSwipe);
      content.appendChild(slideFrameEl(shown, 178, 352));
      phone.appendChild(content);
    }

    const captionPreview = state.caption.trim() || (fr ? 'ta légende' : 'your caption');
    const curIdx = Math.min(state.previewIndex, slides.length - 1);

    if (state.platform === 'instagram') {
      if (slides.length > 0) {
        phone.appendChild(el('div', 'ss__pill', { text: `${curIdx + 1} / ${slides.length}` }));
      }
      const dots = el('div', 'ss__dots');
      dots.style.top = '396px';
      slides.forEach((frame, i) => {
        const b = el('button', null, {
          type: 'button',
          'aria-label': fr ? `Voir la diapo ${i + 1}` : `View slide ${i + 1}`,
          'aria-current': i === curIdx ? 'true' : 'false',
        });
        b.appendChild(el('i'));
        b.addEventListener('click', () => setPreviewIndex(i));
        dots.appendChild(b);
      });
      phone.appendChild(dots);

      const rail = el('div', 'ss__rail');
      const heart = el('span', 'ss__rail-it');
      heart.appendChild(svgIcon(['M12 20.5C7 16.5 3 13.3 3 9.4 3 6.7 5.1 4.5 7.8 4.5c1.7 0 3.2.9 4.2 2.3 1-1.4 2.5-2.3 4.2-2.3 2.7 0 4.8 2.2 4.8 4.9 0 3.9-4 7.1-9 11.1z'], { w: 25, h: 25 }));
      heart.appendChild(el('b', null, { text: '0' }));
      rail.appendChild(heart);
      const comment = el('span', 'ss__rail-it');
      comment.appendChild(svgIcon(['M21 11.5c0 4.1-4 7.5-9 7.5-1 0-2-.1-2.9-.4L4 20l1.2-3.6C3.9 15.1 3 13.4 3 11.5 3 7.4 7 4 12 4s9 3.4 9 7.5z'], { w: 24, h: 24 }));
      comment.appendChild(el('b', null, { text: '0' }));
      rail.appendChild(comment);
      const repost = el('span', 'ss__rail-it');
      repost.appendChild(svgIcon(['M17 2.5l3.5 3.5-3.5 3.5', 'M20.5 6H9a5 5 0 0 0-5 5v1', 'M7 21.5L3.5 18 7 14.5', 'M3.5 18H15a5 5 0 0 0 5-5v-1'], { w: 24, h: 24 }));
      repost.appendChild(el('b', null, { text: '0' }));
      rail.appendChild(repost);
      const send = el('span', 'ss__rail-it');
      send.appendChild(svgIcon(['M21 3L10.2 13.8', 'M21 3l-6.8 18-4-7.2L3 9.8 21 3z'], { w: 24, h: 24 }));
      rail.appendChild(send);
      const menu = el('span', 'ss__rail-it');
      menu.appendChild(svgIcon(['M4 7h16M4 12h16M4 17h16'], { w: 22, h: 22 }));
      rail.appendChild(menu);
      phone.appendChild(rail);

      const igBottom = el('div', 'ss__ig-bottom');
      const idRow = el('div', 'ss__ig-idrow');
      idRow.appendChild(el('span', 'ss__avatar', { text: 'i' }));
      idRow.appendChild(el('span', 'ss__ig-user', { text: 'instaframe' }));
      idRow.appendChild(el('span', 'ss__follow', { text: 'Follow' }));
      igBottom.appendChild(idRow);
      const igCap = el('div', 'ss__ig-cap');
      igCap.dataset.captionSlot = '1';
      igCap.appendChild(document.createTextNode(captionPreview + ' '));
      igCap.appendChild(el('span', 'ss__more', { text: '… more' }));
      igBottom.appendChild(igCap);
      phone.appendChild(igBottom);
    } else {
      const ttTop = el('div', 'ss__tt-top');
      ttTop.appendChild(document.createTextNode('Following'));
      ttTop.appendChild(el('span', 'ss__tt-sep'));
      const b = el('b');
      b.appendChild(document.createTextNode('For You'));
      b.appendChild(el('i'));
      ttTop.appendChild(b);
      phone.appendChild(ttTop);

      const ttSearch = el('div', 'ss__tt-search');
      ttSearch.appendChild(svgIcon(['M15.3 15.3L20 20'], { w: 16, h: 16, sw: 2 }));
      // circle needs separate element
      const searchSvg = ttSearch.querySelector('svg');
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '10.5'); circle.setAttribute('cy', '10.5'); circle.setAttribute('r', '6.5');
      searchSvg.insertBefore(circle, searchSvg.firstChild);
      phone.appendChild(ttSearch);

      const ttRail = el('div', 'ss__tt-rail');
      const ava = el('div', 'ss__tt-ava');
      ava.appendChild(el('span', 'ss__avatar-pic', { text: 'i' }));
      ava.appendChild(el('span', 'ss__tt-plus', { text: '+' }));
      ttRail.appendChild(ava);
      const ttHeart = el('span', 'ss__rail-it ss__tt-shadow');
      ttHeart.appendChild(svgIconFilled(['M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'], { w: 26, h: 26 }));
      ttHeart.appendChild(el('b', null, { text: '0' }));
      ttRail.appendChild(ttHeart);
      const ttComment = el('span', 'ss__rail-it ss__tt-shadow');
      ttComment.appendChild(svgIconFilled(['M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4z'], { w: 25, h: 25 }));
      ttComment.appendChild(el('b', null, { text: '0' }));
      ttRail.appendChild(ttComment);
      const ttBookmark = el('span', 'ss__rail-it ss__tt-shadow');
      ttBookmark.appendChild(svgIconFilled(['M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z'], { w: 24, h: 24 }));
      ttBookmark.appendChild(el('b', null, { text: '0' }));
      ttRail.appendChild(ttBookmark);
      const ttShare = el('span', 'ss__rail-it ss__tt-shadow');
      ttShare.appendChild(svgIconFilled(['M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z'], { w: 25, h: 25 }));
      ttShare.appendChild(el('b', null, { text: '0' }));
      ttRail.appendChild(ttShare);
      phone.appendChild(ttRail);

      const dots = el('div', 'ss__dots');
      dots.style.top = '400px';
      slides.forEach((frame, i) => {
        const b = el('button', null, {
          type: 'button',
          'aria-label': fr ? `Voir la diapo ${i + 1}` : `View slide ${i + 1}`,
          'aria-current': i === curIdx ? 'true' : 'false',
        });
        b.appendChild(el('i'));
        b.addEventListener('click', () => setPreviewIndex(i));
        dots.appendChild(b);
      });
      phone.appendChild(dots);

      const ttMeta = el('div', 'ss__tt-meta');
      ttMeta.appendChild(el('div', 'ss__tt-user', { text: '@instaframe' }));
      const ttCap = el('div', 'ss__tt-cap');
      ttCap.dataset.captionSlot = '1';
      ttCap.appendChild(document.createTextNode(captionPreview + ' '));
      ttCap.appendChild(el('span', 'ss__more', { text: '… more' }));
      ttMeta.appendChild(ttCap);
      const ttMusic = el('div', 'ss__tt-music');
      ttMusic.appendChild(svgIconFilled(['M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'], { w: 12, h: 12 }));
      ttMusic.appendChild(document.createTextNode('original sound — instaframe'));
      ttMeta.appendChild(ttMusic);
      phone.appendChild(ttMeta);

      const disc = el('div', 'ss__tt-disc');
      disc.appendChild(el('i'));
      phone.appendChild(disc);
    }

    phone.appendChild(el('div', 'ss__homebar'));
    right.appendChild(phone);

    right.appendChild(el('p', 'ss__approx', {
      text: fr
        ? "Rendu approximatif — le carrousel Instagram est reconstruit d'après ta capture dans l'app, le mode photo TikTok d'après des posts publics ; le rendu final est fixé par chaque app au moment de publier."
        : 'Approximate render — the Instagram carousel is rebuilt from your in-app capture, TikTok photo mode from public photo-mode posts; the final look is set by each app when posting.',
    }));

    // ---- QR dialog ----
    if (state.qrOpen) {
      const qrBackdrop = el('div', 'proposals-backdrop', {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': fr ? 'Sur ton téléphone' : 'On your phone',
      });
      qrBackdrop.addEventListener('keydown', (e) => { if (e.key === 'Escape') { state.qrOpen = false; render(); } });
      const qrBox = el('div', 'dlq creation-modal', { tabindex: '-1' });
      const qrHeader = el('div', 'creation-modal__header');
      // header content
      const headerIcon = el('div', 'creation-modal__icon');
      headerIcon.appendChild(svgIcon(['M12 3v12', 'M7 10l5 5 5-5', 'M5 21h14'], { w: 20, h: 20, stroke: 'currentColor' }));
      qrHeader.appendChild(headerIcon);
      const headerText = el('div', 'creation-modal__text');
      headerText.appendChild(el('h2', null, { text: fr ? 'Sur ton téléphone' : 'On your phone' }));
      if (state.qr) {
        headerText.appendChild(el('p', null, {
          text: fr ? 'Scanne ce code avec ton téléphone. Le lien fonctionne pendant 1 heure.' : 'Scan this code with your phone. The link works for 1 hour.',
        }));
      }
      qrHeader.appendChild(headerText);
      const headerClose = el('button', 'creation-modal__close', {
        type: 'button',
        'aria-label': fr ? 'Fermer' : 'Close',
        text: '✕',
      });
      headerClose.addEventListener('click', () => { state.qrOpen = false; render(); });
      qrHeader.appendChild(headerClose);
      qrBox.appendChild(qrHeader);

      if (state.qr) {
        const qrWrap = el('div', 'dlq__qr');
        const img = el('img', 'ss__qr-img', {
          src: state.qr.image,
          alt: fr ? 'QR code pour télécharger sur ton téléphone' : 'QR code to download on your phone',
          width: '200',
          height: '200',
        });
        qrWrap.appendChild(img);
        const linkP = el('p', 'ss__qr-link');
        const a = el('a', null, { href: state.qr.link, text: fr ? 'Ouvrir le lien de téléchargement' : 'Open download link' });
        linkP.appendChild(a);
        qrWrap.appendChild(linkP);
        const footer = el('div', 'creation-modal__footer');
        footer.appendChild(el('span'));
        const done = el('button', 'btn btn--white', { type: 'button', text: 'Done' });
        done.addEventListener('click', () => { state.qrOpen = false; render(); });
        footer.appendChild(done);
        qrWrap.appendChild(footer);
        qrBox.appendChild(qrWrap);
      } else {
        const footer = el('div', 'creation-modal__footer');
        footer.appendChild(el('span', null, {
          text: state.qrError || (fr ? 'Préparation…' : 'Preparing…'),
        }));
        const closeB = el('button', 'btn btn--white', {
          type: 'button',
          text: fr ? 'Fermer' : 'Close',
        });
        closeB.addEventListener('click', () => { state.qrOpen = false; render(); });
        footer.appendChild(closeB);
        qrBox.appendChild(footer);
      }
      qrBackdrop.appendChild(qrBox);
      ss.appendChild(qrBackdrop);
    }

    // ---- Ready sheet ----
    if (state.ready) {
      const ready = el('div', 'ready', {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'Your files are ready',
      });
      const box = el('div', 'ready__box frame-ready', { tabindex: '-1' });
      box.appendChild(el('h2', null, { text: 'Ready to save' }));
      box.appendChild(el('p', null, { text: 'Tap Save, or press and hold an image and choose Save to Photos.' }));
      const list = el('div', 'ready__list');
      const imageFiles = state.ready.filter((f) => f.blob.type !== 'application/zip');
      const zipFile = state.ready.find((f) => f.blob.type === 'application/zip');
      imageFiles.forEach((file) => {
        const fig = el('figure');
        fig.appendChild(el('img', null, { src: file.url, alt: file.name }));
        const a = el('a', null, { href: file.url, download: file.name, text: `Download ${file.name}` });
        fig.appendChild(a);
        list.appendChild(fig);
      });
      box.appendChild(list);
      if (zipFile) {
        const p = el('p');
        const a = el('a', 'ready__zip', { href: zipFile.url, download: zipFile.name, text: 'Download all (ZIP)' });
        p.appendChild(a);
        box.appendChild(p);
      }
      const row = el('div', 'ready__row');
      const saveBtn = el('button', 'btn btn--dark', { type: 'button', text: 'Save' });
      saveBtn.addEventListener('click', () => void shareFiles(imageFiles));
      row.appendChild(saveBtn);
      const closeReadyBtn = el('button', 'btn btn--white', { type: 'button', text: 'Close' });
      closeReadyBtn.addEventListener('click', closeReady);
      row.appendChild(closeReadyBtn);
      box.appendChild(row);
      ready.appendChild(box);
      ss.appendChild(ready);
    }
  }

  function updateCaptionPreview() {
    const captionPreview = state.caption.trim() || (fr ? 'ta légende' : 'your caption');
    const slots = right.querySelectorAll('[data-caption-slot]');
    slots.forEach((slot) => {
      slot.innerHTML = '';
      slot.appendChild(document.createTextNode(captionPreview + ' '));
      slot.appendChild(el('span', 'ss__more', { text: '… more' }));
    });
  }

  // ---- actions ----
  async function downloadAll() {
    const slides = getSlides();
    if (!slides.length || state.busy) return;
    state.busy = true;
    state.error = '';
    render();
    try {
      const files = [];
      for (let i = 0; i < slides.length; i++) {
        const frame = slides[i];
        const dataUrl = await renderFramePng(frame);
        const name = frameFilename(frame, slides.length === 1 ? undefined : i);
        files.push({ name, dataUrl });
      }
      await deliver(files, 'instaframe-slideshow.zip');
    } catch {
      state.error = fr ? "L'export a échoué. Réessaie." : 'Export failed. Try again.';
    } finally {
      state.busy = false;
      render();
    }
  }

  async function deliver(files, zipName) {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isIos || isSafari) {
      const out = files.map((file) => {
        const blob = dataUrlToBlob(file.dataUrl);
        return { name: file.name, blob, url: trackUrl(URL.createObjectURL(blob)) };
      });
      if (files.length > 1) {
        const zipBytes = await buildZip(files.map((f) => ({ name: f.name, bytes: dataUrlToBytes(f.dataUrl) })));
        const blob = new Blob([zipBytes], { type: 'application/zip' });
        out.push({ name: zipName, blob, url: trackUrl(URL.createObjectURL(blob)) });
      }
      state.ready = out;
      render();
    } else if (files.length === 1) {
      downloadDataURL(files[0].dataUrl, files[0].name);
    } else {
      const zipBytes = await buildZip(files.map((f) => ({ name: f.name, bytes: dataUrlToBytes(f.dataUrl) })));
      const blob = new Blob([zipBytes], { type: 'application/zip' });
      const url = trackUrl(URL.createObjectURL(blob));
      downloadDataURL(url, zipName);
    }
  }

  function dataUrlToBlob(dataUrl) {
    const [head, b64] = dataUrl.split(',');
    const mime = /:(.*?);/.exec(head)[1];
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  function dataUrlToBytes(dataUrl) {
    const b64 = dataUrl.split(',')[1];
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return arr;
  }

  function closeReady() {
    if (state.ready) {
      state.ready.forEach((file) => { try { URL.revokeObjectURL(file.url); } catch {} });
    }
    state.ready = null;
    render();
  }

  async function sendCoverToPhone() {
    const slides = getSlides();
    const cover = slides[0];
    if (!cover || state.busy) return;
    state.busy = true;
    state.qrError = '';
    state.qr = null;
    state.qrOpen = true;
    render();
    try {
      // Honest error: phone transfer is unavailable in this local reconstruction.
      throw new Error(fr
        ? 'Le transfert vers le téléphone n’est pas disponible dans cette reconstruction locale.'
        : 'Phone transfer is unavailable in this local reconstruction.');
    } catch (e) {
      state.qrError = e instanceof Error ? e.message : (fr ? 'Impossible de préparer le téléchargement sur le téléphone.' : 'Could not prepare the phone download.');
    } finally {
      state.busy = false;
      render();
    }
  }

  async function shareCover() {
    const slides = getSlides();
    const cover = slides[0];
    if (!cover || state.busy) return;
    state.busy = true;
    state.note = '';
    render();
    try {
      const dataUrl = await renderFramePng(cover);
      const blob = dataUrlToBlob(dataUrl);
      const name = frameFilename(cover);
      const file = new File([blob], name, { type: blob.type });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        downloadDataURL(dataUrl, name);
        state.note = fr
          ? "La feuille de partage n'est pas disponible ici : l'image a été téléchargée à la place."
          : 'The share sheet is not available here, so the image was downloaded instead.';
      }
    } catch {
      state.note = fr ? 'Le partage a échoué. Réessaie.' : 'Sharing failed. Try again.';
    } finally {
      state.busy = false;
      render();
    }
  }

  async function shareFiles(files) {
    try {
      const shareList = files.map((f) => new File([f.blob], f.name, { type: f.blob.type }));
      if (navigator.share && navigator.canShare && navigator.canShare({ files: shareList })) {
        await navigator.share({ files: shareList });
      } else {
        files.forEach((f) => downloadDataURL(f.url, f.name));
      }
    } catch {}
  }

  // ---- init ----
  if (!state.initialized) {
    state.initialized = true;
    if (!state.slideIds.length && gallery.length) {
      state.slideIds = gallery.slice(0, MAX_SLIDES).map((f) => f.id);
    }
  }
  // remove invalid ids
  state.slideIds = state.slideIds.filter((id) => gallery.some((f) => f.id === id));

  // backdrop click
  root.addEventListener('click', (e) => {
    if (e.target === root) onClose();
  });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !state.qrOpen && !state.ready) onClose();
  });

  render();

  // focus window
  setTimeout(() => { try { win.focus(); } catch {} }, 0);

  root.__cleanup = () => {
    blobUrls.forEach((u) => { try { URL.revokeObjectURL(u); } catch {} });
    blobUrls.length = 0;
    if (state.ready) {
      state.ready.forEach((f) => { try { URL.revokeObjectURL(f.url); } catch {} });
      state.ready = null;
    }
    try { if(previousFocus?.isConnected)previousFocus.focus(); } catch {}
  };

  return root;
}