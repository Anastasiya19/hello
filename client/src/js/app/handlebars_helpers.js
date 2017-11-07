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

    if (this.product_pricing.special_price > 0) {

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
        ["Amazon", "vendor-amazon.png"],
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
        ["Amazon", "vendor-amazon.png"],
        ["paytm", "Paytm_logo.png"]
    ]

    for (var i = logos.length - 1; i >= 0; i--) {
        if (logos[i][0] == shortlisted_model_shortlisted_retailer) {
            return "/assets/build/assets/images/" + logos[i][1]
        }
    }

});


Handlebars.registerHelper('generate_memory_variants_helper', function() {

    console.log("This is the this object: ", this);

    // console.log("this is the memory_variants_array: ", memory_variants_array);

    console.log("This is this memory_variants_array: ", this.memory_variants_array);

    console.log("Inside generate_memory_variants_helper");

    var memory_variants = "";

    for (var i = 0; i < this.memory_variants_array.length; i++) {

        console.log("memory_storage is: ", this.memory_variants_array[i]);

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

    console.log("Inside generate_color_variants_helper");

    var color_variants = "";

    for (var i = 0; i < this.color_variants_array.length; i++) {

        console.log("color_variant is: ", this.color_variants_array[i]);

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
	<ul class="selection__list selection__list_hidden">
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



// >>>>>>>>>>> for debugging 
Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
});