# Direction B — « Le dossier comme objet »

> Proposition UI/UX pour l'accueil Coheld. Page autonome, noir & blanc hérité,
> une seule couleur d'accent signalée comme **proposition** (bille bleue).

---

## 1. Constats sur les références (analyse view_image)

### slideshow.sh (référence de finition)
- **Grille** : cadre centré, 2 verticales fines en bordure, colonne de lecture ~700 px,
  démo plus large (~840–1100 px). Tout est aligné à l'axe.
- **Typo** : H1 énorme (~68 px), 2 tons (noir + gris), graisse 600, tracking serré ;
  nav/UI minuscules (13 px). Contraste d'échelle violent entre le titre et le reste.
- **Rapport texte/visuel** : au-dessus du pli, texte dominant ; ensuite la preuve produit
  prend 80 % de la surface. *Show, don't tell*.
- **Produit montré** : fenêtre macOS crédible (pastilles, sidebar, requête, état
  « working », loader). Les onglets sont une **séquence de workflow**, chaque onglet
  change réellement la scène.
- **Défauts notés** : trou de 130 px entre sous-titre et onglets ; onglets interchangeables
  (pas de mémoire de progression) ; inactifs trop pâles (contraste < 3:1).

### Basecamp
- Fond crème, H1 massif, **chevauchement** des captures produit (profondeur),
  **annotation manuscrite** (« This is what Basecamp projects look like »), données réelles.
- Transposable : chevauchement, annotation, chaleur du fond. Éviter : H1 écrasant, nav chargée.

### Dropbox
- Fichier comme **objet** dès l'accueil : previews, recherche, curseur visible, UI à l'échelle 1.
- Transposable : le dossier comme objet visuel, miniatures, métadonnées, recherche.

### Notion
- 20 % texte / 80 % preuve, cadre arrondi presque pleine largeur, UI dense isolée par du blanc,
  crop bas volontaire. Récit spatial (documents → contexte → assistant → action).
- Transposable : densité de l'UI, crop, pause/commande.

### Mailcheap / Mailchimp / Milanote
- Mailcheap : démo à onglets qui **change réellement** le visuel ; serif display + marqueur gris.
- Mailchimp : contraste typographique fort, action nette. Éviter photo générique + jaune.
- Milanote : board mêlant notes/images/liens, flèches manuscrites, accents orange.
  Reprendre : **variété du contexte**, composition éditoriale (pas de mur de cartes identiques).

---

## 2. Ce qui rend l'actuel faible (constats de critique)

1. **Composition** : split 50/50 éculé ; à droite une « soupe visuelle » (orbites, mains
   qui dessinent, cartes flottantes) sans point focal. La métaphore est illisible.
2. **Hiérarchie** : le CTA se noie ; la carte noire « Refonte du site » pèse plus que la promesse ;
   la nav est un bloc compact.
3. **Espacement** : rythme vertical cassé, déserts de vide entre les cartes de chat (blocs
   blancs sous-remplis), démo déconnectée du hero.
4. **Typographie** : monotone, sans personnalité, sans tension ; monospace en artifice gratuit.
5. **Crédibilité** : clichés (mains/crayons, orbites), « Explorer la maquette » qui casse le 4e mur,
   interface simulée = wireframe lâché. **Mobile = bureau réduit** (scène 3D écrasée, texte 4 px).

**Verdict : basique, générique.** Le client a raison.

---

## 3. Concept

**Le dossier comme objet.** Le contexte Markdown n'est pas une liste abstraite : c'est un
**objet physique, lisible, que l'on ouvre, que l'on trie, que l'on transmet**.

- Le hero montre à droite un **dossier de projet ouvert en légère perspective** : des fiches
  `.md` (miniatures du contenu *rendu* + métadonnées auteur/date/version), et
  `notes-privees.md` **visiblement mise de côté** (tampon PRIVÉ, à l'écart).
- La **démo anime le trajet** du dossier de Camille vers Karim : un tracé fin, des étiquettes,
  un paquet `.md` qui circule. À réception, **c'est l'assistant de Karim qui parle**.
- La nature Markdown se voit partout : noms de fichiers en monospace, syntaxe `#`/`##`
  apparente, aperçu rendu ET source brute.

### Accent proposé (PROPOSITION)
- Base : **noir & blanc + gris chauds** (hérité), aucune couleur dans la structure.
- Accent unique : **bille bleue** `#2340C8` — utilisé uniquement pour l'état sélectionné,
  le tracé de transfert, le focus et la fiche de sortie `plan-accueil.md`.
  Contrôlé par une seule variable `--accent` (mettre `#111` pour du pur N&B).

---

## 4. Grille

- Conteneur `max-width: 1280px`, padding latéral 32 px (56 px ≥ 1024).
- **12 colonnes**, gouttière 20 px.
- **Hairlines de cadre** : 2 verticales fines aux bords du conteneur (comme un plan de studio).
- **Grille visible légère** derrière le hero et la démo : 12 verticales à 3–4 % d'opacité
  + 1 ligne de base, pour assumer la composition « sur plan ».
- Hero : copie sur ~5 colonnes, dossier-objet sur ~7 colonnes.
- Démo : grande scène pleine largeur, trois zones asymétriques (chat / trace+objet / chat).

---

## 5. Échelle typographique

Polices locales : **Geist** (UI/corps, 400/500/600/700) ; **monospace système**
(ui-monospace/SFMono/Menlo) pour les `.md` et le code ; **Kalam** en annotation
manuscrite très rare (1 à 2 fois max).

| Niveau | Corps desktop | Graisse | Traitement |
| --- | --- | --- | --- |
| Étiquette de section | 11 px | 500 | minuscules, carré plein + règle |
| H1 | clamp(46px, 6.2vw, 86px) | 600 | 2 tons (encre / gris), tracking −0.045em, line-height 0.98 |
| Lead | 17–18 px | 400 | gris foncé, max 46 ch |
| H2 de scène | clamp(30px, 3.6vw, 46px) | 600 | tracking −0.03em |
| Corps UI | 13–14 px | 400 | |
| Métadonnées / `.md` | 11–12 px | 400 | monospace, tabular-nums |
| Micro-labels | 9–10 px | 500 | monospace, espacement 0.02em |

Contraste AA : encre `#0E0E0C` sur blanc ; gris texte jamais sous `#5F5F59` sur fond clair.

---

## 6. Scénario de démo (3 étapes)

Scène « De « partage » à « on avance » » — badge **Simulation**. Trois zones :
gauche = chat de Camille ; centre = dossier-objet + tracé fin de transfert + nœud Coheld ;
droite = chat de Karim.

1. **01 · Choisir** — Le chat de Camille affiche la sélection : `brief.md` ✓, `decision.md` ✓
   (métadonnées « Markdown · v4 · Camille ») ; `notes-privees.md` grisé, « non partagé »,
   à l'écart. Le dossier central met en avant les deux fiches choisies. À droite : état
   d'attente « Le contexte arrive ici. ».
2. **02 · Transmettre** — Le paquet « 2 fichiers .md » quitte Camille, longe le tracé fin
   (étiquette « seul le contexte choisi circule, avec sa source »), traverse le nœud Coheld,
   arrive vers Karim. La source reste attachée.
3. **03 · Reprendre** — L'assistant de Karim annonce : **« Camille m'a partagé des documents. »**
   (c'est l'assistant qui parle, pas une notification autonome). Karim choisit d'utiliser le
   contexte : « Oui. Crée plan-accueil.md. » → sortie `plan-accueil.md` (rendu + source brute
   `brief.md + decision.md · Camille · notes privées exclues`).

**Contrôles** : étapes cliquables 01/02/03, Pause/Lire, Rejouer. Légende `aria-live`.
`prefers-reduced-motion` → état final (03) lisible + navigation manuelle, aucun mouvement.

---

## 7. Deux scènes de suite (courtes, non identiques)

1. **« Ce qui circule reste consultable. »** — Un **registre** (ledger) : les fichiers `.md`
   du projet en lignes avec hairlines, colonnes fichier / auteur / date / état ; aperçu rendu
   d'un fichier ; `notes-privees.md` exclu et grisé. Montre *conserve, structure, rend consultable*.
2. **« Chacun garde son assistant. »** — Composition éditoriale : `collaboration.webp` en
   recadrage éditorial + légende « Le contexte circule. Pas vos notes privées. », la source
   conservée, et la fiche de sortie `plan-accueil.md`. Montre *transmet, sans changer d'outil*.

---

## 8. Recomposition mobile

- **Hero** : copie empilée ; le dossier-objet devient une **pile de fiches swipeable**
  (scroll-snap horizontal) — brief → decision → plan, plus une fiche `notes-privees.md`
  grisée en bout de pile. Pas de perspective 3D sur petit écran.
- **Démo** : les trois zones s'empilent verticalement (chat Camille → trace verticale
  compacte → chat Karim). Les contrôles passent **au-dessus** de la scène, toujours accessibles.
- **Scènes de suite** : registre → lignes compactes (colonne auteur masquée en dessous de 480) ;
  scène éditoriale → image pleine largeur puis texte.
- Cibles : 320 / 390 / 768 / 1280 / 1440, FR et EN, aucun scroll horizontal.

---

## 9. Boucle de critique (5 tours réalisés)

### Tour 1 — critique
- Dossier-objet « raté » : perspective fausse, ombres diffuses/flottantes, cascade sans logique,
  tampon « PRIVÉ » façon WordArt, notes-privées en rotation arbitraire.
- Typo : gris du 2e niveau trop faible, saut d'échelle brutal, textes internes des fiches illisibles.
- Grille décorative (pas structurelle), bloc gauche flottant.
- CTA sans finesse, nav/langue faibles.
- Mobile : pile = « fausse bonne idée statique » (bug d'absolu hérité du desktop), H1 monumental,
  grille polluante, micro-textes trop clairs.
- **Corrections** : fiches absolues scopées à `.folder-pocket` (bug mobile) ; ombres retravaillées ;
  perspective adoucie ; gris H1 assombri ; grille allégée ; CTA affinés ; disclaimer reformulé
  (« Aperçu d'interface · scénario fictif ») ; pile mobile transformée en vrai carrousel snap
  (découpe nette, dots).

### Tour 2 — critique
- Ombres encore incohérentes (dossier très diffus, fiches « collées »), notes-privées « flottent ».
- H1 : interlignage trop serré (collisions), contraste noir/gris brutal, eyebrow anecdotique.
- Alignement gauche/droite imparfait, CTA collé au sous-titre.
- Grille : artefacts à droite du visuel.
- Mobile : découpe « dec… » à mi-mot, scrollbar native, « trou » dans la carte decision, contrastes faibles.
- **Corrections** : H1 `line-height 1.06` + `text-wrap: balance` ; gris → `#5f5f59` ; eyebrow renforcé ;
  grille quasi supprimée sur mobile ; carrousel 84 % + `scrollbar-width: none` ; miniature full-width
  dans les fiches mobiles ; choix A/B étirés ; micro-textes assombris.

### Tour 3 — critique
- Ombre du dossier encore trop grosse/sombre ; source de lumière incohérente.
- H1 : retour à la ligne chaotique (« Vos » orphelin), bloc trop haut.
- Déséquilibre des masses gauche/droite, vide au-dessus du visuel.
- **Corrections** : colonne gauche élargie `6.5fr/5.5fr` + `gap 36` ; H1 `clamp(30px, 4.6vw, 58px)`
  (deux phrases tiennent chacune sur une ligne) ; ombre du dossier resserrée ; ombres des fiches
  affirmées ; notes-privées moins inclinées ; alignement haut des deux colonnes (`align-items: start`).

### Tour 4 — critique (pleine page)
- CTA primaire/secondaire pas sur la même ligne de base.
- Démo : vide central trop grand, nœud Coheld minuscule, flèches quasi invisibles.
- Illustration éditoriale trop grande / rupture de style.
- Ledger : preview décalée, lignes trop compactes.
- **Corrections** : hauteur CTA figée à 44 px ; nœud Coheld transformé en carte (fond blanc, ombre,
  icône encre) ; tracé épaissi + assombri ; étiquettes Camille/Karim ancrées au tracé ; image
  éditoriale plafonnée (`max-width 540` + grille 6/6) ; ledger resserré (marges + padding lignes) ;
  bulle utilisateur `overflow-wrap: anywhere`.

### Tour 5 — contrôles + finitions
- Bug réel : le clic sur une étape déclenchait l'autoplay (IntersectionObserver) qui écrasait l'état
  → ajout `stopAutoplay()` sur toute interaction manuelle + API `window.coheld`.
- 320 px FR : débordement horizontal causé par les 3 boutons d'étapes (texte « Transmettre »)
  → boutons compactés + numéros masqués sous 360 px.
- Flèche du CTA jugée dissonante → supprimée (label seul).
- Paquet `.md` de l'étape 2 repositionné sur le segment gauche du tracé (plus sur le nœud).

### Résultat des contrôles finaux
- 320 / 390 / 768 / 1280 / 1440 px, FR et EN : **aucun scroll horizontal**, **zéro erreur console**.
- Démo : étapes, pause, reprise, rejeu, 10 clics rapides sans chevauchement, `prefers-reduced-motion`
  → état final (03) + navigation manuelle. Focus visible vérifié.
- Tous les contrôles passent (`controls.cjs` → ALL CONTROLS PASSED).

