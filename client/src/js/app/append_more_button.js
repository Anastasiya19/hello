

function append_more_button(query, skip){
    // appending more button to the last suggested questions
    $($(".suggestion")[$(".suggestion").length -1]).append(`<li  class="suggestion__item br-chat more-button" onclick="get_more(event)" data-skip="${skip || 1}" data-query='${query}' > more </li>`)

}