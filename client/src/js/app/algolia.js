var template = $("#handlebars-suggested-questions").html();
var templateScript = Handlebars.compile(template);

var client = algoliasearch("095XP0P7JR", "4460794d03d4d701d2803044ea1d0800");
var index = client.initIndex('suggested_questions');
$('.send__input').autocomplete({
    hint: false
}, [{
    source: function(q, cb) {
        index.search(q, {
            hitsPerPage: 5
        }, function(error, content) {
            if (error) {
                console.log("error with algolia ",error)
                cb([]);
                return;
            }
            console.log("content ", content)
                // cb(content.hits, content);
            reload_questions(content.hits)
        });
    },
    displayKey: 'question',
    templates: {
        suggestion: function(suggestion) {
            return suggestion.question;
        }
    }
}]);


function reload_questions(hits) {
    if (hits.length === 0) {
        return $('.helpers').hide();
    }
    console.log("algolia response",hits)

    var html = templateScript({ hits: hits })

    $(".helpers").html(html)

    $(".helpers").show()

}