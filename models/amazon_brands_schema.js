//Need to add Prime and COD status
//mongo ds123752.mlab.com:23752/tiger -u ankur -p ankur_tiger

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var amazon_brands_Schema = new Schema({ 
    
    //Retailer name and ID
    brand_name: 
    {

        type: String,
        unique: true
    
    },

    
//************** Status data begins *********************

    //Relevant status to check product relevance, brand relevance and product match
    internal_codes:{
        
        status:{
            type: String,
            default: "-1"
        },

        //-1 : New Brand
        //0  : Brand not relevant
        //1  : Brand relevant        

    }

 }, 
    {
    timestamps: true
});



// the schema is useless so far
// we need to create a model using it. Compile the model from the Schema
var amazon_Brands_Model = mongoose.model('amazon_brand', amazon_brands_Schema);



// make this available to our Node applications
module.exports = amazon_Brands_Model;



