const mongoose = require('mongoose')

const connection = (url)=>{
    return mongoose.connect(url,{
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
}

module.exports = connection