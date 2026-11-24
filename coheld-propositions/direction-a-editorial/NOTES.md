# Direction A — Éditorial · Notes de conception

## 1. Constats sur les références (analyse view_image)

### slideshow.sh (référence de finition)
- **Grille** : axe central fort pour le hero, contenu ensuite aéré ; grille fine visible par endroits.
- **Typo** : titre massif sur 2 niveaux, souvent **noir + gris** (contraste de valeur, pas d'emphase sur un seul mot), sans-serif géométrique, tracking resserré.
- **Rapport texte/visuel** : hero textuel, puis **grande démo d'interface** en « preuve ». Le produit est un objet d'interface crédible (fenêtre macOS, sidebar, bulles, badges d'états, métadonnées), pas des cartes de texte.
- **Espaces** : très généreux, respiration entre chaque bloc.
- **Onglets** : changent réellement la scène ; actif en noir, inactifs en gris.

### Basecamp / Mailcheap / Mailchimp / Dropbox / Notion / Milanote
- **Basecamp** : projets montrés en grand, capture d'écran réelle, annotation dessinée, asymétrie basse. → montrer un vrai objet projet.
- **Mailcheap** : segmented control (pills) + démo interface avec aperçu mobile « device-in-device ». → mes onglets pilotent réellement la scène.
- **Mailchimp** : contraste typographique marqué, un seul CTA net. → peu de texte, une action.
- **Dropbox** : fichiers/aperçus/recherche visibles dès l'accueil. → montrer les .md comme objets.
- **Notion** : récit animé, progression, commande pause. → pause/rejeu obligatoires.
- **Milanote** : pièces jointes réelles (nom de fichier, taille), variété des formats. → métadonnées crédibles.

## 2. Pourquoi la maquette actuelle paraît « basique »
- Hero en split 50/50 rigide, l'empilement de cartes inclinées à droite concurrence le titre ; le bloc noir attire l'œil plus que la promesse.
- Deux chats miniatures + pont = scène étroite, longues lignes, beaucoup de vide mal distribué ; pas de « scène produit » monumentale.
- Hiérarchie faible : tailles proches, tracking trop serré/étouffant sur le H1, textes secondaires gris trop clairs.
- Aucune grille visible, aucun rythme éditorial ; avatars/logo « placeholder », badge SIMULATION façon Figma.
- Mobile = bureau réduit (cartes inclinées illisibles, superposition du bloc noir, cibles minuscules).

## 3. Concept — « Éditorial »
La page est présentée comme **le numéro 01 d'une revue de design** consacrée à Coheld :
- **Fond papier** blanc cassé neutre (pas le crème chaud générique), encre quasi-noire, gris calibrés. **Aucune couleur d'accent** (noir & blanc strict, direction héritée respectée).
- **Grille éditoriale** : 12 colonnes, traits de grille fins visibles sur toute la hauteur, règles de section avec index (01 / 02 / 03), folio latéral vertical dans le hero, colophon en pied.
- **Typographie** : Geist (locale) — display très grand sur 2 niveaux (ligne 1 encre 600, ligne 2 gris 400), contraste d'échelle fort avec le corps. Titre de section ~64px vs corps 15px.
- **Scène produit monumentale** : une vraie fenêtre d'application (barre de titre, sidebar projet, zone principale) pilotée par 3 onglets **Choisir · Transmettre · Reprendre**. Les onglets changent réellement l'interface (pas des surlignages).
- **Sous la scène** : composition **asymétrique** montrant le fichier .md **rendu** (article) et sa **source** (raw Markdown numéroté), reliés par une annotation.
- **Scène courte finale** : contraste éditorial « Ce qui circule / Ce qui reste » (partage choisi vs notes privées).

## 4. Grille
- Conteneur max 1280px, padding latéral 32px (24px mobile).
- 12 colonnes, gouttière 24px. Traits de grille : `1px` sur le bord droit de chaque colonne, couleur `#E4E2DC`.
- Desktop 12 cols · tablette 6 · mobile 4 (visibles mais discrètes).
- Sections séparées par une **règle de section** : trait 1px + petit index (01, 02, 03).

## 5. Échelle typographique
- Display H1 : `clamp(44px, 7.4vw, 118px)`, line-height 0.98, letter-spacing −0.045em, Geist 600/400.
- Titre de section : `clamp(34px, 4.4vw, 64px)`, Geist 600, −0.03em.
- Corps : 15–16px, line-height 1.6, Geist 400.
- Kicker : 13px sentence-case (jamais d'uppercase générique), avec petit carré de repère.
- Folio/méta : 11px uppercase letter-spacing 0.16em (réservé au folio éditorial).
- Source .md : monospace système, 13px, numéros de ligne.

## 6. Scénario de démo (étapes)
- **01 Choisir** — Camille : chat avec son assistant, picker de fichiers `.md` (brief.md ✓, decision.md ✓, notes-privees.md 🔒 exclu), métadonnées + mini-aperçu. La nature Markdown se voit (icône `.md`, « Markdown · v4 · Camille »).
- **02 Transmettre** — Karim : l'assistant de Karim annonce « Camille m'a partagé des documents. », les 2 fichiers reçus avec source conservée, question + boutons « Ajouter au contexte » / « Pas maintenant » (choix, pas d'automatique). Bandeau de transmission Camille → Coheld → Karim avec paquet `.md` animé.
- **03 Reprendre** — le projet : plan-accueil.md en sortie, rendu (promesse / fonctionnement / confiance / sources), badge « généré à partir du contexte partagé ».

## 7. Mouvement (intention)
- Onglet actif = pilule noire qui glisse (transform uniquement, 240ms ease-out).
- Changement d'étape = crossfade + translateY léger des panneaux (420ms ease-out, stagger 30–60ms sur les enfants).
- Barre de progression de lecture (scaleX, rAF, linéaire) sous l'onglet actif.
- Paquet `.md` : glissement subtil sur le bandeau de transmission (CSS, 1.4s), uniquement à l'étape 2.
- Contrôles : **pause / lecture / rejouer** + onglets cliquables. 10 clics rapides sans chevauchement (panneaux en position absolue, un seul affiché, animations relancées proprement).
- `prefers-reduced-motion` : état final (étape 03) lisible, navigation manuelle, aucune animation de déplacement.

## 8. Recomposition mobile (390px)
- Hero : rail vertical → ligne méta horizontale au-dessus du titre ; titre ~40px, 2 lignes empilées.
- Onglets : **segment control collant** (`position: sticky; top: 0`) en haut de la scène.
- Scène : fenêtre en **pile verticale** — sidebar devient une barre horizontale compacte, zone principale empilée dessous ; rien n'est réduit, tout est relisible.
- Section .md : rendu puis source empilés (offset supprimé).
- Contraste privé/public : colonnes empilées.
- Grille : 4 colonnes discrètes.

## 9. Décisions ouvertes / honnêteté
- **Pas d'accent couleur** : le noir & blanc strict est conservé (hérité). Signalé comme proposition.
- Maquette illustrative : mentions « scénario fictif », « aucune connexion validée », « images générées ».
- Noms fictifs Camille / Karim ; formulation exacte « Camille m'a partagé des documents. » (FR) / « Camille shared some documents with me. » (EN).

## 10. Boucle de critique (4 tours, capturés et corrigés)

### Tour 1 — première version
Défauts relevés (view_image 1440 / 390 / étape) :
1. Titre sur 2 lignes **même taille/poids** → hiérarchie plate ; ligne 2 gris trop clair (contraste AA faible).
2. Colonne méta gauche du hero = « désert » ; grille décorative, contenu mal ancré.
3. Badges noirs (« Projet partagé », « en sortie ») confondus avec des boutons.
4. Bloc « source » texte trop petit, numéros illisibles ; bouton téléchargement flottant.
5. Grille 12 colonnes trop dense/bruitée sur mobile ; colophon microscopique ; « 01 » flottant en fin de règle.
Corrections : restructuration du hero (folio horizontal, ligne 2 plus petite + plus foncée + medium), masthead simplifié, badges statut en « ghost », section-rule avec index à gauche, contrastes remontés, grille mobile allégée, colophon agrandi, CTA2 renommé.

### Tour 2 — après restructuration
Défauts relevés :
1. Scène « Transmettre » **coupée en bas** : les boutons « Ajouter / Pas maintenant » sortaient du cadre (min-height trop court).
2. Bouton secondaire : bordure trop claire (mobile) ; espace boutons trop serré.
3. Bandeau de transmission sans sens de lecture ; libellé « brief v4 » incohérent avec « brief.md ».
4. Annotation « rendu ↔ source » en pointillés « maquette technique » ; bloc source trop massif/peu contrasté.
Corrections : min-height scène 564px, flèches directionnelles sur le bandeau, libellé paquet harmonisé, bloc source passé en **éditeur sombre** (contraste fort, numéros lisibles), annotation simplifiée.

### Tour 3 — scène + section .md
Défauts relevés :
1. Flèche d'annotation verticale (↓) alors que les blocs sont côte à côte (desktop) → dissonance.
2. Barre de titre fenêtre : titre + badge peuvent se chevaucher à 320/390 ; pastilles macOS inutiles sur mobile.
3. Tête de section .md : bouton télécharger + titre trop à l'étroit sur mobile.
Corrections : annotation horizontale desktop / verticale mobile, titre fenêtre tronqué (`ellipsis`) + pastilles masquées ≤768, tête .md empilée sur mobile.

### Tour 4 — contrôles automatisés
Défauts relevés (script Playwright) :
1. En `prefers-reduced-motion`, le bouton lecture/pause n'était **pas masqué** (sélecteur CSS ciblait un parent inexistant).
Corrections : masquage via la media query `prefers-reduced-motion` directement.
Résultat final : 320/390/768/1280/1440 × FR/EN sans scroll horizontal ni erreur console ; autoplay avance ; pause fige la progression ; reprise relance ; rejeu ; 10 clics rapides = 1 seul panneau visible ; reduced-motion = état final + navigation manuelle.

