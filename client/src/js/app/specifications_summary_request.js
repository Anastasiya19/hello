function specifications_summary_request(zlatan){

	
	//First we need to check the query_status to determine
	//which chat element to build
	
	zlatan.mobiles.forEach(create_product);

	function create_product(element, index, array){
	
		var raul = new Raul(element, 0);

		raul.set_id();


		raul.case_special_product();

		//Found the selected variant
        //Getting ready to create the context object
        // THERE ARE NO RATING IN THE VIEW!
        // raul.get_rating();
        
        //Get the title
        //Inside messi.js
        raul.get_summary_title();

        //Create the product context object
        raul.create_summary_product_context();

        //raul is the object for each mobile in Zlatan
        console.log("This is raul: ", raul);

        zlatan.mobiles_processed.push(raul);

        var mobiles_received = {
            id: raul.request_id,
            raul: raul
        }

        mobiles_requested.push(mobiles_received);



	}

	console.log("This is zlatan: ", zlatan);

	zlatan.mobiles_processed.forEach(get_context);

	function get_context(element, index, array){

		zlatan.contexts.push(element.context);

	}

	//Now we need to append the html for all the mobiles created by raul constructor function

}
