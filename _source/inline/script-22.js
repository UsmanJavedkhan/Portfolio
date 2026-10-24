
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.menu-btn');
  if (!btn) return;

  // let the anchor jump/scroll first, then reset
  setTimeout(() => {
    btn.blur();
    btn.classList.remove('active', 'is-active', 'awb-active');
  }, 150);
});

