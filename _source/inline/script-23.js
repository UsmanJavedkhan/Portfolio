
document.addEventListener('DOMContentLoaded', function () {
  const EMAIL = 'contact@nikolaradeski.com';

  // simple toast
  function toast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: '#333',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      zIndex: '99999',
      opacity: '0',
      transition: 'opacity .2s ease'
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 250);
    }, 1600);
  }

  async function copyText(text) {
    // Modern API (needs HTTPS + user gesture)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try { await navigator.clipboard.writeText(text); return true; }
      catch (e) { /* fall through */ }
    }
    // Fallback (works on iOS Safari)
    try {
      const input = document.createElement('input');
      input.value = text;
      // place offscreen but focusable
      Object.assign(input.style, {
        position: 'fixed', left: '-9999px', top: '0', opacity: '0'
      });
      document.body.appendChild(input);
      input.focus({ preventScroll: true });
      input.select();
      input.setSelectionRange(0, text.length); // iOS
      const ok = document.execCommand('copy');
      input.remove();
      return ok;
    } catch (e) {
      return false;
    }
  }

  // Event delegation: works for all current/future .copy-mail-btn
  document.addEventListener('click', async function (e) {
    const btn = e.target.closest('.copy-mail-btn');
    if (!btn) return;

    // If itâ€™s an <a>, donâ€™t follow the link
    e.preventDefault();

    const ok = await copyText(EMAIL);
    if (ok) toast('Mail copied!');
    else {
      // as a last resort, open mailto and inform user
      window.location.href = 'mailto:' + EMAIL;
      toast('Couldnâ€™t copy, opening mailâ€¦');
    }
  }, { passive: false }); // not passive since we may preventDefault()
});

