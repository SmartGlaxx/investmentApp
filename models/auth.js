const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    // firstname : {
    //     type : String,
    //    // required : [true, 'Please enter your first name.'],
    //     trim : true
    // },
    // lastname : {
    //     type : String,
    //    // required : [true, 'Please enter your last name.'],
    //     trim : true
    // },
    username : {
        type : String,
        required : [true, 'Please enter a username.'],
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : [true, 'Please enter your email.'],
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : [true, 'Please enter a Password.'],
        minLength : [8, 'Password should not be less than 8 characters']
    }
})

module.exports = mongoose.model('Auth', authSchema)