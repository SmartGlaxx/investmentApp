const mongoose = require('mongoose')
const Auth = require('../models/auth')
const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10;

const getUsersAuthController = async(req, res)=>{
    try{
    const usersAuth = await Auth.find({}).select('firstname lastname email username')
    res.status(200).json({count : usersAuth.length, usersAuth})
    }catch(error){
        res.status(500).json({message : "An error occured fetching Users Auth. Please try again."})
    }
}

const authLoginController = async(req, res)=>{
    const emailOrUsername = req.body.emailOrUsername.toLowerCase()
    const password = req.body.password

   try{ 
       const loginData = await Auth.findOne({$or : [{email : emailOrUsername}, {username : emailOrUsername}]})
       const checkedEmail = loginData.email 
       const checkedUsername = loginData.username 
       const authPassword = loginData.password 
       
    if((checkedEmail === emailOrUsername) || (checkedUsername === emailOrUsername)){
        const checkedPassword = await bcrypt.compare(password, authPassword)
        if(!checkedPassword){
            return res.status(200).json({response : "fail", message : "Password Incorrect."})
        }
        return res.status(200).json({response : "success", message : "Authenticated. Login Successful."})
    }else{
        return res.status(404).json({message : "Email or Username not found in our database. Please try again."})
    }
   
    }catch(error){
        res.status(500).json({error : "User or Username not found. Please try again."})
    }
}



const authSignupController = async(req, res)=>{
    // const firstname = req.body.firstname
    // const lastname = req.body.lastname
    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    const password = req.body.password
   try{ 
        if(password.length < 8){
            return res.status(200).json({message : "Password cannot be less than 8 characters."})
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPasword = await bcrypt.hash(password, salt)
        
            const singupdData = await Auth.create({ username, email , password : hashedPasword })
            //if(singupdData){
              //    send email here  
           // }else{give eror warning}
            return res.status(200).json({singupdData})
        }
    }catch(error){
        res.status(500).json({error})
    }
}

const authPasswordResetController = async(req, res)=>{
    const email = req.body.email.toLowerCase()

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