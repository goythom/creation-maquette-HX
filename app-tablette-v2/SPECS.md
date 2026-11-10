# InstaFrame — App tablette · Design v2 · SPECS pour Lead Dev

Version maquette HTML/CSS (aucun code produit). Ouvrir `index.html` : sélecteurs **Direction (A/B/C) · Format · Langue · Safe areas · 1/2 colonnes**, état dans le hash (`#d=b&f=ap&l=fr&c=1`).
Périmètre : iPad et tablettes Android (Capacitor). L’**éditeur ne change pas** : il n’apparaît que comme destination (écran 11) avec un retour « Carnets ».

---

## 1. Principes communs aux 3 directions

| Sujet | Règle |
|---|---|
| Espaces | 3 : **Accueil**, **Reçus**, **Compte**. **Créer** = FAB (jamais un onglet). |
| Navigation | Rail/barre latérale à gauche dès **600 dp**. En dessous : barre du bas (voir §4). |
| Accueil | Galerie de couvertures de carnets, récents d’abord (section « Récents » puis « Plus anciens »). État vide dédié. |
| Onboarding | **Un seul écran**, bouton « Passer » toujours visible. Aucune permission, aucune connexion. |
| Connexion | Jamais au lancement. Demandée **en échange d’une valeur** : feuille contextuelle (ouvrir le Studio Album, synchroniser). Boutons Apple et Google **même taille, même hiérarchie** (aucun n’est orange). |
| Permissions | Demandées **au geste** (pré-prompt maison puis alerte système). Photos : sélecteur système, **sans permission**. |
| Reçus | Liste-détail à partir de **840 dp** ; en dessous, liste puis écran détail (push). |
| Compte | Ligne « Supprimer mon compte » **visible** (pas cachée dans un sous-menu) + écran de confirmation. |
| Orange lave `#e73b0d` | **Un seul aplat orange plein par écran** (accent, pas décor). Texte sur orange `#100808`. Exception volontaire : la feuille de connexion n’en a aucun (Apple/Google à parité). |
| Typographie | Corps **17/22**, titres d’écran **28–34**. Cibles tactiles **≥ 44 dp** (mesuré). |
| Stockage | Un carnet créé sans compte **reste sur la tablette, sans expiration**. Aucune mention « 1 h » nulle part. |
| Wording | Aucun prix, aucun Premium, aucun vocabulaire d’achat. |
| Hors ligne | Écran 10 : carnets locaux ouvrables, éléments « en ligne uniquement » grisés avec badge, bandeau jaune, « Réessayer ». |
| Langues | **EN par défaut**, **FR en tutoiement**, bascule dans Compte › Langue (suit la tablette par défaut). |
| Fond | Grands fonds uniquement `#F7F4F1` / `#FFFFFF`. Aucune grande zone sombre (mesuré < 5 % de l’écran). |
| Contraste | WCAG AA : textes ≥ 4.5:1, texte sur orange `#100808`. |

### Palette (identique dans les 3 directions)
`#fbc856` jaune · `#e73b0d` orange lave · `#a71d08` rouge · `#6d1308` bordeaux · `#370f0c` brun · `#100808` encre · `#2B2E33` anthracite (modulable : `#4B4D52 #6B6D70 #8A8C8F #AAABAD #C4C5C6 #D9DADA #E6E6E7 #F0F0F1`). Les rôles par direction sont dans la planche DA de `index.html`.

---

## 2. Les trois directions — tokens

### A — « Pixel atelier » (héritage Choix B, en plus calme)
Garde la signature pixel (filets 2 px, ombres dures bordeaux, Silkscreen en accent) mais la réserve aux moments forts. Cohérent avec le site validé.
```
radius: 4 · filet: 2px #100808 · ombre dure: 3px 3px 0 #6d1308 (3–6)
couverture: ratio 4/3 · icônes: trait 2, bouts carrés (miter)
rail: 88 px, icône + libellé Silkscreen 11 px majuscules · FAB: carré 64 px en tête de rail
actif: fond #a71d08, texte #F7F4F1, bord encre + ombre dure
police: DM Sans (700 titres 30/36 · 20/25 · corps 400 17/22 · légende 500 13/18) + Silkscreen 11–12 (accent)
motion: steps(3) 120 ms, jamais de ressort ; bouton translate(2px,2px) à l’appui ; feuille en 4 paliers 180 ms
densité: compacte, gouttière 16–20
```
### B — « Papier éditorial » (natif iPadOS, façon livre)
Barre latérale libellée dès 840 dp, grandes couvertures 4/5, titres serif, filets fins, ombres douces. La lave est une encre : rouge = actif, jaune = transitoire, orange = un geste.
```
radius: 16 cartes · 12 contrôles · pilule · filet 1px #D9DADA
ombre: 0 1px 2px rgba(16,8,8,.06), 0 12px 32px rgba(55,15,12,.10)
couverture: 4/5 · icônes: trait 1.5, arrondi
navigation: barre latérale 232 px (≥ 840) · rail 96 px (600–839)
FAB: pilule « + Créer » 200 px en pied de barre latérale (≥ 840) · rond 56 px dans le rail (portrait)
police: Fraunces 600 (titres 34/40, section 22/28) + Inter (corps 400 17/22, légende 500 13/18, accent 600 12 capitales)
motion: cubic-bezier(.2,.8,.2,1) 350 ms ; formSheet monte avec fondu du voile ; liste→détail glisse 280 ms
pastille de compteur Reçus: #6d1308 sur #F7F4F1
```
### C — « Objet tactile » (gros boutons, tuiles de couleur)
Formes très arrondies, FAB rond, les couleurs servent de code (tuiles), relief « touche enfoncée ».
```
radius: 28 cartes · 20 boutons/tuiles · rond · pas de filet
relief: 0 3–5px 0 #6d1308 (orange/rouge) ou #D9DADA (neutre) ; carte 0 2px 0 #E6E6E7 + 0 10px 24px rgba(55,15,12,.08)
couverture: 1/1 (carrées) · icônes: trait 2.5, arrondi, dans des tuiles 20 px de rayon
navigation: dock flottant arrondi 96 px (tuiles 56) · FAB rond 80 px en bas à droite
tuiles: Accueil jaune · Reçus rouge · Compte brun · Stickers encre · Vidéo anthracite
police: Nunito 800 (titres 32/38, section 22/28), corps 600 17/22, légende 700 13/18, accent 800 12 majuscules
motion: scale(.96) à l’appui, retour avec dépassement cubic-bezier(.34,1.56,.64,1) 280 ms ; tuiles de la feuille en cascade 30 ms
densité: généreuse, cibles 48–56
```
Polices : chargées depuis Google Fonts dans la maquette (repli système défini). **En production, embarquer les polices dans l’app** (hors ligne obligatoire).

---

## 3. Composants (communs, habillés par direction)

- **Bouton principal (orange)** : un seul par écran ; hauteur ≥ 48 ; libellé `#100808`. **Secondaire** : fond blanc/papier + bord ou relief neutre. **Destructif** : rouge `#a71d08`, texte `#F7F4F1`, jamais orange.
- **Bouton Apple / Google** : même hauteur (≥ 52), même largeur, même poids, même style (blanc + bord ou noir/blanc selon la charte officielle). **Les logos Apple et Google de la maquette sont des glyphes d’illustration : intégrer les logos officiels depuis les kits Apple (Sign in with Apple) et Google (Sign in with Google) en respectant leurs règles de marque.**
- **Couverture de carnet** : image + titre (1–2 lignes, jamais tronqué) + méta « 12 pages · Aujourd’hui » + badge (« Sur cette tablette », « Synchronisé », « Partagé », « Lecture seule », « En ligne uniquement »).
- **FAB Créer** : cible ≥ 56, ouvre la feuille Créer.
- **Feuille Créer** (formSheet/dialogue) : deux parcours (« Faire un cadre ou un élément » → éditeur ; « Nouveau carnet » → Studio Album, demande la connexion) + 7 types d’éléments + « Importer des photos » (Photos / Appareil photo / QR depuis mon téléphone).
- **Pré-prompt** : titre, 3 puces de réassurance, « Continuer » (orange) et une alternative sans permission. L’alerte système affichée est une illustration (non reproductible, texte fourni par l’OS via `Info.plist`).
- **Liste-détail Reçus** : liste à gauche (400 dp), détail à droite avec Ouvrir / Partager le lien / Retirer de la liste. Sélection conservée à la rotation.
- **Lignes de réglages** : hauteur ≥ 48, libellé + valeur, jamais tronqués (retour à la ligne autorisé).
- **Bandeau hors ligne** : jaune `#fbc856`, texte encre.

---

## 4. Breakpoints et navigation

Classes de taille (dp, largeur du conteneur) :

| Largeur | Navigation | Reçus | Accueil |
|---|---|---|---|
| **< 600** (non maquetté, tablette en split-screen / téléphone) | **Barre du bas** à 3 onglets (Accueil, Reçus, Compte), 56 dp + safe area bas ; **FAB** au-dessus à droite (A : 56 carré, B : rond 56, C : rond 72) ; contenu en 1–2 colonnes | liste → détail en push | 2 colonnes de couvertures |
| **600 – 839** (portrait des tablettes) | Rail à gauche (A 88, B 96, C 96 + dock) | liste seule, détail en push | 3 récents (A, C) ou 2 colonnes (B) + « Plus anciens » en 2–3 colonnes |
| **≥ 840** (paysage) | Rail (A, C) ou barre latérale 232 px libellée (B) | **liste + détail** | 3–4 grands récents + « Plus anciens » en 4 colonnes |

Les formats maquettés sont : iPad 1180×820 / 820×1180 et Android 1280×800 / 800×1280. Utiliser des **window size classes** (pas l’orientation) : le split-screen et Stage Manager doivent basculer selon la **largeur de fenêtre**. Safe areas : `env(safe-area-inset-*)` (haut ≈ 24 dp statut, bas ≈ 20 dp barre d’accueil ; aperçu avec la case « Safe areas »).

---

## 5. Flux

1. **Premier lancement → onboarding unique** (visuel + 3 étapes + « Commencer gratuitement » + « Passer ») → **Accueil** (vide si aucun carnet). Aucune permission ni connexion demandée.
2. **Créer (FAB)** → feuille Créer :
   - « Faire un cadre ou un élément » → **éditeur (inchangé)**, retour « Carnets » ;
   - « Nouveau carnet » (Studio Album) → si pas de compte : **feuille de connexion contextuelle** (valeur : ouvrir le Studio Album, synchroniser) ; « Plus tard » ferme sans rien perdre ;
   - « Importer des photos » : *Depuis Photos* → sélecteur système (PHPicker / Photo Picker Android, **sans permission**) ; *Prendre une photo* → **pré-prompt caméra** puis alerte système ; *QR* → demande une connexion.
3. **Micro** : même schéma au premier enregistrement vocal dans l’éditeur (pré-prompt « Micro », puis alerte).
4. **Permission refusée** : la ligne « Compte › Autorisations » indique « Non autorisé » + lien vers Réglages système ; l’alternative (Photos / QR) reste proposée.
5. **Reçus** : coller un lien → ajouté à la liste (lecture seule, sans compte).
6. **Compte** : Se déconnecter · Synchronisation · Langue · Autorisations · Aide & mentions · **Supprimer mon compte** (visible) → **écran de confirmation** (conséquences listées, « Garder mon compte » / « Supprimer le compte » destructif, lien web de demande de suppression).
7. **Hors ligne** : voir §7.

## 6. Stockage local sans expiration
- Tout carnet créé sans compte est enregistré **sur la tablette** (stockage de l’app) **sans date d’expiration**, tant que l’utilisateur ne le supprime pas.
- Badge « Sur cette tablette ». La connexion ajoute la synchronisation, elle ne déplace rien : « Les carnets de ta tablette restent ici, avec ou sans compte ».
- À la suppression du compte, les carnets uniquement locaux **restent** sur la tablette (écran 9, ligne 3).
- Aucun texte « 1 h » ni compte à rebours dans l’UI (vérifié par scan automatique EN + FR).

## 7. Hors ligne
Détection réseau (Capacitor Network). Bandeau jaune + puce « Hors ligne ». Carnets locaux : ouvrables. Carnets « En ligne uniquement » : grisés + badge. Synchronisation/partage/QR : en attente, bouton « Réessayer ». Le cache des carnets partagés (Reçus) pour lecture hors ligne est un **point ouvert** (voir §11).

---

## 8. Conformité stores
- **Apple 4.8** : si Google est proposé, **Sign in with Apple** doit l’être avec une parité de présentation (maquette : mêmes dimensions, même rang). Option « masquer mon e-mail » mentionnée.
- **Apple 5.1.1(v) / Google Play** : suppression de compte **initiée dans l’app** (ligne visible + confirmation) ; **Play** exige en plus une **URL web** de demande de suppression (lien en bas de l’écran 9). Révocation du jeton Apple à la suppression (`/auth/revoke`).
- **Permissions au contexte** : chaînes `NSCameraUsageDescription`, `NSMicrophoneUsageDescription` (iOS) ; Android : `CAMERA`, `RECORD_AUDIO` demandées au runtime au geste. **Photos : aucun accès global** (PHPicker / Photo Picker), donc pas d’entrée `NSPhotoLibraryUsageDescription` nécessaire pour la sélection.
- Confidentialité : lien « Confidentialité » et « Mentions légales » dans Compte et sous les boutons de connexion. Nutrition labels / Data Safety : à déclarer (compte, contenu utilisateur).
- Aucun achat intégré, aucun prix : pas de StoreKit / Play Billing.
- Logos Apple et Google : **kits officiels** (voir §3).

## 9. Chaînes (EN / FR)
Clés = `data-i` du HTML. Les noms de carnets sont des données fictives de maquette.

| Clé | EN | FR |
|---|---|---|
| `nav.home` | Home | Accueil |
| `nav.recv` | Received | Reçus |
| `nav.acct` | Account | Compte |
| `nav.create` | Create | Créer |
| `nav.main` | Main navigation | Navigation principale |
| `onb.skip` | Skip | Passer |
| `onb.eb` | Memory notebooks | Carnets de souvenirs |
| `onb.h` | Make them a notebook from your photos | Fais-leur un carnet avec tes photos |
| `onb.b` | Instax & Polaroid frames, stickers, music and your voice — all from your tablet. | Cadres Instax & Polaroid, stickers, musique et ta voix — tout depuis ta tablette. |
| `onb.s1` | Pick your photos | Choisis tes photos |
| `onb.s1b` | From your library or your camera | Depuis ta pellicule ou ton appareil photo |
| `onb.s2` | Add frames, stickers and music | Ajoute cadres, stickers et musique |
| `onb.s2b` | In the editor you already know | Dans l’éditeur que tu connais déjà |
| `onb.s3` | Send a link | Envoie un lien |
| `onb.s3b` | They open it for free, no account | La personne l’ouvre gratuitement, sans compte |
| `onb.note` | Free to start. No account needed — your notebooks stay on this tablet. | Gratuit pour commencer. Pas besoin de compte — tes carnets restent sur cette tablette. |
| `onb.start` | Start free | Commencer gratuitement |
| `onb.open` | Opened without an account | Ouvert sans compte |
| `onb.ro` | Read-only | Lecture seule |
| `b.local` | On this tablet | Sur cette tablette |
| `b.synced` | Synced | Synchronisé |
| `b.shared` | Shared | Partagé |
| `b.ro` | Read-only | Lecture seule |
| `b.only` | Online only | En ligne uniquement |
| `h.t` | My notebooks | Mes carnets |
| `h.sub` | 8 notebooks · saved on this tablet | 8 carnets · enregistrés sur cette tablette |
| `h.search` | Search notebooks | Rechercher un carnet |
| `h.recent` | Recent | Récents |
| `h.earlier` | Earlier | Plus anciens |
| `h.sort` | Newest first | Plus récents d’abord |
| `e.t` | Start with one frame | Commence par un cadre |
| `e.b` | Pick a photo, drop it into an Instax or Polaroid frame, then add it to a notebook. | Choisis une photo, mets-la dans un cadre Instax ou Polaroid, puis ajoute-la à un carnet. |
| `e.ideas` | Get ideas | Trouver des idées |
| `e.tip` | Tap Create to begin | Touche Créer pour commencer |
| `e.local` | Your notebooks are saved on this tablet — no account needed. | Tes carnets sont enregistrés sur cette tablette — sans compte. |
| `e.sh` | Notebooks people send you will appear in Received. | Les carnets que l’on t’envoie apparaîtront dans Reçus. |
| `e.sub` | No notebooks yet | Pas encore de carnet |
| `e.ph` | Your first notebook | Ton premier carnet |
| `c.t` | Create | Créer |
| `c.sub` | Choose how to start | Choisis comment commencer |
| `c.p1` | Make a frame or a piece | Faire un cadre ou un élément |
| `c.p1d` | Opens the generator | Ouvre le générateur |
| `c.p2` | New notebook | Nouveau carnet |
| `c.p2d` | Album Studio · needs a free account | Studio Album · demande un compte gratuit |
| `c.elh` | Pieces you can make | Éléments que tu peux créer |
| `t.frames` | Frames | Cadres |
| `t.postits` | Post-its | Post-its |
| `t.audio` | Audio | Audio |
| `t.music` | Music | Musique |
| `t.stamps` | Stamps | Timbres |
| `t.stickers` | Stickers | Stickers |
| `t.video` | Video | Vidéo |
| `c.imp` | Bring in photos | Importer des photos |
| `c.o1` | From Photos | Depuis Photos |
| `c.o1d` | Pick from your library | Choisis dans ta pellicule |
| `c.o2` | Take a photo | Prendre une photo |
| `c.o2d` | Opens the camera | Ouvre l’appareil photo |
| `c.o3` | From my phone (QR) | Depuis mon téléphone (QR) |
| `c.o3d` | Needs a connection | Demande une connexion |
| `c.close` | Close | Fermer |
| `p.eb` | Camera | Appareil photo |
| `p.h` | Take a photo straight into a frame | Prends une photo directement dans un cadre |
| `p.b` | The camera opens only when you tap “Take a photo”. You decide what goes into the frame. | L’appareil photo ne s’ouvre que quand tu touches « Prendre une photo ». Tu décides de ce qui entre dans le cadre. |
| `p.l1` | Only while the camera is open | Seulement quand l’appareil photo est ouvert |
| `p.l2` | Nothing is uploaded until you save or share | Rien n’est envoyé tant que tu n’enregistres ou ne partages pas |
| `p.l3` | Prefer not to? Pick from Photos or use a QR code. | Tu préfères non ? Choisis dans Photos ou utilise un QR code. |
| `p.go` | Continue | Continuer |
| `p.next` | Next, your tablet asks you to confirm. | Ensuite, ta tablette te demandera de confirmer. |
| `p.sys.cap` | System alert (illustration) | Alerte du système (illustration) |
| `p.sys.t` | “InstaFrame” would like to use the camera | « InstaFrame » souhaite utiliser l’appareil photo |
| `p.sys.b` | To take a photo and place it in a frame. | Pour prendre une photo et la placer dans un cadre. |
| `p.sys.no` | Don’t allow | Ne pas autoriser |
| `p.sys.ok` | Allow | Autoriser |
| `s.eb` | Album Studio | Studio Album |
| `s.h` | Sign in to open Album Studio | Connecte-toi pour ouvrir le Studio Album |
| `s.b` | A free account lets you place your pieces on black pages and keep your notebooks in sync across your tablets. | Un compte gratuit te permet de poser tes éléments sur des pages noires et de synchroniser tes carnets entre tes tablettes. |
| `s.v1` | Open Album Studio | Ouvrir le Studio Album |
| `s.v2` | Sync notebooks across your devices | Synchroniser tes carnets sur tous tes appareils |
| `s.v3` | Notebooks on your tablet stay here, account or not | Les carnets de ta tablette restent ici, avec ou sans compte |
| `s.apple` | Sign in with Apple | Se connecter avec Apple |
| `s.google` | Sign in with Google | Se connecter avec Google |
| `s.later` | Not now | Plus tard |
| `s.hide` | Apple lets you hide your email. | Apple te permet de masquer ton e-mail. |
| `s.legal` | By continuing you accept the Privacy policy and Legal notice. | En continuant, tu acceptes la politique de confidentialité et les mentions légales. |
| `r.t` | Received | Reçus |
| `r.paste` | Paste a notebook link | Colle un lien de carnet |
| `r.open` | Open | Ouvrir |
| `r.sub` | Notebooks people shared with you. Read-only, no account needed. | Les carnets que l’on t’a partagés. Lecture seule, sans compte. |
| `r.d.open` | Open notebook | Ouvrir le carnet |
| `r.d.share` | Share link | Partager le lien |
| `r.d.rm` | Remove from list | Retirer de la liste |
| `r.d.b` | Sent by Maya · 14 pages. You can read it, not edit it. | Envoyé par Maya · 14 pages. Tu peux le lire, pas le modifier. |
| `r.pick` | Select a notebook | Choisis un carnet |
| `a.t` | Account | Compte |
| `a.via` | Using Sign in with Apple | Connecté avec Apple |
| `a.out` | Sign out | Se déconnecter |
| `a.sync` | Sync | Synchronisation |
| `a.sync.v` | Up to date | À jour |
| `a.dev` | Stored on this tablet | Sur cette tablette |
| `a.dev.v` | 12 notebooks | 12 carnets |
| `a.lang` | Language | Langue |
| `a.lang.d` | Follows your tablet by default | Suit ta tablette par défaut |
| `a.prm` | Permissions | Autorisations |
| `a.ph` | Photos | Photos |
| `a.mi` | Microphone | Micro |
| `a.ca` | Camera | Appareil photo |
| `a.ok` | Allowed | Autorisé |
| `a.no` | Not allowed | Non autorisé |
| `a.na` | Asked when needed | Demandé au moment du besoin |
| `a.hl` | Help & legal | Aide & mentions |
| `a.faq` | Help & FAQ | Aide & FAQ |
| `a.tour` | Replay the intro | Revoir l’intro |
| `a.priv` | Privacy | Confidentialité |
| `a.leg` | Legal notice | Mentions légales |
| `a.ver` | Version | Version |
| `a.del` | Delete my account | Supprimer mon compte |
| `a.del.d` | Permanently erases your account and synced notebooks. | Efface définitivement ton compte et tes carnets synchronisés. |
| `a.me` | Your account | Ton compte |
| `d.h` | Delete your account? | Supprimer ton compte ? |
| `d.b` | This can’t be undone. Here is what happens: | Cette action est irréversible. Voici ce qui se passe : |
| `d.l1` | Your account and synced notebooks are erased from our servers. | Ton compte et tes carnets synchronisés sont effacés de nos serveurs. |
| `d.l2` | Links you shared stop working. | Les liens que tu as partagés cessent de fonctionner. |
| `d.l3` | Notebooks stored only on this tablet stay here until you delete them. | Les carnets présents seulement sur cette tablette y restent jusqu’à ce que tu les supprimes. |
| `d.l4` | Your connection with Apple is revoked. | Ta connexion avec Apple est révoquée. |
| `d.legal` | Some data may be kept where the law requires it. | Certaines données peuvent être conservées si la loi l’exige. |
| `d.keep` | Keep my account | Garder mon compte |
| `d.go` | Delete account | Supprimer le compte |
| `d.web` | You can also request deletion on the InstaFrame website. | Tu peux aussi demander la suppression sur le site d’InstaFrame. |
| `off.t` | You’re offline | Tu es hors ligne |
| `off.b` | Notebooks saved on this tablet still open. Syncing and sharing wait for a connection. | Les carnets enregistrés sur cette tablette s’ouvrent toujours. La synchronisation et le partage attendent la connexion. |
| `off.retry` | Retry | Réessayer |
| `off.chip` | Offline | Hors ligne |
| `off.sub` | 5 on this tablet · 3 online only | 5 sur cette tablette · 3 en ligne uniquement |
| `ed.back` | Notebooks | Carnets |
| `ed.tt` | Frame generator | Générateur de cadres |
| `ed.saved` | Saved | Enregistré |
| `ed.lbl` | The InstaFrame editor — unchanged | L’éditeur d’InstaFrame — inchangé |
| `ed.note` | Same screens and gestures as the website. The app only adds the way back. | Mêmes écrans et mêmes gestes que le site. L’app n’ajoute que le retour. |
| `ed.gen` | Generate | Générer |
| `nb1.t` | Biarritz, July | Biarritz, juillet |
| `nb1.m` | 12 pages · Today | 12 pages · Aujourd’hui |
| `nb2.t` | Mom’s 60th | Les 60 ans de maman |
| `nb2.m` | 24 pages · Yesterday | 24 pages · Hier |
| `nb3.t` | Road trip | Road trip |
| `nb3.m` | 9 pages · Nov 6 | 9 pages · 6 nov. |
| `nb4.t` | Lena & Tom | Lena & Tom |
| `nb4.m` | 18 pages · Nov 2 | 18 pages · 2 nov. |
| `nb5.t` | Class of ’26 | Promo ’26 |
| `nb5.m` | 31 pages · Oct 28 | 31 pages · 28 oct. |
| `nb6.t` | Grandpa’s garden | Le jardin de papi |
| `nb6.m` | 7 pages · Oct 19 | 7 pages · 19 oct. |
| `nb7.t` | New Year’s Eve | Réveillon |
| `nb7.m` | 15 pages · Oct 3 | 15 pages · 3 oct. |
| `nb8.t` | First apartment | Premier appart |
| `nb8.m` | 10 pages · Sep 21 | 10 pages · 21 sept. |
| `rx1.t` | Summer at the lake | Été au lac |
| `rx1.m` | From Maya · Today | De Maya · Aujourd’hui |
| `rx2.t` | For Léo’s 30th | Pour les 30 ans de Léo |
| `rx2.m` | From Camille · Yesterday | De Camille · Hier |
| `rx3.t` | Our first year | Notre première année |
| `rx3.m` | From Nora · Nov 5 | De Nora · 5 nov. |
| `rx4.t` | Mountain week | Semaine en montagne |
| `rx4.m` | From Hugo · Oct 30 | De Hugo · 30 oct. |
| `rx5.t` | Thank you, team | Merci, l’équipe |
| `rx5.m` | From Inès · Oct 22 | D’Inès · 22 oct. |

## 10. Notes pour le futur Figma
- **Une page Figma par écran** (11 pages × 3 directions, ou 3 fichiers) ; nom : `A/01-Onboarding`, … ; 4 frames par page (1180×820, 820×1180, 1280×800, 800×1280) + variante 599 (barre du bas).
- **Auto-layout partout** ; padding et gaps = tokens ci-dessus (grille de 4 dp). Composants avec variantes (état, taille, direction) ; styles de couleur = les 7 couleurs + échelle anthracite ; styles de texte = les rôles du §2.
- **Aucun texte détaché de son bouton** : le libellé est dans le composant (auto-layout, *hug* en largeur, *fill* en hauteur min 44). Pas de calque à plat posé sur un bouton.
- **Aucun chevauchement** entre calques frères ; FAB et feuilles = calques en `absolute position` à l’intérieur du frame, avec marge ≥ 16 dp du contenu défilant (réserve basse du contenu = hauteur FAB + 28).
- Textes : tester **FR (plus long)** ; retour à la ligne plutôt que troncature. Icônes : 24 dp, trait selon la direction.
- Logos Apple / Google : composants des kits officiels, pas les glyphes de la maquette.
- Éditeur : un seul frame « destination » (capture de l’existant), avec le retour.

## 11. Points ouverts
1. Pas de connexion par e-mail dans la maquette : Apple + Google uniquement (si e-mail ajouté plus tard, même hiérarchie).
2. Cache hors ligne des carnets reçus : à décider (produit).
3. URL Play de suppression de compte : à fournir (page du site).
4. La feuille de connexion n’a volontairement **aucun orange** (parité Apple/Google).
5. Le pré-prompt illustre la caméra ; micro identique (mêmes composants, chaînes à ajouter) ; Photos passe par le sélecteur système.
6. Barre du bas < 600 dp : décrite ici, non maquettée.
7. Choix de direction à trancher (A héritage / B natif / C tactile) avant Figma.

## 12. Vérifications automatiques effectuées (sans capture d’écran)
Chrome headless + jsdom, 11 écrans × 3 directions × 4 formats × EN/FR (264 états) : aucun débordement ni texte tronqué (hors cadre, scroll, ellipse, chevauchements), 1 seul aplat orange par écran (0 sur la connexion), cibles ≥ 44, contraste AA, 7 couleurs présentes par direction, aucune mention prix/achat/« 1 h », aucune erreur console. Revue visuelle humaine encore à faire.
