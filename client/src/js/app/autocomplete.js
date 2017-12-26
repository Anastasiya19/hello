
  let availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];

// function initializeAutocomplete(index){
//
//   $( "#tags").autocomplete({
//     source: availableTags,
//     appendTo: "#tagsOuter"+index
//   });
// }
//
//   initializeAutocomplete(0);
//   initializeAutocomplete(1);

  $( ".tags").each((i,item)=>{

    $(item).autocomplete({
    source: availableTags,
    appendTo: $(item).parent()
  });

    // $(item).parent();
    // console.log($(item).parent());
  })