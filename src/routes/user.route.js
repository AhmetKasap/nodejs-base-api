const express = require('express')
const router = express.Router()

const {login,register,test} = require('../controllers/user.controller')


router.post('/login', login)
router.post('/register', register)


module.exports = router