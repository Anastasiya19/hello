function reload_product(raul){

	
	raul.case_special_product();
	//Found the selected variant
    //Getting ready to create the context object
    raul.get_rating();

    raul.get_delivery_details();

    raul.get_specifications_general();

    raul.get_specifications_display_camera();

    raul.get_battery();
    //Get the title
    //Inside messi.js
    raul.get_title();

    //Get the features
    //Inside messi.js
    raul.get_features();

    //Get the memory variants
    //Inside messi.js
    raul.get_memory_variants();

    //Get the color variants
    //Inside messi.js
    raul.get_color_variants();

    //Get the cheapest retailer
    //Inside messi.js
    raul.get_cheapest_retailer();

    //Get the other retailers
    //Inside messi.js
    raul.get_other_retailers();

    //Create the product context object
    raul.create_product_context();


    var template = $('#handlebars-carousel-item').html();

    // Compile the template data into a function
    var templateScript = Handlebars.compile(template);

    var html_generated = templateScript(raul.context);

    $("#" + raul.request_id).html(html_generated);

    init_specifications($("#" + raul.context.id))

	//Now we need to append the html for all the mobiles created by raul constructor function

}
