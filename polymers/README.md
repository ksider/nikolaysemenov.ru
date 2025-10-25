# Interactive Polymer Flow Map

This repository hosts a fully client-side map that helps lab technicians and students identify plastics by walking through a bilingual decision tree. The interface combines a zoomable canvas, rich result cards, and a console that records every answer, making it easy to compare observations and retrace steps.

## Features
- Flowchart-driven workflow that narrows polymers by answering guided inspection questions.
- Zoomable, pannable canvas with smooth pointer and touch interactions for large-screen navigation.
- Bilingual Russian/English UI that toggles labels, copy, and material data in real time.
- History console, progress tracker, and restart/back controls to revisit or reset decisions.
- Alternative simplified view (`classic.html`) for quick reference without the spatial layout.

## How It Works
1. `index.html` ships the entire application (markup, styling, and JavaScript) as a single static asset.
2. The `flow` object in the script defines every decision node, branch, and result in both Russian and English.
3. Runtime code renders nodes onto a 4200×4200 canvas, draws SVG Bézier connectors, and keeps the latest step centred on screen.
4. User input mutates a state machine that tracks the active question, selected options, and resulting material details.
5. Controls update copy, analytics hooks, and accessibility attributes to keep the UI keyboard- and screen-reader-friendly.

## Data Source
- [Plastics Identification Flow Chart – Stanmech Technologies Inc.](https://www.stanmech.com/articles/plastics-identification-flow-chart#:~:text=Plastics%20Identification%20Flow%20Chart%20-%20Articles,Roofing)


## Technology Stack
- HTML5 and modern CSS (custom layout, gradients, glassmorphism effects).
- Vanilla JavaScript for rendering, state management, and gesture handling.
- Yandex.Metrika snippet for optional analytics.
- No external build tooling or runtime dependencies.

## Getting Started
- Open `index.html` directly in any modern browser to explore the interactive map.
- Use the language switcher to toggle between Russian and English nomenclature.
- Click `Simplified flowchart` in the control panel to fall back to the linear `classic.html` experience.

## Adding Another Language
1. Update the `supportedLanguages` array near the top of the script in `index.html` to include your new ISO language code (for example, `'de'`).
2. Add a matching language button inside the `.lang-switcher` markup so users can pick the new locale; set `data-lang="de"` and the visible label.
3. Extend every entry in the `uiText` object with the new language key, duplicating the structure used for `ru` and `en`.
4. For each node in the `flow` object (questions, results, materials), provide translations for the new language so prompts, descriptions, and result cards render correctly.
5. Translate any additional text collections such as `mapText` to keep tooltips and helper copy consistent.
6. Optionally adjust `defaultLang` detection logic if you want the interface to prefer your new locale for specific audiences.

## License
This project is released under the MIT License. See `LICENSE` for details.
