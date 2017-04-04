$().ready(function () {

  $('#registerForm').validate({
    messages: {
      'name': "Falta que nos digas tu nombre",
      'email': "Escribe un correo electrónico válido",
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

    var url = form.attr("action");
    var data = form.serialize();

    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      success: function (response) {
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