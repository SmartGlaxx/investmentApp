const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId : String,
    firstname :  String,
    lastname : String,
    email : String,
    // password : String,
    profilePicture : String,
    // paymentDetails : Object,
    address : String
},
{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)