function batman_missing(reply_received) {

    if (reply_received.batman === "true") {


        console.log("Inside missing batman");

        var text_reply = reply_received.web_reply.speech;
        $('.chat__messages')
            .append(`<div class="message message_vinci">
              <div class="message__item message__item_vinci br-chat animated fadeInLeft">
                <p>${reply_received.web_reply.speech}</p>
              </div>
            </div>
          </div>`);

        $('.chat__messages').scrollTop($('.chat__messages')[0].scrollHeight);

    } //if ends

} //function batman_false ends