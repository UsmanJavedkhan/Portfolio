/* ==========================================================================
   Portfolio projects — pulled from github.com/UsmanJavedkhan

     t     'img' → s is a file in assets/work/ ; 'yt' → s is a YouTube video ID
     s     media source
     title project name
     desc  one line, what it actually does
     stack technologies used
     c     categories: 'web-apps' | 'frontend'
     repo  GitHub URL
     live  deployed URL (omit if there isn't one)

   The tiles in assets/work/ are generated title cards. Replace any of them
   with a real screenshot of the running app — same filename, and nothing
   else needs changing.
   ========================================================================== */
window.NIK_WORK = [
  {
    t: 'img', s: 'canopy-studio.svg',
    title: 'CANOPY Studio',
    desc: 'Site for an architecture studio, with a slide-in nav and project pages built as one long horizontal strip that vertical scrolling glides sideways through.',
    stack: ['React', 'Tailwind', 'React Router', 'Vite'],
    c: ['web-apps', 'frontend'],
    repo: 'https://github.com/UsmanJavedkhan/CANOPY-STUDIO',
    live: 'https://canopy-studio-two.vercel.app'
  },
  {
    t: 'img', s: 'rihef.svg',
    title: 'RIHEF',
    desc: 'Course platform with a product grid, cart dialog, multi-step checkout, order summary and payment details.',
    stack: ['React', 'Tailwind', 'Vite'],
    c: ['web-apps', 'frontend'],
    repo: 'https://github.com/UsmanJavedkhan/RIHEF'
  },
  {
    t: 'img', s: 'news-aggregator.svg',
    title: 'News Aggregator',
    desc: 'News reader pulling a live feed, with search, category filtering, date filtering and a trending section.',
    stack: ['React', 'shadcn/ui', 'Axios', 'Tailwind'],
    c: ['web-apps', 'frontend'],
    repo: 'https://github.com/UsmanJavedkhan/news-aggregator-web-app'
  },
  {
    t: 'img', s: 'ecommerce.svg',
    title: 'E-Commerce',
    desc: 'Storefront with product listings, detail pages, a cart, login and an admin form for adding products.',
    stack: ['React', 'Material UI', 'Tailwind', 'Axios'],
    c: ['web-apps'],
    repo: 'https://github.com/UsmanJavedkhan/E-commerce'
  },
  {
    t: 'img', s: 'cv-uploader.svg',
    title: 'CV Uploader',
    desc: 'Upload a CV and get it back as a structured profile — snapshot, skills, education and experience cards, plus a search page.',
    stack: ['React', 'Tailwind', 'Vite'],
    c: ['web-apps'],
    repo: 'https://github.com/UsmanJavedkhan/CV-uploader'
  },
  {
    t: 'img', s: 'smile-compiler.svg',
    title: 'SMILE Compiler',
    desc: 'A compiler built from scratch: lexer, parser, semantic analysis, three-address code, optimizer and code generation, with a web frontend.',
    stack: ['Python', 'React', 'Vite'],
    c: ['web-apps'],
    repo: 'https://github.com/UsmanJavedkhan/Custom-Compiler'
  },
  {
    t: 'img', s: 'file-uploader.svg',
    title: 'File Uploader',
    desc: 'Front-end upload flow backed by a PHP endpoint that validates and stores the files.',
    stack: ['JavaScript', 'PHP'],
    c: ['web-apps'],
    repo: 'https://github.com/UsmanJavedkhan/File-Uploader'
  },
  {
    t: 'img', s: 'expense-tracker.svg',
    title: 'Expense Tracker',
    desc: 'Interface for logging spending and tracking it against a budget.',
    stack: ['HTML', 'Tailwind', 'JavaScript'],
    c: ['frontend'],
    repo: 'https://github.com/UsmanJavedkhan/Expense-Tracker-'
  },
  {
    t: 'img', s: 'visa-passport.svg',
    title: 'VisaPassport',
    desc: 'Multi-page marketing site for visa and passport services — application steps, expedited options and an FAQ.',
    stack: ['HTML', 'CSS'],
    c: ['frontend'],
    repo: 'https://github.com/UsmanJavedkhan/VisaPassport'
  }
];
