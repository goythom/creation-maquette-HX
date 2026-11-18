# InstaFrame mobile V1 — parcours utilisateur

Version 0 mettait le site bureau dans un cadre 390 px. Rien n’était réellement utilisable : l’outil de création restait un atelier trois colonnes, le carnet demandait une connexion, et instaframe.fr bloque aujourd’hui le téléphone par un interstitiel « Made for desktop and tablet ». Cette V1 part d’un parcours mobile, pas d’une adaptation page à page.

## Qui arrive, et pourquoi

La personne arrive surtout depuis Instagram ou TikTok, déjà sur son téléphone : un lien, une frame vue en story, un carnet partagé. Elle veut faire *un* objet pour quelqu’un (une photo cadrée, un message, un timbre), tout de suite, sans compte. Elle n’est pas là pour composer un carnet sur un écran de 390 px.

Objectif produit (Louis) : convertir et faire découvrir l’outil. Le générateur, tâche courte et gratuite, est l’usage principal sur téléphone. L’éditeur de carnet n’est pas souhaité sur mobile : consultation / partage seulement, puis continuer sur tablette ou ordinateur.

## Références

Mobbin MCP (`search_flows` / `search_screens`) n’est pas utilisable ici : le connecteur répond « paid plan ». Les références ci-dessous sont donc des parcours publics, vérifiés sur les aides officielles des produits.

1. **Instagram Stories** — [Share a photo or video to your Instagram story](https://help.instagram.com/1257341144298972) et [How to Use Instagram Stories](https://about.instagram.com/blog/tips-and-tricks/how-to-use-instagram-stories). Trois gestes : capturer ou choisir un média, l’éditer (texte, sticker) sur un grand aperçu, partager par un bouton bas (« Your Story »). Pas de mur de compte au milieu de la création (l’app est déjà ouverte). On reprend : chemin court, aperçu dominant, une action primaire dans la zone du pouce.

2. **Canva mobile** — [Create designs using templates](https://www.canva.com/help/use-templates/) et [Using Canva’s Mobile App](https://mainframe.pixelhaze.academy/course/canva-design-basics-6-4-using-canvas-mobile-app/). On choisit d’abord un *type* de création, on édite avec une barre d’outils en bas (« + » pour ajouter photo ou texte), on partage / télécharge ensuite. Le mobile se limite aux tâches de base ; le travail avancé reste sur ordinateur. On reprend : choix du type avant l’atelier, options en bas, pas tout le bureau sur le téléphone.

3. **VSCO** — [Getting Started with the VSCO App](https://www.vsco.co/learn/getting-started-vsco) et [How to Use VSCO](https://support.vsco.co/en/articles/12698393-how-to-use-vsco). Après l’édition : Share to…, Save to Camera Roll, et seulement ensuite Post / Sync to Cloud (compte). On peut aussi commencer sur le téléphone et continuer sur l’éditeur web. On reprend : la valeur (l’image) avant le compte ; le passage téléphone → grand écran est un *après*.

4. **Unfold** — [Sharing stories on social media](https://help.unfold.com/hc/en-us/articles/360040989552-Sharing-stories-on-social-media). Après création : icône d’export, puis enregistrer ou partager, une page à la fois. On reprend : un écran résultat dédié, export d’abord, pas un atelier qui mélange encore les réglages.

5. **Apple HIG — Sheets** — [Human Interface Guidelines: Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets) (et la zone du pouce, cibles 44 pt). Les réglages et choix ponctuels montent depuis le bas ; l’action principale reste en bas de l’écran. On reprend : bottom sheet pour les options, barre d’action sticky, pas de barre d’outils dense en haut.

## Le plus court chemin vers un premier élément (≤ 3 écrans)

1. **Arrivée** — Une accroche, un seul bouton primaire « Start free ». Les types (« Try it – Photo », etc.) sont visibles, sans compte, sans interstitiel « big screens ».
2. **Créer** — Grand aperçu + une action (« Import a photo » / texte). Les réglages (Instax ou Polaroid, police…) sont dans une feuille basse, pas dans une colonne latérale. En ≤ 3 écrans depuis l’arrivée, la personne *voit* son résultat.
3. **Résultat** — L’élément est là, grand. « Download » et le partage sont immédiats. Le compte n’est proposé qu’ensuite, pour *garder* l’élément.

Si l’on arrive par « Try it – Photo », on saute le choix de type : Arrivée → Créer → Résultat.

## Quand on demande un compte

Jamais avant la première création. Après le résultat, un chemin secondaire : « Sign in with Google to use Album Studio. Your notebook saves automatically to your account. » (copie déjà existante). On peut télécharger et partager sans s’inscrire. « No account needed to start » reste vrai.

## Partage, téléchargement, puis le carnet

Sur l’écran résultat : Download, Share (libellés existants). « + Add to Gallery » peut enrichir une galerie locale, toujours après le résultat.

Le carnet n’est pas l’étape suivante sur le téléphone. Après un ou plusieurs éléments : écran de passage « Creating a notebook takes room. Open InstaFrame on your computer or tablet to bring your memories to life. » / « Shared notebooks stay accessible on your phone by link » / envoi par QR ou lien, comme les textes déjà présents sur `/phone` et l’interstitiel actuel. Pas d’éditeur, pas de glisser-déposer.

## Parcours en 7 étapes (ce que l’onglet doit permettre de parcourir)

1. Arriver sur l’accueil mobile (depuis un lien social).
2. Choisir un type, ou appuyer sur « Start free » (Photo par défaut).
3. Ajouter une photo ou un texte, voir le résultat se former (options en feuille basse).
4. Ouvrir l’écran résultat : télécharger ou partager, sans compte.
5. (Optionnel) S’inscrire pour sauvegarder l’élément.
6. (Optionnel) Envoyer vers un carnet : consigne de continuer sur tablette / ordinateur, lien ou QR.
7. (Optionnel) Parcourir Get Inspired en lecture, ou revenir créer un autre élément.

## Écrans de la V1

### Parcours principal (cliquable de bout en bout)

| id | Écran | Rôle |
| --- | --- | --- |
| home | Accueil | Accroche, « Start free », types « Try it », pas de mur de compte |
| type | Choisir un élément | Photo, Message, Audio, Music, Stamp, Sticker, Video. Les types Pro sont indiqués, mais mènent à un passage « continue on tablet/desktop », pas à l’atelier Pro |
| create | Créer | Un type à la fois. Grand aperçu, une action primaire, options en bottom sheet, barre sticky bas |
| result | Résultat | Élément grand, Download / Share, puis « Sign in to save » et « Add to a notebook » en secondaire |
| save | Sauvegarder | Connexion Google, uniquement si l’on a choisi de garder l’élément |
| handoff | Continuer le carnet | Textes existants, QR / lien, retour au générateur |

### Écrans utiles, allégés

| id | Écran | Rôle |
| --- | --- | --- |
| inspired | Get Inspired | Étagère et lecture d’un carnet, pas d’édition. CTA vers le générateur |
| album | Album Studio | Consultation / partage + handoff, pas l’éditeur |
| gallery | Éléments créés | Liste simple des éléments faits sur le téléphone |
| phone | Envoi de photos | Parcours `/phone` déjà pensé mobile (QR, grand écran) |
| share | Lien de carnet | Lecture d’un lien `/s/…` (y compris l’état « link is not valid ») |
| faq | FAQ | Lecture, lien vers le générateur |
| login | Connexion | Seulement depuis « save » |
| shop | Boutique | « The shop is taking shape » / « Nothing is available to buy yet » |
| legal | Confidentialité / mentions | Pages publiques, accès depuis le pied |

### Écrans volontairement absents ou réduits à un renvoi

- Owner, Admin : pas dans le parcours visiteur.
- Éditeur de carnet (studio ouvert, outils texte / forme, démo locale d’édition).
- Ateliers Pro détaillés (lettre, conversation, date, combinaison, bandes 3/5) : une feuille « Pro » + handoff, pas l’outil complet.
- Checkout / suivi boutique : pas de parcours d’achat (rien n’est à vendre).
- Workbench compte / paramètres bureau : après connexion, on reste sur la galerie mobile et le handoff.

## Principes d’interface (tous les écrans)

- Une seule action primaire par écran, style `.hv-btn-fill` (orange `#e73b0d`, texte `#100808`, bord 2 px, ombre 3 px `#6d1308`, hauteur 44 px).
- Barre d’action sticky en bas, dans la zone du pouce.
- Options dans une feuille basse, pas dans une barre d’outils dense.
- Aperçu grand ; le contenu se lit en haut, on agit en bas.
- Cibles 44 px, écarts 16 / 4 px, anneau de focus 2 px `#100808` décalé de 3 px, flèches PageArrow 16 px, désactivé `#e5e0da` / `#92908b`.
- Textes et types existants uniquement (EN / FR). Pas de nouvelle fonctionnalité, pas de nouveau texte marketing.
- Parcours cliquable de bout en bout à 390 px (et 320 px).
