(function () {
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function isHomePage() {
    var path = window.location.pathname.replace(/\/+/g, '/');
    return path === '/' || path.endsWith('/index.html') || path === '/index';
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
    var p = 0, i = 0, deleting = false;
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
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mouse = { x: -9999, y: -9999, active: false };
    var particles = [];
    function count() {
      return Math.max(42, Math.min(95, Math.floor((window.innerWidth * window.innerHeight) / 19000)));
    }
    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = count();
      while (particles.length < n) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - .5) * .28,
          vy: (Math.random() - .5) * .28,
          r: Math.random() * 1.5 + .6
        });
      }
      particles.length = n;
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var a = particles[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20) a.x = w + 20; if (a.x > w + 20) a.x = -20;
        if (a.y < -20) a.y = h + 20; if (a.y > h + 20) a.y = -20;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(116,190,255,.65)';
        ctx.fill();
      }
      for (var j = 0; j < particles.length; j++) {
        for (var k = j + 1; k < particles.length; k++) {
          var p1 = particles[j], p2 = particles[k];
          var dx = p1.x - p2.x, dy = p1.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.strokeStyle = 'rgba(92,174,255,' + ((1 - dist / 115) * .18).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
        if (mouse.active) {
          var pm = particles[j];
          var mdx = pm.x - mouse.x, mdy = pm.y - mouse.y;
          var md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 180) {
            ctx.strokeStyle = 'rgba(103,210,255,' + ((1 - md / 180) * .42).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pm.x, pm.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      window.requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; }, { passive: true });
    window.addEventListener('pointerleave', function () { mouse.active = false; }, { passive: true });
    resize(); draw();
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
        var rotY = (px - .5) * 7;
        var rotX = (.5 - py) * 7;
        el.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-3px)';
      }, { passive: true });
      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '50%');
      }, { passive: true });
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fn); }
    else { fn(); }
  }
  ready(function () {
    initConstellation();
    initTypingHero();
    initGlowTilt();
  });
})();
