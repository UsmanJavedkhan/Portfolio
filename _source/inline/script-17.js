
document.addEventListener('DOMContentLoaded', function () {
  // Create container so it never affects layout
  let preloader = document.getElementById('custom-preloader');
  if (!preloader) {
    preloader = document.createElement('div');
    preloader.id = 'custom-preloader';
    document.body.insertBefore(preloader, document.body.firstChild);
  }
  if (preloader.dataset.init === '1') return;
  preloader.dataset.init = '1';

  // Slug check works for /portfolio and /xx/portfolio/
  const lastSeg = location.pathname.replace(/\/+$/,'').split('/').pop().toLowerCase();
  const isPortfolio = (lastSeg === 'portfolio');

  function hidePreloader() {
    preloader.classList.add('hidden');
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      preloader.classList.add('hidden');
      preloader.style.display = 'none';
    }
  });
  window.addEventListener('pagehide', () => {
    preloader.classList.add('hidden');
    preloader.style.display = 'none';
  });

  if (isPortfolio) {
    // Portfolio preloader: ðŸ‘€ + "Welcome" + "to my world!"
    preloader.innerHTML = `
      <div class="preloader-stack">
        <div class="preloader-emoji" aria-hidden="true">ðŸ‘€</div>
        <div class="preloader-title">
          <span class="preloader-line preloader-line-1"></span>
          <span class="preloader-line preloader-line-2"></span>
        </div>
      </div>
    `;

    // Build letters with rising effect, ~1s total reveal
    const line1 = "Welcome";
    const line2 = "to my world!";
    const l1 = preloader.querySelector('.preloader-line-1');
    const l2 = preloader.querySelector('.preloader-line-2');

    let d = 0;
    for (let i = 0; i < line1.length; i++) {
      const s = document.createElement('span');
      s.textContent = line1[i];
      s.style.animationDelay = (d += 0.04) + 's';
      l1.appendChild(s);
    }
    d += 0.04;
    for (let i = 0; i < line2.length; i++) {
      const ch = line2[i] === ' ' ? '\u00A0' : line2[i];
      const s = document.createElement('span');
      s.textContent = ch;
      s.style.animationDelay = (d += 0.04) + 's';
      l2.appendChild(s);
    }

    // Start animations
    requestAnimationFrame(() => preloader.classList.add('portfolio-mode'));

    // Total screen time 3s
    setTimeout(hidePreloader, 3000);
    return;
  }

  // Default preloader for all other pages
  const holder = document.createElement('span');
  holder.id = 'custom-preloader-text';
  preloader.innerHTML = '';
  preloader.appendChild(holder);

  const firstWord = 'Hello';
  for (let i = 0; i < firstWord.length; i++) {
    const span = document.createElement('span');
    span.textContent = firstWord[i];
    span.style.animationDelay = (i * 0.1) + 's';
    holder.appendChild(span);
  }

  const greetings = ['Ciao','Hola','Salut','ä½ å¥½','ÐŸÑ€Ð¸Ð²ÐµÑ‚','Hallo','OlÃ¡','Selam','Ù…Ø±Ø­Ø¨Ø§','Dia Dhuit'];
  setTimeout(() => {
    let index = 0;
    const t = setInterval(() => {
      if (index >= greetings.length) { clearInterval(t); hidePreloader(); return; }
      holder.textContent = greetings[index++];
    }, 140);
  }, 1500);
});

