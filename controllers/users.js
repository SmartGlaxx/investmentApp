const mongoose = require('mongoose')
const User = require('../models/user')
const Auth = require('../models/auth')
const Transaction = require('../models/transactions')
const PaymentDetail = require('../models/paymentDetails')
const Investment = require('../models/investment')



//Admin endpoint
const adminGetUsersController = async(req, res)=>{
   try{ 
    const usersData = await User.find({})
    return res.status(200).json({usersData})
    }catch(error){
        res.status(500).json({error : "An error occured fetching users"})
    }
}

const getUserController = async(req, res)=>{
    const {id} = req.params
   try{ 
        const userData = User.findOne({_id : id})
        if(!userData){
            res.status(200).json({message : 'User with given id not found.'})
        }
        const newInvest = await User.create(req.body)
        res.status(200).json({newInvest})
    }catch(error){
        res.status(500).json({error})
    }
}

const createUserController = async(req,res)=>{
    const {id} = req.params
    try{
        const userData = User.findOne({_id : id})
        if(!userData){
            res.status(200).json({message : 'User with given id not found.'})
        }

        
        
        await User.create(req.body)
        }catch(error){
            res.status(500).json({error})
        }
}

const updateUserController = async(req, res)=>{
    const {id} = req.params
   try{ 
        const userData = User.findOne({_id : id})
        if(!userData){
            res.status(200).json({message : 'User with given id not found.'})
        }
        const newInvest = await User.create(req.body)
        res.status(200).json({newInvest})
    }catch(error){
        res.status(500).json({error})
    }
}

const deleteUserController = async(req, res)=>{
    const {id} = req.params
   try{ 
        const userData = User.findOne({_id : id})
        if(!userData){
            res.status(200).json({message : 'User with given id not found.'})
        }
        const newInvest = await User.create(req.body)
        res.status(200).json({newInvest})
    }catch(error){
        res.status(500).json({error})
    }
}



module.exports = {adminGetUsersController, getUserController, createUserController, updateUserController, deleteUserController}