function closePopup(){
					document.getElementById("popup-overlay").style.display = "none";
				}

				function openPopup(id){
					document.getElementById("popup-overlay").style.display = "flex";
					document.querySelectorAll(".popup-content").forEach(function(el){
						el.classList.remove("active");
					});
					document.getElementById(id).classList.add("active");
				}

				function enviarCorreo(event) {
					event.preventDefault();

					const nombre = document.getElementById("name").value.trim();
					const email = document.getElementById("email").value.trim();
					const abot = document.getElementById("abot").value.trim();
					const c_mensaje = document.getElementById("message").value.trim();

					if (abot !== "7") {
						alert("La respuesta a '1 + 6' no es correcta.");
						return;
					}

					const destino = "contacto@juanromerodominguez.dev";
					const asunto = encodeURIComponent("Contacto desde juanromerodominguez.dev");
					const cuerpo = encodeURIComponent('Nombre: ' + nombre + "\n" + 'Email: ' + email + "\n\n" + "Mensaje:\n" + c_mensaje);
					window.location.href = "mailto:${destino}?subject=${asunto}&body=${cuerpo}";
				}