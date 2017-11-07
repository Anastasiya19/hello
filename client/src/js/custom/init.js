function init_specifications(elem) {

    elem.find('.scrollable-container-two').mCustomScrollbar({
        theme: "my-theme",
        setLeft: 15,
        axis: "y",
    });

    elem.find('.partitions__item').click(function() {
        var item = $(this);
        var btn = elem.find('.partitions__down');
        var list = elem.find('.partitions__list');
        item.find(btn).toggleClass('partitions__down_active');
        item.toggleClass('partitions__item_open');
        if (item.hasClass('partitions__item_open')) {
            item.find(list).slideDown('slow').addClass('partitions__list_visible');
        } else {
            item.find(list).slideUp('slow').removeClass('partitions__list_visible');
        }
    });
    elem.find('.collapsed-block__dropdown').click(function(e) {
        var block = $(this).parent();
        if (block.hasClass('collapsed-block_open')) {
            block.removeClass('collapsed-block_open').slideDown('slow');
        } else {
            block.addClass('collapsed-block_open');
        }
    });


    var container = $(window);
    elem.find('.selection').on('click', function() {
        container = $(this);
        var list = $(this).find($('.selection__list'));
        if (list.hasClass('selection__list_hidden')) {
            list.slideDown(120).removeClass('selection__list_hidden');
        } else {
            list.slideUp(120).addClass('selection__list_hidden');
        }
    });
    elem.find('.selection__item').click(function() {
        var curentLng = this.innerHTML;
        container.find(elem.find('.selection__name_current')).html(curentLng);
    });
    $(document).mouseup(function(e) {
        if (container.has(e.target).length === 0) {
            container.find(elem.find('.selection__list')).addClass('selection__list_hidden');
        }
    });



    var step = 0;
    elem.find('.chat__nav .helpers__arrow_next').click(function() {
        if ((step * 2) < elem.find('.message__horizontal_scroll').width()) {
            step += elem.find('.message__item').width() + 20;
        }
        console.log(step, elem.find('.message__item_horizontal').width())
        animateScroll(step)
    });
    elem.find('.chat__nav .helpers__arrow_prev').click(function() {
        step = step - elem.find('.message__item').width() - 20;
        if (step < 0) {
            step = 0;
        }
        animateScroll(step)
    });

    function animateScroll(step) {
        elem.find('.message__overview').animate({
            scrollLeft: step
        }, "slow");
    }


    var owl = elem.find('.owl-carousel');
    owl.owlCarousel({
        autoWidth: true,
        margin: 25,
        nav: true,
        navContainerClass: 'nav-carousel',
        navClass: 'helpers__arrow',
        items: 10,
    });

    elem.find('.view-all-details').click(function() {
        var messageItem = $(this).parent().parent().parent(),
            childBlock = messageItem.find($('.view__col.no-visible')),
            show = $(this),
            closeBtn = $(this).parent().find($('.hide-all-details'));
        show.hide();
        closeBtn.show().css('display', 'block');
        childBlock.removeClass('view__col_hidden');
        owl.trigger('refresh.owl.carousel');
    })
    elem.find('.hide-all-details').click(function() {
        var messageItem = $(this).parent().parent().parent(),
            childBlock = messageItem.find($('.view__col.no-visible')),
            show = $(this).parent().find($('.view-all-details')),
            closeBtn = $(this);
        closeBtn.css('display', 'none');
        show.css('display', 'block');
        childBlock.addClass('view__col_hidden');
        owl.trigger('refresh.owl.carousel');
    })
}