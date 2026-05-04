(function () {
  function initTerminal() {
    var hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.terminal-line')) { return; }
    var line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = '<span class="terminal-prompt">&gt;</span> <span class="terminal-text">Android · SAP · Web · PHP · .NET · Worldwide Publishing</span><span class="terminal-cursor"></span>';
    hero.appendChild(line);
  }
  function bindGlowCards() {
    document.querySelectorAll('.portfolio-card,.experience-card,.cert-list-card,.badge-card-custom,.anchor-nav a,.app-store-button').forEach(function (card) {
      if (card.dataset.fxBound === 'true') { return; }
      card.dataset.fxBound = 'true';
      card.classList.add('fx-card');
      card.addEventListener('mousemove', function (event) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
      });
    });
  }
  function init() { initTerminal(); bindGlowCards(); }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
  new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
})();
