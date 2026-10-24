
(function () {
  const NAV_SELECTOR = '.main-bottom-nav'; // keep your selector

  // [blurPx, top% where that layer fades to 0]
  const LAYERS = [
    [42, 60],  // stronger at bottom
    [30, 74],
    [20, 88],
    [12, 96]
  ];

  const opts = {
    height: 180,
    minWidth: 1000,
    zBelowNav: 9998,
    // ultra-tiny "ink" so Chrome composites the backdrop, but no visible veil
    ink: 'rgba(0,0,0,0.001)'
  };

  function navH() {
    const n = document.querySelector(NAV_SELECTOR);
    return n ? Math.ceil(n.getBoundingClientRect().height) : 0;
  }

  function ensure() {
    let wrap = document.getElementById('nik-bottom-blur');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'nik-bottom-blur';
      wrap.setAttribute('aria-hidden', 'true');
      document.body.appendChild(wrap);
    }

    Object.assign(wrap.style, {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: navH() + 'px',
      height: opts.height + 'px',
      pointerEvents: 'none',
      zIndex: String(opts.zBelowNav),
      display: window.innerWidth < opts.minWidth ? 'none' : 'block'
    });

    // rebuild layers
    wrap.querySelectorAll('.nik-blur-layer').forEach(n => n.remove());

    LAYERS.forEach(([blurPx, topStop]) => {
      const layer = document.createElement('div');
      layer.className = 'nik-blur-layer';
      const bf = `blur(${blurPx}px) saturate(1.05) contrast(1.02)`; // removes â€œfrostyâ€ wash
      Object.assign(layer.style, {
        position: 'absolute',
        inset: '0',
        backdropFilter: bf,
        WebkitBackdropFilter: bf,
        willChange: 'backdrop-filter',
        background: opts.ink, // no gradient, no tint
        maskImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) ${topStop}%)`,
        WebkitMaskImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) ${topStop}%)`
      });
      wrap.appendChild(layer);
    });
  }

  const refresh = () => { ensure(); setTimeout(ensure, 200); setTimeout(ensure, 1000); };
  window.addEventListener('resize', refresh);
  window.addEventListener('orientationchange', refresh);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }
})();

