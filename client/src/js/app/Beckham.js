function Beckham (query_status) {
  console.log('Beckham is on the pitch')

  // Query status
  this.query_status = query_status

  this.template

  this.templateScript

  this.html
}

Beckham.prototype.check_tag_related_question = function (zlatan, buffon) {
  tag_related_question(zlatan, buffon)
}

Beckham.prototype.build_specifications_element = function (zlatan) {

  // This function creates the context for each mobile in the zlatan object.
  // It creates Raul constructor for each mobile which just gives the context object for each mobile
  // All context objects are stored in the zlatan.contexts which is then passed for compilation
  specifications_request(zlatan)

  this.select_handlebars_template()

  this.compile_handlebars_template()

  var context = {
    phones: zlatan.contexts
  }

  this.get_html(context)



    this.append_html()

    init_specifications($('.chat__messages').children().last())

    this.scroll_into_view() 



}

Beckham.prototype.build_specifications_summary_element = function (zlatan) {

  // This function creates the context for each mobile in the zlatan object.
  // It creates Raul constructor for each mobile which just gives the context object for each mobile
  // All context objects are stored in the zlatan.contexts which is then passed for compilation
  console.log("This is zlatan inside build_specifications_summary_element: ", zlatan);

  specifications_summary_request(zlatan);

  //Create the context

  //Select the template

  //Compile the template

  //Set the context

  //Pass the context to script to create the html

  //append html

  this.template = $('#handlebars-case-100-summary').html()

  // Compile the template data into a function
  this.templateScript = Handlebars.compile(this.template)

  var context = {
    phones: zlatan.contexts
  }

  this.html = this.templateScript(context)



    // Insert the HTML code into the page
    $('.chat__messages').append(this.html)

    this.scroll_into_view()


  

}

Beckham.prototype.build_attributes_element = function (zlatan) {
  attributes_request(zlatan)

  this.build_attributes_detailed_element(zlatan)

  this.build_attributes_summary_element(zlatan)

  this.scroll_into_view()
}

Beckham.prototype.build_attributes_detailed_element = function (zlatan) {
  console.log('This is zlatan contexts_attributes_detailed: ', zlatan.contexts_attributes_detailed)

  if (zlatan.contexts_attributes_detailed.length > 0) {
    zlatan.contexts_attributes_detailed.forEach(create_html)

    function create_html (element, index, array) {
      this.template = $('#handlebars-case-104').html()
      console.log('This is the template: ', this.template)

      // Compile the template data into a function
      this.templateScript = Handlebars.compile(this.template)
      console.log('This is the templateScript: ', this.templateScript)

      this.html = this.templateScript({ attribute: element })
      console.log('This is the html: ', this.html)


        // Insert the HTML code into the page
        $('.chat__messages').append(this.html)        



    }
  }
}

Beckham.prototype.build_attributes_summary_element = function (zlatan) {
  console.log('This is zlatan contexts_attributes_summary: ', zlatan.contexts_attributes_summary)

  if (zlatan.contexts_attributes_summary.length > 0) {
    zlatan.contexts_attributes_summary.forEach(create_summary_html)

    function create_summary_html (element, index, array) {
      this.template = $('#attributes-text-reply').html()
      console.log('This is the template: ', this.template)

      // Compile the template data into a function
      this.templateScript = Handlebars.compile(this.template)
      console.log('This is the templateScript: ', this.templateScript)

      console.log('This goes in context: ', element)

      this.html = this.templateScript({ attribute: element })
      console.log('This is the html: ', this.html)


        // Insert the HTML code into the page
        $('.chat__messages').append(this.html)        

    }
  }
}

Beckham.prototype.build_comparison_element = function (zlatan, query_status) {
  comparison_request(zlatan, query_status)

  this.template = $('#handlebars-case-200').html()

  // Compile the template data into a function
  this.templateScript = Handlebars.compile(this.template)

  this.html = this.templateScript(zlatan.comparison_context)

  // Insert the HTML code into the page
  $('.chat__messages').append(this.html)

  this.scroll_into_view();
}

Beckham.prototype.correct_mobiles_array = function (zlatan, query_status) {
  var temp_array = zlatan.mobiles[0].variants

  if (query_status === 202) {
    var temp_attributes_array = zlatan.mobiles[0].attribute_requested
  }

  zlatan.mobiles = []

  temp_array.forEach(copy_mobiles)

  function copy_mobiles (element, index, array) {
    var variants_obj = {}

    variants_obj.variants = []

    variants_obj.variants.push(element)

    zlatan.mobiles.push(variants_obj)
  }

  if (query_status === 202) {
    zlatan.mobiles[0].attribute_requested = temp_attributes_array
  }
}

Beckham.prototype.build_video_review_element = function (zlatan) {
  console.log('case video ')

  get_video(zlatan)

  this.template = $('#handlebars-case-120').html()
  console.log('template ', this.template)
  // Compile the template data into a function
  this.templateScript = Handlebars.compile(this.template)

  this.html = this.templateScript(zlatan.context)



    // Insert the HTML code into the page
    $('.chat__messages').append(this.html)

    console.log('html', this.html)
    init_specifications($('.chat__messages').children().last())

    this.scroll_into_view()



}

Beckham.prototype.build_text_review_element = function (zlatan) {
  console.log('case text review  ')

  reduce_to_pairs = (accumulator, currentValue, index) => {
    // console.log(accumulator)
    if (index % 2 === 0) {
      if (zlatan.mobiles.reviews[0].reviews[index + 1]) {
        accumulator.push([currentValue, zlatan.mobiles.reviews[0].reviews[index + 1]])
      }else {
        accumulator.push([currentValue])
      }
    }
    return accumulator
  }

  var reviews_pairs = zlatan.mobiles.reviews[0].reviews.reduce(reduce_to_pairs, [])

  zlatan.context = {reviews_pairs: reviews_pairs}

  this.template = $('#handlebars-case-400').html()
  console.log('template ', this.template)
  // Compile the template data into a function
  this.templateScript = Handlebars.compile(this.template)

  this.html = this.templateScript(zlatan.context)

  // Insert the HTML code into the page
  $('.chat__messages').append(this.html)
  console.log('html', this.html)
  init_specifications($('.chat__messages').children().last())
  init_owl()
  this.scroll_into_view()
}

Beckham.prototype.build_error_element = function () {
  this.template = $('#handlebars-case-error').html()

  // Compile the template data into a function
  this.templateScript = Handlebars.compile(this.template)

  this.html = this.templateScript()

  // Insert the HTML code into the page
  $('.chat__messages').append(this.html)

  this.scroll_into_view()
}

Beckham.prototype.build_text_reply_element = function (buffon) {
  this.template = $('#handlebars-case-1x').html()

  // Compile the template data into a function
  this.templateScript = Handlebars.compile(this.template)

  console.log('This is displayText inside build_text_reply_element: ', buffon.displayText)

  var context = {
    text: buffon.displayText
  }

  console.log('This is context: ', context)

  this.html = this.templateScript(context)

  console.log('This is the html generated: ', this.html)

  // Insert the HTML code into the page
  $('.chat__messages').append(this.html)

  this.scroll_into_view()
}

Beckham.prototype.select_handlebars_template = function () {
  if (this.query_status === 100 || this.query_status === 300 || this.query_status === 101
    || this.query_status === 201 || this.query_status === 203) {
    this.template = $('#handlebars-case-100').html()
  }
}

Beckham.prototype.compile_handlebars_template = function () {
  // Compile the template data into a function
  this.templateScript = Handlebars.compile(this.template)
}

Beckham.prototype.get_html = function (context) {
  this.html = this.templateScript(context)
}

Beckham.prototype.append_html = function (context) {

  // Insert the HTML code into the page
  $('.chat__messages').append(this.html)

  console.log("Scroll element top after appending ", scroll_element.style.top);
}

Beckham.prototype.scroll_into_view = function () {

  var scroll_element = document.getElementById('mCSB_1_dragger_vertical');

  console.log("Scroll element top before appending ", scroll_element.style.top);

  console.log("Scroll element height ", scroll_element.style["height"]);

  console.log("Scroll element max-height ", scroll_element.style["max-height"]);

  var scroll_value = parseInt(scroll_element.style.top) - parseInt(scroll_element.style["height"]) + 15;

  scroll_element.style.top = scroll_value + "px";

  // var a = document.getElementsByClassName('chat__messages')
  // console.log('This is a:' , a)

  // var b = a[0].getElementsByClassName('message_sender')
  // console.log('This is b: ', b)

  // var element_count = b.length - 1
  // console.log('This is element_count: ', element_count)

  // b[element_count].scrollIntoView({behavior: "smooth"})
  // console.log('Scrolled into view')
}
