//= ../../bower_components/lodash/dist/lodash.js
//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/wow/dist/wow.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.min.js
//= ../../bower_components/lightbox2/dist/js/lightbox.min.js
//= ../../bower_components/handlebars/handlebars.min.js
//= ../../bower_components/array-to-sentence/browser.js
//= ../../bower_components/jquery-ui/jquery-ui.min.js
//= scrolling/jquery.mCustomScrollbar.min.js
//= custom/blockAligner.js

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


new WOW({offset:-9999999}).init();
$('.show-8-X').on('click', function () {
  $('.browser__ex_1').css('display', 'block').addClass('animated fadeInDown');
});

$(document).ready(function () {
  // $('.send__input').on('input keyup', function() {
  //     $('.helpers').delay(200).show();
  // });

  $('.send__input').on('input keyup', function() {
      
      var input = $('.send__input');
      send_auto_complete_request(input[0].value);
      // $('.helpers').delay(200).show();
  });

  $(".send__input").focusout(function(){
      
      $('.helpers').hide(200);
  });

  $('.auto__complete').on('click', function () {
    
    $('.helpers').hide(200);
    var value = $(this).html();
    var input = $('.send__input');
    input.val(value);
    
  });

  
  $('.scrollable-container-two').mCustomScrollbar({
    theme: "my-theme",
    setLeft: 15,
    axis: "y",
  });
  window.mobileAndTabletCheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  if(!window.mobileAndTabletCheck()){

    $('.scrollable-container').mCustomScrollbar({
      theme: "my-theme",
      setLeft: 15,
      axis: "y",
    });
  }

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
});

//= custom/animations.js
//= custom/collapsing.js
//= custom/selectLng.js
//= custom/speakVinci.js
$(window).on('load', function () {
  $('.preloader').fadeOut('slow');
  // $('.preloader__logo').addClass('preloader__logo_top');
  // $('body');
});

/**
 * Setup and Initialize form Submmission
*/
var mobiles_requested = [];

var suggested_zlatans = [];

$('#send_chat').on('click', function (event) {
  event.preventDefault();
  // let destination = $('.send__input').offset().top;
  // $('.chat__content #mCSB_1').animate({ scrollTop: destination }, 1100);
  sendMessage()
});

$('.send__input').keypress(function (e) {
  if (e.which == 13) {
    // let destination = $(this).offset().top;
    // console.log('destination--',destination);
    // $('.chat__content #mCSB_1').animate({ scrollTop: destination }, 1100);
    sendMessage()
  }
});

function sendMessage() {

  var userAvatar = '/assets/build/assets/images/user-mes.svg';

  var chat_input;

  if ($('.chat__bottom input').val().length > 0) {

    $('.chat__messages')
      .append(
        `<div class="message message_sender">
            <!--<img class="user-logo" src="/assets/build/assets/images/user-mes.svg" alt="">-->
            <div class="message__item message__item_user br-chat animated fadeInRight">
                <p>${$('.chat__bottom input').val()}</p>
            </div>
          </div>`
      );

    // Store the value in chat_input variable
    chat_input = $('.chat__bottom input').val();

    // Clear Input & scroll Chat window-to last message
    $('.chat__bottom input').val('');


    //for native scroll(mobile only)
    var bottomMobile = $('.chat__content')[0].scrollHeight;
    var lastMessageMobile = $('.message_sender').last()[0].offsetTop - 20;
    $('.chat__content').scrollTop(Math.min(bottomMobile,lastMessageMobile));

    //for mCustomScrollbar
    var bottom =  $(".chat__content>.mCSB_vertical>.mCSB_container").height() - $('.chat__content>.mCSB_vertical').height();
    var lastMessage = $('.message_sender').last()[0].offsetTop - 20;
    $(".chat__content>.mCSB_vertical>.mCSB_container").css({'top': - Math.min(bottom,lastMessage)});
    $('.chat__content>.mCSB_vertical>.mCSB_scrollTools_vertical .mCSB_dragger').css({top:'unset',bottom:'0px'})

    // sending the message
    hellovinciai(chat_input);

  }

  else{

      $('.chat__messages')
      .append(
        `<div class="message message_vinci">
            <!--<img class="user-logo" src="/assets/build/assets/images/user-mes.svg" alt="">-->
            <div class="message__item message__item_vinci br-chat animated fadeInLeft" style="width: fit-content;">
                <p>Looks like an empty message to me :)</p>
            </div>
          </div>`
      );

  }

  
}

//= custom/carousel.js

//= custom/init.js
//= app/attributes_request.js
//= app/auto_complete_request.js
//= app/batman_false.js
//= app/batman_missing.js
//= app/beckham_router.js
//= app/Beckham.js
//= app/Buffon.js
//= app/comparison_request.js
//= app/event_helpers.js
//= app/get_video.js
//= app/Giggs.js
//= app/handlebars_helpers.js
//= app/Messi.js
//= app/Neymar.js
//= app/Raul.js
//= app/reload_product.js
//= app/request_reply.js
//= app/specifications_request.js
//= app/specifications_summary_request.js
//= app/tag_related_question.js
//= app/update_all_discussed_list.js
//= app/Zlatan.js
//= app/append_more_button.js
//= app/get_more.js
//= app/autocomplete.js

$(document).ready(function () {
  if (getParameterByName("q")) {
    $('.chat__bottom input').val(getParameterByName("q"))
    $('#send_chat').click()
  }
})



