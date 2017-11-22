function Buffon (text) {

    console.log("Zlatan is on the pitch");

    //Query status
    this.displayText = text;

    responsiveVoice.setDefaultVoice("US English Female", {rate: 0.5});
    responsiveVoice.speak(text);

}