function Raul (mobile, load_status) {

    
    //Mobile
    this.mobile = mobile;

    //Load status
    this.load_status = load_status;

    this.request_id = 0;

    this.shortlisted_model_best_price;

    this.shortlisted_model_index;

    this.shortlisted_model_shortlisted_retailer_index;

    this.selected_variant;

    this.model_name;

    this.title;

    this.features;

    this.rating;

    this.rating_count;

    this.reviews_count;

    this.cod;

    this.delivery_assured;

    this.memory_variants;

    this.color_variants;

    this.shortlisted_model_shortlisted_retailer;

    this.other_retailers;

    this.context;

    this.get_general;

    this.size_selector;

    this.color_selector;

    this.tags_array;

}

//Function to set the ID
Raul.prototype.set_id = function() {

    
    this.request_id = Date.now();

}


//This function is called on query_status 100
//This means that we need to build the special_product chat element
Raul.prototype.case_special_product = function() {

    
    //If it is a new request, we need to find the cheapest variant
    //amongst all the mobiles sent by the DB
    //The get_cheapest_variant function will find the cheapest variant amongst all the variants
    //of the requested phone
    //the selected variant object will then be used to display all the properties
    if (this.load_status === 0) {
        //Inside figo.js
        this.get_cheapest_variant();
    }

    //If the user has clicked on a memory size, we need to find the
    //cheapest variant for the selected memmory size
    if (this.load_status === 1) {
        this.get_cheapest_variant_size();
    }

    //If the user has clicked on a color, we need to find the
    //cheapest variant for the selected color
    if (this.load_status === 2) {
        this.get_cheapest_variant_size_color();
    }

    //this.team_line_up();

}; //case_special_product function ends


//Function to fetch the cheapest variant
Raul.prototype.get_cheapest_variant = function(){

	
	//Shortlisted model best price
	var shortlisted_model_best_price = 0;

	//Index of the shortlisted model inside the variants array
	var shortlisted_model_index = 0;

	//Index of the Shortlisted model shortlisted retailer inside the product retailers array
	var shortlisted_model_shortlisted_retailer_index = 0;

	//To determine the first iteration of the loop
	var setting_flag = false;

	//Call the identify cheapest variant function on the variants array
	this.mobile.variants.forEach(identify_cheapest_variant.bind(this));

    //Function called on each variant of the mobile to identify the cheapest variant
	function identify_cheapest_variant(element, index, array){



		//Call the identify cheapest retailer function for each retailer in the product retailers array
		element.product_retailers.forEach(identify_cheapest_retailer.bind(this));


		function identify_cheapest_retailer(element_inner,index_inner,array){



			//To make sure that the product price is not set to 0
			if(element_inner.product_pricing.special_price > 0){

				if(setting_flag === false){


					//Allocating the index to shortlisted_model_index as 
					//it is the 1st iteration of the loop
					shortlisted_model_index = index;

					
					//Allocating the special_price to the shortlisted_model_best_price
					shortlisted_model_best_price = element_inner.product_pricing.special_price;	

					//Allocating the index_inner to the shortlisted model retailer index
					shortlisted_model_shortlisted_retailer_index = index_inner;

					
					//Changing the setting flag to true as the first iteration is done
					setting_flag = true;

				}

				else{

					//After the first iteration is done
					//Now we are checking whether the price of the element is lower than the shortlisted element
					//If yes, we update the shortlisted element details

					//From this function, we get the shortlisted model index
					//shortlisted model best price
					//shortlisted model retailer index
					if(element_inner.product_pricing.special_price < shortlisted_model_best_price){

						shortlisted_model_index = index;
						shortlisted_model_best_price = element_inner.product_pricing.special_price;
						shortlisted_model_shortlisted_retailer_index = index_inner;

						
					}

				}

			}		

		}//identify_cheapest_retailer ends

	}//identify_cheapest_variant ends

	this.shortlisted_model_best_price = shortlisted_model_best_price;

	this.shortlisted_model_index = shortlisted_model_index;

	this.shortlisted_model_shortlisted_retailer_index = shortlisted_model_shortlisted_retailer_index;

	this.selected_variant = this.mobile.variants[shortlisted_model_index];

	

	//We store the index of the variant in the selected_variant
	//selected_variant is the one for which we show all the details
	//this.selected_variant = this.mobiles[index].variants[this.shortlisted_model_index];

	

};//get_cheapest_variant function ends


//Function to fetch the cheapest variant
Raul.prototype.get_cheapest_variant_size = function(){

    
    //Shortlisted model best price
    var shortlisted_model_best_price = 0;

    //Index of the shortlisted model
    var shortlisted_model_index = 0;

    //Shortlisted model shortlisted retailer
    var shortlisted_model_shortlisted_retailer_index = 0;

    //To determine the first iteration of the loop
    var setting_flag = false;

    
    this.mobile.variants.forEach(identify_cheapest_variant.bind(this));

    function identify_cheapest_variant(element, index, array){

       
        element.product_retailers.forEach(identify_cheapest_retailer.bind(this));

        function identify_cheapest_retailer(element_inner,index_inner,array){

            if(element_inner.product_pricing.special_price > 0 && element.memory_storage.internal_storage === this.size_selector){

                if(setting_flag === false){

                    
                    shortlisted_model_index = index;


                    shortlisted_model_best_price = element_inner.product_pricing.special_price; 

                    shortlisted_model_shortlisted_retailer_index = index_inner;


                    setting_flag = true;

                }

                else{

                    if(element_inner.product_pricing.special_price < shortlisted_model_best_price){

                        shortlisted_model_index = index;
                        shortlisted_model_best_price = element_inner.product_pricing.special_price;
                        shortlisted_model_shortlisted_retailer_index = index_inner;

             
                    }

                }

            }       

        }//identify_cheapest_retailer ends

    }//identify_cheapest_variant ends

    this.shortlisted_model_best_price = shortlisted_model_best_price;

    this.shortlisted_model_index = shortlisted_model_index;

    this.shortlisted_model_shortlisted_retailer_index = shortlisted_model_shortlisted_retailer_index;

    this.selected_variant = this.mobile.variants[shortlisted_model_index];

    

    //We store the index of the variant in the selected_variant
    //selected_variant is the one for which we show all the details
    //this.selected_variant = this.mobiles[index].variants[this.shortlisted_model_index];

   

};//get_cheapest_variant function ends

Raul.prototype.get_cheapest_variant_size_color = function(){


    //Shortlisted model best price
    var shortlisted_model_best_price = 0;

    //Index of the shortlisted model
    var shortlisted_model_index = 0;

    //Shortlisted model shortlisted retailer
    var shortlisted_model_shortlisted_retailer_index = 0;

    //To determine the first iteration of the loop
    var setting_flag = false;


    this.mobile.variants.forEach(identify_cheapest_variant.bind(this));

    function identify_cheapest_variant(element, index, array){


        element.product_retailers.forEach(identify_cheapest_retailer.bind(this));

        function identify_cheapest_retailer(element_inner,index_inner,array){

            if(element_inner.product_pricing.special_price > 0 && element.memory_storage.internal_storage === this.size_selector && element.general_specifications.model_color === this.color_selector){

                if(setting_flag === false){


                    shortlisted_model_index = index;


                    shortlisted_model_best_price = element_inner.product_pricing.special_price; 

                    shortlisted_model_shortlisted_retailer_index = index_inner;


                    setting_flag = true;

                }

                else{

                    if(element_inner.product_pricing.special_price < shortlisted_model_best_price){

                        shortlisted_model_index = index;
                        shortlisted_model_best_price = element_inner.product_pricing.special_price;
                        shortlisted_model_shortlisted_retailer_index = index_inner;

                    }

                }

            }       

        }//identify_cheapest_retailer ends

    }//identify_cheapest_variant ends

    this.shortlisted_model_best_price = shortlisted_model_best_price;

    this.shortlisted_model_index = shortlisted_model_index;

    this.shortlisted_model_shortlisted_retailer_index = shortlisted_model_shortlisted_retailer_index;

    this.selected_variant = this.mobile.variants[shortlisted_model_index];



    //We store the index of the variant in the selected_variant
    //selected_variant is the one for which we show all the details
    //this.selected_variant = this.mobiles[index].variants[this.shortlisted_model_index];

    


};//get_cheapest_variant function ends


Raul.prototype.get_rating = function() {


    this.rating = this.selected_variant.product_retailers[this.shortlisted_model_shortlisted_retailer_index].product_rating.rating_val;

    this.rating_count = this.selected_variant.product_retailers[this.shortlisted_model_shortlisted_retailer_index].product_rating.number_of_ratings;

    this.reviews_count = this.selected_variant.product_retailers[this.shortlisted_model_shortlisted_retailer_index].product_rating.number_of_reviews;

} //get_rating function ends


Raul.prototype.get_delivery_details = function() {

    this.cod = this.selected_variant.product_retailers[this.shortlisted_model_shortlisted_retailer_index].delivery_details.cod;

    this.delivery_assured = this.selected_variant.product_retailers[this.shortlisted_model_shortlisted_retailer_index].delivery_details.delivery_assured;
}


Raul.prototype.get_specifications_general = function() {

    this.get_general = [];


    var attribute_first = {
        field: "Model name",
        value: this.selected_variant.product_basic_info.normalized_name
    };

    var attribute_second = {
        field: "Brand",
        value: this.selected_variant.product_basic_info.productBrand_normalized
    };

    var attribute_third = {
        field: "Color",
        value: this.selected_variant.general_specifications.model_color
    };

    var attribute_fourth = {
        field: "In the Box",
        value: this.selected_variant.sales_package.contents
    };

    var attribute_fifth = {
        field: "SIM Type",
        value: this.selected_variant.sim_features.sim_type
    };

    var attribute_sixth = {
        field: "SIM Size",
        value: this.selected_variant.sim_features.sim_size
    };

    var attribute_seventh = {
        field: "Hybrid SIM slot",
        value: this.selected_variant.sim_features.hybird_sim_slot_status
    };

    this.get_general.push(attribute_first);
    this.get_general.push(attribute_second);
    this.get_general.push(attribute_third);
    this.get_general.push(attribute_fourth);
    this.get_general.push(attribute_fifth);
    this.get_general.push(attribute_sixth);
    this.get_general.push(attribute_seventh);

} //get_specifications_general ends


Raul.prototype.get_specifications_display_camera = function() {

    this.get_display = [{
            field: "Screen size",
            value: this.selected_variant.display_specifications.display_size
        },

        {
            field: "Display Type",
            value: this.selected_variant.display_specifications.display_type
        },

        {
            field: "Resolution",
            value: this.selected_variant.display_specifications.resolution
        },

        {
            field: "Resolution Type",
            value: this.selected_variant.display_specifications.resolution_type
        },

        {
            field: "Touchscreen",
            value: this.selected_variant.display_specifications.touchscreen_status
        }
    ]

    this.get_camera = [{
            field: "Primary camera pixels",
            value: this.selected_variant.camera.primary_camera_pixels
        },

        {
            field: "Primary camera features",
            value: this.selected_variant.camera.primary_camera_features
        },

        {
            field: "Secondary camera pixels",
            value: this.selected_variant.camera.secondary_camera_pixels
        },

        {
            field: "Secondary camera features",
            value: this.selected_variant.camera.secondary_camera_features
        },

        {
            field: "Flash",
            value: this.selected_variant.camera.flash
        },

        {
            field: "Video recording resolution",
            value: this.selected_variant.video_recording_resolution
        }
    ]

        // this.get_display_camera.push(attribute_first);
        // this.get_display_camera.push(attribute_second);
        // this.get_display_camera.push(attribute_third);
        // this.get_display_camera.push(attribute_fourth);
        // this.get_display_camera.push(attribute_fifth);
        // this.get_display_camera.push(attribute_sixth);
        // this.get_display_camera.push(attribute_seventh);
        // this.get_display_camera.push(attribute_eigth);
        // this.get_display_camera.push(attribute_ninth);
        // this.get_display_camera.push(attribute_tenth);
        // this.get_display_camera.push(attribute_eleventh);

} //get_specifications_general ends



Raul.prototype.get_battery = function() {

    this.battery = [{
            field: "Battery type ",
            value: this.selected_variant.battery_power.battery_type
        },
        {
            field: "Battery capacity ",
            value: this.selected_variant.battery_power.battery_capacity
        },
        {
            field: "Removable battery ",
            value: this.selected_variant.battery_power.removable_battery_status
        }
    ]

} 


//Function to get the title from the selected variant
//Generate the title based on the color and storage availability
Raul.prototype.get_title = function() {


    if (this.selected_variant.general_specifications.model_color !== "N/A" && this.selected_variant.memory_storage.internal_storage !== "N/A") {

        this.title = this.selected_variant.product_basic_info.normalized_name + " (" + this.selected_variant.general_specifications.model_color + ", " + this.selected_variant.memory_storage.internal_storage + ")";
    }

    if (this.selected_variant.general_specifications.model_color !== "N/A" && this.selected_variant.memory_storage.internal_storage === "N/A") {

        this.title = this.selected_variant.product_basic_info.normalized_name + " (" + this.selected_variant.general_specifications.model_color + ")";
    }

    if (this.selected_variant.general_specifications.model_color === "N/A" && this.selected_variant.memory_storage.internal_storage !== "N/A") {

        this.title = this.selected_variant.product_basic_info.normalized_name + " (" + this.selected_variant.memory_storage.internal_storage + ")";
    }

    if (this.selected_variant.general_specifications.model_color === "N/A" && this.selected_variant.memory_storage.internal_storage === "N/A") {

        this.title = this.selected_variant.product_basic_info.normalized_name;
    }

 
    //var title = this.selected_variant.product_basic_info.normalized_name + " (" + this.selected_variant.general_specifications.model_color + ", " + this.selected_variant.memory_storage.internal_storage + ")";
    //return title;


} //get_title function ends


Raul.prototype.get_summary_title = function(){

    this.title = this.selected_variant.product_basic_info.normalized_name;

}


//Function to get the features of the selected variant
Raul.prototype.get_features = function() {

    if (this.query_status === 105) {

        this.features = this.selected_variant.general_specifications.features;

    } 

    else {

        this.features = [];

        if (this.selected_variant.display_specifications.display_size !== "N/A" && this.selected_variant.display_specifications.resolution_type !== "N/A") {

            this.features.push(this.selected_variant.display_specifications.display_size + ", " + this.selected_variant.display_specifications.resolution_type);

        } //display size case ends

        if (this.selected_variant.camera.primary_camera_pixels !== "N/A" || this.selected_variant.camera.secondary_camera_pixels !== "N/A") {

            if (this.selected_variant.camera.secondary_camera_pixels === "N/A") {
                this.features.push(this.selected_variant.camera.primary_camera_pixels + " Main Camera")
            }
            if (this.selected_variant.camera.primary_camera_pixels === "N/A") {
                this.features.push(this.selected_variant.camera.secondary_camera_pixels + " Selfie Camera")
            }

            if (this.selected_variant.camera.primary_camera_pixels !== "N/A" && this.selected_variant.camera.secondary_camera_pixels !== "N/A") {
                this.features.push(this.selected_variant.camera.primary_camera_pixels + " Main Camera | " + this.selected_variant.camera.secondary_camera_pixels + " Selfie Camera");
            }

        } //camera case ends

        if (this.selected_variant.memory_storage.ram !== "N/A" || this.selected_variant.os_processor.processor_speed !== "N/A" || this.selected_variant.os_processor.processor_core !== "N/A") {

            var ram_case;
            var processor_case;
            var processor_core_case;

            if (this.selected_variant.memory_storage.ram !== "N/A") {
                ram_case = 1
            }


            if (this.selected_variant.os_processor.processor_speed !== "N/A") {
                processor_case = 3;
            }


            if (this.selected_variant.os_processor.processor_core !== "N/A") {
                processor_core_case = 5;
            }


            var total_case = ram_case + processor_case + processor_core_case;

            //possible values of total_case
            //1
            //3
            //5
            //4
            //6
            //8
            //9

            if (total_case === 1) {

                this.features.push(this.selected_variant.memory_storage.ram + " RAM");
            }

            if (total_case === 3) {
                this.features.push(this.selected_variant.os_processor.processor_speed + " Processor");
            }

            if (total_case === 5) {
                this.features.push(this.selected_variant.os_processor.processor_core + " Processor");
            }

            if (total_case === 4) {
                this.features.push(this.selected_variant.memory_storage.ram + " RAM" + ", " + this.selected_variant.os_processor.processor_speed + " Processor");
            }

            if (total_case === 6) {
                this.features.push(this.selected_variant.memory_storage.ram + " RAM" + ", " + this.selected_variant.os_processor.processor_core + " Processor");
            }

            if (total_case === 8) {
                this.features.push(this.selected_variant.os_processor.processor_speed + ", " + this.selected_variant.os_processor.processor_core + " Processor");
            }

            if (total_case === 9) {
                this.features.push(this.selected_variant.memory_storage.ram + " RAM, " + this.selected_variant.os_processor.processor_speed + ", " + this.selected_variant.os_processor.processor_core + " Processor");
            }

        } //RAM processor case ends

    }


} //get_features function ends

//Function to generate the list of memory_variants
//Store all the memory_variants in this.memory_variants
Raul.prototype.get_memory_variants = function() {


        this.memory_variants = [];


        //Looping through all the memory variants
        this.mobile.variants.forEach(generate.bind(this));

        function generate(element, index, array) {

            //If the internal_storage value is not equal to "N/A"
            if (element.memory_storage.internal_storage !== "N/A") {
                //Check if the memory variant value already exists
                var flag = this.memory_variants.indexOf(element.memory_storage.internal_storage);
                //If not, then add it to the memory_variants array
                if (flag < 0) {

                    this.memory_variants.push(element.memory_storage.internal_storage);

                }

            }

        }



} //get_memory_variants function ends


//Function to generate the list of color_variants
//Store all the memory_variants in this.color_variants
Raul.prototype.get_color_variants = function() {

        


        this.color_variants = [];

        this.mobile.variants.forEach(generate.bind(this));


        function generate(element, index, array) {

            if (element.memory_storage.internal_storage === this.selected_variant.memory_storage.internal_storage) {

                if (element.general_specifications.model_color !== "N/A") {

                    var flag = this.color_variants.indexOf(element.general_specifications.model_color);

                    if (flag < 0) {

                        this.color_variants.push(element.general_specifications.model_color);

                    }

                }

            }

        }

        //console.log("This is the color_variants array: ", color_variants);

        this.color_variants = this.color_variants.sort();

        

} //get_color_variants function ends

//Function to get the cheapest retailer
Raul.prototype.get_cheapest_retailer = function() {

        this.shortlisted_model_shortlisted_retailer = this.selected_variant.product_retailers[this.shortlisted_model_shortlisted_retailer_index].retailer_description.retailer_name;
        

} //get_cheapest_retailer function ends


//Function to get other retailers
Raul.prototype.get_other_retailers = function() {

        this.other_retailers = [];

        for (var i = 0; i < this.selected_variant.product_retailers.length; i++) {

            if (i !== this.shortlisted_model_shortlisted_retailer_index) {

                this.other_retailers.push(this.selected_variant.product_retailers[i]);
            }
        }



} //get_other_retailers function ends


//Function to get the tags for the features section
Raul.prototype.get_tags_features = function(){


    console.log("Inside get_tags_features: ");
    console.log("This is the first tag: ", this.selected_variant.product_tags);

}


Raul.prototype.create_product_context = function() {



    //Create the context object to display the product element

    this.context = {
        id: this.request_id,
        shortlisted_model_index: this.shortlisted_model_index,
        shortlisted_model_shortlisted_retailer_index: this.shortlisted_model_shortlisted_retailer_index,
        title: this.title,
        features: this.features,
        memory_variants_array: this.memory_variants,
        selected_variant: this.selected_variant,
        color_variants_array: this.color_variants,
        cheapest_price: this.shortlisted_model_best_price,
        shortlisted_model_shortlisted_retailer: this.shortlisted_model_shortlisted_retailer,
        other_retailers_array: this.other_retailers,
        rating: this.rating,
        rating_count: this.rating_count,
        reviews_count: this.reviews_count,
        color_variants_array: this.color_variants,
        cod: this.cod,
        delivery_assured: this.delivery_assured,
        specifications_general: this.get_general,
        get_display: this.get_display,
        get_camera: this.get_camera,
        battery: this.battery,
        cheapestURL: this.selected_variant.product_retailers[this.shortlisted_model_shortlisted_retailer_index]["productURL"]

    } //this.context object over

} //create_product_context function ends

Raul.prototype.create_summary_product_context = function() {



    //Create the context object to display the product element

    this.context = {
        id: this.request_id,
        shortlisted_model_index: this.shortlisted_model_index,
        shortlisted_model_shortlisted_retailer_index: this.shortlisted_model_shortlisted_retailer_index,
        title: this.title,
        selected_variant: this.selected_variant,
        cheapest_price: this.shortlisted_model_best_price,
        other_price: this.selected_variant.product_retailers[this.shortlisted_model_shortlisted_retailer_index].product_pricing.mrp

    } //this.context object over

} //create_product_context function ends

