const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    deposit : Number, 
    withdrawal : Number,
    balance : Number,
    userId : String
},
{ timestamps: true }
)

module.exports = mongoose.model('Transaction', transactionSchema)