const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId : String,
    firstname :  String,
    lastname : String,
    username : String, //unique
    email : String,
    profilePicture : String,
    address : String,
    phone : Number, 
    authenticated : Boolean
},
{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)