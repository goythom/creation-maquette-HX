# Coheld, outils et aperçu
23 novembre 2026

Recommandation : garder le site HTML existant, intégrer Motion pour les animations et Lucide pour les SVG. Le saut de qualité vient d'une composition revue : promesse et objets du produit côte à côte, puis scénario A/B. Une migration React juste pour importer un bloc n'est pas justifiée pour cet aperçu.

| Outil | Licence vérifiée | Décision |
|---|---|---|
| Motion | MIT | Intégré, 14.14.0, séquence de partage et entrée des objets |
| Lucide | ISC, héritages MIT | Intégré, 1.78.0, trois icônes seulement embarquées |
| Magic UI | MIT | Option : Animated Beam, pas importé car composant React |
| shadcn/ui | MIT | Non importé, migration React/Tailwind inutile ici |
| Open Doodles | gratuit commercial/personnel selon le site | Option visuelle non intégrée ; ne pas l'étiqueter MIT |
| unDraw | licence spécifique | Non intégré ; gratuit n'est pas synonyme de MIT |

Le rendu reste noir et blanc, avec le logo central, des flèches fines, les mêmes personnages et le même choix du contexte. Les notes privées sont exclues, Karim accepte dans son chat, la source reste affichée. Les intégrations sont explicitement non validées. Le visuel principal est composé d'objets du produit, pas de photographies ou de dessins tiers copiés.

La démo est autonome et ne sollicite aucun assistant ou API. Aucun suivi analytique n'est ajouté. Les bibliothèques sont locales, pas servies par un CDN. Les notices de droits sont incluses. Les autres pages sont conservées, pas réauditées.

Vérifications : français et anglais, 320/390/701/820/1280/1440 px, étapes, pause/reprise, replay, mouvement réduit, absence d'erreur JavaScript dans les scénarios testés. Les vidéos en temps réel ne prouvent pas une performance native à 60 fps.

Aucun push et aucun déploiement. La proposition est à examiner avant toute mise en ligne.

## Sources et démos
- Motion, guide et démos : https://motion.dev/docs/quick-start
- Licence Motion : https://github.com/motiondivision/motion/blob/main/LICENSE.md
- Lucide, licence : https://lucide.dev/license
- Magic UI, démo : https://magicui.design/docs/components/animated-beam
- Magic UI, licence : https://github.com/magicuidesign/magicui/blob/main/LICENSE.md
- shadcn/ui, licence : https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
- Accessibilité des composants Radix : https://www.radix-ui.com/primitives/docs/overview/accessibility
- Open Doodles : https://www.opendoodles.com/
- unDraw, licence et exclusions : https://undraw.co/license
- Références de composition, pas des banques libres : https://basecamp.com/ ; https://mailcheap.ai/ ; https://mailchimp.com/fr/

## Reprise images, 23 novembre à 18h30
Demande : davantage d'images et d'éléments non textuels, plusieurs passes avant revue. Ajout d'une image originale générée d'un atelier créatif, d'une illustration originale générée de collaboration, de vignettes du même brief au départ et à la réception, d'un choix A/B dessiné, d'un diagramme de page et d'une couverture de projet. Le pied de page annonce que les images sont générées. Ces images ne sont pas présentées comme photos réelles, ressources open source ou images sous licence MIT.
Trois passes : premier placement ; proportions et cadrages ; sortie des feuilles du dossier avec masque et tests d'accessibilité. Le bouton Rejouer sur l'illustration relance le mouvement d'ouverture. La démonstration A/B reste distincte, avec ses propres contrôles. Les vidéos de revue contiennent un défilement de capture, pas un défilement imposé par le site.

## Précisions Markdown et voix du destinataire, 18h39
L’accueil représente maintenant brief.md, decision.md, notes-privees.md exclu et plan-accueil.md. Le projet montre le texte source Markdown et permet de télécharger un exemple .md réel. Les images restent des ressources liées depuis le Markdown. À réception, l’assistant de Karim dit que Camille lui a partagé des documents et demande s’il doit les ajouter au projet. Ce n’est plus présenté comme une notification indépendante. Trois fichiers .md fictifs sont inclus dans examples/. Ceci ne crée pas un backend et ne modifie pas le stockage d’un produit réel. Les pages secondaires sont encore celles de la maquette préexistante.
