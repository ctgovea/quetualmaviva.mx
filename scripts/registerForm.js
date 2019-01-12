$().ready(function () {
  const register_URL = 'https://eovsmc4uu6.execute-api.us-east-1.amazonaws.com/dev/api/register'

  $('#registerForm').validate({
    messages: {
      'name': 'Falta que nos digas tu nombre',
      'email': 'Escribe un correo electrónico válido',
    }
  });

  $('#registerForm').submit(function (e) {
    e.preventDefault();
    let form = $(this);
    if (!form.valid()) return false;

    $submitButton = $('#submit');
    $submitButton.val("Enviando...");

    $statusMessage = $('#formStatusMessage');
    $statusMessage.hide();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const comments = document.getElementById('comments').value;

    var data = JSON.stringify({
      name,
      email,
      phone,
      comments
    });

    $.ajax({
      type: 'POST',
      url: register_URL,
      data: data,
      contentType: 'application/json',
      crossDomain: true,
      success: function (response) {
        console.log(response);
        $statusMessage.text('¡Gracias! Tu registro fue enviado.')
          .slideDown();
        $submitButton.hide();
      },
      error: function (response) {
        $statusMessage.text(':( algo salió mal. Intenta de nuevo.')
          .slideDown();
      }

    });
  });
});