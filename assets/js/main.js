/* ============================================================================
   JRD WEBSITE MAIN JAVASCRIPT
   Unified client script for shared head metadata, root language redirect,
   header/footer loading, language selector, contact popup, and visual effects.
   ============================================================================ */

(function () {
  'use strict';

  /* ========================================================================
     [01] CONFIGURATION / UTILITIES
     ======================================================================== */

  var JRD = window.JRD = window.JRD || {};
  var siteRoot = '/';
  var languages = ['ar', 'bn', 'de', 'en', 'es', 'fr', 'hi', 'in', 'it', 'pt', 'ur'];
  var aliases = { id: 'in' };
  var defaultLang = 'en';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function normalizeLang(code) {
    if (!code) { return null; }
    code = String(code).toLowerCase().split('-')[0];
    if (aliases[code]) { code = aliases[code]; }
    return languages.indexOf(code) >= 0 ? code : null;
  }

  function isExternalUrl(value) {
    return /^(https?:|mailto:|tel:|#|data:|blob:)/i.test(String(value || ''));
  }

  function rootPath(path) {
    if (!path || isExternalUrl(path)) { return path; }
    return '/' + String(path).replace(/^\/+/, '');
  }

  function fetchWithTimeout(url, timeoutMs) {
    var controller = window.AbortController ? new AbortController() : null;
    var timer = window.setTimeout(function () {
      if (controller) { controller.abort(); }
    }, timeoutMs || 3000);

    return fetch(url, {
      cache: 'default',
      credentials: 'same-origin',
      signal: controller ? controller.signal : undefined
    }).finally(function () {
      window.clearTimeout(timer);
    });
  }

  function dispatch(name) {
    try { document.dispatchEvent(new CustomEvent(name)); }
    catch (e) {
      var event = document.createEvent('Event');
      event.initEvent(name, true, true);
      document.dispatchEvent(event);
    }
  }

  JRD.siteRoot = siteRoot;
  JRD.languages = languages.slice();

  /* ========================================================================
     [02] SHARED HEAD METADATA WITHOUT EXTRA FETCH REQUESTS
     ======================================================================== */

  function ensureElement(tagName, attrs) {
    var selector = tagName;
    if (attrs.rel && attrs.href) { selector += '[rel="' + attrs.rel + '"][href="' + attrs.href + '"]'; }
    else if (attrs.name) { selector += '[name="' + attrs.name + '"]'; }
    else if (attrs.property) { selector += '[property="' + attrs.property + '"]'; }
    else if (attrs.href) { selector += '[href="' + attrs.href + '"]'; }
    else if (attrs.src) { selector += '[src="' + attrs.src + '"]'; }

    if (document.head.querySelector(selector)) { return; }

    var el = document.createElement(tagName);
    Object.keys(attrs).forEach(function (key) { el.setAttribute(key, attrs[key]); });
    document.head.appendChild(el);
  }

  function ensureSharedHead() {
    ensureElement('meta', { name: 'author', content: 'Juan Romero Domínguez' });
    ensureElement('meta', { name: 'msvalidate.01', content: 'CC6F9C22E9F55A149EF3E83141B23EBC' });
    ensureElement('meta', { name: 'msapplication-TileColor', content: '#ffffff' });
    ensureElement('meta', { name: 'msapplication-TileImage', content: '/imagenes/favicon/ms-icon-144x144.png' });
    ensureElement('meta', { name: 'theme-color', content: '#ffffff' });

    [
      ['apple-touch-icon', '57x57', '/imagenes/favicon/apple-icon-57x57.png'],
      ['apple-touch-icon', '60x60', '/imagenes/favicon/apple-icon-60x60.png'],
      ['apple-touch-icon', '72x72', '/imagenes/favicon/apple-icon-72x72.png'],
      ['apple-touch-icon', '76x76', '/imagenes/favicon/apple-icon-76x76.png'],
      ['apple-touch-icon', '114x114', '/imagenes/favicon/apple-icon-114x114.png'],
      ['apple-touch-icon', '120x120', '/imagenes/favicon/apple-icon-120x120.png'],
      ['apple-touch-icon', '144x144', '/imagenes/favicon/apple-icon-144x144.png'],
      ['apple-touch-icon', '152x152', '/imagenes/favicon/apple-icon-152x152.png'],
      ['apple-touch-icon', '180x180', '/imagenes/favicon/apple-icon-180x180.png']
    ].forEach(function (item) {
      ensureElement('link', { rel: item[0], sizes: item[1], href: item[2] });
    });

    ensureElement('link', { rel: 'icon', sizes: '192x192', type: 'image/png', href: '/imagenes/favicon/android-icon-192x192.png' });
    ensureElement('link', { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/imagenes/favicon/favicon-32x32.png' });
    ensureElement('link', { rel: 'icon', sizes: '96x96', type: 'image/png', href: '/imagenes/favicon/favicon-96x96.png' });
    ensureElement('link', { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/imagenes/favicon/favicon-16x16.png' });
    ensureElement('link', { rel: 'icon', type: 'image/x-icon', href: '/imagenes/favicon/favicon.ico' });
    ensureElement('link', { rel: 'manifest', href: '/manifest.json' });
  }

  /* ========================================================================
     [03] ROOT-ONLY LANGUAGE REDIRECT
     ======================================================================== */

  function isRootIndexRequest() {
    var path = window.location.pathname || '/';
    return path === '/' || path === '/index.html';
  }

  function chooseRedirectLanguage() {
    var params = new URLSearchParams(window.location.search || '');
    var queryLang = normalizeLang(params.get('lang'));
    if (queryLang) {
      localStorage.setItem('siteLanguage', queryLang);
      return queryLang;
    }

    var stored = normalizeLang(localStorage.getItem('siteLanguage'));
    if (stored) { return stored; }

    var browserLanguages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || defaultLang];
    for (var i = 0; i < browserLanguages.length; i += 1) {
      var browserLang = normalizeLang(browserLanguages[i]);
      if (browserLang) { return browserLang; }
    }

    return defaultLang;
  }

  function redirectRootIfNeeded() {
    if (!isRootIndexRequest()) { return; }
    var lang = chooseRedirectLanguage();
    var target = '/' + lang + '/';
    var link = document.getElementById('redirect-link');
    if (link) { link.href = target; }
    window.setTimeout(function () { window.location.replace(target); }, 250);
  }

  /* ========================================================================
     [04] HEADER AND FOOTER FRAGMENTS
     ======================================================================== */

  function fallbackHeader(target) {
    target.innerHTML = '<div class="container"><nav class="nav"><a class="brand-link" href="/en/">JuanRomeroDominguez.dev</a></nav><div class="language-switcher"><span class="language-switcher-icon" aria-hidden="true">🌐</span><label class="language-switcher-label" for="site-language-select">Language</label><select id="site-language-select" class="language-select"><option value="ar">العربية</option><option value="bn">বাংলা</option><option value="de">Deutsch</option><option value="en">English</option><option value="es">Español</option><option value="fr">Français</option><option value="hi">हिन्दी</option><option value="in">Bahasa Indonesia</option><option value="it">Italiano</option><option value="pt">Português</option><option value="ur">اردو</option></select></div></div>';
    dispatch('site:header-loaded');
  }

  function fallbackFooter(target) {
    target.innerHTML = '<div class="container"><p>© Todos los derechos reservados. Desarrollada por Juan Romero Domínguez.</p><a class="localized-terms-link" href="/en/terms-and-conditions.html">Terms and Conditions</a><a class="localized-privacy-link" href="/en/privacy-policy.html">Privacy Policy</a><a class="localized-contact-link" href="mailto:contacto@juanromerodominguez.dev">Contact</a></div>';
    dispatch('site:footer-loaded');
  }

  function loadFragment(targetId, url, eventName, fallback) {
    var target = document.getElementById(targetId);
    if (!target || target.dataset.loaded === 'true') { return; }
    target.dataset.loaded = 'true';

    fetchWithTimeout(url, 3000)
      .then(function (response) {
        if (!response.ok) { throw new Error('HTTP ' + response.status); }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        dispatch(eventName);
        initLanguage();
        bindContactPopup();
        lazyAllImages();
      })
      .catch(function (error) {
        console.warn('No se pudo cargar ' + url + '. Se usa fallback mínimo.', error);
        if (fallback) { fallback(target); }
        initLanguage();
        bindContactPopup();
      });
  }

  function initLayout() {
    loadFragment('header-container', '/header.html', 'site:header-loaded', fallbackHeader);
    loadFragment('footer-container', '/footer.html', 'site:footer-loaded', fallbackFooter);
  }

  /* ========================================================================
     [05] LANGUAGE SELECTOR AND LOCALIZED LINKS
     ======================================================================== */

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


  var contactLabels = {
    ar: {
      title: 'اتصال',
      intro: 'إذا كنت ترغب في التواصل معي لأسباب مهنية أو للحصول على دعم لتطبيق أو لأي استفسار متعلق بهذا الموقع، يمكنك استخدام النموذج التالي.',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      antiBot: 'ما ناتج 1 + 6؟',
      message: 'الرسالة',
      send: 'إرسال',
      validation: "الإجابة على '1 + 6' غير صحيحة.",
      mailSubject: 'تواصل من juanromerodominguez.dev',
      bodyName: 'الاسم',
      bodyEmail: 'البريد الإلكتروني',
      bodyMessage: 'الرسالة'
    },
    bn: {
      title: 'যোগাযোগ',
      intro: 'পেশাগত কারণে, কোনো অ্যাপের সহায়তার জন্য বা এই ওয়েবসাইট সম্পর্কিত যেকোনো প্রশ্নে আমার সঙ্গে যোগাযোগ করতে চাইলে নিচের ফর্মটি ব্যবহার করতে পারেন।',
      name: 'নাম',
      email: 'ইমেইল',
      antiBot: '১ + ৬ কত?',
      message: 'বার্তা',
      send: 'পাঠান',
      validation: "'1 + 6' এর উত্তর সঠিক নয়।",
      mailSubject: 'juanromerodominguez.dev থেকে যোগাযোগ',
      bodyName: 'নাম',
      bodyEmail: 'ইমেইল',
      bodyMessage: 'বার্তা'
    },
    de: {
      title: 'Kontakt',
      intro: 'Wenn du mich aus beruflichen Gründen, für App-Support oder wegen einer Frage zu dieser Website kontaktieren möchtest, kannst du das folgende Formular verwenden.',
      name: 'Name',
      email: 'E-Mail',
      antiBot: 'Was ist 1 + 6?',
      message: 'Nachricht',
      send: 'Senden',
      validation: "Die Antwort auf '1 + 6' ist nicht korrekt.",
      mailSubject: 'Kontakt über juanromerodominguez.dev',
      bodyName: 'Name',
      bodyEmail: 'E-Mail',
      bodyMessage: 'Nachricht'
    },
    en: {
      title: 'Contact',
      intro: 'If you want to contact me for professional reasons, app support, or any question related to this website, you can use the following form.',
      name: 'Name',
      email: 'Email',
      antiBot: 'What is 1 + 6?',
      message: 'Message',
      send: 'Send',
      validation: "The answer to '1 + 6' is not correct.",
      mailSubject: 'Contact from juanromerodominguez.dev',
      bodyName: 'Name',
      bodyEmail: 'Email',
      bodyMessage: 'Message'
    },
    es: {
      title: 'Contacto',
      intro: 'Si quieres contactar conmigo por motivos profesionales, soporte de una app o cualquier consulta relacionada con esta web, puedes usar el siguiente formulario.',
      name: 'Nombre',
      email: 'Email',
      antiBot: '¿1 + 6?',
      message: 'Mensaje',
      send: 'Enviar',
      validation: "La respuesta a '1 + 6' no es correcta.",
      mailSubject: 'Contacto desde juanromerodominguez.dev',
      bodyName: 'Nombre',
      bodyEmail: 'Email',
      bodyMessage: 'Mensaje'
    },
    fr: {
      title: 'Contact',
      intro: 'Si vous souhaitez me contacter pour des raisons professionnelles, pour le support d’une application ou pour toute question liée à ce site, vous pouvez utiliser le formulaire suivant.',
      name: 'Nom',
      email: 'E-mail',
      antiBot: 'Combien font 1 + 6 ?',
      message: 'Message',
      send: 'Envoyer',
      validation: "La réponse à '1 + 6' n’est pas correcte.",
      mailSubject: 'Contact depuis juanromerodominguez.dev',
      bodyName: 'Nom',
      bodyEmail: 'E-mail',
      bodyMessage: 'Message'
    },
    hi: {
      title: 'संपर्क',
      intro: 'यदि आप पेशेवर कारणों, किसी ऐप के समर्थन या इस वेबसाइट से जुड़े किसी प्रश्न के लिए मुझसे संपर्क करना चाहते हैं, तो आप नीचे दिए गए फ़ॉर्म का उपयोग कर सकते हैं।',
      name: 'नाम',
      email: 'ईमेल',
      antiBot: '1 + 6 कितना होता है?',
      message: 'संदेश',
      send: 'भेजें',
      validation: "'1 + 6' का उत्तर सही नहीं है।",
      mailSubject: 'juanromerodominguez.dev से संपर्क',
      bodyName: 'नाम',
      bodyEmail: 'ईमेल',
      bodyMessage: 'संदेश'
    },
    in: {
      title: 'Kontak',
      intro: 'Jika Anda ingin menghubungi saya untuk keperluan profesional, dukungan aplikasi, atau pertanyaan apa pun terkait situs web ini, Anda dapat menggunakan formulir berikut.',
      name: 'Nama',
      email: 'Email',
      antiBot: 'Berapa 1 + 6?',
      message: 'Pesan',
      send: 'Kirim',
      validation: "Jawaban untuk '1 + 6' tidak benar.",
      mailSubject: 'Kontak dari juanromerodominguez.dev',
      bodyName: 'Nama',
      bodyEmail: 'Email',
      bodyMessage: 'Pesan'
    },
    it: {
      title: 'Contatto',
      intro: 'Se vuoi contattarmi per motivi professionali, per il supporto di un’app o per qualsiasi domanda relativa a questo sito, puoi usare il seguente modulo.',
      name: 'Nome',
      email: 'Email',
      antiBot: 'Quanto fa 1 + 6?',
      message: 'Messaggio',
      send: 'Invia',
      validation: "La risposta a '1 + 6' non è corretta.",
      mailSubject: 'Contatto da juanromerodominguez.dev',
      bodyName: 'Nome',
      bodyEmail: 'Email',
      bodyMessage: 'Messaggio'
    },
    pt: {
      title: 'Contacto',
      intro: 'Se quiser entrar em contacto comigo por motivos profissionais, suporte de uma app ou qualquer questão relacionada com este site, pode usar o formulário seguinte.',
      name: 'Nome',
      email: 'Email',
      antiBot: 'Quanto é 1 + 6?',
      message: 'Mensagem',
      send: 'Enviar',
      validation: "A resposta a '1 + 6' não está correta.",
      mailSubject: 'Contacto a partir de juanromerodominguez.dev',
      bodyName: 'Nome',
      bodyEmail: 'Email',
      bodyMessage: 'Mensagem'
    },
    ur: {
      title: 'رابطہ',
      intro: 'اگر آپ پیشہ ورانہ وجوہات، کسی ایپ کی معاونت یا اس ویب سائٹ سے متعلق کسی سوال کے لیے مجھ سے رابطہ کرنا چاہتے ہیں تو آپ درج ذیل فارم استعمال کر سکتے ہیں۔',
      name: 'نام',
      email: 'ای میل',
      antiBot: '1 + 6 کا جواب کیا ہے؟',
      message: 'پیغام',
      send: 'بھیجیں',
      validation: "'1 + 6' کا جواب درست نہیں ہے۔",
      mailSubject: 'juanromerodominguez.dev سے رابطہ',
      bodyName: 'نام',
      bodyEmail: 'ای میل',
      bodyMessage: 'پیغام'
    }
  };


  function activeLanguage() {
    return currentLangFromPath() || preferredLang() || defaultLang;
  }

  function text(el, value) {
    if (el && typeof value === 'string') { el.textContent = value; }
  }

  function localizeContactForm(lang) {
    var c = contactLabels[lang] || contactLabels.en;
    var title = document.querySelector('#contact-content h2');
    var intro = document.querySelector('#contact-content p');
    text(title, c.title);
    text(intro, c.intro);

    var pairs = [
      ['name', c.name],
      ['email', c.email],
      ['abot', c.antiBot],
      ['message', c.message]
    ];

    pairs.forEach(function (pair) {
      var label = document.querySelector('label[for="' + pair[0] + '"]');
      text(label, pair[1]);
    });

    var submit = document.querySelector('#contact-form button[type="submit"]');
    text(submit, c.send);
  }

  function currentLangFromPath() {
    var first = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
    return normalizeLang(first);
  }

  function preferredLang() {
    var stored = normalizeLang(localStorage.getItem('siteLanguage'));
    if (stored) { return stored; }

    var params = new URLSearchParams(location.search || '');
    var queryLang = normalizeLang(params.get('lang'));
    if (queryLang) { return queryLang; }

    var nav = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || defaultLang];
    for (var i = 0; i < nav.length; i += 1) {
      var n = normalizeLang(nav[i]);
      if (n) { return n; }
    }

    return defaultLang;
  }

  function pageSlug() {
    var parts = location.pathname.split('/').filter(Boolean);
    if (parts.length && normalizeLang(parts[0])) { parts.shift(); }
    var last = parts[parts.length - 1] || 'index.html';
    if (last === 'politica-de-privacidad.html') { return 'privacy-policy.html'; }
    if (last === 'terminos-y-condiciones.html') { return 'terms-and-conditions.html'; }
    return last || 'index.html';
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

    document.querySelectorAll('.brand-link').forEach(function (el) { el.href = localizedPath(lang, 'index.html'); });
    document.querySelectorAll('.language-switcher-label').forEach(function (el) { el.textContent = l.switcher; });
    document.querySelectorAll('.localized-privacy-link').forEach(function (el) { el.href = localizedPath(lang, 'privacy-policy.html'); el.textContent = l.privacy; });
    document.querySelectorAll('.localized-terms-link').forEach(function (el) { el.href = localizedPath(lang, 'terms-and-conditions.html'); el.textContent = l.terms; });
    document.querySelectorAll('.localized-contact-link').forEach(function (el) { el.textContent = l.contact; });
    localizeContactForm(lang);

    var select = document.getElementById('site-language-select');
    if (select && select.value !== lang) { select.value = lang; }
  }

  function attachLanguageSelect() {
    var select = document.getElementById('site-language-select');
    if (!select || select.dataset.bound === 'true') { return; }
    select.dataset.bound = 'true';
    var lang = currentLangFromPath() || preferredLang();
    select.value = lang;
    select.addEventListener('change', function () {
      var next = normalizeLang(select.value) || defaultLang;
      localStorage.setItem('siteLanguage', next);
      location.href = localizedPath(next, pageSlug());
    });
  }

  function initLanguage() {
    var lang = currentLangFromPath() || preferredLang();
    updateLocalizedLinks(lang);
    attachLanguageSelect();
  }

  JRD.language = { init: initLanguage, localizedPath: localizedPath };

  /* ========================================================================
     [06] CONTACT POPUP
     ======================================================================== */

  function closePopup() {
    var overlay = document.getElementById('popup-overlay');
    if (overlay) { overlay.style.display = 'none'; }
  }

  function openPopup(id) {
    var overlay = document.getElementById('popup-overlay');
    if (overlay) { overlay.style.display = 'flex'; }
    document.querySelectorAll('.popup-content').forEach(function (el) { el.classList.remove('active'); });
    var content = document.getElementById(id);
    if (content) { content.classList.add('active'); }
  }

  function enviarCorreo(event) {
    if (event) { event.preventDefault(); }
    var nombreEl = document.getElementById('name');
    var emailEl = document.getElementById('email');
    var abotEl = document.getElementById('abot');
    var mensajeEl = document.getElementById('message');
    if (!nombreEl || !emailEl || !abotEl || !mensajeEl) { return; }

    var nombre = nombreEl.value.trim();
    var email = emailEl.value.trim();
    var abot = abotEl.value.trim();
    var mensaje = mensajeEl.value.trim();

    var lang = activeLanguage();
    var c = contactLabels[lang] || contactLabels.en;

    if (abot !== '7') {
      alert(c.validation);
      return;
    }

    var destino = 'contacto@juanromerodominguez.dev';
    var asunto = encodeURIComponent(c.mailSubject);
    var cuerpo = encodeURIComponent(c.bodyName + ': ' + nombre + '\n' + c.bodyEmail + ': ' + email + '\n\n' + c.bodyMessage + ':\n' + mensaje);
    window.location.href = 'mailto:' + destino + '?subject=' + asunto + '&body=' + cuerpo;
  }

  function bindContactPopup() {
    document.querySelectorAll('[data-popup-target]').forEach(function (el) {
      if (el.dataset.popupBound === 'true') { return; }
      el.dataset.popupBound = 'true';
      el.addEventListener('click', function (event) {
        event.preventDefault();
        openPopup(el.dataset.popupTarget);
      });
    });

    document.querySelectorAll('[data-popup-close]').forEach(function (el) {
      if (el.dataset.popupBound === 'true') { return; }
      el.dataset.popupBound = 'true';
      el.addEventListener('click', function (event) {
        event.preventDefault();
        closePopup();
      });
    });

    var form = document.getElementById('contact-form');
    if (form && form.dataset.bound !== 'true') {
      form.dataset.bound = 'true';
      form.addEventListener('submit', enviarCorreo);
    }
    localizeContactForm(activeLanguage());
  }

  JRD.contact = { bind: bindContactPopup, open: openPopup, close: closePopup };

  /* ========================================================================
     [07] LAZY IMAGES SAFETY PASS
     ======================================================================== */

  function lazyAllImages() {
    document.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('loading')) { img.setAttribute('loading', 'lazy'); }
      if (!img.hasAttribute('decoding')) { img.setAttribute('decoding', 'async'); }
    });
  }

  /* ========================================================================
     [08] VISUAL EFFECTS: CONSTELLATION, GLOW, TILT, TERMINAL
     ======================================================================== */

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function isHomePage() {
    var path = window.location.pathname.replace(/\/+/g, '/');
    return path === '/' || /\/(ar|bn|de|en|es|fr|hi|in|it|pt|ur)\/?$/.test(path) || path.endsWith('/index.html') || path === '/index';
  }

  function initTypingHero() {
    if (!isHomePage() || prefersReduced) { return; }
    var hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.terminal-line')) { return; }
    var terminal = document.createElement('div');
    terminal.className = 'terminal-line';
    terminal.setAttribute('aria-label', 'Tecnologías y áreas de trabajo');
    terminal.innerHTML = '<span class="terminal-prompt">&gt;</span> <span class="terminal-text"></span><span class="terminal-cursor" aria-hidden="true"></span>';
    var nav = hero.querySelector('.anchor-nav');
    if (nav) { hero.insertBefore(terminal, nav); } else { hero.appendChild(terminal); }

    var target = terminal.querySelector('.terminal-text');
    var phrases = [
      'Android · Google Play · Huawei AppGallery · Samsung Galaxy Store',
      'SAP S/4HANA · IS-U · ABAP · Integración',
      'Full-stack · PHP · .NET · Web · Performance',
      'Worldwide publishing · ASO · privacidad · analítica'
    ];
    var p = 0;
    var i = 0;
    var deleting = false;

    function tick() {
      var full = phrases[p];
      target.textContent = deleting ? full.slice(0, i--) : full.slice(0, i++);
      var delay = deleting ? 28 : 48;
      if (!deleting && i > full.length + 8) { deleting = true; delay = 1200; }
      if (deleting && i < 0) { deleting = false; p = (p + 1) % phrases.length; i = 0; delay = 260; }
      window.setTimeout(tick, delay);
    }
    tick();
  }

  function initConstellation() {
    if (prefersReduced || document.querySelector('.constellation-canvas')) { return; }
    var canvas = document.createElement('canvas');
    canvas.className = 'constellation-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    var ctx = canvas.getContext('2d');
    var w = 0;
    var h = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mouse = { x: -9999, y: -9999, active: false };
    var particles = [];

    function count() {
      return Math.max(42, Math.min(95, Math.floor((window.innerWidth * window.innerHeight) / 19000)));
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = count();
      while (particles.length < n) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.5 + 0.6
        });
      }
      particles.length = n;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i += 1) {
        var a = particles[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < -20) { a.x = w + 20; }
        if (a.x > w + 20) { a.x = -20; }
        if (a.y < -20) { a.y = h + 20; }
        if (a.y > h + 20) { a.y = -20; }
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(116,190,255,.65)';
        ctx.fill();
      }

      for (var j = 0; j < particles.length; j += 1) {
        for (var k = j + 1; k < particles.length; k += 1) {
          var p1 = particles[j];
          var p2 = particles[k];
          var dx = p1.x - p2.x;
          var dy = p1.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.strokeStyle = 'rgba(92,174,255,' + ((1 - dist / 115) * 0.18).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          var pm = particles[j];
          var mdx = pm.x - mouse.x;
          var mdy = pm.y - mouse.y;
          var md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 180) {
            ctx.strokeStyle = 'rgba(103,210,255,' + ((1 - md / 180) * 0.42).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pm.x, pm.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      window.requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });
    window.addEventListener('pointerleave', function () { mouse.active = false; }, { passive: true });
    resize();
    draw();
  }

  function initGlowTilt() {
    if (prefersReduced) { return; }
    var selector = '.portfolio-card,.experience-card,.cert-list-card,.cert-card,.experience-media-card,.badge-card-custom,.app-store-button,.anchor-nav a';
    document.querySelectorAll(selector).forEach(function (el) {
      if (el.dataset.fxReady === '1') { return; }
      el.dataset.fxReady = '1';
      el.classList.add('fx-card');
      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var px = x / rect.width;
        var py = y / rect.height;
        el.style.setProperty('--mx', x + 'px');
        el.style.setProperty('--my', y + 'px');
        var rotY = (px - 0.5) * 7;
        var rotX = (0.5 - py) * 7;
        el.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-3px)';
      }, { passive: true });
      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '50%');
      }, { passive: true });
    });
  }

  function initEffects() {
    initConstellation();
    initTypingHero();
    initGlowTilt();
  }

  /* ========================================================================
     [09] BOOTSTRAP
     ======================================================================== */

  function boot() {
    ensureSharedHead();
    lazyAllImages();
    redirectRootIfNeeded();
    initLayout();
    initLanguage();
    bindContactPopup();
    initEffects();

    document.addEventListener('site:header-loaded', function () { initLanguage(); bindContactPopup(); lazyAllImages(); initGlowTilt(); });
    document.addEventListener('site:footer-loaded', function () { initLanguage(); bindContactPopup(); lazyAllImages(); initGlowTilt(); });

    window.setTimeout(function () { initLanguage(); bindContactPopup(); lazyAllImages(); initGlowTilt(); }, 250);
    window.setTimeout(function () { initLanguage(); bindContactPopup(); lazyAllImages(); initGlowTilt(); }, 1000);
  }

  onReady(boot);
}());
