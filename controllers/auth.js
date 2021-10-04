const mongoose = require('mongoose')
const Auth = require('../models/auth')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const getUsersAuthController = async(req, res)=>{
    try{
    const usersAuth = await Auth.find({})
    res.status(200).json({count : usersAuth.length, usersAuth})
    }catch(error){
        res.status(500).json({message : "An error occured fetching Users Auth. Please try again."})
    }
}

const authLoginController = async(req, res)=>{
    const email = req.body.email
    const password = req.body.password

   try{ 
    const loginData = await Auth.findOne({email : email})
    const checkedEmail = loginData.email 
    const authPassword = loginData.password 
    if(checkedEmail !== email){
        return res.status(404).json({message : "Email not found in our database. Please try again."})
    }
    const checkedPassword = await bcrypt.compare(password, authPassword)
    if(!checkedPassword){
        return res.status(200).json({response : "fail"})
    }
    return res.status(200).json({response : "success"})
    }catch(error){
        res.status(500).json({error : "Email not found"})
    }
}



const authSignupController = async(req, res)=>{
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
   try{ 
        const salt = await bcrypt.genSalt(10)
        const hashedPasword = await bcrypt.hash(password, salt)

        const singupdData = await Auth.create({firstname, lastname, email , password : hashedPasword })
        res.status(200).json({singupdData})
    }catch(error){
        res.status(500).json({error})
    }
}

const authPasswordResetController = async(req, res)=>{
    const email = req.body.email

    try{
        const passwordResetData = await Auth.findOne({email : email})
        const checkedEmail = passwordResetData.email 
        if(checkedEmail !== email){
            return res.status(404).json({message : "Email not in our database. Please try again."})
        }
        //email sending function here
        res.status(200).json({response : "Email sent to reset password"})
    }catch(error){
        res.status(500).json({error})
    }
}


module.exports = {getUsersAuthController, authLoginController, authSignupController, authPasswordResetController}