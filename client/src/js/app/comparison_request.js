function comparison_request(zlatan, query_status){

	console.log("We need to create a comparison_request element");

	//First we need to check the query_status to determine
	//which chat element to build
	console.log("This is the list of mobiles received from the backend: ", zlatan.mobiles);

	var giggs = new Giggs(zlatan.mobiles);

	if(query_status === 200 || query_status === 201){
		//get the cheapest variant of the phone
		giggs.get_cheapest_variant();	

		//get the price comparison of the phones	
		giggs.get_price_comparison("Prices");
	}

	if(query_status === 202){
		giggs.get_selected_variant();
	}
	

	//get the images of all the phones
	giggs.get_images();

	//get the names of all the phones
	giggs.get_names();

	//get the number of mobiles for colspan
	giggs.get_number_of_mobiles();




	if(query_status === 200){

		giggs.camera_element();
		giggs.battery_element();
		giggs.sim_element();
		giggs.display_element();
		giggs.os_element();
		giggs.ram_element();
		giggs.connectivity_element();
		giggs.sensors_element();
		giggs.warranty_element();
		giggs.dimensions_element();

	}

	if(query_status === 201 || query_status === 202){

		zlatan.mobiles[0].attribute_requested.forEach(find_attribute);

		function find_attribute(element, index, array){

			console.log("Attribute requested is: ", element);

			if(element === 'camera'){

				giggs.camera_element();

			}

			if(element === 'battery'){

				giggs.battery_element();

			}

			if(element === 'sim card'){

				giggs.sim_element();

			}

			if(element === 'display'){

				giggs.display_element();

			}

			if(element === 'operating system'){

				giggs.os_element();

			}

			if(element === 'processor'){

				giggs.processor_element();

			}

			if(element === 'RAM'){

				giggs.ram_element();

			}

			if(element === 'connectivity'){

				giggs.connectivity_element();
			}

			if(element === 'bluetooth'){

				giggs.bluetooth_element();

			}

			if(element === 'nfc'){

				giggs.nfc_element();

			}

			if(element === 'jack'){

				giggs.jack_element();

			}

			if(element === 'sensors'){

				giggs.sensors_element();
			}

			if(element === 'warranty'){

				giggs.warranty_element();

			}

			if(element === 'dimensions'){

				giggs.dimensions_element();
			}

		}
	}

	zlatan.comparison_context = {
		images: giggs.images,
		model_names: giggs.names,
		comparison_attributes: giggs.comparison_context,
		colspan: giggs.mobiles_count + 1
	}






	//First giggs should fetch the selected variants of mobiles in an array

	//Then we fetch images from those selected variants in an array

	//Then we fetch the values of attributes from those selected variants in an array




	//Now we need to append the html for all the mobiles created by raul constructor function

}
