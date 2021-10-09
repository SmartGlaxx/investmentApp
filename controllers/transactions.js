const mongoose = require('mongoose')
const Transaction = require('../models/transactions')
const Auth = require('../models/auth')
const User = require('../models/user')

//admin endpoint
const adminGetTransactions = async(req, res)=>{
   try{ 
        const transactionData = await Transaction.find({})
        if(!transactionData){
            return res.status(200).json({message : "Request error. Please retry."})
        }
        res.status(200).json({ Count : transactionData.length, transactionData})
    }catch(error){
        res.status(500).json({error})
    }
}

const getTransaction = async(req, res)=>{
    const {id, transactionId} = req.params
   try{ 
        const transactionData = await Transaction.find({ _id : transactionId, userId : id})
        if(!transactionData){
            return res.status(200).json({message : "Request error. Please retry."})
        }
        res.status(200).json({ Count : transactionData.length, transactionData})
    }catch(error){
        res.status(500).json({error})
    }
}


const getTransactions = async(req, res)=>{
    const {id, username} = req.params
   try{ 
        const transactionData = await Transaction.find({userId : id, username : username})
        if(!transactionData){
            return res.status(200).json({message : "Request error. Please retry."})
        }
        const deposits = []
        const withdrawals = []
        const transactionFullData = await transactionData.map(item =>{
            
            const userId = item.userId
            const deposit = item.deposit
            const withdrawal = item.withdrawal
            const createdAt = item.createdAt

            if(deposit){
                deposits.push(deposit)
            }
            if(withdrawal){
                withdrawals.push(withdrawal)
            }
            

        })
        const totalWithdrawals = withdrawals.reduce((accuulator, currentValue)=>{
            return accuulator + currentValue
        },0)
        const totalDeposits = deposits.reduce((accuulator, currentValue)=>{
            return accuulator + currentValue
        },0)

        transactionData.push({'totalDeposits' : totalDeposits,'totalWithdrawals' : totalWithdrawals})
        res.status(200).json({ Count : transactionData.length, transactionData})
    }catch(error){
        res.status(500).json({error})
    }
}

const createTransaction = async(req, res)=>{
    const {id, username} = req.params
   try{ 
        const userData = await User.findOne({userId : id, username : username})
        if(!userData._id){
            return res.status(200).json({message : 'User with given id not found.'})
        }
        const transactionData = await Transaction.create(req.body)
        res.status(200).json({transactionData})
    }catch(error){
        res.status(500).json({error})
    }
}


module.exports = {adminGetTransactions, getTransaction, getTransactions, createTransaction}