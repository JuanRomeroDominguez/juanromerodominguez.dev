(function () {
  var languages = ['ar', 'bn', 'de', 'en', 'es', 'fr', 'hi', 'in', 'it', 'pt', 'ur'];
  var aliases = { id: 'in' };
  var defaultLang = 'en';
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
    for (var i = 0; i < nav.length; i++) { var n = normalize(nav[i]); if (n) { return n; } }
    return defaultLang;
  }
  function redirect() {
    var target = '/' + chooseLang() + '/';
    var link = document.getElementById('redirect-link');
    if (link) { link.href = target; }
    window.setTimeout(function () { location.replace(target); }, 700);
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', redirect); }
  else { redirect(); }
})();
