function tag_related_question(zlatan){

	console.log("We need to create a reply for tag_related_question");

	//First we need to check the query_status to determine
	//which chat element to build
	console.log("This is the list of mobiles received from the backend: ", zlatan.mobiles);

	zlatan.mobiles.forEach(create_tag_reply);

	function create_tag_reply(element, index, array){
	
		console.log("Inside create_tag_reply");

        var tags_general = ["latest"];

        var tags_functionality = ["dual sim", "fingerprint sensor", "wireless charging", "4g", "gorilla glass", "bezel", "gaming", "waterproof"];

        var tags_general_true = [];

        var tags_general_false = [];

        var tags_functionality_true = [];

        var tags_functionality_false = [];

        element.tags_requested.forEach(check_tag_general);

        element.tags_requested.forEach(check_tag_functionality);

        function check_tag_general(tag, tag_count, tag_array){

            if(tags_general.indexOf(tag) > -1){

                console.log(tag + " value is : " + element.variants[0].product_tags[tag]);

                if(element.variants[0].product_tags[tag]){
                    tags_general_true.push(tag);
                }

                else{
                    tags_general_false.push(tag);
                }

                    
            }
        }

        function check_tag_functionality(tag, tag_count, tag_array){

            if(tags_functionality.indexOf(tag) > -1){

                console.log(tag + " value is : " + element.variants[0].product_tags[tag]);

                if(element.variants[0].product_tags[tag]){
                    tags_functionality_true.push(tag);
                }

                else{
                    tags_functionality_false.push(tag);
                }

                    
            }
        }



        console.log("These are the general true tags: ", tags_general_true);

        console.log("These are the general false tags: ", tags_general_false);

        console.log("These are the functionality true tags: ", tags_functionality_true);

        console.log("These are the functionality false tags: ", tags_functionality_false);




        create_tag_true_sentence(tags_true);

        function create_tag_true_sentence(tags_true){


        }


	}



	//Now we need to append the html for all the mobiles created by raul constructor function

}
