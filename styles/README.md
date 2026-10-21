# Styles Documentation

## Structure

```
styles/
├── main.less          # Главный файл - импортирует все модули
├── variables.less     # CSS переменные (цвета, шрифты, радиусы)
├── base.less          # Базовые стили (* reset, body, page)
├── typography.less    # Типографика (h1, a, meta, chip, etc.)
├── grid.less          # Сетка и утилиты layout (grid, cluster, gap)
├── components.less    # Компоненты сайта (hero, cards, modal, etc.)
├── responsive.less    # Медиа-запросы для адаптивности
├── print.less         # Стили для печати
└── main.less          # Точка входа сборки, импортирует модули выше
```

## Build

### One-time compilation
```bash
npm run build:css
```

### Auto-compilation (watch mode)
```bash
npm run build
```

### Manual compilation
```bash
npx lessc styles/main.less _site/styles.css
```

## Usage

1. Edit `.less` files in the `styles/` directory
2. Run `npm run build` to compile LESS and render the Nunjucks templates
3. The generated page in `_site/index.html` references `_site/styles.css`

## File Descriptions

### variables.less
- Color palette (paper, ink, accent, amber, moss, plum, slate)
- Radius values (sm, md, lg)
- Font families (display, body, mono, highlight)
- Grid and cluster gap sizes

### base.less
- Box-sizing reset
- HTML scroll behavior
- Body styles
- Page container
- Section styles
- Plain list styles

### typography.less
- Base body typography
- Link styles
- Focus styles
- Headings (h1)
- Eyebrow text
- Role line
- Highlight font
- Section head (with dot and label)
- Meta items
- Chip styles

### grid.less
- Grid layout system
- Cluster (flexbox) layout system
- Gap utilities (2xs, xs, sm, md, lg, xl)
- Responsive grid behavior

### components.less
- Hero section
- Avatar
- Tags & Badges
- Cards (experience, education)
- Achievement lists
- Callout
- Link buttons
- Footer
- Vibecode grid
- Modal/Dialog
- Lightbox
- Side navigation

### responsive.less
- Breakpoints for tablet (900px) and mobile (640px)
- Adjustments for page padding, hero, cards, etc.

### print.less
- Print-specific styles
- Hides dialogs, side nav, decorative elements
- Adjusts card borders for printing
