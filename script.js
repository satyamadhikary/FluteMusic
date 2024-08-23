//Current audio stops playing when different audio is played

document.addEventListener('DOMContentLoaded', () => {
  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {
      audio.addEventListener('play', () => {
          audios.forEach(otherAudio => {
              if (otherAudio !== audio) {
                  otherAudio.pause();
                  otherAudio.currentTime = 0; // Optionally reset to start
              }
          });
      });
  });
});

//--------------------------------------------------------------------------------------

$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });


var owl = $('.owl-carousel');
owl.owlCarousel({
    loop: true,
    items: 1,
    dots: false,

});

owl.on('mousewheel', function (e) {
    if (e.originalEvent.deltaY < 0) {
        owl.trigger('prev.owl.carousel');
    } else {
        owl.trigger('next.owl.carousel');
    }
    e.preventDefault();
});
