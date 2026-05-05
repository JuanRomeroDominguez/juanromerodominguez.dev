/* ============================================================================
   JRD WEBSITE MAIN JAVASCRIPT
   Unified & Optimized: Redirects, Language Management, Fragment Loading, 
   Contact Popup, and Visual Effects.
   ============================================================================ */

(function () {
  'use strict';

  var JRD = window.JRD = window.JRD || {};
  var siteRoot = '/';
  var languages = ['af', 'am', 'ar', 'az', 'be', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'eu', 'fa', 'fi', 'fil', 'fr', 'gl', 'gu', 'hi', 'hr', 'hu', 'hy', 'in', 'is', 'it', 'iw', 'ja', 'ka', 'kk', 'km', 'kn', 'ko', 'ky', 'lo', 'lt', 'lv', 'mk', 'ml', 'mn', 'mr', 'ms', 'my', 'ne', 'nl', 'no', 'pa', 'pl', 'pt', 'rm', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr', 'sv', 'sw', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'zh', 'zu'];
  var languageOptions = [
  {
    "code": "af",
    "name": "Afrikaans"
  },
  {
    "code": "am",
    "name": "አማርኛ"
  },
  {
    "code": "ar",
    "name": "العربية"
  },
  {
    "code": "az",
    "name": "Azərbaycanca"
  },
  {
    "code": "be",
    "name": "Беларуская"
  },
  {
    "code": "bg",
    "name": "Български"
  },
  {
    "code": "bn",
    "name": "বাংলা"
  },
  {
    "code": "ca",
    "name": "Català"
  },
  {
    "code": "cs",
    "name": "Čeština"
  },
  {
    "code": "da",
    "name": "Dansk"
  },
  {
    "code": "de",
    "name": "Deutsch"
  },
  {
    "code": "el",
    "name": "Ελληνικά"
  },
  {
    "code": "en",
    "name": "English"
  },
  {
    "code": "es",
    "name": "Español"
  },
  {
    "code": "et",
    "name": "Eesti"
  },
  {
    "code": "eu",
    "name": "Euskara"
  },
  {
    "code": "fa",
    "name": "فارسی"
  },
  {
    "code": "fi",
    "name": "Suomi"
  },
  {
    "code": "fil",
    "name": "Filipino"
  },
  {
    "code": "fr",
    "name": "Français"
  },
  {
    "code": "gl",
    "name": "Galego"
  },
  {
    "code": "gu",
    "name": "ગુજરાતી"
  },
  {
    "code": "hi",
    "name": "हिन्दी"
  },
  {
    "code": "hr",
    "name": "Hrvatski"
  },
  {
    "code": "hu",
    "name": "Magyar"
  },
  {
    "code": "hy",
    "name": "Հայերեն"
  },
  {
    "code": "in",
    "name": "Bahasa Indonesia"
  },
  {
    "code": "is",
    "name": "Íslenska"
  },
  {
    "code": "it",
    "name": "Italiano"
  },
  {
    "code": "iw",
    "name": "עברית"
  },
  {
    "code": "ja",
    "name": "日本語"
  },
  {
    "code": "ka",
    "name": "ქართული"
  },
  {
    "code": "kk",
    "name": "Қазақша"
  },
  {
    "code": "km",
    "name": "ខ្មែរ"
  },
  {
    "code": "kn",
    "name": "ಕನ್ನಡ"
  },
  {
    "code": "ko",
    "name": "한국어"
  },
  {
    "code": "ky",
    "name": "Кыргызча"
  },
  {
    "code": "lo",
    "name": "ລາວ"
  },
  {
    "code": "lt",
    "name": "Lietuvių"
  },
  {
    "code": "lv",
    "name": "Latviešu"
  },
  {
    "code": "mk",
    "name": "Македонски"
  },
  {
    "code": "ml",
    "name": "മലയാളം"
  },
  {
    "code": "mn",
    "name": "Монгол"
  },
  {
    "code": "mr",
    "name": "मराठी"
  },
  {
    "code": "ms",
    "name": "Bahasa Melayu"
  },
  {
    "code": "my",
    "name": "မြန်မာ"
  },
  {
    "code": "ne",
    "name": "नेपाली"
  },
  {
    "code": "nl",
    "name": "Nederlands"
  },
  {
    "code": "no",
    "name": "Norsk"
  },
  {
    "code": "pa",
    "name": "ਪੰਜਾਬੀ"
  },
  {
    "code": "pl",
    "name": "Polski"
  },
  {
    "code": "pt",
    "name": "Português"
  },
  {
    "code": "rm",
    "name": "Rumantsch"
  },
  {
    "code": "ro",
    "name": "Română"
  },
  {
    "code": "ru",
    "name": "Русский"
  },
  {
    "code": "si",
    "name": "සිංහල"
  },
  {
    "code": "sk",
    "name": "Slovenčina"
  },
  {
    "code": "sl",
    "name": "Slovenščina"
  },
  {
    "code": "sq",
    "name": "Shqip"
  },
  {
    "code": "sr",
    "name": "Српски"
  },
  {
    "code": "sv",
    "name": "Svenska"
  },
  {
    "code": "sw",
    "name": "Kiswahili"
  },
  {
    "code": "ta",
    "name": "தமிழ்"
  },
  {
    "code": "te",
    "name": "తెలుగు"
  },
  {
    "code": "th",
    "name": "ไทย"
  },
  {
    "code": "tr",
    "name": "Türkçe"
  },
  {
    "code": "uk",
    "name": "Українська"
  },
  {
    "code": "ur",
    "name": "اردو"
  },
  {
    "code": "vi",
    "name": "Tiếng Việt"
  },
  {
    "code": "zh",
    "name": "中文"
  },
  {
    "code": "zu",
    "name": "isiZulu"
  }
];
  var aliases = { id: 'in', he: 'iw' };
  var defaultLang = 'en';

  // --- UTILITIES ---
  function onReady(fn) { 
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fn); } 
    else { fn(); } 
  }
  
  function normalizeLang(code) {
    if (!code) { return null; }
    code = String(code).toLowerCase().split('-')[0];
    if (aliases[code]) { code = aliases[code]; }
    return languages.indexOf(code) >= 0 ? code : null;
  }

  function isExternalUrl(value) { return /^(https?:|mailto:|tel:|#|data:|blob:)/i.test(String(value || '')); }

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
  
  // --- LANGUAGE DATA & LOGIC ---
  var labels = {
  "af": {
    "switcher": "Taal",
    "privacy": "Privaatheidsbeleid",
    "terms": "Bepalings en voorwaardes",
    "contact": "Kontak"
  },
  "am": {
    "switcher": "ቋንቋ",
    "privacy": "የግላዊነት ፖሊሲ",
    "terms": "ውሎችና ሁኔታዎች",
    "contact": "አግኙን"
  },
  "ar": {
    "switcher": "اللغة",
    "privacy": "سياسة الخصوصية",
    "terms": "الشروط والأحكام",
    "contact": "اتصال"
  },
  "az": {
    "switcher": "Dil",
    "privacy": "Məxfilik siyasəti",
    "terms": "Şərtlər və qaydalar",
    "contact": "Əlaqə"
  },
  "be": {
    "switcher": "Мова",
    "privacy": "Палітыка прыватнасці",
    "terms": "Умовы выкарыстання",
    "contact": "Кантакт"
  },
  "bg": {
    "switcher": "Език",
    "privacy": "Политика за поверителност",
    "terms": "Общи условия",
    "contact": "Контакт"
  },
  "bn": {
    "switcher": "ভাষা",
    "privacy": "গোপনীয়তা নীতি",
    "terms": "শর্তাবলী",
    "contact": "যোগাযোগ"
  },
  "ca": {
    "switcher": "Idioma",
    "privacy": "Política de privacitat",
    "terms": "Termes i condicions",
    "contact": "Contacte"
  },
  "cs": {
    "switcher": "Jazyk",
    "privacy": "Zásady ochrany osobních údajů",
    "terms": "Podmínky používání",
    "contact": "Kontakt"
  },
  "da": {
    "switcher": "Sprog",
    "privacy": "Privatlivspolitik",
    "terms": "Vilkår og betingelser",
    "contact": "Kontakt"
  },
  "de": {
    "switcher": "Sprache",
    "privacy": "Datenschutzerklärung",
    "terms": "Nutzungsbedingungen",
    "contact": "Kontakt"
  },
  "el": {
    "switcher": "Γλώσσα",
    "privacy": "Πολιτική απορρήτου",
    "terms": "Όροι και προϋποθέσεις",
    "contact": "Επικοινωνία"
  },
  "en": {
    "switcher": "Language",
    "privacy": "Privacy Policy",
    "terms": "Terms and Conditions",
    "contact": "Contact"
  },
  "es": {
    "switcher": "Idioma",
    "privacy": "Política de privacidad",
    "terms": "Términos y condiciones",
    "contact": "Contacto"
  },
  "et": {
    "switcher": "Keel",
    "privacy": "Privaatsuspoliitika",
    "terms": "Tingimused",
    "contact": "Kontakt"
  },
  "eu": {
    "switcher": "Hizkuntza",
    "privacy": "Pribatutasun-politika",
    "terms": "Baldintzak eta erabilera-arauak",
    "contact": "Kontaktua"
  },
  "fa": {
    "switcher": "زبان",
    "privacy": "سیاست حفظ حریم خصوصی",
    "terms": "شرایط و ضوابط",
    "contact": "تماس"
  },
  "fi": {
    "switcher": "Kieli",
    "privacy": "Tietosuojakäytäntö",
    "terms": "Käyttöehdot",
    "contact": "Yhteystiedot"
  },
  "fil": {
    "switcher": "Wika",
    "privacy": "Patakaran sa Privacy",
    "terms": "Mga Tuntunin at Kundisyon",
    "contact": "Makipag-ugnayan"
  },
  "fr": {
    "switcher": "Langue",
    "privacy": "Politique de confidentialité",
    "terms": "Conditions générales",
    "contact": "Contact"
  },
  "gl": {
    "switcher": "Idioma",
    "privacy": "Política de privacidade",
    "terms": "Termos e condicións",
    "contact": "Contacto"
  },
  "gu": {
    "switcher": "ભાષા",
    "privacy": "ગોપનીયતા નીતિ",
    "terms": "નિયમો અને શરતો",
    "contact": "સંપર્ક"
  },
  "hi": {
    "switcher": "भाषा",
    "privacy": "गोपनीयता नीति",
    "terms": "नियम और शर्तें",
    "contact": "संपर्क"
  },
  "hr": {
    "switcher": "Jezik",
    "privacy": "Pravila privatnosti",
    "terms": "Uvjeti i odredbe",
    "contact": "Kontakt"
  },
  "hu": {
    "switcher": "Nyelv",
    "privacy": "Adatvédelmi irányelvek",
    "terms": "Felhasználási feltételek",
    "contact": "Kapcsolat"
  },
  "hy": {
    "switcher": "Լեզու",
    "privacy": "Գաղտնիության քաղաքականություն",
    "terms": "Պայմաններ և դրույթներ",
    "contact": "Կապ"
  },
  "in": {
    "switcher": "Bahasa",
    "privacy": "Kebijakan Privasi",
    "terms": "Syarat dan Ketentuan",
    "contact": "Kontak"
  },
  "is": {
    "switcher": "Tungumál",
    "privacy": "Persónuverndarstefna",
    "terms": "Skilmálar",
    "contact": "Hafa samband"
  },
  "it": {
    "switcher": "Lingua",
    "privacy": "Informativa sulla privacy",
    "terms": "Termini e condizioni",
    "contact": "Contatto"
  },
  "iw": {
    "switcher": "שפה",
    "privacy": "מדיניות פרטיות",
    "terms": "תנאים והגבלות",
    "contact": "צור קשר"
  },
  "ja": {
    "switcher": "言語",
    "privacy": "プライバシーポリシー",
    "terms": "利用規約",
    "contact": "お問い合わせ"
  },
  "ka": {
    "switcher": "ენა",
    "privacy": "კონფიდენციალურობის პოლიტიკა",
    "terms": "წესები და პირობები",
    "contact": "კონტაქტი"
  },
  "kk": {
    "switcher": "Тіл",
    "privacy": "Құпиялылық саясаты",
    "terms": "Шарттар мен ережелер",
    "contact": "Байланыс"
  },
  "km": {
    "switcher": "ភាសា",
    "privacy": "គោលការណ៍ឯកជនភាព",
    "terms": "លក្ខខណ្ឌប្រើប្រាស់",
    "contact": "ទំនាក់ទំនង"
  },
  "kn": {
    "switcher": "ಭಾಷೆ",
    "privacy": "ಗೌಪ್ಯತಾ ನೀತಿ",
    "terms": "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
    "contact": "ಸಂಪರ್ಕ"
  },
  "ko": {
    "switcher": "언어",
    "privacy": "개인정보 처리방침",
    "terms": "이용약관",
    "contact": "문의"
  },
  "ky": {
    "switcher": "Тил",
    "privacy": "Купуялык саясаты",
    "terms": "Шарттар жана жоболор",
    "contact": "Байланыш"
  },
  "lo": {
    "switcher": "ພາສາ",
    "privacy": "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",
    "terms": "ຂໍ້ກຳນົດແລະເງື່ອນໄຂ",
    "contact": "ຕິດຕໍ່"
  },
  "lt": {
    "switcher": "Kalba",
    "privacy": "Privatumo politika",
    "terms": "Sąlygos",
    "contact": "Kontaktai"
  },
  "lv": {
    "switcher": "Valoda",
    "privacy": "Privātuma politika",
    "terms": "Noteikumi un nosacījumi",
    "contact": "Kontakti"
  },
  "mk": {
    "switcher": "Јазик",
    "privacy": "Политика за приватност",
    "terms": "Услови и правила",
    "contact": "Контакт"
  },
  "ml": {
    "switcher": "ഭാഷ",
    "privacy": "സ്വകാര്യതാ നയം",
    "terms": "നിബന്ധനകളും വ്യവസ്ഥകളും",
    "contact": "ബന്ധപ്പെടുക"
  },
  "mn": {
    "switcher": "Хэл",
    "privacy": "Нууцлалын бодлого",
    "terms": "Үйлчилгээний нөхцөл",
    "contact": "Холбоо барих"
  },
  "mr": {
    "switcher": "भाषा",
    "privacy": "गोपनीयता धोरण",
    "terms": "अटी आणि शर्ती",
    "contact": "संपर्क"
  },
  "ms": {
    "switcher": "Bahasa",
    "privacy": "Dasar Privasi",
    "terms": "Terma dan Syarat",
    "contact": "Hubungi"
  },
  "my": {
    "switcher": "ဘာသာစကား",
    "privacy": "ကိုယ်ရေးကိုယ်တာ မူဝါဒ",
    "terms": "စည်းမျဉ်းနှင့် သတ်မှတ်ချက်များ",
    "contact": "ဆက်သွယ်ရန်"
  },
  "ne": {
    "switcher": "भाषा",
    "privacy": "गोपनीयता नीति",
    "terms": "नियम र सर्तहरू",
    "contact": "सम्पर्क"
  },
  "nl": {
    "switcher": "Taal",
    "privacy": "Privacybeleid",
    "terms": "Algemene voorwaarden",
    "contact": "Contact"
  },
  "no": {
    "switcher": "Språk",
    "privacy": "Personvernerklæring",
    "terms": "Vilkår og betingelser",
    "contact": "Kontakt"
  },
  "pa": {
    "switcher": "ਭਾਸ਼ਾ",
    "privacy": "ਗੋਪਨੀਯਤਾ ਨੀਤੀ",
    "terms": "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ",
    "contact": "ਸੰਪਰਕ"
  },
  "pl": {
    "switcher": "Język",
    "privacy": "Polityka prywatności",
    "terms": "Regulamin",
    "contact": "Kontakt"
  },
  "pt": {
    "switcher": "Idioma",
    "privacy": "Política de privacidade",
    "terms": "Termos e condições",
    "contact": "Contacto"
  },
  "rm": {
    "switcher": "Lingua",
    "privacy": "Politica da datas privatas",
    "terms": "Terms e cundiziuns",
    "contact": "Contact"
  },
  "ro": {
    "switcher": "Limbă",
    "privacy": "Politica de confidențialitate",
    "terms": "Termeni și condiții",
    "contact": "Contact"
  },
  "ru": {
    "switcher": "Язык",
    "privacy": "Политика конфиденциальности",
    "terms": "Условия использования",
    "contact": "Контакты"
  },
  "si": {
    "switcher": "භාෂාව",
    "privacy": "රහස්‍යතා ප්‍රතිපත්තිය",
    "terms": "නියමයන් සහ කොන්දේසි",
    "contact": "සම්බන්ධ වන්න"
  },
  "sk": {
    "switcher": "Jazyk",
    "privacy": "Zásady ochrany osobných údajov",
    "terms": "Podmienky používania",
    "contact": "Kontakt"
  },
  "sl": {
    "switcher": "Jezik",
    "privacy": "Pravilnik o zasebnosti",
    "terms": "Pogoji uporabe",
    "contact": "Stik"
  },
  "sq": {
    "switcher": "Gjuha",
    "privacy": "Politika e privatësisë",
    "terms": "Kushtet dhe afatet",
    "contact": "Kontakt"
  },
  "sr": {
    "switcher": "Језик",
    "privacy": "Политика приватности",
    "terms": "Услови коришћења",
    "contact": "Контакт"
  },
  "sv": {
    "switcher": "Språk",
    "privacy": "Integritetspolicy",
    "terms": "Villkor",
    "contact": "Kontakt"
  },
  "sw": {
    "switcher": "Lugha",
    "privacy": "Sera ya Faragha",
    "terms": "Sheria na Masharti",
    "contact": "Mawasiliano"
  },
  "ta": {
    "switcher": "மொழி",
    "privacy": "தனியுரிமைக் கொள்கை",
    "terms": "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
    "contact": "தொடர்பு"
  },
  "te": {
    "switcher": "భాష",
    "privacy": "గోప్యతా విధానం",
    "terms": "నిబంధనలు మరియు షరతులు",
    "contact": "సంప్రదించండి"
  },
  "th": {
    "switcher": "ภาษา",
    "privacy": "นโยบายความเป็นส่วนตัว",
    "terms": "ข้อกำหนดและเงื่อนไข",
    "contact": "ติดต่อ"
  },
  "tr": {
    "switcher": "Dil",
    "privacy": "Gizlilik Politikası",
    "terms": "Şartlar ve Koşullar",
    "contact": "İletişim"
  },
  "uk": {
    "switcher": "Мова",
    "privacy": "Політика конфіденційності",
    "terms": "Умови використання",
    "contact": "Контакт"
  },
  "ur": {
    "switcher": "زبان",
    "privacy": "رازداری کی پالیسی",
    "terms": "شرائط و ضوابط",
    "contact": "رابطہ"
  },
  "vi": {
    "switcher": "Ngôn ngữ",
    "privacy": "Chính sách quyền riêng tư",
    "terms": "Điều khoản và điều kiện",
    "contact": "Liên hệ"
  },
  "zh": {
    "switcher": "语言",
    "privacy": "隐私政策",
    "terms": "条款和条件",
    "contact": "联系"
  },
  "zu": {
    "switcher": "Ulimi",
    "privacy": "Inqubomgomo Yobumfihlo",
    "terms": "Imigomo Nemibandela",
    "contact": "Xhumana"
  }
};

  function preferredLang() {
    var stored = normalizeLang(localStorage.getItem('siteLanguage'));
    if (stored) return stored;
    var q = normalizeLang(new URLSearchParams(location.search).get('lang'));
    if (q) return q;
    var nav = navigator.languages || [navigator.language || defaultLang];
    for (var i = 0; i < nav.length; i++) {
      var n = normalizeLang(nav[i]);
      if (n) return n;
    }
    return defaultLang;
  }

  function currentLangFromPath() {
    var first = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
    return normalizeLang(first);
  }

  JRD.siteRoot = siteRoot;
  JRD.languages = languages.slice();

  /* ========================================================================
     [02] SHARED HEAD METADATA */

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
    // Metadata logic remains here if needed
  }

  /* [03] ROOT-ONLY LANGUAGE REDIRECT */
  function isRootIndexRequest() { return location.pathname === '/' || location.pathname === '/index.html'; }

  function chooseRedirectLanguage() {
    return preferredLang();
  }

  function redirectRootIfNeeded() {
    if (!isRootIndexRequest()) { return; }
    var lang = chooseRedirectLanguage();
    var target = '/' + lang + '/';
    var link = document.getElementById('redirect-link');
    if (link) { link.href = target; }
    window.setTimeout(function () { window.location.replace(target); }, 250);
  }

  /* [04] FRAGMENT LOADING */

  function renderLanguageOptions() {
    return languageOptions.map(function (item) {
      return '<option value="' + item.code + '">' + item.name + '</option>';
    }).join('');
  }

  function fallbackHeader(target) {
    target.innerHTML = '<div class="container"><nav class="nav"><a class="brand-link" href="/en/">JuanRomeroDominguez.dev</a></nav><div class="language-switcher" aria-label="Language selector"><span class="language-switcher-icon" aria-hidden="true">🌐</span><label class="language-switcher-label" for="site-language-select">Language</label><select id="site-language-select" class="language-select" title="Change language">' + renderLanguageOptions() + '</select></div></div>';
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

  /* [05] LANGUAGE SELECTOR */
  function activeLanguage() { return currentLangFromPath() || preferredLang(); }

  var contactLabels = {
  "en": {
    "title": "Contact",
    "intro": "If you want to contact me for professional reasons, app support, or any question related to this website, you can use the following form.",
    "name": "Name",
    "email": "Email",
    "antiBot": "What is 1 + 6?",
    "message": "Message",
    "send": "Send",
    "validation": "The answer to '1 + 6' is not correct.",
    "mailSubject": "Contact from juanromerodominguez.dev",
    "bodyName": "Name",
    "bodyEmail": "Email",
    "bodyMessage": "Message"
  },
  "es": {
    "title": "Contacto",
    "intro": "Si quieres contactar conmigo por motivos profesionales, soporte de una app o cualquier consulta relacionada con esta web, puedes usar el siguiente formulario.",
    "name": "Nombre",
    "email": "Email",
    "antiBot": "¿1 + 6?",
    "message": "Mensaje",
    "send": "Enviar",
    "validation": "La respuesta a '1 + 6' no es correcta.",
    "mailSubject": "Contacto desde juanromerodominguez.dev",
    "bodyName": "Nombre",
    "bodyEmail": "Email",
    "bodyMessage": "Mensaje"
  },
  "af": {
    "title": "Kontak",
    "intro": "Gebruik die volgende vorm om my te kontak vir professionele redes, toepassingondersteuning of enige vraag oor hierdie webwerf.",
    "name": "Naam",
    "email": "E-pos",
    "antiBot": "Wat is 1 + 6?",
    "message": "Boodskap",
    "send": "Stuur",
    "validation": "Die antwoord op '1 + 6' is nie korrek nie.",
    "mailSubject": "Kontak vanaf juanromerodominguez.dev",
    "bodyName": "Naam",
    "bodyEmail": "E-pos",
    "bodyMessage": "Boodskap"
  },
  "am": {
    "title": "አግኙን",
    "intro": "ለሙያዊ ምክንያቶች፣ ለመተግበሪያ ድጋፍ ወይም ከዚህ ድር ጣቢያ ጋር ለተያያዘ ጥያቄ ይህን ቅጽ መጠቀም ይችላሉ።",
    "name": "ስም",
    "email": "ኢሜይል",
    "antiBot": "1 + 6 ስንት ነው?",
    "message": "መልዕክት",
    "send": "ላክ",
    "validation": "የ'1 + 6' መልስ ትክክል አይደለም።",
    "mailSubject": "ከ juanromerodominguez.dev የተላከ ግንኙነት",
    "bodyName": "ስም",
    "bodyEmail": "ኢሜይል",
    "bodyMessage": "መልዕክት"
  },
  "ar": {
    "title": "اتصال",
    "intro": "إذا كنت ترغب في التواصل معي لأسباب مهنية أو للحصول على دعم لتطبيق أو لأي استفسار متعلق بهذا الموقع، يمكنك استخدام النموذج التالي.",
    "name": "الاسم",
    "email": "البريد الإلكتروني",
    "antiBot": "ما ناتج 1 + 6؟",
    "message": "الرسالة",
    "send": "إرسال",
    "validation": "الإجابة على '1 + 6' غير صحيحة.",
    "mailSubject": "تواصل من juanromerodominguez.dev",
    "bodyName": "الاسم",
    "bodyEmail": "البريد الإلكتروني",
    "bodyMessage": "الرسالة"
  },
  "az": {
    "title": "Əlaqə",
    "intro": "Peşəkar səbəblər, tətbiq dəstəyi və ya bu vebsaytla bağlı hər hansı sual üçün mənimlə əlaqə saxlamaq istəyirsinizsə, bu formadan istifadə edə bilərsiniz.",
    "name": "Ad",
    "email": "E-poçt",
    "antiBot": "1 + 6 neçə edir?",
    "message": "Mesaj",
    "send": "Göndər",
    "validation": "'1 + 6' cavabı düzgün deyil.",
    "mailSubject": "juanromerodominguez.dev saytından əlaqə",
    "bodyName": "Ad",
    "bodyEmail": "E-poçt",
    "bodyMessage": "Mesaj"
  },
  "be": {
    "title": "Кантакт",
    "intro": "Калі вы хочаце звязацца са мной па прафесійных пытаннях, для падтрымкі праграмы або па пытаннях гэтага сайта, выкарыстоўвайце наступную форму.",
    "name": "Імя",
    "email": "Email",
    "antiBot": "Колькі будзе 1 + 6?",
    "message": "Паведамленне",
    "send": "Адправіць",
    "validation": "Адказ на '1 + 6' няправільны.",
    "mailSubject": "Кантакт з juanromerodominguez.dev",
    "bodyName": "Імя",
    "bodyEmail": "Email",
    "bodyMessage": "Паведамленне"
  },
  "bg": {
    "title": "Контакт",
    "intro": "Ако искате да се свържете с мен по професионални причини, за поддръжка на приложение или за въпрос относно този сайт, използвайте следната форма.",
    "name": "Име",
    "email": "Имейл",
    "antiBot": "Колко е 1 + 6?",
    "message": "Съобщение",
    "send": "Изпрати",
    "validation": "Отговорът на '1 + 6' не е правилен.",
    "mailSubject": "Контакт от juanromerodominguez.dev",
    "bodyName": "Име",
    "bodyEmail": "Имейл",
    "bodyMessage": "Съобщение"
  },
  "bn": {
    "title": "যোগাযোগ",
    "intro": "পেশাগত কারণে, কোনো অ্যাপের সহায়তার জন্য বা এই ওয়েবসাইট সম্পর্কিত যেকোনো প্রশ্নে আমার সঙ্গে যোগাযোগ করতে চাইলে নিচের ফর্মটি ব্যবহার করতে পারেন।",
    "name": "নাম",
    "email": "ইমেইল",
    "antiBot": "১ + ৬ কত?",
    "message": "বার্তা",
    "send": "পাঠান",
    "validation": "'1 + 6' এর উত্তর সঠিক নয়।",
    "mailSubject": "juanromerodominguez.dev থেকে যোগাযোগ",
    "bodyName": "নাম",
    "bodyEmail": "ইমেইল",
    "bodyMessage": "বার্তা"
  },
  "ca": {
    "title": "Contacte",
    "intro": "Si vols contactar amb mi per motius professionals, suport d’una app o qualsevol consulta relacionada amb aquesta web, pots utilitzar el formulari següent.",
    "name": "Nom",
    "email": "Email",
    "antiBot": "Quant és 1 + 6?",
    "message": "Missatge",
    "send": "Enviar",
    "validation": "La resposta a '1 + 6' no és correcta.",
    "mailSubject": "Contacte des de juanromerodominguez.dev",
    "bodyName": "Nom",
    "bodyEmail": "Email",
    "bodyMessage": "Missatge"
  },
  "cs": {
    "title": "Kontakt",
    "intro": "Pokud mě chcete kontaktovat z profesních důvodů, kvůli podpoře aplikace nebo s dotazem k tomuto webu, použijte následující formulář.",
    "name": "Jméno",
    "email": "E-mail",
    "antiBot": "Kolik je 1 + 6?",
    "message": "Zpráva",
    "send": "Odeslat",
    "validation": "Odpověď na '1 + 6' není správná.",
    "mailSubject": "Kontakt z juanromerodominguez.dev",
    "bodyName": "Jméno",
    "bodyEmail": "E-mail",
    "bodyMessage": "Zpráva"
  },
  "da": {
    "title": "Kontakt",
    "intro": "Hvis du vil kontakte mig af professionelle årsager, for app-support eller med et spørgsmål om dette websted, kan du bruge formularen nedenfor.",
    "name": "Navn",
    "email": "E-mail",
    "antiBot": "Hvad er 1 + 6?",
    "message": "Besked",
    "send": "Send",
    "validation": "Svaret på '1 + 6' er ikke korrekt.",
    "mailSubject": "Kontakt fra juanromerodominguez.dev",
    "bodyName": "Navn",
    "bodyEmail": "E-mail",
    "bodyMessage": "Besked"
  },
  "de": {
    "title": "Kontakt",
    "intro": "Wenn du mich aus beruflichen Gründen, für App-Support oder wegen einer Frage zu dieser Website kontaktieren möchtest, kannst du das folgende Formular verwenden.",
    "name": "Name",
    "email": "E-Mail",
    "antiBot": "Was ist 1 + 6?",
    "message": "Nachricht",
    "send": "Senden",
    "validation": "Die Antwort auf '1 + 6' ist nicht korrekt.",
    "mailSubject": "Kontakt über juanromerodominguez.dev",
    "bodyName": "Name",
    "bodyEmail": "E-Mail",
    "bodyMessage": "Nachricht"
  },
  "el": {
    "title": "Επικοινωνία",
    "intro": "Αν θέλετε να επικοινωνήσετε μαζί μου για επαγγελματικούς λόγους, υποστήριξη εφαρμογής ή οποιαδήποτε ερώτηση σχετικά με αυτόν τον ιστότοπο, μπορείτε να χρησιμοποιήσετε την παρακάτω φόρμα.",
    "name": "Όνομα",
    "email": "Email",
    "antiBot": "Πόσο κάνει 1 + 6;",
    "message": "Μήνυμα",
    "send": "Αποστολή",
    "validation": "Η απάντηση στο '1 + 6' δεν είναι σωστή.",
    "mailSubject": "Επικοινωνία από juanromerodominguez.dev",
    "bodyName": "Όνομα",
    "bodyEmail": "Email",
    "bodyMessage": "Μήνυμα"
  },
  "et": {
    "title": "Kontakt",
    "intro": "Kui soovite minuga ühendust võtta tööalasel põhjusel, rakenduse toe saamiseks või selle veebisaidi küsimusega, kasutage järgmist vormi.",
    "name": "Nimi",
    "email": "E-post",
    "antiBot": "Kui palju on 1 + 6?",
    "message": "Sõnum",
    "send": "Saada",
    "validation": "Vastus küsimusele '1 + 6' ei ole õige.",
    "mailSubject": "Kontakt saidilt juanromerodominguez.dev",
    "bodyName": "Nimi",
    "bodyEmail": "E-post",
    "bodyMessage": "Sõnum"
  },
  "eu": {
    "title": "Kontaktua",
    "intro": "Arrazoi profesionalengatik, aplikazio baten laguntzagatik edo webgune honi buruzko edozein galderagatik nirekin harremanetan jarri nahi baduzu, erabili formulario hau.",
    "name": "Izena",
    "email": "Emaila",
    "antiBot": "Zenbat da 1 + 6?",
    "message": "Mezua",
    "send": "Bidali",
    "validation": "'1 + 6' erantzuna ez da zuzena.",
    "mailSubject": "Kontaktua juanromerodominguez.dev webgunetik",
    "bodyName": "Izena",
    "bodyEmail": "Emaila",
    "bodyMessage": "Mezua"
  },
  "fa": {
    "title": "تماس",
    "intro": "اگر می‌خواهید برای امور حرفه‌ای، پشتیبانی برنامه یا هر پرسش مرتبط با این وب‌سایت با من تماس بگیرید، می‌توانید از فرم زیر استفاده کنید.",
    "name": "نام",
    "email": "ایمیل",
    "antiBot": "حاصل 1 + 6 چیست؟",
    "message": "پیام",
    "send": "ارسال",
    "validation": "پاسخ '1 + 6' درست نیست.",
    "mailSubject": "تماس از juanromerodominguez.dev",
    "bodyName": "نام",
    "bodyEmail": "ایمیل",
    "bodyMessage": "پیام"
  },
  "fi": {
    "title": "Yhteystiedot",
    "intro": "Jos haluat ottaa yhteyttä ammatillisista syistä, sovellustuen vuoksi tai tästä sivustosta, voit käyttää seuraavaa lomaketta.",
    "name": "Nimi",
    "email": "Sähköposti",
    "antiBot": "Paljonko on 1 + 6?",
    "message": "Viesti",
    "send": "Lähetä",
    "validation": "Vastaus kohtaan '1 + 6' ei ole oikein.",
    "mailSubject": "Yhteydenotto sivustolta juanromerodominguez.dev",
    "bodyName": "Nimi",
    "bodyEmail": "Sähköposti",
    "bodyMessage": "Viesti"
  },
  "fil": {
    "title": "Makipag-ugnayan",
    "intro": "Kung gusto mo akong kontakin para sa propesyonal na dahilan, suporta sa app, o anumang tanong tungkol sa website na ito, gamitin ang form na ito.",
    "name": "Pangalan",
    "email": "Email",
    "antiBot": "Ano ang 1 + 6?",
    "message": "Mensahe",
    "send": "Ipadala",
    "validation": "Hindi tama ang sagot sa '1 + 6'.",
    "mailSubject": "Contact mula sa juanromerodominguez.dev",
    "bodyName": "Pangalan",
    "bodyEmail": "Email",
    "bodyMessage": "Mensahe"
  },
  "fr": {
    "title": "Contact",
    "intro": "Si vous souhaitez me contacter pour des raisons professionnelles, pour le support d’une application ou pour toute question liée à ce site, vous pouvez utiliser le formulaire suivant.",
    "name": "Nom",
    "email": "E-mail",
    "antiBot": "Combien font 1 + 6 ?",
    "message": "Message",
    "send": "Envoyer",
    "validation": "La réponse à '1 + 6' n’est pas correcte.",
    "mailSubject": "Contact depuis juanromerodominguez.dev",
    "bodyName": "Nom",
    "bodyEmail": "E-mail",
    "bodyMessage": "Message"
  },
  "gl": {
    "title": "Contacto",
    "intro": "Se queres contactar comigo por motivos profesionais, soporte dunha app ou calquera consulta relacionada con esta web, podes usar o seguinte formulario.",
    "name": "Nome",
    "email": "Email",
    "antiBot": "Canto é 1 + 6?",
    "message": "Mensaxe",
    "send": "Enviar",
    "validation": "A resposta a '1 + 6' non é correcta.",
    "mailSubject": "Contacto desde juanromerodominguez.dev",
    "bodyName": "Nome",
    "bodyEmail": "Email",
    "bodyMessage": "Mensaxe"
  },
  "gu": {
    "title": "સંપર્ક",
    "intro": "વ્યવસાયિક કારણો, એપ સપોર્ટ અથવા આ વેબસાઇટ સંબંધિત કોઈ પ્રશ્ન માટે મારો સંપર્ક કરવા માટે આ ફોર્મનો ઉપયોગ કરો.",
    "name": "નામ",
    "email": "ઇમેઇલ",
    "antiBot": "1 + 6 કેટલું થાય?",
    "message": "સંદેશ",
    "send": "મોકલો",
    "validation": "'1 + 6' નો જવાબ સાચો નથી.",
    "mailSubject": "juanromerodominguez.dev પરથી સંપર્ક",
    "bodyName": "નામ",
    "bodyEmail": "ઇમેઇલ",
    "bodyMessage": "સંદેશ"
  },
  "hi": {
    "title": "संपर्क",
    "intro": "यदि आप पेशेवर कारणों, किसी ऐप के समर्थन या इस वेबसाइट से जुड़े किसी प्रश्न के लिए मुझसे संपर्क करना चाहते हैं, तो आप नीचे दिए गए फ़ॉर्म का उपयोग कर सकते हैं।",
    "name": "नाम",
    "email": "ईमेल",
    "antiBot": "1 + 6 कितना होता है?",
    "message": "संदेश",
    "send": "भेजें",
    "validation": "'1 + 6' का उत्तर सही नहीं है।",
    "mailSubject": "juanromerodominguez.dev से संपर्क",
    "bodyName": "नाम",
    "bodyEmail": "ईमेल",
    "bodyMessage": "संदेश"
  },
  "hr": {
    "title": "Kontakt",
    "intro": "Ako me želite kontaktirati iz profesionalnih razloga, zbog podrške za aplikaciju ili pitanja o ovoj web-stranici, možete upotrijebiti sljedeći obrazac.",
    "name": "Ime",
    "email": "Email",
    "antiBot": "Koliko je 1 + 6?",
    "message": "Poruka",
    "send": "Pošalji",
    "validation": "Odgovor na '1 + 6' nije točan.",
    "mailSubject": "Kontakt s juanromerodominguez.dev",
    "bodyName": "Ime",
    "bodyEmail": "Email",
    "bodyMessage": "Poruka"
  },
  "hu": {
    "title": "Kapcsolat",
    "intro": "Ha szakmai okból, alkalmazástámogatás miatt vagy ezzel a webhellyel kapcsolatos kérdésben szeretnél kapcsolatba lépni velem, használd az alábbi űrlapot.",
    "name": "Név",
    "email": "Email",
    "antiBot": "Mennyi 1 + 6?",
    "message": "Üzenet",
    "send": "Küldés",
    "validation": "Az '1 + 6' válasza nem helyes.",
    "mailSubject": "Kapcsolat a juanromerodominguez.dev oldalról",
    "bodyName": "Név",
    "bodyEmail": "Email",
    "bodyMessage": "Üzenet"
  },
  "hy": {
    "title": "Կապ",
    "intro": "Եթե ցանկանում եք կապվել ինձ հետ մասնագիտական պատճառներով, հավելվածի աջակցման կամ այս կայքի վերաբերյալ հարցերի համար, օգտագործեք այս ձևը։",
    "name": "Անուն",
    "email": "Էլ. փոստ",
    "antiBot": "Որքա՞ն է 1 + 6-ը",
    "message": "Հաղորդագրություն",
    "send": "Ուղարկել",
    "validation": "'1 + 6' պատասխանը ճիշտ չէ։",
    "mailSubject": "Կապ juanromerodominguez.dev-ից",
    "bodyName": "Անուն",
    "bodyEmail": "Էլ. փոստ",
    "bodyMessage": "Հաղորդագրություն"
  },
  "in": {
    "title": "Kontak",
    "intro": "Jika Anda ingin menghubungi saya untuk keperluan profesional, dukungan aplikasi, atau pertanyaan apa pun terkait situs web ini, Anda dapat menggunakan formulir berikut.",
    "name": "Nama",
    "email": "Email",
    "antiBot": "Berapa 1 + 6?",
    "message": "Pesan",
    "send": "Kirim",
    "validation": "Jawaban untuk '1 + 6' tidak benar.",
    "mailSubject": "Kontak dari juanromerodominguez.dev",
    "bodyName": "Nama",
    "bodyEmail": "Email",
    "bodyMessage": "Pesan"
  },
  "is": {
    "title": "Hafa samband",
    "intro": "Ef þú vilt hafa samband vegna faglegra ástæðna, stuðnings við app eða spurningar um þessa síðu geturðu notað eyðublaðið hér að neðan.",
    "name": "Nafn",
    "email": "Netfang",
    "antiBot": "Hvað er 1 + 6?",
    "message": "Skilaboð",
    "send": "Senda",
    "validation": "Svarið við '1 + 6' er ekki rétt.",
    "mailSubject": "Skilaboð frá juanromerodominguez.dev",
    "bodyName": "Nafn",
    "bodyEmail": "Netfang",
    "bodyMessage": "Skilaboð"
  },
  "it": {
    "title": "Contatto",
    "intro": "Se vuoi contattarmi per motivi professionali, per il supporto di un’app o per qualsiasi domanda relativa a questo sito, puoi usare il seguente modulo.",
    "name": "Nome",
    "email": "Email",
    "antiBot": "Quanto fa 1 + 6?",
    "message": "Messaggio",
    "send": "Invia",
    "validation": "La risposta a '1 + 6' non è corretta.",
    "mailSubject": "Contatto da juanromerodominguez.dev",
    "bodyName": "Nome",
    "bodyEmail": "Email",
    "bodyMessage": "Messaggio"
  },
  "iw": {
    "title": "צור קשר",
    "intro": "אם ברצונך ליצור איתי קשר מסיבות מקצועיות, לתמיכה באפליקציה או לכל שאלה הקשורה לאתר זה, ניתן להשתמש בטופס הבא.",
    "name": "שם",
    "email": "אימייל",
    "antiBot": "כמה זה 1 + 6?",
    "message": "הודעה",
    "send": "שלח",
    "validation": "התשובה ל-'1 + 6' אינה נכונה.",
    "mailSubject": "פנייה מ-juanromerodominguez.dev",
    "bodyName": "שם",
    "bodyEmail": "אימייל",
    "bodyMessage": "הודעה"
  },
  "ja": {
    "title": "お問い合わせ",
    "intro": "専門的な理由、アプリのサポート、またはこのウェブサイトに関する質問で連絡したい場合は、次のフォームを使用できます。",
    "name": "名前",
    "email": "メール",
    "antiBot": "1 + 6 はいくつですか？",
    "message": "メッセージ",
    "send": "送信",
    "validation": "'1 + 6' の答えが正しくありません。",
    "mailSubject": "juanromerodominguez.dev からのお問い合わせ",
    "bodyName": "名前",
    "bodyEmail": "メール",
    "bodyMessage": "メッセージ"
  },
  "ka": {
    "title": "კონტაქტი",
    "intro": "თუ გსურთ დამიკავშირდეთ პროფესიული მიზეზით, აპის მხარდაჭერისთვის ან ამ ვებსაიტთან დაკავშირებული კითხვით, გამოიყენეთ შემდეგი ფორმა.",
    "name": "სახელი",
    "email": "ელფოსტა",
    "antiBot": "რამდენია 1 + 6?",
    "message": "შეტყობინება",
    "send": "გაგზავნა",
    "validation": "'1 + 6' პასუხი არასწორია.",
    "mailSubject": "კონტაქტი juanromerodominguez.dev-დან",
    "bodyName": "სახელი",
    "bodyEmail": "ელფოსტა",
    "bodyMessage": "შეტყობინება"
  },
  "kk": {
    "title": "Байланыс",
    "intro": "Кәсіби себептермен, қолданба қолдауы үшін немесе осы сайтқа қатысты сұрақ бойынша хабарласқыңыз келсе, осы форманы пайдаланыңыз.",
    "name": "Аты",
    "email": "Email",
    "antiBot": "1 + 6 қанша?",
    "message": "Хабарлама",
    "send": "Жіберу",
    "validation": "'1 + 6' жауабы дұрыс емес.",
    "mailSubject": "juanromerodominguez.dev сайтынан байланыс",
    "bodyName": "Аты",
    "bodyEmail": "Email",
    "bodyMessage": "Хабарлама"
  },
  "km": {
    "title": "ទំនាក់ទំនង",
    "intro": "ប្រសិនបើអ្នកចង់ទាក់ទងខ្ញុំសម្រាប់ហេតុផលវិជ្ជាជីវៈ ជំនួយកម្មវិធី ឬសំណួរអំពីគេហទំព័រនេះ សូមប្រើទម្រង់ខាងក្រោម។",
    "name": "ឈ្មោះ",
    "email": "អ៊ីមែល",
    "antiBot": "1 + 6 ស្មើប៉ុន្មាន?",
    "message": "សារ",
    "send": "ផ្ញើ",
    "validation": "ចម្លើយសម្រាប់ '1 + 6' មិនត្រឹមត្រូវទេ។",
    "mailSubject": "ទំនាក់ទំនងពី juanromerodominguez.dev",
    "bodyName": "ឈ្មោះ",
    "bodyEmail": "អ៊ីមែល",
    "bodyMessage": "សារ"
  },
  "kn": {
    "title": "ಸಂಪರ್ಕ",
    "intro": "ವೃತ್ತಿಪರ ಕಾರಣಗಳಿಗೆ, ಆಪ್ ಬೆಂಬಲಕ್ಕೆ ಅಥವಾ ಈ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಶ್ನೆಗೆ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ಈ ಫಾರ್ಮ್ ಬಳಸಿ.",
    "name": "ಹೆಸರು",
    "email": "ಇಮೇಲ್",
    "antiBot": "1 + 6 ಎಷ್ಟು?",
    "message": "ಸಂದೇಶ",
    "send": "ಕಳುಹಿಸಿ",
    "validation": "'1 + 6' ಉತ್ತರ ಸರಿಯಲ್ಲ.",
    "mailSubject": "juanromerodominguez.dev ನಿಂದ ಸಂಪರ್ಕ",
    "bodyName": "ಹೆಸರು",
    "bodyEmail": "ಇಮೇಲ್",
    "bodyMessage": "ಸಂದೇಶ"
  },
  "ko": {
    "title": "문의",
    "intro": "전문적인 이유, 앱 지원 또는 이 웹사이트와 관련된 질문으로 연락하려면 다음 양식을 사용할 수 있습니다.",
    "name": "이름",
    "email": "이메일",
    "antiBot": "1 + 6은 얼마입니까?",
    "message": "메시지",
    "send": "보내기",
    "validation": "'1 + 6'의 답이 올바르지 않습니다.",
    "mailSubject": "juanromerodominguez.dev에서 온 문의",
    "bodyName": "이름",
    "bodyEmail": "이메일",
    "bodyMessage": "메시지"
  },
  "ky": {
    "title": "Байланыш",
    "intro": "Кесиптик себептер, колдонмо колдоосу же бул сайт боюнча суроо үчүн мага кайрылгыңыз келсе, төмөнкү форманы колдонуңуз.",
    "name": "Аты",
    "email": "Email",
    "antiBot": "1 + 6 канча?",
    "message": "Билдирүү",
    "send": "Жөнөтүү",
    "validation": "'1 + 6' жообу туура эмес.",
    "mailSubject": "juanromerodominguez.dev сайтынан байланыш",
    "bodyName": "Аты",
    "bodyEmail": "Email",
    "bodyMessage": "Билдирүү"
  },
  "lo": {
    "title": "ຕິດຕໍ່",
    "intro": "ຖ້າທ່ານຕ້ອງການຕິດຕໍ່ຂ້ອຍເພື່ອເຫດຜົນວິຊາຊີບ ການສະໜັບສະໜູນແອັບ ຫຼືຄຳຖາມກ່ຽວກັບເວັບໄຊນີ້ ໃຊ້ແບບຟອມນີ້.",
    "name": "ຊື່",
    "email": "ອີເມວ",
    "antiBot": "1 + 6 ເທົ່າໃດ?",
    "message": "ຂໍ້ຄວາມ",
    "send": "ສົ່ງ",
    "validation": "ຄຳຕອບຂອງ '1 + 6' ບໍ່ຖືກຕ້ອງ.",
    "mailSubject": "ຕິດຕໍ່ຈາກ juanromerodominguez.dev",
    "bodyName": "ຊື່",
    "bodyEmail": "ອີເມວ",
    "bodyMessage": "ຂໍ້ຄວາມ"
  },
  "lt": {
    "title": "Kontaktai",
    "intro": "Jei norite susisiekti profesiniais klausimais, dėl programėlės palaikymo ar klausimo apie šią svetainę, naudokite šią formą.",
    "name": "Vardas",
    "email": "El. paštas",
    "antiBot": "Kiek yra 1 + 6?",
    "message": "Žinutė",
    "send": "Siųsti",
    "validation": "Atsakymas į '1 + 6' neteisingas.",
    "mailSubject": "Kontaktas iš juanromerodominguez.dev",
    "bodyName": "Vardas",
    "bodyEmail": "El. paštas",
    "bodyMessage": "Žinutė"
  },
  "lv": {
    "title": "Kontakti",
    "intro": "Ja vēlaties sazināties ar mani profesionālu iemeslu, lietotnes atbalsta vai jautājuma par šo vietni dēļ, izmantojiet šo veidlapu.",
    "name": "Vārds",
    "email": "E-pasts",
    "antiBot": "Cik ir 1 + 6?",
    "message": "Ziņojums",
    "send": "Sūtīt",
    "validation": "Atbilde uz '1 + 6' nav pareiza.",
    "mailSubject": "Ziņa no juanromerodominguez.dev",
    "bodyName": "Vārds",
    "bodyEmail": "E-pasts",
    "bodyMessage": "Ziņojums"
  },
  "mk": {
    "title": "Контакт",
    "intro": "Ако сакате да ме контактирате по професионални причини, за поддршка на апликација или прашање за оваа веб-страница, користете ја следната форма.",
    "name": "Име",
    "email": "Е-пошта",
    "antiBot": "Колку е 1 + 6?",
    "message": "Порака",
    "send": "Испрати",
    "validation": "Одговорот на '1 + 6' не е точен.",
    "mailSubject": "Контакт од juanromerodominguez.dev",
    "bodyName": "Име",
    "bodyEmail": "Е-пошта",
    "bodyMessage": "Порака"
  },
  "ml": {
    "title": "ബന്ധപ്പെടുക",
    "intro": "പ്രൊഫഷണൽ കാരണങ്ങൾക്കോ ആപ്പ് പിന്തുണയ്ക്കോ ഈ വെബ്സൈറ്റുമായി ബന്ധപ്പെട്ട ചോദ്യത്തിനോ എന്നെ ബന്ധപ്പെടാൻ ഈ ഫോം ഉപയോഗിക്കാം.",
    "name": "പേര്",
    "email": "ഇമെയിൽ",
    "antiBot": "1 + 6 എത്ര?",
    "message": "സന്ദേശം",
    "send": "അയയ്ക്കുക",
    "validation": "'1 + 6'ന്റെ ഉത്തരം ശരിയല്ല.",
    "mailSubject": "juanromerodominguez.dev-ൽ നിന്നുള്ള ബന്ധപ്പെടൽ",
    "bodyName": "പേര്",
    "bodyEmail": "ഇമെയിൽ",
    "bodyMessage": "സന്ദേശം"
  },
  "mn": {
    "title": "Холбоо барих",
    "intro": "Мэргэжлийн шалтгаан, аппын дэмжлэг эсвэл энэ вэбсайттай холбоотой асуултаар надтай холбогдох бол энэ маягтыг ашиглана уу.",
    "name": "Нэр",
    "email": "Имэйл",
    "antiBot": "1 + 6 хэд вэ?",
    "message": "Зурвас",
    "send": "Илгээх",
    "validation": "'1 + 6' хариулт буруу байна.",
    "mailSubject": "juanromerodominguez.dev-с ирсэн холбоо",
    "bodyName": "Нэр",
    "bodyEmail": "Имэйл",
    "bodyMessage": "Зурвас"
  },
  "mr": {
    "title": "संपर्क",
    "intro": "व्यावसायिक कारणांसाठी, अॅप समर्थनासाठी किंवा या वेबसाइटशी संबंधित प्रश्नासाठी माझ्याशी संपर्क साधण्यासाठी हा फॉर्म वापरा.",
    "name": "नाव",
    "email": "ईमेल",
    "antiBot": "1 + 6 किती?",
    "message": "संदेश",
    "send": "पाठवा",
    "validation": "'1 + 6' चे उत्तर बरोबर नाही.",
    "mailSubject": "juanromerodominguez.dev वरून संपर्क",
    "bodyName": "नाव",
    "bodyEmail": "ईमेल",
    "bodyMessage": "संदेश"
  },
  "ms": {
    "title": "Hubungi",
    "intro": "Jika anda ingin menghubungi saya atas sebab profesional, sokongan aplikasi atau sebarang pertanyaan berkaitan laman web ini, gunakan borang berikut.",
    "name": "Nama",
    "email": "E-mel",
    "antiBot": "Berapakah 1 + 6?",
    "message": "Mesej",
    "send": "Hantar",
    "validation": "Jawapan untuk '1 + 6' tidak betul.",
    "mailSubject": "Hubungan daripada juanromerodominguez.dev",
    "bodyName": "Nama",
    "bodyEmail": "E-mel",
    "bodyMessage": "Mesej"
  },
  "my": {
    "title": "ဆက်သွယ်ရန်",
    "intro": "အလုပ်ဆိုင်ရာ အကြောင်းပြချက်များ၊ အက်ပ်ပံ့ပိုးမှု သို့မဟုတ် ဤဝဘ်ဆိုက်နှင့်ပတ်သက်သော မေးခွန်းများအတွက် ကျွန်ုပ်ကို ဆက်သွယ်လိုပါက ဤဖောင်ကို အသုံးပြုပါ။",
    "name": "အမည်",
    "email": "အီးမေးလ်",
    "antiBot": "1 + 6 ဘယ်လောက်လဲ?",
    "message": "စာတို",
    "send": "ပို့ရန်",
    "validation": "'1 + 6' အဖြေ မမှန်ပါ။",
    "mailSubject": "juanromerodominguez.dev မှ ဆက်သွယ်မှု",
    "bodyName": "အမည်",
    "bodyEmail": "အီးမေးလ်",
    "bodyMessage": "စာတို"
  },
  "ne": {
    "title": "सम्पर्क",
    "intro": "व्यावसायिक कारण, एप समर्थन वा यस वेबसाइटसँग सम्बन्धित प्रश्नका लागि मलाई सम्पर्क गर्न चाहनुहुन्छ भने यो फारम प्रयोग गर्नुहोस्।",
    "name": "नाम",
    "email": "इमेल",
    "antiBot": "1 + 6 कति हुन्छ?",
    "message": "सन्देश",
    "send": "पठाउनुहोस्",
    "validation": "'1 + 6' को उत्तर सही छैन।",
    "mailSubject": "juanromerodominguez.dev बाट सम्पर्क",
    "bodyName": "नाम",
    "bodyEmail": "इमेल",
    "bodyMessage": "सन्देश"
  },
  "nl": {
    "title": "Contact",
    "intro": "Als je contact met mij wilt opnemen voor professionele redenen, app-ondersteuning of een vraag over deze website, gebruik dan het volgende formulier.",
    "name": "Naam",
    "email": "E-mail",
    "antiBot": "Wat is 1 + 6?",
    "message": "Bericht",
    "send": "Verzenden",
    "validation": "Het antwoord op '1 + 6' is niet correct.",
    "mailSubject": "Contact vanaf juanromerodominguez.dev",
    "bodyName": "Naam",
    "bodyEmail": "E-mail",
    "bodyMessage": "Bericht"
  },
  "no": {
    "title": "Kontakt",
    "intro": "Hvis du vil kontakte meg av profesjonelle grunner, for appstøtte eller med spørsmål om dette nettstedet, kan du bruke skjemaet nedenfor.",
    "name": "Navn",
    "email": "E-post",
    "antiBot": "Hva er 1 + 6?",
    "message": "Melding",
    "send": "Send",
    "validation": "Svaret på '1 + 6' er ikke riktig.",
    "mailSubject": "Kontakt fra juanromerodominguez.dev",
    "bodyName": "Navn",
    "bodyEmail": "E-post",
    "bodyMessage": "Melding"
  },
  "pa": {
    "title": "ਸੰਪਰਕ",
    "intro": "ਪੇਸ਼ੇਵਰ ਕਾਰਨਾਂ, ਐਪ ਸਹਾਇਤਾ ਜਾਂ ਇਸ ਵੈਬਸਾਈਟ ਨਾਲ ਜੁੜੇ ਸਵਾਲ ਲਈ ਮੇਰੇ ਨਾਲ ਸੰਪਰਕ ਕਰਨ ਲਈ ਇਹ ਫਾਰਮ ਵਰਤੋ।",
    "name": "ਨਾਮ",
    "email": "ਈਮੇਲ",
    "antiBot": "1 + 6 ਕਿੰਨਾ ਹੁੰਦਾ ਹੈ?",
    "message": "ਸੁਨੇਹਾ",
    "send": "ਭੇਜੋ",
    "validation": "'1 + 6' ਦਾ ਜਵਾਬ ਸਹੀ ਨਹੀਂ ਹੈ।",
    "mailSubject": "juanromerodominguez.dev ਤੋਂ ਸੰਪਰਕ",
    "bodyName": "ਨਾਮ",
    "bodyEmail": "ਈਮੇਲ",
    "bodyMessage": "ਸੁਨੇਹਾ"
  },
  "pl": {
    "title": "Kontakt",
    "intro": "Jeśli chcesz skontaktować się ze mną w sprawach zawodowych, wsparcia aplikacji lub pytań dotyczących tej strony, użyj poniższego formularza.",
    "name": "Imię",
    "email": "E-mail",
    "antiBot": "Ile to 1 + 6?",
    "message": "Wiadomość",
    "send": "Wyślij",
    "validation": "Odpowiedź na '1 + 6' jest nieprawidłowa.",
    "mailSubject": "Kontakt z juanromerodominguez.dev",
    "bodyName": "Imię",
    "bodyEmail": "E-mail",
    "bodyMessage": "Wiadomość"
  },
  "pt": {
    "title": "Contacto",
    "intro": "Se quiser entrar em contacto comigo por motivos profissionais, suporte de uma app ou qualquer questão relacionada com este site, pode usar o formulário seguinte.",
    "name": "Nome",
    "email": "Email",
    "antiBot": "Quanto é 1 + 6?",
    "message": "Mensagem",
    "send": "Enviar",
    "validation": "A resposta a '1 + 6' não está correta.",
    "mailSubject": "Contacto a partir de juanromerodominguez.dev",
    "bodyName": "Nome",
    "bodyEmail": "Email",
    "bodyMessage": "Mensagem"
  },
  "rm": {
    "title": "Contact",
    "intro": "Sche vulais contactar mai per motivs professiunals, sustegn d’ina app u dumondas davart questa pagina, pudais duvrar quest formular.",
    "name": "Num",
    "email": "E-mail",
    "antiBot": "Quant è 1 + 6?",
    "message": "Messadi",
    "send": "Trametter",
    "validation": "La resposta a '1 + 6' n’è betg correcta.",
    "mailSubject": "Contact da juanromerodominguez.dev",
    "bodyName": "Num",
    "bodyEmail": "E-mail",
    "bodyMessage": "Messadi"
  },
  "ro": {
    "title": "Contact",
    "intro": "Dacă vrei să mă contactezi din motive profesionale, pentru suportul unei aplicații sau pentru întrebări despre acest site, poți folosi formularul următor.",
    "name": "Nume",
    "email": "Email",
    "antiBot": "Cât este 1 + 6?",
    "message": "Mesaj",
    "send": "Trimite",
    "validation": "Răspunsul la '1 + 6' nu este corect.",
    "mailSubject": "Contact de pe juanromerodominguez.dev",
    "bodyName": "Nume",
    "bodyEmail": "Email",
    "bodyMessage": "Mesaj"
  },
  "ru": {
    "title": "Контакты",
    "intro": "Если вы хотите связаться со мной по профессиональным вопросам, поддержке приложения или вопросам об этом сайте, используйте следующую форму.",
    "name": "Имя",
    "email": "Email",
    "antiBot": "Сколько будет 1 + 6?",
    "message": "Сообщение",
    "send": "Отправить",
    "validation": "Ответ на '1 + 6' неверен.",
    "mailSubject": "Контакт с juanromerodominguez.dev",
    "bodyName": "Имя",
    "bodyEmail": "Email",
    "bodyMessage": "Сообщение"
  },
  "si": {
    "title": "සම්බන්ධ වන්න",
    "intro": "වෘත්තීය හේතු, යෙදුම් සහාය හෝ මෙම වෙබ් අඩවිය පිළිබඳ ප්‍රශ්නයක් සඳහා මා සම්බන්ධ කර ගැනීමට මෙම පෝරමය භාවිත කරන්න.",
    "name": "නම",
    "email": "ඊමේල්",
    "antiBot": "1 + 6 කීයද?",
    "message": "පණිවිඩය",
    "send": "යවන්න",
    "validation": "'1 + 6' සඳහා පිළිතුර නිවැරදි නොවේ.",
    "mailSubject": "juanromerodominguez.dev වෙතින් සම්බන්ධතාව",
    "bodyName": "නම",
    "bodyEmail": "ඊමේල්",
    "bodyMessage": "පණිවිඩය"
  },
  "sk": {
    "title": "Kontakt",
    "intro": "Ak ma chcete kontaktovať z profesionálnych dôvodov, pre podporu aplikácie alebo s otázkou k tejto stránke, použite nasledujúci formulár.",
    "name": "Meno",
    "email": "E-mail",
    "antiBot": "Koľko je 1 + 6?",
    "message": "Správa",
    "send": "Odoslať",
    "validation": "Odpoveď na '1 + 6' nie je správna.",
    "mailSubject": "Kontakt z juanromerodominguez.dev",
    "bodyName": "Meno",
    "bodyEmail": "E-mail",
    "bodyMessage": "Správa"
  },
  "sl": {
    "title": "Stik",
    "intro": "Če me želite kontaktirati iz poklicnih razlogov, za podporo aplikaciji ali vprašanje o tej spletni strani, uporabite spodnji obrazec.",
    "name": "Ime",
    "email": "E-pošta",
    "antiBot": "Koliko je 1 + 6?",
    "message": "Sporočilo",
    "send": "Pošlji",
    "validation": "Odgovor na '1 + 6' ni pravilen.",
    "mailSubject": "Stik z juanromerodominguez.dev",
    "bodyName": "Ime",
    "bodyEmail": "E-pošta",
    "bodyMessage": "Sporočilo"
  },
  "sq": {
    "title": "Kontakt",
    "intro": "Nëse dëshironi të më kontaktoni për arsye profesionale, mbështetje aplikacioni ose pyetje për këtë faqe, përdorni formularin e mëposhtëm.",
    "name": "Emri",
    "email": "Email",
    "antiBot": "Sa është 1 + 6?",
    "message": "Mesazh",
    "send": "Dërgo",
    "validation": "Përgjigjja për '1 + 6' nuk është e saktë.",
    "mailSubject": "Kontakt nga juanromerodominguez.dev",
    "bodyName": "Emri",
    "bodyEmail": "Email",
    "bodyMessage": "Mesazh"
  },
  "sr": {
    "title": "Контакт",
    "intro": "Ако желите да ме контактирате из професионалних разлога, за подршку апликацији или питање о овом сајту, користите следећи образац.",
    "name": "Име",
    "email": "Email",
    "antiBot": "Колико је 1 + 6?",
    "message": "Порука",
    "send": "Пошаљи",
    "validation": "Одговор на '1 + 6' није тачан.",
    "mailSubject": "Контакт са juanromerodominguez.dev",
    "bodyName": "Име",
    "bodyEmail": "Email",
    "bodyMessage": "Порука"
  },
  "sv": {
    "title": "Kontakt",
    "intro": "Om du vill kontakta mig av professionella skäl, för app-support eller med frågor om denna webbplats kan du använda formuläret nedan.",
    "name": "Namn",
    "email": "E-post",
    "antiBot": "Vad är 1 + 6?",
    "message": "Meddelande",
    "send": "Skicka",
    "validation": "Svaret på '1 + 6' är inte korrekt.",
    "mailSubject": "Kontakt från juanromerodominguez.dev",
    "bodyName": "Namn",
    "bodyEmail": "E-post",
    "bodyMessage": "Meddelande"
  },
  "sw": {
    "title": "Mawasiliano",
    "intro": "Ikiwa unataka kuwasiliana nami kwa sababu za kitaaluma, msaada wa programu au swali kuhusu tovuti hii, tumia fomu ifuatayo.",
    "name": "Jina",
    "email": "Barua pepe",
    "antiBot": "1 + 6 ni ngapi?",
    "message": "Ujumbe",
    "send": "Tuma",
    "validation": "Jibu la '1 + 6' si sahihi.",
    "mailSubject": "Mawasiliano kutoka juanromerodominguez.dev",
    "bodyName": "Jina",
    "bodyEmail": "Barua pepe",
    "bodyMessage": "Ujumbe"
  },
  "ta": {
    "title": "தொடர்பு",
    "intro": "தொழில்முறை காரணங்கள், பயன்பாட்டு ஆதரவு அல்லது இந்த இணையதளத்தைப் பற்றிய கேள்விக்காக என்னை தொடர்புகொள்ள இந்த படிவத்தைப் பயன்படுத்தலாம்.",
    "name": "பெயர்",
    "email": "மின்னஞ்சல்",
    "antiBot": "1 + 6 எவ்வளவு?",
    "message": "செய்தி",
    "send": "அனுப்பு",
    "validation": "'1 + 6'க்கு பதில் சரியில்லை.",
    "mailSubject": "juanromerodominguez.dev இலிருந்து தொடர்பு",
    "bodyName": "பெயர்",
    "bodyEmail": "மின்னஞ்சல்",
    "bodyMessage": "செய்தி"
  },
  "te": {
    "title": "సంప్రదించండి",
    "intro": "వృత్తిపరమైన కారణాలు, యాప్ మద్దతు లేదా ఈ వెబ్‌సైట్‌కు సంబంధించిన ప్రశ్న కోసం నన్ను సంప్రదించాలంటే ఈ ఫారం ఉపయోగించండి.",
    "name": "పేరు",
    "email": "ఇమెయిల్",
    "antiBot": "1 + 6 ఎంత?",
    "message": "సందేశం",
    "send": "పంపండి",
    "validation": "'1 + 6' సమాధానం సరైంది కాదు.",
    "mailSubject": "juanromerodominguez.dev నుండి సంప్రదింపు",
    "bodyName": "పేరు",
    "bodyEmail": "ఇమెయిల్",
    "bodyMessage": "సందేశం"
  },
  "th": {
    "title": "ติดต่อ",
    "intro": "หากต้องการติดต่อฉันด้วยเหตุผลทางวิชาชีพ การสนับสนุนแอป หรือคำถามเกี่ยวกับเว็บไซต์นี้ คุณสามารถใช้แบบฟอร์มต่อไปนี้",
    "name": "ชื่อ",
    "email": "อีเมล",
    "antiBot": "1 + 6 เท่ากับเท่าไร?",
    "message": "ข้อความ",
    "send": "ส่ง",
    "validation": "คำตอบของ '1 + 6' ไม่ถูกต้อง",
    "mailSubject": "ติดต่อจาก juanromerodominguez.dev",
    "bodyName": "ชื่อ",
    "bodyEmail": "อีเมล",
    "bodyMessage": "ข้อความ"
  },
  "tr": {
    "title": "İletişim",
    "intro": "Profesyonel nedenlerle, uygulama desteği için veya bu web sitesiyle ilgili bir soru için benimle iletişime geçmek isterseniz bu formu kullanabilirsiniz.",
    "name": "Ad",
    "email": "E-posta",
    "antiBot": "1 + 6 kaçtır?",
    "message": "Mesaj",
    "send": "Gönder",
    "validation": "'1 + 6' cevabı doğru değil.",
    "mailSubject": "juanromerodominguez.dev üzerinden iletişim",
    "bodyName": "Ad",
    "bodyEmail": "E-posta",
    "bodyMessage": "Mesaj"
  },
  "uk": {
    "title": "Контакт",
    "intro": "Якщо ви хочете зв’язатися зі мною з професійних причин, щодо підтримки застосунку або з питанням про цей сайт, скористайтеся цією формою.",
    "name": "Ім’я",
    "email": "Email",
    "antiBot": "Скільки буде 1 + 6?",
    "message": "Повідомлення",
    "send": "Надіслати",
    "validation": "Відповідь на '1 + 6' неправильна.",
    "mailSubject": "Контакт із juanromerodominguez.dev",
    "bodyName": "Ім’я",
    "bodyEmail": "Email",
    "bodyMessage": "Повідомлення"
  },
  "ur": {
    "title": "رابطہ",
    "intro": "اگر آپ پیشہ ورانہ وجوہات، کسی ایپ کی معاونت یا اس ویب سائٹ سے متعلق کسی سوال کے لیے مجھ سے رابطہ کرنا چاہتے ہیں تو آپ درج ذیل فارم استعمال کر سکتے ہیں۔",
    "name": "نام",
    "email": "ای میل",
    "antiBot": "1 + 6 کا جواب کیا ہے؟",
    "message": "پیغام",
    "send": "بھیجیں",
    "validation": "'1 + 6' کا جواب درست نہیں ہے۔",
    "mailSubject": "juanromerodominguez.dev سے رابطہ",
    "bodyName": "نام",
    "bodyEmail": "ای میل",
    "bodyMessage": "پیغام"
  },
  "vi": {
    "title": "Liên hệ",
    "intro": "Nếu bạn muốn liên hệ với tôi vì lý do nghề nghiệp, hỗ trợ ứng dụng hoặc câu hỏi liên quan đến trang web này, hãy dùng biểu mẫu sau.",
    "name": "Tên",
    "email": "Email",
    "antiBot": "1 + 6 bằng bao nhiêu?",
    "message": "Tin nhắn",
    "send": "Gửi",
    "validation": "Câu trả lời cho '1 + 6' không đúng.",
    "mailSubject": "Liên hệ từ juanromerodominguez.dev",
    "bodyName": "Tên",
    "bodyEmail": "Email",
    "bodyMessage": "Tin nhắn"
  },
  "zh": {
    "title": "联系",
    "intro": "如果你想因专业事务、应用支持或与本网站相关的问题联系我，可以使用以下表单。",
    "name": "姓名",
    "email": "电子邮件",
    "antiBot": "1 + 6 等于多少？",
    "message": "消息",
    "send": "发送",
    "validation": "'1 + 6' 的答案不正确。",
    "mailSubject": "来自 juanromerodominguez.dev 的联系",
    "bodyName": "姓名",
    "bodyEmail": "电子邮件",
    "bodyMessage": "消息"
  },
  "zu": {
    "title": "Xhumana",
    "intro": "Uma ufuna ukuxhumana nami ngezizathu zobungcweti, ukwesekwa kohlelo lokusebenza noma umbuzo mayelana nale webhusayithi, sebenzisa leli fomu.",
    "name": "Igama",
    "email": "I-imeyili",
    "antiBot": "Yini u-1 + 6?",
    "message": "Umlayezo",
    "send": "Thumela",
    "validation": "Impendulo ka-'1 + 6' ayilungile.",
    "mailSubject": "Ukuxhumana okuvela ku-juanromerodominguez.dev",
    "bodyName": "Igama",
    "bodyEmail": "I-imeyili",
    "bodyMessage": "Umlayezo"
  }
};

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
    document.documentElement.dir = (['ar', 'fa', 'iw', 'ur'].indexOf(lang) >= 0) ? 'rtl' : 'ltr';

    document.querySelectorAll('.brand-link').forEach(function (el) { el.href = localizedPath(lang, 'index.html'); });
    document.querySelectorAll('.language-switcher').forEach(function (el) { el.setAttribute('aria-label', l.switcher); });
    document.querySelectorAll('.language-switcher-label').forEach(function (el) { el.textContent = l.switcher; });
    document.querySelectorAll('.localized-privacy-link').forEach(function (el) { el.href = localizedPath(lang, 'privacy-policy.html'); el.textContent = l.privacy; });
    document.querySelectorAll('.localized-terms-link').forEach(function (el) { el.href = localizedPath(lang, 'terms-and-conditions.html'); el.textContent = l.terms; });
    document.querySelectorAll('.localized-contact-link').forEach(function (el) { el.textContent = l.contact; });
    localizeContactForm(lang);

    var select = document.getElementById('site-language-select');
    if (select) {
      select.setAttribute('title', l.switcher);
      if (select.value !== lang) { select.value = lang; }
    }
  }

  function attachLanguageSelect() {
    var select = document.getElementById('site-language-select');
    if (!select || select.dataset.bound === 'true') { return; }
    select.dataset.bound = 'true';
    var lang = activeLanguage();
    select.value = lang;
    select.addEventListener('change', function () {
      var next = normalizeLang(select.value) || defaultLang;
      localStorage.setItem('siteLanguage', next);
      location.href = localizedPath(next, pageSlug());
    });
  }

  function initLanguage() {
    var lang = activeLanguage();
    updateLocalizedLinks(lang);
    attachLanguageSelect();
  }

  JRD.language = { init: initLanguage, localizedPath: localizedPath };

  /* [06] CONTACT POPUP */

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

  /* [07] LAZY IMAGES */

  function lazyAllImages() {
    document.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('loading')) { img.setAttribute('loading', 'lazy'); }
      if (!img.hasAttribute('decoding')) { img.setAttribute('decoding', 'async'); }
    });
  }

  /* [08] VISUAL EFFECTS */

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function isHomePage() {
    var path = window.location.pathname.replace(/\/+/g, '/');
    return path === '/' || languages.some(function (lang) { return path === '/' + lang + '/'; }) || path.endsWith('/index.html') || path === '/index';
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

  /* [09] BOOTSTRAP */

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

    // Dynamic localization observer
    var observer = new MutationObserver(function() { initLanguage(); });
    if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  }

  onReady(boot);
}());
