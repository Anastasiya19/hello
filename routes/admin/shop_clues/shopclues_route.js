// Route url - '/admin/amazon/'

//********************** 1. Load necessary files and dependencies ****

//1.1 Load the dependencies
const express = require('express');
const request = require('request');
const async = require("async");
const uuidV1 = require('uuid/v1');
const {
  OperationHelper
} = require('apac');

const changeCase = require('change-case');
const leven = require('leven');
const _ = require('lodash');

//1.2 Load the models
var shop_clues_Mobiles_Model = require('../../../models/shop_clues_mobiles_schema');
var shop_clues_Brands_Model = require('../../../models/shop_clues_brands_schema');
var mobiles_Compared_Model = require('../../../models/mobiles_compared_schema');

//1.3 Load the Configurations
var config = require('../../../config/config.js');

//1.4 Create router instance
var router = express.Router();

//Load the Amazon apac module configuration
const opHelper = new OperationHelper({
  awsId: config.awsId,
  awsSecret: config.awsSecret,
  assocId: config.awsTag,
  locale: 'IN'
});


//*********************** 2. Routes **********************************

//2.1 Test Route
router.get('/pagenumber/:pagenumber', function(req, res) {
  console.log("Page requested is: ", req.params.pagenumber);
  res.send("Page number requested is sent");

});


//2.2
//----------------------- Next Route -------------------------------
//Route to check relevance of the products and mark them irrelevant / relevant as the case is
router.get('/shortlist_asins/pagenumber/:pagenumber', function(req, res) {
  console.log("Page requested is: ", req.params.pagenumber);
  var skip_products = req.params.pagenumber * 100;
  shop_clues_Mobiles_Model.
  find({
    "internal_codes.status": "-1"
  }).
  sort('-product_position').
  skip(skip_products).
  limit(100).
  select('product_id.retailer_product_id product_basic_info.title product_basic_info.productBrand image_urls.medium').
  exec(function(err, mobiles_array) {
    console.log("Render request received on the Server");
    if (err) throw err;
    //console.log(mobiles_array[0]);
    res.render(('shortlist_shop_clues'), {
      mobiles_array: mobiles_array
    });
  });
});

//----------------------- Next Route -------------------------------

router.post('/disable_asin', function(req, res) {

  console.log("Asin to be disabled is: ", req.body.asin);
  var query = {
    "product_id.retailer_product_id": req.body.asin
  };
  var options = {
    multi: false
  };
  shop_clues_Mobiles_Model.update(query, {
    "internal_codes.status": 0
  }, options, function(err, result) {
    if (err) throw err;
    res.json({
      result: "Disabled",
      asin: req.body.asin
    });

  });

});

//----------------------- Next Route -------------------------------

router.post('/enable_asin', function(req, res) {

  console.log("Asin to be disabled is: ", req.body.asin);
  var query = {
    "product_id.retailer_product_id": req.body.asin
  };
  var options = {
    multi: false
  };
  shop_clues_Mobiles_Model.update(query, {
    "internal_codes.status": 1
  }, options, function(err, result) {
    if (err) throw err;

    res.json({
      result: "Enabled",
      asin: req.body.asin
    });
  });

});


//----------------------- Next Route -------------------------------
//Route to check relevance of the products and mark them irrelevant / relevant as the case is
router.get('/display_enabled_asins/:pagenumber', function(req, res) {

  var skip_products = req.params.pagenumber * 100;
  shop_clues_Mobiles_Model.
  find({
    "internal_codes.status": "1"
  }).
  sort('-product_position').
  skip(skip_products).
  limit(100).
  select('product_id.retailer_product_id product_basic_info.title product_basic_info.productBrand image_urls.small').
  exec(function(err, mobiles_array) {
    console.log("Render request received on the Server");
    if (err) throw err;
    //console.log(mobiles_array[0]);
    res.render(('shortlist_shop_clues'), {
      mobiles_array: mobiles_array
    });
  });

});







// -------------------- Brands related ------------------------------
//----------------------- Next Route -------------------------------
//Route to display brands and mark them irrelevant / relevant as the case is
router.get('/shortlist_brands', function (req, res) {
    
    shop_clues_Brands_Model.
    find({"internal_codes.status": "-1"}).
    sort('brand_name').
    select('brand_name').
    exec(function (err, brands_array) {
        console.log("Render request received on the Server");
        if (err) throw err;
        res.render(('shortlist_shop_clues_brands'),{brands_array: brands_array});
    });

});


//----------------------- Next Route -------------------------------
//POST route to disable the brand
router.post('/disable_brand',function (req, res) {
    
  console.log("Brand to be disabled is: ", req.body.brand_name);
  var query = {"brand_name": req.body.brand_name};
  var options = {multi: false};
  shop_clues_Brands_Model.update(query, {"internal_codes.status": "0"}, options, function (err, result) {
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
  shop_clues_Brands_Model.update(query, {"internal_codes.status": "1"}, options, function (err, result) {
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
    
    shop_clues_Brands_Model.
    find({"internal_codes.status": "1"}).
    sort('brand_name').
    select('brand_name').
    exec(function (err, brands_array) {
        console.log("Render request received on the Server");
        if (err) throw err;
        res.render(('shortlist_shop_clues_brands'),{brands_array: brands_array});
    });

});


//----------------------- Next Route -------------------------------
//Route to check relevance of the products and mark them irrelevant / relevant as the case is
router.get('/display_disabled_brands', function (req, res) {
    
    shop_clues_Brands_Model.
    find({"internal_codes.status": "0"}).
    sort('brand_name').
    select('brand_name').
    exec(function (err, brands_array) {
        console.log("Render request received on the Server");
        if (err) throw err;
        res.render(('shortlist_shop_clues_brands'),{brands_array: brands_array});
    });

});



// ----------- matching -------------------------------


//----------------------- Next Route -------------------------------

//Route to match shop_clues products with potential products in compared db
router.get('/match_products', function (req, res) {

  //Fetch each mobile to be matched - Store it in mobile_to_be_matched variable
  var query = shop_clues_Mobiles_Model.findOne({"internal_codes.status": "1111", "product_basic_info.productBrand_normalized": "Apple"});
  query.exec(function(err,mobile_to_be_matched){
    
    if(err){
      console.log(err);
    }

    else
    {    
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
            if(each_potential_match.anchor_retailer_id!==2){
            
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

          //Render the product_match page to select the matching product
          res.render(('product_match'),{results_array: results_array, product_tobematched: mobile_to_be_matched});

        }
      });     
    }

  });
    
});


//----------------------- Next Route -------------------------------

//Router to match the case when a potential match is found
router.post('/match_true', function (req, res) {

  //Select the product to be matched UUID. This is the product from shop_clues database
  var product_tobematched_uuid = req.body.product_tobematched_uuid;

  //Select the UUID of the shortlisted match. This is the product from the compared database
  var shortlisted_uuid = req.body.product_shortlisted_uuid;

  //Find the product_tobematched in the shop_clues mobiles db and fetch its data
  //which will be updated in the combined mobiles db
  shop_clues_Mobiles_Model.findOne({"product_id.uuid": product_tobematched_uuid}, function(err, product_tobematched){
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
        //Update the shop_clues_mobiles_model with the uuid of the shortlisted product
        shop_clues_Mobiles_Model.update({"product_id.uuid": product_tobematched_uuid}, {$set: {"internal_codes.status": "11111", "compared_db.product_uuid": shortlisted_uuid}}, function(err, results){

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


        });//shop_clues_Mobiles_Model.update ends

      }//else ends
        
    });//mobiles_compared_model update ends         

              
  });//shop_clues_mobiles_model findOne ends
     

});//route over


//----------------------- Next Route -------------------------------

//Router for the case wherein a wrong match is selected and we want to delete the match
router.post('/match_false', function (req, res) {

  //Select the product to be matched UUID. This is the product from shop_clues database
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
      
      //Update the shop_clues mobiles model internal_codes and compared_db reference
      shop_clues_Mobiles_Model.update({"product_id.uuid": product_tobematched_uuid}, {$set: {"internal_codes.status": "1111", "compared_db.product_uuid": "N/A"}}, function(err, results){

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

 var product_tobeskipped_uuid = req.body.product_tobeskipped_uuid;
  //var shortlisted_uuid = req.body.product_shortlisted_uuid;

  console.log("Product to be skipped from matching list is: ", product_tobeskipped_uuid);
  

  shop_clues_Mobiles_Model.update({"product_id.uuid": product_tobeskipped_uuid}, {$set: {"internal_codes.status":"01111" , "compared_db.product_uuid": "N/A"}}, function(err, results){

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


  });//shop_clues_Mobiles_Model update ends

});//router ends


//----------------------- Next Route -------------------------------

//Update match_false
router.post('/skip_match', function (req, res) {

  var product_tobeskipped_uuid = req.body.product_tobeskipped_uuid;
  //var shortlisted_uuid = req.body.product_shortlisted_uuid;

  console.log("Product to be skipped from matching list is: ", product_tobeskipped_uuid);
  

  shop_clues_Mobiles_Model.update({"product_id.uuid": product_tobeskipped_uuid}, {$set: {"internal_codes.status":"01111" , "compared_db.product_uuid": "N/A"}}, function(err, results){

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


  });//shop_clues_Mobiles_Model update ends


});//Route ends



//************************ Routes Over ****************************



module.exports = router;