//= ../../bower_components/lodash/dist/lodash.js
//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/wow/dist/wow.min.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.min.js
//= ../../bower_components/lightbox2/dist/js/lightbox.min.js
//= scrolling/jquery.mCustomScrollbar.min.js
//= custom/blockAligner.js
//=  ../../bower_components/handlebars/handlebars.min.js

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


new WOW().init();
$('.show-8-X').on('click', function () {
    $('.browser__ex_1').css('display', 'block').addClass('animated fadeInDown');
});
$(document).ready(function () {
    // $('.send__input').on('input keyup', function() {
    //     $('.helpers').delay(200).show();
    // });

    $('.helpers__item').on('click', function () {
        $('.helpers').slideToggle(200);
        var value = $(this).html();
        var input = $('.send__input');
        input.val(value);
    });
    $('.scrollable-container-two').mCustomScrollbar({
        theme: "my-theme",
        setLeft: 15,
        axis: "y",
    });
    var widthContaner = 0;
    if ($('.message__item_horizontal').length > 1) {
        for (var i = 0; i < $('.message__item_horizontal').length; i++) {
            widthContaner += $('.message__item_horizontal').width();
        }
        $('.message__horizontal_scroll').css('width', widthContaner + 250);
    }
    $('.speaking__close').click(function () {
        $('.speaking__overlay').fadeOut(200)
    })


});
$('.macbook__play').on('click', function () {
    var $video = $('.macbook__video'),
        src = $('#myvideo').attr("src");
    $video.html('<iframe id="myvideo" class="macbook__iframe" src="https://www.youtube.com/embed/uT3SBzmDxGk?autoplay=1" frameborder="0" allowfullscreen></iframe>');
    $video.css('display', 'block');
    $('.macbook__content').hide();
})
$(window).on('load resize', function () {
    var heightInfo = $('.view__info').innerHeight();
    var heightPrice = $('.view__prices').innerHeight();
    if ($(window).width() >= 768) {
        if (heightInfo < heightPrice) {
            $('.view__prices, .view__info-full').css('height', heightInfo + 'px');
        }
    } else {
        $('.view__prices, .view__info-full').css('height', 'auto');
    }
    if ($(window).width() < 560) {
        var width = $(window).width() - 70;
        $('.width-full-mobile').css('width', width);
    }
    blockAligner.setEqHeight($('.specific'), $('.specific__item'));
});

$(window).resize(function () {
    blockAligner.setEqHeight($('.specific'), $('.specific__item'));
})
//= custom/animations.js
//= custom/collapsing.js
//= custom/selectLng.js
//= custom/speakVinci.js
$(window).on('load', function () {
    $('.preloader').delay(1500).fadeOut('slow');
    $('.preloader__logo').delay(1500).addClass('preloader__logo_top');
    $('body').delay(1500);
});

/**
 * Setup and Initialize form Submmission
 */
var mobiles_requested = [];

var suggested_zlatans = [];

$('#send_chat').on('click', function (event) {
    console.log('sending message')
    event.preventDefault();
    var userAvatar = '/assets/build/assets/images/user-mes.svg';

    var chat_input;

    if ($('.chat__bottom input').val() !== '') {

        $('.chat__messages')
            .append(
            `<div class="message message_sender">
                            <img class="user-logo" src="/assets/build/assets/images/user-mes.svg" alt="">
                            <div class="message__item message__item_user br-chat ">
                                <p>${$('.chat__bottom input').val()}</p>
                            </div>
                </div>`
            );

        // Store the value in chat_input variable
        chat_input = $('.chat__bottom input').val();

        // Clear Input & scroll Chat window-to last message
        $('.chat__bottom input').val('');
        $('.chat__messages').scrollTop($('.chat__messages')[0].scrollHeight);
    }

    // sending the message
    hellovinciai(chat_input);


});

//= custom/carousel.js

//= custom/init.js
//= app/attributes_request.js
//= app/batman_false.js
//= app/batman_missing.js
//= app/beckham_router.js
//= app/beckham.js
//= app/Buffon.js
//= app/comparison_request.js
//= app/event_helpers.js
//= app/get_video.js
//= app/Giggs.js
//= app/handlebars_helpers.js
//= app/Messi.js
//= app/Raul.js
//= app/reload_product.js
//= app/request_reply.js
//= app/specifications_request.js
//= app/update_active_list.js
//= app/update_all_discussed_list.js
//= app/Zlatan.js

$(document).ready(function () {


if (getParameterByName("q")) {
    $('.chat__bottom input').val(getParameterByName("q"))
    $('#send_chat').click()
}
})