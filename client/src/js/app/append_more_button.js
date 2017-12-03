

function append_more_button(query, page){
    // appending more button to the last suggested questions
    $($(".suggestion")[$(".suggestion").length -1]).append(`$(<li  class="suggestion__item br-chat" onclick="get_more()" data-skip="${skip}" data-query="${query}" > more </li>`)

}