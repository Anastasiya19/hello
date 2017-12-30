function tag_related_question(zlatan, buffon){

	
	//First we need to check the query_status to determine
	//which chat element to build
	

    for (var j = 0; j < zlatan.mobiles.length; j++){
    
        console.log("Inside create_tag_reply");

        var tags_general = ["latest"];

        var tags_functionality = ["light weight",
        "fingerprint sensor",
        "4g",
        "dual sim",  
        "wireless charging", 
        "waterproof", 
        "gaming",
        "bezel", 
        "gorilla glass",  
        "otg compatible", 
        "micro usb port", 
        "expandable storage", 
        "hybrid sim slot", 
        "portrait mode", 
        "dual camera", 
        "touchscreen"];

        var tags_general_true = [];

        var tags_general_false = [];

        var tags_functionality_true = [];

        var tags_functionality_false = [];

        zlatan.mobiles[j].tags_requested.forEach(check_tag_general);

        zlatan.mobiles[j].tags_requested.forEach(check_tag_functionality);

        function check_tag_general(tag, tag_count, tag_array){

            if(tags_general.indexOf(tag) > -1){

                console.log(tag + " value is : " + zlatan.mobiles[j].variants[0].product_tags[tag]);

                if(zlatan.mobiles[j].variants[0].product_tags[tag]){
                    tags_general_true.push(tag);
                }

                else{
                    tags_general_false.push(tag);
                }

                    
            }
        }

        function check_tag_functionality(tag, tag_count, tag_array){

            if(tags_functionality.indexOf(tag) > -1){

                console.log(tag + " value is : " + zlatan.mobiles[j].variants[0].product_tags[tag]);

                if(zlatan.mobiles[j].variants[0].product_tags[tag]){
                    tags_functionality_true.push(tag);
                }

                else{
                    tags_functionality_false.push(tag);
                }

                    
            }
        }





        var tags_general_reply;

        var tags_functionality_reply_true;

        var tags_functionality_reply_false;


        create_tag_general_sentence(tags_general_true, tags_general_false, buffon);
        create_tag_functionality_sentence(tags_functionality_true, tags_functionality_false, buffon);

        function create_tag_general_sentence(tags_general_true, tags_general_false){
            
            if(tags_general_true.length > 0){

                tags_general_reply = "Yes " + zlatan.mobiles[j].variants[0].product_basic_info.normalized_name + " is the latest phone";

            }

            if(tags_general_false.length > 0){

                tags_general_reply = zlatan.mobiles[j].variants[0].product_basic_info.normalized_name + " is not the latest phone";
            }

        }

        function create_tag_functionality_sentence(tags_functionality_true, tags_functionality_false, buffon){

            if(tags_functionality_true.length > 0){

                tags_functionality_reply_true = "Yes " + zlatan.mobiles[j].variants[0].product_basic_info.normalized_name + " has " + arrayToSentence(tags_functionality_true);

            }

            if(tags_functionality_false.length > 0){

                tags_functionality_reply_false = "No " + zlatan.mobiles[j].variants[0].product_basic_info.normalized_name + " doesn't have " + arrayToSentence(tags_functionality_false);
            }

        }



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
