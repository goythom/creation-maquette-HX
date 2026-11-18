export function renderFaq({ lang = "en", openIndex = -1 } = {}) {
  const SUPPORT_EMAIL = "contact@instaframe.fr";

  const rows = [
    { id: "create", en: ["What can I create with InstaFrame?", "Use the generator to create photo frames and other elements, then arrange them in a notebook in Album Studio. You can add text, stickers and drawings, personalise the cover, and browse your notebook in the preview."], fr: ["Que peut-on créer avec InstaFrame ?", "Le générateur permet de créer des cadres photo et d'autres éléments, puis de les disposer dans un carnet dans Studio Album. Ajoutez du texte, des stickers et des dessins, personnalisez la couverture et feuilletez votre carnet dans l'aperçu."] },
    { id: "elements", en: ["Is the generator only for photo frames?", "No. Alongside Instax and Polaroid frames, it includes post-its, stickers, stamps, audio, music and video elements, letters, messages, dates and combinations. The available settings depend on the element. Some elements are marked PRO."], fr: ["Le générateur sert-il uniquement aux cadres photo ?", "Non. En plus des cadres Instax et Polaroid, il propose des post-it, stickers, timbres, éléments audio, musique et vidéo, lettres, messages, dates et combinaisons. Les réglages disponibles dépendent de l'élément. Certains éléments portent la mention PRO."] },
    { id: "account", en: ["Do I need an account?", "You can start with the free generator without signing in. Sign in to save elements and notebooks to your account and find them again later. A local draft is not a substitute for an account save."], fr: ["Faut-il un compte ?", "Vous pouvez commencer avec le générateur gratuit sans vous connecter. Connectez-vous pour sauvegarder vos éléments et carnets dans votre compte et les retrouver plus tard. Un brouillon local ne remplace pas une sauvegarde dans le compte."] },
    { id: "devices", en: ["Which devices can I use?", "Create and edit on a computer or iPad. The drawing tools accept a mouse, touch and Apple Pencil; pressure depends on the input device. Phone access is limited to shared notebooks and the dedicated photo-transfer and download links, not the full editor."], fr: ["Quels appareils peut-on utiliser ?", "Créez et modifiez sur ordinateur ou iPad. Les outils de dessin acceptent la souris, le tactile et l'Apple Pencil ; la pression dépend du périphérique utilisé. Sur téléphone, l'accès est réservé aux carnets partagés et aux liens dédiés de transfert de photos et de téléchargement, pas à l'éditeur complet."] },
    { id: "photos", en: ["How do I add and adjust a photo?", "Choose a frame in the generator, then import a photo from your device. Use the crop, zoom and position controls to adjust it, and add a caption if you want. You can mix frame formats in the same notebook."], fr: ["Comment ajouter et ajuster une photo ?", "Choisissez un cadre dans le générateur, puis importez une photo depuis votre appareil. Ajustez le cadrage, le zoom et la position, puis ajoutez une légende si vous le souhaitez. Vous pouvez mélanger plusieurs formats de cadres dans le même carnet."] },
    { id: "notebook", en: ["How do I fill and personalise a notebook?", "In Album Studio, place your elements on the pages, resize or rotate them, add text and stickers, and draw with the pen, marker or highlighter. The notebook settings let you choose the cover and paper appearance."], fr: ["Comment remplir et personnaliser un carnet ?", "Dans Studio Album, disposez vos éléments sur les pages, redimensionnez-les ou faites-les pivoter, ajoutez du texte et des stickers, puis dessinez au stylo, au feutre ou au surligneur. Les réglages du carnet permettent de choisir l'apparence de la couverture et du papier."] },
    { id: "preview", en: ["Can I flip through the notebook before sharing it?", "Yes. Open the notebook preview to browse the pages and check the cover. The small notebook on the homepage is a separate example you can flip through; it does not change your own notebook."], fr: ["Peut-on feuilleter le carnet avant de le partager ?", "Oui. Ouvrez l'aperçu du carnet pour parcourir les pages et vérifier la couverture. Le petit carnet de l'accueil est un exemple séparé que vous pouvez feuilleter ; il ne modifie pas votre propre carnet."] },
    { id: "save", en: ["Where do I find my saved notebooks?", "Sign in and open Saved notebooks from your account or Album Studio. Open a saved notebook to continue editing. While signed in, edits are saved automatically; check any save error before leaving. Name your notebook: unnamed automatic saves are removed after 30 days."], fr: ["Où retrouver mes carnets sauvegardés ?", "Connectez-vous et ouvrez Carnets sauvegardés depuis votre compte ou Studio Album. Ouvrez un carnet sauvegardé pour reprendre sa création. Une fois connecté, les modifications sont enregistrées automatiquement ; vérifiez toute erreur de sauvegarde avant de quitter. Donnez un nom à votre carnet : les sauvegardes automatiques non nommées sont supprimées après 30 jours."] },
    { id: "trash", en: ["Can I restore a deleted notebook?", "A saved notebook moved to Trash can be restored within 30 days. Delete forever removes that saved notebook and cannot be undone. It does not delete account photos, already shared copies or existing backups."], fr: ["Peut-on restaurer un carnet supprimé ?", "Un carnet sauvegardé placé dans la Corbeille peut être restauré pendant 30 jours. Supprimer définitivement retire cette sauvegarde sans possibilité de retour. Cela ne supprime pas les photos du compte, les copies déjà partagées ni les sauvegardes de sécurité existantes."] },
    { id: "share", en: ["How do I share a notebook?", "Use Share in the notebook preview, then Create link. Anyone with the link can view the shared copy for 30 days, including on a phone. The link is for reading, not collaborative editing. Share it only with people you want to give access to."], fr: ["Comment partager un carnet ?", "Dans l'aperçu du carnet, choisissez Partager puis Créer le lien. Toute personne disposant du lien peut consulter la copie partagée pendant 30 jours, y compris sur téléphone. Ce lien permet la lecture, pas la modification à plusieurs. Ne le transmettez qu'aux personnes à qui vous souhaitez donner accès."] },
    { id: "download", en: ["Can I download my creations?", "The generator can download a single element or the gallery as a ZIP. Keep a downloaded copy if you need it outside InstaFrame. Image downloads are still images, not an interactive notebook with audio or video playback."], fr: ["Peut-on télécharger ses créations ?", "Le générateur permet de télécharger un élément ou la galerie dans un fichier ZIP. Gardez une copie téléchargée pour utiliser vos créations en dehors d'InstaFrame. Les téléchargements d'images restent des images fixes, pas un carnet interactif avec lecture audio ou vidéo."] },
    { id: "shop", en: ["Can I buy Premium or order a printed notebook?", "Real payments and physical orders are not available yet. The shop is under construction. The free generator is available, and some features are marked PRO; a preview does not confirm a purchase or a physical order."], fr: ["Peut-on acheter Premium ou commander un carnet imprimé ?", "Les paiements réels et les commandes physiques ne sont pas encore disponibles. La boutique est en construction. Le générateur gratuit est accessible et certaines fonctions portent la mention PRO ; un aperçu ne constitue pas un achat ni une confirmation de commande physique."] },
    { id: "support", en: ["How do I report a problem?", "Use the feedback bubble to describe the page and what happened, and include a screenshot when useful. You can also write to contact@instaframe.fr."], fr: ["Comment signaler un problème ?", "Utilisez la bulle de retour pour décrire la page et ce qui s'est passé, avec une capture si elle est utile. Vous pouvez aussi écrire à contact@instaframe.fr."] },
  ];

  const isFr = lang === "fr";
  const items = rows.map((r) => {
    const pair = isFr ? r.fr : r.en;
    const q = isFr ? pair[0].replace(/ \?/g, "\u202f?") : pair[0];
    return { q, a: pair[1] };
  });

  const style = document.createElement("style");
  style.textContent = `
.faq { min-height: 100vh; background: #f7f4f1; color: #100808; font-family: 'DM Sans', sans-serif; padding: 32px 24px 64px; }
.faq__head { max-width: 720px; margin: 0 auto 24px; text-align: center; }
.faq__home { font-size: 18px; font-weight: 600; color: #100808; text-decoration: none; }
.faq__head h1 { font-size: 30px; font-weight: 600; margin: 16px 0 0; }
.faq__list { max-width: 720px; margin: 0 auto; }
.faq__item { border-bottom: 1px solid #c4c5c6; }
.faq__item:first-child { border-top: 1px solid #c4c5c6; }
.faq__q { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 72px; font-size: 17px; font-weight: 500; cursor: pointer; list-style: none; }
.faq__q::-webkit-details-marker { display: none; }
.faq__plus { width: 16px; height: 16px; flex: none; transition: transform 120ms; }
.faq__item[open] .faq__plus { transform: rotate(45deg); }
.faq__a { font-size: 15px; font-weight: 400; color: #707070; line-height: 1.6; margin: 0; padding: 0 40px 20px 0; }
@media (prefers-reduced-motion: reduce) { .faq__plus { transition: none; } }
@media (max-width: 899px) { .faq__q { padding-right: 64px; } }
.faq__head .lang-toggle--inline { width: max-content; margin: 16px auto 0; }
.lang-toggle { display: flex; height: 44px; padding: 0; gap: 0; border: 0; outline: 1px solid #171717; box-sizing: border-box; background: #fff; border-radius: 0; }
.lang-toggle--inline { position: static; box-shadow: none; }
.lang-toggle button { width: 44px; min-width: 44px; height: 44px; min-height: 44px; border: 0; padding: 0; border-radius: 0; font: 600 12px 'DM Sans', sans-serif; cursor: pointer; background: transparent; color: #171717; }
.lang-toggle button[aria-pressed="true"] { background: #171717; color: #fff; }
.lang-toggle button:focus-visible { outline: 2px solid #171717; outline-offset: 2px; }
`;

  const main = document.createElement("main");
  main.className = "faq";
  main.setAttribute("data-no-i18n", "");

  const head = document.createElement("header");
  head.className = "faq__head";

  const home = document.createElement("a");
  home.className = "faq__home";
  home.href = "/";
  home.textContent = "InstaFrame";
  home.addEventListener("click", (e) => e.preventDefault());
  head.appendChild(home);

  const h1 = document.createElement("h1");
  h1.textContent = "FAQ";
  head.appendChild(h1);

  const toggle = document.createElement("div");
  toggle.className = "lang-toggle lang-toggle--inline";
  toggle.setAttribute("data-no-i18n", "");
  toggle.setAttribute("role", "group");
  toggle.setAttribute("aria-label", "Language");

  const makeBtn = (value) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = value.toUpperCase();
    btn.setAttribute("aria-pressed", String(lang === value));
    btn.addEventListener("click", () => {
      const next = renderFaq({ lang: value, openIndex });
      wrapper.replaceWith(next);
    });
    return btn;
  };
  toggle.appendChild(makeBtn("en"));
  toggle.appendChild(makeBtn("fr"));
  head.appendChild(toggle);

  main.appendChild(head);

  const list = document.createElement("div");
  list.className = "faq__list";

  items.forEach((item, i) => {
    const details = document.createElement("details");
    details.className = "faq__item";
    if (i === openIndex) details.open = true;

    const summary = document.createElement("summary");
    summary.className = "faq__q";

    const span = document.createElement("span");
    span.textContent = item.q;
    summary.appendChild(span);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "faq__plus");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M8 2v12M2 8h12");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
    summary.appendChild(svg);

    details.appendChild(summary);

    const p = document.createElement("p");
    p.className = "faq__a";
    const parts = item.a.split(SUPPORT_EMAIL);
    if (parts.length === 1) {
      p.textContent = item.a;
    } else {
      parts.forEach((part, idx) => {
        const s = document.createElement("span");
        s.textContent = part;
        p.appendChild(s);
        if (idx < parts.length - 1) {
          const a = document.createElement("a");
          a.href = `mailto:${SUPPORT_EMAIL}`;
          a.textContent = SUPPORT_EMAIL;
          a.addEventListener("click", (e) => e.preventDefault());
          p.appendChild(a);
        }
      });
    }
    details.appendChild(p);

    list.appendChild(details);
  });

  main.appendChild(list);

  const wrapper = document.createElement("div");
  wrapper.appendChild(style);
  wrapper.appendChild(main);
  return wrapper;
}