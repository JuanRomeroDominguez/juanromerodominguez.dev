(function () {
  function loadFooter() {
    var target = document.getElementById('footer-container');
    if (!target || target.dataset.loaded === 'true') { return; }
    target.dataset.loaded = 'true';
    fetch('/footer.html', { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) { throw new Error('HTTP ' + response.status); }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        document.dispatchEvent(new CustomEvent('site:footer-loaded'));
      })
      .catch(function (error) {
        target.dataset.loaded = 'false';
        console.error('Error cargando el footer:', error);
      });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', loadFooter); }
  else { loadFooter(); }
})();
