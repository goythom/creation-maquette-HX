# Coheld : copie 1:1 du vrai site

Les pages de ce dossier sont **générées depuis l'application Coheld** (dépôt `goythom/coheld`),
avec ses données de démonstration : même HTML, mêmes styles, mêmes polices, mêmes icônes que le site.
Elles servent à travailler une direction artistique homogène entre les pages.

- `*.html` : une page par écran (et par fenêtre : `connections-add`, `propose`, `import`).
- `site-assets/` : les feuilles de style, polices, logos et illustrations du site.
- `board.js` : la planche (onglet « Coheld » de la maquette), avec la liste des pages.

On peut retoucher ces fichiers pour essayer une idée ; pour la mettre dans le vrai site, la reporter
dans `goythom/coheld` (dossier `app/src`), puis régénérer la copie :

```bash
cd coheld/app && VITE_MOCK_BUILD=1 npx vite build --outDir /tmp/coheld-maquette
npx vite preview --outDir /tmp/coheld-maquette --port 4179
node scripts/maquette-copie.cjs ../../creation-maquette-hx/coheld
```
Puis recopier `/tmp/coheld-maquette/{assets,agents,img,fonts}` dans `coheld/site-assets/`
(sans les `.js`) et corriger les `url(/assets/…)` des CSS en `url(./…)`.
