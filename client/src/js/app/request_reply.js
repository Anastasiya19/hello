//Function to create the request and get the reply
function hellovinciai(msg) {

    console.log("Script is loaded");


    //if the page is loaded for the first time or the user has cleared localStorage
    //create a new localStorage item with an empty arr to store the recent context of the conversation
    if (localStorage.getItem("all_discussed_list") === null || localStorage.getItem("all_discussed_list") === "undefined") {
        var empty_arr = [];
        var obj = {
            mobiles: empty_arr,
            brands: empty_arr,
            tags: empty_arr,
            attributes: empty_arr,
            intentId: empty_arr
        }
        localStorage.setItem("all_discussed_list", JSON.stringify(obj));
    }

    //if the page is loaded for the first time or the user has cleared localStorage
    //create a new localStorage item with an empty arr to store the latest context of the conversation
    if (localStorage.getItem("active_list") === null) {
        var empty_arr = [];
        var obj = {
            attributes : empty_arr,
            attributes_composite_entity : empty_arr,
            battery_value : empty_arr,
            brands : empty_arr,
            camera_pixels : empty_arr,
            colors : empty_arr,
            comparator : empty_arr,
            formal_price : empty_arr,
            mobiles : empty_arr,
            operating_system : empty_arr,
            price_comment : empty_arr,
            processor_core : empty_arr,
            processor_speed : empty_arr,
            ram_capacity : empty_arr,
            retailers : empty_arr,
            screen_size : empty_arr,
            storage_capacity : empty_arr,
            suggestion_composite_entity : empty_arr,
            tags : empty_arr,
            intentId: empty_arr,
            criteria_finalized_status: 0, 
            criteria_process_count: 0
        };
        localStorage.setItem("active_list", JSON.stringify(obj));
    }

    //all_discussed_list array keeps a log of all phones discussed by the user
    //It needs to be sent to the server
    //if all_discussed_list localStorage length is greater than zero, then
    //send the phones stored in localStorage,
    //else create an emply all_discussed_list array
    var all_discussed_list = {};
    if (JSON.parse(localStorage.getItem("all_discussed_list")) !== null) {
        all_discussed_list = JSON.parse(localStorage.getItem("all_discussed_list"));
    }

    //active_list array keeps a log of the phones discussed by the user
    //in the previous query. It needs to be sent to the server
    //if active_list localStorage length is greater than zero, then
    //send the phones stored in localStorage active_list array,
    //else send an empty array to active_phones

    // var active_list = {};
    // if (JSON.parse(localStorage.getItem("active_list")) !== null) {

    //     active_list = JSON.parse(localStorage.getItem("active_list"));
    //     console.log("This is the parsed active_list on the frontend before sending to the server: ", active_list);
    // }

    var active_list = localStorage.getItem("active_list");

    setTimeout(function() {
        $('.chat__messages').
        append(`<div class="message message_vinci is--typing">
            <img class="vinci-logo" src="assets/build/assets/images/vinci-mes.svg" alt="">
            <div class="message__item message__item_vinci message__item_writing br-chat">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                <!--<img src="assets/images/vinci_writing_dots.svg" alt="">-->
            </div>
        </div>`);

        $('.chat__messages').scrollTop($('.chat__messages')[0].scrollHeight);
    }, 200);



    //Get reply back from the API
    //Send the POST request
    $.post("/hellovinciai", {
        api_request_text: msg,
        all_discussed_list: all_discussed_list,
        active_list: active_list
    }, function(reply_received) {

        var start = new Date();



        //Remove the is--typing element
        $('.is--typing').
        remove();

        console.log("This is the reply from the API", reply_received);

        console.log("This is batman: ", reply_received.batman);

        //There are 3 reply cases
        //1. Batman true and API status code 200 (means some phone related element)
        //2. Batman true and API status code 206 (means error)
        //3. Batman false

        //check for batman and a positive status code
        //reply status code 200 means success
        if (reply_received.batman === "true" && reply_received.status.code === 200) {

            //This constructor is meant for the query_status
            var beckham = new Beckham(reply_received.web_reply.data.query_status);

            var zlatan = new Zlatan(reply_received.web_reply.data.mobiles);

            var buffon = new Buffon(reply_received.web_reply.displayText);

            //Check the status of the request to decide which element to create
            beckham_router(beckham, zlatan, buffon);

            update_all_discussed_list(reply_received.web_reply.data.all_discussed_list);

            update_active_list(reply_received.web_reply.data.active_list);

        }

        if (reply_received.batman === "true" && reply_received.status.code === 206) {

            batman_missing(reply_received);

        }

        if (reply_received.batman === "false") {
            batman_false(reply_received);
        }

    });

} // function askapiai ends