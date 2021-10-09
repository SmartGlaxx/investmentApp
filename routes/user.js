const express = require('express')
const router = express.Router()
const {adminGetUsersController, getUserController, createUserController, updateUserController, deleteUserController} = require('../controllers/users')

//Admin endpoint
router.get('/', adminGetUsersController)

router.get('/:id/:username', getUserController)

router.post('/:id', createUserController)

router.patch('/:id/:username', updateUserController)

router.delete('/:id/:username', deleteUserController)

module.exports = router
