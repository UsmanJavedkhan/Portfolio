
document.addEventListener('DOMContentLoaded', function () {
  if (!window.gsap || !window.ScrollTrigger) return;

  // 1) pick the section that sits next to the card at the end of the animation
  // Adjust the selector below to the real one on your page if needed.
  const FADE_SECTION = document.querySelector('.creative-core, .about-section, #about, .about');
  if (!FADE_SECTION) return; // nothing to do if we cannot find it

  // 2) kill any previous fade controller from earlier tests
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars && st.vars.id === 'cardFadeController') st.kill();
  });

  // 3) end-only fade:
  // start = when the chosen section top touches the viewport top
  // end   = 20% more scroll after that, fully faded
  // tweak "+=20%" to be faster/slower (e.g. "+=12%" or "+=28%")
  gsap.fromTo(
    '.card-pin',
    { autoAlpha: 1 },
    {
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: {
        id: 'cardFadeController',
        trigger: FADE_SECTION,
        start: 'top top',
        end: '+=20%',
        scrub: true,
        // ensure the card stays hidden after you scroll past
        onLeave: () => gsap.set('.card-pin', { autoAlpha: 0 }),
        // when you scroll back up above the section, show it again instantly
        onLeaveBack: () => gsap.set('.card-pin', { autoAlpha: 1 }),
        // if you re-enter the fade window while scrolling up, interpolate back to 1
        onEnterBack: self => {
          const p = self.progress; // 0..1 across the 20% window
          gsap.set('.card-pin', { autoAlpha: gsap.utils.mapRange(0, 1, 0, 1, p) });
        }
      }
    }
  );
});

