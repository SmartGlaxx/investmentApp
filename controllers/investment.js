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

        
        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }
        const calcInvestment =async()=>{
        const thisPeriod = new Date()
        
        const investments = []
        const profits = []
        
        let totalinvestmentAndProfit = 0
        const investFulldata = await investmentData.map(item =>{
                const userId = item.userId
                const _id = item._id
                const deposit = item.amount
                const package = item.packageName
                const interest = item.interestRate / 100
                const currentDate = thisPeriod
                // const currentDate = new Date(2022, 03, 10)
                const investmentDate = item.createdAt
                const maturityMonth = item.createdAt.getMonth() + 6  //6 or investment duration choosen for plan
                const maturityDateNumber = new Date(item.createdAt).setMonth(maturityMonth)
                let investmentDuration = monthDiff(investmentDate, currentDate)
                const profitPerMonth = deposit * interest
                let cumulativeProfit = profitPerMonth * investmentDuration
                const maturityFullDate = new Date(maturityDateNumber)
              
                if(currentDate >= maturityFullDate){
                    investmentDuration = 6  //6 or investment duration choosen for plan
                    cumulativeProfit = profitPerMonth * investmentDuration
                    
                    investments.push(item.amount)
                    profits.push(profitPerMonth)   

                    const totalInvestment =  investments.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue;
                    }, 0);
    
                    const totalProfit =  profits.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue;
                    }, 0);
    
                        totalinvestmentAndProfit = totalInvestment + totalProfit
                      

                    return({_id, deposit, package, interest, investmentDate, maturityFullDate, currentDate, investmentDate,
                        investmentDuration, profitPerMonth, cumulativeProfit, userId, totalinvestmentAndProfit, totalInvestment, totalProfit})
                }else{
                    investments.push(item.amount)
                    profits.push(profitPerMonth)   

                    const totalInvestment =  investments.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue;
                    }, 0);
    
                    const totalProfit =  profits.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue;
                    }, 0);
    
                        totalinvestmentAndProfit = totalInvestment + totalProfit
                    

                    return({_id, deposit, package, interest, investmentDate, maturityFullDate, currentDate, investmentDate,
                        investmentDuration, profitPerMonth, cumulativeProfit, userId, totalinvestmentAndProfit, totalInvestment, totalProfit})
                }
                        
            })
                      
           
            //    const totalInvestment =  investments.reduce(function(accumulator, currentValue) {
            //     return accumulator + currentValue;
            //     }, 0);

            //     const totalProfit =  profits.reduce(function(accumulator, currentValue) {
            //     return accumulator + currentValue;
            //     }, 0);

            //      totalinvestmentAndProfit = totalInvestment + totalProfit
              
            // investFulldata.push({
            //     'totalInvestment':totalInvestment, 
            //     'totalProfit' : totalProfit, 
            //     'totalinvestmentAndProfit' : totalinvestmentAndProfit
            // })
            
            return investFulldata
            
    
        }
      
        const investments =  await calcInvestment()
        res.status(200).json({count : investments.length, investments})

///ends here
        // res.status(200).json({ Count : investmentData.length, investmentData})
    }catch(error){
        res.status(500).json({error})
    }
}

const getInvestments = async(req, res)=>{
    const {id, username} = req.params
    const userId = id
   try{ 
        const investmentData = await Investment.find({userId : id, username : username})
        
        if(!investmentData){
            return res.status(200).json({message : "Request error. Please retry."})
        }

        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }
        const calcInvestment =async()=>{
        const thisPeriod = new Date()
        
        const investments = []
        const profits = []
        let totalinvestmentAndProfit = 0
        const investFulldata = await investmentData.map(item =>{
                const _id = item._id
                const deposit = item.amount
                const package = item.packageName
                const interest = item.interestRate / 100
                const currentDate = thisPeriod
                // const currentDate = new Date(2022, 03, 10)
                const investmentDate = item.createdAt
                const maturityMonth = item.createdAt.getMonth() + 6  //6 or investment duration choosen for plan
                const maturityDateNumber = new Date(item.createdAt).setMonth(maturityMonth)
                let investmentDuration = monthDiff(investmentDate, currentDate)
                const profitPerMonth = deposit * interest
                let cumulativeProfit = profitPerMonth * investmentDuration
                const maturityFullDate = new Date(maturityDateNumber)
               

                if(currentDate >= maturityFullDate){
                    investmentDuration = 6  //6 or investment duration choosen for plan
                    cumulativeProfit = profitPerMonth * investmentDuration
                    
                    investments.push(item.amount)
                    profits.push(profitPerMonth)   
                    return({_id, deposit, package, interest, investmentDate, maturityFullDate, currentDate, investmentDate,
                        investmentDuration, profitPerMonth, cumulativeProfit, userId, username})
                }else{
                    investments.push(item.amount)
                    profits.push(profitPerMonth)   
                    return({_id, deposit, package, interest, investmentDate, maturityFullDate, currentDate, investmentDate,
                        investmentDuration, profitPerMonth, cumulativeProfit, userId, username})
                }
                        

                // return({_id, deposit, package, interest, investmentDate, maturityFullDate, currentDate, investmentDate,
                //      investmentDuration, profitPerMonth, cumulativeProfit, userId})
            })
                       
            
               const totalInvestment =  investments.reduce(function(accumulator, currentValue) {
                return accumulator + currentValue;
                }, 0);

                const totalProfit =  profits.reduce(function(accumulator, currentValue) {
                return accumulator + currentValue;
                }, 0);

                totalinvestmentAndProfit = totalInvestment + totalProfit
              
            investFulldata.push({
                'totalInvestment':totalInvestment, 
                'totalProfit' : totalProfit, 
                'totalinvestmentAndProfit' : totalinvestmentAndProfit
            })
            return investFulldata
    
        }
      
       const response =  await calcInvestment()
       res.status(200).json({count : response.length, response})
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
    const {id, username} = req.params
   try{ 
        
        const {amount} = req.body
        const {packageName} = req.body
        const {interestRate} = req.body
        // const {username} = req.body
        const userId = id
        const userData = await User.findOne({userId : id , username : username})



        // const userProfile = await User.find({userId : id})
        // const userInvestments = await Investment.find({userId : id})
        // const userTransactions = await Transaction.find({userId : id})
        // const userPaymentDetail = await PaymentDetail.find({userId : id})
        

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
            amount : amount,
            packageName : packageName,
            interestRate : interestRate,
            maturityDate : maturityDate,
            userId : userId,
            username : username
        }
        const investData = await Investment.create(invetmentInfo)
        res.status(200).json({investData})
    }catch(error){
        res.status(500).json({error})
    }
}


module.exports = {adminGetInvestments, getInvestments, getInvestment, createInvestment}