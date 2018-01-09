
var skip_intro_status = false;
	document.addEventListener('DOMContentLoaded', function () {

		

		//Disable the send_btn
		var send_btn = document.getElementById('send_chat');
		send_btn.style.display = "none";

		//Disable the speech_btn
		var speech_btn = document.getElementsByClassName('send__btn_speak');
		speech_btn[0].style.display = "none";

  

		//Select the messages
		var messages = document.getElementsByClassName('message_vinci');

		var interval = 1000;

        if(!getCookie("skip_intro")){
		//Start the display message
		display_message(0, interval);

		}else{
			skip_intro()
		}




		function display_message(count, interval){

			setTimeout(function(){

				var interval = getRandomArbitrary(5500,6500);

				function getRandomArbitrary(min, max) {
					return Math.random() * (max - min) + min;
				}//getRandomArbitraryends


				if(count === 0){
					var skip_intro_btn = "<button class='btn send__btn' type='submit' id='stop_intro_btn'>Skip intro</button>";
					$("#send_chat").before(skip_intro_btn);

					var skip_intro_btn = document.getElementById('stop_intro_btn');

					skip_intro_btn.onclick = skip_intro;
				}


				if(count > 0){	
					//Remove the is--typing element
        			$('.is--typing').remove();
				}

				var speech_messages = ["Hello, I am Vinci, your personal assistant to shop mobiles online", "Looking for latest phones. Just say.. 'Show me latest phones'", "Latest phones", "Best battery phones", "Phones with wireless charging", "I can do price comparison, compare phone features, show you video reviews and also suggest you phones. Type your message in the input box for chat or press Talk to Vinci to talk to me."]

				//Get the messages
				// var messages = document.getElementsByClassName('message_vinci');

				//Speak the messages
				// if(count < 1){
				responsiveVoice.setDefaultVoice("US English Female", {rate: 0.5});
				responsiveVoice.speak(speech_messages[count]);	
				// }

				
				//Make them visible
				messages[count].style.display = "block";

				//Increase the count
				count+=1;

				//Call the message
		        if(count<messages.length){

		        	setTimeout(function(){

		        	
		        	if(!skip_intro_status){
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
				        </div>`)

				        var bottomMobile = $('.chat__content')[0].scrollHeight;
            			var lastMessageMobile = $('.message_vinci').last()[0].offsetTop - 20;
            			$('.chat__content').scrollTop(Math.min(bottomMobile,lastMessageMobile));

            			//for mCustomScrollbar
            			var bottom =  $(".chat__content>.mCSB_vertical>.mCSB_container").height() - $('.chat__content>.mCSB_vertical').height();
            			var lastMessage = $('.message_vinci').last()[0].offsetTop - 20;
            			$(".chat__content>.mCSB_vertical>.mCSB_container").css({'top': - Math.min(bottom,lastMessage)})
            			$('.chat__content>.mCSB_vertical>.mCSB_scrollTools_vertical .mCSB_dragger').css({top:'unset',bottom:'0px'})


		        	}


					}, 2500);

		        	if(!skip_intro_status){
		        		display_message(count, interval);	
		        	}else{
						// when if the user clicked skip intro
						setCookie("skip_intro","true",10)
					}
						
				}

				//Else remove is typing, we are done
				else{
					
					//Remove the is--typing element
        			$('.is--typing').remove();

        			//delete the skip intro button
					$("#stop_intro_btn").remove();

					//Enable the send_btn
					var send_btn = document.getElementById('send_chat');
					send_btn.style.display = "inline-block";
			
					//Enable the speech_btn
					var speech_btn = document.getElementsByClassName('send__btn_speak');
					speech_btn[0].style.display = "inline-block";

					// when the intro is done 
					setCookie("skip_intro","true",10)
				}

			}, interval);

		}





    }, false);
    

		function skip_intro(){

			setTimeout(function(){
				
				$('.is--typing').remove();

			}, 200)

			skip_intro_status = true;

			//delete the skip intro button
			$("#stop_intro_btn").remove();

			//Enable the send_btn
			var send_btn = document.getElementById('send_chat');
			send_btn.style.display = "inline-block";
			
			//Enable the speech_btn
			var speech_btn = document.getElementsByClassName('send__btn_speak');
			speech_btn[0].style.display = "inline-block";

			//load all messages
			//Select the messages
			var messages = document.getElementsByClassName('message_vinci');


			for(var i = 0; i< messages.length; i++){

				//Make them visible
				messages[i].style.display = "block";
				
				//Remove the is--typing element
        		$('.is--typing').remove();
			}

		}


		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+ d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}


		function getCookie(cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for(var i = 0; i <ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}