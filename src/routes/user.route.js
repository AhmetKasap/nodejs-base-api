const express = require('express')
const router = express.Router()

const {login,register} = require('../controllers/user.controller')


router.get('/test', login)
router.get('/testt', register)


module.exports = router