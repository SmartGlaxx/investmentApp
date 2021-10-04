const mongoose = require('mongoose')
const Transaction = require('../models/transactions')
const Auth = require('../models/auth')

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
    const {id} = req.params
   try{ 
        const transactionData = await Transaction.find({userId : id})
        if(!transactionData){
            return res.status(200).json({message : "Request error. Please retry."})
        }
        res.status(200).json({ Count : transactionData.length, transactionData})
    }catch(error){
        res.status(500).json({error})
    }
}

const createTransaction = async(req, res)=>{
    const {id} = req.params
   try{ 
        const userData = await Auth.findOne({_id : id})
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