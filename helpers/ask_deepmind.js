
const request = require("request-promise")

/**
 * this function will forward api ai response to our webhook 
 * @param {Object} api_response 
 */

module.exports = function(api_response){
    // for local development
    var uri = (process.env.NODE_ENV === "development")?
     "http://localhost:8080/sagarmatha_deepmind":
     "http://calm-depths-38465.herokuapp.com/sagarmatha_deepmind";
     // send request to our webhook
    return request({
        uri:uri,
        method:"POST",
        json:true,
        body:api_response,
        headers:{
            "sagarmatha_deepmind":"sagarmatha_is_huge",
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}
