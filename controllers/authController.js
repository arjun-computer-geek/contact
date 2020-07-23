const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

exports.signup = catchAsync( async (req, res, next) =>{
    // console.log(req.body)
    const newUser = await User.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword, mobile: req.body.mobile})

    const token = signToken(newUser._id)

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) =>{
    const {email, password} = req.body

    // 1) Check if email and password exist
    if(!email || !password) {
        return next(new AppError('Please Provide email and passwod', 400))
    }

    // 2) Check if user exist && password is correct
    const user = await User.findOne({email}).select('+password')

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401))
    }
    // 3) If everything is okay send token to the client
    const token = signToken(user._id)
    res.status(200).json({
        status: 'success',
        token
    })
})