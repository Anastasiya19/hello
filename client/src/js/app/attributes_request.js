function attributes_request(zlatan){

	

	//First we need to check the query_status to determine
	//which chat element to build
	

	zlatan.mobiles.forEach(create_attribute);

	function create_attribute(element, index, array){
	
		var messi = new Messi(element);

		messi.loop_attributes();

        //Now we have 2 context objects
        //1. context_detailed
        //2. context_summary
        if(messi.context_detailed.length > 0){
        	zlatan.contexts_attributes_detailed.push(messi.context_detailed);	
        }

        
        if(messi.context_summary.length > 0){
        	zlatan.contexts_attributes_summary.push(messi.context_summary);	
        }
        

        

	}

    
	//Now we need to append the html for all the mobiles created by raul constructor function

}


