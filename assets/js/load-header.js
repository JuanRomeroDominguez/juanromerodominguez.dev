(function () {
  function loadHeader() {
    var target = document.getElementById('header-container');
    if (!target || target.dataset.loaded === 'true') { return; }
    target.dataset.loaded = 'true';
    fetch('/header.html', { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) { throw new Error('HTTP ' + response.status); }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        document.dispatchEvent(new CustomEvent('site:header-loaded'));
      })
      .catch(function (error) {
        target.dataset.loaded = 'false';
        console.error('Error cargando la cabecera:', error);
      });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', loadHeader); }
  else { loadHeader(); }
})();
