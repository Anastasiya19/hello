//'/admin/update_tags'


const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const config = require('../../config/config.js');
const mobiles_Compared_Model = require('../../models/mobiles_compared_schema.js');
const mongoose = require('mongoose')
const _ = require('lodash')
mongoose.Promise = global.Promise;

router.use(bodyParser.json());


router.get('/', function (req, res, next) {

    res.render('update_tags')


})

router.post('/', function (req, res, next) {

    console.log('body ', req.body)
   
    var update = {}
    update["product_tags." + req.body.tag] = req.body.enable
    mobiles_Compared_Model.update({ "product_basic_info.normalized_name": req.body.normalized_name },
     update ,
     {multi: true}).then(updated => {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('tag updated  ');
        console.log(' updated ', updated)
    }).catch(err=>{
        
        console.log('err updating ',err)
        res.status(500).json({err: err});
    })
})

router.get('/normalized_name/:phone', function (req, res, next) {
    mobiles_Compared_Model.findOne({ "product_basic_info.normalized_name": req.params.phone }).then(function (phone) {

        res.json(phone)
    }).catch(err => {


        res.json(err)
    })


})

router.get('/:tag', function (req, res, next) {
    var query_object = {}
    query_object["product_tags." + req.params.tag] = true
    mobiles_Compared_Model.find(query_object,{"product_basic_info.normalized_name": 1}).then(function (phones) {
        console.log(phones)
        phones = _.uniqBy(phones, "product_basic_info.normalized_name")
        res.render("tag",{phones_array: phones})

    }).catch(err => {


        res.status(500).json({err: err});
    })


})



module.exports = router;
