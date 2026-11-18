/* ==========================================================================
   Code on Screen — Surcouche de contrôle géométrique
   Version 0.1 (MVP + inspection + contraintes + export)
   --------------------------------------------------------------------------
   Outil de design intégré au site : grille de référence, lignes de repère
   manipulables, inspection des éléments HTML réels, relations géométriques
   et export JSON pour l'IA.

   Principes :
   - La surcouche ne modifie ni le rendu ni les interactions du site quand
     elle est désactivée (conteneur isolé en Shadow DOM).
   - L'IA ne modifie jamais le code : elle reçoit un export JSON, propose,
     et l'utilisateur valide avant toute correction.

   Raccourcis par défaut (reconfigurables dans Paramètres) :
   - Ctrl+Shift+G : activer / désactiver la surcouche
   - G            : afficher / masquer la grille
   - L            : ajouter une ligne de repère
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     État global de l'outil (persisté dans localStorage, par page)
     ------------------------------------------------------------------ */
  var STORE_KEY = 'cos-design:' + location.pathname;

  var state = {
    active: false,            // surcouche activée ou non
    mode: 'control',          // 'control' | 'inspect'
    grid: {
      visible: true,
      spacing: 8,             // unité de base en px
      subdiv: 0,              // subdivision en px (0 = aucune)
      color: '#347e8c',
      thickness: 1,
      snap: true              // aimantation des lignes sur la grille
    },
    opacity: {                // transparences réglables séparément (0..1)
      grid: 0.13,
      guides: 0.9,
      panel: 0.97,
      selection: 1,
      measure: 1
    },
    guides: [],               // {id, name, orientation:'h'|'v', pos, color, locked, visible}
    guidesVisible: true,
    constraints: [],          // relations géométriques enregistrées
    keys: { toggle: 'ctrl+shift+g', grid: 'g', line: 'l' }
  };

  var seq = 0;                // compteur d'identifiants de lignes
  var selections = [];        // éléments inspectés sélectionnés (descripteurs + mesures)

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        grid: state.grid, opacity: state.opacity, guides: state.guides,
        constraints: state.constraints, keys: state.keys, guidesVisible: state.guidesVisible
      }));
    } catch (e) { /* stockage plein ou indisponible : la session continue sans persistance */ }
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var s = JSON.parse(raw);
      if (s.grid) {state.grid = Object.assign(state.grid, s.grid);if(state.grid.color==='#e73b0d')state.grid.color='#347e8c'}
      if (s.opacity) state.opacity = Object.assign(state.opacity, s.opacity);
      if (Array.isArray(s.guides)) state.guides = s.guides;
      if (Array.isArray(s.constraints)) state.constraints = s.constraints;
      if(typeof s.guidesVisible==='boolean') state.guidesVisible=s.guidesVisible;
      if (s.keys) state.keys = Object.assign(state.keys, s.keys);
      state.guides.forEach(function (g) { if(g.color==='#e73b0d')g.color='#347e8c';var n = parseInt(String(g.id).split('-').pop(), 10); if (n > seq) seq = n; });
    } catch (e) { /* réglages illisibles : on repart des valeurs par défaut */ }
  }

  /* ------------------------------------------------------------------
     Hôte isolé : Shadow DOM pour éviter tout conflit CSS avec le site
     ------------------------------------------------------------------ */
  var host = document.createElement('div');
  host.id = 'cos-design-overlay';
  host.style.cssText = 'all:initial;position:fixed;inset:0;width:0;height:0;z-index:2147483000;';
  var shadow = host.attachShadow({ mode: 'open' });

  var CSS = `
    :host { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family:Arial, sans-serif; }
    .cos-layer { position: fixed; inset: 0; pointer-events: none; }
    .cos-grid { position: fixed; inset: 0; pointer-events: none; }
    .cos-guide { position: fixed; pointer-events: auto; cursor: grab; touch-action: none; }
    .cos-guide.locked { cursor: not-allowed; }
    .cos-guide.h { left: 0; right: 0; height: 11px; margin-top: -5px; }
    .cos-guide.v { top: 0; bottom: 0; width: 11px; margin-left: -5px; }
    .cos-guide .line { position: absolute; background: currentColor; }
    .cos-guide.h .line { left: 0; right: 0; top: 5px; height: 2px; }
    .cos-guide.v .line { top: 0; bottom: 0; left: 5px; width: 2px; }
    .cos-guide .tag { position: absolute; font-size: 10px; line-height: 1; color: #fff;
      background: currentColor; padding: 3px 6px; border-radius: 3px; white-space: nowrap; }
    .cos-guide .tag b { color: #fff; font-weight: 700; }
    .cos-guide.h .tag { left: 8px; top: -8px; }
    .cos-guide.v .tag { top: 8px; left: -4px; writing-mode: vertical-rl; }
    .cos-guide.locked .tag::after { content: " \\1F512"; }
    .cos-sel { position: fixed; pointer-events: none; border: 2px solid #2e7dff; }
    .cos-sel .m { position: absolute; top: -22px; left: -2px; background: #2e7dff; color: #fff;
      font-size: 11px; padding: 2px 6px; border-radius: 3px; white-space: nowrap; }
    .cos-toolbar { position: fixed; right: 16px; bottom: 16px; display: flex; gap: 6px;
      background: #111; color: #eee; border-radius: 10px; padding: 8px;
      box-shadow: 0 6px 24px rgba(0,0,0,.35); pointer-events: auto; align-items: center;
      opacity: var(--op-panel, .97); flex-wrap: wrap; max-width: min(92vw, 640px); }
    .cos-toolbar .brand { font-size: 11px; font-weight: 700; letter-spacing: .06em;
      padding: 0 6px; color: #fbc856; white-space: nowrap; }
    .cos-btn { border: 1px solid #444; background: #1c1c1c; color: #eee; font: 12px/1 inherit;
      font-family: inherit; padding: 7px 9px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
    .cos-btn:hover { background: #2a2a2a; }
    .cos-btn.on { background: #e73b0d; border-color: #e73b0d; color: #fff; }
    .cos-panel { position: fixed; right: 16px; bottom: 112px; width: min(420px, calc(100vw - 32px)); max-height: calc(100dvh - 150px);
      overflow: auto; background: #161616; color: #ddd; border-radius: 10px; padding: 12px;
      box-shadow: 0 6px 24px rgba(0,0,0,.4); pointer-events: auto; font-size: 12px;
      opacity: var(--op-panel, .97); }
    .cos-panel h2 { font-size: 12px; text-transform: uppercase; letter-spacing: .08em;
      color: #fbc856; margin-bottom: 10px; }
    .cos-panel table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    .cos-panel td { overflow-wrap: anywhere; }
    .cos-panel .cos-mini { max-width:100%; white-space:normal; margin:2px 0; }
    .cos-panel input { min-width:0; }
    @media(max-width:800px) { .cos-toolbar {left:8px;right:8px;bottom:8px;max-width: none;} .cos-panel {left:8px;right:8px;bottom:142px;width:auto;max-height:calc(100dvh - 160px);} }
    .cos-panel th, .cos-panel td { text-align: left; padding: 4px 3px; font-size: 11px;
      border-bottom: 1px solid #2a2a2a; vertical-align: middle; }
    .cos-panel input[type=text], .cos-panel input[type=number] { width: 100%;
      background: #222; color: #eee; border: 1px solid #3a3a3a; border-radius: 4px;
      padding: 3px 5px; font: 11px/1.4 inherit; font-family: inherit; }
    .cos-panel input[type=range] { width: 100%; }
    .cos-panel input[type=color] { width: 26px; height: 20px; border: 0; background: none; padding: 0; }
    .cos-row { display: flex; gap: 8px; align-items: center; margin: 6px 0; }
    .cos-row label { flex: 1; color: #aaa; }
    .cos-row input, .cos-row select { flex: 1.4; }
    .cos-mini { border: 1px solid #444; background: #1c1c1c; color: #ccc; border-radius: 4px;
      font: 10px/1 inherit; font-family: inherit; padding: 3px 5px; cursor: pointer; }
    .cos-mini:hover { background: #2a2a2a; }
    .cos-mini.warn { color: #ff9b7a; border-color: #6b2d1d; }
    .cos-actions { display: flex; flex-wrap: wrap; gap: 5px; margin: 8px 0; }
    .cos-note { color: #888; font-size: 10px; margin-top: 8px; line-height: 1.5; }
    kbd { background: #2a2a2a; border-radius: 3px; padding: 1px 4px; font-size: 10px; }
    .cos-toast { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);
      background: #111; color: #fff; padding: 8px 14px; border-radius: 8px; font-size: 12px;
      pointer-events: none; box-shadow: 0 6px 24px rgba(0,0,0,.35); }

    /* Same palette and stitched leather edge as Code On Screen OS. */
    .cos-toolbar,.cos-panel {background-color:#703f2e;color:#faf0df;border:1px solid #c7c4bd80;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='96' height='96' filter='url(%23g)' opacity='.23'/%3E%3C/svg%3E");
      outline:1px dashed #e3bf977d;outline-offset:-7px;box-shadow:inset 0 1px 2px #dedad540,inset 0 -2px 4px #24100655,0 8px 28px #42251935;border-radius:24px;padding:16px;}
    .cos-toolbar {gap:6px;max-width:min(940px,calc(100vw - 32px));padding:12px 16px;}
    .cos-toolbar .brand {color:#ead8bc;letter-spacing:.04em;font-size:10px;}
    .cos-btn,.cos-mini {background:#582f24;border:1px solid #c7c4bd66;color:#ead8bc;border-radius:22px;font:12px/1.3 Arial,sans-serif;}
    .cos-btn {min-height:40px;padding:9px 12px;}
    .cos-mini {min-height:36px;padding:6px 8px;}
    .cos-btn:hover,.cos-mini:hover {background:#8a5941;}
    .cos-btn.on {background:#347e8c;border-color:#7cabb1;color:#faf0df;}
    .cos-panel {width:min(550px,calc(100vw - 32px));padding:22px;}
    .cos-panel h2 {color:#ead8bc;font-size:13px;letter-spacing:.03em;text-transform:none;border-bottom:1px solid #c7c4bd55;padding-bottom:12px;margin-bottom:12px;}
    .cos-panel th,.cos-panel td {border-color:#c7c4bd33;color:#faf0df;padding:8px 3px;}
    .cos-panel th {color:#dfc6a6;font-weight:400;font-size:10px;}
    .cos-panel input[type=text],.cos-panel input[type=number] {background:#582f24;color:#faf0df;border:1px solid #c7c4bd66;border-radius:7px;min-height:36px;padding:6px;font:12px Arial,sans-serif;}
    .cos-panel input[type=range],.cos-panel input[type=checkbox] {accent-color:#347e8c;}
    .cos-panel input[type=color] {width:30px;height:30px;}
    .cos-row {gap:16px;margin:12px 0;min-height:36px;}
    .cos-row label,.cos-note {color:#dfc6a6;line-height:1.5;}
    .cos-mini.warn {color:#ffd0b7;border-color:#c7c4bd66;background:#582f24;}
    .cos-sel {border-color:#347e8c;}
    .cos-sel .m {background:#347e8c;color:#faf0df;}
    .cos-toast {background:#582f24;color:#faf0df;border:1px solid #c7c4bd66;}
    :focus-visible {outline:2px solid #ead8bc;outline-offset:2px;}
    @media(pointer:coarse) {.cos-btn,.cos-mini {min-height:44px;}}
    @media(max-width:800px) {.cos-panel{width:auto;padding:18px;}.cos-toolbar{max-width:none;gap:5px;padding:12px;}.cos-btn{padding:9px 10px;}.cos-toolbar .brand{width:100%;padding:2px 6px 6px;}}
  `;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  shadow.appendChild(styleEl);

  var layer = document.createElement('div');   // calque grille + lignes + sélections
  layer.className = 'cos-layer';
  shadow.appendChild(layer);

  var ui = document.createElement('div');      // barre d'outils + panneaux
  shadow.appendChild(ui);

  /* ------------------------------------------------------------------
     Grille de référence : deux dégradés CSS (base + subdivision),
     recalée pour rester superposée au contenu lors du défilement.
     ------------------------------------------------------------------ */
  var gridEl = document.createElement('div');
  gridEl.className = 'cos-grid';
  layer.appendChild(gridEl);

  function drawGrid() {
    var g = state.grid;
    if (!state.active || !g.visible) { gridEl.style.display = 'none'; return; }
    gridEl.style.display = 'block';
    gridEl.style.opacity = state.opacity.grid;
    var c = g.color, t = Math.max(1, g.thickness | 0);
    var imgs = [], sizes = [], poss = [];
    if (g.subdiv > 0 && g.subdiv < g.spacing) {
      imgs.push('repeating-linear-gradient(to right,' + c + ' 0,' + c + ' ' + t + 'px,transparent ' + t + 'px,transparent ' + g.subdiv + 'px)',
                'repeating-linear-gradient(to bottom,' + c + ' 0,' + c + ' ' + t + 'px,transparent ' + t + 'px,transparent ' + g.subdiv + 'px)');
      sizes.push(g.subdiv + 'px ' + g.subdiv + 'px', g.subdiv + 'px ' + g.subdiv + 'px');
      poss.push('0 0', '0 0');
    }
    imgs.push('repeating-linear-gradient(to right,' + c + ' 0,' + c + ' ' + t + 'px,transparent ' + t + 'px,transparent ' + g.spacing + 'px)',
              'repeating-linear-gradient(to bottom,' + c + ' 0,' + c + ' ' + t + 'px,transparent ' + t + 'px,transparent ' + g.spacing + 'px)');
    sizes.push(g.spacing + 'px ' + g.spacing + 'px', g.spacing + 'px ' + g.spacing + 'px');
    poss.push('0 0', '0 0');
    gridEl.style.backgroundImage = imgs.join(',');
    gridEl.style.backgroundSize = sizes.join(',');
    gridEl.style.backgroundPosition = poss.join(',');
    alignGrid();
  }

  function alignGrid() {
    // Décale la grille de l'inverse du défilement pour rester alignée au document
    var sx = -(window.scrollX || 0) % Math.max(1, state.grid.spacing);
    var sy = -(window.scrollY || 0) % Math.max(1, state.grid.spacing);
    gridEl.style.backgroundPosition = sx + 'px ' + sy + 'px,' + sx + 'px ' + sy + 'px,' +
                                      sx + 'px ' + sy + 'px,' + sx + 'px ' + sy + 'px';
  }

  /* ------------------------------------------------------------------
     Lignes de repère (guides)
     ------------------------------------------------------------------ */
  var guideEls = {};   // id -> élément DOM

  function docToViewH(y) { return y - (window.scrollY || 0); }
  function docToViewV(x) { return x - (window.scrollX || 0); }
  function viewToDocH(y) { return y + (window.scrollY || 0); }
  function viewToDocV(x) { return x + (window.scrollX || 0); }

  function snap(pos) {
    if (!state.grid.snap || !state.grid.spacing) return Math.round(pos);
    return Math.round(pos / state.grid.spacing) * state.grid.spacing;
  }

  function addGuide(orientation, pos, props) {
    seq += 1;
    var g = Object.assign({
      id: 'guide-' + String(seq).padStart(2, '0'),
      name: 'Ligne ' + String(seq).padStart(2, '0'),
      orientation: orientation,
      pos: (typeof pos === 'number') ? pos : snap(orientation === 'h'
            ? viewToDocH(window.innerHeight / 2) : viewToDocV(window.innerWidth / 2)),
      color: '#347e8c',
      locked: false,
      visible: true
    }, props || {});
    state.guides.push(g);
    renderGuide(g);
    save();
    refreshGuidesPanel();
    return g;
  }

  function renderGuide(g) {
    var el = guideEls[g.id];
    if (!el) {
      el = document.createElement('div');
      el.className = 'cos-guide ' + g.orientation;
      el.dataset.gid = g.id;
      el.innerHTML = '<div class="line"></div><div class="tag"><b></b> <span></span></div>';
      layer.appendChild(el);
      guideEls[g.id] = el;
      enableDrag(el, g);
    }
    el.style.color = g.color; el.querySelector('.tag').style.background=g.color;
    el.classList.toggle('locked', !!g.locked);
    el.style.display = (state.active && state.guidesVisible && g.visible) ? 'block' : 'none';
    el.style.opacity = state.opacity.guides;
    el.querySelector('b').textContent = g.name;
    el.querySelector('.tag span').textContent = Math.round(g.pos) + ' px';
    if (g.orientation === 'h') el.style.top = docToViewH(g.pos) + 'px';
    else el.style.left = docToViewV(g.pos) + 'px';
  }

  function renderAllGuides() {
    var seen = {};
    state.guides.forEach(function (g) { seen[g.id] = 1; renderGuide(g); });
    Object.keys(guideEls).forEach(function (id) {
      if (!seen[id]) { guideEls[id].remove(); delete guideEls[id]; }
    });
  }

  function enableDrag(el, g) {
    var startPos = 0, startClient = 0, moved = false;
    el.addEventListener('pointerdown', function (ev) {
      if (g.locked || state.mode === 'inspect') return;
      moved = false;
      startPos = g.pos;
      startClient = (g.orientation === 'h') ? ev.clientY : ev.clientX;
      el.setPointerCapture(ev.pointerId);
      el.style.cursor = 'grabbing';
      ev.preventDefault();
    });
    el.addEventListener('pointermove', function (ev) {
      if (!el.hasPointerCapture(ev.pointerId)) return;
      moved = true;
      var delta = ((g.orientation === 'h') ? ev.clientY : ev.clientX) - startClient;
      g.pos = Math.max(0, snap(startPos + delta));
      renderGuide(g);
    });
    el.addEventListener('pointerup', function (ev) {
      if (el.hasPointerCapture(ev.pointerId)) el.releasePointerCapture(ev.pointerId);
      el.style.cursor = '';
      if (moved) { save(); refreshGuidesPanel(); }
    });
  }

  function removeGuide(id) {
    state.guides = state.guides.filter(function (g) { return g.id !== id; });
    state.constraints = state.constraints.filter(function (c) {
      return !c.guide || c.guide !== id;
    });
    save(); renderAllGuides(); refreshGuidesPanel(); refreshConstraintsPanel();
  }

  function duplicateGuide(id) {
    var g = state.guides.find(function (x) { return x.id === id; });
    if (!g) return;
    addGuide(g.orientation, g.pos + state.grid.spacing * 2, {
      name: g.name + ' copie', color: g.color, locked: false, visible: g.visible
    });
  }

  /* ------------------------------------------------------------------
     Inspection des éléments HTML réels
     ------------------------------------------------------------------ */
  function describeElement(el) {
    // Sélecteur CSS compact et stable pour identifier l'élément dans l'export
    var parts = [], cur = el, depth = 0;
    while (cur && cur.nodeType === 1 && depth < 5) {
      var p = cur.tagName.toLowerCase();
      if (cur.id) { p += '#' + window.CSS.escape(cur.id); parts.unshift(p); break; }
      var cls = (cur.className && typeof cur.className === 'string')
        ? cur.className.trim().split(/\s+/).slice(0, 3) : [];
      if (cls.length) p += '.' + cls.map(function(c){return window.CSS.escape(c)}).join('.');
      var sib = cur.parentElement ? cur.parentElement.children : [];
      var same = 0, idx = 0;
      for (var i = 0; i < sib.length; i++) {
        if (sib[i].tagName === cur.tagName) { same++; if (sib[i] === cur) idx = same; }
      }
      if (same > 1) p += ':nth-of-type(' + idx + ')';
      parts.unshift(p);
      cur = cur.parentElement; depth++;
    }
    return parts.join(' > ');
  }

  function measureElement(el) {
    var r = el.getBoundingClientRect();
    var cs = getComputedStyle(el);
    return {
      selector: describeElement(el),
      layoutSize: {width:el.offsetWidth,height:el.offsetHeight},
      viewportRect:{x:r.x,y:r.y,width:r.width,height:r.height},
      transform:cs.transform,
      tag: el.tagName.toLowerCase(),
      id: el.id || undefined,
      classes: (typeof el.className === 'string' && el.className.trim()) || undefined,
      rect: {
        x: Math.round((r.left + window.scrollX)*100)/100,
        y: Math.round((r.top + window.scrollY)*100)/100,
        width: Math.round(r.width*100)/100,
        height: Math.round(r.height*100)/100
      },
      margin: { top: cs.marginTop, right: cs.marginRight, bottom: cs.marginBottom, left: cs.marginLeft },
      padding: { top: cs.paddingTop, right: cs.paddingRight, bottom: cs.paddingBottom, left: cs.paddingLeft }
    };
  }

  function selectElement(el, additive) {
    var m = measureElement(el);
    if (!additive) { clearSelections(); }
    if (selections.some(function (s) { return s.selector === m.selector; })) return;
    selections.push(m);
    drawSelections();
    refreshInspectPanel();
  }

  var selEls = [];
  function drawSelections() {
    selEls.forEach(function (e) { e.remove(); });
    selEls = [];
    selections.forEach(function (m, i) {
      var box = document.createElement('div');
      box.className = 'cos-sel';
      box.style.borderColor = 'rgba(52,126,140,'+state.opacity.selection+')';
      var label = m.tag + (m.id ? '#' + m.id : '') + ' - ' + m.rect.width + ' × ' + m.rect.height + ' px';
      if (selections.length > 1) label = '#' + (i + 1) + ' ' + label;
      box.innerHTML = '<span class="m" style="opacity:' + state.opacity.measure + '"></span>';
      box.querySelector('.m').textContent = label;
      layer.appendChild(box);
      selEls.push(box);
      placeSel(box, m);
    });
  }

  function placeSel(box, m) {
    box.style.left = docToViewV(m.rect.x) + 'px';
    box.style.top = docToViewH(m.rect.y) + 'px';
    box.style.width = m.rect.width + 'px';
    box.style.height = m.rect.height + 'px';
  }

  function clearSelections() {
    selections = [];
    drawSelections();
    refreshInspectPanel();
  }

  // Clic en mode inspection : on intercepte avant le site, sans le perturber sinon
  window.addEventListener('pointerdown', function (ev) {
    if (!state.active || state.mode !== 'inspect') return;
    if (host.contains(ev.target) || ev.target === host) return;
    var el = document.elementFromPoint(ev.clientX, ev.clientY);
    if (!el || el === document.documentElement || el === document.body) return;
    ev.preventDefault(); ev.stopPropagation();
    selectElement(el, ev.shiftKey);
  }, true);

  ['click','pointerup'].forEach(function(t){window.addEventListener(t,function(ev){if(state.active&&state.mode==='inspect'&&ev.target!==host&&!host.contains(ev.target)){ev.preventDefault();ev.stopImmediatePropagation()}},true)});

  /* ------------------------------------------------------------------
     Relations géométriques entre éléments (contraintes)
     Une ligne rouge est un repère visuel ; une contrainte est une
     relation enregistrée entre des éléments ou des coordonnées.
     ------------------------------------------------------------------ */
  function addConstraint(type) {
    if (selections.length < ((type==='equal-spacing'||type==='distribute')?3:2)) { toast('Sélectionne au moins 2 éléments (mode inspection, Maj+clic).'); return; }
    state.constraints.push({
      type: type,
      elements: selections.map(function (s) { return s.selector; })
    });
    save(); refreshConstraintsPanel();
    toast('Contrainte « ' + type + ' » enregistrée.');
  }

  function addGuideConstraint() {
    if (selections.length !== 1) { toast('Sélectionne 1 élément pour l’aligner sur une ligne.'); return; }
    var visGuides = state.guides.filter(function (g) { return g.visible; });
    if (!visGuides.length) { toast('Aucune ligne visible.'); return; }
    var m = selections[0];
    // ligne la plus proche d'un bord de l'élément
    var best = null, bestD = 1e9, bestEdge=null;
    visGuides.forEach(function (g) {
      var refs = (g.orientation === 'h') ? [m.rect.y, m.rect.y + m.rect.height]
                                         : [m.rect.x, m.rect.x + m.rect.width];
      refs.forEach(function (r,index) {
        var d = Math.abs(r - g.pos);
        if (d < bestD) { bestD = d; best = g; bestEdge=(g.orientation==='h'?(index?'bottom':'top'):(index?'right':'left')); }
      });
    });
    if (!best) return;
    state.constraints.push({
      type: 'align-on-guide',
      elements: [m.selector],
      guide: best.id,
      guideName: best.name, edge:bestEdge, targetPosition:best.pos,
      gap: Math.round(((best.orientation === 'h') ? m.rect.y : m.rect.x) - best.pos)
    });
    save(); refreshConstraintsPanel();
    toast('Alignement sur « ' + best.name + ' » enregistré.');
  }

  /* ------------------------------------------------------------------
     Export JSON pour l'IA (voir cahier des charges §8)
     ------------------------------------------------------------------ */
  function buildExport() {
    return {
      tool: 'code-on-screen/design-overlay',
      version: '0.1',
      page: location.pathname + location.hash,
      url: location.href,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      scroll: { x: window.scrollX, y: window.scrollY },
      grid: {
        visible: state.grid.visible, spacing: state.grid.spacing,
        subdivision: state.grid.subdiv, snap: state.grid.snap
      },
      guidesGloballyVisible: state.guidesVisible,
      guides: state.guides.map(function (g) {
        return { id: g.id, name: g.name, orientation: g.orientation === 'h' ? 'horizontal' : 'vertical',
                 position: Math.round(g.pos), color: g.color, locked: g.locked, visible: g.visible };
      }),
      elements: selections.map(function (s) { return s; }),
      constraints: state.constraints,
      coordinateSpace: 'document CSS pixels after transforms; not untransformed canvas/source pixels',
      devicePixelRatio: window.devicePixelRatio,
      note: 'Lignes = repères visuels. Constraints = relations géométriques demandées. ' +
            'Proposer des modifications HTML/CSS ; ne les applique qu’après validation de l’utilisateur.'
    };
  }

  function exportJSON() {
    var json = JSON.stringify(buildExport(), null, 2);
    var done = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(json).then(function () {
        toast('Export JSON copié dans le presse-papiers.');
      }, function () { downloadJSON(json); });
      done = true;
    }
    if (!done) downloadJSON(json);
  }

  function downloadJSON(json) {
    var blob = new Blob([json], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'cos-design-export.json';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    toast('Export JSON téléchargé.');
  }

  /* ------------------------------------------------------------------
     Interface : barre principale + panneaux secondaires
     ------------------------------------------------------------------ */
  var toolbar, panels = {};

  function btn(label, title, fn) {
    var b = document.createElement('button');
    b.className = 'cos-btn'; b.type = 'button'; b.textContent = label; b.title = title || '';
    b.addEventListener('click', fn);
    return b;
  }

  function arrangeUI(){if(!toolbar||!state.active)return;var r=toolbar.getBoundingClientRect();Object.keys(panels).forEach(function(k){panels[k].style.bottom=(innerHeight-r.top+12)+'px';panels[k].style.maxHeight=Math.max(120,r.top-24)+'px'})}

  function togglePanel(name) {arrangeUI();
    Object.keys(panels).forEach(function (k) {
      panels[k].style.display = (k === name && panels[k].style.display === 'none') ? 'block' : 'none';
    });
  }

  function buildUI() {
    toolbar = document.createElement('div');
    toolbar.className = 'cos-toolbar';
    toolbar.innerHTML = '<span class="brand">CODE ON SCREEN · DESIGN</span>';

    var bGrid = btn('Grille', 'Afficher / masquer la grille (' + state.keys.grid.toUpperCase() + ')', function () {
      state.grid.visible = !state.grid.visible; save(); drawGrid(); syncToolbar();
    });
    bGrid.dataset.role = 'grid';
    toolbar.appendChild(bGrid);

    var bGuides = btn('Lignes', 'Afficher / masquer toutes les lignes', function () {
      state.guidesVisible=!state.guidesVisible;
      save(); renderAllGuides(); refreshGuidesPanel(); syncToolbar();
    });
    bGuides.dataset.role = 'guides';
    toolbar.appendChild(bGuides);

    toolbar.appendChild(btn('+ Ligne H', 'Créer une ligne horizontale (' + state.keys.line.toUpperCase() + ')', function () { addGuide('h'); syncToolbar(); }));
    toolbar.appendChild(btn('+ Ligne V', 'Créer une ligne verticale', function () { addGuide('v'); syncToolbar(); }));

    var bInsp = btn('Inspection', 'Sélectionner un élément HTML (Maj+clic = multi)', function () {
      state.mode = (state.mode === 'inspect') ? 'control' : 'inspect';
      if (state.mode !== 'inspect') clearSelections();
      syncToolbar();
    });
    bInsp.dataset.role = 'inspect';
    toolbar.appendChild(bInsp);

    toolbar.appendChild(btn('Liste', 'Panneau des lignes', function () { togglePanel('guides'); }));
    toolbar.appendChild(btn('Réglages', 'Grille, transparences, raccourcis', function () { togglePanel('settings'); }));
    toolbar.appendChild(btn('Contraintes', 'Relations géométriques enregistrées', function () { togglePanel('constraints'); }));
    toolbar.appendChild(btn('Export', 'Copier les données JSON pour l’IA', exportJSON));
    toolbar.appendChild(btn('Fermer', 'Désactiver la surcouche (' + state.keys.toggle + ')', function(){deactivate()}));

    ui.appendChild(toolbar);
    buildGuidesPanel();
    buildSettingsPanel();
    buildInspectPanel();
    buildConstraintsPanel();
    syncToolbar();
  }

  function syncToolbar() {
    if (!toolbar) return;
    toolbar.querySelector('[data-role=grid]').classList.toggle('on', state.grid.visible);
    toolbar.querySelector('[data-role=guides]').classList.toggle('on',
      state.guidesVisible && state.guides.length > 0 && state.guides.some(function (g) { return g.visible; }));
    toolbar.querySelector('[data-role=inspect]').classList.toggle('on', state.mode === 'inspect');
  }

  function makePanel(name, title) {
    var p = document.createElement('div');
    p.className = 'cos-panel';
    p.style.display = 'none';
    p.innerHTML = '<h2></h2><div class="body"></div>';
    p.querySelector('h2').textContent = title;
    panels[name] = p;
    ui.appendChild(p);
    return p.querySelector('.body');
  }

  /* --- Panneau des lignes --- */
  var guidesBody;
  function buildGuidesPanel() { guidesBody = makePanel('guides', 'Lignes de repère'); }

  function refreshGuidesPanel() {
    if (!guidesBody) return;
    if (!state.guides.length) {
      guidesBody.innerHTML = '<p class="cos-note">Aucune ligne. Boutons « + Ligne H » / « + Ligne V » pour créer.</p>';
      return;
    }
    var t = document.createElement('table');
    t.innerHTML = '<tr><th>Ligne</th><th>Position</th><th>Couleur</th><th>Verrou</th><th>Visib.</th><th></th></tr>';
    state.guides.forEach(function (g) {
      var tr = document.createElement('tr');

      var tdN = document.createElement('td');
      var name = document.createElement('input');
      name.type = 'text'; name.value = g.name; name.title = 'Renommer';
      name.addEventListener('change', function () { g.name = name.value || g.name; save(); renderGuide(g); });
      tdN.appendChild(name); tr.appendChild(tdN);

      var tdP = document.createElement('td');
      var pos = document.createElement('input');
      pos.type = 'number'; pos.value = Math.round(g.pos); pos.title = 'Position en px (document)';
      pos.style.width = '100%';
      pos.addEventListener('change', function () {
        g.pos = Math.max(0, parseInt(pos.value, 10) || 0); save(); renderGuide(g);
      });
      tdP.appendChild(pos); tr.appendChild(tdP);

      var tdC = document.createElement('td');
      var col = document.createElement('input');
      col.type = 'color'; col.value = g.color;
      col.addEventListener('input', function () { g.color = col.value; save(); renderGuide(g); });
      tdC.appendChild(col); tr.appendChild(tdC);

      var tdL = document.createElement('td');
      var lock = document.createElement('button');
      lock.className = 'cos-mini'; lock.type = 'button';
      lock.textContent = g.locked ? 'Verrouillée' : 'Libre';
      lock.addEventListener('click', function () {
        g.locked = !g.locked; lock.textContent = g.locked ? 'Verrouillée' : 'Libre';
        save(); renderGuide(g);
      });
      tdL.appendChild(lock); tr.appendChild(tdL);

      var tdV = document.createElement('td');
      var vis = document.createElement('button');
      vis.className = 'cos-mini'; vis.type = 'button';
      vis.textContent = g.visible ? 'Visible' : 'Masquée';
      vis.addEventListener('click', function () {
        g.visible = !g.visible; vis.textContent = g.visible ? 'Visible' : 'Masquée';
        save(); renderGuide(g); syncToolbar();
      });
      tdV.appendChild(vis); tr.appendChild(tdV);

      var tdA = document.createElement('td');
      var dup = document.createElement('button');
      dup.className = 'cos-mini'; dup.type = 'button'; dup.textContent = 'Copier'; dup.title='Dupliquer cette ligne';
      dup.addEventListener('click', function () { duplicateGuide(g.id); });
      var del = document.createElement('button');
      del.className = 'cos-mini warn'; del.type = 'button'; del.textContent = 'Suppr.';
      del.addEventListener('click', function () { removeGuide(g.id); });
      tdA.appendChild(dup); tdA.appendChild(del); tr.appendChild(tdA);

      t.appendChild(tr);
    });
    guidesBody.innerHTML = '';
    guidesBody.appendChild(t);
    var note = document.createElement('p');
    note.className = 'cos-note';
    note.textContent = 'Positions en px dans le document. Verrouiller n’empêche ni masquer, ni recolorer, ni supprimer.';
    guidesBody.appendChild(note);
  }

  /* --- Panneau des réglages --- */
  var settingsBody;
  function buildSettingsPanel() {
    settingsBody = makePanel('settings', 'Réglages');
  }

  function settingRow(label, input) {
    var r = document.createElement('div');
    r.className = 'cos-row';
    var l = document.createElement('label'); l.textContent = label;
    r.appendChild(l); r.appendChild(input);
    return r;
  }

  function numInput(value, min, fn) {
    var i = document.createElement('input');
    i.type = 'number'; i.min = min; i.value = value;
    i.addEventListener('change', function () { fn(Math.max(min, parseInt(i.value, 10) || min)); });
    return i;
  }

  function rangeInput(value, fn) {
    var i = document.createElement('input');
    i.type = 'range'; i.min = 0; i.max = 100; i.value = Math.round(value * 100);
    i.addEventListener('input', function () { fn(i.value / 100); });
    return i;
  }

  function colorInput(value, fn) {
    var i = document.createElement('input');
    i.type = 'color'; i.value = value;
    i.addEventListener('input', function () { fn(i.value); });
    return i;
  }

  function checkInput(value, fn) {
    var i = document.createElement('input');
    i.type = 'checkbox'; i.checked = value;
    i.addEventListener('change', function () { fn(i.checked); });
    return i;
  }

  function refreshSettingsPanel() {
    if (!settingsBody) return;
    settingsBody.innerHTML = '';

    var h1 = document.createElement('p'); h1.className = 'cos-note'; h1.textContent = 'GRILLE';
    settingsBody.appendChild(h1);
    settingsBody.appendChild(settingRow('Espacement (px)', numInput(state.grid.spacing, 2, function (v) { state.grid.spacing = v; save(); drawGrid(); })));
    settingsBody.appendChild(settingRow('Subdivision (px, 0 = aucune)', numInput(state.grid.subdiv, 0, function (v) { state.grid.subdiv = v; save(); drawGrid(); })));
    settingsBody.appendChild(settingRow('Épaisseur (px)', numInput(state.grid.thickness, 1, function (v) { state.grid.thickness = v; save(); drawGrid(); })));
    settingsBody.appendChild(settingRow('Couleur', colorInput(state.grid.color, function (v) { state.grid.color = v; save(); drawGrid(); })));
    settingsBody.appendChild(settingRow('Aimantation des lignes', checkInput(state.grid.snap, function (v) { state.grid.snap = v; save(); })));

    var h2 = document.createElement('p'); h2.className = 'cos-note'; h2.textContent = 'TRANSPARENCES';
    settingsBody.appendChild(h2);
    settingsBody.appendChild(settingRow('Grille', rangeInput(state.opacity.grid, function (v) { state.opacity.grid = v; save(); drawGrid(); })));
    settingsBody.appendChild(settingRow('Lignes de repère', rangeInput(state.opacity.guides, function (v) { state.opacity.guides = v; save(); renderAllGuides(); })));
    settingsBody.appendChild(settingRow('Panneaux', rangeInput(state.opacity.panel, function (v) { state.opacity.panel = v; save(); applyPanelOpacity(); })));
    settingsBody.appendChild(settingRow('Sélection HTML', rangeInput(state.opacity.selection, function (v) { state.opacity.selection = v; save(); drawSelections(); })));
    settingsBody.appendChild(settingRow('Mesures', rangeInput(state.opacity.measure, function (v) { state.opacity.measure = v; save(); drawSelections(); })));

    var h3 = document.createElement('p'); h3.className = 'cos-note';
    h3.textContent = 'RACCOURCIS (format : ctrl+shift+g, g, l…)';
    settingsBody.appendChild(h3);
    [['toggle', 'Activer / désactiver'], ['grid', 'Grille'], ['line', 'Nouvelle ligne']].forEach(function (k) {
      var i = document.createElement('input');
      i.type = 'text'; i.value = state.keys[k[0]];
      i.addEventListener('change', function () { state.keys[k[0]] = i.value.trim().toLowerCase() || state.keys[k[0]]; save(); });
      settingsBody.appendChild(settingRow(k[1], i));
    });

    var danger = document.createElement('div'); danger.className = 'cos-actions';
    var reset = document.createElement('button');
    reset.className = 'cos-mini warn'; reset.type = 'button';
    reset.textContent = 'Réinitialiser les réglages de cette page';
    reset.addEventListener('click', function () {
      try { localStorage.removeItem(STORE_KEY); } catch (e) {}
      state.guides = []; state.constraints = [];
      save(); renderAllGuides(); refreshGuidesPanel(); refreshConstraintsPanel(); drawGrid();
      toast('Réglages réinitialisés pour ' + location.pathname);
    });
    danger.appendChild(reset);
    settingsBody.appendChild(danger);
  }

  function applyPanelOpacity() {
    shadow.querySelectorAll('.cos-panel,.cos-toolbar').forEach(function (p) {
      p.style.setProperty('--op-panel', state.opacity.panel);
      p.style.opacity = state.opacity.panel;
    });
  }

  /* --- Panneau d'inspection --- */
  var inspectBody;
  function buildInspectPanel() { inspectBody = makePanel('inspect', 'Inspection'); }

  function refreshInspectPanel() {
    if (!inspectBody) return;
    if (state.mode === 'inspect' && panels.inspect) panels.inspect.style.display = 'block';
    if (!selections.length) {
      inspectBody.innerHTML = '<p class="cos-note">Mode inspection : clique un élément du site. Maj+clic pour en sélectionner plusieurs et comparer.</p>';
      return;
    }
    inspectBody.innerHTML = '';
    selections.forEach(function (m, i) {
      var t = document.createElement('table');
      t.innerHTML = '<tr><th colspan="2">#' + (i + 1) + ' ' + m.tag.toUpperCase() +
        (m.id ? ' #' + m.id : '') + '</th></tr>' +
        '<tr><td>Classes</td><td>' + (m.classes || '—') + '</td></tr>' +
        '<tr><td>Dimensions</td><td>' + m.rect.width + ' × ' + m.rect.height + ' px</td></tr>' +
        '<tr><td>Position X</td><td>' + m.rect.x + ' px</td></tr>' +
        '<tr><td>Position Y</td><td>' + m.rect.y + ' px</td></tr>' +
        '<tr><td>Marges</td><td>' + m.margin.top + ' ' + m.margin.right + ' ' + m.margin.bottom + ' ' + m.margin.left + '</td></tr>';
      inspectBody.appendChild(t);
    });
    if (selections.length === 2) {
      var a = selections[0].rect, b = selections[1].rect;
      var d = document.createElement('table');
      d.innerHTML = '<tr><th colspan="2">Comparaison #1 ↔ #2</th></tr>' +
        '<tr><td>Écart horizontal</td><td>' + (b.x - a.x) + ' px</td></tr>' +
        '<tr><td>Écart vertical</td><td>' + (b.y - a.y) + ' px</td></tr>' +
        '<tr><td>Différence largeur</td><td>' + (b.width - a.width) + ' px</td></tr>' +
        '<tr><td>Différence hauteur</td><td>' + (b.height - a.height) + ' px</td></tr>';
      inspectBody.appendChild(d);
    }
    var act = document.createElement('div'); act.className = 'cos-actions';
    [['Aligner à gauche', 'align-left'], ['Aligner à droite', 'align-right'],
     ['Aligner en haut', 'align-top'], ['Aligner en bas', 'align-bottom'],
     ['Centres horizontaux', 'align-center-h'], ['Centres verticaux', 'align-center-v'],
     ['Même largeur', 'equal-width'], ['Même hauteur', 'equal-height'],
     ['Espacements égaux', 'equal-spacing'], ['Répartir régulièrement', 'distribute']
    ].forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'cos-mini'; b.type = 'button'; b.textContent = c[0];
      b.addEventListener('click', function () { addConstraint(c[1]); });
      act.appendChild(b);
    });
    var bg = document.createElement('button');
    bg.className = 'cos-mini'; bg.type = 'button'; bg.textContent = 'Aligner sur une ligne proche';
    bg.addEventListener('click', addGuideConstraint);
    act.appendChild(bg);
    var bc = document.createElement('button');
    bc.className = 'cos-mini warn'; bc.type = 'button'; bc.textContent = 'Effacer la sélection';
    bc.addEventListener('click', clearSelections);
    act.appendChild(bc);
    inspectBody.appendChild(act);
  }

  /* --- Panneau des contraintes --- */
  var constraintsBody;
  function buildConstraintsPanel() { constraintsBody = makePanel('constraints', 'Contraintes enregistrées'); }

  function refreshConstraintsPanel() {
    if (!constraintsBody) return;
    if (!state.constraints.length) {
      constraintsBody.innerHTML = '<p class=' + "'cos-note'" + '>Aucune contrainte. Sélectionne des éléments en mode inspection, puis choisis une relation.</p>';
      return;
    }
    var t = document.createElement('table');
    t.innerHTML = '<tr><th>Type</th><th>Éléments</th><th></th></tr>';
    state.constraints.forEach(function (c, i) {
      var tr = document.createElement('tr');
      var td1 = document.createElement('td'); td1.textContent = c.type; tr.appendChild(td1);
      var td2 = document.createElement('td');
      td2.textContent = c.elements.map(function (s) { return s.split(' > ').pop(); }).join(' ↔ ') +
        (c.guideName ? ' (sur ' + c.guideName + (c.gap ? ', écart ' + c.gap + ' px' : '') + ')' : '');
      tr.appendChild(td2);
      var td3 = document.createElement('td');
      var del = document.createElement('button');
      del.className = 'cos-mini warn'; del.type = 'button'; del.textContent = 'Suppr.';
      del.addEventListener('click', function () {
        state.constraints.splice(i, 1); save(); refreshConstraintsPanel();
      });
      td3.appendChild(del); tr.appendChild(td3);
      t.appendChild(tr);
    });
    constraintsBody.innerHTML = '';
    constraintsBody.appendChild(t);
    var note = document.createElement('p'); note.className = 'cos-note';
    note.textContent = 'Ces relations partent dans l’export JSON pour l’IA. L’IA propose des corrections, tu valides avant toute modification du code.';
    constraintsBody.appendChild(note);
  }

  /* ------------------------------------------------------------------
     Divers : toast, raccourcis, activation
     ------------------------------------------------------------------ */
  var toastEl = null, toastT = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'cos-toast';
      shadow.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.display = 'block';
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.style.display = 'none'; }, 2600);
  }

  function matchKey(combo, ev) {
    var parts = combo.split('+');
    var key = parts[parts.length - 1];
    return ev.key.toLowerCase() === key &&
      ev.ctrlKey === (parts.indexOf('ctrl') >= 0) &&
      ev.shiftKey === (parts.indexOf('shift') >= 0) &&
      ev.altKey === (parts.indexOf('alt') >= 0) &&
      ev.metaKey === (parts.indexOf('meta') >= 0);
  }

  window.addEventListener('keydown', function (ev) {
    var target=ev.composedPath()[0]; var inField = /^(input|textarea|select)$/i.test((target && target.tagName) || '') || target.isContentEditable;
    if (matchKey(state.keys.toggle, ev)) {
      ev.preventDefault();
      state.active ? deactivate() : activate();
      return;
    }
    if (!state.active || inField) return;
    if (matchKey(state.keys.grid, ev)) {
      state.grid.visible = !state.grid.visible; save(); drawGrid(); syncToolbar();
    } else if (matchKey(state.keys.line, ev)) {
      addGuide('h');
    } else if (ev.key === 'Escape' && state.mode === 'inspect') {
      state.mode = 'control'; clearSelections(); syncToolbar();
    }
  });

  window.addEventListener('scroll', function () {
    if (!state.active) return;
    alignGrid(); renderAllGuides();
    selections.forEach(function (m, i) { if (selEls[i]) placeSel(selEls[i], m); });
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (!state.active) return;
    arrangeUI();alignGrid(); renderAllGuides();
    selections.forEach(function (m, i) {
      // Réactualise les mesures si l'élément existe encore
      try {
        var el = document.querySelector(m.selector);
        if (el) selections[i] = measureElement(el);
      } catch (e) {}
    });
    drawSelections(); refreshInspectPanel();
  });

  setInterval(function(){if(!state.active||!selections.length)return;selections=selections.map(function(m){try{var e=document.querySelector(m.selector);return e?measureElement(e):m}catch(e){return m}});drawSelections()},150);

  function activate() {
    if (state.active) return;
    state.active = true;
    document.querySelectorAll("[data-code-on-screen-os]").forEach(function(e){e.style.visibility="hidden"});
    document.documentElement.appendChild(host);
    drawGrid(); renderAllGuides(); drawSelections(); applyPanelOpacity();
    refreshGuidesPanel(); refreshSettingsPanel(); refreshConstraintsPanel(); refreshInspectPanel();
    syncToolbar();
    toast('Surcouche Code on Screen active — ' + state.keys.toggle.toUpperCase() + ' pour désactiver.');
  }

  function deactivate() {
    state.active = false;
    document.querySelectorAll("[data-code-on-screen-os]").forEach(function(e){e.style.visibility=""});
    state.mode = 'control';
    clearSelections();
    renderAllGuides(); drawGrid();
    host.remove();
    save();
  }

  /* ------------------------------------------------------------------
     Démarrage : réglages persistés, barre prête, surcouche inactive
     ------------------------------------------------------------------ */
  load();
  buildUI();
  toolbar.style.display = 'none';   // la barre n'apparaît qu'avec la surcouche
  Object.keys(panels).forEach(function (k) { panels[k].style.display = 'none'; });

  // Petit bouton discret pour activer sans clavier (utile sur iPad)
  var fab = document.createElement('button');
  fab.type = 'button';
  fab.textContent = 'Co·D';
  fab.title = 'Code on Screen — surcouche de design (' + state.keys.toggle + ')';
  fab.style.cssText = 'all:initial;position:fixed;left:10px;bottom:10px;z-index:2147482999;' +
    'font:700 11px/1 "Helvetica Neue",Arial,sans-serif;background:#111;color:#fbc856;' +
    'border-radius:6px;padding:6px 8px;cursor:pointer;opacity:.55;';
  fab.addEventListener('mouseenter', function () { fab.style.opacity = '1'; });
  fab.addEventListener('mouseleave', function () { fab.style.opacity = '.55'; });
  fab.addEventListener('click', function () {
    state.active ? deactivate() : activate();
    syncFab();
  });
  function syncFab() { fab.style.display = state.active ? 'none' : 'block'; }
  document.documentElement.appendChild(fab);

  var origActivate = activate;
  activate = function () { origActivate(); toolbar.style.display = 'flex'; arrangeUI(); syncFab(); };
  var origDeactivate = deactivate;
  deactivate = function () { origDeactivate(); toolbar.style.display = 'none'; Object.keys(panels).forEach(function (k) { panels[k].style.display = 'none'; }); syncFab(); };

  // API minimale pour les tests et l'intégration future dans Code on Screen
  window.__cosDesign = {
    activate: function () { activate(); },
    deactivate: function () { deactivate(); },
    export: buildExport,
    state: state
  };
})();
