function Neymar (suggested_questions) {

    
    //Mobile
    this.suggested_questions = suggested_questions;
    
}

//Function to set the ID
Neymar.prototype.check_questions = function() {

    if(this.suggested_questions.length > 0){

        this.template = $('#handlebars-suggested-questions').html();

        // Compile the template data into a function
        this.templateScript = Handlebars.compile(this.template);

        this.html = this.templateScript({ suggested_questions: this.suggested_questions });

        // Insert the HTML code into the page
        $('.chat__messages').append(this.html);

        init_specifications($('.chat__messages').children().last())
        init_owl()
        //this.scroll_into_view()

    }
}



