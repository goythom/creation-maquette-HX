/* Coheld — Éditorial
   i18n FR/EN + démonstration à étapes (pause / lecture / rejouer) */
(() => {
  "use strict";

  /* ── Dictionnaire ─────────────────────────────────────────────── */
  const I18N = {
    fr: {
      nav_demo: "La démonstration",
      nav_md: "Le fichier .md",
      nav_private: "Le privé",
      meta_line: "Mémoire de travail partagée",
      meta_date: "Novembre 2026",
      hero_kicker: "Une mémoire de travail. Pour toute l’équipe.",
      hero_l1: "Partagez le contexte.",
      hero_l2: "Gardez vos assistants.",
      hero_sub: "Le contexte circule entre vos assistants. Chacun garde le sien.",
      hero_cta1: "Voir la démonstration",
      hero_cta2: "Découvrir un fichier .md",
      hero_note: "Maquette illustrative · scénario fictif, exemples fictifs",
      demo_kicker: "La démonstration",
      demo_title: "Une mémoire.<br>Trois gestes.",
      demo_sub: "Choisir, transmettre, reprendre — sans quitter son assistant.",
      demo_controls: "Contrôles de la démonstration",
      demo_steps: "Étapes de la démonstration",
      win_project: "Refonte du site",
      win_shared: "Projet partagé",
      tab_choose: "Choisir",
      tab_share: "Transmettre",
      tab_resume: "Reprendre",
      rail_shared: "Projet partagé",
      rail_docs: "Documents",
      rail_private_tag: "Privé · non partagé",
      rail_output_tag: "Sortie",
      rail_foot: "2 fichiers .md partagés · source conservée",
      her_assistant: "Son assistant",
      msg_choose_user: "Partage brief.md et decision.md avec Karim. Pas mes notes-privees.md.",
      msg_choose_asst: "Deux éléments, rien de plus.",
      picker_title: "Éléments choisis",
      picker_excluded: "Privé · non partagé",
      picker_note: "La source reste visible.",
      flow_camille: "Camille",
      flow_karim: "Karim",
      his_assistant: "Son assistant",
      announce_speaker: "Assistant de Karim",
      announce_text: "Camille m’a partagé des documents.",
      announce_files: "brief.md et decision.md · source : Camille",
      msg_transmit_q: "Veux-tu que je les ajoute au contexte de ce projet ?",
      receive_title: "Documents reçus",
      source_from: "source : Camille",
      tag_md: "Markdown",
      add_ctx: "Ajouter au contexte",
      not_now: "Pas maintenant",
      receive_note: "Rien n’est ajouté sans ton accord.",
      resume_docs: "3 documents · contexte partagé",
      resume_out_badge: "plan-accueil.md · en sortie",
      resume_gen: "généré à partir du contexte partagé",
      plan_h1: "Plan de la page d’accueil",
      plan_q: "Structure illustrative proposée à partir du contexte partagé.",
      plan_a_title: "La promesse",
      plan_a_body: "Dire ce que le produit change pour l’équipe.",
      plan_b_title: "Le fonctionnement",
      plan_b_body: "Choisir, transmettre, reprendre.",
      plan_c_title: "La confiance",
      plan_c_body: "Ce qui est partagé, ce qui reste privé.",
      plan_sources: "Sources",
      plan_note: "Les notes personnelles sont exclues.",
      caption_0: "Camille choisit deux fichiers. Ses notes personnelles restent privées.",
      caption_1: "Seul le contexte choisi circule, avec sa source. Karim garde le choix.",
      caption_2: "Karim reprend le fil : le plan naît du contexte reçu, source conservée.",
      scene_limit: "Scénario fictif · connexions aux assistants non validées.",
      md_kicker: "Le fichier .md",
      md_title: "Rendu,<br>et source.",
      md_sub: "Le même document, lu comme une page, gardé comme un fichier Markdown.",
      md_download: "Télécharger brief.md",
      md_rendered_label: "rendu",
      md_source_label: "source",
      md_rendered_word: "rendu",
      md_source_word: "source",
      brief_h1: "Refonte du site",
      brief_q: "Exemple fictif de la maquette Coheld.",
      brief_obj_title: "Objectif",
      brief_obj_body: "Présenter la promesse et le parcours.",
      brief_src_title: "Source",
      brief_src_1: "Camille · version 4",
      brief_src_2: "Partage choisi dans le scénario de démonstration",
      brief_img_title: "Direction visuelle",
      brief_img_cap: "Image illustrative générée pour la maquette",
      brief_links_title: "Fichiers liés",
      brief_foot: "Les notes privées ne font pas partie du partage.",
      privacy_kicker: "Le partage choisi",
      privacy_title: "Ce qui circule.<br>Ce qui reste.",
      privacy_sub: "Le choix se fait dans le chat. Rien n’est transmis automatiquement.",
      privacy_shared: "Ce qui circule",
      privacy_private: "Ce qui reste",
      privacy_private_meta: "Markdown · privé · reste chez Camille",
      privacy_foot: "La source suit le document. Les notes personnelles restent exclues.",
      colophon_note: "Maquette illustrative · exemples fictifs · images générées",
      colophon_folio: "N° 01 · Novembre 2026",
      pause_label: "Pause",
      play_label: "Lecture",
      replay_label: "Rejouer"
    },
    en: {
      nav_demo: "The demonstration",
      nav_md: "The .md file",
      nav_private: "What stays private",
      meta_line: "Shared working memory",
      meta_date: "November 2026",
      hero_kicker: "One working memory. For the whole team.",
      hero_l1: "Share the context.",
      hero_l2: "Keep your assistants.",
      hero_sub: "Context moves between your assistants. Everyone keeps their own.",
      hero_cta1: "See the demonstration",
      hero_cta2: "See a .md file",
      hero_note: "Illustrative mockup · fictional scenario, fictional examples",
      demo_kicker: "The demonstration",
      demo_title: "One memory.<br>Three moves.",
      demo_sub: "Choose, share, resume — without leaving your assistant.",
      demo_controls: "Demo controls",
      demo_steps: "Demonstration steps",
      win_project: "Website redesign",
      win_shared: "Shared project",
      tab_choose: "Choose",
      tab_share: "Share",
      tab_resume: "Resume",
      rail_shared: "Shared project",
      rail_docs: "Documents",
      rail_private_tag: "Private · not shared",
      rail_output_tag: "Output",
      rail_foot: "2 shared .md files · source kept",
      her_assistant: "Her assistant",
      msg_choose_user: "Share brief.md and decision.md with Karim. Not my private-notes.md.",
      msg_choose_asst: "Two items, nothing else.",
      picker_title: "Selected items",
      picker_excluded: "Private · not shared",
      picker_note: "The source stays visible.",
      flow_camille: "Camille",
      flow_karim: "Karim",
      his_assistant: "His assistant",
      announce_speaker: "Karim’s assistant",
      announce_text: "Camille shared some documents with me.",
      announce_files: "brief.md and decision.md · source: Camille",
      msg_transmit_q: "Should I add them to this project’s context?",
      receive_title: "Received documents",
      source_from: "source: Camille",
      tag_md: "Markdown",
      add_ctx: "Add to context",
      not_now: "Not now",
      receive_note: "Nothing is added without your approval.",
      resume_docs: "3 documents · shared context",
      resume_out_badge: "plan-accueil.md · output",
      resume_gen: "generated from the shared context",
      plan_h1: "Homepage outline",
      plan_q: "Illustrative structure built from the shared context.",
      plan_a_title: "The promise",
      plan_a_body: "Say what the product changes for the team.",
      plan_b_title: "How it works",
      plan_b_body: "Choose, share, resume.",
      plan_c_title: "Trust",
      plan_c_body: "What is shared, what stays private.",
      plan_sources: "Sources",
      plan_note: "Personal notes are excluded.",
      caption_0: "Camille picks two files. Her personal notes stay private.",
      caption_1: "Only the chosen context moves, with its source. Karim keeps the choice.",
      caption_2: "Karim picks the thread back up: the outline grows from the received context, source kept.",
      scene_limit: "Fictional scenario · assistant connections not validated.",
      md_kicker: "The .md file",
      md_title: "Rendered,<br>and raw.",
      md_sub: "The same document, read as a page, kept as a Markdown file.",
      md_download: "Download brief.md",
      md_rendered_label: "rendered",
      md_source_label: "raw",
      md_rendered_word: "rendered",
      md_source_word: "raw",
      brief_h1: "Website redesign",
      brief_q: "Fictional example from the Coheld mockup.",
      brief_obj_title: "Goal",
      brief_obj_body: "Present the promise and the journey.",
      brief_src_title: "Source",
      brief_src_1: "Camille · version 4",
      brief_src_2: "Chosen share in the demo scenario",
      brief_img_title: "Visual direction",
      brief_img_cap: "Illustrative image generated for the mockup",
      brief_links_title: "Linked files",
      brief_foot: "Private notes are not part of the share.",
      privacy_kicker: "Chosen sharing",
      privacy_title: "What moves.<br>What stays.",
      privacy_sub: "The choice happens in the chat. Nothing is sent automatically.",
      privacy_shared: "What moves",
      privacy_private: "What stays",
      privacy_private_meta: "Markdown · private · stays with Camille",
      privacy_foot: "The source follows the document. Personal notes stay excluded.",
      colophon_note: "Illustrative mockup · fictional examples · generated images",
      colophon_folio: "No. 01 · November 2026",
      pause_label: "Pause",
      play_label: "Play",
      replay_label: "Replay"
    }
  };

  /* ── Source .md brute (bilingue) ─────────────────────────────── */
  const SOURCE = {
    fr: [
      { t: "#", text: " Refonte du site" },
      { text: "\u00a0" },
      { t: ">", text: " Exemple fictif de la maquette Coheld." },
      { text: "\u00a0" },
      { t: "##", text: " Objectif" },
      { text: "Présenter la promesse et le parcours." },
      { text: "\u00a0" },
      { t: "##", text: " Source" },
      { t: "-", text: " Camille · version 4" },
      { text: "\u00a0" },
      { t: "##", text: " Direction visuelle" },
      { t: "!", text: "[Direction visuelle](../img/worktable.webp)" },
      { text: "\u00a0" },
      { t: "##", text: " Fichiers liés" },
      { t: "-", text: " [decision.md](decision.md)" },
      { t: "-", text: " [plan-accueil.md](plan-accueil.md)" }
    ],
    en: [
      { t: "#", text: " Website redesign" },
      { text: "\u00a0" },
      { t: ">", text: " Fictional example from the Coheld mockup." },
      { text: "\u00a0" },
      { t: "##", text: " Goal" },
      { text: "Present the promise and the journey." },
      { text: "\u00a0" },
      { t: "##", text: " Source" },
      { t: "-", text: " Camille · version 4" },
      { text: "\u00a0" },
      { t: "##", text: " Visual direction" },
      { t: "!", text: "[Visual direction](../img/worktable.webp)" },
      { text: "\u00a0" },
      { t: "##", text: " Linked files" },
      { t: "-", text: " [decision.md](decision.md)" },
      { t: "-", text: " [plan-accueil.md](plan-accueil.md)" }
    ]
  };

  const lang = new URLSearchParams(location.search).get("lang") === "en" ? "en" : "fr";
  document.documentElement.lang = lang;

  function renderSource() {
    const code = document.getElementById("md-source");
    if (!code) return;
    const lines = SOURCE[lang];
    code.innerHTML = lines
      .map((l, i) => {
        const tok = l.t ? `<span class="t">${l.t}</span>` : "";
        return `<span class="ln">${i + 1}</span><span class="tk">${tok}${l.text}</span>`;
      })
      .join("");
  }

  function applyLang() {
    const dict = I18N[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });
    document.querySelectorAll("[data-lang]").forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("data-lang") === lang);
    });
    renderSource();
  }

  /* ── Démonstration ───────────────────────────────────────────── */
  const scene = document.querySelector(".scene");
  if (scene) {
    const tabs = [...document.querySelectorAll(".tab")];
    const panels = [...document.querySelectorAll(".scene-panel")];
    const pill = document.querySelector(".tab-pill");
    const progress = document.querySelector(".tab-progress");
    const pauseBtn = document.querySelector("[data-pause]");
    const replayBtn = document.querySelector("[data-replay]");
    const caption = document.querySelector(".scene-caption");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const DURATIONS = [4400, 6200, 999999];
    const captions = ["caption_0", "caption_1", "caption_2"];

    let step = 0;
    let playing = false;
    let ended = false;
    let rafId = 0;
    let start = 0;
    let elapsed = 0;
    let activeDur = DURATIONS[0];

    function setProgress(p) {
      progress.style.transform = `translateX(${step * 100}%) scaleX(${p})`;
    }

    function setStep(n) {
      step = n;
      scene.dataset.step = String(n);
      tabs.forEach((t, i) => {
        const on = i === n;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
      });
      pill.style.transform = `translateX(${n * 100}%)`;
      progress.style.transform = `translateX(${n * 100}%) scaleX(0)`;
      panels.forEach((p) => {
        const on = Number(p.dataset.panel) === n;
        if (on) {
          p.removeAttribute("hidden");
          p.classList.add("is-active");
        } else {
          p.setAttribute("hidden", "");
          p.classList.remove("is-active");
        }
      });
      caption.textContent = I18N[lang][captions[n]] || "";
    }

    function syncControls() {
      const dict = I18N[lang];
      const isPlaying = playing && !ended;
      pauseBtn.setAttribute("aria-pressed", String(isPlaying));
      pauseBtn.setAttribute("aria-label", isPlaying ? dict.pause_label : dict.play_label);
      replayBtn.setAttribute("aria-label", dict.replay_label);
    }

    function loop(now) {
      if (!playing) return;
      const p = Math.min(1, (elapsed + (now - start)) / activeDur);
      setProgress(p);
      if (p >= 1) {
        if (step < 2) {
          step += 1;
          setStep(step);
          elapsed = 0;
          start = now;
          activeDur = DURATIONS[step];
          setProgress(0);
          rafId = requestAnimationFrame(loop);
          return;
        }
        playing = false;
        ended = true;
        syncControls();
        return;
      }
      rafId = requestAnimationFrame(loop);
    }

    function begin() {
      start = performance.now();
      rafId = requestAnimationFrame(loop);
    }

    function pause() {
      if (!playing) return;
      elapsed += performance.now() - start;
      playing = false;
      syncControls();
    }

    function resume() {
      if (ended) { replay(); return; }
      if (playing) return;
      start = performance.now();
      playing = true;
      ended = false;
      syncControls();
      rafId = requestAnimationFrame(loop);
    }

    function replay() {
      playing = false;
      ended = false;
      elapsed = 0;
      step = 0;
      activeDur = DURATIONS[0];
      setStep(0);
      setProgress(0);
      if (reduced.matches) {
        syncControls();
        return;
      }
      playing = true;
      syncControls();
      begin();
    }

    function goTo(n) {
      playing = false;
      ended = n === 2;
      elapsed = 0;
      step = n;
      activeDur = DURATIONS[n];
      setStep(n);
      setProgress(0);
      syncControls();
    }

    tabs.forEach((t, i) => {
      t.addEventListener("click", () => goTo(i));
    });
    pauseBtn.addEventListener("click", () => {
      if (reduced.matches) { goTo((step + 1) % 3); return; }
      if (playing) pause();
      else resume();
    });
    replayBtn.addEventListener("click", replay);

    /* État initial */
    if (reduced.matches) {
      setStep(2);
      setProgress(0);
      syncControls();
    } else {
      setStep(0);
      setProgress(0);
      syncControls();
      /* Démarre à l'entrée dans le viewport */
      let started = false;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && !started) {
            started = true;
            replay();
          }
        }, { threshold: 0.3 }).observe(scene);
      } else {
        started = true;
        replay();
      }
    }

    reduced.addEventListener("change", () => {
      if (reduced.matches) {
        playing = false;
        goTo(2);
      } else {
        goTo(0);
        replay();
      }
    });
  }

  applyLang();
})();
