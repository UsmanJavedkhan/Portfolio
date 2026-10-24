
document.addEventListener('DOMContentLoaded', function () {

  // ------- helpers -------
  function normSlug(raw){
    const s = (raw || '').toLowerCase().trim();
    const map = {
      'all':'all',
      'video':'video-motion','motion':'video-motion','video-motion':'video-motion','video / motion':'video-motion',
      'web':'web-ui-ux','web & ui/ux':'web-ui-ux','ui/ux':'web-ui-ux',
      'graphic':'graphic-design','graphic design':'graphic-design'
    };
    return map[s] || s.replace(/\s+/g,'-');
  }

  function headerOffset(){
    const header = document.querySelector('.fusion-header, #wrapper .fusion-is-sticky');
    return header?.offsetHeight || (document.body.classList.contains('admin-bar') ? 120 : 88);
  }

  function scrollToEl(el){
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function getFiltersBar(sectionEl){
    // Avada uses any of these
    return sectionEl?.querySelector('.fusion-filters, .fusion-post-cards-filters, .filters, [aria-label="Post Filters"]');
  }

  function applyFilterInSection(sectionEl, slug){
    const bar = getFiltersBar(sectionEl);
    if (!bar) return false;
    let target;
    const s = normSlug(slug);
    if (!s || s === 'all'){
      target = bar.querySelector('.fusion-filter-all a, a[data-filter="*"]');
    } else {
      target = bar.querySelector(`a[data-filter=".${s}"]`);
    }
    if (target){ target.click(); return true; }
    return false;
  }

  function applyWhenReady(sectionEl, slug){
    if (applyFilterInSection(sectionEl, slug)) return;
    const obs = new MutationObserver(() => {
      if (applyFilterInSection(sectionEl, slug)) obs.disconnect();
    });
    obs.observe(sectionEl, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 2500);
  }

  // ------- sections you have -------
  const desktopSection = document.getElementById('work-postcards');     // change if your desktop ID is different
  const mobileSection  = document.querySelector('.mobile-postcards');   // your cloned mobile grid

  // ------- click routing, works from anywhere on the page -------
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[href*="#pc="], a[href*="#pcm="]');
    if (!a) return;

    const href = a.getAttribute('href') || '';
    const m = href.match(/#pcm?=([^&]+)/);
    if (!m) return;

    e.preventDefault();
    const slug = normSlug(decodeURIComponent(m[1]));

    // If the link used #pcm= force mobile grid. If #pc= decide by viewport.
    const forceMobile = href.includes('#pcm=');
    const useMobile = forceMobile || window.matchMedia('(max-width: 641px)').matches;

    const targetSection = useMobile ? mobileSection : desktopSection;
    if (!targetSection) return;

    applyWhenReady(targetSection, slug);
    scrollToEl(targetSection);

    // keep separate hash keys to avoid collisions
    const key = useMobile ? 'pcm' : 'pc';
    history.replaceState(null, '', `#${key}=${slug}`);
  });

  // ------- deep link on load -------
  (function initFromURL(){
    const hash = location.hash;
    let slug = null, key = null;

    const m1 = hash.match(/^#pcm=([^&]+)/);
    const m2 = hash.match(/^#pc=([^&]+)/);

    if (m1) { slug = decodeURIComponent(m1[1]); key = 'pcm'; }
    else if (m2) { slug = decodeURIComponent(m2[1]); key = 'pc'; }

    if (!slug) return;

    const useMobile = (key === 'pcm') || window.matchMedia('(max-width: 641px)').matches;
    const targetSection = useMobile ? mobileSection : desktopSection;
    if (!targetSection) return;

    requestAnimationFrame(() => {
      applyWhenReady(targetSection, slug);
      scrollToEl(targetSection);
    });
  })();

  // ------- keep hash in sync when user taps Avada tabs inside each section -------
  function syncTabs(sectionEl, key){
    const bar = getFiltersBar(sectionEl);
    if (!bar) return;
    bar.querySelectorAll('a[data-filter]').forEach(tab => {
      tab.addEventListener('click', function(){
        const df = this.getAttribute('data-filter') || '';
        const slug = df === '*' ? 'all' : df.replace(/^\./,'');
        history.replaceState(null, '', `#${key}=${slug}`);
      });
    });
  }
  if (desktopSection) syncTabs(desktopSection, 'pc');
  if (mobileSection)  syncTabs(mobileSection,  'pcm');

});

