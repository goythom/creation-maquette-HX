/* ============================================================
   Coheld — direction C « Deux conversations, un contexte »
   i18n FR/EN + démonstration à étapes (choisir → transmettre
   → reprendre → produire) + contrôles lecture/pause/rejeu.
   ============================================================ */
(() => {
  "use strict";

  /* ---------- Dictionnaire FR / EN ---------- */
  const I18N = {
    "nav.demo":          { fr: "Démonstration",        en: "Demo" },
    "nav.principe":      { fr: "Principe",             en: "How it works" },
    "nav.cta":           { fr: "Voir la démo",         en: "See the demo" },

    "hero.eyebrow":      { fr: "Mémoire de travail partagée, indépendante des fournisseurs d'IA",
                           en: "Shared working memory, independent from AI vendors" },
    "hero.t1":           { fr: "Deux conversations.",  en: "Two conversations." },
    "hero.t2":           { fr: "Un contexte commun.",  en: "One shared context." },
    "hero.lede":         { fr: "Camille garde son assistant. Karim garde le sien. Coheld conserve, structure et transmet le contexte qui circule entre eux.",
                           en: "Camille keeps her assistant. Karim keeps his. Coheld keeps, structures and passes the context between them." },
    "hero.cta1":         { fr: "Voir la démonstration", en: "See the demo" },
    "hero.cta2":         { fr: "Lire le principe",     en: "How it works" },
    "hero.note":         { fr: "Maquette illustrative · noms fictifs · aucune intégration réelle",
                           en: "Illustrative mockup · fictional names · no real integration" },

    "demo.title":        { fr: "Démo · parcours simulé", en: "Demo · simulated walkthrough" },
    "step.0":            { fr: "Choisir",              en: "Choose" },
    "step.1":            { fr: "Transmettre",          en: "Pass along" },
    "step.2":            { fr: "Reprendre",            en: "Take over" },
    "step.3":            { fr: "Produire",             en: "Produce" },

    "win.camille":       { fr: "Assistant de Camille", en: "Camille's assistant" },
    "win.karim":         { fr: "Assistant de Karim",   en: "Karim's assistant" },
    "win.sub":           { fr: "assistant · chat",     en: "assistant · chat" },
    "win.online":        { fr: "en ligne",             en: "online" },
    "chat.input":        { fr: "Écrire un message…",   en: "Write a message…" },

    "layer.sub":         { fr: "couche de contexte",   en: "context layer" },
    "layer.state.0":     { fr: "Sélection",            en: "Selection" },
    "layer.state.1":     { fr: "Transmission",         en: "In transit" },
    "layer.state.2":     { fr: "Reçu",                 en: "Received" },
    "layer.state.3":     { fr: "Repris",               en: "In use" },
    "layer.files":       { fr: "Documents",            en: "Documents" },
    "layer.meta.brief":  { fr: "Brief · v4",           en: "Brief · v4" },
    "layer.meta.decision": { fr: "Décision · v1",      en: "Decision · v1" },
    "layer.meta.notes":  { fr: "Notes · privé",        en: "Notes · private" },
    "layer.out":         { fr: "Sortie",               en: "Output" },
    "layer.source":      { fr: "Source · Camille — Refonte du site",
                           en: "Source · Camille — Website redesign" },

    "camille.ask":       { fr: "Transmets à Karim le contexte du projet « Refonte du site ».",
                           en: "Send Karim the context for the “Website redesign” project." },
    "pick.title":        { fr: "Quoi partager ?",      en: "What to share?" },
    "pick.brief.meta":   { fr: "Brief · v4 · 12 Ko",   en: "Brief · v4 · 12 KB" },
    "pick.decision.meta":{ fr: "Décision · v1 · 4 Ko", en: "Decision · v1 · 4 KB" },
    "pick.notes.meta":   { fr: "Notes · privé",        en: "Notes · private" },
    "pick.share":        { fr: "Partager",             en: "Share" },
    "camille.send":      { fr: "Je transmets brief.md et decision.md, avec leur source.",
                           en: "I'm passing brief.md and decision.md, with their source." },
    "sending":           { fr: "Envoi en cours…",      en: "Sending…" },
    "camille.sent":      { fr: "Contexte transmis. Karim peut le reprendre dans son assistant.",
                           en: "Context sent. Karim can take it over in his assistant." },
    "camille.done":      { fr: "Contexte transmis et repris par Karim.",
                           en: "Context sent and taken over by Karim." },

    "karim.ask":         { fr: "Où en est la refonte du site ?",
                           en: "Where are we on the website redesign?" },
    "karim.nocontext":   { fr: "Je n’ai pas encore reçu le contexte de Camille.",
                           en: "I haven't received Camille's context yet." },
    "karim.announce":    { fr: "Camille m’a partagé des documents.",
                           en: "Camille shared some documents with me." },
    "recv.title":        { fr: "Documents reçus",      en: "Received documents" },
    "recv.brief.meta":   { fr: "Camille · v4",         en: "Camille · v4" },
    "recv.decision.meta":{ fr: "Camille · v1",         en: "Camille · v1" },
    "karim.suggest":     { fr: "Je peux utiliser ce contexte pour la suite.",
                           en: "I can use this context to move forward." },
    "karim.use":         { fr: "Utiliser ce contexte", en: "Use this context" },
    "karim.ignore":      { fr: "Ignorer",              en: "Ignore" },
    "karim.output":      { fr: "Voici une proposition à partir de ce contexte :",
                           en: "Here's a proposal built from this context:" },
    "out.title":         { fr: "plan-accueil.md",      en: "plan-accueil.md" },
    "out.badge":         { fr: "Markdown",             en: "Markdown" },
    "out.sources":       { fr: "Sources : brief.md + decision.md · Camille. Notes privées exclues.",
                           en: "Sources: brief.md + decision.md · Camille. Private notes excluded." },

    "demo.caption.0":    { fr: "Camille choisit brief.md et decision.md. Ses notes privées restent exclues.",
                           en: "Camille picks brief.md and decision.md. Her private notes stay excluded." },
    "demo.caption.1":    { fr: "Les deux documents circulent vers l’assistant de Karim, avec leur source conservée.",
                           en: "The two documents travel to Karim's assistant, with their source preserved." },
    "demo.caption.2":    { fr: "L’assistant de Karim annonce : « Camille m’a partagé des documents. » Karim choisit de l’utiliser.",
                           en: "Karim's assistant announces: “Camille shared some documents with me.” Karim chooses to use it." },
    "demo.caption.3":    { fr: "Le contexte devient une sortie lisible : plan-accueil.md.",
                           en: "The context becomes a readable output: plan-accueil.md." },
    "demo.note":         { fr: "Scénario simulé : choisir → transmettre → reprendre → produire. Les notes privées ne partent jamais.",
                           en: "Simulated scenario: choose → pass along → take over → produce. Private notes never leave." },

    "a.eyebrow":         { fr: "Ce qui passe",         en: "What gets shared" },
    "a.title":           { fr: "Vous choisissez. Le reste reste privé.", en: "You choose. The rest stays private." },
    "a.body":            { fr: "Le partage se choisit depuis le chat, document par document. Ce qui n'est pas coché ne circule pas — et la source du contexte reste attachée à chaque fichier.",
                           en: "Sharing is chosen from the chat, document by document. What isn't checked never moves — and each file keeps its source." },
    "a.folder":          { fr: "Projet — Refonte du site", en: "Project — Website redesign" },
    "a.count":           { fr: "3 documents",          en: "3 documents" },
    "a.brief.meta":      { fr: "Brief · v4 · source Camille", en: "Brief · v4 · source Camille" },
    "a.decision.meta":   { fr: "Décision · v1 · source Camille", en: "Decision · v1 · source Camille" },
    "a.notes.meta":      { fr: "Notes · privé · jamais partagé", en: "Notes · private · never shared" },
    "a.source":          { fr: "Source conservée sur chaque document transmis", en: "Source preserved on every document passed" },
    "a.scribble":        { fr: "reste privé",          en: "stays private" },

    "b.eyebrow":         { fr: "La suite",             en: "What's next" },
    "b.title":           { fr: "Le contexte devient une sortie lisible.", en: "Context becomes a readable output." },
    "b.body":            { fr: "Coheld restitue le contexte en Markdown, consultable et réutilisable. Karim continue dans son assistant habituel — le travail reprend, sans copier-coller.",
                           en: "Coheld hands the context back as Markdown, readable and reusable. Karim keeps working in his usual assistant — no copy-paste." },
    "b.stay":            { fr: "Karim reste dans son assistant habituel.", en: "Karim stays in his usual assistant." },
    "b.badge":           { fr: "Markdown",             en: "Markdown" },
    "b.raw.label":       { fr: "source .md",           en: "source .md" },
    "teaser.cap":        { fr: "le contexte, pas les conversations", en: "the context, not the conversations" },
    "b.rendered.body":   {
      fr: "<h1>Plan de la page d'accueil</h1><blockquote>Structure illustrative proposée à partir du contexte partagé.</blockquote><h2>La promesse</h2><p>Dire ce que le produit change pour l'équipe.</p><h2>Le fonctionnement</h2><p>Montrer le parcours : choisir, transmettre, reprendre.</p><h2>La confiance</h2><p>Expliquer ce qui est partagé et ce qui reste privé.</p>",
      en: "<h1>Homepage plan</h1><blockquote>Illustrative structure proposed from the shared context.</blockquote><h2>The promise</h2><p>Say what the product changes for the team.</p><h2>How it works</h2><p>Show the path: choose, pass along, take over.</p><h2>Trust</h2><p>Explain what is shared and what stays private.</p>"
    },
    "b.raw":             {
      fr: "# Plan de la page d'accueil\n\n> Structure illustrative proposée à partir du contexte partagé.\n\n## La promesse\nDire ce que le produit change pour l'équipe.\n\n## Le fonctionnement\nMontrer le parcours : choisir, transmettre, reprendre.\n\n## La confiance\nExpliquer ce qui est partagé et ce qui reste privé.\n\n- Sources : brief.md (Camille, v4), decision.md (Camille)\n- Les notes personnelles sont exclues.",
      en: "# Homepage plan\n\n> Illustrative structure proposed from the shared context.\n\n## The promise\nSay what the product changes for the team.\n\n## How it works\nShow the path: choose, pass along, take over.\n\n## Trust\nExplain what is shared and what stays private.\n\n- Sources: brief.md (Camille, v4), decision.md (Camille)\n- Personal notes are excluded."
    },

    "footer.line":       { fr: "Maquette illustrative — aucune connexion réelle aux assistants, aucun stockage ni transfert opérationnel.",
                           en: "Illustrative mockup — no real connection to assistants, no operational storage or transfer." },

    "ctrl.pause":        { fr: "Pause", en: "Pause" },
    "ctrl.play":         { fr: "Lire",  en: "Play" },
    "ctrl.replay":       { fr: "Rejouer", en: "Replay" }
  };

  const lang = new URLSearchParams(location.search).get("lang") === "en" ? "en" : "fr";
  const t = (key) => (I18N[key] ? (I18N[key][lang] ?? I18N[key].fr) : key);

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function syntaxMarkdown(src) {
    return src.split("\n").map((line) => {
      const h = line.match(/^(#{1,3})\s+(.*)$/);
      if (h) return `<span class="md">${h[1]}</span> ${escapeHtml(h[2])}`;
      if (line.startsWith("> ")) return `<span class="md">&gt;</span> ${escapeHtml(line.slice(2))}`;
      if (line.startsWith("- ")) return `<span class="md">-</span> ${escapeHtml(line.slice(2))}`;
      if (line.trim() === "") return "";
      return escapeHtml(line);
    }).join("\n");
  }

  /* ---------- Application i18n statique ---------- */
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(el.dataset.i18n);
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = t(el.dataset.i18nHtml);
    if (v) el.innerHTML = v;
  });
  const rawCode = document.querySelector("#doc-raw code");
  if (rawCode) rawCode.innerHTML = syntaxMarkdown(t("b.raw"));
  document.querySelectorAll("[data-lang]").forEach((a) => {
    a.setAttribute("aria-current", String(a.dataset.lang === lang));
  });

  /* ---------- Icônes ---------- */
  const FILE_ICON = '<svg class="pick-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M5 3h9l5 5v13H5z"/><path d="M14 3v6h5"/></svg>';
  const CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const LOCK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>';
  const SEND_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>';
  const CLOCK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.5l3 2" stroke-linecap="round"/></svg>';
  const SOURCE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.5l3 2" stroke-linecap="round"/></svg>';

  /* ---------- Construction des scènes ---------- */
  const bubble = (kind, html) => `<div class="msg msg--${kind}"><div class="bubble">${html}</div></div>`;

  function pickCard() {
    const row = (name, meta, state) => `
      <div class="pick-row ${state === "off" ? "pick-row--off" : ""}">
        ${FILE_ICON}
        <span class="pick-meta"><b>${name}</b><small>${meta}</small></span>
        ${state === "off" ? `<span class="pick-lock">${LOCK_ICON}</span>` : `<span class="pick-check">${CHECK_ICON}</span>`}
      </div>`;
    return `
      <div class="pick">
        <p class="pick-title">${t("pick.title")}</p>
        ${row("brief.md", t("pick.brief.meta"), "on")}
        ${row("decision.md", t("pick.decision.meta"), "on")}
        ${row("notes-privees.md", t("pick.notes.meta"), "off")}
        <span class="pick-action" aria-hidden="true">${SEND_ICON}${t("pick.share")}</span>
      </div>`;
  }

  function recvCard() {
    const row = (name, meta) => `
      <div class="recv-row">${FILE_ICON}<span><b>${name}</b> <small>${meta}</small></span></div>`;
    return `
      <div class="recv">
        <p class="recv-title">${t("recv.title")}</p>
        ${row("brief.md", t("recv.brief.meta"))}
        ${row("decision.md", t("recv.decision.meta"))}
      </div>`;
  }

  function typingBubble() {
    return `<div class="msg msg--assistant"><div class="bubble typing"><span></span><span></span><span></span></div></div>`;
  }

  function outputCard() {
    return `
      <div class="doc-out">
        <div class="doc-out-head"><b>${t("out.title")}</b><span class="doc-badge">${t("out.badge")}</span></div>
        <div class="doc-out-body">
          <h1>${lang === "fr" ? "Plan de la page d’accueil" : "Homepage plan"}</h1>
          <blockquote>${lang === "fr" ? "Structure illustrative proposée à partir du contexte partagé." : "Illustrative structure proposed from the shared context."}</blockquote>
          <h2>${lang === "fr" ? "La promesse" : "The promise"}</h2>
          <p>${lang === "fr" ? "Dire ce que le produit change pour l’équipe." : "Say what the product changes for the team."}</p>
          <h2>${lang === "fr" ? "Le fonctionnement" : "How it works"}</h2>
          <p>${lang === "fr" ? "Montrer le parcours : choisir, transmettre, reprendre." : "Show the path: choose, pass along, take over."}</p>
        </div>
        <div class="doc-out-sources">${["brief.md", "decision.md"].map((s) => `<span class="chip">${s}</span>`).join("")}<span class="chip">Camille</span></div>
        <span class="t">${t("out.sources")}</span>
      </div>`;
  }

  function layerBody(step) {
    const file = (name, meta, state) => `
      <div class="layer-file layer-file--${state}">
        ${FILE_ICON}
        <span class="layer-file-meta"><b>${name}</b><small>${meta}</small></span>
        <span class="layer-file-state">${state === "off" ? LOCK_ICON : CHECK_ICON}</span>
      </div>`;

    const files = `
      <div class="layer-label">${t("layer.files")}</div>
      <div class="layer-files">
        ${file("brief.md", t("layer.meta.brief"), "on")}
        ${file("decision.md", t("layer.meta.decision"), "on")}
        ${file("notes-privees.md", t("layer.meta.notes"), "off")}
      </div>`;

    const transit = step === 1
      ? `<div class="transit" aria-hidden="true"><span class="transit-line"></span><span class="transit-doc">${FILE_ICON}</span></div>`
      : "";

    const output = step === 3
      ? `<div class="layer-output"><div class="layer-label">${t("layer.out")}</div>
           <div class="layer-file layer-file--out">${FILE_ICON}<span class="layer-file-meta"><b>plan-accueil.md</b><small>${t("out.badge")}</small></span><span class="layer-file-state">${CHECK_ICON}</span></div>
         </div>`
      : "";

    return `${files}${transit}${output}
      <div class="layer-source">${SOURCE_ICON}<span>${t("layer.source")}</span></div>`;
  }

  function camilleChat(step) {
    const ask = bubble("user", t("camille.ask"));
    if (step === 0) return ask + bubble("assistant", pickCard());
    if (step === 1) return ask + bubble("assistant", `${t("camille.send")}<span class="t">${t("sending")}</span>`);
    if (step === 2) return ask + bubble("assistant", `${t("camille.sent")}<span class="t">✓</span>`);
    return bubble("assistant", `${t("camille.done")}<span class="t">✓</span>`);
  }

  function karimChat(step) {
    const ask = bubble("user", t("karim.ask"));
    if (step === 0) return ask + bubble("assistant", t("karim.nocontext"));
    if (step === 1) return ask + typingBubble();
    const announce = bubble("assistant", `${t("karim.announce")}${recvCard()}`);
    if (step === 2) {
      const choice = `<div class="choice"><span class="use" data-chosen="true">${t("karim.use")}</span><span class="ignore">${t("karim.ignore")}</span></div>`;
      return announce + bubble("assistant", `${t("karim.suggest")}${choice}`);
    }
    return announce + bubble("assistant", `${t("karim.output")}${outputCard()}`);
  }

  /* ---------- Rendu & navigation ---------- */
  const stage = document.getElementById("stage");
  const stageInner = document.querySelector(".stage-inner");
  const chatC = document.getElementById("chat-camille");
  const chatK = document.getElementById("chat-karim");
  const layerEl = document.getElementById("layer-body");
  const layerState = document.getElementById("layer-state");
  const caption = document.getElementById("demo-caption");
  const progressFill = document.getElementById("progress-fill");
  const btnPause = document.getElementById("btn-pause");
  const btnReplay = document.getElementById("btn-replay");
  const stepBtns = [...document.querySelectorAll(".step")];
  const demoShell = document.getElementById("demo-shell");

  const STEP_DUR = 4600;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  let current = 0;
  let playing = false;
  let paused = false;
  let rafId = null;
  let stepStart = 0;
  let elapsed = 0;
  let swapToken = 0;
  let userInteracted = false;

  function paint(n) {
    current = n;
    stage.dataset.step = String(n);
    layerState.textContent = t("layer.state." + n);
    caption.textContent = t("demo.caption." + n);
    chatC.innerHTML = camilleChat(n);
    layerEl.innerHTML = layerBody(n);
    chatK.innerHTML = karimChat(n);
    stepBtns.forEach((b, i) => {
      const on = i === n;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
  }

  function render(n) {
    if (reduced.matches) { paint(n); return; }
    swapToken++;
    const token = swapToken;
    stageInner.style.transition = "opacity 150ms var(--ease-out)";
    stageInner.style.opacity = "0";
    window.setTimeout(() => {
      if (token !== swapToken) return;
      paint(n);
      stageInner.style.transition = "opacity 300ms var(--ease-out)";
      stageInner.style.opacity = "1";
    }, 150);
  }

  function updateControls() {
    const isPaused = !playing || paused;
    btnPause.setAttribute("aria-pressed", String(isPaused));
    btnPause.setAttribute("aria-label", isPaused ? t("ctrl.play") : t("ctrl.pause"));
  }

  function tick(now) {
    if (!playing || paused) return;
    elapsed = now - stepStart;
    const p = Math.min(elapsed / STEP_DUR, 1);
    progressFill.style.transform = `scaleX(${p})`;
    if (p >= 1) {
      if (current === 3) { playing = false; paused = true; updateControls(); return; }
      startStep(current + 1, true);
      return;
    }
    rafId = requestAnimationFrame(tick);
  }

  function startStep(n, autoplay) {
    render(n);
    elapsed = 0;
    stepStart = performance.now();
    cancelAnimationFrame(rafId);
    if (autoplay && !reduced.matches) {
      playing = true;
      paused = false;
      rafId = requestAnimationFrame(tick);
    } else {
      playing = false;
      paused = true;
      progressFill.style.transform = "scaleX(0)";
    }
    updateControls();
  }

  function togglePause() {
    if (reduced.matches) return;
    userInteracted = true;
    if (!playing) { startStep(current, true); return; }
    paused = !paused;
    if (paused) {
      cancelAnimationFrame(rafId);
    } else {
      stepStart = performance.now() - elapsed;
      rafId = requestAnimationFrame(tick);
    }
    updateControls();
  }

  function replay() {
    if (reduced.matches) return;
    userInteracted = true;
    startStep(0, true);
  }

  stepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      userInteracted = true;
      playing = false;
      paused = true;
      cancelAnimationFrame(rafId);
      render(+btn.dataset.step);
      elapsed = 0;
      progressFill.style.transform = "scaleX(0)";
      updateControls();
    });
  });

  btnPause.addEventListener("click", togglePause);
  btnReplay.addEventListener("click", replay);

  btnPause.setAttribute("aria-label", t("ctrl.play"));
  btnReplay.setAttribute("aria-label", t("ctrl.replay"));

  /* ---------- Initialisation ---------- */
  if (reduced.matches) {
    // Navigation manuelle uniquement ; l'état final reste lisible (étape Produire).
    paint(3);
    updateControls();
  } else {
    paint(0);
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !userInteracted) {
        startStep(0, true);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(demoShell);
  }

  /* Re-rendre au changement de préférence de mouvement. */
  reduced.addEventListener && reduced.addEventListener("change", () => {
    cancelAnimationFrame(rafId);
    playing = false;
    paused = true;
    if (reduced.matches) { paint(current); }
    updateControls();
  });
})();
