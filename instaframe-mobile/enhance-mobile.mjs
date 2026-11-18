// enhance-mobile.mjs — adds the mobile Menu and the sticky Start free bar.
// Only reuses existing nav links and existing CTA labels. No new destinations.

const MENU_LABEL = 'Menu';

function findHeader(root) {
  return root.querySelector('header.hv-nav')
    || root.querySelector('header.hx-public__nav')
    || root.querySelector('header.creator-header')
    || root.querySelector('.album-mobile__header')
    || null;
}

function findMain(root) {
  return root.querySelector('.local-scene')
    || root.querySelector('main')
    || root;
}

function isNavigableHref(href) {
  if (!href) return false;
  const trimmed = href.trim();
  if (!trimmed) return false;
  if (trimmed === '#') return false;
  if (/^javascript:/i.test(trimmed)) return false;
  return true;
}

function collectNavLinks(root) {
  const links = [];
  const seen = new Set();
  const push = (a) => {
    if (!a) return;
    const href = a.getAttribute('href');
    const label = (a.textContent || '').trim();
    if (!href || !label) return;
    if (!isNavigableHref(href)) return;
    const key = href + '|' + label;
    if (seen.has(key)) return;
    seen.add(key);
    links.push({ href, label });
  };
  root.querySelectorAll('header.hv-nav nav a, header.hv-nav .hv-nav__links a').forEach(push);
  root.querySelectorAll('header.hv-nav > a.hv-btn-fill, header.hv-nav > a.hv-btn').forEach(push);
  root.querySelectorAll('header.hx-public__nav nav a').forEach(push);
  root.querySelectorAll('.side__nav a, .side a').forEach(push);
  root.querySelectorAll('.faq__home a').forEach(push);
  root.querySelectorAll('.hv-footer a, .hx-public__footer a, footer a').forEach(push);
  return links;
}

function attachNavigate(a, href, onNavigate) {
  a.addEventListener('click', (event) => {
    if (typeof onNavigate === 'function') {
      event.preventDefault();
      onNavigate(href);
    }
  });
}

function buildMenu(links, onNavigate) {
  const details = document.createElement('details');
  details.className = 'mobile-nav';
  const summary = document.createElement('summary');
  summary.textContent = MENU_LABEL;
  details.appendChild(summary);

  const panel = document.createElement('div');
  panel.className = 'mobile-nav__panel';
  for (const { href, label } of links) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    attachNavigate(a, href, onNavigate);
    panel.appendChild(a);
  }
  details.appendChild(panel);
  return details;
}

function injectTopbar(root, links, onNavigate) {
  if (root.querySelector('.mobile-topbar')) return;
  const main = findMain(root);
  if (!main) return;

  const bar = document.createElement('div');
  bar.className = 'mobile-topbar';

  const brand = document.createElement('span');
  brand.className = 'mobile-topbar__brand';
  brand.textContent = 'InstaFrame';
  bar.appendChild(brand);

  bar.appendChild(buildMenu(links, onNavigate));

  if (main.firstChild) {
    main.insertBefore(bar, main.firstChild);
  } else {
    main.appendChild(bar);
  }
}

function injectMenu(root, onNavigate) {
  if (root.querySelector('details.mobile-nav')) return;
  if (root.querySelector('details.creator-header__menu')) return;
  const links = collectNavLinks(root);
  if (!links.length) return;

  const header = findHeader(root);
  if (header) {
    header.appendChild(buildMenu(links, onNavigate));
    return;
  }

  injectTopbar(root, links, onNavigate);
}

function injectStickyStartFree(root, onNavigate) {
  if (root.querySelector('.home-sticky-cta')) return;
  const heroActions = root.querySelector('.hv-hero-actions');
  if (!heroActions) return;
  const startFree = heroActions.querySelector('a.hv-btn-fill, a.hv-btn');
  if (!startFree) return;

  const bar = document.createElement('div');
  bar.className = 'home-sticky-cta';
  bar.hidden = true;
  const clone = startFree.cloneNode(true);
  clone.removeAttribute('id');
  const cloneHref = startFree.getAttribute('href') || clone.getAttribute('href');
  if (cloneHref) clone.setAttribute('href', cloneHref);
  if (cloneHref) attachNavigate(clone, cloneHref, onNavigate);
  bar.appendChild(clone);
  root.appendChild(bar);

  if (typeof IntersectionObserver === 'function') {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        bar.hidden = entry.isIntersecting;
      }
    }, { root: null, threshold: 0 });
    io.observe(heroActions);
  } else {
    bar.hidden = false;
  }
}

export function enhanceMobileScene(root, { route, lang, onNavigate } = {}) {
  if (!root) return;
  injectMenu(root, onNavigate);
  if (route === '/') injectStickyStartFree(root, onNavigate);
}
