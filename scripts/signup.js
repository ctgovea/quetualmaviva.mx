$().ready(function () {
  const subscribe_URL = 'https://eovsmc4uu6.execute-api.us-east-1.amazonaws.com/dev/api/subscribe';

  $('#signupForm').submit(function (e) {
    e.preventDefault();

    let $form = $(this);
    if (!$form.valid()) return false;

    $submit = $('#signupForm [type="submit"]');
    $submit.prop('disabled', true);

    const $msg = $('#signupMsg');

    const email = document.getElementById('emailSignup').value;
    var data = JSON.stringify({
      email
    });

    $.ajax({
      type: 'POST',
      url: subscribe_URL,
      data: data,
      contentType: 'application/json',
      crossDomain: true,
      success: function (response) {
        $msg.html('<i class="fa fa-check" style="padding-right:5px"></i>¡Listo! Gracias por suscribirte.')
          .addClass('success')
          .removeClass('error')
          .slideDown();
        $form.hide();
      },
      error: function (response) {
        $msg.text(':( algo salió mal. Intenta de nuevo.')
          .addClass('error')
          .slideDown();
        $submit.prop('disabled', false);
      }
    });
  });
});