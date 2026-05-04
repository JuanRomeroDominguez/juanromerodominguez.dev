(function () {
  function siteRootFromScript() {
    var script = document.currentScript || document.querySelector('script[src$="/assets/js/load-head.js"],script[src$="assets/js/load-head.js"]');
    var src = script && script.getAttribute('src') ? script.getAttribute('src') : 'assets/js/load-head.js';
    try {
      var url = new URL(src, document.baseURI);
      return url.pathname.replace(/assets\/js\/load-head\.js(?:\?.*)?$/, '');
    } catch (e) {
      return '/';
    }
  }

  var siteRoot = siteRootFromScript();
  window.JRDSiteRoot = siteRoot;

  function assetPath(path) {
    if (!path || /^(https?:|mailto:|tel:|#|data:|blob:)/i.test(path)) { return path; }
    if (path.charAt(0) === '/') { return siteRoot + path.replace(/^\/+/, ''); }
    return path;
  }

  function normalizeNodeUrls(node) {
    ['href', 'src', 'content'].forEach(function (attr) {
      var value = node.getAttribute && node.getAttribute(attr);
      if (!value) { return; }
      if (attr === 'content' && value.charAt(0) !== '/') { return; }
      node.setAttribute(attr, assetPath(value));
    });
  }

  function hasEquivalentNode(node) {
    var tag = node.tagName.toLowerCase();

    if (tag === 'link') {
      var rel = node.getAttribute('rel') || '';
      var href = node.getAttribute('href') || '';
      var sizes = node.getAttribute('sizes') || '';
      var type = node.getAttribute('type') || '';
      var selector = 'link[rel="' + rel + '"][href="' + href + '"]' +
        (sizes ? '[sizes="' + sizes + '"]' : '') +
        (type ? '[type="' + type + '"]' : '');
      return !!document.head.querySelector(selector);
    }

    if (tag === 'meta') {
      var name = node.getAttribute('name');
      return name ? !!document.head.querySelector('meta[name="' + name + '"]') : false;
    }

    if (tag === 'script') {
      var src = node.getAttribute('src');
      return src ? !!document.head.querySelector('script[src="' + src + '"]') : false;
    }

    return false;
  }

  function appendScript(node) {
    normalizeNodeUrls(node);
    if (hasEquivalentNode(node)) { return; }

    var script = document.createElement('script');
    Array.prototype.slice.call(node.attributes).forEach(function (attr) {
      script.setAttribute(attr.name, attr.value);
    });
    if (!script.hasAttribute('defer') && script.getAttribute('src')) {
      script.defer = true;
    }
    if (!script.getAttribute('src')) {
      script.textContent = node.textContent || '';
    }
    document.head.appendChild(script);
  }

  function appendNode(node) {
    normalizeNodeUrls(node);
    var tag = node.tagName.toLowerCase();
    if (tag === 'script') {
      appendScript(node);
      return;
    }
    if (!hasEquivalentNode(node)) {
      document.head.appendChild(node.cloneNode(true));
    }
  }

  function appendSharedHead(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    Array.prototype.slice.call(template.content.childNodes).forEach(function (node) {
      if (node.nodeType === 1) { appendNode(node); }
    });
  }

  function addFallbackAsset(tagName, attrs) {
    var el = document.createElement(tagName);
    Object.keys(attrs).forEach(function (key) { el.setAttribute(key, assetPath(attrs[key])); });
    if (!hasEquivalentNode(el)) { document.head.appendChild(el); }
  }

  fetch(siteRoot + 'head-common.html', { cache: 'no-cache' })
    .then(function (response) {
      if (!response.ok) { throw new Error('HTTP ' + response.status); }
      return response.text();
    })
    .then(appendSharedHead)
    .catch(function (error) {
      console.error('Error cargando el head compartido:', error);
      addFallbackAsset('link', { rel: 'stylesheet', href: '/assets/css/style.css' });
      addFallbackAsset('script', { src: '/assets/js/site-effects.js', defer: 'defer' });
      addFallbackAsset('script', { src: '/assets/js/language.js', defer: 'defer' });
    });
})();
