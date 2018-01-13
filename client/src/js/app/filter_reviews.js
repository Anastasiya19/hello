function filter_reviews(event, attribute){

    var target = $(event.target)
  
    var reviews_ul = target.parent()
    var retailer_product_id = reviews_ul.attr('data-retailer_product_id')
    
    var normalized_name = reviews_ul.attr('data-normalized_name')

    var reviews_carousel = $($(target)
    .parents(".message.message_vinci.clearfix")[0]).next()
    
    $.post('/product/filter_reviews', { 
        retailer_product_id: retailer_product_id,
        attribute: attribute
    }, 
    function (reviews) {
        var reviews = reviews[0]
        reduce_to_pairs = function (accumulator, currentValue, index)  {
            if(reviews.length === 1){
                return [reviews.reviews]
            }
          // console.log(accumulator)
          if (index % 2 === 0) {
            if (reviews.reviews[index + 1]) {
              accumulator.push([currentValue, reviews.reviews[index + 1]])
            }else {
              accumulator.push([currentValue])
            }
          }
          return accumulator
        }
      
        var reviews_pairs = reviews.reviews.reduce(reduce_to_pairs, [])
      
        var context = {
          reviews_pairs: reviews_pairs,
          camera_reviews_count: reviews.camera_reviews_count,
          processor_reviews_count: reviews.processor_reviews_count,
          battery_reviews_count: reviews.battery_reviews_count,
          display_reviews_count: reviews.display_reviews_count,
          quality_reviews_count: reviews.quality_reviews_count,
          sensors_reviews_count: reviews.sensors_reviews_count,
          price_reviews_count: reviews.price_reviews_count,
          sound_reviews_count: reviews.sound_reviews_count,
          ram_reviews_count: reviews.ram_reviews_count,
          storage_reviews_count: reviews.storage_reviews_count,
          normalized_name: reviews.normalized_name,
          retailer_product_id: reviews.retailer_product_id
        }
      
        var template = $('#handlebars-case-400').html()
        
        // Compile the template data into a function
        var templateScript = Handlebars.compile(template)
      
        var html = templateScript(context)
        var new_reviews = $($.parseHTML(html))[7]

        reviews_carousel.replaceWith(new_reviews)

        init_owl()
    })



}