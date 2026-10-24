
document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger not loaded");
    return;
  }

  // Rows + separators only inside your workexperience column
  gsap.utils.toArray(".workexperience .fusion-builder-row-inner, .workexperience .fusion-separator").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",    // starts fading in when near bottom
          end: "bottom 70%",   // starts fading out just after bottom area
          scrub: true,
        },
      }
    );
  });
});

