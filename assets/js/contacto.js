function closePopup() {
  var overlay = document.getElementById('popup-overlay');
  if (overlay) { overlay.style.display = 'none'; }
}

function openPopup(id) {
  var overlay = document.getElementById('popup-overlay');
  if (overlay) { overlay.style.display = 'flex'; }
  document.querySelectorAll('.popup-content').forEach(function (el) {
    el.classList.remove('active');
  });
  var content = document.getElementById(id);
  if (content) { content.classList.add('active'); }
}

function enviarCorreo(event) {
  if (event) { event.preventDefault(); }
  var nombre = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var abot = document.getElementById('abot').value.trim();
  var mensaje = document.getElementById('message').value.trim();

  if (abot !== '7') {
    alert("La respuesta a '1 + 6' no es correcta.");
    return;
  }

  var destino = 'contacto@juanromerodominguez.dev';
  var asunto = encodeURIComponent('Contacto desde juanromerodominguez.dev');
  var cuerpo = encodeURIComponent('Nombre: ' + nombre + '\n' + 'Email: ' + email + '\n\n' + 'Mensaje:\n' + mensaje);
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindContactPopup);
} else {
  bindContactPopup();
}
document.addEventListener('site:footer-loaded', bindContactPopup);
