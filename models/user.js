// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var favoritePhones = new Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mobiles_compared_model'
    },
    phone_name:String,
    phone_brand:String,
    phone_price:String

})
// create a schema
var User = new Schema({


    recipientId: {type: String},
    OauthId: String,
    OauthToken: String,
    locale: String,
    timezone: Number,
    gender: String,

    user_id:{
        type:String,
        required:true
    },
    
    firstName: {
        type: String,
        required: true
        // unique: true
    },

    lastName: {
        type: String,
        //required: true
        // unique: true
    },

    email: {
        type: String,
        //required: true,
        //unique: true
    },

    password: {
        type: String,
        //required: true
        // unique: true
    },

    admin:{
        type:Boolean,
        default:false
    },

    platform:{
        type:String,
    },

    favorite:[favoritePhones],
    requested_phones:[String],
    profile_pic:String

}, {
    timestamps: true
});

// this is the plugin that will handle the authentication and password encryption
// passing the email as usernameField because we are authenticating using the email
User.plugin(passportLocalMongoose, {usernameField:'email'});

module.exports = mongoose.model('User', User);

