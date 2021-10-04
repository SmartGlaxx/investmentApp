const mongoose = require('mongoose')
const PaymentDetail = require('../models/paymentDetails')
const Auth = require('../models/auth')


const getPaymentDetail = async(req, res)=>{
    const {id} = req.params
   try{ 
        const userData = await PaymentDetail.findOne({userId : id})
        
        if(!userData._id){
            return res.status(200).json({message : 'User with given id not found.'})
        }
        
        res.status(200).json({count : userData.length, userData})
    }catch(error){
        res.status(500).json({error})
    }
}

const createPaymentDetail = async(req, res)=>{
    const {id} = req.params
   try{ 

       //Hash some values

        const userAuthData = await Auth.findOne({_id : id})
        const userCreateData = await PaymentDetail.findOne({userId : id})
        if(!userAuthData._id){
            return res.status(200).json({message : 'User with given id not found.'})
        }
         if(userCreateData){
            return res.status(200).json({message : `Payment details already created. Click on Update to update it.`})
        }
        const paymentData = await PaymentDetail.create(req.body)
        if(!paymentData){
            return  res.status(200).json({message : "Payment details not created due to request error."})
        }
        res.status(200).json({paymentData})
    }catch(error){
        res.status(500).json({error})
    }
}

const updatePaymentDetail = async(req, res)=>{
    const {id} = req.params
   try{ 
        const userData = await Auth.findOne({_id : id})
       
        if(!userData._id){
            return res.status(200).json({message : 'User with given id not found.'})
        }
        const paymentData = await PaymentDetail.findOneAndUpdate({userId : id},req.body,{
            runValidators : true,
            new : true
        })
        if(!paymentData){
            return res.status(500).json({message : "No payment details set up for this user. Please set-up your payment details."})
        }
        res.status(200).json({paymentData})
    }catch(error){
        res.status(500).json({error})
    }
}

const deletePaymentDetail = async(req, res)=>{
    const {id} = req.params
   try{ 
        const userData = await Auth.findOne({_id : id})
       
        if(!userData._id){
           return res.status(200).json({message : 'User with given id not found.'})
        }
        const daleteData = await PaymentDetail.findOneAndDelete({userId : id})
        if(!daleteData){
            return res.status(200).json({message : "Payment details not found."})
        }
        res.status(200).json({daleteData})
    }catch(error){
        res.status(500).json({error})
    }
}


module.exports = { getPaymentDetail, createPaymentDetail, updatePaymentDetail ,deletePaymentDetail }