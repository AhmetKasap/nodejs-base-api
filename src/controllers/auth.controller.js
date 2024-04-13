const userModel = require('../models/user.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const bcrypt = require('bcrypt')

const loginController = async(req,res,next) => {
    const user = await userModel.findOne({email : req.body.email})
    if(!user) throw new APIError('User information is incorrect, please try again', 404)

    if(user && await bcrypt.compare(req.body.password, user.password)) return new Response(user, "login successfull").ok(res)
    else throw new APIError('User information is incorrect, please try again', 404)
}

const registerController = async(req,res) => {
    const auth = await userModel.findOne({email:req.body.email})
    if(auth) throw new APIError('This email is already in use, please try different email', 401)

    const password = await bcrypt.hash(req.body.password,10)
    const userDb = new userModel({
        name : req.body.name,
        lastname : req.body.lastname, 
        email : req.body.email,
        password : password
    })

    const response = await userDb.save()
    if(response) return new Response(null, 'Registration Successful').created(res)
    else throw new APIError('An error occurred during registration', 500)
}

const test = async(req,res) => {
    return new Response(null, "success").ok(res)
}


module.exports = {
    loginController,registerController,test
}