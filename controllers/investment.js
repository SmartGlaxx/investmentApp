const mongoose = require('mongoose')
const Investment = require('../models/investment')
const Auth = require('../models/auth')
const User = require('../models/user')
const Transaction = require('../models/transactions')
const PaymentDetail = require('../models/paymentDetails')

const adminGetInvestments = async(req, res)=>{
   try{ 
        const investmentData = await Investment.find({})
        if(!investmentData){
            return res.status(200).json({message : "Request error. Please retry."})
        }
        res.status(200).json({ Count : investmentData.length, investmentData})
    }catch(error){
        res.status(500).json({error})
    }
}

const getInvestments = async(req, res)=>{
    const {id} = req.params
    

   try{ 
        const investmentData = await Investment.find({userId : id})
        
        if(!investmentData){
            return res.status(200).json({message : "Request error. Please retry."})
        }
        // function diff_months(dt2, dt1) 
        // {
        // var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        // diff /= (60 * 60 * 24 * 7 * 4) ;
        // return Math.abs(Math.floor(diff - 2));
        // }

        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }
        const calcInvestment =async()=>{
            const thisPeriod = new Date()
            // const maturityMonth = thisPeriod.getMonth() + 6
            //const maturityDate =new Date().setMonth(maturityMonth)
            

        const investFulldata = await investmentData.map(item =>{

                const deposit = item.amount
                const package = item.packageName
                const interest = item.interestRate / 100
                const currentDate = thisPeriod
                const investmentDate = item.createdAt
                const maturityMonth = item.createdAt.getMonth() + 6
                const maturityDateNumber = new Date().setMonth(maturityMonth)
                const currentDuration = monthDiff(investmentDate, currentDate)
                const currentDurationValue = new Date(currentDuration)
                const profitValue = deposit * interest
                const cumulativeProfit = profitValue * currentDurationValue
                //const res = new Date(currentDration)
                const maturityFullDate = new Date(maturityDateNumber)
                
                return({deposit, package, interest, investmentDate, maturityFullDate, currentDate, investmentDate,
                     currentDuration, profitValue, currentDurationValue, cumulativeProfit})
            })
            
            return investFulldata
            
        }
      
       const response =  await calcInvestment()
       res.status(200).json({response})
    }catch(error){
        res.status(500).json({error})
    }
}

const getInvestment = async(req, res)=>{
    const {id, investmentId} = req.params
    
   try{        
        const investmentData = await Investment.find({_id : investmentId, userId : id})
                                                          
        if(!investmentData){
            return res.status(200).json({message : "Request error. Please retry."})
        }
        res.status(200).json({ Count : investmentData.length, investmentData})
    }catch(error){
        res.status(500).json({error})
    }
}

const createInvestment = async(req, res)=>{
       
   try{ 
        const {id} = req.params
        const {amount} = req.body
        const {packageName} = req.body
        const {interestRate} = req.body
        const userId = id
        const userData = await Auth.findOne({_id : id})
        const userProfile = await User.find({userId : id})
        const userInvestments = await Investment.find({userId : id})
        const userTransactions = await Transaction.find({userId : id})
        const userPaymentDetail = await PaymentDetail.find({userId : id})
        

        if(!userData){
            return res.status(200).json({message : "User with given id not found."})
        }
        // if(!userInvestments){
        //     return userInvestments = []
        // }
        // if(!userTransactions){
        //     return userTransactions = []
        // }
        // if(!userPaymentDetail){
        //     return userPaymentDetail = {}
        // }
        // if(!userProfile && !userProfile.profilePicture){
        //     return profilePicture = 'Profile Picture'
        // }

        // const d = new Date()
        // const date = d.getDate()
        // const month = d.getMonth()
        // const year = d.getFullYear()

        // const investmentsDate = new Date.now()
        // const investmentMonth = investmentsDate.getMonth()

        const maturityDate = new Date();
        const thisPeriod = new Date();
        const thisMonth  = thisPeriod.getMonth()
        const maturityMonth = thisMonth + 6
        maturityDate.setMonth(maturityMonth);


        // const userAccountBalance = investments.



        // const getInvementDetails = async()=>{
    
        //     const profit = await userInvestments.map(item =>{
        //         const deposit = item.amount
        //         const package = item.packageName
        //         const interest = item.interestRate / 100
        //         const currentDate = thisPeriod
        //         const maturityDate = maturityDate
        //         const currentDration = currentDate - item.create
        //         const profitValue = deposit * interest
        //         const cumulativeProfit = profitValue * currentDration
        //         return profitValue
        //     })
        // }
        // getInvementDetails()

        const invetmentInfo = {
            amount,
            packageName,
            interestRate,
            maturityDate,
            userId 
        }

        console.log('req,body',invetmentInfo)
        const investData = await Investment.create({invetmentInfo})
        res.status(200).json({invetmentInfo})
    }catch(error){
        res.status(500).json({error})
    }
}


module.exports = {adminGetInvestments, getInvestments, getInvestment, createInvestment}