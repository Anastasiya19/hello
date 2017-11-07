$(document).ready(function () {
  var microphoneIndicator = $('.speaking__status');
  if (microphoneIndicator.hasClass('speaking__status_ready')) {
    $('.speaking__description h3').html('VINCI is ready to Listen');
    $('.speaking__description h4').html('ready to listen to the user');
  } else if (microphoneIndicator.hasClass('speaking__status_listen')) {
    $('.speaking__description h3').html('VINCI is Listening');
    $('.speaking__description h4').html('Listening');
  } else if (microphoneIndicator.hasClass('speaking__status_analyzing')) {
    $('.speaking__description h3').html('VINCI is Analyzing');
    $('.speaking__description h4').html('Analyzing');
  }
});