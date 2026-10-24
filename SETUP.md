# Setup — what's done, what's left

Site: **Usman Khan — Full Stack Developer**

Run it:

```bash
python -m http.server 4321
```

---

## Done

- Name, email, location, timezone (`Asia/Karachi`), page titles, OG tags
- Your photo on the flip card (front and back) and the portfolio CTA avatar
- Hero: `USMAN` / `KHAN`, "Full Stack Developer", "Laravel · React · Vue"
- 6 skill cards covering full-stack work (stacking deck, sticky offsets 80 → 130px)
- Portfolio categories: **Web Applications / Frontend**
- FAQ: 8 questions and answers written for dev work

---

## Left to do

### 1. Project screenshots — `assets/work/`

Your 10 GitHub projects are already in `js/work.js` with real names, descriptions,
tech stacks and repo links. What they **don't** have is real imagery — each tile is
a generated title card (project name + stack on a branded background).

**To use a real screenshot:** take one, save it over the matching file in
`assets/work/`, and change the `.svg` to your extension in `js/work.js`. Nothing
else needs touching. Landscape works best (the tiles are 1200×820).

| File | Project |
|---|---|
| `canopy-studio.svg` | CANOPY Studio |
| `rihef.svg` | RIHEF |
| `news-aggregator.svg` | News Aggregator |
| `ecommerce.svg` | E-Commerce |
| `cv-uploader.svg` | CV Uploader |
| `smile-compiler.svg` | SMILE Compiler |
| `file-uploader.svg` | File Uploader |
| `expense-tracker.svg` | Expense Tracker |
| `visa-passport.svg` | VisaPassport |

**Adding a project** — one entry in `js/work.js`:

```js
{
  t: 'img', s: 'my-project.png',
  title: 'Project name',
  desc:  'What it actually does, in one line.',
  stack: ['Laravel', 'Vue'],
  c:     ['web-apps'],
  repo:  'https://github.com/UsmanJavedkhan/...',
  live:  'https://...'          // omit if not deployed
}
```

Categories: `web-apps`, `frontend`. Grid, filters and counts update
automatically. `t: 'yt'` with a YouTube video ID also works.

**Two things to fix on GitHub:**

- The Cinematix deploy (`cinematix-online-movie-ticket-booki.vercel.app`) returns
  **404** — the deployment is gone. I left the project out until it's back; redeploy
  it and I'll add it.
- Only CANOPY Studio has a working live link. Deploying the others (Vercel is free
  for Vite apps) would make a real difference — a live demo beats a screenshot.

Also swap the 4 featured tiles on the homepage — `index.html`, under `.portfolio__grid`.

### 2. Content still on placeholder

| Section | Where |
|---|---|
| Stats marquee ("X+ Years", "X+ Projects") | `index.html` → `.stats-marquee` |
| Awards (5 rows) | `index.html` → `.awards__list` — **delete the whole `<section class="awards">` if you have none** |
| Work experience (5 rows) | `index.html` → `.workexperience` |
| Testimonials (10) | `js/testimonials.js` — **dummy data**, named "Client Name 01…10". Replace or remove before launch |

Adding skill cards: each needs a `--sticky-top` 10px higher than the previous
(they stack on scroll). Currently 80 → 130px.

### 3. Check my assumptions

I wrote the skill tool-lists from what you told me. Strike anything you don't
actually use — a few I inferred rather than got from you:

- OAuth, payment gateway integration (skill 05)
- Queues & scheduled jobs, Blade (skill 02)
- VPS hosting, SSL setup, deploy migrations (skill 07)
- Tailwind CSS (skills 01 and 03)

### 4. Before publishing

- [ ] Real domain in `<link rel="canonical">` and `og:url` — both files say `example.com`
- [ ] Social links in both footers are `href="#"`
- [ ] **Contact form has no backend** — it opens the visitor's mail app. If they have
      no mail client set up, the message is lost. Fix with Web3Forms / Formspree /
      Netlify Forms, then replace `initForm()` in `js/main.js`
- [ ] **Replace the hero background video.** `assets/video/abstract-white-...savetube.me_.mp4`
      came from the site this layout was rebuilt from, and the filename suggests it was
      pulled off YouTube. Licensing unclear — swap it for a loop you have rights to, or
      delete the `.hero-video` block
- [ ] Delete `_source/` — reference material only, must not ship
- [ ] **Replace or delete the dummy testimonials** in `js/testimonials.js` — sample copy attributed to "Client Name 01…10", not real people
- [ ] Confirm the FAQ timelines (1–2 / 2–4 / 4–8 weeks) and post-launch support terms match what you actually offer
- [ ] Only claim awards, testimonials and roles that are genuinely yours

---

## Where things live

```
index.html          homepage
portfolio.html      project grid
css/    base.css        tokens, fonts, reset
        sections.css    every homepage section
        portfolio.css   work grid + filters
        responsive.css  breakpoints (640 / 999 / 1000+)
js/     main.js         EMAIL + TIMEZONE at the top, all page behaviour
        work.js         project list
        testimonials.js testimonial list
        portfolio.js    grid render + filtering
assets/ img/ work/ video/
_source/            reference only — delete before deploy
```
