const express = require('express')
const router = express.Router()
const {adminGetTransactions, getTransaction, getTransactions, createTransaction} = require('../controllers/transactions')

//admin endpoint
router.get('/', adminGetTransactions)

router.get('/:id/transactions/:transactionId', getTransaction)

router.get('/:id/:username/transactions/', getTransactions)

router.post('/:id/:username', createTransaction)

module.exports = router