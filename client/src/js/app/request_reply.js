//Function to create the request and get the reply
function hellovinciai(msg) {

    if(msg !== null || msg !== undefined){

            setTimeout(function() {
        $('.chat__messages').
        append(`<div class="message message_vinci is--typing">
            <!--<img class="vinci-logo" src="assets/build/assets/images/vinci-mes.svg" alt="">-->
            <div class="message__item message__item_vinci message__item_writing br-chat">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                <!--<img src="assets/images/vinci_writing_dots.svg" alt="">-->
            </div>
        </div>`);

      //for native scroll(mobile only)
      var bottomMobile = $('.chat__content')[0].scrollHeight;
      var lastMessageMobile = $('.message_sender').last()[0].offsetTop - 20;
      $('.chat__content').scrollTop(Math.min(bottomMobile,lastMessageMobile));

      //for mCustomScrollbar
      var bottom =  $(".chat__content>.mCSB_vertical>.mCSB_container").height() - $('.chat__content>.mCSB_vertical').height();
      var lastMessage = $('.message_sender').last()[0].offsetTop - 20;
      $(".chat__content>.mCSB_vertical>.mCSB_container").css({'top': - Math.min(bottom,lastMessage)})
      $('.chat__content>.mCSB_vertical>.mCSB_scrollTools_vertical .mCSB_dragger').css({top:'unset',bottom:'0px'})

    }, 200);



    //Get reply back from the API
    //Send the POST request
    $.post("/hellovinciai", {
        api_request_text: msg
    }, function(reply_received) {

        var start = new Date();



        //Remove the is--typing element
        $('.is--typing').
        remove();



        //There are 3 reply cases
        //1. Batman true and API status code 200 (means some phone related element)
        //2. Batman true and API status code 206 (means error)
        //3. Batman false

        //check for batman and a positive status code
        //reply status code 200 means success
        if (reply_received.batman === "true" && reply_received.status.code === 200) {

            //This constructor is meant for the query_status
            //Beckham only does query routing and calls the necessary functions to create the request
            var beckham = new Beckham(reply_received.web_reply.data.query_status);

            //Zlatan takes cares of the response returned and calls respective functions to 
            //create the context objects
            var zlatan = new Zlatan(reply_received.web_reply.data);

            //Builds the text reply element
            var buffon = new Buffon(reply_received.web_reply.data.backend_text);



            

            //Check the status of the request to decide which element to create
            beckham_router(beckham, zlatan, buffon);

            if(reply_received.web_reply.data.suggested_questions !== undefined){

                //Neymar builds the suggested_questions
                var neymar = new Neymar(reply_received.web_reply.data.suggested_questions);
                
                neymar.check_questions();    
            }

            if(reply_received.web_reply.data.query_status === 300){
                append_more_button(reply_received.web_reply.data.query_object)
            }

   
        }

        if (reply_received.batman === "true" && reply_received.status.code === 206) {

            batman_missing(reply_received);

        }

        if (reply_received.batman === "false") {
            batman_false(reply_received);
        }

      //for native scroll(mobile only)
      $('.chat__content').scrollTop($('.chat__content')[0].scrollHeight);

      //for mCustomScrollbar
      $("#mCSB_1_container").css({'top': $('#mCSB_1').height() - $("#mCSB_1_container").height()})
      $('#mCSB_1_dragger_vertical').css({top:'unset',bottom:'0px'})

    });

    }

    


} // function askapiai ends