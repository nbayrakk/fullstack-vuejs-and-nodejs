const User = require('../models/user')
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require('express-async-handler')
const { sendJwtToClient } = require('../helpers/authorazition/tokenHelpers')
const {validateUserInput,comparePassword,validateUserInputRegister}  = require('../helpers/input/inputHelpers')

const register = asyncErrorWrapper(async (req, res, next) => {
    console.log(req.body)
    const { email, name, password } = req.body
    if(!validateUserInputRegister(email,password,name)){
        return next(new CustomError("Please check your inputs!",401))
    }

    const user = await User.create({
        email,
        name,
        password
    })
    sendJwtToClient(user, res);

});

const login = asyncErrorWrapper(async (req, res, next) => {

    const {email,password} = req.body 
    console.log(email,password)
    if(!validateUserInput(email,password)){
        return next(new CustomError("Please check your inputs!",401))
    }

    const user = await User.findOne({email}).select("+password")
    if(!comparePassword(password,user.password)){
        return next(new CustomError("Please check password!",401))
    }

    sendJwtToClient(user, res);
});
const logout = asyncErrorWrapper(async (req,res,next) => {
    const {NODE_ENV} = process.env
    return res.status(200)
    .cookie({
        httpOnly:true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? true :false
    })
    .json({
        success:true,
        message:"Log out is success!"
    })
})

const getUser = asyncErrorWrapper(async(req, res, next) => {
    const user = await User.findById(req.user.id)
    res.json({
        success: true,
        data: {
            name: req.user.name,
            id: req.user.id
        },
        user:user
    })
})


module.exports = {
    register,
    getUser,
    login,
    logout
}