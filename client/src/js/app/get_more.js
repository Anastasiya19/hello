function get_more(event) {

    var more_button = $(event.target)

    var query = more_button.attr("data-query");

    var skip = Number(more_button.attr("data-skip"));
    console.log("query ",query)
    $.post("/get_more", { query: query, skip: skip }, function (mobiles) {

        console.log(mobiles)
        //This constructor is meant for the query_status
        //Beckham only does query routing and calls the necessary functions to create the request
        var beckham = new Beckham(300);

        //Zlatan takes cares of the response returned and calls respective functions to 
        //create the context objects
        var zlatan = new Zlatan(mobiles);

        //Builds the text reply element
        var buffon = new Buffon("Here is more");





        //Check the status of the request to decide which element to create
        beckham_router(beckham, zlatan, buffon);


        append_more_button(query,skip+1)
    })



}