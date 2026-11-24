# Passation — Coheld · direction-b-dossier

## Dépôt et branche
- Dépôt : `https://github.com/goythom/creation-maquette-hx`
- Branche : `deepseek/coheld-accueil-ux`
- Livré **uniquement** dans `coheld-propositions/direction-b-dossier/` (aucun autre fichier modifié, vérifié par `git status`).

## Résumé
Proposition d'accueil Coheld autonome, direction **« Le dossier comme objet »** : le contexte
Markdown est traité comme un objet physique et lisible — un dossier de projet ouvert en légère
perspective, des fiches `.md` (aperçu rendu + métadonnées auteur/date/version), et
`notes-privees.md` visiblement mise de côté (pointillés + tampon « PRIVÉ »).

- **Hero** : promesse à gauche (« Le contexte passe. Vos assistants restent. »), dossier-objet à droite.
- **Démo produit** (3 étapes cliquables + pause/lecture/rejeu) : Choisir → Transmettre → Reprendre.
  À réception, c'est l'assistant de Karim qui parle : « Camille m'a partagé des documents. »
  Sortie `plan-accueil.md` visible (structure + source + notes privées exclues).
- **2 scènes de suite courtes** : registre/ledger (fichiers `.md`, source/date/état, aperçu rendu
  ↔ source brute) + scène éditoriale (image `collaboration.webp`, source conservée).
- **Noir & blanc hérité** + **accent proposé** : bille bleue `#2340C8` (sélection, tracé, focus,
  fiche de sortie). Variable `--accent` dans `styles.css` (mettre `#10100f` pour du pur N&B).
- FR par défaut, EN via `?lang=en` (dictionnaire dans `app.js`).
- Honnêteté : « Aperçu d'interface · scénario fictif », « Simulation », « Scénario fictif ·
  connexions aux assistants non validées ». Noms fictifs (Camille, Karim).

## Fichiers livrés
```
coheld-propositions/direction-b-dossier/
├── index.html            # page autonome (FR + data-i18n)
├── styles.css            # styles + tokens (--accent = proposition)
├── app.js                # i18n, démo, révélation, aperçu .md, API window.coheld
├── NOTES.md              # constats, concept, grille, typo, scénario, boucle de critique
├── capture.cjs           # utilitaire capture (Playwright)
├── capture-demo.cjs      # capture d'un état de démo
├── controls.cjs          # contrôles finaux automatisés
└── captures/
    ├── desktop-1440.png
    ├── desktop-1440-full.png
    ├── mobile-390.png
    ├── mobile-390-full.png
    └── demo-etape-2.png
```

## Prérequis
- Aucun build, aucun CDN, aucune dépendance npm pour **servir** la page.
- Ressources locales par chemins relatifs : fonts `../../coheld-reprise/sources-locales/fonts/`,
  images `../../coheld-reprise/sources-locales/coheld/img/`, `vendor/motion.js`, `examples/*.md`.
- Pour rejouer contrôles/captures : Node + Playwright global (`/opt/node-tools/node_modules`) ;
  lancer avec `NODE_PATH=/opt/node-tools/node_modules node ...`.

## Mise en ligne (étapes exactes)
1. Pousser la branche : `git push -u origin deepseek/coheld-accueil-ux`.
2. Déployer la racine du dépôt comme d'habitude (Pages/Cloudflare…).
3. URL : `https://<domaine>/coheld-propositions/direction-b-dossier/index.html`
   et EN : `.../index.html?lang=en`.
4. Ne pas intégrer dans `coheld-reprise/sources-locales/coheld/` avant validation : proposition autonome.

## Vérifications après mise en ligne
- FR + EN, largeurs 320 / 390 / 768 / 1280 / 1440 : aucun scroll horizontal, zéro erreur console.
- Démo : cliquer 01/02/03, Pause/Lire, Rejouer ; le paquet « 2 .md » circule sur le tracé
  Camille → Coheld → Karim ; l'étape 03 affiche l'annonce de l'assistant de Karim puis `plan-accueil.md`.
- Registre : bascule « Aperçu rendu / Source .md ».
- Rejouer les contrôles :
  ```bash
  cd <racine du dépôt>
  python3 -m http.server 8102 &
  NODE_PATH=/opt/node-tools/node_modules node coheld-propositions/direction-b-dossier/controls.cjs
  ```
  Résultat attendu : `ALL CONTROLS PASSED`.

## Points d'attention
- **Accent `#2340C8` = PROPOSITION** (à faire trancher). Pur N&B : `--accent: #10100f` dans `styles.css`.
- Maquette illustrative : aucune fausse intégration, métrique, logo client ou témoignage.
- `collaboration.webp` / `worktable.webp` = images illustratives existantes du projet, en niveaux
  de gris et recadrage éditorial. Aucune capture tierce intégrée.
- `capture*.cjs` / `controls.cjs` = utilitaires de dev, sans impact sur la page.
- `prefers-reduced-motion` respecté : état final lisible + navigation manuelle.

## Retour arrière
- Supprimer (ou ne pas déployer) `coheld-propositions/direction-b-dossier/` suffit.
- Aucun autre fichier du dépôt n'ayant été modifié, aucun revert nécessaire ailleurs.
