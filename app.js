//Project Name - sagarmatha
//Description - Chatbot to help find mobiles online
//Main Project File
//Date - 7th November 2017


//1. Load the required NPM Modules

//Server, view and database
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//User authentication and middleware
//******These modules have not been installed********
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const authenticate = require('./config/authenticate');
//******End********

//2. Load the Middleware
const bodyParser = require('body-parser');
const session = require('express-session');
const mongodbStore = require('connect-mongo')(session);
//******These modules have not been installed********
//const flash = require('connect-flash');
//******End********

//3. Load the Tools and Libraries
//const request = require('request');
const request = require('request-promise');
const diff = require('arr-diff');
const leven = require('leven');
const uuidV1 = require('uuid/v1');
const Q = require('q');
const _ = require('lodash');
const async = require("async");
const changeCase = require('change-case');
const S = require('string');
const groupArray = require('group-array');
const csv = require('csv');
const parser = csv.parse();
const fs = require('fs');
const apiai = require('apiai');
const {
    OperationHelper
} = require('apac'); //Amazon Node API
//******End********


//4. Load the helper files
const translate = require('@google-cloud/translate')({
    projectId: 'tapovan-f64b6',
    keyFilename: './config/tapovan-cba4df226897.json'
});
//******End********

//5. Load the configurations
const config = require('./config/config.js');
//******End********


//6. Load the necessary models
var mobiles_Compared_Model = require('./models/mobiles_compared_schema');
//******End********


//7. Build the Server 
var app = express();
//******End********

// //Secure traffic only
// app.all('*',function(req,res,next){
//   if(req.headers['x-forwarded-proto']!='https')
//     res.redirect('https://shrouded-crag-37871.herokuapp.com'+req.url)
//   else
//     next() /* Continue to other routes if we're not redirecting */
// })


//8. Block the header from containing information about the server
app.disable('x-powered-by');
//******End********


//9. Set the view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
//******End********

//10. Set the port
app.set('port', (process.env.PORT || 3000));
//******End********


//11. Connect to the database
mongoose.connect(config.URL, function(err, database) {
    if (err) return console.log(err)
    var db = database;
    console.log('Database ', db, ' connected');
});
//******End********


//12. Load the Amazon apac module configuration
const opHelper = new OperationHelper({
    awsId: config.awsId,
    awsSecret: config.awsSecret,
    assocId: config.awsTag,
    locale: 'IN'
});
//******End********



//13. Export the routers
var amazon_router = require('./routes/admin/amazon/amazon_route.js');
var flipkart_router = require('./routes/admin/flipkart/flipkart_route.js');
var gadgets_router = require('./routes/admin/gadgets_360/gadgets_route.js');
var paytm_router = require('./routes/admin/paytm/paytm_route.js');
var tata_cliq_router = require('./routes/admin/tata_cliq/tata_route.js');
var shop_clues_router = require('./routes/admin/shop_clues/shopclues_route.js');
var update_tags_router = require('./routes/admin/update_tags.js');
//******End********


//14. Write Middleware
app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text({
    type: 'text/plain'
}));
//******End********


//15. Load the models
var amazon_Mobiles_Model = require('./models/amazon_mobiles_schema');


//16. Router Middleware
app.use('/admin/amazon', amazon_router);
app.use('/admin/flipkart', flipkart_router);
app.use('/admin/gadgets', gadgets_router);
app.use('/admin/paytm', paytm_router);
app.use('/admin/tata_cliq', tata_cliq_router);
app.use('/admin/shop_clues', shop_clues_router);
app.use('/admin/update_tags', update_tags_router);


//********************** 9. Routes *********************************************
app.get('/', function(req, res) {
    res.send("Hi there!!")
    console.log("Get request received on the homepage. App is working");
});

//************************ Routes Over **************************************



// 10. Error handler on the app
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});


// 11. Start the Server
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});