$(document).ready(init_owl);

function init_owl() {
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
    items:10,
    // center: true,
    // autoplay:true,
    // autoplaySpeed: 3000,
    // autoplayHoverPause:true,
    autoWidth: true,
    nav: true,
    navContainerClass: 'nav-carousel',
    navClass: 'helpers__arrow',
    margin: 10,

  });

  //fix carousels width for small resolutions
  $('.owl-stage').each((i,item)=>{
    var width = 0;
    $(item).children().each(function(i,item) {
      width += $(item).outerWidth( true );
    });
    width = Math.ceil(width)
    $(item).css('width', width)
  });


  $('.view-all-details').click(function () {
    var messageItem = $(this).parent().parent().parent(),
      childBlock = messageItem.find($('.view__col.no-visible')),
      show = $(this),
      closeBtn = $(this).parent().find($('.hide-all-details'));
    show.hide();
    closeBtn.show().css('display', 'block');
    childBlock.removeClass('view__col_hidden');
    $(messageItem.parent()[0]).addClass('all-details-shown')
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
    $(messageItem.parent()[0]).removeClass('all-details-shown')
    owl.trigger('refresh.owl.carousel');
  })


}