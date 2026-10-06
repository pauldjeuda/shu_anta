# SHU ANTA — Landing

Landing page fidèle à la maquette « sage », marque SHU ANTA (Cameroun).

## Démarrage

```bash
npm install
pip install pillow numpy rembg onnxruntime
# optionnel vectorisation : pip install vtracer
npm run process:logo
npm run process:images
npm run dev
```

Ouvrir http://localhost:5173

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run process:logo` | Extraction logo → `public/brand/` |
| `npm run process:images` | Slots → `public/images/` |
| `npm run compare` | Captures Playwright (`COMPARE_URL`) |

Overlay maquette (dev) : `?overlay=1` puis touches `O` / `[` / `]` — nécessite `design/reference-card.png`.

## Contenu

Textes provisoires dans `src/content/landing.ts`.
