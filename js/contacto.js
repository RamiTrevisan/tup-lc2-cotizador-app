const btn = document.getElementById("button");
document.getElementById("form").addEventListener("submit", function (event) {
  let nombre = document.getElementById("from_name").value.trim();
  let email = document.getElementById("email_id").value.trim();
  let mensaje = document.getElementById("message").value.trim();
  let errorMessage = "";
  let deshabilitar = false;
  if (nombre === "") {
    errorMessage += "El nombre es obligatorio.<br>";
  }

  if (email === "") {
    errorMessage += "El email es obligatorio.<br>";
  } else if (!validateEmail(email)) {
    errorMessage += "El email no es válido.<br>";
  }

  if (mensaje === "") {
    errorMessage += "El mensaje es obligatorio.<br>";
  }

  if (errorMessage !== "") {
    document.getElementById("error-mensaje").innerHTML = errorMessage;
    event.preventDefault();
  }

  //PREGUNTAR COMO VALIDAR ANTES DE ENVIAR
});

function validateEmail(email) {
  // Expresión regular para validar que lleve @, texto despues y un dominio valido
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Sending...";

  const serviceID = "service_xo3kz1f";
  const templateID = "template_jx9bccr";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send Email";
      alert("Mensaje enviado!");
    },
    (err) => {
      btn.value = "Send Email";
      alert(JSON.stringify(err));
    }
  );
});
