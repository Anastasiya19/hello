var step = 0;
$('.chat__nav .helpers__arrow_next').click(function () {
  if ((step*2) < $('.message__horizontal_scroll').width()) {
    step += $('.message__item').width()+ 20;
  }
  console.log(step, $('.message__item_horizontal').width())
  animateScroll(step)
});
$('.chat__nav .helpers__arrow_prev').click(function () {
  step = step - $('.message__item').width()-20;
  if (step < 0) {
    step = 0;
  }
  animateScroll(step)
});
function animateScroll (step) {
  $('.message__overview').animate({
    scrollLeft: step
  }, "slow");
}