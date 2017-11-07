//Need to add Prime and COD status
//mongo ds123752.mlab.com:23752/tiger -u ankur -p ankur_tiger

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var amazon_mobiles_Schema = new Schema({ 
    
    //Retailer name and ID
    retailer_description: 
    {

        retailer_name:{
        type: String,
        default: "Amazon"
        },

        retailer_id: {
        type: Number,
        default: 2
        //required: true
        }
    
    },


    //Product IDs
    product_id: 
    {

        uuid:{
        type: String,
        },

        retailer_product_id: {
        type: String,
        unique: true
        }
    
    },

    //Basic info about the product - Title, URL, Brand, Normalized Brand name, Product Type
    product_basic_info:{

        title: {
        type: String,
        default: "N/A"
        },

        description:{
        type: String,
        default: "N/A"
        },

        productBrand:{
        type: String,
        default: "N/A"    
        },

        productBrand_normalized:{
        type: String,
        default: "N/A"
        },

        normalized_name:{
        type: String,
        default: "N/A"
        },

        productURL:{
        type: String,
        default: "N/A"  
        },

        product_type:{
        type: String,
        default: "N/A"
        }

    },

    //General specifications - Features, Model Number, Model Name, Model Color
    general_specifications:{
        features:{
        type: Array
        },

        model_name:{
        type: String,
        default: "N/A"
        },

        model_number:{
        type: String,
        default: "N/A"    
        },

        model_color:{
        type: String,
        default: "N/A"
        }    

        
    },

    //Sales package contents
    sales_package:{
        contents: {
            type: String,
            default: "N/A"
        }
    },

    
    //Features of the SIM - Type, Size and hybrid sim slot
    sim_features:{
        
        sim_type:{
        type: String,
        default: "N/A"
        },

        sim_size:{
        type: String,
        default: "N/A"
        },

        hybrid_sim_slot_status:{
        type: String,
        default: "N/A"
        }

    },

    //Display specifications - Display size, type, colors, resolutions, resolution type and touchscreen status
    display_specifications:{
        display_size:{
        type: String,
        default: "N/A"
        },

        display_type:{
        type: String,
        default: "N/A"
        },

        display_colors:{
        type: String,
        default: "N/A"
        },

        resolution:{
        type: String,
        default: "N/A"
        },

        resolution_type:{
        type: String,
        default: "N/A"
        },

        touchscreen_status:{
        type: String,
        default: "N/A"
        }

    },

    //OS & Processor details
    os_processor:{
        operating_system:{
        type: String,
        default: "N/A"
        },

        processor_type:{
        type: String,
        default: "N/A"
        },

        processor_core:{
        type: String,
        default: "N/A"
        },

        processor_speed:{
        type: String,
        default: "N/A"
        }
    },

    //Memory storage details
    memory_storage:{
        internal_storage:{
        type: String,
        default: "N/A"
        },

        ram:{
        type: String,
        default: "N/A"
        },

        expandable_storage:{
        type: String,
        default: "N/A"
        }
    },

    //Camera and recording status
    camera:{
        
        primary_camera:{
        type: String,
        default: "N/A"
        },

        primary_camera_pixels:{
        type: String,
        default: "N/A"
        },

        primary_camera_features:{
        type: String,
        default:"N/A"
        },

        secondary_camera:{
        type: String,
        default: "N/A"
        },

        secondary_camera_pixels:{
        type: String,
        default: "N/A"
        },

        secondary_camera_features:{
        type: String,
        default:"N/A"
        },

        flash:{
        type: String,
        default: "N/A"
        },

        hd_recording_status:{
        type: String,
        default: "N/A"
        },

        full_hd_recording_status:{
        type: String,
        default: "N/A"
        },

        video_recording_status:{
        type: String,
        default: "N/A"
        },

        video_recording_resolution:{
        type: String,
        default: "N/A"
        },

        dual_camera_lens_available:{
        type: String,
        default: "N/A"
        }
    },

    //Connectivity
    connectivity:{
        network_type:{
        type: String,
        default: "N/A"
        },

        supported_networks:{
        type: String,
        default: "N/A"
        },

        internet_connectivity:{
        type: String,
        default:"N/A"
        },

        bluetooth_support:{
        type: String,
        default: "N/A"
        },

        bluetooth_version:{
        type: String,
        default: "N/A"
        },

        wifi:{
        type: String,
        default: "N/A"
        },

        nfc:{
        type: String,
        default: "N/A"
        },

        usb_connectivity:{
        type: String,
        default: "N/A"
        },

        audio_jack_width:{
        type: String,
        default: "N/A"
        }

    },

    //Battery Power and capacity
    battery_power:{
        battery_capacity:{
        type: String,
        default: "N/A"
        },

        removable_battery_status:{
        type: String,
        default: "N/A"
        },

        battery_type:{
        type: String,
        default: "N/A"
        }
    },

    //Product Images
    image_urls:{

        small: {
        type: String,
        default: "N/A"
        },

        medium:{
        type: String,
        default: "N/A"  
        },

        large:{
        type: String,
        default: "N/A"    
        }

    },

    //Product variants
    product_family:{

        variants: {
        type: Array
        }

    },

    //Sensors
    sensors:{
        type: String,
        default: "N/A"
    },

    //Warranty
    warranty: {
        type: String,
        default: "N/A"
    },

    legal_disclaimer:{
        type: String,
        default: "N/A"
    },


    //AV Formats supported
    av_formats:{
        audio:{
            type: String,
            default: "N/A"
        },

        video:{
            type: String,
            default: "N/A"
        }
    },

    //Dimensions
    dimensions:{
        width:{
        type: String,
        default: "N/A"
        },

        height:{
        type: String,
        default: "N/A"
        },

        depth:{
        type: String,
        default: "N/A"
        },

        weight:{
        type: String,
        default: "N/A"
        }
    },

    //Amazon Sales Rank and ASIN
    amazon_info:{

        parent_asin:{
            type: String,
            default: "N/A"
        }
    },

    //Other info
    other_info: {
        hands_free_status:{
        type: String,
        default: "N/A"
        },

        voice_input:{
        type: String,
        default: "N/A"
        },

        video_call_support:{
        type: String,
        default: "N/A"
        }
    },








//************** Variable data begins *********************

    //Position/popularity of the product
    product_position:{
        type: Number
    },

    //Product availability
    product_status:{
        
        available:{
        type: Boolean    
        }

    },

    //Product pricing and discount
    product_pricing:{

        mrp: {
        type: Number,
        default: 0
        },

        selling_price: {
        type: Number,
        default: 0
        },

        special_price: {
        type: Number,
        default: 0
        },

        discount:{
        type: Number,
        default: 0
        }

    },

    //Product rating
    product_rating:{

        rating_text:{
            type: String,
            default: "N/A"
        },

        rating_val:{
            type: Number,
            default: 0
        },

        number_of_ratings:{
            type: Number,
            default: 0
        },

        number_of_reviews:{
            type: Number,
            default: 0
        },

        reviews_link:{
            type: String,
            default: "N/A"
        }


    },


    //Offers
    offers:{

        offer_details:{
        type: Array
        },

        emi:{
            emi_details:{
                type: String,
                default: "N/A"
            },

            emi_val:{
                type: Number,
                default: 0
            }
        },

        exchange:{
            exchange_offer_status:{
                type: Boolean
            },

            exchange_offer_text:{
                type: String,
                default: "N/A"
            }
        }
    },

    //Delivery details
    delivery_details:{

        //Delivery time
        delivery_time:{
            type: String,
            default: "N/A"
        },

        //Delivery assurance
        delivery_assured:{
            type: Boolean
        },

        //Cash on Delivery
        cod:{
            type: Boolean
        }


    },


    //Seller rating
    seller_rating:{

        seller_name: {
            type: String,
            default:"N/A"
        },
        seller_average_rating:{
            type: Number,
            default: 0
        },

        seller_number_of_ratings:{
            type: Number,
            default: 0
        },

        seller_number_of_reviews:{
            type: Number,
            default: 0
        }
    },


    
//************** Status data begins *********************

    //Relevant status to check product relevance, brand relevance and product match
    internal_codes:{
        
        status:{
            type: String,
            default: "-2"
        },

        // Updated on 26th Sep 2017
        //-2 : Default code 
        //-1 : New product (0)
        //0  : Product not relevant (1222)
        //1  : Product relevant (0)
        //01 : Brand not relevant (6254)
        //11 : Brand relevant (0)
        //011 : API call fail (0)
        //111 : API data success (441)
        //0111: Normalized brand name unsuccessful (0)
        //1111: Normalized brand name (0)
        //01111: Normalized name unsuccessfull(0)
        //11111: Normalized name successfull(2127)
        //011111:Skipped for matching (205) 
        //111111:Match successfull (551) 
        //211111:Didn't match...added as anchor to compared_db_database (45) 

        data_source:{
           type: String,
           default: "N/A" 
        }
        //N/A - Default
        //D - Only exists in data dump from affiliate website
        //DS - Exists both in dump and scrape
        //S - Exists only in scrape

    },

    //UUID in the compared DB
    compared_db:{
        product_uuid: {
            type: String,
            default: "N/A"
        }
    }

 }, 
    {
    timestamps: true
});



// the schema is useless so far
// we need to create a model using it. Compile the model from the Schema
var amazon_Mobiles_Model = mongoose.model('amazon_mobile', amazon_mobiles_Schema);



// make this available to our Node applications
module.exports = amazon_Mobiles_Model;


