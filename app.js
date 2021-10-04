require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/user')
const investRouter = require('./routes/investment')
const paymentRouter = require('./routes/paymentDetails')
const transactiontRouter = require('./routes/transactions')
const connection = require('./db/connect')
const { urlencoded } = require('express')

const PORT = process.env.PORT || 5000
const app = express()

app.use(urlencoded({extended : false}))
app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/invest', investRouter)
app.use('/api/v1/payment-details', paymentRouter)
app.use('/api/v1/transactions', transactiontRouter)

const starter = async()=>{
    await connection(process.env.DB_CONNECTION)
    app.listen(PORT, ()=>{
        console.log('App is running')
    })    
}

starter()