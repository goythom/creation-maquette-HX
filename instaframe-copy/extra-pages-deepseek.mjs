import {buildShell} from "./public-pages-deepseek.mjs"
import {pixel} from "./pixel-dom.mjs"

const PRICES = {free: 0, premium: 7.99}

function fmtPrice(n, fr) {
  return `${n.toFixed(2).replace(".00", "").replace(".", fr ? "," : ".")} €`
}

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue
    if (k === "className") node.className = v
    else if (k === "textContent") node.textContent = v
    else if (k === "dataset") {for(const[a,b] of Object.entries(v))node.setAttribute("data-"+a.replace(/[A-Z]/g,x=>"-"+x.toLowerCase()),b)}
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === "disabled") { if (v) node.disabled = true }
    else if (k === "ariaDisabled") node.setAttribute("aria-disabled", String(v))
    else if (k === "ariaLabel") node.setAttribute("aria-label", v)
    else if (k === "ariaHidden") node.setAttribute("aria-hidden", String(v))
    else if (k === "role") node.setAttribute("role", v)
    else if (k === "type") node.setAttribute("type", v)
    else if (k === "value") node.value = v
    else if (k === "maxLength") node.setAttribute("maxlength", String(v))
    else if (k === "required") { if (v) node.required = true }
    else if (k === "htmlFor") node.setAttribute("for", v)
    else if (k === "viewBox") node.setAttribute("viewBox", v)
    else if (k === "fill") node.setAttribute("fill", v)
    else if (k === "stroke") node.setAttribute("stroke", v)
    else if (k === "strokeWidth") node.setAttribute("stroke-width", String(v))
    else if (k === "cx" || k === "cy" || k === "r" || k === "d") node.setAttribute(k, String(v))
    else node.setAttribute(k, String(v))
  }
  const kids = Array.isArray(children) ? children : [children]
  for (const c of kids) {
    if (c == null || c === false) continue
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c)
  }
  return node
}

function svgIcon(name, size = 24) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("aria-hidden", "true")
  svg.setAttribute("width", String(size))
  svg.setAttribute("height", String(size))
  svg.setAttribute("viewBox", "0 0 24 24")
  svg.setAttribute("fill", "none")
  svg.setAttribute("stroke", "currentColor")
  svg.setAttribute("stroke-width", "1.5")
  if (name === "account") {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    c.setAttribute("cx", "12"); c.setAttribute("cy", "7"); c.setAttribute("r", "4")
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path")
    p.setAttribute("d", "M4 22v-3a8 8 0 0 1 16 0v3Z")
    svg.appendChild(c); svg.appendChild(p)
  }
  return svg
}

function makeLink(text, onClick) {
  const a = el("a", {href: "#"})
  a.textContent = text
  a.addEventListener("click", (e) => { e.preventDefault(); onClick() })
  return a
}

function renderHelp({lang, onNavigate}) {
  const fr = lang === "fr"
  const topics = fr ? ["Créer", "Carnet", "Compte", "Commande"] : ["Create", "Notebook", "Account", "Order"]
  const topicRoutes = ["/faq", "/saved/notebooks", "/compte/parametres", "/shop/track"]
  const topicIcons = ["photo", "livre", "livre", "sac"]

  const main = el("main", {className: "hx-help", dataset: {"no-i18n": ""}})
  main.appendChild(el("h1", {textContent: fr ? "Aide et contact" : "Help and contact"}))

  const searchLabel = el("label")
  searchLabel.appendChild(document.createTextNode(fr ? "Rechercher dans l'aide" : "Search help"))
  const searchInput = el("input", {type: "search"})
  searchLabel.appendChild(searchInput)
  main.appendChild(searchLabel)

  const topicsDiv = el("div", {className: "hx-help__topics"})
  main.appendChild(topicsDiv)

  const faqLinkP = el("p")
  const faqLink = makeLink(fr ? "Consulter toutes les réponses de la FAQ" : "Browse all FAQ answers", () => onNavigate("/faq"))
  faqLinkP.appendChild(faqLink)
  faqLinkP.style.display = "none"
  main.appendChild(faqLinkP)

  function renderTopics() {
    topicsDiv.textContent = ""
    const q = searchInput.value.toLowerCase()
    topics.forEach((t, i) => {
      if (!t.toLowerCase().includes(q)) return
      const a = el("a", {className: "hx-panel", href: "#"})
      a.addEventListener("click", (e) => { e.preventDefault(); onNavigate(topicRoutes[i]) })
      if (i === 2) a.appendChild(svgIcon("account", 24))
      else a.appendChild(pixel(topicIcons[i], 24))
      a.appendChild(el("br"))
      a.appendChild(document.createTextNode(t))
      topicsDiv.appendChild(a)
    })
    faqLinkP.style.display = searchInput.value ? "" : "none"
  }
  searchInput.addEventListener("input", renderTopics)
  renderTopics()

  const form = el("form", {className: "hx-panel hx-contact"})
  form.addEventListener("submit", (e) => { e.preventDefault(); preparedP.style.display = "" })
  form.appendChild(el("h2", {textContent: fr ? "Nous écrire" : "Write to us"}))
  form.appendChild(el("p", {role: "status", textContent: fr ? "Envoi non connecté. Aucun message ne sera transmis." : "Sending is not connected. No message will be sent."}))

  const emailLabel = el("label")
  emailLabel.appendChild(document.createTextNode("E-mail"))
  const emailInput = el("input", {type: "email", required: true, maxLength: 254})
  emailLabel.appendChild(emailInput)
  form.appendChild(emailLabel)

  const msgLabel = el("label")
  msgLabel.appendChild(document.createTextNode("Message"))
  const msgInput = el("textarea", {required: true, maxLength: 3000})
  msgLabel.appendChild(msgInput)
  form.appendChild(msgLabel)

  form.appendChild(el("button", {className: "hx-primary", textContent: fr ? "Préparer le message" : "Prepare message"}))
  form.appendChild(el("small", {textContent: fr ? "Formulaire en préparation. Aucun message n'est envoyé depuis cette page." : "Contact form in preparation. This page does not send any message."}))

  const preparedP = el("p", {role: "status", textContent: fr ? "Message conservé dans cette page uniquement. Envoi indisponible pour le moment." : "Message kept on this page only. Sending is not available yet."})
  preparedP.style.display = "none"
  form.appendChild(preparedP)

  main.appendChild(form)

  return buildShell({lang, onNavigate, children: main})
}

function renderPricing({lang, admin, sim, onNavigate}) {
  const fr = lang === "fr"
  const root = el("div", {className: "pricingpage"})

  const head = el("header", {className: "pricingpage__head"})
  const home = el("a", {className: "pricingpage__home", href: "#", textContent: "InstaFrame"})
  home.addEventListener("click", (e) => { e.preventDefault(); onNavigate("/") })
  head.appendChild(home)
  head.appendChild(el("h1", {textContent: "InstaFrame"}))

  if (!admin) {
    head.appendChild(el("p", {className: "pricingpage__sub", textContent: "This page is not available."}))
    root.appendChild(head)
    return root
  }

  head.appendChild(el("p", {className: "pricingpage__sub", textContent: "Free or Premium. One payment, lifetime access."}))
  root.appendChild(head)

  const grid = el("div", {className: "pricingpage__grid"})
  const plans = [
    {id: "free", name: "Free", popular: false},
    {id: "premium", name: "Premium", popular: false},
  ]
  for (const pcard of plans) {
    const section = el("section", {className: "pcard" + (pcard.popular ? " pcard--popular" : ""), ariaLabel: pcard.name})
    if (pcard.popular) section.appendChild(el("span", {className: "pcard__tag", textContent: "Populaire"}))
    section.appendChild(el("h2", {className: "pcard__name", textContent: pcard.name}))
    const priceP = el("p", {className: "pcard__price"})
    priceP.appendChild(el("span", {className: "pcard__amount", dataset: {"no-i18n": "true"}, textContent: fmtPrice(PRICES[pcard.id], fr)}))
    priceP.appendChild(el("span", {className: "pcard__period"}))
    section.appendChild(priceP)
    const ul = el("ul", {className: "pcard__list"})
    ul.appendChild(el("li", {textContent: pcard.id === "premium" ? "One-time payment, lifetime access" : "To get started, no account needed."}))
    const items = pcard.id === "free"
      ? ["Forever", "The free generator elements", "No account needed to start"]
      : ["Premium generator elements marked PRO (including Letter, Messages, Date, Combination)", "The notebook editor (Album Studio)", "Lifetime access, no subscription"]
    for (const t of items) ul.appendChild(el("li", {textContent: t}))
    section.appendChild(ul)
    section.appendChild(el("button", {type: "button", className: "pcard__btn", disabled: true, ariaDisabled: true, textContent: "Coming soon"}))
    grid.appendChild(section)
  }
  root.appendChild(grid)

  root.appendChild(el("p", {className: "pricingpage__note", textContent: "No real payment yet. The free plan and the generators stay free."}))

  if (sim) {
    const simP = el("p", {className: "pricingpage__sim", role: "status"})
    simP.appendChild(document.createTextNode(sim === "premium" ? "Test plan active: Premium." : "Test plan active: Basic."))
    simP.appendChild(document.createTextNode(" "))
    const resetBtn = el("button", {type: "button", className: "pricingpage__sim-reset", textContent: "Reset"})
    resetBtn.addEventListener("click", () => {
      simP.remove()
    })
    simP.appendChild(resetBtn)
    root.appendChild(simP)
  }

  return root
}

export function renderExtraPage({page = "help", lang = "en", admin = false, sim = null, onNavigate = () => {}} = {}) {
  if (page === "help") return renderHelp({lang, onNavigate})
  if (page === "pricing") return renderPricing({lang, admin, sim, onNavigate})
  return document.createDocumentFragment()
}