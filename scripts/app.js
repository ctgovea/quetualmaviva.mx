$(document).ready(function() {
  $("#content-slider").lightSlider({
    loop: true,
    keyPress: true
  });

  $("#image-gallery").lightSlider({
    gallery: true,
    item: 1,
    thumbItem: 9,
    slideMargin: 0,
    adaptiveHeight: true,
    speed: 500,
    pause: 3000,
    auto: true,
    loop: true,
    onSliderLoad: function() {
      $("#image-gallery").removeClass("cS-hidden");
    }
  });

  function hello(email, onSuccess, onFailure) {
    const url = "/.netlify/functions/hello";

    $.ajax({
      type: "POST",
      url: url,
      data: email,
      contentType: "application/json",
      crossDomain: true,
      success: function(response) {
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      },
      error: function(response) {
        if (typeof onFailure === "function") {
          onFailure();
        }
      }
    });
  }

  // Signup

  $("#newsletterForm").submit(function(e) {
    e.preventDefault();

    const $msg = $("#signupMsg");
    let $form = $(this);
    if (!$form.valid()) return false;

    let $submit = $('#newsletterForm [type="submit"]');
    $submit.prop("disabled", true);

    hello(
      document.getElementById("emailSignup").value,
      function onSuccess() {
        console.log(response);
        $msg
          .html(
            '<i class="fa fa-check" style="padding-right:5px"></i>¡Listo! Gracias por suscribirte.'
          )
          .addClass("success")
          .removeClass("error")
          .slideDown();
        $form.hide();
      },
      function onFailure() {
        $msg
          .text(":( algo salió mal. Intenta de nuevo.")
          .addClass("error")
          .slideDown();
        $submit.prop("disabled", false);
      }
    );
  });

  // Registration

  $("#registerForm").validate({
    messages: {
      name: "Falta que nos digas tu nombre",
      email: "Escribe un correo electrónico válido"
    }
  });

  $("#registerForm").submit(function(e) {
    e.preventDefault();
    let $form = $(this);
    if (!$form.valid()) return false;

    let $submitButton = $("#submit");
    $submitButton.val("Enviando...");

    let $statusMessage = $("#formStatusMessage");
    $statusMessage.hide();

    $.post($form.attr("action"), $form.serialize()).then(function() {
      $statusMessage.text("¡Gracias! Tu registro fue enviado.").slideDown();
      $submitButton.hide();
    });
  });
});
