/* ==========================================================================
   portfolio.js — renders the work grid, category filtering and YouTube facades.
   Deep links use the original's hash format: #pc=<slug>
   ========================================================================== */
(function () {
  'use strict';

  var grid = document.querySelector('[data-work-grid]');
  if (!grid || !window.NIK_WORK) return;

  var countEl = document.querySelector('[data-work-count]');
  var filters = [].slice.call(document.querySelectorAll('.work-filter'));

  var LABELS = {
    '*': 'projects',
    'web-apps': 'web applications',
    'frontend': 'frontend projects'
  };

  function normSlug(raw) {
    var s = (raw || '').toLowerCase().trim();
    var map = {
      'all': '*', '*': '*',
      'web': 'web-apps', 'webapps': 'web-apps', 'web apps': 'web-apps',
      'web-applications': 'web-apps', 'web applications': 'web-apps',
      'front': 'frontend', 'front-end': 'frontend', 'ui': 'frontend',
      'frontend / ui': 'frontend', 'frontend/ui': 'frontend'
    };
    return map[s] || s.replace(/\s+/g, '-');
  }

  /* ---------------------------------------------------------------- render */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function buildCard(item, index) {
    var card = el('article', 'work-card');
    card.dataset.cats = item.c.join(' ');

    var inner = el('div', 'work-card__inner');
    var media = el('div', 'work-card__media');

    if (item.t === 'yt') {
      var btn = el('button', 'yt-facade');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Play ' + (item.title || 'video'));
      btn.dataset.id = item.s;
      btn.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + item.s + '/hqdefault.jpg)';
      btn.appendChild(el('span', 'yt-facade__play'));
      media.appendChild(btn);
    } else {
      var img = document.createElement('img');
      img.src = 'assets/work/' + item.s;
      img.alt = item.title || 'Project ' + (index + 1);
      img.loading = index < 4 ? 'eager' : 'lazy';
      img.decoding = 'async';
      media.appendChild(img);
    }
    inner.appendChild(media);

    /* Text block — only rendered when the project carries metadata */
    if (item.title) {
      var body = el('div', 'work-card__body');
      body.appendChild(el('h2', 'work-card__title', item.title));
      if (item.desc) body.appendChild(el('p', 'work-card__desc', item.desc));

      if (item.stack && item.stack.length) {
        var ul = el('ul', 'work-card__stack');
        item.stack.forEach(function (s) { ul.appendChild(el('li', null, s)); });
        body.appendChild(ul);
      }

      var links = el('div', 'work-card__links');
      if (item.live) {
        var a = el('a', 'work-link work-link--primary', 'Live site');
        a.href = item.live;
        a.target = '_blank';
        a.rel = 'noopener';
        links.appendChild(a);
      }
      if (item.repo) {
        var g = el('a', 'work-link', 'Source');
        g.href = item.repo;
        g.target = '_blank';
        g.rel = 'noopener';
        links.appendChild(g);
      }
      if (links.children.length) body.appendChild(links);

      inner.appendChild(body);
    }

    card.appendChild(inner);
    return card;
  }

  window.NIK_WORK.forEach(function (item, i) { grid.appendChild(buildCard(item, i)); });

  /* Click a facade → swap in the real player, autoplaying. */
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('.yt-facade');
    if (!btn) return;
    var id = btn.dataset.id;
    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube.com/embed/' + id +
                '?autoplay=1&rel=0&playsinline=1&enablejsapi=1';
    frame.title = 'YouTube video player';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    btn.replaceWith(frame);
  });

  /* ---------------------------------------------------------------- filter */
  function applyFilter(slug, push) {
    var s = normSlug(slug) || '*';
    var shown = 0;

    [].forEach.call(grid.children, function (card) {
      var match = s === '*' || (card.dataset.cats || '').split(' ').indexOf(s) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });

    filters.forEach(function (b) {
      var on = normSlug(b.dataset.filter) === s;
      b.classList.toggle('is-active', on);
      if (b.hasAttribute('role')) b.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    if (countEl) countEl.textContent = shown + ' ' + (LABELS[s] || 'projects');

    if (push) {
      history.replaceState(null, '', s === '*' ? location.pathname : '#pc=' + s);
    }
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  filters.forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      applyFilter(b.dataset.filter, true);
    });
  });

  /* Deep link on load: #pc=<slug> (and the legacy #pcm= mobile key) */
  var m = location.hash.match(/^#pcm?=([^&]+)/);
  applyFilter(m ? decodeURIComponent(m[1]) : '*', false);

  window.addEventListener('hashchange', function () {
    var h = location.hash.match(/^#pcm?=([^&]+)/);
    applyFilter(h ? decodeURIComponent(h[1]) : '*', false);
  });
})();
