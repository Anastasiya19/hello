function tag_related_question(zlatan, buffon){

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

        var tags_general_reply;

        var tags_functionality_reply_true;

        var tags_functionality_reply_false;


        create_tag_general_sentence(tags_general_true, tags_general_false, buffon);
        create_tag_functionality_sentence(tags_functionality_true, tags_functionality_false, buffon);

        function create_tag_general_sentence(tags_general_true, tags_general_false){
            
            if(tags_general_true.length > 0){

                tags_general_reply = "Yes " + element.variants[0].product_basic_info.normalized_name + " is the latest phone";

            }

            if(tags_general_false.length > 0){

                tags_general_reply = element.variants[0].product_basic_info.normalized_name + " is not the latest phone";
            }

        }

        function create_tag_functionality_sentence(tags_functionality_true, tags_functionality_false, buffon){

            if(tags_functionality_true.length > 0){

                tags_functionality_reply_true = "Yes " + element.variants[0].product_basic_info.normalized_name + " has " + arrayToSentence(tags_functionality_true);

            }

            if(tags_functionality_false.length > 0){

                tags_functionality_reply_false = "No " + element.variants[0].product_basic_info.normalized_name + " doesn't have " + arrayToSentence(tags_functionality_false);
            }

        }

        console.log("This is tags_general_reply: ", tags_general_reply);

        console.log("This is tags_functionality_reply_true: ", tags_functionality_reply_true);

        console.log("This is tags_functionality_reply_false: ", tags_functionality_reply_false);

        function add_to_display(reply_text, buffon){

            if(reply_text !== undefined){

                if(reply_text.length > 0){
                    buffon.displayText.push(reply_text);
                }

            }

            
        }

        add_to_display(tags_general_reply, buffon);
        add_to_display(tags_functionality_reply_true, buffon);
        add_to_display(tags_functionality_reply_false, buffon);


	}



	//Now we need to append the html for all the mobiles created by raul constructor function

}
