$().ready(function () {

  $('#signupForm').submit(function (e) {
    e.preventDefault();

    let $form = $(this);
    if (!$form.valid()) return false;

    $submit = $('#signupForm [type="submit"]');
    $submit.prop('disabled', true);

    const $msg = $('#signupMsg');

    const url = $form.attr("action");
    const data = $form.serialize();

    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      success: function (response) {
        $msg.html('<i class="fa fa-check" style="padding-right:5px"></i>¡Listo! Te enviaremos un correo.')
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