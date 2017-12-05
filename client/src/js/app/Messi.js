function Messi (mobile) {

    console.log("Messi is on the pitch");

    //Mobile
    this.mobile = mobile;

    this.context_detailed = [];

    this.context_summary = [];
    
}

//Function to set the ID
Messi.prototype.loop_attributes = function() {

    console.log("Inside set_id");

    this.mobile.attribute_requested.forEach(generate_reply_json.bind(this));

    function generate_reply_json(element, index, array){

        if(element==='battery'){
            this.battery_reply();
        }

        if(element==='camera'){
            this.camera_reply();
        }

        if(element==='colors'){
            this.colors_reply();
        }

        if(element==='dimensions'){
            this.dimensions_reply();
        }


        if(element==='processor'){
            this.processor_reply();
        }

        if(element==='operating system'){
            this.processor_reply();
        }

        if(element==='features'){
            this.features_reply();
        }

        if(element==='sales package'){
            this.sales_package_reply();
        }

        if(element==='sim card'){
            this.sim_features_reply();
        }

        if(element==='sensors'){
            this.sensors_reply();
        }

        if(element==='warranty'){
            this.warranty_reply();
        }

        if(element==='display'){
            this.display_reply();
        }

        if(element==='storage'){
            this.storage_reply();
        }

        if(element==='RAM'){
            this.ram_reply();
        }

        if(element==='connectivity'){
            this.connectivity_reply();
        }

        if(element==='bluetooth'){
            this.bluetooth_reply();
        }

        if(element==='nfc'){
            this.nfc_reply();
        }
    }

}


Messi.prototype.camera_reply = function(){

    console.log("This is the camera value: ",this.mobile.variants[0].camera.primary_camera_pixels);

    var attribute_first = {};
    var attribute_second = {};
    var attribute_third = {};

    attribute_first = {
        value: this.mobile.variants[0].camera.primary_camera_pixels,
        text: "Primary camera",
        icon: "ion-camera"
    };


    attribute_second = {
        value: this.mobile.variants[0].camera.secondary_camera_pixels,
        text: "Selfie camera",
        icon: "ion-camera"
    };

    attribute_third = {
        value: this.mobile.variants[0].camera.video_recording_resolution,
        text: "Video recording resolution",
        icon: "ion-ios-videocam"

    };

    console.log("Attributes created")

    this.context_detailed.push(attribute_first);
    this.context_detailed.push(attribute_second);
    this.context_detailed.push(attribute_third);


    // this.query_status = 104;

}

Messi.prototype.colors_reply = function(){
    console.log("This is the color variant: ",this.mobile.variants[0].general_specifications.model_color);

    var colors_array = [];

    this.mobile.variants.forEach(fetch_colors);

    function fetch_colors(variant, index, array){

        if(variant.general_specifications.model_color !== "N/A"){
            colors_array.push(variant.general_specifications.model_color);
        }

    }

    colors_array = _.uniq(colors_array);

    console.log("This is the colors_array: ", colors_array);

    var reply = {};

    if(colors_array.length > 0){
        reply.content_text = "It has " + arrayToSentence(colors_array) + " variants";
    }

    else{
        reply.content_text = "Seems like, I don't have the color details for this phone";
    }

    

    this.context_summary.push(reply);


}


Messi.prototype.battery_reply = function(){

    console.log("This is the battery power: ",this.mobile.variants[0].battery_power.battery_capacity);

    var attribute_first = {};
    var attribute_second = {};
    var attribute_third = {};

    attribute_first = {
        value: this.mobile.variants[0].battery_power.battery_capacity,
        text: "Battery capacity",
        icon: "ion-battery-charging"
    };


    attribute_second = {
        value: this.mobile.variants[0].battery_power.battery_type,
        text: "Battery type",
        icon: "ion-gear-a"
    };

    attribute_third = {
        value: this.mobile.variants[0].battery_power.removable_battery_status,
        text: "Removable battery",
        icon: "ion-arrow-swap"

    };

    console.log("Attributes created")

    this.context_detailed.push(attribute_first);
    this.context_detailed.push(attribute_second);
    this.context_detailed.push(attribute_third);

   
    console.log("Attributes attribute_package created");

}

Messi.prototype.dimensions_reply = function(){

    console.log("This is the dimensions: ",this.mobile.variants[0].dimensions);

    var attribute_first = {};
    var attribute_second = {};
    var attribute_third = {};

    attribute_first = {
        value: this.mobile.variants[0].dimensions.weight,
        text: "Weight",
        icon: "ion-iphone"
    };


    attribute_second = {
        value: this.mobile.variants[0].dimensions.height,
        text: "Height",
        icon: "ion-iphone"
    };

    attribute_third = {
        value: this.mobile.variants[0].dimensions.depth,
        text: "Depth",
        icon: "ion-iphone"

    };

    console.log("Attributes created")

    this.context_detailed.push(attribute_first);
    this.context_detailed.push(attribute_second);
    this.context_detailed.push(attribute_third);

   
    console.log("Attributes attribute_package created");

}




Messi.prototype.processor_reply = function(){

    //console.log("This is the battery power: ",this.mobiles[0].variants[0].battery_power.battery_capacity);

    var attribute_first = {};
    var attribute_second = {};
    var attribute_third = {};

    attribute_first = {
        value: this.mobile.variants[0].os_processor.processor_speed,
        text: "Speed",
        icon: "ion-speedometer"
    };


    attribute_second = {
        value: this.mobile.variants[0].os_processor.processor_core,
        text: "Type",
        icon: "ion-gear-a"
    };

    attribute_third = {
        value: this.mobile.variants[0].os_processor.operating_system,
        text: "OS",
        icon: "ion-code-working"

    };

    console.log("Attributes created")

    
    this.context_detailed.push(attribute_first);
    this.context_detailed.push(attribute_second);
    this.context_detailed.push(attribute_third);

  
    console.log("Attributes attribute_package created");

  
}


Messi.prototype.features_reply = function(){

    var reply = {};

    // reply.heading_text = "Here are the top features for "+this.mobile.variants[0].product_basic_info.normalized_name;

    reply.content_text = this.mobile.variants[0].general_specifications.features;

    this.context_summary.push(reply);

}

Messi.prototype.sales_package_reply = function(){

    var reply = {};

    // reply.heading_text = "Here is the list of items you get free along with "+this.mobile.variants[0].product_basic_info.normalized_name;

    reply.content_text = this.mobile.variants[0].sales_package.contents;

    this.context_summary.push(reply);

}


Messi.prototype.sim_features_reply = function(){

    var reply = {};

    // reply.heading_text = "Here are the sim card details for "+this.mobile.variants[0].product_basic_info.normalized_name;


    if(this.mobile.variants[0].sim_features.sim_type!=="N/A"){

        reply.content_text = "It has a "+this.mobile.variants[0].sim_features.sim_type+" slot. ";
    }

    else{

        reply.content_text = "I don't have the details on the sim type. ";
    }


    if(this.mobile.variants[0].sim_features.sim_size!=="N/A"){

        reply.content_text = reply.content_text + "Size of the sim supported is: "+this.mobile.variants[0].sim_features.sim_size;
    }

    else{

        reply.content_text = reply.content_text + "I don't have the details on the sim size for this particular phone";
    }

    this.context_summary.push(reply);

}

Messi.prototype.sensors_reply = function(){

    var reply = {};
    
    // reply.heading_text = this.mobile.variants[0].product_basic_info.normalized_name + " has following sensors";

    reply.content_text = this.mobile.variants[0].sensors;

    this.context_summary.push(reply);

}

Messi.prototype.storage_reply = function(){
    console.log("This is the storage variant: ",this.mobile.variants[0].memory_storage.internal_storage);

    var storage_array = [];

    this.mobile.variants.forEach(fetch_storage);

    function fetch_storage(variant, index, array){

        if(variant.memory_storage.internal_storage !== "N/A"){
            storage_array.push(variant.memory_storage.internal_storage);
        }

    }

    storage_array = _.uniq(storage_array);

    console.log("This is the storage_array: ", storage_array);

    var reply = {};


    if(storage_array.length > 0){
        reply.content_text = "It has " + arrayToSentence(storage_array) + " variants";    
    }

    else{
        reply.content_text = "Seems like I don't have the storage details for this phone";
    }
    

    this.context_summary.push(reply);


}

Messi.prototype.warranty_reply = function(){

    var reply = {};

    // reply.heading_text = this.mobile.variants[0].product_basic_info.normalized_name + " warranty details for this purchase";

    reply.content_text = this.mobile.variants[0].warranty;

    this.context_summary.push(reply);

}

Messi.prototype.display_reply = function(){

    console.log("This is the display: ",this.mobile.variants[0].display_specifications.display_size);

    var attribute_first = {};
    var attribute_second = {};
    var attribute_third = {};

    attribute_first = {
        value: this.mobile.variants[0].display_specifications.display_size,
        text: "Screen size",
        icon: "ion-iphone"
    };


    attribute_second = {
        value: this.mobile.variants[0].display_specifications.resolution_type,
        text: "Display type",
        icon: "ion-android-sunny"
    };

    attribute_third = {
        value: this.mobile.variants[0].display_specifications.resolution,
        text: "Resolution",
        icon: "ion-android-film"

    };

    console.log("Attributes created")

    this.context_detailed.push(attribute_first);
    this.context_detailed.push(attribute_second);
    this.context_detailed.push(attribute_third);

}


Messi.prototype.ram_reply = function(){

    // console.log("This is the storage: ",this.mobile.variants[0].memory_storage.internal_storage);

    var attribute_first = {};
    var attribute_second = {};
    
    attribute_first = {
        value: this.mobile.variants[0].memory_storage.ram,
        text: "RAM",
        icon: "ion-ios-speedometer-outline"

    };


    attribute_second = {
        value: this.mobile.variants[0].memory_storage.expandable_storage,
        text: "Expandable storage",
        icon: "ion-android-folder"
    };

    console.log("Attributes created")

    this.context_detailed.push(attribute_first);
    this.context_detailed.push(attribute_second);
    
}

Messi.prototype.connectivity_reply = function(){

    var reply = {};

    // reply.heading_text = "Network details for "+this.mobile.variants[0].product_basic_info.normalized_name;

    reply.content_text = this.mobile.variants[0].connectivity.network_type;

    this.context_summary.push(reply);    
}

Messi.prototype.bluetooth_reply = function(){

    var reply = {};

    // reply.heading_text = "Bluetooth details for "+this.mobile.variants[0].product_basic_info.normalized_name;


    if(this.mobile.variants[0].connectivity.bluetooth_support==="N/A"){

        reply.content_text = "Seems like I don't have the bluetooth details for this mobile. Please try another request";

    }

    if(this.mobile.variants[0].connectivity.bluetooth_support==="Yes"){

        if(this.mobile.variants[0].connectivity.bluetooth_version === "N/A"){
            reply.content_text = "Yes, it supports Bluetooth but I don't have the Bluetooth version details";
        }

        else{
            reply.content_text = "Yes, it supports Bluetooth version: "+this.mobile.variants[0].connectivity.bluetooth_version;
        }

    }

    if(this.mobile.variants[0].connectivity.bluetooth_support==="No"){
        reply.content_text = "It doesn't support bluetooth";
    }

    this.context_summary.push(reply);

}


Messi.prototype.nfc_reply = function(){

    var reply = {};

    // reply.heading_text = "Near Field Communications(NFC) details for "+this.mobile.variants[0].product_basic_info.normalized_name;

    //Creating a temp_array because handlebars 103 case accepts only arrays
    var temp_array = [];

    if(this.mobile.variants[0].connectivity.nfc==="N/A"){

        reply.content_text = "Seems like I don't have the NFC details for this mobile. Please try another request";

    }

    if(this.mobile.variants[0].connectivity.nfc==="Yes"){
        reply.content_text = "Yes, it supports NFC";
    }

    if(this.mobile.variants[0].connectivity.nfc==="No"){
        reply.content_text = "No, it doesn't support NFC";
    }

    this.context_summary.push(reply);

}

Messi.prototype.jack_reply = function(){

    var reply = {};

    // reply.heading_text = "Audio jack details for "+this.mobile.variants[0].product_basic_info.normalized_name;

    if(this.mobile.variants[0].connectivity.audio_jack_width==="N/A"){

        reply.content_text = "Seems like I don't have the Audio Jack details for this mobile. Please try another request";

    }

    else{
        reply.content_text = "Audio jack supported is: ", this.mobile.variants[0].connectivity.audio_jack_width;
    }

    this.context_summary.push(reply);

}
