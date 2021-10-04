const express = require('express')
const router = express.Router()
const {adminGetUsersController, getUserController, createUserController, updateUserController, deleteUserController} = require('../controllers/users')

//Admin endpoint
router.get('/', adminGetUsersController)

router.get('/:id', getUserController)

router.post('/:id', createUserController)

router.patch('/:id', updateUserController)

router.delete('/:id', deleteUserController)

module.exports = router
