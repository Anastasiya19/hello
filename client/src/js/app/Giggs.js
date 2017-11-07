function Giggs (mobiles) {

    console.log("Giggs is on the pitch");

    //Mobile
    this.mobiles = mobiles;

    //Selected variants
    this.selected_variant = [];

    this.shortlisted_model_best_price = [];

    this.shortlisted_model_index = [];

    this.shortlisted_model_shortlisted_retailer_index = [];

    //Images
    this.images = [];

    //Names
    this.names = [];

    //Comparison context
    this.comparison_context = [];

}


//Function to fetch the cheapest variant
Giggs.prototype.get_cheapest_variant = function(){

    console.log("Inside get_cheapest_variant");

    this.mobiles.forEach(loop_each_mobile.bind(this));

    //Inside the first mobile
    function loop_each_mobile(mobile, count, mobiles){

        //Shortlisted model best price
        var shortlisted_model_best_price;

        //Index of the shortlisted model inside the variants array
        var shortlisted_model_index = 0;

        //Index of the Shortlisted model shortlisted retailer inside the product retailers array
        var shortlisted_model_shortlisted_retailer_index;

        //To determine the first iteration of the loop
        var setting_flag = false;

        mobile.variants.forEach(identify_cheapest_variant.bind(this));

        function identify_cheapest_variant(element, index, array){

            console.log("This is the index: ", index);

            //Call the identify cheapest retailer function for each retailer in the product retailers array
            element.product_retailers.forEach(identify_cheapest_retailer.bind(this));


            function identify_cheapest_retailer(element_inner,index_inner,array){

                //To make sure that the product price is not set to 0
                if(element_inner.product_pricing.special_price > 0){

                    if(setting_flag === false){

                        console.log("Inside setting_flag: ", setting_flag);

                        //Allocating the index to shortlisted_model_index as 
                        //it is the 1st iteration of the loop
                        shortlisted_model_index = index;

                        console.log("cheapest_model_index set: ", index);

                        //Allocating the special_price to the shortlisted_model_best_price
                        shortlisted_model_best_price = element_inner.product_pricing.special_price; 

                        //Allocating the index_inner to the shortlisted model retailer index
                        shortlisted_model_shortlisted_retailer_index = index_inner;

                        console.log("cheapest_model_price set: ", element_inner.product_pricing.special_price);

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

                            console.log("Resetting cheapest_model_index: ", shortlisted_model_index);
                            console.log("Resetting cheapest_model_price: ", shortlisted_model_best_price);
                        }

                    }

                }       

            }//identify_cheapest_retailer ends

        }//identify_cheapest_variant ends

        this.shortlisted_model_best_price[count] = shortlisted_model_best_price;

        this.shortlisted_model_index[count] = shortlisted_model_index;

        this.shortlisted_model_shortlisted_retailer_index[count] = shortlisted_model_shortlisted_retailer_index;

        this.selected_variant[count] = mobile.variants[shortlisted_model_index];

        //Best price of the shortlisted variant
        console.log("This is the shortlisted model best price: ", shortlisted_model_best_price);

        //Index of the shortlisted variant
        console.log("This is the shortlisted_model_index: ", shortlisted_model_index);

        //Index of the shortlisted retailer in the shortlisted variant
        console.log("This is the shortlisted_model_shortlisted_retailer_index: ", shortlisted_model_shortlisted_retailer_index);


        //We store the index of the variant in the selected_variant
        //selected_variant is the one for which we show all the details
        //this.selected_variant = this.mobiles[index].variants[this.shortlisted_model_index];

        console.log("selected_variant array is: ", this.selected_variant);



    }


};//get_cheapest_variant function ends

//Function to fetch the cheapest variant
Giggs.prototype.get_selected_variant = function(){

    console.log("Inside get_selected_variant");

    this.mobiles.forEach(loop_each_mobile.bind(this));

    //Inside the first mobile
    function loop_each_mobile(mobile, count, mobiles){

        this.selected_variant[count] = mobile.variants[0];

        console.log("selected_variant array is: ", this.selected_variant);

    }


};//get_cheapest_variant function ends


//Function to fetch the image of the phone
Giggs.prototype.get_images = function(){

    for(i=0; i<this.selected_variant.length; i++){

        this.images[i] = this.selected_variant[i].image_urls.small;

    }

    console.log("This is the images array: ", this.images);
}

//Function to fetch the image of the phone
Giggs.prototype.get_names = function(){

    for(i=0; i<this.selected_variant.length; i++){

        this.names[i] = this.selected_variant[i].product_basic_info.normalized_name;

    }

    console.log("This is the names array: ", this.names);

}

//Function to be called from get_comparison
Giggs.prototype.get_price_comparison = function(heading_text){

    var temp_object = {};
    temp_object.values = [];

    temp_object.heading_text = heading_text;


    for(var i = 0; i<this.mobiles.length; i++){

        temp_object.values[i] = "Starts at: "+this.shortlisted_model_best_price[i];

        console.log("This is the value: ", temp_object.values[i]);

        if(i === this.mobiles.length - 1){
            console.log("This is temp_object: ", temp_object);
            this.comparison_context.push(temp_object);

        }
    
    }//for ends

    console.log("This is the get_price_comparison: ", this.comparison_context);

}


//Function to get the attribute values
Giggs.prototype.create_context = function(heading_text, first, second){

    var temp_object = {};
    temp_object.values = [];

    temp_object.heading_text = heading_text;

    console.log("This is second: ", second);

    if(first!== undefined && second!==undefined){

        for(var i = 0; i<this.mobiles.length; i++){

            temp_object.values[i] = this.selected_variant[i][first][second];

            if(i === this.mobiles.length - 1){
                this.comparison_context.push(temp_object);
            }

        }

    }

    if(first!== undefined && second===undefined){

        for(var i = 0; i<this.mobiles.length; i++){

            temp_object.values[i] = this.selected_variant[i][first];

            if(i === this.mobiles.length - 1){
                this.comparison_context.push(temp_object);
            }

        }

    }

    console.log("This is the comparison context: ", this.comparison_context);


}