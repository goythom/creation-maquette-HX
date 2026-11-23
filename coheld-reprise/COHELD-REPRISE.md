# Coheld : dossier de reprise et cahier des charges

23 novembre 2026 · Sources locales et référence inspectées.

## Mandat de reprise

### Objectif

Reprendre la maquette existante de Coheld et obtenir une page d’accueil sensiblement plus aboutie, dans l’esprit de slideshow.sh. Le résultat attendu est une composition et une démonstration produit convaincantes, pas un ajout d’effets à la version actuelle.

### Limite du dossier

Ce dossier fixe le travail à reprendre. Il ne constitue ni un nouveau design validé, ni une preuve que le niveau visuel visé est atteint. Aucun développement ou déploiement de Coheld n’a été réalisé pour le préparer.

### Priorité

L’accueil est la priorité de la reprise. Les autres pages et projets du site doivent être conservés. Le produit reste une plateforme collaborative de mémoire de travail indépendante des fournisseurs d’IA ; le partage est une fonction, pas toute la promesse.

## Ce qui existe réellement

### Sources locales à reprendre

Le paquet contient l’archive originale Coheld-markdown-sources-bd65b9f2.zip, reçue comme dernier aperçu livré le 23 novembre 2026 à 18 h 43, heure de Paris. Elle contient 16 pages HTML Coheld, ses polices, ses images et ses bibliothèques locales. Elle ne contient pas le board complet ni les autres projets du dépôt.

### Dépôt et distant

Dépôt vérifié : https://github.com/goythom/creation-maquette-HX . Le 23 novembre 2026, l’accueil distant lu à https://creation-maquette-hx.pages.dev/coheld/home.html présente encore un ancien accueil, avec le titre « Votre équipe. Ses assistants. Le contexte en commun. ». La lecture du fichier distant via GitHub ne contient ni coheld-refined ni brief.md. Ne pas confondre cette version et l’archive locale.

### Repère historique

Commit de V1 transmis dans l’historique : f067844bc467502d0d09fd2f767dbb1105a0a091. Ce n’est pas une affirmation sur le HEAD actuel. Avant modification : relever la branche, le commit courant, le statut de travail et les changements déjà présents.

### Publication

Les retouches locales de fin d’après-midi n’ont pas été publiées selon le suivi du projet ; la différence observée sur le distant est cohérente avec cet état. Le « Ok » de 18 h 44 n’autorise pas une publication. Toute mise en ligne doit faire l’objet d’un accord explicite.

## Démarrer sans casser l’existant

### Ouvrir l’archive

Décompresser l’archive originale dans un dossier de travail distinct. Depuis sa racine : python3 -m http.server 8080 . Ouvrir http://localhost:8080/coheld/home.html ; version anglaise : http://localhost:8080/coheld/home.html?lang=en . Ces adresses locales sont des instructions de lancement, pas des sites publiés.

### Points d’entrée

coheld/home.html : structure et contenu de l’accueil. coheld/coheld-refined.css : dernière couche de présentation. coheld/coheld-refined.js : démo, ouverture du dossier, langue et mouvement réduit. coheld/coheld.css et coheld/coheld-home.css : styles hérités. home.html contient aussi des styles intégrés, à inventorier avant de simplifier.

### Dépendances et contenus

coheld/vendor/motion.js et lucide.js sont locaux, avec notices de droits. La documentation de l’archive les identifie comme Motion 14.14.0 et Lucide 1.78.0 ; vérifier les versions si elles sont changées. Images : coheld/img/worktable.webp et collaboration.webp, générées et présentées comme illustratives. Exemples : coheld/examples/brief.md, decision.md et plan-accueil.md.

### Intégration prudente

Ne jamais remplacer la racine du dépôt par cette archive autonome. Comparer uniquement les fichiers Coheld concernés, dans une branche dédiée. Préserver les projets voisins, les 16 pages Coheld et les parcours FR/EN. Examiner les styles globaux et board.js avant toute modification susceptible d’affecter le board.

### Contrôle d’intégrité

Empreinte SHA-256 de l’archive originale : 798e80884403dc402acd5421a459b8e98e89b8d2bf7f6c6950f882a868a9c881. Le paquet la conserve inchangée.

## Exigences acquises à préserver

### Documents en Markdown

Les documents des projets doivent être des fichiers .md. Montrer cette nature dans la sélection, la transmission, la réception et le projet, pas seulement dans un badge. Le dernier aperçu utilise brief.md, decision.md, notes-privees.md exclu et plan-accueil.md en sortie. Les images peuvent être des ressources liées depuis le Markdown.

### Le bon locuteur

À réception, c’est l’assistant de Karim qui annonce à Karim que Camille lui a partagé des documents. Formulation de référence corrigée : « Camille m’a partagé des documents. » Ne pas remplacer cette parole par une notification autonome ou faire parler Camille à la place de l’assistant.

### Choix de partage

Le choix de transférer se fait depuis le chat avec l’assistant. Le scénario doit montrer précisément les documents choisis, les notes privées exclues, la source conservée et le choix de Karim d’utiliser le contexte. Ne pas suggérer un transfert automatique de tous les projets.

### Rôle de Coheld

Les personnes continuent de travailler dans leur assistant habituel. Coheld conserve, structure, rend consultable et permet de transmettre le contexte. Le site permet de vérifier, retrouver et exporter ; il ne doit pas transformer le produit en simple tableau de bord personnel.

### Visuels et mouvement

Des images et éléments graphiques sont demandés, pas uniquement des cartes de texte. Conserver une vraie animation et une démonstration lisible. Le dossier animé fait partie du dernier aperçu ; sa place peut être revue pour améliorer la composition, sans supprimer silencieusement la demande d’animation.

### Honnêteté produit

La maquette est illustrative : elle ne prouve ni connexion réelle aux assistants, ni stockage, collecte ou transfert opérationnels. Les accès possibles dépendent des fournisseurs. Ne pas inventer de compatibilités, de promesses de collecte universelle, de métriques clients ou de témoignages.

## Lecture de la référence Slideshow

### Observé sur le site

Inspection le 23 novembre 2026 de https://slideshow.sh/ : fond blanc cassé, noir et gris, accents ponctuels, titres courts à deux niveaux, grands espaces, traits de grille fins, navigation discrète et grande démonstration d’interface. La force vient du rapport entre composition, typographie, images et scénario.

### Images et interfaces

Les captures jointes montrent l’accueil, une galerie d’images, une scène d’assistant et un autre état de la démo. Les onglets changent réellement la scène. Les cartes plus bas contiennent des interfaces, images et résultats, pas seulement des textes explicatifs.

### Mouvement observé

Titre qui change de nom d’assistant, entrées en fondu et déplacement, galerie défilante, flottements légers, progression de tâches et changement de scène au clic. Des animations CSS sont présentes. Aucun besoin de copier leur code ou de migrer le projet vers leur framework n’est établi.

### À ne pas copier

Reprendre les principes de hiérarchie et de démonstration, pas leurs textes, images, logos, code ou identité. Les captures sont fournies comme références d’analyse, pas comme ressources à intégrer dans Coheld. Ne pas conclure à l’existence d’un template libre ou à l’usage d’une bibliothèque précise non vérifiée.

## Direction proposée, à valider

### Écran d’ouverture

Proposer une promesse courte sur le contexte partagé entre assistants, une action principale et une grande scène produit. Texte exact, couleur d’accent et composition ne sont pas encore validés. Ne pas recopier le slogan de Slideshow.

### Scène produit centrale

Proposition : une démonstration à étapes montrant le projet Markdown, le choix de brief.md et decision.md, leur transmission, puis l’annonce de l’assistant de Karim et la reprise du travail. Les quatre moments peuvent être regroupés ; le nombre d’onglets reste un choix de design.

### Suite de page

Deux ou trois scènes utiles peuvent expliquer la continuité du contexte, le partage choisi et la reprise du projet. Éviter la répétition de panneaux identiques. Chaque bloc doit montrer un objet ou un résultat du produit, avec peu de texte.

### Qualité attendue

Travailler proportions, alignements, contraste, espaces, recadrage et typographie avant les petits effets. Une bibliothèque d’animation ne corrige pas une mauvaise composition. Le noir et blanc est la direction héritée ; toute couleur supplémentaire doit être proposée, pas supposée validée.

### Ce qui reste insuffisant

Les itérations précédentes n’ont pas donné à Louis la confiance dans le niveau visuel. Le dernier aperçu est une base fonctionnelle et narrative, pas une validation esthétique. Le dossier et les scènes de chat ne doivent pas devenir des prétextes à conserver une composition faible. Ces constats demandent un vrai travail de design, ils ne sont pas résolus par ce cahier.

## Critères de validation et livraison

### Avant de développer

Lire ce dossier et les sources, ouvrir local et distant, inventorier les pages et dépendances, puis proposer une composition de l’ouverture avec sa scène clé. Faire juger un résultat visible sur ordinateur et téléphone avant d’étendre la nouvelle direction à toute la page.

### Narration

On comprend sans explication orale ce qu’est Coheld, ce qui est choisi, ce qui reste privé, qui reçoit et qui parle. Les mêmes fichiers et leur source sont cohérents avant et après transfert. La sortie Markdown est visible. Les noms de personnes sont fictifs dans la démonstration.

### Interactions

Vérifier étapes, pause, reprise et rejeu. Aucun chevauchement après plusieurs clics rapides ou relectures. La lecture ne doit pas dépendre d’une animation fugitive. Respecter prefers-reduced-motion avec état final compréhensible et navigation manuelle disponible. Les boutons et liens doivent annoncer leur véritable effet.

### Responsive et accès

Tester au minimum 320, 390, 768, 1280 et 1440 px en FR et EN. Pas de défilement horizontal de la page, texte coupé, recouvrement ou éléments hors écran. Navigation au clavier, focus visible, libellés accessibles et contraste lisible. Sur téléphone, recomposer les scènes au lieu de réduire tout le bureau.

### Technique

Pas d’erreur JavaScript dans les scénarios testés. Images et polices chargées, liens internes et exemples .md vérifiés. Examiner les images réelles des captures et les moments de transition. Ne pas annoncer 60 fps, accessibilité certifiée ou compatibilité complète sans mesure adaptée. Les anciens tests rapportés dans l’archive ne valident pas la reprise.

### Non-régression et remise

Vérifier les autres projets du board et les 16 pages Coheld avant/après intégration. Remettre sources modifiées, diff ou commit, instructions de lancement, liste des dépendances/licences, captures bureau/téléphone et courte vidéo de la démo. Fournir un aperçu consultable et un PDF de revue si le travail est poursuivi. Ne rien publier sans accord explicite.

## Décisions ouvertes et consigne de reprise

### À décider par le design

Titre final, disposition de l’ouverture, rôle du dossier, éventuel accent coloré, nombre de scènes, durée des séquences et choix des images. Les propositions ci-dessus sont des pistes, pas une liste de détails déjà approuvés.

### À vérifier techniquement

État courant du dépôt et du distant au moment de la reprise ; liens de navigation du board ; versions et licences avant toute mise à jour ; absence de secrets avant partage du dépôt ; comportement des autres pages si les styles communs changent.

### Consigne prête à transmettre

Reprends Coheld à partir de l’archive locale et du dépôt existant. Conserve les autres projets et les corrections produit listées ici. Vise la qualité de composition et de démonstration de slideshow.sh sans le copier. Commence par une ouverture et une scène produit convaincantes, montre le résultat sur ordinateur et téléphone, puis étends seulement après validation. Ne présente pas la maquette comme un produit connecté et ne déploie rien sans accord.

## Références visuelles

Captures du site slideshow.sh prises le 23 novembre 2026, fournies pour analyse seulement. Voir references/ dans le paquet.

- https://slideshow.sh/
- https://slideshow.sh/#find
- https://slideshow.sh/#make
- https://slideshow.sh/#agents
