(function () {
  function siteRootFromScript(fileName) {
    if (window.JRDSiteRoot) { return window.JRDSiteRoot; }
    var script = document.currentScript || document.querySelector('script[src$="/assets/js/' + fileName + '"],script[src$="assets/js/' + fileName + '"]');
    var src = script && script.getAttribute('src') ? script.getAttribute('src') : 'assets/js/' + fileName;
    try { return new URL(src, document.baseURI).pathname.replace(new RegExp('assets/js/' + fileName + '(?:\\?.*)?$'), ''); }
    catch (e) { return '/'; }
  }
  var siteRoot = siteRootFromScript('load-footer.js');
  window.JRDSiteRoot = window.JRDSiteRoot || siteRoot;

  function loadFooter() {
    var target = document.getElementById('footer-container');
    if (!target || target.dataset.loaded === 'true') { return; }
    target.dataset.loaded = 'true';
    fetch(siteRoot + 'footer.html', { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) { throw new Error('HTTP ' + response.status); }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        document.dispatchEvent(new CustomEvent('site:footer-loaded'));
      })
      .catch(function (error) {
        target.dataset.loaded = 'false';
        console.error('Error cargando el footer:', error);
      });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', loadFooter); }
  else { loadFooter(); }
})();
