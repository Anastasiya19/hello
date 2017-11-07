$('.partitions__item').click(function () {
  var item = $(this);
  var btn = $('.partitions__down');
  var list = $('.partitions__list');
  item.find(btn).toggleClass('partitions__down_active');
  item.toggleClass('partitions__item_open');
  if (item.hasClass('partitions__item_open')) {
    item.find(list).slideDown('slow').addClass('partitions__list_visible');
  } else {
    item.find(list).slideUp('slow').removeClass('partitions__list_visible');
  }
});
$('.collapsed-block__dropdown').click(function (e) {
  var block = $(this).parent();
  if (block.hasClass('collapsed-block_open')) {
    block.removeClass('collapsed-block_open').slideDown('slow');
  } else {
    block.addClass('collapsed-block_open');
  }
});