// Route url - '/admin/flipkart/'

//********************** 1. Load necessary files and dependencies ****

//1.1 Load the dependencies
const express = require('express');
const request = require('request');
const async = require("async");
const uuidV1 = require('uuid/v1');


const changeCase = require('change-case');
const leven = require('leven');
const _ = require('lodash');

//1.2 Load the models
var flipkart_Mobiles_Model = require('../../../models/flipkart_mobiles_schema');
var flipkart_Brands_Model = require('../../../models/flipkart_brands_schema');
var mobiles_Compared_Model = require('../../../models/mobiles_compared_schema');



//1.3 Load the Configurations
var config = require('../../../config/config.js');

//1.4 Create router instance
var router = express.Router();




//*********************** 2. Routes **********************************

//2.1 Test Route
router.get('/pagenumber/:pagenumber', function (req, res) {
  console.log("Page requested is: ", req.params.pagenumber);
  res.send("Page number requested is sent");
  
});



//----------------------- Next Route -------------------------------
//Route to display brands and mark them irrelevant / relevant as the case is
router.get('/shortlist_brands', function (req, res) {
    
    flipkart_Brands_Model.
    find({"internal_codes.status": "-1"}).
    sort('brand_name').
    select('brand_name').
    exec(function (err, brands_array) {
        console.log("Render request received on the Server");
        if (err) throw err;
        res.render(('shortlist_flipkart_brands'),{brands_array: brands_array});
    });

});


//----------------------- Next Route -------------------------------
//POST route to disable the brand
router.post('/disable_brand',function (req, res) {
    
  console.log("Brand to be disabled is: ", req.body.brand_name);
  var query = {"brand_name": req.body.brand_name};
  var options = {multi: false};
  flipkart_Brands_Model.update(query, {"internal_codes.status": "0"}, options, function (err, result) {
        if (err) throw err;
      res.json({
        result: "Disabled",
        brand: req.body.brand_name
      });

   });
  
});


//----------------------- Next Route -------------------------------
//POST route to enable the brand
router.post('/enable_brand',function (req, res) {
    
  console.log("Brand to be enabled is: ", req.body.brand_name);
  var query = {"brand_name": req.body.brand_name};
  var options = {multi: false};
  flipkart_Brands_Model.update(query, {"internal_codes.status": "1"}, options, function (err, result) {
        if (err) throw err;
      res.json({
        result: "Enabled",
        brand: req.body.brand_name
      });

   });
  
});


//----------------------- Next Route -------------------------------
//Route to check relevance of the products and mark them irrelevant / relevant as the case is
router.get('/display_enabled_brands', function (req, res) {
    
    flipkart_Brands_Model.
    find({"internal_codes.status": "1"}).
    sort('brand_name').
    select('brand_name').
    exec(function (err, brands_array) {
        console.log("Render request received on the Server");
        if (err) throw err;
        res.render(('shortlist_flipkart_brands'),{brands_array: brands_array});
    });

});


//----------------------- Next Route -------------------------------
//Route to check relevance of the products and mark them irrelevant / relevant as the case is
router.get('/display_disabled_brands', function (req, res) {
    
    flipkart_Brands_Model.
    find({"internal_codes.status": "0"}).
    sort('brand_name').
    select('brand_name').
    exec(function (err, brands_array) {
        console.log("Render request received on the Server");
        if (err) throw err;
        res.render(('shortlist_flipkart_brands'),{brands_array: brands_array});
    });

});


//----------------------- Next Route -------------------------------

//Route to match flipkart products with potential products in compared db
router.get('/match_products', function (req, res) {

  //Fetch each mobile to be matched - Store it in mobile_to_be_matched variable
  var query = flipkart_Mobiles_Model.findOne({"internal_codes.status": "11111"});
  query.exec(function(err,mobile_to_be_matched){
    
    if(err){
      console.log(err);
    }

    else
    {    
      
      if(mobile_to_be_matched!== null){
        //Fetch all the mobiles from the compared model belonging to the same brand as mobile_to_be_matched
        var query = mobiles_Compared_Model.find({"product_basic_info.productBrand_normalized": mobile_to_be_matched.product_basic_info.productBrand_normalized});
        query.exec(function(err, compared_model_results){
          if(err){
            console.log(err);
          }

          else
          {
            //Array to store the results of the match score
            var results_array = [];

            //For each potential match, calculate the relevant match score based on title, normalized_name and color
            compared_model_results.forEach(function(each_potential_match,index){
              if(each_potential_match.anchor_retailer_id!==1){
              
              //Calculate scores based on title, normalized name and color 
              var title_score = (leven(mobile_to_be_matched.product_basic_info.title,each_potential_match.product_basic_info.title));
              var normalized_name_score = (leven(mobile_to_be_matched.product_basic_info.normalized_name, each_potential_match.product_basic_info.normalized_name));
              var color_score = (leven(mobile_to_be_matched.general_specifications.model_color, each_potential_match.general_specifications.model_color));
              var total_score = title_score + normalized_name_score + color_score; 
              
              //Store result for each potential match in results_array
              results_array.push({title_score: title_score, product: each_potential_match, total_score: total_score});
              }
            });

            //Sort the results based on total_score and title score
            results_array = _.sortBy(results_array, ['total_score', 'title_score']);

            // results_array.sort(function(a,b){
            //   return(a.total_score - b.total_score);
            // });
            console.log(' possible matches -----------',results_array.length)
            //Render the product_match page to select the matching product
            res.render(('product_match'),{results_array: results_array, product_tobematched: mobile_to_be_matched});

          }//else ends
        });//query.exec ends 

      }//if ends

      else{

        res.send("All mobiles matched");
      }
          
    }//else ends

  });//query.exec ends
    
});//router ends


//----------------------- Next Route -------------------------------

//Router to match the case when a potential match is found
router.post('/match_true', function (req, res) {

  //Select the product to be matched UUID. This is the product from Flipkart database
  var product_tobematched_uuid = req.body.product_tobematched_uuid;

  //Select the UUID of the shortlisted match. This is the product from the compared database.
  var shortlisted_uuid = req.body.product_shortlisted_uuid;

  //Find the product_tobematched in the flipkart mobiles db and fetch its data
  //which will be updated in the combined mobiles db
  flipkart_Mobiles_Model.findOne({"product_id.uuid": product_tobematched_uuid}, function(err, product_tobematched){
    console.log("Inside Mobiles_model.find");
    //console.log("This is product_tobematched", product_tobematched);
    var update = {
               
      "retailer_description.retailer_name" : product_tobematched.retailer_description.retailer_name,
      "retailer_description.retailer_id" : product_tobematched.retailer_description.retailer_id,

      "product_id.mobiles_db_uuid" : product_tobematched.product_id.uuid,
      "product_id.retailer_product_id" : product_tobematched.product_id.retailer_product_id,

      "productURL" : product_tobematched.product_basic_info.productURL,

      "product_position" : product_tobematched.product_position,

      "product_status.available" : product_tobematched.product_status.available,

      "product_pricing.mrp" : product_tobematched.product_pricing.mrp,
      "product_pricing.selling_price" : product_tobematched.product_pricing.selling_price,
      "product_pricing.special_price" : product_tobematched.product_pricing.special_price,
      "product_pricing.discount" : product_tobematched.product_pricing.discount,

      "product_rating.rating_text" : product_tobematched.product_rating.rating_text,
      "product_rating.rating_val" : product_tobematched.product_rating.rating_val,
      "product_rating.number_of_ratings" : product_tobematched.product_rating.number_of_ratings,
      "product_rating.number_of_reviews" : product_tobematched.product_rating.number_of_reviews,
      "product_rating.reviews_link" : product_tobematched.product_rating.reviews_link,

      "offers.offer_details" : product_tobematched.offers.offer_details,
      "offers.emi.emi_details" : product_tobematched.offers.emi.emi_details,
      "offers.emi.emi_val" : product_tobematched.offers.emi.emi_val,
      "offers.exchange.exchange_offer_status" : product_tobematched.offers.exchange.exchange_offer_status,
      "offers.exchange.exchange_offer_text" : product_tobematched.offers.exchange.exchange_offer_text,

      "delivery_details.delivery_time" : product_tobematched.delivery_details.delivery_time,
      "delivery_details.delivery_assured" : product_tobematched.delivery_details.delivery_assured,
      "delivery_details.cod" : product_tobematched.delivery_details.cod,

      "seller_rating.seller_name" : product_tobematched.seller_rating.seller_name,
      "seller_rating.seller_average_rating" : product_tobematched.seller_rating.seller_average_rating,
      "seller_rating.seller_number_of_ratings" : product_tobematched.seller_rating.seller_number_of_ratings,
      "seller_rating.seller_number_of_reviews" : product_tobematched.seller_rating.seller_number_of_reviews,

    };  


    //Update the mobiles_compared_model product_retailers section with the details of the product_tobematched
    mobiles_Compared_Model.update({"product_id.uuid":shortlisted_uuid}, {$push: {"product_retailers": update}},{safe: true},function(err,results){
      if(err){
        console.log("Error in updating Mobiles_compared_model");
        console.log(err);
      }
      else
      {
        console.log("Inside Mobiles_Compared_model.find");
        //Update the flipkart_mobiles_model with the uuid of the shortlisted product
        flipkart_Mobiles_Model.update({"product_id.uuid": product_tobematched_uuid}, {$set: {"internal_codes.status": "111111", "compared_db.product_uuid": shortlisted_uuid}}, function(err, results){

          if(err){
            console.log("Error in updating Mobiles_model");
            console.log(err);  
          }

          else{
            console.log("Successfully updated the mobiles db");
            res.json({
              result: "Matched"   
            });
          }


        });//flipkart_Mobiles_Model.update ends

      }//else ends
        
    });//mobiles_compared_model update ends         

              
  });//flipkart_mobiles_model findOne ends
     

});//route over


//----------------------- Next Route -------------------------------

//Router for the case wherein a wrong match is selected and we want to delete the match
router.post('/match_false', function (req, res) {

  //Select the product to be matched UUID. This is the product from Flipkart database
  var product_tobematched_uuid = req.body.product_tobematched_uuid;

  //Select the UUID of the shortlisted match. This is the product from the compared database
  var shortlisted_uuid = req.body.product_shortlisted_uuid;

  console.log("Product to be deleted from retailers list is: ", product_tobematched_uuid);
  console.log("Shortlisted uuid is: ", shortlisted_uuid);
  
  var update = {
    "product_id.mobiles_db_uuid": product_tobematched_uuid
  };  

  //Pull the product_retailers array from compared model where product uuid 
  //is equal to the uuid of the product_tobematched
  mobiles_Compared_Model.update({"product_id.uuid":shortlisted_uuid}, {$pull: {"product_retailers": update}},{safe: true},function(err,results){
    if(err){
      console.log("Error in updating Mobiles_compared_model");
      console.log(err);
    }

    else
    {
      console.log("Inside Mobiles_Compared_model.find");
      
      //Update the flipkart mobiles model internal_codes and compared_db reference
      flipkart_Mobiles_Model.update({"product_id.uuid": product_tobematched_uuid}, {$set: {"internal_codes.status": "11111", "compared_db.product_uuid": "N/A"}}, function(err, results){

        if(err){
          console.log("Error in updating Mobiles_model");
          console.log(err);  
        }

        else{
          console.log("Successfully updated the mobiles db");
          
          res.json({
            result: "Match Disabled"   
          });
        }//else ends

      });//Mobiles_model ends
    
    }//else ends
      
  });//mobiles_Compared_Model 
  
});


//----------------------- Next Route -------------------------------



//Update no_match scenario
router.post('/match_no_match', function (req, res) {

  //Select the product to be matched UUID. This is the product from Flipkart database
  var product_tobematched_uuid = req.body.product_tobematched_uuid;
  console.log("Product to be matched is: ", product_tobematched_uuid);
  
  flipkart_Mobiles_Model.findOne({"product_id.uuid": product_tobematched_uuid}, function(err, product){
    console.log("Inside Mobiles_model.find");
   // console.log("This is product_tobecompared", product);

    var mobiles = new mobiles_Compared_Model();

    var product_retailers_document = {
      retailer_description: {},
      product_id: {},
      productURL: {},
      product_position: {},
      product_status:{},
      product_pricing: {},
      product_rating: {},
      offers:{
        emi:{},
        exchange:{}
      },
      delivery_details:{},
      seller_rating: {}
    };


      product_retailers_document.retailer_description.retailer_name = product.retailer_description.retailer_name;
      product_retailers_document.retailer_description.retailer_id = product.retailer_description.retailer_id;

      product_retailers_document.product_id.mobiles_db_uuid = product.product_id.uuid;
      product_retailers_document.product_id.retailer_product_id = product.product_id.retailer_product_id;

      product_retailers_document.productURL = product.product_basic_info.productURL;

      product_retailers_document.product_position = product.product_position;

      product_retailers_document.product_status.available = product.product_status.available;

      product_retailers_document.product_pricing.mrp = product.product_pricing.mrp;
      product_retailers_document.product_pricing.selling_price = product.product_pricing.selling_price;
      product_retailers_document.product_pricing.special_price = product.product_pricing.special_price;
      product_retailers_document.product_pricing.discount = product.product_pricing.discount;

      product_retailers_document.product_rating.rating_text =  product.product_rating.rating_text;
      product_retailers_document.product_rating.rating_val = product.product_rating.rating_val;
      product_retailers_document.product_rating.number_of_ratings = product.product_rating.number_of_ratings;
      product_retailers_document.product_rating.number_of_reviews = product.product_rating.number_of_reviews;
      product_retailers_document.product_rating.reviews_link = product.product_rating.reviews_link;

      product_retailers_document.offers.offer_details = product.offers.offer_details;
      product_retailers_document.offers.emi.emi_details = product.offers.emi.emi_details;
      product_retailers_document.offers.emi.emi_val = product.offers.emi.emi_val;
      product_retailers_document.offers.exchange.exchange_offer_status = product.offers.exchange.exchange_offer_status;
      product_retailers_document.offers.exchange.exchange_offer_text = product.offers.exchange.exchange_offer_text;

      product_retailers_document.delivery_details.delivery_time = product.delivery_details.delivery_time;
      product_retailers_document.delivery_details.delivery_assured = product.delivery_details.delivery_assured;
      product_retailers_document.delivery_details.cod = product.delivery_details.cod;

      product_retailers_document.seller_rating.seller_name = product.seller_rating.seller_name; 
      product_retailers_document.seller_rating.seller_average_rating = product.seller_rating.seller_average_rating;
      product_retailers_document.seller_rating.seller_number_of_ratings = product.seller_rating.seller_number_of_ratings;
      product_retailers_document.seller_rating.seller_number_of_reviews = product.seller_rating.seller_number_of_reviews;

      mobiles.product_retailers.push(product_retailers_document);


      mobiles.product_id.uuid = uuidV1();
      mobiles.anchor_product_id.uuid = product.product_id.uuid;
      mobiles.anchor_retailer_id = product.retailer_description.retailer_id;

      mobiles.product_basic_info.title = product.product_basic_info.title;
      mobiles.product_basic_info.description = product.product_basic_info.description;
      mobiles.product_basic_info.productBrand = product.product_basic_info.productBrand;
      mobiles.product_basic_info.productBrand_normalized = product.product_basic_info.productBrand_normalized;
      mobiles.product_basic_info.normalized_name = product.product_basic_info.normalized_name;
      mobiles.product_basic_info.product_type = product.product_basic_info.product_type;


      mobiles.general_specifications.features = product.general_specifications.features;
      mobiles.general_specifications.model_name = product.general_specifications.model_name;
      mobiles.general_specifications.model_number = product.general_specifications.model_number;
      mobiles.general_specifications.model_color = product.general_specifications.model_color;

      mobiles.sales_package.contents = product.sales_package.contents;

      mobiles.sim_features.sim_type = product.sim_features.sim_type;
      mobiles.sim_features.sim_size = product.sim_features.sim_size;
      mobiles.sim_features.hybrid_sim_slot_status = product.sim_features.hybrid_sim_slot_status;

      mobiles.display_specifications.display_size = product.display_specifications.display_size;
      mobiles.display_specifications.display_size_val = parseFloat(product.display_specifications.display_size);
      mobiles.display_specifications.display_type = product.display_specifications.display_type;
      mobiles.display_specifications.display_colors = product.display_specifications.display_colors;
      mobiles.display_specifications.resolution = product.display_specifications.resolution;
      mobiles.display_specifications.resolution_type = product.display_specifications.resolution_type;
      mobiles.display_specifications.touchscreen_status = product.display_specifications.touchscreen_status;
      
      mobiles.os_processor.operating_system = product.os_processor.operating_system;
      mobiles.os_processor.processor_type = product.os_processor.processor_type;
      mobiles.os_processor.processor_core = product.os_processor.processor_core;
      mobiles.os_processor.processor_speed = product.os_processor.processor_speed;                

      mobiles.memory_storage.internal_storage = product.memory_storage.internal_storage;
      mobiles.memory_storage.ram = product.memory_storage.ram;
      mobiles.memory_storage.expandable_storage = product.memory_storage.expandable_storage;

      mobiles.camera.primary_camera = product.camera.primary_camera;
      mobiles.camera.primary_camera_pixels = product.camera.primary_camera_pixels;
      mobiles.camera.primary_camera_features = product.camera.primary_camera_features;
      mobiles.camera.secondary_camera = product.camera.secondary_camera;
      mobiles.camera.secondary_camera_pixels = product.camera.secondary_camera_pixels;
      mobiles.camera.secondary_camera_features = product.camera.secondary_camera_features;
      mobiles.camera.flash = product.camera.flash;
      mobiles.camera.hd_recording_status = product.camera.hd_recording_status;
      mobiles.camera.full_hd_recording_status = product.camera.full_hd_recording_status;
      mobiles.camera.video_recording_status = product.camera.video_recording_status;
      mobiles.camera.video_recording_resolution = product.camera.video_recording_resolution;
      mobiles.camera.dual_camera_lens_available = product.camera.dual_camera_lens_available;

      mobiles.connectivity.network_type = product.connectivity.network_type;
      mobiles.connectivity.supported_networks = product.connectivity.supported_networks;
      mobiles.connectivity.internet_connectivity = product.connectivity.internet_connectivity;
      mobiles.connectivity.bluetooth_support = product.connectivity.bluetooth_support;
      mobiles.connectivity.bluetooth_version = product.connectivity.bluetooth_version;
      mobiles.connectivity.wifi = product.connectivity.wifi;
      mobiles.connectivity.nfc = product.connectivity.nfc;
      mobiles.connectivity.usb_connectivity = product.connectivity.usb_connectivity;
      mobiles.connectivity.audio_jack_width = product.connectivity.audio_jack_width;

      mobiles.battery_power.battery_capacity = product.battery_power.battery_capacity;
      mobiles.battery_power.removable_battery_status = product.battery_power.removable_battery_status;
      mobiles.battery_power.battery_type = product.battery_power.battery_type;

      mobiles.image_urls.small = product.image_urls.small;
      mobiles.image_urls.medium = product.image_urls.medium;
      mobiles.image_urls.large = product.image_urls.large;

      mobiles.product_family.variants = product.product_family.variants;

      mobiles.sensors = product.sensors;

      mobiles.warranty = product.warranty;

      mobiles.av_formats.audio = product.av_formats.audio;
      mobiles.av_formats.video = product.av_formats.video;

      mobiles.dimensions.width = product.dimensions.width;
      mobiles.dimensions.height = product.dimensions.height;
      mobiles.dimensions.depth = product.dimensions.depth;
      mobiles.dimensions.weight = product.dimensions.weight;


      mobiles.amazon_info.parent_asin = "N/A";

      mobiles.other_info.hands_free_status = product.other_info.hands_free_status;
      mobiles.other_info.voice_input = product.other_info.voice_input;
      mobiles.other_info.video_call_support = product.other_info.video_call_support;

        


    //Saving mobiles data into database
    mobiles.save(function(err)
    {
      if (err){ 
        console.log(err);
        doneCallback(err);
      }

      else{
        
        var query = {"product_id.retailer_product_id": product.product_id.retailer_product_id};
        var options = {multi: false};
        flipkart_Mobiles_Model.update(query, {"compared_db.product_uuid": mobiles.product_id.uuid, "internal_codes.status": "211111"}, options, function (err, resp) {
          if (err) {
            console.log(err);
          }

          else{
            console.log("Copied", product.product_id.retailer_product_id);
            
            console.log("\n");
            res.json({
              matched: "Didn't match",
              copied: "Yes"
            });                  
          }
          
        });
      
      }//else ends

    });//mobiles.save ends
    
  });//flipkart_mobiles_model ends

});//router ends

//----------------------- Next Route -------------------------------

//Update match_false
router.post('/skip_match', function (req, res) {

  var product_tobeskipped_uuid = req.body.product_tobeskipped_uuid;
  //var shortlisted_uuid = req.body.product_shortlisted_uuid;

  console.log("Product to be skipped from matching list is: ", product_tobeskipped_uuid);
  

  flipkart_Mobiles_Model.update({"product_id.uuid": product_tobeskipped_uuid}, {$set: {"internal_codes.status":"011111" , "compared_db.product_uuid": "N/A"}}, function(err, results){

    if(err){
      console.log("Error in updating Mobiles_model");
      console.log(err);  
    }//if ends

    else{
      console.log("Successfully updated the mobiles db");
      
      res.json({
        result: "Successfully skipped"   
      });

    }//else ends


  });//flipkart_Mobiles_Model update ends


});//Route ends



//************************ Routes Over ****************************




module.exports = router;

