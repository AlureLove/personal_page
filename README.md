# personal_page

My personal page — 今日も私は出かける. The page is one day's walk down a Tokyo street: scroll to walk.

- `index.html` — the stops, in street order. Each `.stop` has `data-x` (where the walker stands) and `data-h` (time of day).
- `js/i18n.js` — all text in English, Chinese and Japanese. Edit content here (and the English fallback in `index.html`).
- `js/main.js` — language switch, scroll → walk progress, route bar.
- `js/scene.js` — the street itself (three.js, low-poly, rendered small and scaled up as pixels).
- `css/styles.css` — cards, route bar, signs.
- `img/apps/` — app icon and screenshots.

Static files only; open `index.html` or serve the folder.
