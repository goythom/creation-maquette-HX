import { renderSidebar } from "./shop-pages-deepseek.mjs";
import { pixel } from "./pixel-dom.mjs";

function el(tag, props = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "className") n.className = v;
    else if (k === "textContent") n.textContent = v;
    else if (k === "style" && typeof v === "object") Object.assign(n.style, v);
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "dataset") Object.assign(n.dataset, v);
    else if (k === "aria" && typeof v === "object") for (const [ak, av] of Object.entries(v)) n.setAttribute(`aria-${ak}`, av);
    else if (k === "attrs" && typeof v === "object") for (const [ak, av] of Object.entries(v)) n.setAttribute(ak, av);
    else n.setAttribute(k, v === true ? "" : String(v));
  }
  const kids = Array.isArray(children) ? children : [children];
  for (const c of kids) {
    if (c == null || c === false) continue;
    n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return n;
}

function skipToContent() {
  return el("a", {
    className: "skip-to-content",
    href: "#page-content",
    onClick: (e) => { e.preventDefault(); document.getElementById("page-content")?.focus(); },
  }, "Skip to content");
}

function signInButton(lang, onNavigate) {
  return el("button", {
    type: "button",
    className: "btn btn--dark btn--small",
    onClick: (e) => { e.preventDefault(); },
  }, lang === "fr" ? "Continuer avec Google" : "Continue with Google");
}

function renderElementsPage({ lang, onNavigate }) {
  const fr = lang === "fr";
  const main = el("main", { id: "page-content", tabIndex: -1, className: "main saved-page" });
  const section = el("section", { className: "card card--gallery", attrs: { "aria-label": "Saved elements" } });
  section.appendChild(el("div", { className: "gallery__head" }, [el("h1", {}, "Saved elements")]));
  const signin = el("div", { className: "gallery__signin" }, [
    el("p", {}, "Sign in to find the elements and notebooks saved in your account."),
    signInButton(lang, onNavigate),
  ]);
  section.appendChild(signin);
  main.appendChild(section);
  return el("div", { className: "app app--workbench app--navigation" }, [
    skipToContent(),
    renderSidebar({ active: "saved-elements", tagline: "Frame print generator", lang, onNavigate }),
    main,
  ]);
}

function renderNotebooksPage({ lang, onNavigate }) {
  const fr = lang === "fr";
  const main = el("main", { id: "page-content", tabIndex: -1, className: "main saved-page notebooks-page" });
  const section = el("section", { className: "card card--gallery", attrs: { "aria-label": "Notebooks" } });

  const trashBtn = el("button", {
    type: "button",
    className: "btn btn--white btn--small",
    attrs: { "aria-pressed": "false" },
  }, fr ? "Corbeille" : "Trash");
  const notebooksBtn = el("button", {
    type: "button",
    className: "btn btn--dark btn--small",
    attrs: { "aria-pressed": "true" },
  }, fr ? "Carnets" : "Notebooks");

  const trashTabs = el("div", { className: "saved-actions notebooks-trash-tabs", attrs: { "data-no-i18n": "true" } }, [notebooksBtn, trashBtn]);

  const head = el("div", { className: "gallery__head" }, [el("h1", {}, "Notebooks"), trashTabs]);
  section.appendChild(head);

  const trashNote = el("p", { attrs: { "data-no-i18n": "true" } },
    fr
      ? "Les carnets restent restaurables 30 jours après leur suppression. Supprimer définitivement retire cette sauvegarde, pas les photos du compte, les copies partagées ni les sauvegardes de sécurité existantes."
      : "Notebooks can be restored for 30 days after deletion. Permanent deletion removes this saved notebook, not account photos, shared copies or existing backups.");
  trashNote.style.display = "none";
  section.appendChild(trashNote);

  const signin = el("div", { className: "gallery__signin" }, [
    el("p", {}, "Sign in to find the elements and notebooks saved in your account."),
    signInButton(lang, onNavigate),
  ]);
  section.appendChild(signin);

  let trash = false;
  function setTrash(next) {
    trash = next;
    notebooksBtn.className = `btn ${!trash ? "btn--dark" : "btn--white"} btn--small`;
    notebooksBtn.setAttribute("aria-pressed", String(!trash));
    trashBtn.className = `btn ${trash ? "btn--dark" : "btn--white"} btn--small`;
    trashBtn.setAttribute("aria-pressed", String(trash));
    trashNote.style.display = trash ? "" : "none";
  }
  notebooksBtn.addEventListener("click", () => setTrash(false));
  trashBtn.addEventListener("click", () => setTrash(true));

  main.appendChild(section);
  return el("div", { className: "app app--workbench app--navigation" }, [
    skipToContent(),
    renderSidebar({ active: "saved-notebooks", tagline: "Frame print generator", lang, onNavigate }),
    main,
  ]);
}

function renderAccountPage({ lang, onNavigate }) {
  const fr = lang === "fr";
  const main = el("main", { className: "main hx-account account-hub" });
  main.appendChild(el("h1", {}, "My account"));
  const panel = el("section", { className: "hx-panel" }, [
    el("p", {}, "Sign in to manage your account."),
    el("button", {
      type: "button",
      className: "hx-primary",
      onClick: (e) => { e.preventDefault(); },
    }, "Continue with Google"),
  ]);
  main.appendChild(panel);
  return el("div", { className: "app app--workbench app--navigation" }, [
    renderSidebar({ active: "account", tagline: "Frame print generator", lang, onNavigate }),
    main,
  ]);
}

function renderSettingsPage({ lang, onNavigate }) {
  const fr = lang === "fr";
  const main = el("main", { className: "main hx-account", attrs: { "data-no-i18n": "true" } });
  main.appendChild(el("h1", {}, fr ? "Paramètres" : "Settings"));
  const back = el("a", {
    href: "/compte",
    onClick: (e) => { e.preventDefault(); onNavigate("/compte"); },
  }, fr ? "← Mon compte" : "← My account");
  main.appendChild(back);
  const panel = el("section", { className: "hx-panel" }, [
    el("p", {}, fr ? "Connecte-toi pour gérer ton compte." : "Sign in to manage your account."),
    el("button", {
      type: "button",
      className: "hx-primary",
      onClick: (e) => { e.preventDefault(); },
    }, fr ? "Continuer avec Google" : "Continue with Google"),
  ]);
  main.appendChild(panel);
  return el("div", { className: "app app--workbench app--navigation" }, [
    renderSidebar({ active: "settings", tagline: "Frame print generator", lang, onNavigate }),
    main,
  ]);
}

const OWNER_TEXT = {
  en: {
    title: "Owner console",
    signin: "Sign in with the owner Google account.",
    denied: "This account is not the owner.",
  },
  fr: {
    title: "Console propriétaire",
    signin: "Connecte-toi avec le compte Google du propriétaire.",
    denied: "Ce compte n'est pas le propriétaire.",
  },
};

function renderOwnerPage({ lang, onNavigate }) {
  const t = OWNER_TEXT[lang] || OWNER_TEXT.en;
  const shell = el("div", { className: "owner-shell", attrs: { "data-no-i18n": "true" } });
  const main = el("main", { className: "owner-login" });
  const panel = el("section", { className: "hx-panel" });
  panel.appendChild(el("h1", {}, t.title));
  panel.appendChild(el("p", {}, t.signin));
  panel.appendChild(el("button", {
    type: "button",
    className: "hx-primary",
    onClick: (e) => { e.preventDefault(); },
  }, lang === "fr" ? "Continuer avec Google" : "Continue with Google"));
  const link = el("a", {
    href: "/generator",
    onClick: (e) => { e.preventDefault(); onNavigate("/generator"); },
  }, "InstaFrame");
  panel.appendChild(el("p", {}, [link]));
  main.appendChild(panel);
  shell.appendChild(main);
  return shell;
}

const ADMIN_TEXT = {
  fr: {
    admin: "Administration",
    signinTitle: "Administration",
    password: "Mot de passe",
    code: "Code de vérification",
    signin: "Se connecter",
  },
  en: {
    admin: "Admin",
    signinTitle: "Admin",
    password: "Password",
    code: "Verification code",
    signin: "Sign in",
  },
};

function renderAdminPage({ lang, onNavigate }) {
  const t = ADMIN_TEXT[lang] || ADMIN_TEXT.en;
  const page = el("div", { className: "admin-page", attrs: { "data-no-i18n": "true" } });
  const form = el("form", { className: "admin-login" });
  form.addEventListener("submit", (e) => { e.preventDefault(); });

  const h1 = el("h1", {}, ["InstaFrame ", el("span", { style: { color: "var(--grey)", fontWeight: "400" } }, t.signinTitle)]);
  form.appendChild(h1);

  const pwLabel = el("label", { htmlFor: "adm-pw" }, t.password);
  const pwInput = el("input", { id: "adm-pw", type: "password", autoComplete: "current-password" });
  form.appendChild(pwLabel);
  form.appendChild(pwInput);

  const codeLabel = el("label", { htmlFor: "adm-code" }, t.code);
  const codeInput = el("input", { id: "adm-code", inputMode: "numeric", autoComplete: "one-time-code" });
  form.appendChild(codeLabel);
  form.appendChild(codeInput);

  form.appendChild(el("button", { className: "admin-btn primary", type: "submit" }, t.signin));

  const langBtn = el("button", {
    type: "button",
    className: "admin-btn",
    style: { height: "36px", fontSize: "14px" },
    onClick: (e) => { e.preventDefault(); },
  }, lang === "fr" ? "EN" : "FR");
  const langP = el("p", { style: { marginTop: "24px" } }, [langBtn]);
  form.appendChild(langP);

  page.appendChild(form);
  return page;
}

export function renderAccountVisitor({ page = "elements", lang = "en", onNavigate = () => {} } = {}) {

  switch (page) {
    case "elements": return renderElementsPage({ lang, onNavigate });
    case "notebooks": return renderNotebooksPage({ lang, onNavigate });
    case "account": return renderAccountPage({ lang, onNavigate });
    case "settings": return renderSettingsPage({ lang, onNavigate });
    case "owner": return renderOwnerPage({ lang, onNavigate });
    case "admin": return renderAdminPage({ lang, onNavigate });
    default: return renderElementsPage({ lang, onNavigate });
  }
}