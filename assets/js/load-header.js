(function () {
  function siteRootFromScript(fileName) {
    if (window.JRDSiteRoot) { return window.JRDSiteRoot; }
    var script = document.currentScript || document.querySelector('script[src$="/assets/js/' + fileName + '"],script[src$="assets/js/' + fileName + '"]');
    var src = script && script.getAttribute('src') ? script.getAttribute('src') : 'assets/js/' + fileName;
    try { return new URL(src, document.baseURI).pathname.replace(new RegExp('assets/js/' + fileName + '(?:\\?.*)?$'), ''); }
    catch (e) { return '/'; }
  }
  var siteRoot = siteRootFromScript('load-header.js');
  window.JRDSiteRoot = window.JRDSiteRoot || siteRoot;

  function fetchWithTimeout(url, timeoutMs) {
    var controller = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) { controller.abort(); } }, timeoutMs || 3000);
    return fetch(url, {
      cache: 'default',
      credentials: 'same-origin',
      signal: controller ? controller.signal : undefined
    }).finally(function () { clearTimeout(timer); });
  }

  function fallbackHeader(target) {
    target.innerHTML = '<div class="container"><h1><a href="' + siteRoot + '">JuanRomeroDominguez.dev</a></h1><nav class="nav"><a href="' + siteRoot + 'es/">ES</a><a href="' + siteRoot + 'en/">EN</a></nav></div>';
    document.dispatchEvent(new CustomEvent('site:header-loaded'));
  }

  function loadHeader() {
    var target = document.getElementById('header-container');
    if (!target || target.dataset.loaded === 'true') { return; }
    target.dataset.loaded = 'true';
    fetchWithTimeout(siteRoot + 'header.html', 3000)
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
