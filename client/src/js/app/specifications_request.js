function specifications_request(zlatan){


	//First we need to check the query_status to determine
	//which chat element to build


	zlatan.mobiles.forEach(create_product);

	function create_product(element, index, array){

        if(element.variants.length > 0){

            var raul = new Raul(element, 0);

        raul.set_id();


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

        //raul is the object for each mobile in Zlatan

        zlatan.mobiles_processed.push(raul);

        var mobiles_received = {
            id: raul.request_id,
            raul: raul
        }

        mobiles_requested.push(mobiles_received);




        }
		

	}


	zlatan.mobiles_processed.forEach(get_context);

	function get_context(element, index, array){

		zlatan.contexts.push(element.context);

	}

	//Now we need to append the html for all the mobiles created by raul constructor function

}
