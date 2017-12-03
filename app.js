//Project Name - sagarmatha
//Description - Chatbot to help find mobiles online
//Main Project File
//Date - 7th November 2017


//1. Load the required NPM Modules

//Server, view and database
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');


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
//******End********

//4. Search tools
const algoliasearch = require('algoliasearch');
const client = algoliasearch('TBPDVKM9DO', '2077f6df0f3bec27edb8492581d9bbd2');

//Create an index and add objects in it
var index = client.initIndex('suggested_questions');

//******End********





//4. Load the helper files
const translate = require('@google-cloud/translate')({
    projectId: 'tapovan-f64b6',
    keyFilename: './config/tapovan-cba4df226897.json'
});

const format_functions = require('./helpers/query_format/format_functions.js');

//******End********

//5. Load the configurations
const config = require('./config/config.js');
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
    defaultLayout: 'client'
}));

app.set('view engine', 'handlebars');
//******End********

//10. Set the port
app.set('port', (process.env.PORT || 3000));
//******End********


//11. Connect to the database
mongoose.connect(config.URL, function (err, database) {
    if (err) return console.log(err)
    var db = database;
    console.log('Database ', db, ' connected');
});
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




//********************** 9. Routes *********************************************
app.get('/', function (req, res) {
    res.render('home');
    console.log("Get request received on the homepage. App is working");
});

//Next Route-------------------------------------------------------------
app.get('/home', function (req, res) {
    res.render('home');
    console.log("Get request received on the homepage. App is working");
});


//Next Route-------------------------------------------------------------
app.get('/explainer_video', function (req, res) {
    res.render('explainer_video');
    console.log("Get request received on the homepage. App is working");
});

//Next Route-------------------------------------------------------------
app.get('/vinci_commands', function (req, res) {
    res.render('vinci_commands');
    console.log("Get request received on the homepage. App is working");
});

//Next Route-------------------------------------------------------------
app.get('/chat', function (req, res) {
    console.log("Request hit the client home route");
    res.render('chat');
    console.log("Get request received on the homepage. App is working");
});


//Next Route-------------------------------------------------------------
app.get('/faqs', function (req, res) {
    console.log("Request hit the client home route");
    res.render('home');
    console.log("Get request received on the homepage. App is working");
});

//Next Route-------------------------------------------------------------
app.get('/privacy_policy', function (req, res) {
    console.log("Request hit the client home route");
    res.render('home');
    console.log("Get request received on the homepage. App is working");
});

//Next Route-------------------------------------------------------------
app.get('/blog', function (req, res) {
    console.log("Request hit the client home route");
    res.render('home');
    console.log("Get request received on the homepage. App is working");
});

//Next Route-------------------------------------------------------------
//Route for processing the chat message received from frontend 
app.post('/hellovinciai', function (req, res) {

    console.log("This is the body of the request received from the frontend: ", req.body);
    console.log("This is the request text: ", req.body.api_request_text);
    console.log("This is the active_list mobiles before JSON parse: ", req.body.active_list);

    req.body.active_list = JSON.parse(req.body.active_list);

    console.log("This is the active_list mobiles after JSON parse: ", req.body.active_list);


    //Preparing the request to be sent to API AI
    var requestData = {
        query: req.body.api_request_text,
        lang: "en",
        sessionId: "1234567890",
        originalRequest: {
            source: "slack_testbot",
            data: {
                all_discussed_list: req.body.all_discussed_list,
                active_list: req.body.active_list
            }
        }
    };


    //Helper functions to convert megapixel to mp and give spacing to mah and mp
    requestData.query = format_functions.megapixel_replace(requestData.query);
    requestData.query = format_functions.battery_spacing(requestData.query);
    requestData.query = format_functions.camera_spacing(requestData.query);


    //Sending the request to API AI
    request({
        uri: config.api_ai_request_url,
        method: 'POST',
        json: true,
        body: requestData,
        headers: {
            'Authorization': config.api_ai_client_access_token,
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (response) {
        console.log("This is response on API AI which is sent back to frontend: ", response);
        console.log("Request processing over: Sending the processed data back to the client");

        //batman is the alias for webhook
        res.send({
            web_reply: response.result.fulfillment,
            status: response.status,
            batman: response.result.metadata.webhookUsed
        });
    })
        .catch(function (err) {
            console.log('err ', err);
            var reply = {
                speech: "Houston we are working on fixing the problem"
            }

            res.send({
                web_reply: reply,
                status: 500,
                batman: "false"
            });

        });

});


//Next Route-------------------------------------------------------------
//Route for processing the chat message received from frontend 
app.post('/hellovincisearch', function (req, res) {

    console.log("This is the request text received on backend: ", req.body.input_query);

    //Search the index
    index.search(req.body.input_query, function (err, content) {
        console.log(content.hits);

        var reply = [];

        if (content.hits.length > 0) {

            content.hits.forEach(get_only_question);

            function get_only_question(element, index, array) {
                reply.push(element.question);
            }

        }

        res.send({
            results: reply
        });

    });

});


app.post("/get_more", function (req, res, next) {

    request({
        uri: "https://calm-depths-38465.herokuapp.com/product/query",
        method: "POST",
        body: req.body
    }).then(mobiles=>{
        res.json(mobiles)
    })
})

//************************ Routes Over **************************************



// 10. Error handler on the app
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});


// 11. Start the Server
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});