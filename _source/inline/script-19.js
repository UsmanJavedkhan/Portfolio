
(function () {
  function getTimeString() {
    const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Skopje' };
    return new Intl.DateTimeFormat('en-GB', opts).format(new Date());
  }

  function updateAllTimes() {
    const t = getTimeString();
    document.querySelectorAll('#local-time, #local-time-phone, .js-local-time')
      .forEach(el => el.textContent = t);
  }

  function start() {
    updateAllTimes();

    // align to the next minute, then every 60s
    const now = new Date();
    const ms = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(function tick() {
      updateAllTimes();
      setInterval(updateAllTimes, 60000);
    }, Math.max(0, ms));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
    window.addEventListener('load', updateAllTimes);
  } else {
    start();
  }
})();

