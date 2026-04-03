// Simplified GA4 tracking script
// based on https://gist.github.com/idarek/9ade69ac2a2ef00d98ab950426af5791

(() => {

  const tid = "G-1B240Y6GW6"; // set your GA4 Measurement ID here

  function serialize(input) {
    const output = {};
    for (const key in input) {
      if (input[key] !== null) {
        output[key] = input[key];
      }
    }
    return (new URLSearchParams(output)).toString();
  }

  // TODO add timestamp to storage state and clear the session ID (sid)
  //      if the last track() call was more than 30 minutes ago
  //      (test this with an initial 30 second timeout)
  //      add expiration timeout constants for both client and session IDs.

  // TODO use an object to store the values instead of localStorage,
  //      write the whole object to localStorage at the end of track()
  //      and store the whole state in a single JSON storage item.

  const get = (name, init) => localStorage[name] || (init && set(name, init()));
  const set = (name, value) => localStorage[name] = value;

  const createID = () => Math.floor(Math.random() * 2147483647) + 1;
  const getTime = () => Math.floor(Date.now() / 1000);

  const _p = createID(); // Page ID

  let _s = 1; // Sequence number

  const CLIENT_ID = "ga_cid";
  const SESSION_ID = "ga_sid";
  const SESSION_COUNT = "ga_sct";

  const seg = get(SESSION_ID) ? 1 : 0; // Session engaged

  function track(en, params = {}) {
    // First Visit
    const _fv = get(CLIENT_ID) ? null : 1;

    // Generate or retrieve client ID
    const cid = get(CLIENT_ID, () => createID() + "." + getTime());

    // Session start
    const _ss = get(SESSION_ID) ? null : 1;

    // Session ID
    const sid = get(SESSION_ID, getTime);

    // Session count
    const sct = _ss // session started?
      ? set(SESSION_COUNT, parseInt(get(SESSION_COUNT, () => "0")) + 1) // increment session count
      : get(SESSION_COUNT); // report current session count

    const data = serialize({
      v: 2, // Protocol Version
      tid,  // Measurement ID
      _p,   // Page ID
      cid,  // Client ID
      ul: (navigator.language || "").toLowerCase(), // User Language
      sr: (screen.width + "x" + screen.height),     // Screen Resolution
      _s: _s++, // Sequence number
      sid,      // Session ID
      sct,      // Session count
      seg,      // Session engaged
      dl: document.location.origin + document.location.pathname + document.location.search, // Document Location (without fragment)
      dr: document.referrer,
      dt: document.title,
      en,  // Event Name
      _fv, // First Visit
      _ss, // Session Start
      _dbg: 1, // Debug Mode

      // custom event params:
      ...Object.fromEntries(
        Object.entries(params).map(([key, value]) => [`ep.${key}`, value])
      )
    });

    const url = "https://www.google-analytics.com/g/collect";

    // Send the hit using the most appropriate available method
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url + "?" + data);
    } else {
      fetch(url + "?" + data, {
        method: "POST",
        keepalive: true
      });
    }
  }

  window.track = track;

})();

/*
 *  ping.js - v0.1.0
 *  Ping Utilities in Javascript
 *  http://github.com/alfg/ping.js
 *
 *  Made by Alfred Gutierrez
 *  Under MIT License
 */
/**
 * Creates a Ping instance.
 * @returns {Ping}
 * @constructor
 */
var Ping = function() {};

/**
 * Pings source and triggers a callback when completed.
 * @param source Source of the website or server, including protocol and port.
 * @param callback Callback function to trigger when completed.
 * @param timeout Optional number of milliseconds to wait before aborting.
 */
Ping.prototype.ping = function(source, callback, timeout) {
    this.img = new Image();
    this.img.crossOrigin = "anonymous"; // Evita el uso de cookies de terceros; Chrome is moving towards a new experience that allows users to choose to browse without third-party cookies.
    timeout = timeout || 0;
    var timer;

    var start = new Date();
    this.img.onload = this.img.onerror = pingCheck;
    
    if (timeout) { timer = setTimeout(pingCheck, timeout); }

    /**
     * Times ping and triggers callback.
     */
    function pingCheck() {
        if (timer) { clearTimeout(timer); }
        var pong = new Date() - start;

        if (typeof callback === "function") {
            callback(pong);
        }
    }

    this.img.src = source + "/?" + (+new Date()); // Trigger image load with cache buster
};

//function pingfetch(url, callback) {
//    let start = performance.now();
//
//    fetch(url, { mode: 'no-cors' }) // No-cors para evitar bloqueos, aunque la respuesta será `opaque`
//        .then(() => callback(performance.now() - start))
//        .catch(() => callback(-1)); // -1 indica error
//}

/*
 * Actualizar servidores.
 */
window.onload = () => {
    const resultsList = document.getElementById('search-results');
    const searchInput = document.getElementById('game-search-input');
    
    // Ocultar resultados si se hace clic fuera del buscador
    document.addEventListener('click', (event) => {
      if (!searchInput.contains(event.target) && !resultsList.contains(event.target)) {
        resultsList.style.display = 'none';
      }
    });
    
    let refreshInterval; // Variable para el intervalo de refresco
    document.getElementById("refreshRate").addEventListener("change", function () {
        const selectedRate = parseInt(this.value);

        // Detiene cualquier intervalo en curso
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }

        if (selectedRate > 0) {
            // Inicia un nuevo intervalo si no está en "Parar"
            refreshInterval = setInterval(() => {
                actualizarPing();
            }, selectedRate);
        }
    });
    
    // Deshabilitar el doble clic para toda la página; desde el movil al hacer doble toque/doble clic en un boton se amplia la pantalla.
    document.addEventListener('dblclick', function (e) {
        e.preventDefault();
    }, { passive: false });
    
    // Inicia con el valor por defecto (Cada 5 segundos)
    document.getElementById("refreshRate").dispatchEvent(new Event("change"));
    // Send the page view
    track("page_view");
};

function actualizarPing() {
    var o_ping = new Ping();
    const servers = document.querySelectorAll('.server');
    
    servers.forEach(server => {
        const serverAddress = server.getAttribute('data-address');
        const pingElement = server.querySelector('.ping-time');

        pingElement.textContent = 'Cargando...';
        server.className = 'server';

        o_ping.ping('https://' + serverAddress, function(data) {
            // Also display error if err is returned.
            if (data) {
                var latencia = 0.3*data;
                pingElement.textContent = `${latencia.toFixed(2)} ms`;

                // Cambiar el color según el tiempo de latencia
                if (latencia < 50) {
                    server.classList.add('ping-green');
                } else if (latencia < 100) {
                    server.classList.add('ping-yellow');
                } else if (latencia < 200) {
                    server.classList.add('ping-orange');
                } else {
                    server.classList.add('ping-red');
                }
            }
        });
    });
}

function buscarJuego(event) {
    const query = event.target.value.toLowerCase();
    if (query === '') {
        return;
    }
    const allGames = [
      "Call of Duty: Black Ops 6",
      "Counter-Strike 2",
      "Counter-Strike: Global Offensive",
      "Grand Theft Auto V",
      "League of Legends",
      "Path of Exile",
      "Valorant",
      "Warhammer 40K Space Marine 2",
      "Fortnite Battle Royale",
      "Hearthstone",
      "Call of Duty: Modern Warfare",
      "Apex Legends",
      "PUBG",
      "Rainbow Six Siege",
      "Left 4 Dead 2",
      "Dota 2",
      "World of Warcraft",
      "Overwatch",
      "Throne and Liberty"
    ];
    const filteredGames = allGames.filter(game => game.toLowerCase().includes(query));
    const resultsList = document.getElementById('search-results');
    const lang = document.documentElement.lang;
    
    resultsList.style.display = 'block';
    resultsList.innerHTML = filteredGames
        .sort()  // Ordena alfabéticamente
        .map(game => `<li><a href="https://pingtest.lol/${lang}/${game.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}/">${game}</a></li>`)
        .join('');
}

// Open Popup
function openPopup(contentId) {
  document.getElementById('popup-overlay').style.display = 'flex';
  document.querySelectorAll('.popup-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(contentId).classList.add('active');
}

// Close Popup
function closePopup() {
  document.getElementById('popup-overlay').style.display = 'none';
}