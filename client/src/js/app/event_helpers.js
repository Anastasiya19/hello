//This function helps capture the click on the memmory variant
function fetch_variant(event) {
    console.log("Inside fetch_variant");
    console.log("This is the event object: ", event);
    console.log("This is the new size selected: ", event.firstElementChild.innerText);

    //variable to store the id of the element
    var element_id;

    //clicked element
    var clicked_element = ($(event).parents('.message__item_view-full'));
    
    console.log(clicked_element[0].id);

    element_id = clicked_element[0].id;

    console.log("This is mobiles_requested: ", mobiles_requested);

    //Count of the mobile amongst mobiles_requested
    var mobile_count;


    mobiles_requested.forEach(find_selected_mobile);

    function find_selected_mobile(mobile, index, array) {

        console.log("This clicked_element id: ", element_id);
        console.log("Inside find_selected_id: ", mobile);

        if (parseInt(mobile.id) === parseInt(element_id)) {

            console.log("Elements matched:");

            mobile_count = index;

        }


    }

    console.log("This is the matching mobile: ", mobile_count);

    //Found the zlatan object for the requested mobile
    var raul = mobiles_requested[mobile_count].raul;

    console.log("This is the raul object: ", raul);

    raul.size_selector = event.firstElementChild.innerText;

    raul.load_status = 1;

    reload_product(raul);

    console.log("This is the zlatan object again: ", mobiles_requested[mobile_count].zlatan);

}


//This function helps capture the click on the memmory variant
function fetch_variant_by_color(event) {
    console.log("Inside fetch_variant_by_color");
    console.log("This is the event object: ", event);
    console.log("This is the new color selected: ", event.getElementsByClassName('color')[0].innerText);

    //variable to store the id of the element
    var element_id;

    //clicked element
    var clicked_element = ($(event).parents('.message__item_view-full'));
    
    console.log(clicked_element[0].id);

    element_id = clicked_element[0].id;

    console.log("This is mobiles_requested: ", mobiles_requested);

    //Count of the mobile amongst mobiles_requested
    var mobile_count;


    mobiles_requested.forEach(find_selected_mobile);

    function find_selected_mobile(mobile, index, array) {

        console.log("This clicked_element id: ", element_id);
        console.log("Inside find_selected_id: ", mobile);

        if (parseInt(mobile.id) === parseInt(element_id)) {

            console.log("Elements matched:");

            mobile_count = index;

        }


    }

    console.log("This is the matching mobile: ", mobile_count);

    //Found the zlatan object for the requested mobile
    var raul = mobiles_requested[mobile_count].raul;

    console.log("This is the raul object: ", raul);

    raul.color_selector = event.getElementsByClassName('color')[0].innerText;

    raul.load_status = 2;

    reload_product(raul);

    console.log("This is the zlatan object again: ", mobiles_requested[mobile_count].zlatan);

}



function suggestions_click(event) {

    var text = event.target.innerText;
    console.log("This is the text clicked on suggestions_click: ", text);

    var input_field = document.getElementsByClassName('chatbot--input');

    input_field[0].children[0].children[0].value = text;

    input_field[0].children[0].lastElementChild.click();

}


function start_speech() {

    //Fetch the mic icon button
    //var icon_parent = document.getElementById('speech_overlay_button');

    //Make the class icon-transform to keep the icon color blue
    //icon_parent.firstElementChild.className = "icon ion-mic-a icon-transform";

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

        //Fetch the overlay and display as block
        var speech_overlay = document.getElementById('speech_overlay');
        speech_overlay.style.display = "block";

        speech_overlay.getElementsByClassName('speaking__status')[0].className = "speaking__status speaking__status_ready";

        //Fetch the text
        //var text = document.getElementById('speech_overlay_text');
        //text.innerText = "Speak to Vinci";

        //Make the body overflow hidden
        //document.body.style.overflow = "hidden";

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        // recognition.lang = "hi-IN";
        // recognition.lang = "en-US";
        recognition.start();

        var speech_flag = 0;

        recognition.onspeechstart = function() {

            var speech_overlay = document.getElementById('speech_overlay');

            //Fetch the speech overlay text
            var text = document.getElementById('speech_overlay_text');

            speech_overlay.getElementsByClassName('speaking__status')[0].className = "speaking__status speaking__status_analyzing";

            // $('.speech-transform').toggleClass('speech-transform-active');

            //icon_parent.firstElementChild.className = "icon ion-mic-a icon-transform-active";

            text.firstElementChild.innerText = "I am listening...";
            text.firstElementChild.nextElementSibling.innerText = "Go on :)";

            speech_flag = 1;

        }

        recognition.onspeechend = function() {

            var speech_overlay = document.getElementById('speech_overlay');

            //Fetch the speech overlay text
            var text = document.getElementById('speech_overlay_text');

            // $('.speech-transform-active').toggleClass('speech-transform');

            speech_overlay.getElementsByClassName('speaking__status')[0].className = "speaking__status speaking__status_analyzing";

            if (speech_flag === 0) {

                text.firstElementChild.innerText = "Please speak";

            } else {

                text.firstElementChild.innerText = "Ok! Got your command";
                text.firstElementChild.nextElementSibling.innerText = "analyzing your speech";
            }



        }


        // recognition.onsoundend = function(){

        // 	$('.speech-transform-active').toggleClass('speech-transform');

        // 	$('.icon-transform-active').toggleClass('icon-transform');
        // }

        recognition.onresult = function(e) {

            setTimeout(function() {

                console.log("This is the event object: ", e);

                var speech_overlay = document.getElementById('speech_overlay');

                speech_overlay.style.display = "none";

                var text = document.getElementById('speech_overlay_text');

                text.firstElementChild.innerText = "I am ready!";
                text.firstElementChild.nextElementSibling.innerText = "Please speak :)";



                // document.body.style.overflow = "scroll";

            }, 30);

            setTimeout(function() {


                var input_field = document.getElementsByClassName('send__input');

                input_field[0].value = e.results[0][0].transcript;

                //document.getElementById('transcript').value= e.results[0][0].transcript;
                recognition.stop();

            }, 60);


            setTimeout(function() {

                var send_btn = document.getElementById('send_chat');
                console.log("Before click");
                send_btn.click();
                console.log("After click");
            }, 90);


            //document.getElementById('labnol').submit();
        };

        recognition.onerror = function(e) {
            recognition.stop();
            var speech_overlay = document.getElementById('speech_overlay');
            speech_overlay.style.display = "none";

        }

    }


}

function close_speech_modal() {

    var speech_overlay = document.getElementById('speech_overlay');
    speech_overlay.style.display = "none";

    document.body.style.overflow = "scroll";

    var recognition = new webkitSpeechRecognition();

    recognition.stop();

}

//Deprecated
function demo_yes(){

    console.log("Demo yes clicked");

    var tts = "Perfect...";
    speak_message(tts);

    tts = "Let's get started";
    speak_message(tts);

    begin_demo();

}

//Deprecated
function demo_no(){

    console.log("Demo no clicked");

    var tts = "Ok..that's fine. May be next time.";
    speak_message(tts);

    tts = "I am ready to help you find your favorite mobile. Go ahead!";
    speak_message(tts);

}

function speak_message(tts){

    responsiveVoice.setDefaultVoice("US English Female", {rate: 0.5});
    responsiveVoice.speak(tts);

}

//Deprecated
function begin_demo(){

    console.log("This function is Deprecated");
}

function send_question(event){

    console.log("This is event target: ", event.target);
    console.log("This is event target innerText: ", event.target.innerText);

    var input_field = document.getElementsByClassName('send__input');
    input_field[0].value = event.target.innerText;
       
    var send_btn = document.getElementById('send_chat');
    send_btn.click();

}


