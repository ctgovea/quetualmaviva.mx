$(document).ready(function () {
  $("#content-slider").lightSlider({
    loop: true,
    keyPress: true
  });

  $('#image-gallery').lightSlider({
    gallery: true,
    item: 1,
    thumbItem: 9,
    slideMargin: 0,
    adaptiveHeight: true,
    speed: 500,
    pause: 3000,
    auto: true,
    loop: true,
    onSliderLoad: function () {
      $('#image-gallery').removeClass('cS-hidden');
    }
  });
});