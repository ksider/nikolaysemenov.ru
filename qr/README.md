# QR Generator UI

A single-page QR code generator with extensive styling controls, logo support, and shareable configuration links.

## Features
- Encode arbitrary text or URLs.
- Control error correction level, output size, margins, module and corner styles.
- Fine-tune colors with a custom lightweight color picker.
- Place a center logo with adjustable size and padding.
- Copy sharable configuration links or reset to defaults in one click.
- Automatic locale detection (RU/EN) with manual language switcher.

## Getting Started
```bash
git clone https://github.com/<your-account>/<your-repo>.git
cd <your-repo>
open index.html   # macOS
# or
start index.html  # Windows
```
No build step is required—the project runs as a static page and can be deployed directly to GitHub Pages or any static hosting.

## Using The App
1. Open `index.html` in a browser.
2. Enter the text or URL you want to encode.
3. Adjust dimensions, colors, module shapes, and corner decorations as needed. The preview updates instantly.
4. Load a logo (PNG/JPG/SVG) if desired and tune its size/padding.
5. Press the chain-link icon in the header to copy a shareable link with the current settings (GET parameters).
6. Use the circular arrow icon to revert to the default configuration. Both icons become active only when your settings differ from the defaults.

### Tips & Caveats
- **Logo size:** Large logos can obstruct finder patterns. Test QR readability (especially near the 95% size limit with low padding) using multiple scanners.
- **URL parameters:** All controls—except language—are synchronized to the address bar. A clean URL equals the default state.
- **Logo files:** Transparent PNG/SVG assets work best. Heavy SVGs may need optimization for performance.

## Technical Stack
- `qr-code-styling` (bundled as `vendor/qr-code-styling.js`) for rendering.
- Custom vanilla JS state management with `history.replaceState` for URL sync.
- Inline lightweight color picker synced with native `<input type="color">`.
- Local storage preserves language preference between sessions.

## License

MIT License

Copyright (c) 2024.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
