const express = require('express')
const router = express.Router()


const authRoute = require('./auth.route')
router.use('/users',authRoute)

module.exports = router