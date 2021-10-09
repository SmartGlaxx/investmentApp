const express = require('express')
const router = express.Router()
const {adminGetPaymentDetails, getPaymentDetail, createPaymentDetail, updatePaymentDetail, deletePaymentDetail} = require('../controllers/paymentDetails')

//note : add paymentDetails Id to make fetching more exact
router.get('/:id/:paymentId', getPaymentDetail)

router.post('/:id/:username', createPaymentDetail)

router.patch('/:id/:paymentId', updatePaymentDetail)

router.delete('/:id/:paymentId', deletePaymentDetail)



module.exports = router