const express = require('express')
const { createError } = require('../helpers/common')
const router = express.Router()

const {authGaurd} = require('../middlewares/authGaurd')

// router.use(authGaurd)

let userData = require('../utils/sampleUserData')

router.get('/details',(req,res)=>{
    return res.send(userData)
})

module.exports = router