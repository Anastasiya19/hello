function tag_related_question(zlatan){

	console.log("We need to create a reply for tag_related_question");

	//First we need to check the query_status to determine
	//which chat element to build
	console.log("This is the list of mobiles received from the backend: ", zlatan.mobiles);

	zlatan.mobiles.forEach(create_tag_reply);

	function create_tag_reply(element, index, array){
	
		console.log("Inside create_tag_reply");

	}



	//Now we need to append the html for all the mobiles created by raul constructor function

}
