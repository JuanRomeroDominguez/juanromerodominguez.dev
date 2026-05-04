(function () {
  var languages = ['ar', 'bn', 'de', 'en', 'es', 'fr', 'hi', 'in', 'it', 'pt', 'ur'];
  var aliases = { id: 'in' };
  var defaultLang = 'en';

  function siteRootFromScript() {
    if (window.JRDSiteRoot) { return window.JRDSiteRoot; }
    var script = document.currentScript || document.querySelector('script[src$="/assets/js/language-redirect.js"],script[src$="assets/js/language-redirect.js"]');
    var src = script && script.getAttribute('src') ? script.getAttribute('src') : 'assets/js/language-redirect.js';
    try { return new URL(src, document.baseURI).pathname.replace(/assets\/js\/language-redirect\.js(?:\?.*)?$/, ''); }
    catch (e) { return '/'; }
  }

  var siteRoot = siteRootFromScript();
  window.JRDSiteRoot = window.JRDSiteRoot || siteRoot;

  function normalize(code) {
    if (!code) { return null; }
    code = String(code).toLowerCase().split('-')[0];
    if (aliases[code]) { code = aliases[code]; }
    return languages.indexOf(code) >= 0 ? code : null;
  }

  function chooseLang() {
    var params = new URLSearchParams(location.search);
    var queryLang = normalize(params.get('lang'));
    if (queryLang) { localStorage.setItem('siteLanguage', queryLang); return queryLang; }
    var stored = normalize(localStorage.getItem('siteLanguage'));
    if (stored) { return stored; }
    var nav = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || defaultLang];
    for (var i = 0; i < nav.length; i++) {
      var n = normalize(nav[i]);
      if (n) { return n; }
    }
    return defaultLang;
  }

  function requestedSlug() {
    var path = location.pathname;
    if (siteRoot !== '/' && path.indexOf(siteRoot) === 0) { path = path.slice(siteRoot.length - 1); }
    var parts = path.split('/').filter(Boolean);
    var last = parts[parts.length - 1] || 'index.html';
    if (last === 'politica-de-privacidad.html') { return 'privacy-policy.html'; }
    if (last === 'terminos-y-condiciones.html') { return 'terms-and-conditions.html'; }
    if (last === 'index.html') { return 'index.html'; }
    if (!last || last.indexOf('.') < 0) { return 'index.html'; }
    return last;
  }

  function localizedPath(lang, slug) {
    if (slug === 'index.html') { return siteRoot + lang + '/'; }
    return siteRoot + lang + '/' + slug;
  }

  function redirect() {
    var target = localizedPath(chooseLang(), requestedSlug());
    var link = document.getElementById('redirect-link');
    if (link) { link.href = target; }
    window.setTimeout(function () { location.replace(target); }, 250);
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', redirect); }
  else { redirect(); }
})();
