function get_more_reviews (event) {
    var target = $(event.target)
  
    var reviews_ul = target.parent()
    var retailer_product_id = reviews_ul.attr('data-retailer_product_id')
    var attribute = target.attr('data-attribute')
    var normalized_name = reviews_ul.attr('data-normalized_name')

    $.post('/product/reviews', { retailer_product_id: retailer_product_id }, function (reviews) {
  
      if (reviews.length === 0) {
  
        // Builds the text reply element
        var buffon = new Buffon(['Seems like, this is the end of the list.'])
        var zlatan = new Zlatan({mobiles: {reviews:reviews}})
        var beckham = new Beckham(1)

      }else {
        // This constructor is meant for the query_status
        // Beckham only does query routing and calls the necessary functions to create the request
        var beckham = new Beckham(400)
  
        // Zlatan takes cares of the response returned and calls respective functions to 
        // create the context objects
        var zlatan = new Zlatan({mobiles: {reviews:reviews}})
  
        // Builds the text reply element
        var buffon = new Buffon([`Alright, got you more reviews for ${normalized_name}.`])
  
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
  