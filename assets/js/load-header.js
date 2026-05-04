(function () {
  var siteRoot = '/';
  window.JRDSiteRoot = window.JRDSiteRoot || siteRoot;

  function fetchWithTimeout(url, timeoutMs) {
    var controller = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) { controller.abort(); } }, timeoutMs || 3000);
    return fetch(url, { cache: 'default', credentials: 'same-origin', signal: controller ? controller.signal : undefined })
      .finally(function () { clearTimeout(timer); });
  }

  function fallbackHeader(target) {
    target.innerHTML = '<div class="container"><nav class="nav"><a class="brand-link" href="/en/">JuanRomeroDominguez.dev</a></nav><div class="language-switcher"><a href="/es/">ES</a><a href="/en/">EN</a></div></div>';
    document.dispatchEvent(new CustomEvent('site:header-loaded'));
  }

  function loadHeader() {
    var target = document.getElementById('header-container');
    if (!target || target.dataset.loaded === 'true') { return; }
    target.dataset.loaded = 'true';
    fetchWithTimeout('/header.html', 3000)
      .then(function (response) {
        if (!response.ok) { throw new Error('HTTP ' + response.status); }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        document.dispatchEvent(new CustomEvent('site:header-loaded'));
      })
      .catch(function (error) {
        console.warn('No se pudo cargar header.html. Se usa cabecera mínima.', error);
        fallbackHeader(target);
      });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', loadHeader); }
  else { loadHeader(); }
})();
