
gsap.registerPlugin(ScrollTrigger);

// Helpers
function xRight() {
  return Math.min(420, window.innerWidth * 0.25);
}
function yDown1() {
  return 70;
}

function buildTimeline() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro-section",
      start: "top top",
      end: "+=5150",
      scrub: 1.2,
      pin: ".card-pin",
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // Phase 1
  tl.to(".scroll-card", {
    x: () => xRight(),
    y: () => yDown1(),
    rotationZ: 8,
    rotationY: 0,
    scale: 1,
    ease: "power1.inOut",
    duration: 0.2
  })
  // Phase 2
  .to(".scroll-card", {
    rotationY: 180,
    rotationZ: 0,
    ease: "power2.inOut",
    duration: 0.45
  })
  // Phase 3: gradual scale-up
  .to(".scroll-card", {
    scale: 1.18,
    ease: "power1.inOut",
    duration: 1.2
  })
  // Phase 4: smooth scale-down
  .to(".scroll-card", {
    scale: 1,
    ease: "power1.inOut",
    duration: 0.4
  })
  // Phase 5
  .to(".scroll-card", {
    x: () => xRight(),
    y: () => yDown1(),
    rotationY: 180,
    ease: "none",
    duration: 0.6
  })
  // Phase 6
  .to(".scroll-card", {
    rotationY: 360,
    ease: "power2.inOut",
    duration: 0.5
  });

  return tl;
}

// Init after page is fully ready
function init() {
  ScrollTrigger.matchMedia({
    "(min-width: 501px)": function () {
      buildTimeline();
      // Force GSAP to sync with current scroll AFTER browser restores position
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  });
}

// Run after load (important for refresh-at-mid-scroll)
if (document.readyState === "complete") {
  requestAnimationFrame(() => requestAnimationFrame(init));
} else {
  window.addEventListener("load", () => {
    requestAnimationFrame(() => requestAnimationFrame(init));
  });
}

// Refresh on resize
window.addEventListener("resize", () => ScrollTrigger.refresh());

