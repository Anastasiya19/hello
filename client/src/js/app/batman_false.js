function batman_false(reply_received) {

    if (reply_received.batman === "false") {


        console.log("Inside false batman");

        var text_reply = reply_received.web_reply.speech;
        $('.chat__messages')
            .append(`<div class="message message_vinci">
              <div class="message__item message__item_vinci br-chat">
                <p>${reply_received.web_reply.speech}</p>
              </div>
            </div>
            <div class="message message_vinci">
              <div>
                <ul class="suggestion owl-carousel owl-theme">
                  <li class="suggestion__item br-chat" onclick="send_question(event)">iPhone 8</li>
                  <li class="suggestion__item br-chat" onclick="send_question(event)">Best phones under 15000</li>
                  <li class="suggestion__item br-chat" onclick="send_question(event)">Best phones under 25000</li>
                  <li class="suggestion__item br-chat" onclick="send_question(event)">Best camera phones</li>
                  <li class="suggestion__item br-chat" onclick="send_question(event)">Light weight phones</li>
                </ul>
              </div>
            </div>
          </div>`);

        $('.chat__messages').scrollTop($('.chat__messages')[0].scrollHeight);

        responsiveVoice.setDefaultVoice("US English Female", {rate: 0.5});
        responsiveVoice.speak(reply_received.web_reply.speech);

    } //if ends

} //function batman_false ends