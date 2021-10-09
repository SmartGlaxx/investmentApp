const mongoose = require('mongoose')

const paymentDetailsSchema = mongoose.Schema({
   paymentType : String,
   cardNumber : String,
   accountNumber : String,
   expiryDate : Date,
   BankName : String,
   userId : mongoose.Schema.Types.ObjectId,
   username : String
},
{ timestamps: true }
)

module.exports = mongoose.model('PaymentDetail', paymentDetailsSchema)