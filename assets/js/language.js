
(function () {
  var languages = ['ar','bn','de','en','es','fr','hi','in','it','pt','ur'];
  var defaultLang = 'en';
  var aliases = { id: 'in', iw: 'he' };
  var labels = {
    ar: { switcher: 'اللغة', privacy: 'سياسة الخصوصية', terms: 'الشروط والأحكام', contact: 'اتصال' },
    bn: { switcher: 'ভাষা', privacy: 'গোপনীয়তা নীতি', terms: 'শর্তাবলী', contact: 'যোগাযোগ' },
    de: { switcher: 'Sprache', privacy: 'Datenschutzerklärung', terms: 'Nutzungsbedingungen', contact: 'Kontakt' },
    en: { switcher: 'Language', privacy: 'Privacy Policy', terms: 'Terms and Conditions', contact: 'Contact' },
    es: { switcher: 'Idioma', privacy: 'Política de privacidad', terms: 'Términos y condiciones', contact: 'Contacto' },
    fr: { switcher: 'Langue', privacy: 'Politique de confidentialité', terms: 'Conditions générales', contact: 'Contact' },
    hi: { switcher: 'भाषा', privacy: 'गोपनीयता नीति', terms: 'नियम और शर्तें', contact: 'संपर्क' },
    in: { switcher: 'Bahasa', privacy: 'Kebijakan Privasi', terms: 'Syarat dan Ketentuan', contact: 'Kontak' },
    it: { switcher: 'Lingua', privacy: 'Informativa sulla privacy', terms: 'Termini e condizioni', contact: 'Contatto' },
    pt: { switcher: 'Idioma', privacy: 'Política de privacidade', terms: 'Termos e condições', contact: 'Contacto' },
    ur: { switcher: 'زبان', privacy: 'رازداری کی پالیسی', terms: 'شرائط و ضوابط', contact: 'رابطہ' }
  };

  function normalize(code) {
    if (!code) { return null; }
    code = String(code).toLowerCase().split('-')[0];
    if (aliases[code]) { code = aliases[code]; }
    return languages.indexOf(code) >= 0 ? code : null;
  }

  function currentLangFromPath() {
    var first = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
    return normalize(first);
  }

  function preferredLang() {
    var stored = normalize(localStorage.getItem('siteLanguage'));
    if (stored) { return stored; }
    var params = new URLSearchParams(location.search);
    var q = normalize(params.get('lang'));
    if (q) { return q; }
    var nav = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || defaultLang];
    for (var i = 0; i < nav.length; i++) {
      var n = normalize(nav[i]);
      if (n) { return n; }
    }
    return defaultLang;
  }

  function pageSlug() {
    var parts = location.pathname.split('/').filter(Boolean);
    var last = parts[parts.length - 1] || 'index.html';
    if (languages.indexOf((parts[0] || '').toLowerCase()) >= 0 && parts.length === 1) { return 'index.html'; }
    if (!last || last === '/') { return 'index.html'; }
    if (last === 'politica-de-privacidad.html') { return 'privacy-policy.html'; }
    if (last === 'terminos-y-condiciones.html') { return 'terms-and-conditions.html'; }
    if (last === 'index.html') { return 'index.html'; }
    return last;
  }

  function localizedPath(lang, slug) {
    slug = slug || pageSlug();
    if (slug === 'index.html') { return '/' + lang + '/'; }
    return '/' + lang + '/' + slug;
  }

  function updateLocalizedLinks(lang) {
    var l = labels[lang] || labels.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr';

    document.querySelectorAll('.language-switcher-label').forEach(function (el) { el.textContent = l.switcher; });
    document.querySelectorAll('.localized-privacy-link').forEach(function (el) { el.href = localizedPath(lang, 'privacy-policy.html'); el.textContent = l.privacy; });
    document.querySelectorAll('.localized-terms-link').forEach(function (el) { el.href = localizedPath(lang, 'terms-and-conditions.html'); el.textContent = l.terms; });
    document.querySelectorAll('.localized-contact-link').forEach(function (el) { el.textContent = l.contact; });

    var select = document.getElementById('site-language-select');
    if (select && select.value !== lang) { select.value = lang; }
  }

  function attachSelect() {
    var select = document.getElementById('site-language-select');
    if (!select || select.dataset.bound === 'true') { return; }
    select.dataset.bound = 'true';
    var lang = currentLangFromPath() || preferredLang();
    select.value = lang;
    select.addEventListener('change', function () {
      var next = normalize(select.value) || defaultLang;
      localStorage.setItem('siteLanguage', next);
      location.href = localizedPath(next, pageSlug());
    });
  }

  function init() {
    var lang = currentLangFromPath() || preferredLang();
    updateLocalizedLinks(lang);
    attachSelect();
  }

  function boot() {
    init();
    var observer = new MutationObserver(function () { init(); });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
    document.addEventListener('site:header-loaded', init);
    document.addEventListener('site:footer-loaded', init);
    setTimeout(init, 100);
    setTimeout(init, 300);
    setTimeout(init, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
