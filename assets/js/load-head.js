(function () {
  function appendSharedHead(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    Array.prototype.slice.call(template.content.childNodes).forEach(function (node) {
      if (node.nodeType !== 1) {
        return;
      }
      var selector = null;
      var tag = node.tagName.toLowerCase();
      if (tag === 'link') {
        var rel = node.getAttribute('rel') || '';
        var href = node.getAttribute('href') || '';
        var sizes = node.getAttribute('sizes') || '';
        var type = node.getAttribute('type') || '';
        selector = 'link[rel="' + rel + '"][href="' + href + '"]' + (sizes ? '[sizes="' + sizes + '"]' : '') + (type ? '[type="' + type + '"]' : '');
      } else if (tag === 'meta') {
        var name = node.getAttribute('name');
        if (name) {
          selector = 'meta[name="' + name + '"]';
        }
      }
      if (!selector || !document.head.querySelector(selector)) {
        document.head.appendChild(node.cloneNode(true));
      }
    });
  }

  fetch('/head-common.html', { cache: 'no-cache' })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.text();
    })
    .then(appendSharedHead)
    .catch(function (error) {
      console.error('Error cargando el head compartido:', error);
      if (!document.head.querySelector('link[href="/assets/css/style.css"]')) {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = '/assets/css/style.css';
        document.head.appendChild(css);
      }
    });
})();
