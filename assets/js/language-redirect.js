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

  function isRootIndexRequest() {
    var path = window.location.pathname || '/';
    return path === '/' || path === '/index.html';
  }

  function chooseLang() {
    var params = new URLSearchParams(window.location.search || '');
    var queryLang = normalize(params.get('lang'));
    if (queryLang) {
      localStorage.setItem('siteLanguage', queryLang);
      return queryLang;
    }

    var stored = normalize(localStorage.getItem('siteLanguage'));
    if (stored) { return stored; }

    var browserLanguages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || defaultLang];

    for (var i = 0; i < browserLanguages.length; i += 1) {
      var browserLang = normalize(browserLanguages[i]);
      if (browserLang) { return browserLang; }
    }

    return defaultLang;
  }

  function redirectFromRootOnly() {
    if (!isRootIndexRequest()) {
      return;
    }

    var lang = chooseLang();
    var target = '/' + lang + '/';
    var link = document.getElementById('redirect-link');

    if (link) {
      link.href = target;
    }

    window.setTimeout(function () {
      window.location.replace(target);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', redirectFromRootOnly);
  } else {
    redirectFromRootOnly();
  }
})();
