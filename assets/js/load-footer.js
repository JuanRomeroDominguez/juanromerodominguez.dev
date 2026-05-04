(function () {
  var siteRoot = '/';
  window.JRDSiteRoot = window.JRDSiteRoot || siteRoot;

  function fetchWithTimeout(url, timeoutMs) {
    var controller = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) { controller.abort(); } }, timeoutMs || 3000);
    return fetch(url, { cache: 'default', credentials: 'same-origin', signal: controller ? controller.signal : undefined })
      .finally(function () { clearTimeout(timer); });
  }

  function fallbackFooter(target) {
    target.innerHTML = '<div class="container"><p>&copy; Todos los derechos reservados. Desarrollada por Juan Romero Domínguez.</p></div>';
    document.dispatchEvent(new CustomEvent('site:footer-loaded'));
  }

  function loadFooter() {
    var target = document.getElementById('footer-container');
    if (!target || target.dataset.loaded === 'true') { return; }
    target.dataset.loaded = 'true';
    fetchWithTimeout('/footer.html', 3000)
      .then(function (response) {
        if (!response.ok) { throw new Error('HTTP ' + response.status); }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        document.dispatchEvent(new CustomEvent('site:footer-loaded'));
      })
      .catch(function (error) {
        console.warn('No se pudo cargar footer.html. Se usa footer mínimo.', error);
        fallbackFooter(target);
      });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', loadFooter); }
  else { loadFooter(); }
})();
