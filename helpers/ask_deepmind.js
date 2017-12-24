
const request = require("request-promise")
module.exports = function(api_response){

    return request({
        uri:"http://calm-depths-38465.herokuapp.com/sagarmatha_deepmind",
        method:"POST",
        json:true,
        body:api_response,
        headers:{
            "sagarmatha_deepmind":"sagarmatha_is_huge",
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}
