const userModel = require('../models/user.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mail = require('../helpers/sendMail')


const registerController = async(req,res) => {
  
    const auth = await userModel.findOne({email:req.body.email})
    if(auth) throw new APIError('This email is already in use, please try different email', 409)

    const verificationCode = crypto.randomBytes(3).toString('hex')
    let mailOption = new mail.MailOption(process.env.EMAIL_ADRESS, req.body.email, "Confirm Email", `Please enter this confirmation code to start using 'myAPI'. ${verificationCode}`)
    await mail.sendMail(mailOption)

    const password = await bcrypt.hash(req.body.password,10)
    const userDb = new userModel({
        name : req.body.name,
        lastname : req.body.lastname, 
        email : req.body.email,
        password : password,
        verificationAccount : {
            verificationCode : verificationCode,
            verifiedAccount : false
        }
    })

    const response = await userDb.save()
    if(response) return new Response(null, 'To complete the registration process, please check your email inbox.').created(res)
    else throw new APIError('An error occurred during registration', 500)
}

const resendVerificationEmail = async(req,res) => {
    const auth = await userModel.findOne({email:req.body.email})
    if(!auth) throw new APIError('User information is incorrect, please try again', 404)

    const verificationCode = crypto.randomBytes(3).toString('hex') //*created random code
    let mailOption = new mail.MailOption(process.env.EMAIL_ADRESS, req.body.email, "Confirm Email", `Please enter this confirmation code to start using 'myAPI'. ${verificationCode}`)
    await mail.sendMail(mailOption)

    const result = await userModel.updateOne({_id : auth._id}, {verificationAccount : {verificationCode : verificationCode, verifiedAccount : false}})
    if(result) return new Response(null, 'Please check your email inbox again.').ok(res)

}

const completeRegistrationController = async(req,res) => {
    const user = await userModel.findOne({email : req.body.email})
    if(!user) throw new APIError('User information is incorrect, please try again',401)

    if(user.verificationAccount.verifiedAccount === true) return new Response(null, 'Already registration completed successfully').badRequest(res)

    if(user.verificationAccount.verificationCode === req.body.verificationCode){
        const result = await userModel.updateOne({_id : user._id}, {verificationAccount : {verifiedAccount:true}})

        if(result) {
            await userModel.updateOne({_id : user._id}, {verificationAccount : {verificationCode:null, verifiedAccount:true}})
            return new Response(null,'Registration completed successfully').created(res)
        }
        else throw new APIError('An error occurred during registration.',500)
    }
    
}


const loginController = async(req,res,next) => {
    const user = await userModel.findOne({email : req.body.email})
    if(!user) throw new APIError('User information is incorrect, please try again', 404)

    if( (user.verificationAccount.verifiedAccount===true) && await bcrypt.compare(req.body.password, user.password)) return new Response(user, "login successfull").ok(res)
    else throw new APIError('User information is incorrect, please try again', 404)
}

















module.exports = {
    loginController,registerController,completeRegistrationController,resendVerificationEmail
}