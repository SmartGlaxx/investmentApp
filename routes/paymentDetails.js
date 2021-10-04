const express = require('express')
const router = express.Router()
const {adminGetPaymentDetails, getPaymentDetail, createPaymentDetail, updatePaymentDetail, deletePaymentDetail} = require('../controllers/paymentDetails')

//note : add paymentDetails Id to make fetching more exact
router.get('/:id', getPaymentDetail)

router.post('/:id', createPaymentDetail)

router.patch('/:id', updatePaymentDetail)

router.delete('/:id', deletePaymentDetail)



module.exports = router