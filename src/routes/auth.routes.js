const express = require('express')
const router = express.Router()

const {registerController, loginController, resendVerificationEmail, completeRegistrationController, test} = require('../controllers/auth.controller')
const {registerValidation,loginValidation} = require('../middlewares/validations/auth.validations')


router.post('/login', loginValidation, loginController)
router.post('/register', registerValidation, registerController)
router.post('/complete-registration', completeRegistrationController)
router.post('/resend-verification-email', resendVerificationEmail)

router.get('/test', test)


module.exports = router