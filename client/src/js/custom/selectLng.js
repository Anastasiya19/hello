$(document).ready(function () {
  var container = $(window);
  $('.selection').on('click', function () {
    container = $(this);
    var list = $(this).find($('.selection__list'));
    if (list.hasClass('selection__list_hidden')) {
      list.slideDown(120).removeClass('selection__list_hidden');
    } else {
      list.slideUp(120).addClass('selection__list_hidden');
    }
  });
  $('.selection__item').click(function () {
    var curentLng = this.innerHTML;
    container.find($('.selection__name_current')).html(curentLng);
  });
  $(document).mouseup(function (e) {
    if (container.has(e.target).length === 0) {
      container.find($('.selection__list')).addClass('selection__list_hidden');
    }
  });
});
