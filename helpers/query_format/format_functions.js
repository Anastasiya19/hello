//Project name - Sagarmatha

//Functions to convert megapixel to mp
exports.megapixel_replace = function(query_text){

	//changing megapixel and mega pixel to mp

    query_text = query_text.replace(/MEGAPIXELS/i, "mp");
    query_text = query_text.replace(/MEGA PIXELS/i, "mp");

    query_text = query_text.replace(/MEGAPIXEL/i, "mp");
    query_text = query_text.replace(/MEGA PIXEL/i, "mp");

    return query_text;

}

// adding spacing in the battery capacity case 
exports.battery_spacing = function(query_text){

    var battery_match = query_text.match(/\d+mah|battery/gi)
    if (battery_match) {
        for (var i = battery_match.length - 1; i >= 0; i--) {
            query_text = query_text.replace(battery_match[i], battery_match[i].slice(0, battery_match[i].match(/[^\d+]/)['index']) + " " + battery_match[i].slice(battery_match[i].match(/[^\d+]/)['index']))
        }
    }

    return query_text;
}


// adding spacing in the camera resolution 
exports.camera_spacing = function(query_text){
    
    var camera_match = query_text.match(/\d+mp|megapixels|pixels/gi)
    if (camera_match) {
        for (var i = camera_match.length - 1; i >= 0; i--) {
            query_text = query_text.replace(camera_match[i], camera_match[i].slice(0, camera_match[i].match(/[^\d+]/)['index']) + " " + camera_match[i].slice(camera_match[i].match(/[^\d+]/)['index']))
        }
    }

    return query_text;
}


