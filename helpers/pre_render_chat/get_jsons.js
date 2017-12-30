const request = require("request-promise"),
fs = require("fs"),
path = require("path"),
Q = require("q");

//----------------- query strings -------------------------------------
// just place the quey here in the form field=value  no spaces 
// for more than one value for the same field use "," e.g. product_tags=bestseller,latest
// add & after each field=value

var qs = "product_basic_info.productBrand_normalized=Samsung";

function get_query(){

    qs = qs.replace(".","%2E")
    qs = qs.replace(",","%2C")
    
    request({
        uri:"https://calm-depths-38465.herokuapp.com/product/query?"+qs,
        method:"GET",
        json:true
    }).then(response=>{
        console.log('response')
    
        let file_name = qs.match(/(=|%2C)(\w+)/g).map(s=>s.replace("=","").replace("%2E",".").replace("%2C","&")).join("_")
        console.log('file ',file_name)
    
        fs.writeFile(path.join(__dirname,"../../jsons/"+ file_name +".json"),JSON.stringify(response),function(err){
            if(err) console.log("error saving json ",err);
    
            console.log("done")
    
        })
    })
}


/**
 * Post a question to our webhook and save the 
 * json in the josns folder with filename as the question and spaces replaced by "_"
 * @param {String} question tha question that will be sent
 */
function post_question_save_json(question){
    var deferred = Q.defer()
    
    request({
        uri:"http://arcane-woodland-93357.herokuapp.com/hellovinciai",
        method:"POST",
        body:{
            active_list:"{}",
            api_request_text:question,
            all_discussed_list:"{}"
        },
        json:true
    }).then(response=>{


        fs.writeFile(path.join(__dirname,"../../jsons/"+ question.replace(/\s/g,"_") +".json"),JSON.stringify(response),function(err){
            if(err) console.log("error saving json ",err);
    
            console.log("done")
            deferred.resolve()
        })
    })
    return deferred.promise
}
post_question_save_json("Show me phones with fingerprint scanner");
module.exports = post_question_save_json;
// post_question_save_json(" HTC phones")
// get_query()
