(function () {
  function siteRootFromScript(fileName) {
    if (window.JRDSiteRoot) { return window.JRDSiteRoot; }
    var script = document.currentScript || document.querySelector('script[src$="/assets/js/' + fileName + '"],script[src$="assets/js/' + fileName + '"]');
    var src = script && script.getAttribute('src') ? script.getAttribute('src') : 'assets/js/' + fileName;
    try { return new URL(src, document.baseURI).pathname.replace(new RegExp('assets/js/' + fileName + '(?:\\?.*)?$'), ''); }
    catch (e) { return '/'; }
  }
  var siteRoot = siteRootFromScript('layout.js');
  window.JRDSiteRoot = window.JRDSiteRoot || siteRoot;

  function loadFragment(targetId, url, eventName) {
    var target = document.getElementById(targetId);
    if (!target || target.dataset.loaded === 'true') { return; }
    target.dataset.loaded = 'true';
    fetch(siteRoot + url, { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) { throw new Error('HTTP ' + response.status); }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        if (eventName) { document.dispatchEvent(new CustomEvent(eventName)); }
        if (window.JRDLanguage && typeof window.JRDLanguage.init === 'function') { window.JRDLanguage.init(); }
        if (window.JRDContact && typeof window.JRDContact.bind === 'function') { window.JRDContact.bind(); }
      })
      .catch(function (error) {
        target.dataset.loaded = 'false';
        console.error('Error cargando ' + url + ':', error);
      });
  }
  function initLayout() {
    loadFragment('header-container', 'header.html', 'site:header-loaded');
    loadFragment('footer-container', 'footer.html', 'site:footer-loaded');
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initLayout); }
  else { initLayout(); }
})();
