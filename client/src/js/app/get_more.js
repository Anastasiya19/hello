function get_more(event) {

    var more_button = $(event.target)

    var query = more_button.attr("data-query");

    var skip = more_button.attr("data-skip");

    $.post("/get_more", { query_object: query, skip: skip }, function (mobiles) {

        console.log(mobiles)

    })

}