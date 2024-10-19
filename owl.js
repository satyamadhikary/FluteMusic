
$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });
  
  
  var owl = $('.banner');
  owl.owlCarousel({
    loop: true,
    items: 1,
    dots: false,
    smartSpeed: 950
  });
  
  // owl.on('mousewheel', function (e) {
  //   if (e.originalEvent.deltaY < 10) {
  //       owl.trigger('prev.owl.carousel');
  //   } else {
  //       owl.trigger('next.owl.carousel');
  //   }
  //   e.preventDefault();
  // });
  
  
  
  
  $('.albums ').owlCarousel({
    loop:true,
    autoplay:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false,
            dots:false
        },
        600:{
            items:2,
            nav:false,
            dots:false
        },
        1000:{
            items:3,
            nav:true,
            loop:false,
            dots:false
        },
        2500:{
          items:6,
          nav:true,
          loop:false,
          dots:false
        }
    }
  })