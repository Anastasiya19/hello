//Function to create the request and get the reply
function send_auto_complete_request(input_query) {



    var input_query = input_query;

    console.log("This is the search query: ", input_query);

    var start = new Date();

    //Get reply back from the API
    //Send the POST request
    $.post("/hellovincisearch", {
        input_query: input_query
    }, function(reply_received) {

        $(".helpers").empty();

        console.log("This is the reply_received for search send_auto_complete_request: ", reply_received);

        if(reply_received.results.length > 0){

            var time = new Date() - start;

            console.log("Time taken in processing the request on the backend: ", time);

            var template = $('#handlebars-auto-complete-reply').html();

            var templateScript = Handlebars.compile(template);

            var context = {
                results: reply_received.results
            }

            var html = templateScript(context);

            // Insert the HTML code into the page
            $('.helpers').append(html);

            $('.helpers').show();

        }

        

    });

} // function askapiai ends