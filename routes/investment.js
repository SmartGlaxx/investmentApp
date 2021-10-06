const express = require('express')
const router = express.Router()
const {adminGetInvestments, getInvestments, getInvestment, createInvestment} = require('../controllers/investment')

//admin endpoint
router.get('/', adminGetInvestments)

router.get('/:id/investments/:investmentId', getInvestment)

router.get('/:id/investments/', getInvestments)

router.post('/:id', createInvestment)



module.exports = router