# Direction C — « Deux conversations, un contexte » — Notes de design

## 1. Constats sur les références (slideshow.sh et les 6 pistes)

- **Slideshow.sh (référence de finition)** : fond blanc cassé chaud, quasi monochrome, titres courts à deux tons (noir + gris), très grand contraste d'échelle (H1 massif / corps minuscule), énorme espace négatif, traits de grille fins, fenêtre macOS avec chrome réaliste, démonstration d'interface dense et crédible (états de travail, micro-copy spécifique), onglets qui changent réellement la scène. La force vient de la composition + typo + scénario, pas des effets.
- **Basecamp / Mailcheap / Mailchimp** : montrer le produit en situation (objets réels), un seul CTA contrasté, respiration, mais éviter la nav chargée, la police manuscrite datée et la sur-simplicité froide.
- **Dropbox** : le produit visible dès l'accueil (fichiers, aperçus, recherche) ; split texte/UI ; flou de profondeur pour focaliser. Éviter de faire passer Coheld pour un disque partagé.
- **Notion** : récit animé, commande pause, contraste typographique extrême, interface réelle montrée. Éviter le bleu et l'absence d'identité.
- **Milanote** : variété du contexte (notes, pièces, liens, images) dans une composition éditoriale. Éviter le tableau infini.
- **Leçon commune** : le niveau « studio » vient du rapport composition/typographie/objet-produit et d'un vrai scénario, pas d'effets décoratifs. « Show, don't tell ».

## 2. Ce qui rend l'actuel faible (maquette home.html)

1. Typographie : H1 à chasse trop négative (-0.06em) qui se referme sur lui-même, une seule graisse, aucun contraste de ton.
2. Composition : hero déséquilibré, cercle filaire décoratif sans sens, carte flottante mal ancrée, photo de bureau générique (stock), section basse en « empty state ».
3. Hiérarchie : concurrence entre le CTA du menu et le CTA principal, switch FR/EN bancal, logo sans poids.
4. Crédibilité : la scène produit est vide (icône enveloppe « le contexte arrive ici »), tag « SIMULATION » qui donne un air de wireframe Figma, pas de vrais objets .md détaillés.
5. Mobile : H1 qui touche les bords, trous de composition, carte sombre sur photo illisible, bas de page coupé.

## 3. Mon concept

**Deux fenêtres d'assistant crédibles** (Camille à gauche, Karim à droite), et **entre elles la couche Coheld**, fine et structurée, qui montre ce qui passe (brief.md, decision.md), ce qui reste privé (notes-privees.md) et la source. La démo déroule le parcours réel : choisir → transmettre → recevoir (l'assistant de Karim dit « Camille m'a partagé des documents. ») → Karim accepte → plan-accueil.md produit.

Promesse : les gens restent dans leur assistant habituel ; Coheld est la couche de contexte entre eux.

## 4. Grille

- Conteneur 12 colonnes, max-width 1280px, padding 56px (desktop) / 20px (mobile).
- Traits de grille verticaux fins (hairlines) visibles dans le hero et la scène produit, alignés sur la grille.
- Composition asymétrique : hero centré (axe fort), scène produit pleine largeur en 3 colonnes (1fr / 0.9fr / 1fr), scènes de suite en split asymétrique (grande surface + colonne étroite).

## 5. Échelle typographique

- **Display (H1)** : Geist 700, clamp(56px → 112px), line-height 0.96, letter-spacing -0.035em, deux tons (noir `#141414` + gris `#9a9a9a`). Deux niveaux.
- **Sous-titre** : Geist 400, 18–20px, gris `#5a5a58`, largeur ~44ch.
- **Couche document/technique** : pile monospace système (`ui-monospace, SFMono, Menlo, Consolas, monospace`) pour les noms de fichiers `.md`, métadonnées, étiquettes, source, onglets — encodage signifiant du thème « mémoire / fichiers Markdown ».
- **UI de la démo** : Geist 400/500, 12–14px, micro-copy spécifique et crédible.

## 6. Palette

- `--paper: #FCFCFB` (page), `--surface: #F5F5F3` (scène), `--ink: #141414`, `--ink-2: #3b3b39`, `--muted: #6e6e6b`, `--hairline: #e3e3df`, `--hairline-strong: #c9c9c3`.
- **Accent (PROPOSITION)** : « or d'encre » `#b98a2f`, fond doux `#f3e8d2` — réservé à ce que Coheld matérialise : documents choisis, source conservée, étape active. Noir sur or = contraste AA. S'efface si on le met à la valeur de l'encre.
- Noir et blanc hérités partout ailleurs. Chat : bulles utilisateur encre, bulles assistant gris clair.

## 7. Scénario de démo (4 étapes)

0. **Choisir** — Camille, dans son chat, demande à transmettre le contexte. L'assistant affiche la sélection : `brief.md` ✓, `decision.md` ✓, `notes-privees.md` exclu (cadenas). La couche Coheld affiche « Sélection » + source.
1. **Transmettre** — transmission ; l'assistant de Karim annonce : « Camille m'a partagé des documents. » La couche Coheld montre la progression et la source conservée.
2. **Reprendre** — Karim choisit « Utiliser ce contexte » dans son chat.
3. **Produire** — l'assistant de Karim sort `plan-accueil.md` (aperçu Markdown rendu + sources). La couche Coheld liste la sortie.

Contrôles : onglets cliquables, pause/lecture/rejeu, barre de progression. Auto-play ~4 s/étape, désactivé en reduced-motion.

## 8. Recomposition mobile (390px)

- Un seul écran de téléphone qui bascule de Camille à Karim : la scène devient une **colonne verticale** — fenêtre active (Camille **ou** Karim) + bandeau couche Coheld en transition entre les deux. Onglets en haut, contrôles accessibles, captions lisibles. Pas un bureau réduit.

## 9. Boucle de critique (défauts relevés → corrections)

### Tour 1 (v1)
Défauts relevés : tout centré (template SaaS), titre noir/gris cliché et gris trop pâle, espaces plats, composants « librairie » (badge pilule, switch langue, boutons), mobile sans visuel produit au-dessus de la ligne de flottaison, header mobile surchargé.
Corrections : héros aligné à gauche, hiérarchie à deux niveaux par la taille (pas par le gris), eyebrow éditorial (filet), CTA secondaire en lien texte, scène produit remontée, scène B assainie (source .md en bandeau, plus de split « IDE »).

### Tour 2 (v2)
Défauts relevés : carte produit du héros « flotte dans le vide » et ressemble à un sélecteur de fichiers ; saut typographique brutal + tracking trop serré ; CTA secondaire perdu ; grille de fond = bruit ; démo coupée ; onglet actif en « tache beige » ; incohérence temporelle (Camille « envoi » vs Karim déjà reçu) ; « brief.md brief.md » redondant.
Corrections : suppression de la carte flottante (héros éditorial pur), desserrage du tracking, narration Karim cohérente (il demande le contexte → l'assistant annonce → il choisit), indicateur de frappe à l'étape 1, onglets avec soulignement accent, suppression de la grille de la scène.

### Tour 3 (v3/v4)
Défauts relevés : header déséquilibré (CTA noir écrasant vs nav grise), sélecteur langue bancal, CTA secondaire qui ressemble à un champ de formulaire, grille non alignée, texte gris trop pâle, avatars incohérents, « Reçu » trop petit, source quasi invisible, « vide mort » à droite du héros.
Corrections : header allégé (CTA outline, nav renforcée), annotation éditoriale à droite (→ la scène produit), CTA secondaire neutralisé, contrastes remontés, avatars unifiés, suppression de la grille du héros, ombres douces sur les fenêtres.

### Tour 4 (v5/v6)
Défauts relevés : sélecteur langue encore trop présent, tracking du H1 et point final, soulignement d'onglet trop fin, barres de saisie « mortes » (pas d'icônes d'action), cartes sans profondeur, tiret de l'annotation mal aligné, icônes trop fines, contraste du pied de page.
Corrections : langue en liens texte discrets, tracking à -0.012em, soulignement en encre accent, barre de saisie avec pièce jointe + envoi, ombres sur fenêtres, retrait du tiret, icônes épaissies, footnote et note de démo assombries.

### Tour 5 — revue du directeur artistique (corrections finales)
Défauts relevés sur captures 1440 :
1. Moitié droite du hero vide + annotation flottante monospace (« La scène produit — deux conversations… »).
2. Scène produit (les 3 fenêtres) à peine visible au-dessus de la ligne de flottaison à 1440×900.
3. Accent « or » à vérifier sur fonds beiges.

Corrections :
1. Suppression de `.hero-side` (HTML + CSS + liste d'animation d'entrée + clé i18n `hero.side`).
2. Hero compacté (padding réduit, display ramené à `clamp(44px, 5.4vw, 76px)`, marges resserrées) pour remonter la démo : les 3 fenêtres sont désormais significativement visibles dans le premier écran 1440×900 (environ la moitié supérieure), et la scène produit occupe le bas du premier écran sur mobile.
3. Contraste vérifié : le texte d'accent utilise `--accent-ink #7A5B1E` (jamais `--accent #B98A2F` comme couleur de texte) — ratio **5,17:1** sur `--accent-soft #F3E8D2` et **6,28:1** sur blanc → AA validé. `--accent` reste réservé aux traits/bordures/indicateurs (non-texte).
4. `prefers-reduced-motion` : l'état final « Produire » (étape 3) est affiché d'emblée, navigation par onglets disponible, contrôles masqués.

### Contrôles finaux
Largeurs 320/390/768/1280/1440 × FR/EN : aucun défilement horizontal (après correction `white-space: pre-wrap` + `min-width: 0` sur les enfants de grille), zéro erreur console, zéro requête en échec. Démo : 4 étapes cliquables, pause/reprise/rejeu OK, 10 clics rapides sans chevauchement ni état incohérent, `prefers-reduced-motion` → état final « Produire » + navigation manuelle, contrôles masqués. Captures finales dans `captures/`.
