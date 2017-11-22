function beckham_router(beckham, zlatan, buffon) {

    console.log("Inside beckham_router");

    //First we need to check the query_status to determine
    //which chat element to build

    //Tested - Working correctly
    //Query status for the suggestion element and getting the mobiles
    if (beckham.query_status === 300) {

        var mobiles = []

        zlatan.mobiles[0].variants.forEach(mobile => {

            let variants = mobile.variants.concat([mobile])
            mobiles.push({ variants: variants })
        })

        zlatan.mobiles = mobiles

        beckham.build_specifications_element(zlatan);

        console.log("phones formatted ", zlatan)
    }

    //Tested - Working correctly
    //query status for building the specification element
    //Specifications
    if (beckham.query_status === 100) {

        console.log("Getting ready to create the product element");

        beckham.build_text_reply_element(buffon);

        beckham.build_specifications_element(zlatan);

    }

    //Tested - Working correctly
    //Specifications - Price and other attributes
    if (beckham.query_status === 101) {

        //Need to build the product and the attributes element
        console.log("Price and other attributes requested");

        beckham.build_text_reply_element(buffon);

        beckham.build_specifications_element(zlatan);

        beckham.build_attributes_element(zlatan);

    }

    //Tested - Working correctly
    //Specifications - Only other attributes
    if (beckham.query_status === 102) {

        //Need to build the attributes element
        console.log("Only attributes requested");

        beckham.build_text_reply_element(buffon);

        beckham.build_attributes_element(zlatan);

        //This function will create both the product and attributes elements

    }

    //Tested - Working correctly
    //Comparison of 2 phones
	if(beckham.query_status === 200){

        beckham.build_text_reply_element(buffon);

        beckham.build_comparison_element(zlatan, 200);

		//Need to build the comparison element
		console.log("Let's get the comparison started: Yaaay");
		
        

    }

    //Tested - working correctly
    //Comparison of price and other attributes of 2 phones
    if (beckham.query_status === 201) {
        //Price and other attributes for comparison
        console.log("Yeah right... price and other attributes for comparison");

        beckham.build_text_reply_element(buffon);
        
        beckham.build_specifications_element(zlatan);
        beckham.build_comparison_element(zlatan, 201);
        //get_comparison_attributes(zlatan);

    }

    //Tested - working correctly
    //Comparison of select attributes of 2 phones
    if (beckham.query_status === 202) {

        beckham.build_text_reply_element(buffon);
        //Specific attributes for comparison
        console.log("Yeah right...only attributes for comparison");
        beckham.build_comparison_element(zlatan, 202);

        // get_comparison_attributes(zlatan);
    }

    //Tested - Working correctly
    //Only price comparison of 2 phones
    if (beckham.query_status === 203) {

        beckham.build_text_reply_element(buffon);
        //Price for comparison. Corresponds to a product element
        console.log("Yeah right...only price for comparison");

        beckham.build_specifications_element(zlatan);

    }

    //Tested - Working correctly  
    //Comparison of phones of different brands
    if (beckham.query_status === 500) {

        beckham.build_text_reply_element(buffon);
        
        //Need to build the comparison element
        console.log("Let's get the comparison started: Yaaay");

        console.log("This is zlatan before correction: ", zlatan);
        
        beckham.correct_mobiles_array(zlatan, 200);

        console.log("This is corrected zlatan: ", zlatan);

        beckham.build_comparison_element(zlatan, 200);

    }

    //Tested - Working correctly
    //Comparison of attributes of phones of 2 different brands
    if (beckham.query_status === 502) {

        beckham.build_text_reply_element(buffon);

        //Only attributes for comparison
        console.log("Yeah right...only attributes for comparison");

        console.log("This is zlatan before correction: ", zlatan);

        beckham.correct_mobiles_array(zlatan, 202);

        console.log("This is corrected zlatan: ", zlatan);
        
        beckham.build_comparison_element(zlatan, 202);

    }

    //Tested - Working correctly
    //Video review
    if (beckham.query_status === 120) {

        beckham.build_text_reply_element(buffon);
        
        //Need to build the video element
        beckham.build_video_review_element(zlatan);

    }

    //Tested - Working correctly
    //Error case
    if (beckham.query_status === 999) {
        
        //Need to build the video element
        beckham.build_error_element();

    }

    if (beckham.query_status === 1) {
        
        //Need to build the video element
        beckham.build_text_reply_element(buffon);

    }



}