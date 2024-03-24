const userModel = require('../models/user.model')

const login = async(req,res) => {
    const user = await userModel.findOne({email : req.body.email})
    if (user) return res.status(200).json(user)
    else return res.status(404).json("password or email incorrect")
    
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


module.exports = {
    login,register
}