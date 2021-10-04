const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    deposit : Number, 
    withdrawals : Number,
    balance : Number,
    userId : String
},
{ timestamps: true }
)

module.exports = mongoose.model('Transaction', transactionSchema)