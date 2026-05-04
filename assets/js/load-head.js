(function () {
  function hasEquivalentNode(node) {
    var tag = node.tagName.toLowerCase();
    if (tag === 'link') {
      var rel = node.getAttribute('rel') || '';
      var href = node.getAttribute('href') || '';
      var sizes = node.getAttribute('sizes') || '';
      var type = node.getAttribute('type') || '';
      var selector = 'link[rel="' + rel + '"][href="' + href + '"]' + (sizes ? '[sizes="' + sizes + '"]' : '') + (type ? '[type="' + type + '"]' : '');
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
    if (hasEquivalentNode(node)) { return; }
    var script = document.createElement('script');
    Array.prototype.slice.call(node.attributes).forEach(function (attr) { script.setAttribute(attr.name, attr.value); });
    if (!script.hasAttribute('defer') && script.getAttribute('src')) { script.defer = true; }
    if (!script.getAttribute('src')) { script.textContent = node.textContent || ''; }
    document.head.appendChild(script);
  }
  function appendNode(node) {
    if (node.nodeType !== 1) { return; }
    if (node.tagName.toLowerCase() === 'script') { appendScript(node); return; }
    if (!hasEquivalentNode(node)) { document.head.appendChild(node.cloneNode(true)); }
  }
  function appendSharedHead(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    Array.prototype.slice.call(template.content.childNodes).forEach(appendNode);
  }
  function fallback() {
    if (!document.head.querySelector('link[href="/assets/css/style.css"]')) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = '/assets/css/style.css';
      document.head.appendChild(css);
    }
  }
  fetch('/head-common.html', { cache: 'no-cache' })
    .then(function (response) { if (!response.ok) { throw new Error('HTTP ' + response.status); } return response.text(); })
    .then(appendSharedHead)
    .catch(function (error) { console.error('Error cargando el head compartido:', error); fallback(); });
})();
