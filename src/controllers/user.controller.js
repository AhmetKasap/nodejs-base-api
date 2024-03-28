const userModel = require('../models/user.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')

const login = async(req,res,next) => {
    const user = await userModel.findOne({email : req.body.email})
    if(!user) throw new APIError('User information is incorrect, please try again', 404)

    if(user && req.body.password === user.password) return new Response(user, "login successfull").ok(res)
    else throw new APIError('User information is incorrect, please try again', 404)
}

const register = async(req,res) => {
    const userDb = new userModel({
        name : req.body.name,
        lastname : req.body.lastname, 
        email : req.body.email,
        password : req.body.password
    })
    userDb.save()
}

const test = async(req,res) => {
    return new Response(null, "success").ok(res)
}


module.exports = {
    login,register,test
}