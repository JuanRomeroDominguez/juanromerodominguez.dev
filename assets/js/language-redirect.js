(function () {
  var languages = ['ar', 'bn', 'de', 'en', 'es', 'fr', 'hi', 'in', 'it', 'pt', 'ur'];
  var aliases = { id: 'in' };
  var defaultLang = 'en';
  var staticPrefixes = ['/assets/', '/imagenes/'];
  var staticExtensions = [
    '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico', '.avif',
    '.css', '.js', '.json', '.xml', '.txt', '.webmanifest',
    '.woff', '.woff2', '.ttf', '.otf', '.eot', '.map',
    '.pdf', '.zip', '.apk', '.aab'
  ];

  function siteRoot() { return '/'; }
  window.JRDSiteRoot = window.JRDSiteRoot || siteRoot();

  function normalize(code) {
    if (!code) { return null; }
    code = String(code).toLowerCase().split('-')[0];
    if (aliases[code]) { code = aliases[code]; }
    return languages.indexOf(code) >= 0 ? code : null;
  }

  function isStaticAssetPath(path) {
    path = (path || '').toLowerCase();
    for (var i = 0; i < staticPrefixes.length; i++) {
      if (path.indexOf(staticPrefixes[i]) === 0) { return true; }
    }
    for (var j = 0; j < staticExtensions.length; j++) {
      if (path.endsWith(staticExtensions[j])) { return true; }
    }
    return false;
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
    var parts = location.pathname.split('/').filter(Boolean);
    var last = parts[parts.length - 1] || 'index.html';
    if (last === 'politica-de-privacidad.html') { return 'privacy-policy.html'; }
    if (last === 'terminos-y-condiciones.html') { return 'terms-and-conditions.html'; }
    if (last === 'index.html') { return 'index.html'; }
    if (!last || last.indexOf('.') < 0) { return 'index.html'; }
    return last;
  }

  function localizedPath(lang, slug) {
    if (slug === 'index.html') { return '/' + lang + '/'; }
    return '/' + lang + '/' + slug;
  }

  function showStaticAsset404() {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    var link = document.getElementById('redirect-link');
    if (link) { link.href = '/en/'; link.textContent = 'Go to home'; }
    var panel = document.querySelector('.redirect-panel');
    if (panel) {
      panel.classList.add('asset-404-panel');
      panel.innerHTML = '<h1>404 - Resource not found</h1>' +
        '<p>The requested file does not exist or its extension is not correct.</p>' +
        '<p><a href="/en/">Go to home</a></p>';
    }
  }

  function redirect() {
    if (isStaticAssetPath(location.pathname)) {
      showStaticAsset404();
      return;
    }
    var target = localizedPath(chooseLang(), requestedSlug());
    var link = document.getElementById('redirect-link');
    if (link) { link.href = target; }
    window.setTimeout(function () { location.replace(target); }, 250);
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', redirect); }
  else { redirect(); }
})();
