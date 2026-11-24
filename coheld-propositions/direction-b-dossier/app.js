(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const en = params.get("lang") === "en";
  document.documentElement.lang = en ? "en" : "fr";

  /* ---------- Dictionnaire FR / EN ---------- */
  const I18N = {
    fr: {
      "nav.demo": "La démonstration",
      "nav.folder": "Le dossier",
      "nav.assistants": "Vos assistants",

      "hero.eyebrow": "Mémoire de travail d'équipe",
      "hero.h1.a": "Le contexte passe.",
      "hero.h1.b": "Vos assistants restent.",
      "hero.lead": "Coheld garde, structure et transmet la mémoire de travail de l'équipe. Chacun continue dans son assistant habituel.",
      "hero.cta.primary": "Voir le dossier circuler",
      "hero.cta.secondary": "Découvrir le dossier",
      "hero.disclosure": "Aperçu d'interface · scénario fictif",

      "folder.project": "Refonte du site",
      "folder.projectSub": "Projet partagé",
      "folder.brief.title": "Le site de demain",
      "folder.brief.meta": "Camille · v4 · 12:42",
      "folder.decision.title": "Hébergeur B retenu",
      "folder.plan.meta": "Sortie · à partir du brief",
      "folder.notes.stamp": "Privé",
      "folder.notes.excluded": "Non partagé",

      "demo.eyebrow": "La démonstration",
      "demo.label": "De « partage » à « on avance ».",
      "demo.sim": "Simulation",
      "demo.step1": "Choisir",
      "demo.step2": "Transmettre",
      "demo.step3": "Reprendre",
      "demo.replay": "Rejouer",
      "demo.limit": "Scénario fictif · connexions aux assistants non validées.",

      "chat.a.sub": "Son assistant · A",
      "chat.a.bubble1": "Partage brief.md et decision.md avec Karim. Pas mes notes-privees.md.",
      "chat.a.bubble2": "Ces deux éléments, rien de plus.",
      "file.brief.meta": "Markdown · v4 · Camille",
      "file.decision.meta": "Markdown · Camille",
      "file.private.sub": "Non partagé",

      "bridge.tag": "2 fichiers .md choisis",
      "bridge.from": "Camille",
      "bridge.to": "Karim",
      "bridge.node.sub": "Le contexte partagé",
      "bridge.packet.b": "2 .md",
      "bridge.packet.s": "source : Camille",

      "chat.b.sub": "Son assistant · B",
      "chat.b.waiting.msg1": "Tu as les retours de Louis sur l'accueil ?",
      "chat.b.waiting.msg2": "Pas encore. Camille prépare quelque chose, je te tiens au courant.",
      "chat.b.arrival": "Contexte de Camille en approche…",
      "chat.b.announce.speaker": "Assistant de Karim",
      "chat.b.announce.text": "Camille m'a partagé des documents.",
      "chat.b.announce.meta": "brief.md et decision.md · source : Camille",
      "chat.b.question": "Veux-tu que je les ajoute au contexte de ce projet ?",
      "chat.b.accept": "Oui. Crée plan-accueil.md à partir de ces fichiers.",
      "chat.b.output.label": "À partir du brief de Camille",
      "chat.b.output.meta": "Sources : brief.md + decision.md · Camille. Notes privées exclues.",

      "output.plan.1": "Promesse",
      "output.plan.2": "Démonstration",
      "output.plan.3": "Dossier",
      "output.plan.4": "Assistants",

      "ledger.label": "Le dossier",
      "ledger.h2": "Ce qui circule reste consultable.",
      "ledger.lead": "Les documents restent des fichiers Markdown, avec leur auteur, leur date et leur source. Les notes privées ne quittent pas leur place.",
      "ledger.col.file": "Fichier",
      "ledger.col.source": "Source",
      "ledger.col.date": "Date",
      "ledger.col.state": "État",
      "ledger.brief.desc": "Brief de la refonte",
      "ledger.decision.desc": "Choix d'hébergement",
      "ledger.plan.desc": "Structure de l'accueil",
      "ledger.notes.desc": "Notes personnelles",
      "ledger.state.shared": "Partagé",
      "ledger.state.output": "En sortie",
      "ledger.state.private": "Privé · exclu",
      "ledger.preview.tab": "Aperçu rendu",
      "ledger.preview.raw": "Source .md",
      "ledger.preview.download": "Télécharger brief.md",

      "md.brief.raw": "# Refonte du site\n\n## Objectif\nPrésenter la promesse et le parcours.\n\n## Source\nCamille · version 4\n\n![Direction visuelle](../img/worktable.webp)",
      "md.brief.h": "Refonte du site",
      "md.brief.sub": "Objectif",
      "md.brief.p": "Présenter la promesse et le parcours.",
      "md.brief.sub2": "Source",
      "md.brief.src": "Camille · version 4",
      "md.brief.img": "Direction visuelle liée dans brief.md",

      "editorial.label": "Vos assistants",
      "editorial.h2": "Chacun garde son assistant.",
      "editorial.lead": "Camille et Karim ne changent pas d'outil. Le contexte voyage avec sa source, chacun garde sa copie et peut l'exporter.",
      "editorial.caption": "Le contexte circule. Pas vos notes privées.",
      "editorial.point1": "La source reste liée au contexte",
      "editorial.point2": "Chacun garde sa copie",
      "editorial.point3": "Export Markdown à tout moment",
      "editorial.chip": "Transmis avec sa source",

      "footer.disclaimer": "Maquette · exemples fictifs",
      "footer.images": "Images illustratives générées",
      "footer.explore": "Sources .md"
    },
    en: {
      "nav.demo": "The demo",
      "nav.folder": "The folder",
      "nav.assistants": "Your assistants",

      "hero.eyebrow": "Team working memory",
      "hero.h1.a": "Context moves on.",
      "hero.h1.b": "Your assistants stay.",
      "hero.lead": "Coheld keeps, structures and passes on the team's working memory. Everyone stays in their usual assistant.",
      "hero.cta.primary": "See the folder travel",
      "hero.cta.secondary": "Discover the folder",
      "hero.disclosure": "Interface preview · fictional scenario",

      "folder.project": "Website redesign",
      "folder.projectSub": "Shared project",
      "folder.brief.title": "Tomorrow's website",
      "folder.brief.meta": "Camille · v4 · 12:42",
      "folder.decision.title": "Hosting provider B selected",
      "folder.plan.meta": "Output · based on the brief",
      "folder.notes.stamp": "Private",
      "folder.notes.excluded": "Not shared",

      "demo.eyebrow": "The demonstration",
      "demo.label": "From “share this” to moving forward.",
      "demo.sim": "Simulation",
      "demo.step1": "Choose",
      "demo.step2": "Share",
      "demo.step3": "Continue",
      "demo.replay": "Replay",
      "demo.limit": "Fictional scenario · assistant connections not validated.",

      "chat.a.sub": "Her assistant · A",
      "chat.a.bubble1": "Share brief.md and decision.md with Karim. Not my private-notes.md.",
      "chat.a.bubble2": "These two items, nothing else.",
      "file.brief.meta": "Markdown · v4 · Camille",
      "file.decision.meta": "Markdown · Camille",
      "file.private.sub": "Not shared",

      "bridge.tag": "2 selected .md files",
      "bridge.from": "Camille",
      "bridge.to": "Karim",
      "bridge.node.sub": "Shared context",
      "bridge.packet.b": "2 .md",
      "bridge.packet.s": "source: Camille",

      "chat.b.sub": "His assistant · B",
      "chat.b.waiting.msg1": "Do you have Louis's feedback on the homepage?",
      "chat.b.waiting.msg2": "Not yet. Camille is preparing something — I'll keep you posted.",
      "chat.b.arrival": "Camille's context is on its way…",
      "chat.b.announce.speaker": "Karim's assistant",
      "chat.b.announce.text": "Camille shared some documents with me.",
      "chat.b.announce.meta": "brief.md and decision.md · source: Camille",
      "chat.b.question": "Would you like me to add them to this project's context?",
      "chat.b.accept": "Yes. Create homepage-outline.md from these files.",
      "chat.b.output.label": "Based on Camille's brief",
      "chat.b.output.meta": "Sources: brief.md + decision.md · Camille. Private notes excluded.",

      "output.plan.1": "Promise",
      "output.plan.2": "Demo",
      "output.plan.3": "Folder",
      "output.plan.4": "Assistants",

      "ledger.label": "The folder",
      "ledger.h2": "What moves stays findable.",
      "ledger.lead": "Documents stay Markdown files, with their author, date and source. Private notes stay put.",
      "ledger.col.file": "File",
      "ledger.col.source": "Source",
      "ledger.col.date": "Date",
      "ledger.col.state": "Status",
      "ledger.brief.desc": "Redesign brief",
      "ledger.decision.desc": "Hosting choice",
      "ledger.plan.desc": "Homepage outline",
      "ledger.notes.desc": "Personal notes",
      "ledger.state.shared": "Shared",
      "ledger.state.output": "Output",
      "ledger.state.private": "Private · excluded",
      "ledger.preview.tab": "Rendered preview",
      "ledger.preview.raw": "Source .md",
      "ledger.preview.download": "Download brief.md",

      "md.brief.raw": "# Website redesign\n\n## Goal\nPresent the promise and the journey.\n\n## Source\nCamille · version 4\n\n![Visual direction](../img/worktable.webp)",
      "md.brief.h": "Website redesign",
      "md.brief.sub": "Goal",
      "md.brief.p": "Present the promise and the journey.",
      "md.brief.sub2": "Source",
      "md.brief.src": "Camille · version 4",
      "md.brief.img": "Visual direction linked in brief.md",

      "editorial.label": "Your assistants",
      "editorial.h2": "Everyone keeps their assistant.",
      "editorial.lead": "Camille and Karim don't switch tools. Context travels with its source; each person keeps a copy and can export it.",
      "editorial.caption": "Context moves. Your private notes don't.",
      "editorial.point1": "The source stays linked to the context",
      "editorial.point2": "Each person keeps their copy",
      "editorial.point3": "Markdown export anytime",
      "editorial.chip": "Transmitted with its source",

      "footer.disclaimer": "Mockup · fictional examples",
      "footer.images": "Generated illustrative images",
      "footer.explore": "Sample .md files"
    }
  };

  const dict = I18N[en ? "en" : "fr"];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });
  document.querySelectorAll(".lang a").forEach((a) => {
    a.setAttribute("aria-current", a.getAttribute("lang") === (en ? "en" : "fr") ? "true" : "false");
  });

  /* ---------- Aperçu Markdown : rendu / source ---------- */
  const preview = document.querySelector(".md-preview");
  const previewTabs = preview ? [...preview.querySelectorAll(".md-preview-tabs button")] : [];
  previewTabs.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      preview.dataset.view = i === 0 ? "rendered" : "raw";
      previewTabs.forEach((b, j) => b.setAttribute("aria-selected", String(i === j)));
    });
  });

  /* ---------- Démo ---------- */
  const demo = document.querySelector(".demo");
  if (!demo) return;

  const stage = demo.querySelector(".demo-stage");
  const stepButtons = [...demo.querySelectorAll("[data-scene]")];
  const pauseBtn = demo.querySelector("[data-pause]");
  const replayBtn = demo.querySelector("[data-replay]");
  const caption = demo.querySelector(".caption");
  const packet = demo.querySelector("[data-packet]");
  const bridgeTrack = demo.querySelector(".bridge-track");
  const step2Items = [...demo.querySelectorAll(".announce, .question, .accept, .output")];

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const mobileLayout = matchMedia("(max-width: 960px)");
  const hasMotion = typeof window.Motion !== "undefined" && typeof window.Motion.animate === "function";

  const captions = en
    ? ["Camille selects two items. Her personal notes stay private.", "Only the selected context moves, with its source.", "Karim accepts in his chat, then uses the shared context."]
    : ["Camille choisit deux éléments. Ses notes personnelles restent privées.", "Seul le contexte choisi circule, avec sa source.", "Karim accepte dans son chat, puis utilise le contexte reçu."];

  let scene = 0;
  let paused = true;
  let token = 0;
  let active = [];
  let observer = null;

  function cancel() {
    token++;
    active.forEach((a) => { try { a.stop && a.stop(); } catch (e) {} });
    active = [];
  }
  const ok = (t) => t === token;

  function delay(ms, t) {
    return new Promise((resolve) => {
      if (reduced.matches) { resolve(true); return; }
      let elapsed = 0;
      let last = performance.now();
      function tick(now) {
        if (t !== token) { resolve(false); return; }
        if (!paused) elapsed += Math.min(now - last, 60);
        last = now;
        if (elapsed >= ms) resolve(true);
        else requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function animate(el, keyframes, opts) {
    if (!hasMotion || reduced.matches) {
      // apply final state directly
      if (keyframes.opacity) el.style.opacity = String(keyframes.opacity[keyframes.opacity.length - 1]);
      if (keyframes.transform) el.style.transform = keyframes.transform[keyframes.transform.length - 1];
      return { finished: Promise.resolve() };
    }
    const a = window.Motion.animate(el, keyframes, opts);
    active.push(a);
    return a;
  }

  function hidePacket() {
    packet.style.opacity = "0";
    packet.style.transform = "translate(0, 0)";
  }

  function showPacketStatic() {
    const rect = bridgeTrack.getBoundingClientRect();
    const pw = packet.offsetWidth || 150;
    const ph = packet.offsetHeight || 44;
    let x, y;
    if (mobileLayout.matches) {
      x = rect.width / 2 - pw / 2;
      y = 0;
    } else {
      x = -6;
      y = rect.height / 2 - ph / 2;
    }
    packet.style.opacity = "1";
    packet.style.transform = "translate(" + x + "px, " + y + "px)";
  }

  function updatePauseButton() {
    const label = paused ? (en ? "Play" : "Lire") : "Pause";
    const span = pauseBtn.querySelector("[data-pause-label]");
    if (span) span.textContent = label;
    pauseBtn.setAttribute("aria-pressed", String(paused));
    pauseBtn.setAttribute("aria-label", label);
  }

  function frame(n) {
    scene = n;
    stage.dataset.step = String(n);
    stepButtons.forEach((b, i) => {
      b.setAttribute("aria-pressed", String(i === n));
    });
    caption.textContent = captions[n];
    step2Items.forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
    if (n === 1) showPacketStatic();
    else hidePacket();
  }

  async function animatePacket(t) {
    const rect = bridgeTrack.getBoundingClientRect();
    const pw = packet.offsetWidth || 150;
    const ph = packet.offsetHeight || 44;
    let start, mid, end;
    if (mobileLayout.matches) {
      const cx = rect.width / 2 - pw / 2;
      start = { x: cx, y: -ph };
      mid = { x: cx, y: rect.height / 2 - ph / 2 };
      end = { x: cx, y: rect.height };
    } else {
      const cy = rect.height / 2 - ph / 2;
      start = { x: -pw, y: cy };
      mid = { x: rect.width / 2 - pw / 2, y: cy - 8 };
      end = { x: rect.width, y: cy };
    }
    const a = animate(packet, {
      opacity: [0, 1, 1, 0],
      transform: [
        "translate(" + start.x + "px, " + start.y + "px)",
        "translate(" + mid.x + "px, " + mid.y + "px)",
        "translate(" + end.x + "px, " + end.y + "px)"
      ]
    }, { duration: 2.3, times: [0, 0.18, 0.82, 1], ease: [0.77, 0, 0.175, 1] });
    await a.finished;
    if (!ok(t)) return;
    hidePacket();
  }

  async function revealStep2(t) {
    if (!hasMotion || reduced.matches) return;
    step2Items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
    });
    for (let i = 0; i < step2Items.length; i++) {
      const stayed = await delay(i === 0 ? 60 : 260, t);
      if (!stayed) return;
      animate(step2Items[i], {
        opacity: [0, 1],
        transform: ["translateY(8px)", "translateY(0)"]
      }, { duration: 0.42, ease: [0.23, 1, 0.32, 1] });
    }
  }

  async function play() {
    cancel();
    const t = token;
    paused = false;
    updatePauseButton();
    frame(0);
    if (reduced.matches) {
      frame(2);
      paused = true;
      updatePauseButton();
      return;
    }
    await delay(700, t); if (!ok(t)) return;
    await delay(1000, t); if (!ok(t)) return;
    frame(1);
    await animatePacket(t);
    await delay(350, t); if (!ok(t)) return;
    frame(2);
    await revealStep2(t);
    if (!ok(t)) return;
    paused = true;
    updatePauseButton();
  }

  function stopAutoplay() {
    if (observer) { observer.disconnect(); observer = null; }
  }

  stepButtons.forEach((b) => {
    b.addEventListener("click", () => {
      stopAutoplay();
      cancel();
      paused = true;
      updatePauseButton();
      frame(Number(b.getAttribute("data-scene")));
    });
  });

  pauseBtn.addEventListener("click", () => {
    stopAutoplay();
    if (paused) {
      if (scene === 2) {
        play();
      } else {
        paused = false;
        active.forEach((a) => { try { a.play && a.play(); } catch (e) {} });
        updatePauseButton();
      }
    } else {
      paused = true;
      active.forEach((a) => { try { a.pause && a.pause(); } catch (e) {} });
      updatePauseButton();
    }
  });

  replayBtn.addEventListener("click", () => {
    stopAutoplay();
    play();
  });

  /* état initial */
  frame(0);
  paused = true;
  updatePauseButton();
  if (reduced.matches) {
    frame(2);
  } else {
    if ("IntersectionObserver" in window) {
      let started = false;
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          play();
        }
      }, { threshold: 0.3 });
      observer.observe(demo);
    }
  }

  /* API de test / contrôle */
  window.coheld = {
    show: (n) => { stopAutoplay(); cancel(); paused = true; updatePauseButton(); frame(Number(n)); },
    play: () => { stopAutoplay(); play(); },
    pause: () => { stopAutoplay(); paused = true; cancel(); updatePauseButton(); },
    getState: () => ({ scene, paused, reduced: reduced.matches })
  };

  reduced.addEventListener("change", () => {
    cancel();
    if (reduced.matches) {
      frame(2);
      paused = true;
      updatePauseButton();
    } else {
      paused = true;
      updatePauseButton();
    }
  });

  /* ---------- Révélation d'ouverture (un seul moment orchestré) ---------- */
  if (hasMotion && !reduced.matches) {
    const copyItems = [...document.querySelectorAll(".hero-copy > *")];
    copyItems.forEach((el, i) => {
      el.style.opacity = "0";
      const a = window.Motion.animate(el, {
        opacity: [0, 1],
        transform: ["translateY(14px)", "translateY(0)"]
      }, { duration: 0.7, delay: 0.04 + i * 0.08, ease: [0.23, 1, 0.32, 1] });
      a.finished.then(() => { el.style.opacity = ""; el.style.transform = ""; });
    });
    const folderScene = document.querySelector(".folder-scene");
    if (folderScene) {
      folderScene.style.opacity = "0";
      const a = window.Motion.animate(folderScene, {
        opacity: [0, 1],
        transform: ["translateY(22px)", "translateY(0)"]
      }, { duration: 0.95, delay: 0.08, ease: [0.23, 1, 0.32, 1] });
      a.finished.then(() => { folderScene.style.opacity = ""; folderScene.style.transform = ""; });
    }
  }
})();
