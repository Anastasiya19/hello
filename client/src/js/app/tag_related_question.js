function tag_related_question(zlatan){

	console.log("We need to create a reply for tag_related_question");

	//First we need to check the query_status to determine
	//which chat element to build
	console.log("This is the list of mobiles received from the backend: ", zlatan.mobiles);

	zlatan.mobiles.forEach(create_tag_reply);

	function create_tag_reply(element, index, array){
	
		console.log("Inside create_tag_reply");

        var tags_relevant = ["dual sim", "fingerprint sensor", "wireless charging", "flagship", "4g", "latest", "gorilla glass", "bezel", "gaming", "waterproof"];

        var tags_true = [];

        var tags_false = [];

        element.tags_requested.forEach(check_tag);

        function check_tag(tag, tag_count, tag_array){

            if(tags_relevant.indexOf(tag) > -1){

                console.log(tag + " value is : " + element.variants[0].product_tags[tag]);

                if(element.variants[0].product_tags[tag]){
                    tags_true.push(tag);
                }

                else{
                    tags_false.push(tag);
                }

                    
            }
        }

        console.log("These are the true tags: ", tags_true);

        console.log("These are the false tags: ", tags_false);

	}



	//Now we need to append the html for all the mobiles created by raul constructor function

}
