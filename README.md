# Nikolai Semenov — Portfolio Site

Static single-page profile with polymer R&D projects, hosted at `nikolaysemenov.ru`. This folder mirrors the production files, including custom styles and media assets.

## Development and publishing

The production page is assembled from Nunjucks templates in `src/`; do not edit
the legacy root `index.html`. Each visible section is in
`src/_includes/components/`, the common document head is in
`src/_includes/layouts/base.njk`, and the existing LESS sources remain in
`styles/`.

```bash
npm install
npm run build
```

The command writes a complete publishable site to `_site/`. GitHub Actions
deploys that folder to GitHub Pages after a push to `main`.

- `/black/` is copied unchanged into every build and remains available at the
  same URL.


## Live Examples

- [QR landing (`/qr`)](https://nikolaysemenov.ru/qr) — lightweight promo with dynamic code snippets.  
- [Interactive Plastic Identification (`/polymers`)](https://nikolaysemenov.ru/polymers/) — visual tool that showcases material expertise.

## CV

**Nikolai Semenov**  
Polymer Scientist & Engineer  
Email: [semenov.ne@gmail.com](mailto:semenov.ne@gmail.com)

### Experience

1. **Bpacks Lab — Head of R&D**  
   Lead the development of bio-based materials sourced from tree bark and biopolymers, translating lab formulations into thermoformable and injection-moldable trays and cups, coordinating pilot runs and validation with partner labs.

2. **BEREZKA — Co-founder & Head of Development**  
   Built plant-based composites that disintegrate in seawater; produced and tested pilot batches of cups and cutlery and verified home-compostable performance across the product line.

3. **Institute of Applied Mechanics RAS — Scientist**  
   Conducted research on polymer rheology and reinforcement theory, focusing on smart materials while mentoring early-career researchers inside the lab.

### Education

- **PhD** — Mechanics of Fluid, Gas, and Plasma  
- **Engineer & BSc** — Materials Science and Technology of New Materials

### Contacts

- LinkedIn: [linkedin.com/in/nikolay-semenov](https://www.linkedin.com/in/nikolay-semenov/)  
- X (Twitter): [x.com/Ksider](https://x.com/Ksider)  
- YouTube: [@SemenovNicolay](https://www.youtube.com/@SemenovNicolay)  
- Telegram: [t.me/nikolaysemenov](https://t.me/nikolaysemenov)  
- WhatsApp: [wa.me/79265749813](https://wa.me/79265749813)
