const express = require('express')
const router = express.Router()
const {adminGetTransactions, getTransaction, getTransactions, createTransaction} = require('../controllers/transactions')

//admin endpoint
router.get('/', adminGetTransactions)

router.get('/:id/transactions/:transactionId', getTransaction)

router.get('/:id/transactions/', getTransactions)

router.post('/:id', createTransaction)

module.exports = router