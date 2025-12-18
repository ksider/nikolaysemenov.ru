# FTIR Merger roadmap (ideas)

- **Export & sharing**
  - [x] Export/import session (uploaded spectra, stripes, baseline choice, offsets) as a JSON to restore a workspace.
  - [x] Copy chart as PNG/SVG with legend and stripes.
  - Inline “copy visible CSV” respecting visibility/baseline/offsets.

- **Stripes & peak intelligence**
  - [x] Allow multiple stripe sets (e.g., “candidate peaks”, “confirmed peaks”) with toggles.
  - Bulk add stripes from typed ranges (e.g., `1710-1730`) or paste from CSV.
  - Quick filters on the tips DB; highlight matches directly on chart.
  - Show nearest library match on hover/marker, not only on added stripes.

- **Baseline & corrections**
  - Polynomial/spline baseline fit with preview and apply/revert.
  - Per-series smoothing (Savitzky–Golay) and normalization (max=1 or area=1).
  - Auto-align peaks between series (cross-correlation) for easier comparison.

- **Chart UX**
  - Toggle stacking/offset view vs. absolute; quick “reset offsets” button.
  - Snap marker to nearest peak; show delta between two markers.
  - Keyboard navigation between peaks/stripes; hotkeys for zoom presets.
  - Mini-map/overview for large datasets; zoom presets (full, 4000–500, custom).

- **Data handling**
  - Detect headers/units in TXT, allow column mapping.
  - Support other formats (CSV with multiple spectra, JCAMP-DX).
  - Caching parsed files; warn on inconsistent x-grids, offer resampling.

- **Internationalization**
  - Switchable tips DB language; plug multiple DB files.

- **Quality-of-life**
  - Theme toggle (light/dark), font size slider.
  - Persistent user settings (language, baseline choice, offsets) in local storage.
  - Error banner/log area instead of console-only errors.

- **Testing & validation**
  - Add sample datasets and scripted regression checks for merge/offset/baseline.
  - Visual regression snapshots for chart rendering on key flows.
