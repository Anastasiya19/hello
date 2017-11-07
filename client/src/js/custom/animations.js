var linkLocation = '';
$('.next').click(function (e) {
  e.preventDefault();
  linkLocation = this.href;
  hideElement($('.description'));
  hideElement($('.iphones__image_one'));
  hideElement($('.iphones__image_two'));
  hideElement($('.iphones__image_tree'));
  hideElement($('.macbook__image'));
  hideElement($('.browser__page'));
});
function redirectPage () {
  window.location = linkLocation;
}
function hideElement (selector) {
  var slideUp = {
      opacity: 0,
      'margin-top': '-40px',
      'padding-bottom': '40px',
    },
    slideUpAbs = {
      opacity: 0,
      top: '15%',
    },
    slideUpToLeft = {
      opacity: 0,
      left: '-5%',
      bottom: '-8%',
    },
    slideRight = {
      opacity: 0,
      right: '-25%',
    },
    slideUpToRight = {
      opacity: 0,
      right: '-71px',
      top: '28px',
    };
  selector.stop();
  if (selector) {
    console.log('selector--', selector);
    if (selector.hasClass('description')) {
      selector.animate(slideUp, 300, redirect);
    } else if (selector.hasClass('iphones__image_one')) {
      selector.animate(slideUpToRight, 300, redirect);
    } else if (selector.hasClass('iphones__image_two')) {
      selector.animate(slideUp, 300, redirect);
    } else if (selector.hasClass('iphones__image_tree')) {
      selector.animate(slideUpToLeft, 300, redirect);
    } else if (selector.hasClass('macbook__image')) {
      $('.macbook__content').fadeOut(300);
      $('.macbook').delay(500).animate(slideUpAbs, 500, redirect);
    } else if (selector.hasClass('browser__page')) {
      $('.browser__ex_1').fadeOut(300);
      $('.browser').delay(250).animate(slideRight, 400);
    }
  } else {
    redirect();
  }
}
function redirect () {
  $('body').delay(1000, redirectPage);
}

