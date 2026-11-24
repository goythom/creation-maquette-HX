# Passation — Proposition de direction UI/UX Coheld « Éditorial »

## Dépôt et branche
- Dépôt : `https://github.com/goythom/creation-maquette-hx`
- Branche de travail : `deepseek/coheld-accueil-ux`
- Livraison : `coheld-propositions/direction-a-editorial/` (uniquement ce dossier a été créé/modifié ; aucun autre fichier du dépôt n'a été touché).

## Résumé des changements
Proposition d'ouverture « Éditorial » pour l'accueil Coheld, traitée comme le **numéro 01 d'une revue de design** :
- Fond papier blanc cassé neutre (`#f6f5f1`), noir & blanc strict (aucune couleur d'accent — conservé comme direction héritée), grille éditoriale fine visible (12 colonnes desktop, allégée mobile).
- **Hero** : folio horizontal en tête, titre display sur 2 niveaux (« Partagez le contexte. » encre 600 / « Gardez vos assistants. » gris moyen 500, plus petit), sous-titre court, 2 CTA, note d'honnêteté.
- **Scène produit monumentale** : fenêtre d'application crédible (barre de titre, sidebar projet, zone principale) pilotée par 3 onglets **Choisir · Transmettre · Reprendre** qui changent réellement l'interface. Démo animée (autoplay + pause/lecture/rejeu + onglets cliquables + barre de progression). Scénario fidèle au cahier des charges : fichiers `.md` visibles comme tels, notes-privees.md exclu, source conservée, l'assistant de Karim dit « Camille m'a partagé des documents. », Karim choisit d'ajouter (pas d'automatique).
- **Scène .md rendu / source** : composition asymétrique — aperçu Markdown rendu (carte claire) + source brute (éditeur sombre, numéros de ligne), reliés par annotation.
- **Scène courte finale** : contraste éditorial « Ce qui circule / Ce qui reste ».
- **Colophon** : mentions d'honnêteté (maquette illustrative, exemples fictifs, images générées).
- **Bilingue** : FR par défaut, EN via `?lang=en` (dictionnaire JS). **Responsive** : 320 → 1440, mobile recomposé (onglets collants, scène en pile, sidebar réduite). `prefers-reduced-motion` : état final lisible + navigation manuelle, pas d'autoplay.

## Fichiers livrés
```
coheld-propositions/direction-a-editorial/
├── index.html          (structure + contenu FR, data-i18n)
├── styles.css          (design system, grille, scène produit, responsive, reduced-motion)
├── script.js           (i18n FR/EN + moteur de démo)
├── NOTES.md            (constats, concept, grille, typo, scénario, boucle de critique)
└── captures/
    ├── desktop-1440.png
    ├── desktop-1440-full.png
    ├── mobile-390.png
    ├── mobile-390-full.png
    └── demo-etape-2.png
```

## Prérequis
- Aucune dépendance à installer, aucun build, pas de CDN, pas de React.
- Ressources locales référencées par chemin relatif :
  - Polices : `../../coheld-reprise/sources-locales/fonts/geist-*.woff2`
  - Images : `../../coheld-reprise/sources-locales/coheld/img/worktable.webp`
  - Exemples .md (liens `download`) : `../../coheld-reprise/sources-locales/coheld/examples/*.md`
- Serveur statique requis pour servir (les chemins relatifs remontent au-dessus du dossier) :
  ```bash
  cd <racine-du-dépôt>
  python3 -m http.server 8101
  ```
  Puis ouvrir : `http://localhost:8101/coheld-propositions/direction-a-editorial/index.html`
  Version anglaise : `.../index.html?lang=en`

## Étapes exactes de mise en ligne
1. Vérifier que la branche `deepseek/coheld-accueil-ux` est bien poussée (l'orchestrateur committe ; ne pas écrire sur main/master, pas de merge/PR).
2. Déployer la branche telle quelle (statique). Aucune étape de build.
3. S'assurer que le dossier `coheld-reprise/` est bien présent à côté de `coheld-propositions/` dans l'arborescence déployée (nécessaire pour les chemins relatifs `../../coheld-reprise/...`).
4. Rien d'autre à configurer (pas de variable d'environnement, pas de secret).

## Vérifications après mise en ligne
- URL à tester : `/coheld-propositions/direction-a-editorial/index.html` et `...?lang=en`.
- Largeurs 320 / 390 / 768 / 1280 / 1440 : aucun défilement horizontal (`scrollWidth <= clientWidth`), aucun texte coupé, aucune erreur console.
- Démo : autoplay démarre à l'entrée dans le viewport ; onglets 01/02/03 changent réellement la scène ; boutons Pause / Lecture / Rejouer fonctionnent ; 10 clics rapides sur les onglets = un seul panneau visible (pas de chevauchement).
- `prefers-reduced-motion` : l'état final (étape 03) est affiché, le bouton lecture/pause est masqué, les onglets et « Rejouer » restent utilisables.
- FR/EN : le switch de langue change tous les textes, y compris la source .md brute.
- Les liens « Télécharger brief.md » téléchargent bien `coheld-reprise/sources-locales/coheld/examples/brief.md`.
- Résultat attendu : une page studio éditoriale, noir & blanc, titre très grand sur 2 niveaux, scène produit monumentale à onglets, section .md rendu/source asymétrique.

## Points d'attention
- **Ne jamais intégrer** les captures des sites tiers (slideshow.sh, Basecamp, etc.) : elles ne sont utilisées que pour l'analyse dans `coheld-reprise/`.
- **Honnêteté produit conservée** : la page affiche explicitement « maquette illustrative / scénario fictif / exemples fictifs / images générées » et « connexions aux assistants non validées ». Ne pas retirer ces mentions.
- **Pas d'accent couleur ajouté** : direction noir & blanc strict (choix conservateur, conforme à la direction héritée). Si le client souhaite un accent, c'est une décision de design à valider séparément.
- Les images `worktable.webp` / `collaboration.webp` sont des ressources générées fournies dans le dépôt ; elles sont utilisées uniquement comme ressources locales liées.
- Le dossier `coheld-propositions/direction-a-editorial/` est autonome : toute modification future doit rester dans ce dossier.

## Procédure de retour arrière
- Supprimer le dossier `coheld-propositions/direction-a-editorial/` (aucun autre fichier du dépôt n'a été modifié).
- La branche `deepseek/coheld-accueil-ux` n'a pas touché les autres projets ni les 16 pages Coheld : revenir au commit parent de la branche si nécessaire.
