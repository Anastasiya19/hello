//This function helps capture the click on the memmory variant
function fetch_variant(event) {
   

    //variable to store the id of the element
    var element_id;

    //clicked element
    var clicked_element = ($(event).parents('.message__item_view-full'));

    

    element_id = clicked_element[0].id;

    

    //Count of the mobile amongst mobiles_requested
    var mobile_count;

    //Loop through mobiles_requested array to find the clicked mobile
    mobiles_requested.forEach(find_selected_mobile);

    function find_selected_mobile(mobile, index, array) {

        

        if (parseInt(mobile.id) === parseInt(element_id)) {

        

            mobile_count = index;

        }


    }

    

    //Found the zlatan object for the requested mobile
    var raul = mobiles_requested[mobile_count].raul;

    

    raul.size_selector = event.firstElementChild.innerText;

    raul.load_status = 1;

    reload_product(raul);

    

}


//This function helps capture the click on the memmory variant
function fetch_variant_by_color(event) {
    

    //variable to store the id of the element
    var element_id;

    //clicked element
    var clicked_element = ($(event).parents('.message__item_view-full'));

    

    element_id = clicked_element[0].id;

    

    //Count of the mobile amongst mobiles_requested
    var mobile_count;


    mobiles_requested.forEach(find_selected_mobile);

    function find_selected_mobile(mobile, index, array) {

        

        if (parseInt(mobile.id) === parseInt(element_id)) {

        

            mobile_count = index;

        }


    }


    //Found the zlatan object for the requested mobile
    var raul = mobiles_requested[mobile_count].raul;


    raul.color_selector = event.getElementsByClassName('color')[0].innerText;

    if (raul.size_selector === undefined || raul.size_selector === null) {
        raul.size_selector = raul.selected_variant.memory_storage.internal_storage;
    }


    raul.load_status = 2;

    reload_product(raul);


}



function suggestions_click(event) {

    var text = event.target.innerText;
 

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

        recognition.onspeechstart = function () {

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

        recognition.onspeechend = function () {

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

        recognition.onresult = function (e) {

            setTimeout(function () {


                var speech_overlay = document.getElementById('speech_overlay');

                speech_overlay.style.display = "none";

                var text = document.getElementById('speech_overlay_text');

                text.firstElementChild.innerText = "I am ready!";
                text.firstElementChild.nextElementSibling.innerText = "Please speak :)";



                // document.body.style.overflow = "scroll";

            }, 30);

            setTimeout(function () {


                var input_field = document.getElementsByClassName('send__input');

                input_field[0].value = e.results[0][0].transcript;

                //document.getElementById('transcript').value= e.results[0][0].transcript;
                recognition.stop();

            }, 60);


            setTimeout(function () {

                var send_btn = document.getElementById('send_chat');
                send_btn.click();

            }, 90);


            //document.getElementById('labnol').submit();
        };

        recognition.onerror = function (e) {
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
function demo_yes() {


    var tts = "Perfect...";
    speak_message(tts);

    tts = "Let's get started";
    speak_message(tts);

    begin_demo();

}

//Deprecated
function demo_no() {


    var tts = "Ok..that's fine. May be next time.";
    speak_message(tts);

    tts = "I am ready to help you find your favorite mobile. Go ahead!";
    speak_message(tts);

}

function speak_message(tts) {

    responsiveVoice.setDefaultVoice("US English Female", { rate: 0.5 });
    responsiveVoice.speak(tts);

}

//Deprecated
function begin_demo() {

   
}

function send_question(event) {

    
    if(event.target.innerText !== "undefined" || event.target.innerText !== "null"){

        var input_field = document.getElementsByClassName('send__input');
        input_field[0].value = event.target.innerText;

        var send_btn = document.getElementById('send_chat');
        send_btn.click();    
    }

}

function get_specifications_full(event) {

   

    if(event.target !== "undefined" || event.target !== "null"){

        var phone_name = event.target.nextElementSibling.getElementsByClassName('category__name')[0].innerText;

        var pos = phone_name.indexOf("(");

        if(pos > -1){

            phone_name = phone_name.slice(0,pos);
        }

        if(phone_name !== "undefined" || phone_name !== "N/A" || phone_name !== "null"){

            var input_field = document.getElementsByClassName('send__input');
            input_field[0].value = phone_name;

            var send_btn = document.getElementById('send_chat');
            send_btn.click(); 

        }
    }

}




function capture_value_and_hide(event) {

  
    var input_field = document.getElementsByClassName('send__input');
    input_field[0].value = event.target.innerText;

    $('.helpers').hide(200);


}



function react(event, reaction, normalized_name) {
   
    var reactions = JSON.parse(localStorage.getItem("reactions") || "[]")
    
    // if the user didn't react to this phone before
    if (!get_reaction(normalized_name)) {
        save_reaction(reaction, normalized_name);
        $.post("/product/update_reactions", { reaction: reaction, normalized_name: normalized_name, increment: true }, function (res) {


            $(event.target).parent().next().html(parseFloat($(event.target).parent().next().html()) + 1 || 1)
        })
    }

    // if the user have reacted to this phone before
    if (get_reaction(normalized_name).reactions) {

        // if the previous reaction was the same 
        if (check_reaction(get_reaction(normalized_name),reaction)) {
            // do nothing
            return;

        }
        // if the user is reaction a new reaction
        else {


            // var previous_reaction = get_reaction(normalized_name).reaction
            // // decrement the previous reaction
            // $.post("/product/update_reactions", { reaction: previous_reaction, normalized_name: normalized_name, increment: false }, function (res) {
            //     console.log("response of decrement", res)
            //     // decrement the previous reaction
            //     var previous_reaction_span = $(event.target).parent().parent().siblings("." + previous_reaction + "_reaction").find("span")
            //     previous_reaction_span.html(parseFloat(previous_reaction_span.html()) - 1)

            // })

            

            // adding the new reaction
            $.post("/product/update_reactions", { reaction: reaction, normalized_name: normalized_name, increment: true }, function (res) {
               
                    $(event.target).parent().next().html(parseFloat($(event.target).parent().next().html()) + 1 || 1)
             
            })


           add_reaction(get_reaction(normalized_name), reaction) 
            localStorage.setItem("reactions", JSON.stringify(reactions));

            return
        }
    }


    function get_reaction(normalized_name) {
        if (!localStorage.getItem("reactions")) return false;

        for (var i = 0; i < reactions.length; i++) {
            if (reactions[i].normalized_name === normalized_name) {
                return reactions[i]
            }
        }


        return false

    }

    function save_reaction(reaction, normalized_name) {
        reactions.push({
            reactions: [reaction],
            normalized_name: normalized_name
        })

        localStorage.setItem("reactions", JSON.stringify(reactions));
    }

    function add_reaction(phone, reaction){
        phone.reactions.push(reaction)
    }

    function check_reaction(phone, reaction){
        for(var i=0; i<phone.reactions.length; i++){
            if(phone.reactions[i] === reaction){
                return true 
                break;
            }
        }
        return false
    }

}