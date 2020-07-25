const {promisify} = require('util')
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

exports.protect = catchAsync( async (req, res, next) => {
    
    let token;
    // 1) Getting the token and check if it exist
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(new AppError('You are not logged in ! Please log in to get access', 401))
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next(new AppError('The User belonging to the token does not exist', 401))
    }
    // 4) Check if user chnge password after the jwt issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(
            new AppError('User recently changed password! Please login again.', 401)
        );
    }

    //GRANT ACCESS PROTECTED ROUTE
    req.user = currentUser
    next()
})