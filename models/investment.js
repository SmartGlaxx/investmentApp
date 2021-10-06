const mongoose = require('mongoose')

const investmentSchema = mongoose.Schema({
    amount : Number,
    packageName : String,
    interestRate : Number,
    totalInvestmentAndPofit : Number,
    maturityPeriod : Date,
    accountBalance : Number,
    userId : String
},
{ timestamps: true }
)

module.exports = mongoose.model('Investment', investmentSchema)