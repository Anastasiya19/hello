function batman_missing(reply_received) {

    if (reply_received.batman === "true") {

        //userAvatar
        var vinciAvatar = '/assets/build/assets/images/vinci-mes.svg';

        console.log("Inside missing batman");

        var text_reply = reply_received.web_reply.speech;
        $('.chat__messages')
            .append(`<div class="message message_vinci">
            <img class="vinci-logo" src="${vinciAvatar}" alt="">
            <div class="message__item message__item_vinci br-chat">
              <p>There seems to be an issue at my end. Please try another query.</p>
            </div>
            <ul class="suggestion">
              <li class="suggestion__item br-chat">Show me iPhone 6s</li>
              <li class="suggestion__item  suggestion__item_active br-chat ">Tell me about iPhone 7 Battery</li>
            </ul>
          </div>`);

        $('.chat__messages').scrollTop($('.chat__messages')[0].scrollHeight);

    } //if ends

} //function batman_false ends