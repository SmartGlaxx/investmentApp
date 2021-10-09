const express = require('express')
const router = express.Router()
const {getUsersAuthController, authLoginController, authSignupController, authPasswordResetController} = require('../controllers/auth')

router.get('/users', getUsersAuthController)

router.post('/login',authLoginController)

router.post('/signup', authSignupController)

router.post('/reset-password', authPasswordResetController)


module.exports = router