//Function to create the request and get the reply
function hellovinciai(msg) {

    console.log("Script is loaded");


    //if the page is loaded for the first time or the user has cleared localStorage
    //create a new localStorage item with an empty arr to store a list of all phones discussed
    if (localStorage.getItem("all_discussed_list") === null) {
        var arr = [];
        localStorage.setItem("all_discussed_list", JSON.stringify(arr));
    }

    //if the page is loaded for the first time or the user has cleared localStorage
    //create a new localStorage item with an empty arr to store a list of all phones discussed
    if (localStorage.getItem("active_list") === null) {
        var arr = [];
        localStorage.setItem("active_list", JSON.stringify(arr));
    }

    //if the page is loaded for the first time or the user has cleared localStorage
    //create a new localStorage item with an empty object to store the context of the conversation
    if (localStorage.getItem("conversation_context") === null) {
        var empty_arr = [];
        var obj = {
            mobiles: empty_arr,
            brands: empty_arr,
            tags: empty_arr,
            attributes: empty_arr,
            all_mobiles: empty_arr,
            conversation_flag: 0,
            criteria_finalized_status: 0, 
            criteria_process_count: 0
        };

        localStorage.setItem("conversation_context", JSON.stringify(obj));
    }


    //all_discussed_list array keeps a log of all phones discussed by the user
    //It needs to be sent to the server
    //if all_discussed_list localStorage length is greater than zero, then
    //send the phones stored in localStorage,
    //else create an emply all_discussed_list array
    var all_discussed_list = [];
    if (JSON.parse(localStorage.getItem("all_discussed_list")) !== null) {

        all_discussed_list = JSON.parse(localStorage.getItem("all_discussed_list")).length > 0 ? JSON.parse(localStorage.getItem("all_discussed_list")) : [];
    }

    //active_list array keeps a log of the phones discussed by the user
    //in the previous query. It needs to be sent to the server
    //if active_list localStorage length is greater than zero, then
    //send the phones stored in localStorage active_list array,
    //else send an empty array to active_phones
    var active_list = [];
    if (JSON.parse(localStorage.getItem("active_list")) !== null) {

        active_list = JSON.parse(localStorage.getItem("active_list")).length > 0 ? JSON.parse(localStorage.getItem("active_list")) : [];
    }

    var conversation_context = {};

    if (JSON.parse(localStorage.getItem("conversation_context")) !== null) {

        conversation_context = JSON.parse(localStorage.getItem("conversation_context"));
    }

    console.log("This is conversation_context which is going to backend :", conversation_context);


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
        active_list: active_list,
        conversation_context: conversation_context
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

        }

        if (reply_received.batman === "true" && reply_received.status.code === 206) {

            batman_missing(reply_received);

        }

        if (reply_received.batman === "false") {
            batman_false(reply_received);
        }

    });

} // function askapiai ends