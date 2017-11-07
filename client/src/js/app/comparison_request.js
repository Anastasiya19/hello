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




	if(query_status === 200){

		//get the contexts of the mobiles
		giggs.create_context("Screen size", "display_specifications", "display_size");
		giggs.create_context("Sim size", "sim_features", "sim_size");
		giggs.create_context("Primary camera", "camera", "primary_camera_pixels");
		giggs.create_context("Selfie camera", "camera", "secondary_camera_pixels");
		giggs.create_context("Battery capacity", "battery_power", "battery_capacity");
		giggs.create_context("Operating system", "os_processor", "operating_system");
		giggs.create_context("Processor speed", "os_processor", "processor_speed");
		giggs.create_context("RAM", "memory_storage", "ram");
		giggs.create_context("Supported networks", "connectivity", "supported_networks");
		giggs.create_context("Weight", "dimensions", "weight");
	}

	if(query_status === 201 || query_status === 202){

		zlatan.mobiles[0].attribute_requested.forEach(find_attribute);

		function find_attribute(element, index, array){

		console.log("Attribute requested is: ", element);

		if(element === 'camera'){

			giggs.create_context("Primary camera", "camera", "primary_camera_pixels");
			giggs.create_context("Selfie camera", "camera", "secondary_camera_pixels");
			giggs.create_context("Video recording", "camera", "video_recording_status");
			giggs.create_context("Video recording resolution", "camera", "video_recording_resolution");
			giggs.create_context("HD Recording", "camera", "hd_recording_status");
			giggs.create_context("Full HD Recording", "camera", "full_hd_recording_status");
			giggs.create_context("Flash", "camera", "flash");

		}

		if(element === 'battery'){

			giggs.create_context("Battery capacity", "battery_power", "battery_capacity");
			giggs.create_context("Battery type", "battery_power", "battery_type");
			giggs.create_context("Removable battery status", "battery_power", "removable_battery_status");

		}

		if(element === 'sim card'){

			giggs.create_context("Sim type", "sim_features", "sim_type");
			giggs.create_context("Sim size", "sim_features", "sim_size");
			giggs.create_context("Hybrid Sim status", "sim_features", "hybrid_sim_slot_status");

		}

		if(element === 'display'){

			giggs.create_context("Screen size", "display_specifications", "display_size");
			giggs.create_context("Display type", "display_specifications", "display_type");
			giggs.create_context("Display colors", "display_specifications", "display_colors");
			giggs.create_context("Resolution", "display_specifications", "resolution");
			giggs.create_context("Resolution type", "display_specifications", "resolution_type");

		}

		if(element === 'operating system'){

			giggs.create_context("Operating system", "os_processor", "operating_system");
			giggs.create_context("Processor speed", "os_processor", "processor_speed");
			giggs.create_context("Processor core", "os_processor", "processor_core");
			giggs.create_context("Processor type", "os_processor", "processor_type");

		}

		if(element === 'processor'){

			giggs.create_context("Processor speed", "os_processor", "processor_speed");
			giggs.create_context("Processor core", "os_processor", "processor_core");
			giggs.create_context("Processor type", "os_processor", "processor_type");

		}

		if(element === 'RAM'){

			giggs.create_context("RAM", "memory_storage", "ram");

		}

		if(element === 'connectivity'){

			giggs.create_context("Supported networks", "connectivity", "supported_networks");
			giggs.create_context("Wifi", "connectivity", "wifi");
			giggs.create_context("Bluetooth", "connectivity", "bluetooth_support");
			giggs.create_context("Bluetooth version", "connectivity", "bluetooth_version");
			giggs.create_context("USB connectivity", "connectivity", "usb_connectivity");
			giggs.create_context("Audio jack", "connectivity", "audio_jack_width");
			giggs.create_context("Near Field Communication (NFC)", "connectivity", "nfc");

		}

		if(element === 'bluetooth'){

			giggs.create_context("Bluetooth", "connectivity", "bluetooth_support");
			giggs.create_context("Bluetooth version", "connectivity", "bluetooth_version");

		}

		if(element === 'nfc'){

			giggs.create_context("Near Field Communication (NFC)", "connectivity", "nfc");

		}

		if(element === 'jack'){

			giggs.create_context("Audio jack", "connectivity", "audio_jack_width");

		}

		if(element === 'sensors'){

			giggs.create_context("Sensors", "sensors");

		}

		if(element === 'warranty'){

			giggs.create_context("Warranty", "warranty");

		}

		if(element === 'dimensions'){

			giggs.create_context("Weight", "dimensions", "weight");
			giggs.create_context("Width", "dimensions", "width");
			giggs.create_context("Height", "dimensions", "height");
			giggs.create_context("Depth", "dimensions", "depth");

		}

	}
	}

	zlatan.comparison_context = {
		images: giggs.images,
		model_names: giggs.names,
		comparison_attributes: giggs.comparison_context
	}






	//First giggs should fetch the selected variants of mobiles in an array

	//Then we fetch images from those selected variants in an array

	//Then we fetch the values of attributes from those selected variants in an array




	//Now we need to append the html for all the mobiles created by raul constructor function

}
