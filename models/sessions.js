// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var Session = new Schema({


    sessionId: String,

}, {
    timestamps: true
}, {
    createdAt: {
        type: Date,
        expires: 3600
    }
});


module.exports = mongoose.model('Session', Session);