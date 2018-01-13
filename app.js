// Project Name - sagarmatha
// Description - Chatbot to help find mobiles online
// Main Project File
// Date - 7th November 2017

// 1. Load the required NPM Modules

// Server, view and database
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

// 2. Load the Middleware
const bodyParser = require('body-parser')
const session = require('express-session')
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser')
const mongodbStore = require('connect-mongo')(session)
var serve_favicon = require("serve-favicon")
// ******These modules have not been installed********
// const flash = require('connect-flash')
// ******End********

// 3. Load the Tools and Libraries
// const request = require('request')
const request = require('request-promise')
const diff = require('arr-diff')
const leven = require('leven')
const uuidV1 = require('uuid/v1')
const Q = require('q')
const _ = require('lodash')
const async = require('async')
const changeCase = require('change-case')
const S = require('string')
const groupArray = require('group-array')
const csv = require('csv')
const parser = csv.parse()
const fs = require('fs')
const apiai = require('apiai')
const path = require('path')

const ask_deepmind = require("./helpers/ask_deepmind")
const basic_security_check = require('./helpers/basic_security_check')
// ******End********

// 4. Search tools
const algoliasearch = require('algoliasearch')
const client = algoliasearch('TBPDVKM9DO', '2077f6df0f3bec27edb8492581d9bbd2')

// Create an index and add objects in it
var index = client.initIndex('suggested_questions')

// ******End********

// 4. Load the helper files
const translate = require('@google-cloud/translate')({
  projectId: 'tapovan-f64b6',
  keyFilename: './config/tapovan-cba4df226897.json'
})

const format_functions = require('./helpers/query_format/format_functions.js')
// const handlebars_helpers = require("./helpers/carousel/handlebars_helpers")

// ******End********

// 5. Load the configurations
const config = require('./config/config.js')
// ******End********

// 7. Build the Server 
var app = express()
// ******End********

app.use(serve_favicon(path.join(__dirname,"/public/build/assets/images/favicon-96x96.png")))
app.use(cookieSession({
  name: 'session',
  keys: ["1Kd0Uy6nS"],
 
  // Cookie Options
  maxAge: 10 * 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(cookieParser())

// //Secure traffic only
// app.all('*',function(req,res,next){
//   if(req.headers['x-forwarded-proto']!='https')
//     res.redirect('https://shrouded-crag-37871.herokuapp.com'+req.url)
//   else
//     next() /* Continue to other routes if we're not redirecting */
// })

// 8. Block the header from containing information about the server
app.disable('x-powered-by')
// ******End********

// 9. Set the view engine
// register the helpers
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  // helpers: handlebars_helpers,
  defaultLayout: 'client'
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')
// ******End********

// 10. Set the port
app.set('port', (process.env.PORT || 3000))
// ******End********

// 11. Connect to the database
mongoose.connect(config.URL, function (err, database) {
  if (err) return console.log(err)
  var db = database
  console.log('Database ', db, ' connected')
})
// ******End********

// 14. Write Middleware
app.use('/assets', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(bodyParser.text({
  type: 'text/plain'
}))
// ******End********

// ********************** 9. Routes *********************************************
// Secure traffic only
app.all('*', function(req, res, next){
  //   console.log('req start: ',req.secure, req.hostname, req.url, app.get('port'), req.protocol,"https ",req.get('X-Forwarded-Protocol'))
  // //if (req.protocol === "https"|| process.env.NODE_ENV === "development") {
  //   
  // //}

  console.log("Environment ",process.env.NODE_ENV)
  return next()
 //res.redirect('https://'+req.hostname+req.url); //':'+app.get('secPort')+
})

app.get('/', function (req, res) {
  res.render('home')

})

// Next Route-------------------------------------------------------------
app.get('/home', function (req, res) {
  res.render('home')

})

// Next Route-------------------------------------------------------------
app.get('/explainer_video', function (req, res) {
  res.render('home')

})

// Next Route-------------------------------------------------------------
app.get('/vinci_commands', function (req, res) {
  res.render('home')
  
})

// Next Route-------------------------------------------------------------
app.get('/chat', function (req, res) {
  
  res.sendFile(path.join(__dirname, './public/chat.html'))
  
})

// Next Route-------------------------------------------------------------
app.get('/visitor_agreement', function (req, res) {

  res.render('visitor_agreement')

})

// Next Route-------------------------------------------------------------
app.get('/privacy_policy', function (req, res) {

  res.render('privacy_policy')

})

// Next Route-------------------------------------------------------------
app.get('/terms_and_conditions', function (req, res) {

  res.render('terms_and_conditions')

})



// Next Route-------------------------------------------------------------
app.get('/blog', function (req, res) {

  res.render('home')

})



const default_active_list = {
  attributes : [],
  attributes_composite_entity : [],
  battery_value : [],
  brands : [],
  camera_pixels : [],
  colors : [],
  comparator : [],
  formal_price : [],
  mobiles : [],
  operating_system : [],
  price_comment : [],
  processor_core : [],
  processor_speed : [],
  query_parsed_mobiles : [],
  ram_capacity : [],
  retailers : [],
  screen_size : [],
  storage_capacity : [],
  suggestion_composite_entity : [],
  tags : [],
  intentId: [],
  criteria_finalized_status: 0, 
  criteria_process_count: 0
};
// Next Route-------------------------------------------------------------
// Route for processing the chat message received from frontend 
app.post('/hellovinciai', function (req, res) {

  console.log('This is the request text: ', req.body.api_request_text)

  if(req.body.api_request_text !== undefined && req.body.api_request_text !== null){

      console.log("message is not undefined");

      console.log("This is message length: ", req.body.api_request_text.length);

      if(req.body.api_request_text.length < 80){

        if(!req.session.active_list){  
          req.session.active_list = default_active_list;
        }
        // req.body.active_list = JSON.parse(req.body.active_list)


        // Preparing the request to be sent to API AI
        var requestData = {
          query: req.body.api_request_text,
          lang: 'en',
          sessionId: '1234567890',
          originalRequest: {
            source: 'slack_testbot',
            data: {
              all_discussed_list: req.body.all_discussed_list,
              active_list: req.session.active_list
            }
          }
        }

        // Helper functions to convert megapixel to mp and give spacing to mah and mp
        requestData.query = format_functions.megapixel_replace(requestData.query)
        requestData.query = format_functions.battery_spacing(requestData.query)
        requestData.query = format_functions.camera_spacing(requestData.query)


        // Sending the request to API AI
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
          console.log('This is response on API AI which is sent back to frontend: ', response)


          // batman true
          if (config.intent_ids.indexOf(response.result.metadata.intentId) > -1) {

            response.originalRequest = requestData.originalRequest

            return ask_deepmind(response).then(result => {
              req.session.active_list = result.data.active_list
              res.send({
                web_reply: result,
                status: response.status,
                batman: 'true' // response.result.metadata.webhookUsed
              })
            })

          }

          else {
            // batman is the alias for webhook
            return res.send({
              web_reply: response.result.fulfillment,
              status: response.status,
              batman: response.result.metadata.webhookUsed
            })
          }
        })
        .catch(function (err) {
            console.log('err ', err)
            var reply = {
              speech: 'Houston we are working on fixing the problem'
            }

            res.send({
              web_reply: reply,
              status: 500,
              batman: 'false'
            })
        })





      }

      else{


        var reply = {
        speech: 'Looks like you are trying to test me out. Caught you. Lol'
        }

        res.send({
          web_reply: reply,
          status: 500,
          batman: 'false'
        })
      

      }


  }

  else{

    

      var reply = {
        speech: 'Seems like, I got an empty message'
      }

      res.send({
        web_reply: reply,
        status: 500,
        batman: 'false'
      })


  }


})

// Next Route-------------------------------------------------------------
// Route for processing the chat message received from frontend 
app.post('/hellovincisearch', function (req, res) {

  // Search the index
  index.search(req.body.input_query, function (err, content) {
    console.log(content.hits)

    var reply = []

    if (content.hits.length > 0) {
      content.hits.forEach(get_only_question)

      function get_only_question (element, index, array) {
        reply.push(element.question)
      }
    }

    res.send({
      results: reply
    })
  })
})

app.post('/get_more', function (req, res, next) {
  request({
    uri: config.deepmind_host + '/product/query',
    method: 'POST',
    body: req.body,
    json: true
  }).then(mobiles => {
    res.json(mobiles)
  }).catch(err => {
    res.json(err)
  })
})

app.post('/product/update_reactions', function (req, res, next) {
  request({
    uri: config.deepmind_host + '/product/update_reactions',
    method: 'POST',
    body: req.body,
    json: true
  }).then(response => {
    res.json(response)
  }).catch(err => {
    res.json(err)
  })
})


app.post('/product/reviews', function (req, res, next) {
  request({
    uri: config.deepmind_host + '/product/reviews',
    method: 'POST',
    body: req.body,
    json: true
  }).then(response => {
    res.json(response)
  }).catch(err => {
    res.json(err)
  })
})

app.post('/product/filter_reviews', function (req, res, next) {
  request({
    uri: config.deepmind_host + '/product/filter_reviews',
    method: 'POST',
    body: req.body,
    json: true
  }).then(response => {
    res.json(response)
  }).catch(err => {
    res.json(err)
  })
})


// ************************ Routes Over **************************************

// 10. Error handler on the app
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// 11. Start the Server
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
