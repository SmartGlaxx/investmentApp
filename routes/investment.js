const express = require('express')
const router = express.Router()
const {adminGetInvestments, getInvestments, getInvestment, createInvestment} = require('../controllers/investment')

//admin endpoint
router.get('/', adminGetInvestments)

router.get('/:id/investments/:investmentId', getInvestment)

router.get('/:id/:username/investments/', getInvestments)

router.post('/:id/:username', createInvestment)



module.exports = router