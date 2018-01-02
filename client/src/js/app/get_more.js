function get_more (event) {
  var more_button = $(event.target)

  var query = more_button.attr('data-query')

  var skip = Number(more_button.attr('data-skip'))

  $('.chat__messages').append(`<div class="message message_vinci is--typing">
        <!--<img class="vinci-logo" src="assets/build/assets/images/vinci-mes.svg" alt="">-->
        <div class="message__item message__item_vinci message__item_writing br-chat">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
            <!--<img src="assets/images/vinci_writing_dots.svg" alt="">-->
        </div>
    </div>`)

  $.post('/get_more', { query: query, skip: skip }, function (mobiles) {

    // Remove the is--typing element
    $('.is--typing').remove()

    if (mobiles[0].variants.length === 0) {

      // Builds the text reply element
      var buffon = new Buffon(['Seems like, this is the end of the list.'])
      var zlatan = new Zlatan({mobiles: mobiles,query_object: query,skip: skip + 20})
      var beckham = new Beckham(1)
    }else {
      // This constructor is meant for the query_status
      // Beckham only does query routing and calls the necessary functions to create the request
      var beckham = new Beckham(300)

      // Zlatan takes cares of the response returned and calls respective functions to 
      // create the context objects
      var zlatan = new Zlatan({mobiles: mobiles,query_object: query,skip: skip + 20})

      // Builds the text reply element
      var buffon = new Buffon(['Alright, got you more phones.'])

      // Check the status of the request to decide which element to create
      
    }
    beckham_router(beckham, zlatan, buffon)
    // append the last set of suggested question 
    $('.chat__messages').append($($('.suggestion')[$('.suggestion').length - 1]))
    // remove the more button
    // $(".more-button")[$(".more-button").length -1].remove()
    // append new more button
    // append_more_button(query,skip+1)

    // for native scroll(mobile only)
    $('.chat__content').scrollTop($('.chat__content')[0].scrollHeight)

    // for mCustomScrollbar
    $('#mCSB_1_container').css({'top': $('#mCSB_1').height() - $('#mCSB_1_container').height()})
    $('#mCSB_1_dragger_vertical').css({top: 'unset',bottom: '0px'})
  })
}
