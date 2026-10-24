/* ==========================================================================
   main.js — all page behaviour.
   Ported 1:1 from the original site's inline scripts, with the Avada-specific
   plumbing swapped for plain DOM equivalents.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- EDIT THESE TWO ------------------------------------------------- */
  var EMAIL = 'usmankhan12587@gmail.com';  // copy-email button + contact form target
  var TIMEZONE = 'Asia/Karachi';           // IANA zone for the header/hero clock
  /* --------------------------------------------------------------------- */

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     1. Preloader — "Hello" then cycling greetings  (original script-17)
     ====================================================================== */
  function initPreloader() {
    var preloader = document.getElementById('custom-preloader');
    if (!preloader || preloader.dataset.init === '1') return;
    preloader.dataset.init = '1';

    var lastSeg = location.pathname.replace(/\/+$/, '').split('/').pop().toLowerCase();
    var isPortfolio = lastSeg === 'portfolio' || lastSeg === 'portfolio.html';

    function hidePreloader() {
      preloader.classList.add('hidden');
      setTimeout(function () { preloader.style.display = 'none'; }, 500);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        preloader.classList.add('hidden');
        preloader.style.display = 'none';
      }
    });
    window.addEventListener('pagehide', function () {
      preloader.classList.add('hidden');
      preloader.style.display = 'none';
    });

    if (isPortfolio) {
      preloader.innerHTML =
        '<div class="preloader-stack">' +
          '<div class="preloader-emoji" aria-hidden="true">👀</div>' +
          '<div class="preloader-title">' +
            '<span class="preloader-line preloader-line-1"></span>' +
            '<span class="preloader-line preloader-line-2"></span>' +
          '</div>' +
        '</div>';

      var line1 = 'Welcome';
      var line2 = 'to my world!';
      var l1 = preloader.querySelector('.preloader-line-1');
      var l2 = preloader.querySelector('.preloader-line-2');
      var d = 0, i, s;

      for (i = 0; i < line1.length; i++) {
        s = document.createElement('span');
        s.textContent = line1[i];
        s.style.animationDelay = (d += 0.04) + 's';
        l1.appendChild(s);
      }
      d += 0.04;
      for (i = 0; i < line2.length; i++) {
        s = document.createElement('span');
        s.textContent = line2[i] === ' ' ? ' ' : line2[i];
        s.style.animationDelay = (d += 0.04) + 's';
        l2.appendChild(s);
      }

      requestAnimationFrame(function () { preloader.classList.add('portfolio-mode'); });
      setTimeout(hidePreloader, 3000);
      return;
    }

    /* Default preloader: "Hello" letter-by-letter, then greetings cycle */
    var holder = document.createElement('span');
    holder.id = 'custom-preloader-text';
    preloader.innerHTML = '';
    preloader.appendChild(holder);

    var firstWord = 'Hello';
    for (var k = 0; k < firstWord.length; k++) {
      var span = document.createElement('span');
      span.textContent = firstWord[k];
      span.style.animationDelay = (k * 0.1) + 's';
      holder.appendChild(span);
    }

    var greetings = ['Ciao', 'Hola', 'Salut', '你好', 'Привет',
                     'Hallo', 'Olá', 'Selam', 'مرحبا', 'Dia Dhuit'];
    setTimeout(function () {
      var index = 0;
      var t = setInterval(function () {
        if (index >= greetings.length) { clearInterval(t); hidePreloader(); return; }
        holder.textContent = greetings[index++];
      }, 140);
    }, 1500);
  }

  /* ======================================================================
     2. Local time clock  (original script-19)
     ====================================================================== */
  function initClock() {
    function getTimeString() {
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TIMEZONE
      }).format(new Date());
    }
    function updateAllTimes() {
      var t = getTimeString();
      document.querySelectorAll('#local-time, #local-time-phone, .js-local-time')
        .forEach(function (el) { el.textContent = t; });
    }
    updateAllTimes();
    var now = new Date();
    var ms = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(function () {
      updateAllTimes();
      setInterval(updateAllTimes, 60000);
    }, Math.max(0, ms));
  }

  /* ======================================================================
     3. Lenis smooth scroll — desktop only  (scripts 11 + 27)
     ====================================================================== */
  var lenis = null;
  function initLenis() {
    if (reduceMotion) return;
    if (window.innerWidth < 1000) return;            // torn down below 1000px
    if (typeof window.Lenis !== 'function') return;

    lenis = new window.Lenis({ smoothWheel: true, lerp: 0.1, duration: 1.2 });
    window.lenis = lenis;

    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
    }
  }

  function killLenis() {
    if (!lenis) return;
    try { lenis.destroy(); } catch (e) {}
    lenis = null;
    window.lenis = null;
    document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
    document.documentElement.style.removeProperty('height');
    document.body.style.removeProperty('height');
    if (window.gsap && window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  /* Smooth anchor scrolling that works with or without Lenis */
  function initAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -20 });
      else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      closeMenu();
    });
  }

  /* ======================================================================
     4. Hero flip-card scroll timeline  (original script-18)
     ====================================================================== */
  function xRight() { return Math.min(420, window.innerWidth * 0.25); }
  function yDown1() { return 70; }

  function buildCardTimeline() {
    var gsap = window.gsap;
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=5150',
        scrub: 1.2,
        pin: '.card-pin',
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    tl.to('.scroll-card', {                                  // Phase 1
      x: xRight, y: yDown1, rotationZ: 8, rotationY: 0, scale: 1,
      ease: 'power1.inOut', duration: 0.2
    })
    .to('.scroll-card', {                                    // Phase 2 — flip
      rotationY: 180, rotationZ: 0, ease: 'power2.inOut', duration: 0.45
    })
    .to('.scroll-card', {                                    // Phase 3 — scale up
      scale: 1.18, ease: 'power1.inOut', duration: 1.2
    })
    .to('.scroll-card', {                                    // Phase 4 — scale down
      scale: 1, ease: 'power1.inOut', duration: 0.4
    })
    .to('.scroll-card', {                                    // Phase 5
      x: xRight, y: yDown1, rotationY: 180, ease: 'none', duration: 0.6
    })
    .to('.scroll-card', {                                    // Phase 6 — flip back
      rotationY: 360, ease: 'power2.inOut', duration: 0.5
    });

    return tl;
  }

  /* Fade the card out as #about arrives  (original script-25) */
  function buildCardFade() {
    var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
    var section = document.querySelector('#about');
    if (!section) return;

    ScrollTrigger.getAll().forEach(function (st) {
      if (st.vars && st.vars.id === 'cardFadeController') st.kill();
    });

    gsap.fromTo('.card-pin', { autoAlpha: 1 }, {
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: {
        id: 'cardFadeController',
        trigger: section,
        start: 'top top',
        end: '+=20%',
        scrub: true,
        onLeave: function () { gsap.set('.card-pin', { autoAlpha: 0 }); },
        onLeaveBack: function () { gsap.set('.card-pin', { autoAlpha: 1 }); },
        onEnterBack: function (self) {
          gsap.set('.card-pin', { autoAlpha: gsap.utils.mapRange(0, 1, 0, 1, self.progress) });
        }
      }
    });
  }

  /* ======================================================================
     5. Scroll reveals — blur-in  (original script-20, generalised)
     ====================================================================== */
  function initReveals() {
    var gsap = window.gsap;
    var items = document.querySelectorAll('.reveal');

    if (reduceMotion || !gsap || !window.ScrollTrigger) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    items.forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, filter: 'blur(8px)' },
        {
          opacity: 1, filter: 'blur(0px)', ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 60%', scrub: true }
        }
      );
    });

    /* Work-experience rows fade in and back out, exactly as before */
    gsap.utils.toArray('.workexperience .job').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, filter: 'blur(8px)' },
        {
          opacity: 1, filter: 'blur(0px)', ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 70%', scrub: true }
        }
      );
    });
  }

  /* ======================================================================
     6. Copy-email button + toast  (original script-23)
     ====================================================================== */
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'nik-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('is-visible'); });
    setTimeout(function () {
      t.classList.remove('is-visible');
      setTimeout(function () { t.remove(); }, 250);
    }, 1600);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; })
        .catch(function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      var input = document.createElement('input');
      input.value = text;
      input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.appendChild(input);
      input.focus({ preventScroll: true });
      input.select();
      input.setSelectionRange(0, text.length);
      var ok = document.execCommand('copy');
      input.remove();
      return ok;
    } catch (e) { return false; }
  }

  function initCopyMail() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.copy-mail-btn');
      if (!btn) return;
      e.preventDefault();
      copyText(EMAIL).then(function (ok) {
        if (ok) toast('Mail copied!');
        else { window.location.href = 'mailto:' + EMAIL; toast('Couldn’t copy, opening mail…'); }
      });
    }, { passive: false });
  }

  /* ======================================================================
     7. Layered backdrop blur behind the bottom nav  (original script-24)
     ====================================================================== */
  var BLUR_LAYERS = [[42, 60], [30, 74], [20, 88], [12, 96]];
  var BLUR_OPTS = { height: 180, minWidth: 1000, zBelowNav: 9998, ink: 'rgba(0,0,0,0.001)' };

  function navH() {
    var n = document.querySelector('.main-bottom-nav');
    return n ? Math.ceil(n.getBoundingClientRect().height) : 0;
  }

  function ensureBlur() {
    var wrap = document.getElementById('nik-bottom-blur');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'nik-bottom-blur';
      wrap.setAttribute('aria-hidden', 'true');
      document.body.appendChild(wrap);
    }

    Object.assign(wrap.style, {
      position: 'fixed', left: 0, right: 0,
      bottom: (navH() + 14) + 'px',
      height: BLUR_OPTS.height + 'px',
      pointerEvents: 'none',
      zIndex: String(BLUR_OPTS.zBelowNav),
      display: window.innerWidth < BLUR_OPTS.minWidth ? 'none' : 'block'
    });

    wrap.querySelectorAll('.nik-blur-layer').forEach(function (n) { n.remove(); });

    BLUR_LAYERS.forEach(function (pair) {
      var blurPx = pair[0], topStop = pair[1];
      var layer = document.createElement('div');
      layer.className = 'nik-blur-layer';
      var bf = 'blur(' + blurPx + 'px) saturate(1.05) contrast(1.02)';
      Object.assign(layer.style, {
        position: 'absolute', inset: '0',
        backdropFilter: bf, WebkitBackdropFilter: bf,
        background: BLUR_OPTS.ink,
        maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) ' + topStop + '%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) ' + topStop + '%)'
      });
      wrap.appendChild(layer);
    });
  }

  /* ======================================================================
     8. Off-canvas menu
     ====================================================================== */
  function openMenu() {
    var oc = document.getElementById('oc-menu');
    var btn = document.querySelector('.menu-toggle');
    if (!oc) return;
    oc.hidden = false;
    requestAnimationFrame(function () { oc.classList.add('is-open'); });
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (lenis) lenis.stop();
  }

  function closeMenu() {
    var oc = document.getElementById('oc-menu');
    var btn = document.querySelector('.menu-toggle');
    if (!oc || !oc.classList.contains('is-open')) return;
    oc.classList.remove('is-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (lenis) lenis.start();
    setTimeout(function () { oc.hidden = true; }, 350);
  }

  function initMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var oc = document.getElementById('oc-menu');
    if (toggle) toggle.addEventListener('click', openMenu);
    if (oc) {
      oc.addEventListener('click', function (e) {
        if (e.target === oc || e.target.closest('.oc-close')) closeMenu();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* Reset sticky active states on nav buttons  (original script-22) */
  function initNavReset() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.menu-btn');
      if (!btn) return;
      setTimeout(function () {
        btn.blur();
        btn.classList.remove('active', 'is-active', 'awb-active');
      }, 150);
    });
  }

  /* ======================================================================
     9. FAQ accordion
     ====================================================================== */
  function initFaq() {
    document.querySelectorAll('.faq__q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq__item');
        var panel = item.querySelector('.faq__a');
        var inner = panel.firstElementChild;
        var isOpen = item.classList.contains('is-open');

        /* close siblings */
        item.parentElement.querySelectorAll('.faq__item.is-open').forEach(function (other) {
          if (other === item) return;
          other.classList.remove('is-open');
          other.querySelector('.faq__a').style.height = '0px';
          other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        });

        if (isOpen) {
          panel.style.height = '0px';
          item.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          panel.style.height = inner.offsetHeight + 'px';
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
        if (window.ScrollTrigger) setTimeout(window.ScrollTrigger.refresh, 400);
      });
    });
  }

  /* ======================================================================
     10. Marquees + testimonial rail
     ====================================================================== */
  function buildMarquee(el) {
    var track = el.querySelector('.marquee__track');
    var group = track.querySelector('.marquee__group');
    if (!group || track.children.length > 1) return;

    var clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);

    var speed = parseFloat(el.dataset.speed || '60');   // px per second
    var dist = group.scrollWidth;
    track.style.setProperty('--marquee-duration', (dist / speed) + 's');
  }

  function initMarquees() {
    document.querySelectorAll('[data-marquee]').forEach(buildMarquee);
  }

  function initTestimonials() {
    var track = document.querySelector('[data-tst-track]');
    var data = window.NIK_TESTIMONIALS;
    if (!track || !data) return;

    function card(t) {
      var el = document.createElement('figure');
      el.className = 'tst-card';
      var q = document.createElement('blockquote');
      q.className = 'tst-card__quote';
      q.textContent = t.q;
      var cap = document.createElement('figcaption');
      cap.innerHTML = '<span class="tst-card__name"></span><br><span class="tst-card__meta"></span>';
      cap.querySelector('.tst-card__name').textContent = t.n;
      cap.querySelector('.tst-card__meta').textContent = t.s + ' · ' + t.d;
      el.appendChild(q);
      el.appendChild(cap);
      return el;
    }

    data.forEach(function (t) { track.appendChild(card(t)); });
    data.forEach(function (t) {                      // duplicate for seamless loop
      var c = card(t);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });

    var half = track.scrollWidth / 2;
    track.style.setProperty('--tst-duration', (half / 40) + 's');  // 40 px/s
  }

  /* ======================================================================
     11. Contact form
     ====================================================================== */
  function initForm() {
    var form = document.querySelector('.contact__form');
    if (!form) return;
    var status = form.querySelector('.form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = form.querySelectorAll('[required]');
      var ok = true;
      required.forEach(function (f) {
        if (f.type === 'radio') {
          if (!form.querySelector('input[name="' + f.name + '"]:checked')) ok = false;
        } else if (!f.value.trim()) ok = false;
      });

      if (!ok) {
        status.textContent = 'Please fill in every required field.';
        return;
      }

      /* No backend yet — hand the message off to the mail client. */
      var data = new FormData(form);
      var body =
        'Name: ' + (data.get('name') || '') + '\n' +
        'Role: ' + (data.get('role') || '') + '\n' +
        'Email: ' + (data.get('email') || '') + '\n' +
        'Status: ' + (data.get('status') || '') + '\n\n' +
        (data.get('message') || '');

      window.location.href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent('Project enquiry from ' + (data.get('name') || 'the website')) +
        '&body=' + encodeURIComponent(body);

      status.textContent = 'Opening your mail app…';
    });
  }

  /* ======================================================================
     Boot
     ====================================================================== */
  function boot() {
    initPreloader();
    initClock();
    initMenu();
    initNavReset();
    initFaq();
    initMarquees();
    initTestimonials();
    initCopyMail();
    initForm();
    initAnchors();
    ensureBlur();
    setTimeout(ensureBlur, 200);
    setTimeout(ensureBlur, 1000);
  }

  function bootMotion() {
    initLenis();

    if (window.gsap && window.ScrollTrigger && !reduceMotion) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.matchMedia({
        '(min-width: 501px)': function () {
          buildCardTimeline();
          requestAnimationFrame(function () { window.ScrollTrigger.refresh(); });
        }
      });
      buildCardFade();
    }
    initReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(bootMotion); });
  });

  /* Resize handling */
  var wasDesktop = window.innerWidth >= 1000;
  window.addEventListener('resize', function () {
    ensureBlur();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();

    var isDesktop = window.innerWidth >= 1000;
    if (wasDesktop && !isDesktop) killLenis();
    else if (!wasDesktop && isDesktop && !lenis) initLenis();
    wasDesktop = isDesktop;
  });
  window.addEventListener('orientationchange', ensureBlur);
})();
