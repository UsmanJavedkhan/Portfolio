
(function () {
  var BP = 1000;
  var mm = window.matchMedia("(max-width: " + (BP - 1) + "px)");
  var killed = false;

  function hasLenis() {
    return !!(window.lenis && typeof window.lenis.destroy === "function");
  }

  function hardKill() {
    if (!hasLenis() || killed) return;
    try { window.lenis.destroy(); } catch (e) {}
    // cleanup styles/classes the plugin adds
    document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
    document.body.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
    document.documentElement.style.removeProperty("height");
    document.body.style.removeProperty("height");
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
    if (window.gsap && window.ScrollTrigger) window.ScrollTrigger.refresh();
    killed = true;
  }

  function ensureMode() {
    if (mm.matches) {
      hardKill();
    } else if (killed) {
      // crossed up into desktop, reload once to let the plugin re-init cleanly
      if (!sessionStorage.getItem("lenisReloaded")) {
        sessionStorage.setItem("lenisReloaded", "1");
        location.reload();
      }
    }
  }

  // first paint CSS guard
  var css = document.createElement("style");
  css.textContent = "@media (max-width: 999px){html,body{scroll-behavior:auto !important; height:auto !important; overflow:auto !important;}}";
  document.head.appendChild(css);

  // wait for plugin to create window.lenis, then apply
  var tries = 0;
  (function wait() {
    if (hasLenis() || tries > 80) { // ~4s cap
      ensureMode();
      return;
    }
    tries++; setTimeout(wait, 50);
  })();

  // respond to orientation/resize
  mm.addEventListener("change", function(){ sessionStorage.removeItem("lenisReloaded"); ensureMode(); });
  window.addEventListener("orientationchange", function(){ sessionStorage.removeItem("lenisReloaded"); ensureMode(); });
})();

