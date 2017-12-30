function Buffon (text) {

   

    //Query status
    this.displayText = text;

    if(text.length > 0){

    	text.forEach(speak_text);

    	function speak_text(element, index, array){

		    responsiveVoice.setDefaultVoice("US English Female", {rate: 0.5});
			responsiveVoice.speak(element);

    	}
    }



}