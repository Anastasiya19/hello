module.exports = function(req, res, next){

    if(req.query.key && req.query.key === "FB4K3LE2d"){
        next()
    }else{
        res.status(401)
        res.end()
    }
}