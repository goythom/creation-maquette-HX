# Passation — Direction C « Deux conversations, un contexte » (accueil Coheld)

## Dépôt et branche

- Dépôt : `https://github.com/goythom/creation-maquette-hx`
- Branche de travail : `deepseek/coheld-accueil-ux` (déjà active, aucun commit effectué par l'agent — l'orchestrateur committe)
- Livrable : `coheld-propositions/direction-c-conversation/` (uniquement ce dossier ; **aucun autre fichier du dépôt n'a été modifié**)

## Résumé des changements

Proposition de niveau studio pour l'ouverture de Coheld, concept **« Deux conversations, un contexte »** :
deux fenêtres d'assistant crédibles (Camille à gauche, Karim à droite) et, entre elles, la **couche Coheld**
fine et structurée qui montre ce qui passe (`brief.md`, `decision.md`), ce qui reste privé (`notes-privees.md`)
et la source conservée.

Contenu livré (périmètre demandé : hero + scène produit + 2 scènes courtes) :

1. **Hero éditorial asymétrique** : eyebrow mono, titre à deux niveaux (« Deux conversations. » fin / « Un contexte commun. » massif), sous-titre court, CTA principal + lien secondaire, annotation éditoriale à droite, note d'honnêteté.
2. **Scène produit centrale** : démonstration interactive à 4 étapes — *Choisir → Transmettre → Reprendre → Produire* — qui change réellement le contenu des trois colonnes. L'assistant de Karim dit bien **« Camille m'a partagé des documents. »**, Karim choisit « Utiliser ce contexte », puis `plan-accueil.md` est produit (aperçu Markdown rendu). Contrôles : onglets cliquables, pause/lecture, rejeu, barre de progression.
3. **Scène A** (principe/confiance) : panneau de sélection de fichiers `.md` avec métadonnées, `notes-privees.md` exclu (cadenas + annotation manuscrite « reste privé »), source conservée.
4. **Scène B** (continuité) : `plan-accueil.md` rendu + bandeau « source .md » (nature Markdown visible), note « Karim reste dans son assistant habituel ».

Fonctionnalités : FR par défaut, EN via `?lang=en` (dictionnaire JS), `prefers-reduced-motion` (navigation manuelle seule, contrôles masqués, état lisible), focus visibles, libellés accessibles, zéro erreur console.

## Fichiers

```
coheld-propositions/direction-c-conversation/
├── index.html      # page autonome (hero + démo + 2 scènes + footer)
├── styles.css      # design system (tokens, grille, typo, responsive, reduced-motion)
├── app.js          # i18n FR/EN + rendu de la démo + contrôles lecture
├── NOTES.md        # constats de design + boucle de critique (4 tours)
├── HANDOFF.md      # ce document
└── captures/
    ├── desktop-1440.png        # hero au-dessus de la ligne de flottaison
    ├── desktop-1440-full.png   # page complète
    ├── mobile-390.png          # hero mobile
    ├── mobile-390-full.png     # page complète mobile
    └── demo-etape-2.png        # scène produit à l'étape « Reprendre »
```

Ressources référencées par chemin relatif (aucun CDN, aucun build, aucun React) :
- `../../coheld-reprise/sources-locales/fonts/` (Geist, Kalam)
- Aucune image ni capture tierce intégrée ; icônes 100 % inline SVG.

## Prérequis

- Aucune dépendance à installer. Fichiers statiques servis en HTTP.
- `python3` (ou n'importe quel serveur statique) pour la consultation locale.

## Étapes exactes de mise en ligne

1. Vérifier que la branche `deepseek/coheld-accueil-ux` est poussée :
   ```bash
   git checkout deepseek/coheld-accueil-ux
   git status --short          # doit montrer uniquement coheld-propositions/direction-c-conversation/
   git push -u origin deepseek/coheld-accueil-ux
   ```
2. Servir localement pour contrôle (depuis la racine du dépôt) :
   ```bash
   python3 -m http.server 8103
   # puis ouvrir :
   # http://localhost:8103/coheld-propositions/direction-c-conversation/index.html
   # http://localhost:8103/coheld-propositions/direction-c-conversation/index.html?lang=en
   ```
3. Si publication statique (ex. Cloudflare Pages déjà utilisé pour le projet) : exposer le dépôt tel quel et pointer sur `coheld-propositions/direction-c-conversation/index.html`. Aucun build requis.
4. **Ne rien fusionner dans `main`/`master`** et ne rien déployer en remplacement de l'accueil existant sans accord explicite (cf. cahier des charges).

## Vérifications après la mise en ligne

- Ouvrir `index.html` en FR et `?lang=en` : le titre, les libellés et la démo changent bien de langue.
- Largeurs 320 / 390 / 768 / 1280 / 1440 : **aucun défilement horizontal** (`scrollWidth <= clientWidth`), pas de texte coupé ni recouvrement.
- Démo : cliquer les 4 onglets ; tester pause → reprise → rejeu ; enchaîner 10 clics rapides (aucun chevauchement, état final = dernier onglet cliqué).
- `prefers-reduced-motion` (émuler dans DevTools → Rendering → Emulate CSS `prefers-reduced-motion: reduce`) : pas d'auto-play, contrôles masqués, navigation par onglets fonctionnelle, contenu lisible.
- Console navigateur : **zéro erreur** (aucune requête 404, aucune exception JS).
- Vérifier visuellement les captures `captures/*.png` (elles correspondent au rendu attendu).

## Points d'attention

- **Accent « or d'encre » `#B98A2F` = PROPOSITION** (signalée dans NOTES.md et dans les commentaires CSS). Il matérialise ce que Coheld tient : documents choisis, source conservée, étape active. Pour un rendu 100 % noir & blanc, remplacer `--accent`, `--accent-ink`, `--accent-soft` par des valeurs neutres dans `styles.css:root` (l'accent n'est jamais utilisé comme couleur de texte sur fond blanc, sauf `--accent-ink` sur fond `--accent-soft`, contraste AA vérifié).
- Honnêteté produit respectée : noms fictifs (Camille, Karim), note « maquette illustrative », aucune métrique, logo client, témoignage ou fausse intégration.
- Aucune capture tierce (slideshow.sh, Basecamp, etc.) n'est intégrée dans la page ; aucun texte/logo/slogan copié.
- La démo est illustrative : boutons « Partager »/« Utiliser ce contexte » sont des éléments visuels non interactifs (volontaire, pour ne pas simuler un produit connecté).
- Ne pas déplacer/renommer le dossier sans adapter les chemins relatifs `../../coheld-reprise/...`.

## Procédure de retour arrière

Le livrable est isolé dans un dossier neuf, sans aucune modification d'un autre fichier :
- Retirer le dossier `coheld-propositions/direction-c-conversation/` (ou ne pas l'incorporer) annule entièrement la proposition.
- Si la branche est déjà poussée : `git revert` du commit correspondant, ou suppression du dossier dans un commit de suivi.
