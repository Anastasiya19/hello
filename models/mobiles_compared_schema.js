// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var mobiles_compared_Schema = new Schema({

        //Documents array to save data from multiple retailers - Includes retailer description, product_ids, URL, 
        //variants, pricing, offers, sales rank
        product_retailers: [{

            retailer_description: {

                retailer_name: {
                    type: String,
                    default: "N/A"
                },

                retailer_id: {
                    type: Number,
                    default: 0
                        //required: true
                }

            },

            product_id: {

                mobiles_db_uuid: {
                    type: String
                },

                retailer_product_id: {
                    type: String
                }

            },

            productURL: {
                type: String,
                default: "N/A"
            },

            product_position: {
                type: Number,
                default: 0
            },

            //Product availability
            product_status: {

                available: {
                    type: Boolean
                }

            },

            //Product pricing and discount
            product_pricing: {

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

                discount: {
                    type: Number,
                    default: 0
                }

            },

            //Product rating
            product_rating: {

                rating_text: {
                    type: String,
                    default: "N/A"
                },

                rating_val: {
                    type: Number,
                    default: 0
                },

                number_of_ratings: {
                    type: Number,
                    default: 0
                },

                number_of_reviews: {
                    type: Number,
                    default: 0
                },

                reviews_link: {
                    type: String,
                    default: "N/A"
                }


            },


            //Offers
            offers: {

                offer_details: {
                    type: Array
                },

                emi: {
                    emi_details: {
                        type: String,
                        default: "N/A"
                    },

                    emi_val: {
                        type: Number,
                        default: 0
                    }
                },

                exchange: {
                    exchange_offer_status: {
                        type: Boolean
                    },

                    exchange_offer_text: {
                        type: String,
                        default: "N/A"
                    }
                }
            },

            //Delivery details
            delivery_details: {

                //Delivery time
                delivery_time: {
                    type: String,
                    default: "N/A"
                },

                //Delivery assurance
                delivery_assured: {
                    type: Boolean
                },

                //Cash on Delivery
                cod: {
                    type: Boolean
                }


            },


            //Seller rating
            seller_rating: {

                seller_name: {
                    type: String,
                    default: "N/A"
                },
                seller_average_rating: {
                    type: Number,
                    default: 0
                },

                seller_number_of_ratings: {
                    type: Number,
                    default: 0
                },

                seller_number_of_reviews: {
                    type: Number,
                    default: 0
                }
            }
        }], //product_retailers ends


        //New UUID generated 
        product_id: {

            uuid: {
                type: String
            }

        },

        //Product ID of the product from where all general info is taken
        anchor_product_id: {
            uuid: {
                type: String,
                unique: true

            }

        },

        anchor_retailer_id: {
            type: Number,
            default: 0
        },

        //Basic info about the product - Title, URL, Brand, Normalized Brand name, Product Type
        product_basic_info: {

            title: {
                type: String,
                default: "N/A"
            },

            description: {
                type: String,
                default: "N/A"
            },

            productBrand: {
                type: String,
                default: "N/A"
            },

            productBrand_normalized: {
                type: String,
                default: "N/A"
            },

            normalized_name: {
                type: String
            },

            product_type: {
                type: String,
                default: "N/A"
            }

        },


        //General specifications - Features, Model Number, Model Name, Model Color
        general_specifications: {
            features: {
                type: Array
            },

            model_name: {
                type: String,
                default: "N/A"
            },

            model_number: {
                type: String,
                default: "N/A"
            },

            model_color: {
                type: String,
                default: "N/A"
            }


        },


        //Sales package contents
        sales_package: {
            contents: {
                type: String,
                default: "N/A"
            }
        },

        //Features of the SIM - Type, Size and hybrid sim slot
        sim_features: {

            sim_type: {
                type: String,
                default: "N/A"
            },

            sim_size: {
                type: String,
                default: "N/A"
            },

            hybrid_sim_slot_status: {
                type: String,
                default: "N/A"
            }

        },

        //Display specifications - Display size, type, colors, resolutions, resolution type and touchscreen status
        display_specifications: {
            display_size: {
                type: String,
                default: "N/A"
            },

            display_type: {
                type: String,
                default: "N/A"
            },

            display_colors: {
                type: String,
                default: "N/A"
            },

            resolution: {
                type: String,
                default: "N/A"
            },

            resolution_type: {
                type: String,
                default: "N/A"
            },

            touchscreen_status: {
                type: String,
                default: "N/A"
            },

            display_size_val: {
                type: Number,
                default: 0
            }

        },

        //OS & Processor details
        os_processor: {
            operating_system: {
                type: String,
                default: "N/A"
            },

            processor_type: {
                type: String,
                default: "N/A"
            },

            processor_core: {
                type: String,
                default: "N/A"
            },

            processor_speed: {
                type: String,
                default: "N/A"
            }
        },

        //Memory storage details
        memory_storage: {
            internal_storage: {
                type: String,
                default: "N/A"
            },

            storageVal: {
                type: Number
            },

            ram: {
                type: String,
                default: "N/A"
            },

            ramVal: {
                type: Number
            },

            expandable_storage: {
                type: String,
                default: "N/A"
            }
        },

        //Camera and recording status
        camera: {

            primary_camera: {
                type: String,
                default: "N/A"
            },

            primary_camera_pixels: {
                type: String,
                default: "N/A"
            },

            primary_camera_features: {
                type: String,
                default: "N/A"
            },

            secondary_camera: {
                type: String,
                default: "N/A"
            },

            secondary_camera_pixels: {
                type: String,
                default: "N/A"
            },

            secondary_camera_features: {
                type: String,
                default: "N/A"
            },

            flash: {
                type: String,
                default: "N/A"
            },

            hd_recording_status: {
                type: String,
                default: "N/A"
            },

            full_hd_recording_status: {
                type: String,
                default: "N/A"
            },

            video_recording_status: {
                type: String,
                default: "N/A"
            },

            video_recording_resolution: {
                type: String,
                default: "N/A"
            },

            dual_camera_lens_available: {
                type: String,
                default: "N/A"
            },

            cameraVal: {
                type: Number
            }
        },

        //Connectivity
        connectivity: {
            network_type: {
                type: String,
                default: "N/A"
            },

            supported_networks: {
                type: String,
                default: "N/A"
            },

            internet_connectivity: {
                type: String,
                default: "N/A"
            },

            bluetooth_support: {
                type: String,
                default: "N/A"
            },

            bluetooth_version: {
                type: String,
                default: "N/A"
            },

            wifi: {
                type: String,
                default: "N/A"
            },

            nfc: {
                type: String,
                default: "N/A"
            },

            usb_connectivity: {
                type: String,
                default: "N/A"
            },

            audio_jack_width: {
                type: String,
                default: "N/A"
            }

        },

        //Battery Power and capacity
        battery_power: {
            battery_capacity: {
                type: String,
                default: "N/A"
            },

            removable_battery_status: {
                type: String,
                default: "N/A"
            },

            battery_type: {
                type: String,
                default: "N/A"
            },

            batteryVal: {
                type: Number
            }
        },

        //Product Images
        image_urls: {

            small: {
                type: String,
                default: "N/A"
            },

            medium: {
                type: String,
                default: "N/A"
            },

            large: {
                type: String,
                default: "N/A"
            }

        },

        //Product variants
        product_family: {

            variants: {
                type: Array
            }

        },

        //Sensors
        sensors: {
            type: String,
            default: "N/A"
        },

        //Warranty
        warranty: {
            type: String,
            default: "N/A"
        },


        //AV Formats supported
        av_formats: {
            audio: {
                type: String,
                default: "N/A"
            },

            video: {
                type: String,
                default: "N/A"
            }
        },

        //Dimensions
        dimensions: {
            width: {
                type: String,
                default: "N/A"
            },

            height: {
                type: String,
                default: "N/A"
            },

            depth: {
                type: String,
                default: "N/A"
            },

            weight: {
                type: String,
                default: "N/A"
            }
        },

        //Amazon Sales Rank and ASIN
        amazon_info: {

            parent_asin: {
                type: String,
                default: "N/A"
            }
        },

        //Other info
        other_info: {
            hands_free_status: {
                type: String,
                default: "N/A"
            },

            voice_input: {
                type: String,
                default: "N/A"
            },

            video_call_support: {
                type: String,
                default: "N/A"
            }
        },

        product_tags: {
            bestseller: {
                type: Boolean,
                default: false
            },

            latest: {
                type: Boolean,
                default: false
            },

            budget: {
                type: Boolean,
                default: false
            },

            best_camera: {
                type: Boolean,
                default: false
            },

            best_battery: {
                type: Boolean,
                default: false
            },

            best_processor: {
                type: Boolean,
                default: false
            },

            best_display: {
                type: Boolean,
                default: false
            },

            light_weight: {
                type: Boolean,
                default: false
            },

            flagship: {
                type: Boolean,
                default: false
            },

            top_rated: {
                type: Boolean,
                default: false
            },

            fingerprint_sensor: {
                type: Boolean,
                default: false
            },

            four_g: {
                type: Boolean,
                default: false
            },

            dual_sim: {
                type: Boolean,
                default: false
            },

            wireless_charging: {
                type: Boolean,
                default: false
            },

            waterproof: {
                type: Boolean,
                default: false
            },

            gaming: {
                type: Boolean,
                default: false
            },

            bezel: {
                type: Boolean,
                default: false
            },

            gorilla_glass: {
                type: Boolean,
                default: false
            }

        },

        variants: [{
            type: Schema.Types.ObjectId,
            ref: "mobiles_compared_collection"
        }],

        final_position: {
            type: Number,
            default: 0
        },

        internal_codes: {
            status: {
                type: Number,
                default: -1

                //-1 for new mobiles in the compared model database
                //0 mobile not added to AI
                //11 mobile_name added to API AI
                //111 brand added to API AI
            },

            search_status: {
                type: Number,
                default: -1
            },
            // -1 for new mobiles in the compared model database
            // 0 for the mobile not added to search API
            // 1 for the mobile added to search API

            fingerprint_sensor_check: {
                type: Number,
                default: -1
                    //1 means check done

            },

            four_g_check: {
                type: Number,
                default: -1
                    //1 means check done
            },

            dual_sim_check: {
                type: Number,
                default: -1
                    //1 means check done            
            }
        }


    },

    {
        timestamps: true
    });


// the schema is useless so far
// we need to create a model using it. Compile the model from the Schema
var Mobiles_compared_model = mongoose.model('mobiles_compared_collection', mobiles_compared_Schema);



// make this available to our Node applications
module.exports = Mobiles_compared_model;