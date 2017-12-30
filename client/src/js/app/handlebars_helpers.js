Handlebars.registerHelper('generate_title_helper', function() {

    var title = this.selected_variant.product_basic_info.normalized_name + " (" + this.selected_variant.general_specifications.model_color + ", " + this.selected_variant.memory_storage.internal_storage + ")";
    return title;
});


Handlebars.registerHelper('generate_features_helper', function() {

    var features = "";

    if (this.selected_variant.display_specifications.display_size !== "N/A" && this.selected_variant.display_specifications.resolution_type !== "N/A") {

        features += "<li>"
        features += this.selected_variant.display_specifications.display_size + ",  "
        features += this.selected_variant.display_specifications.resolution_type
        features += "</li>"

    }

    if (this.selected_variant.camera.primary_camera_pixels !== "N/A" || this.selected_variant.camera.secondary_camera_pixels !== "N/A") {

        features += "<li>"
        if (this.selected_variant.camera.primary_camera_pixels !== "N/A") {
            features += this.selected_variant.camera.primary_camera_pixels + " Main Camera | "
        }
        if (this.selected_variant.camera.secondary_camera_pixels !== "N/A") {
            features += this.selected_variant.camera.secondary_camera_pixels + " Selfie Camera"
        }

        features += "</li>"

    }

    if (this.selected_variant.memory_storage.ram !== "N/A" || this.selected_variant.os_processor.processor_speed !== "N/A") {

        features += "<li>"
        if (this.selected_variant.memory_storage.ram !== "N/A") {
            features += this.selected_variant.memory_storage.ram + " RAM | "
        }
        if (this.selected_variant.os_processor.processor_speed !== "N/A" && this.selected_variant.os_processor.processor_core !== "N/A") {
            features += this.selected_variant.os_processor.processor_speed + " " + this.selected_variant.os_processor.processor_core + ", Processor"
        }

        features += "</li>"

    }

    return features;
});

Handlebars.registerHelper('generate_price_helper', function() {

    if (parseInt(this.product_pricing.special_price) > 0) {

        var return_string = "Rs. " + this.product_pricing.special_price;

        return return_string

    } else {

        return "Out of stock"
    }

});

Handlebars.registerHelper('generate_logo_helper', function() {

    var logos = [
        ["Tata cliq", "TATA_Cliq_Logo.png"],
        ["Flipkart", "flipkart_logo_1.png"],
        ["Gadgets 360", "ndtvgadgetlogo.png"],
        ["Amazon", "store_2.svg"],
        ["paytm", "Paytm_logo.png"]
    ]

    for (var i = logos.length - 1; i >= 0; i--) {
        if (logos[i][0] == this.retailer_description.retailer_name) {
            return "/assets/build/assets/images/" + logos[i][1]
        }
    }


});

Handlebars.registerHelper('generate_logo_helper_cheapest', function(shortlisted_model_shortlisted_retailer) {

    var logos = [
        ["Tata cliq", "TATA_Cliq_Logo.png"],
        ["Flipkart", "flipkart_logo_1.png"],
        ["Gadgets 360", "ndtvgadgetlogo.png"],
        ["Amazon", "store_2.svg"],
        ["paytm", "Paytm_logo.png"]
    ]

    for (var i = logos.length - 1; i >= 0; i--) {
        if (logos[i][0] == shortlisted_model_shortlisted_retailer) {
            return "/assets/build/assets/images/" + logos[i][1]
        }
    }

});


Handlebars.registerHelper('generate_memory_variants_helper', function() {

    

    

    

    

    var memory_variants = "";

    for (var i = 0; i < this.memory_variants_array.length; i++) {

    

  //       if (this.memory_variants_array[i] === this.selected_variant.memory_storage.internal_storage) {

  //           // console.log("Inside selected case: ", this.memory_variants_array[i]);
  //           // console.log("THis is from the selected variant: ", this.selected_variant.memory_storage.internal_storage);
  //           // memory_variants += "<div class='product--storage-action selected' onclick='fetch_variant(event)'>"
  //           // memory_variants += this.memory_variants_array[i]
  //           // memory_variants += "</div>"

  //       } else {

  //           // memory_variants += "<div class='product--storage-action' onclick='fetch_variant(event)'>"
  //           // memory_variants += this.memory_variants_array[i]
  //           // memory_variants += "</div>"
  //           memory_variants += `<li class="selection__item" onclick='fetch_variant(this)'>
		// 	<span class="selection__name">${this.memory_variants_array[i]}</span>
		// </li>`;

  //       }



            // memory_variants += "<div class='product--storage-action' onclick='fetch_variant(event)'>"
            // memory_variants += this.memory_variants_array[i]
            // memory_variants += "</div>"
            memory_variants += `<li class="selection__item" onclick='fetch_variant(this)'>
            <span class="selection__name">${this.memory_variants_array[i]}</span>
        </li>`;




    }



    return `<h5 class="selection__name selection__padding">
	<span class="selection__action">Select Storage</span>
	<span class="selection__name selection__no-padding selection__name_current">${this.selected_variant.memory_storage.internal_storage} </span>
	</h5>
	<ul class="selection__list selection__list_hidden">
	${memory_variants}
	</ul>`;

});


Handlebars.registerHelper('generate_color_variants_helper', function() {

    

    var color_variants = "";

    for (var i = 0; i < this.color_variants_array.length; i++) {

    

        /*
        if (this.color_variants_array[i] === this.selected_variant.general_specifications.model_color) {

            console.log("Inside selected case: ", this.color_variants_array[i]);
            console.log("THis is from the selected variant: ", this.selected_variant.general_specifications.model_color);

            // color_variants += "<div class='product--color-action selected'"
            // color_variants += " style='background-color: "
            // color_variants += getHex(this.color_variants_array[i])
            // color_variants += ";'"
            // color_variants += "data-color-text="
            // color_variants += this.color_variants_array[i].replace(" ", "_");
            // color_variants += ">"
            // color_variants += "</div>"

        } else {

            // color_variants += "<div class='product--color-action' onclick='fetch_variant_by_color(event)'"
            // color_variants += " style='background-color: "
            // color_variants += getHex(this.color_variants_array[i])
            // color_variants += ";'"
            // color_variants += "data-color-text="
            // color_variants += this.color_variants_array[i].replace(" ", "_");
            // color_variants += ">"
            // color_variants += "</div>"

            color_variants += `	<li class="selection__item">
			<span class="selection__name">
				<span class="characteristic__color " style="background-color:${getHex(this.color_variants_array[i])};"></span>
			  </span>
			<span class="color">${this.color_variants_array[i]}</span>
		</li>`
        }*/

        color_variants += ` <li class="selection__item" onclick='fetch_variant_by_color(this)'>
            <span class="selection__name">
                <span class="characteristic__color " style="background-color:${getHex(this.color_variants_array[i])};"></span>
              </span>
            <span class="color">${this.color_variants_array[i]}</span>
        </li>`

    }

    function getHex(color) {

        var colors = [
            ["Black", "#000"],
            ["Space Grey", "#9b9ba0"],
            ["Silver", "#c0c0c0"],
            ["Gold", "#D5BBA1"],
            ["Golden", "#D5BBA1"],
            ["Rose", "#d1a89f"],
            ["Gray", "#d3d3d3"],
            ["Jet Black", "#0a0a0a"],
            ["Red", "#F00"],
            ["Rose Gold", "#b76e79"],
            ["Yellow", "#ffff00"],
            ["White", "#ffffff"],
            ["Blue", "#0000ff"],
            ["Grey", "#d3d3d3"],
            ["Champagne", "#F7E7CE"],
            ["Purple", "#551a8b"],
            ["Brown", "#8b4513"],
            ["Green", "#00ff00"],
            ["Champange", "#F7E7CE"],
            ["Lime", "#32cd32"],
            ["Titan", "#DDD6E1"],
            ["SeaBlue", "#006994"],
            ["Slate", "#778899"],
            ["Coffee", "#6f4e37"],
            ["Orange", "#ffa500"],
            ["Royal", "#4169e1"],
            ["Champangne", "#F7E7CE"],
            ["Pink", "#ff69b4"],
            ["Bliss", "#72c3df"],
            ["Graphite", "#474a51"],
            ["Chocolate", "#d2691e"],
            ["Ice", "#A5F2F3"],
            ["Coral", "#ff7f50"],
            ["Chrome", "#E1EDCF"],
            ["Teak", "#A38B5F"],
            ["Cyan", "#00ffff"],
            ["Turquoise", "#00e5ee"],
            ["Mint", "#98ff98"],
            ["Carbon", "#151515"],
            ["Platinum", "#e5e4e2"],
            ["Chmapagne", "#F7E7CE"],
            ["Champ", "#F7E7CE"],
            ["Titanium", "#6a696f"],
            ["copper", "#b87333"],
            ["champagne", "#F7E7CE"]
        ]

        //  [
        //    ["Space Grey", "#9b9ba0"],
        //    ["Silver", "#d0d0d4"],
        //    ["Gold", "#D5BBA1"],
        //    ["Rose", "#d1a89f"],
        //    ["Black", "#000"],
        //    ["Jet Black", "#0a0a0a"],
        //    ["Red", "#F00"],
        //    ["Rose Gold", "#b76e79"],
        //    ["Yellow", "#ffff00"],
        //    ["White", "#ffffff"]
        // ]

        function search() {
            for (var i = colors.length - 1; i >= 0; i--) {
                if (colors[i][0] === color) {
                    return colors[i][1]
                }
            }
            return false
        }

        let found = search()
        if (found) {
            return found
        } else {

            for (var i = 0; i <= colors.length - 1; i++) {
                if (color.indexOf(colors[i][0]) > -1) {
                    return colors[i][1]
                }
            }

        }
    }
    return `<h5 class="selection__name selection__padding">
	<span class="selection__action">Select Color</span>
	<span class="selection__name selection__name_current">
		<span class="characteristic__color " style="background-color:${getHex(this.selected_variant.general_specifications.model_color)};"></span>
		</span>
	</h5>
	<ul class="selection__list selection__list_up selection__list_hidden">
	${color_variants}
	</ul>`;

});


Handlebars.registerHelper('youtube_video_helper', function() {

    var video_id = this[0].id.videoId;
    return video_id;
});

Handlebars.registerHelper('youtube_video_title_helper', function() {

    var title = this[0].snippet.title;
    return title;
});



Handlebars.registerHelper('offers', function(retailer) {
    
    var offers = (retailer.offers)? retailer.offers : retailer.selected_variant.product_retailers[retailer.shortlisted_model_shortlisted_retailer_index].offers;
    text = ""
    

    if(offers.emi.emi_details === "N/A" && offers.exchange.exchange_offer_text === "N/A"){
        return "No offers";
    }

    if(offers.emi.emi_details !== "N/A"){
        text += "EMI: "+ offers.emi.emi_details + "<br>";
    }

    if(offers.exchange.exchange_offer_text !== "N/A"){
        text += "Exchange: "+ offers.exchange.exchange_offer_text;
    }
    

    return text;
});
    

Handlebars.registerHelper('delivery', function(retailer) {
    
    var delivery_details = (retailer.delivery_details)? retailer.delivery_details : retailer.selected_variant.product_retailers[retailer.shortlisted_model_shortlisted_retailer_index].delivery_details;
    text = ""
    

    if(delivery_details.delivery_time === "N/A" ){
        return "Unknown";
    }else{
        text += delivery_details.delivery_time ;
    }

    return text;
});

Handlebars.registerHelper("get_reactions", function(selected_variant, reaction){



if(selected_variant.reactions && selected_variant.reactions[reaction]){
    return selected_variant.reactions[reaction]
}else{

    return ""
}

})

Handlebars.registerHelper("create_rating_stars",function(rating){
 
var stars = ''
    if(rating>=1) stars += `<polygon id="Page-1" points="7.5 0 5.39325 4.97025 0 5.433 4.09125 8.97825 2.865 14.25 7.5 11.45475 12.13425 14.25 10.90875 8.97825 15 5.433 9.60675 4.97025"></polygon>`;
    if(rating>=2) stars += `<polygon id="Page-1-Copy" points="25.5 0 23.39325 4.97025 18 5.433 22.09125 8.97825 20.865 14.25 25.5 11.45475 30.13425 14.25 28.90875 8.97825 33 5.433 27.60675 4.97025"></polygon>`;
    if(rating>=3) stars += `<polygon id="Page-1-Copy-2" points="43.5 0 41.39325 4.97025 36 5.433 40.09125 8.97825 38.865 14.25 43.5 11.45475 48.13425 14.25 46.90875 8.97825 51 5.433 45.60675 4.97025"></polygon>`;
    if(rating>=4) stars += `<polygon id="Page-1-Copy-3" points="61.5 0 59.39325 4.97025 54 5.433 58.09125 8.97825 56.865 14.25 61.5 11.45475 66.13425 14.25 64.90875 8.97825 69 5.433 63.60675 4.97025"></polygon>`;
    if(rating>=5) stars += `<polygon id="Page-1-Copy-4" points="79.5 0 77.39325 4.97025 72 5.433 76.09125 8.97825 74.865 14.25 79.5 11.45475 84.13425 14.25 82.90875 8.97825 87 5.433 81.60675 4.97025"></polygon>`;
return stars
})
// >>>>>>>>>>> for debugging 
Handlebars.registerHelper("debug", function(optionalValue) {

    

    if (optionalValue) {
    
    }
});