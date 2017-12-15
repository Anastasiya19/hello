$(document).ready(function () {
  var owl = $('.owl-carousel:not(.owl-carousel-animated)');
  owl.owlCarousel({
    autoWidth: true,
    margin: 25,
    nav: true,
    navContainerClass: 'nav-carousel',
    navClass: 'helpers__arrow',
    items: 10,
  });

  var owlAnimated = $('.owl-carousel-animated');
  owlAnimated.owlCarousel({
    items:1,
    center: true,
    autoplay:true,
    autoplaySpeed: 3000,
    autoplayHoverPause:true,
    autoWidth: true,
    margin: 25,

  });

  $('.view-all-details').click(function () {
    var messageItem = $(this).parent().parent().parent(),
      childBlock = messageItem.find($('.view__col.no-visible')),
      show = $(this),
      closeBtn = $(this).parent().find($('.hide-all-details'));
    show.hide();
    closeBtn.show().css('display', 'block');
    childBlock.removeClass('view__col_hidden');
    owl.trigger('refresh.owl.carousel');
  })
  $('.hide-all-details').click(function () {
    var messageItem = $(this).parent().parent().parent(),
      childBlock = messageItem.find($('.view__col.no-visible')),
      show = $(this).parent().find($('.view-all-details')),
      closeBtn = $(this);
    closeBtn.css('display', 'none');
    show.css('display', 'block');
    childBlock.addClass('view__col_hidden');
    owl.trigger('refresh.owl.carousel');
  })


});
