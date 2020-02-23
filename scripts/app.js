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

  const register_URL =
    "https://eovsmc4uu6.execute-api.us-east-1.amazonaws.com/dev/api/register";

  function hello(email) {
    const url = "/.netlify/functions/hello";

    let $submit = $('#signupForm [type="submit"]');
    $submit.prop("disabled", true);

    $.ajax({
      type: "POST",
      url: url,
      data: email,
      contentType: "application/json",
      crossDomain: true,
      success: function(response) {
        console.log(response);
        if (response.statusCode === 200) {
          const $msg = $("#signupMsg");
          $msg
            .html(
              '<i class="fa fa-check" style="padding-right:5px"></i>¡Listo! Gracias por suscribirte.'
            )
            .addClass("success")
            .removeClass("error")
            .slideDown();
          $form.hide();
        }
      },
      error: function(response) {
        $msg
          .text(":( algo salió mal. Intenta de nuevo.")
          .addClass("error")
          .slideDown();
        $submit.prop("disabled", false);
      }
    });
  }

  // Signup

  $("#signupForm").submit(function(e) {
    e.preventDefault();

    let $form = $(this);
    if (!$form.valid()) return false;

    const email = document.getElementById("emailSignup").value;
    hello(email);
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
    let form = $(this);
    if (!form.valid()) return false;

    let $submitButton = $("#submit");
    $submitButton.val("Enviando...");

    let $statusMessage = $("#formStatusMessage");
    $statusMessage.hide();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const comments = document.getElementById("comments").value;

    var data = JSON.stringify({
      name,
      email,
      phone,
      comments
    });

    $.ajax({
      type: "POST",
      url: register_URL,
      data: data,
      contentType: "application/json",
      crossDomain: true,
      success: function(response) {
        console.log(response);
        $statusMessage.text("¡Gracias! Tu registro fue enviado.").slideDown();
        $submitButton.hide();
      },
      error: function(response) {
        $statusMessage.text(":( algo salió mal. Intenta de nuevo.").slideDown();
      }
    });
  });
});
