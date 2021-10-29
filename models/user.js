const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId :  mongoose.Schema.Types.ObjectId,
    firstname :  String,
    lastname : String,
    username : String, //unique
    email : String,
    address : String,
    phone : Number, 
    authenticated : Boolean,

	profilePicture : String,
    nextOfKin : String,
    nextOfKinPhone: Number,
 	bankName:  String,
    accountNumber : String,
	
    smsVerifyCode : Number,
    smsVerified : Boolean
},
{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
