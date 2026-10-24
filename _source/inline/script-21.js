
(function () {
  function stripTitles(root) {
    // images
    root.querySelectorAll('img[title]').forEach(function (el) {
      el.setAttribute('data-title-removed', el.getAttribute('title'));
      el.removeAttribute('title');
    });
    // links that wrap images
    root.querySelectorAll('a[title] img, figure a[title] img').forEach(function (img) {
      var a = img.closest('a[title]');
      if (a) {
        a.setAttribute('data-title-removed', a.getAttribute('title'));
        a.removeAttribute('title');
      }
    });
  }

  // initial pass
  stripTitles(document);

  // handle content loaded later (Avada elements, lazy blocks, etc.)
  var obs = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType === 1) stripTitles(n);
      });
    });
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();

