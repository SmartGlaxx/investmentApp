const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : [true, 'Please enter a name.'],
        trim : true
    },
    lastname : {
        type : String,
        required : [true, 'Please enter a name.'],
        trim : true
    },
    email : {
        type : String,
        required : [true, 'Please enter an email.'],
        trim : true
    },
    password : {
        type : String,
        required : [true, 'Please enter an Password.'],
        maxlenght : [30, 'Password shold be less than 30 characters'],
        minlenght : [8, 'Password shol not be less than 8 characters']
    }
})

module.exports = mongoose.model('Auth', authSchema)