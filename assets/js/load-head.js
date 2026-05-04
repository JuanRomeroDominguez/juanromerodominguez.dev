(function () {
  var siteRoot = '/';
  window.JRDSiteRoot = siteRoot;

  function assetPath(path) {
    if (!path || /^(https?:|mailto:|tel:|#|data:|blob:)/i.test(path)) { return path; }
    if (path.charAt(0) === '/') { return path; }
    return siteRoot + path.replace(/^\/+/, '');
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
      return !!document.head.querySelector('link[rel="' + rel + '"][href="' + href + '"]');
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
    if (!script.hasAttribute('defer') && script.getAttribute('src')) { script.defer = true; }
    if (!script.getAttribute('src')) { script.textContent = node.textContent || ''; }
    document.head.appendChild(script);
  }

  function appendNode(node) {
    normalizeNodeUrls(node);
    if (node.tagName.toLowerCase() === 'script') { appendScript(node); return; }
    if (!hasEquivalentNode(node)) { document.head.appendChild(node.cloneNode(true)); }
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

  function fallbackHead() {
    addFallbackAsset('link', { rel: 'stylesheet', href: '/assets/css/style.css' });
    addFallbackAsset('script', { src: '/assets/js/load-header.js', defer: 'defer' });
    addFallbackAsset('script', { src: '/assets/js/load-footer.js', defer: 'defer' });
    addFallbackAsset('script', { src: '/assets/js/contacto.js', defer: 'defer' });
    addFallbackAsset('script', { src: '/assets/js/site-effects.js', defer: 'defer' });
    addFallbackAsset('script', { src: '/assets/js/language.js', defer: 'defer' });
  }

  function fetchWithTimeout(url, timeoutMs) {
    var controller = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) { controller.abort(); } }, timeoutMs || 3000);
    return fetch(url, { cache: 'default', credentials: 'same-origin', signal: controller ? controller.signal : undefined })
      .finally(function () { clearTimeout(timer); });
  }

  fetchWithTimeout('/head-common.html', 3000)
    .then(function (response) {
      if (!response.ok) { throw new Error('HTTP ' + response.status); }
      return response.text();
    })
    .then(appendSharedHead)
    .catch(function (error) {
      console.warn('No se pudo cargar head-common.html. Se cargan recursos mínimos.', error);
      fallbackHead();
    });
})();
