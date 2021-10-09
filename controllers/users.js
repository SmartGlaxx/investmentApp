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
    return res.status(200).json({Count: usersData.length ,usersData})
    }catch(error){
        res.status(500).json({error : "An error occured fetching users"})
    }
}

const getUserController = async(req, res)=>{
    const {id, username} = req.params

   try{ 
        const userData = await User.findOne({userId : id, username : username})
        if(!userData){
            return res.status(200).json({message : 'User with given id not found.'})
        }
        res.status(200).json({userData})
    }catch(error){
        res.status(500).json({error})
    }
}

const createUserController = async(req,res)=>{
    const {id} = req.params
    const {username} = req.body
    try{
        const userData = await Auth.findOne({_id : id})
        const UserIdAlreadyExists = await User.findOne({userId : id})
        const foundUsername = await User.findOne({username : username})
        if(!userData){
            return res.status(200).json({message : 'User with given id not found.'})
        }
       
        if(UserIdAlreadyExists){
            return res.status(200).json({message : 'User already created. Update your profile instead.'})
        }
        if(foundUsername){
            return res.status(200).json({message : 'Sorry, username already used. Choose a different one.'})
        }
        const postData = await User.create(req.body)
        res.status(200).json({message : "Success",postData })
        }catch(error){
            res.status(500).json({error})
        }
}


const updateUserController = async(req, res)=>{
    const {id, username} = req.params
   try{ 
        const userData = await User.findOne({userId : id, username : username})
        if(!userData){
            return res.status(200).json({message : 'User with given id not found.'})
        }
        const newInvest = await User.findOneAndUpdate({userId : id}, req.body, {
            runValidators : true,
            new : true
        })
        res.status(200).json({newInvest})
    }catch(error){
        res.status(500).json({error})
    }
}

const deleteUserController = async(req, res)=>{
    const {id, username} = req.params
   try{ 
        const userData = await User.findOne({userId : id, username : username})
        if(!userData){
            return res.status(200).json({message : 'User with given id not found.'})
        }
        const newInvest = await User.findOneAndDelete({userId : id}, req.body)
        res.status(200).json({newInvest})
    }catch(error){
        res.status(500).json({error})
    }
}



module.exports = {adminGetUsersController, getUserController, createUserController, updateUserController, deleteUserController}