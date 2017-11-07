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

            //Check the status of the request to decide which element to create
            beckham_router(beckham, zlatan);


            

            console.log(reply_received);

            // if ('speechSynthesis' in window) {

            //     console.log("Inside speechSynthesis true");
            //     var to_speak = new SpeechSynthesisUtterance('Here is what I found Ankur!');
            //     //var voices = window.SpeechSynthesis.getVoices();
            //     // console.log(window.SpeechSynthesis);
            //     // console.log("This is the speechSynthesis object: ", window.speechSynthesis);


            //     const awaitVoices = new Promise(done => speechSynthesis.onvoiceschanged = done);

            //     listVoices();

            //     function listVoices() {
            //         awaitVoices.then(() => {
            //             let voices = speechSynthesis.getVoices();
            //             console.log(voices);
            //             to_speak.voice = voices[71];
            //             window.speechSynthesis.speak(to_speak);

            //             // return voices[71];
            //         });
            //     }

            //     //listVoices();
            //     // console.log("This is voices: ", voices);


            //     //to_speak.voice = "Google हिन्दी";


            // } else {

            //     console.log("speechSynthesis false");
            // }

        }

        if (reply_received.batman === "true" && reply_received.status.code === 206) {

            batman_missing(reply_received);

        }

        if (reply_received.batman === "false") {
            batman_false(reply_received);
        }

    });

} // function askapiai ends