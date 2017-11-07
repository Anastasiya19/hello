//Project name - Tapovan

//Config.js file to hold all the configurations
// var amazon = require('amazon-product-api');

//Hostname
exports.hostname = 'localhost';

//Port
//exports.port = process.env.PORT || 3000;

//Database URL
exports.URL = process.env.DB_URL
    //exports.URL = 'mongodb://ankur:admin@ds133331.mlab.com:33331/ankur_test';
    //exports.URL = 'mongodb://localhost:27017/bot_database';
    //To connect using the mongo shell:
    //mongo ds123752.mlab.com:23752/tiger -u ankur -p ankur_tiger


//Session Secret
exports.sessionSecret = process.env.sessionSecret

//AWS details
exports.awsId = process.env.awsId
exports.awsSecret = process.env.awsSecret
exports.awsTag = process.env.awsTag

//Flipkart affiliate details
exports.fk_affiliate_id = process.env.fk_affiliate_id;
exports.fk_affiliate_token = process.env.fk_affiliate_token;

//API AI Bearer Token
exports.api_ai_developer_access_token = process.env.api_ai_developer_access_token;
exports.api_ai_client_access_token = process.env.api_ai_client_access_token;
exports.api_ai_request_url = 'https://api.api.ai/v1/query?v=20150910';

//API AI Intent IDs
exports.specifications_intent_id = "90b1d779-2e69-4e96-853e-49387b439886";
exports.comparison_intent_id = "ac3bf2d2-f66f-4893-95cc-fa307d61f4e6";
exports.suggestion_intent_id = "f18faa4f-a085-48a8-918b-c6b101252de6";

exports.specifications_followup = "ee27ea42-e2df-47dd-8e3a-633a86ab153c";
exports.comparison_followup = "effe1270-5f94-49f3-b96e-431c5d7706c2";

exports.unboxing_video = process.env.unboxing_video


//Wit.AI
exports.wit_bearer_token = process.env.wit_bearer_token;

// facebook OAuth credentials
exports.fbClientID = process.env.fbClientID
exports.fbClientSecret = process.env.fbClientSecret
exports.callbackURL = 'https://desolate-ocean-92900.herokuapp.com/user/facebook/callback';

// google OAuth credentials
exports.googleClient_secret = process.env.googleClient_secret
exports.googleClient_id = process.env.googleClient_id

// twitter OAuth credentials
exports.twitterConsumerKey = process.env.twitterConsumerKey
exports.twitterConsumerSecret = process.env.twitterConsumerSecret;


// the secret key for the token
exports.secretKey = process.env.secretKey;

// this for nodemailer
exports.email = process.env.EMAIL;
exports.password = process.env.PASSWORD;

//Logzio API token
exports.logzio_token = process.env.logzio_token;


//  facebook bot 
exports.FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN
exports.FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN

exports.APIAI_ACCESS_TOKEN = process.env.APIAI_ACCESS_TOKEN

exports.ALGOLIA_ID = process.env.ALGOLIA_ID;  //"095XP0P7JR"

exports.ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY

exports.ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY //"612911a1068b6981bf425a132fc4b027"