# Usman Khan — Full Stack Developer Portfolio

Personal portfolio website showcasing my work as a full stack developer based in Lahore, Pakistan. Built with vanilla HTML, CSS and JavaScript — no frameworks, no build step.

**Live preview:** _Coming soon_

---

## ✨ Features

- **Scroll-driven hero** — portrait flip card animated with GSAP + ScrollTrigger
- **Stacking skill cards** — six service cards that layer on top of each other as you scroll
- **Filterable project grid** — portfolio page with category filters (Web Apps / Frontend), rendered from a single data file
- **Smooth scrolling** — Lenis on desktop (≥ 1000 px), native smooth scroll on mobile
- **Animated reveals** — blur-in entrance animations tied to scroll position
- **Infinite marquees** — footer banner and testimonial rail
- **FAQ accordion** — expand / collapse with animated height transitions
- **Off-canvas menu** — slide-in navigation with live Lahore clock (GMT+5)
- **Bottom nav pill** — floating navigation bar with layered backdrop blur
- **Multilingual preloader** — "Hello" letter-by-letter, then a cycling greeting in 10 languages
- **Copy-email button** — one click copies `usmankhan12587@gmail.com` to clipboard
- **Contact form** — falls back to `mailto:` (swap in a form service for production)
- **Fully responsive** — breakpoints at 640 px, 999 px and 1000 px+
- **SEO ready** — Open Graph, Twitter Card, canonical URL, semantic HTML

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5, semantic elements |
| Styling | Vanilla CSS (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6, no bundler) |
| Animation | [GSAP 3.12](https://gsap.com/) + ScrollTrigger |
| Smooth scroll | [Lenis 1.3](https://lenis.darkroom.engineering/) |
| Fonts | [Fontshare](https://www.fontshare.com/) + Google Fonts |

---

## 📁 Project Structure

```
├── index.html             # Homepage
├── portfolio.html         # Project grid page
│
├── css/
│   ├── base.css           # Design tokens, fonts, reset, global utilities
│   ├── sections.css       # All homepage section styles
│   ├── portfolio.css      # Work grid, filters, project cards
│   └── responsive.css     # Media queries (640 / 999 / 1000+)
│
├── js/
│   ├── main.js            # Core behaviour (preloader, scroll, menu, FAQ, form)
│   ├── work.js            # Project data array — edit to add/remove projects
│   ├── testimonials.js    # Testimonial data array
│   └── portfolio.js       # Grid renderer + category filtering
│
├── assets/
│   ├── img/               # Portrait photo, avatars, placeholders
│   ├── work/              # Project tile images (SVG title cards by default)
│   ├── video/             # Hero background video
│   └── fonts/             # Custom font files
│
├── _source/               # Reference material (do NOT deploy)
├── SETUP.md               # Detailed setup notes and TODO checklist
└── README.md              # ← You are here
```

---

## 🚀 Getting Started

No dependencies to install. Just serve the files:

```bash
# Python (3.x)
python -m http.server 4321

# Node (npx)
npx serve -l 4321

# VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then open [http://localhost:4321](http://localhost:4321).

---

## ⚙️ Configuration

All personal details live in two places:

### `js/main.js` (lines 10–11)

```js
var EMAIL    = 'usmankhan12587@gmail.com';
var TIMEZONE = 'Asia/Karachi';
```

### `index.html` / `portfolio.html`

- Page `<title>`, `<meta>` description, OG tags, canonical URL
- Hero text, eyebrow copy, about section
- Footer email and social links

---

## 📂 Adding a Project

Add an entry to `js/work.js`:

```js
{
  t: 'img',                              // 'img' or 'yt' (YouTube video ID)
  s: 'my-project.png',                   // filename in assets/work/
  title: 'Project Name',
  desc:  'One-line description.',
  stack: ['Laravel', 'Vue', 'MySQL'],
  c:     ['web-apps'],                   // categories: 'web-apps' | 'frontend'
  repo:  'https://github.com/UsmanJavedkhan/...',
  live:  'https://...'                   // optional — omit if not deployed
}
```

Drop the screenshot into `assets/work/`. The grid, filters and project count update automatically.

---

## 📝 Current Projects

| # | Project | Stack | Category |
|---|---------|-------|----------|
| 1 | [CANOPY Studio](https://github.com/UsmanJavedkhan/CANOPY-STUDIO) | React, Tailwind, Vite | Web App / Frontend |
| 2 | [RIHEF](https://github.com/UsmanJavedkhan/RIHEF) | React, Tailwind, Vite | Web App / Frontend |
| 3 | [News Aggregator](https://github.com/UsmanJavedkhan/news-aggregator-web-app) | React, shadcn/ui, Axios | Web App / Frontend |
| 4 | [E-Commerce](https://github.com/UsmanJavedkhan/E-commerce) | React, Material UI, Axios | Web App |
| 5 | [CV Uploader](https://github.com/UsmanJavedkhan/CV-uploader) | React, Tailwind, Vite | Web App |
| 6 | [SMILE Compiler](https://github.com/UsmanJavedkhan/Custom-Compiler) | Python, React, Vite | Web App |
| 7 | [File Uploader](https://github.com/UsmanJavedkhan/File-Uploader) | JavaScript, PHP | Web App |
| 8 | [Expense Tracker](https://github.com/UsmanJavedkhan/Expense-Tracker-) | HTML, Tailwind, JS | Frontend |
| 9 | [VisaPassport](https://github.com/UsmanJavedkhan/VisaPassport) | HTML, CSS | Frontend |

---

## 🌐 Deployment

This is a static site — deploy anywhere that serves HTML:

| Platform | How |
|----------|-----|
| **Vercel** | Import repo → zero config → deploy |
| **Netlify** | Drag-and-drop the project folder, or connect the repo |
| **GitHub Pages** | Settings → Pages → select branch |
| **Cloudflare Pages** | Connect repo → build command: _(leave empty)_ → output: `/` |

> **Before deploying:** update the canonical URLs in both HTML files from `example.com` to your real domain, and delete the `_source/` directory.

---

## 📋 Pre-Launch Checklist

- [ ] Set real domain in `<link rel="canonical">` and `og:url` (both pages)
- [ ] Add real social links in both footers (currently `#`)
- [ ] Replace or remove dummy testimonials in `js/testimonials.js`
- [ ] Fill in work experience section in `index.html`
- [ ] Replace hero background video with a properly licensed asset
- [ ] Wire up a form backend (Web3Forms / Formspree / Netlify Forms)
- [ ] Delete the `_source/` directory
- [ ] Replace SVG title cards in `assets/work/` with real screenshots

See [`SETUP.md`](SETUP.md) for the full breakdown.

---

## 📄 License

© 2025 Usman Khan. All rights reserved.
