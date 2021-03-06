const {promisify} = require('util')
const crypto = require('crypto')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const sendEmail = require('./../utils/email')

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const cookieOptions = {
    expires: new Date(Date.now + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true

    res.cookie('jwt', token, cookieOptions)

    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = catchAsync( async (req, res, next) =>{
    // console.log(req.body)
    const newUser = await User.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword, mobile: req.body.mobile})

    createSendToken(newUser, 201, res)
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

    // if(!user.confirmEmail) {
    //     return next(new AppError('Please Confirm your Email before login', 401))
    // }
    
    // 3) If everything is okay send token to the client
    createSendToken(user, 200, res)
})

exports.protect = catchAsync( async (req, res, next) => {
    
    let token
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
        )
    }

    //GRANT ACCESS PROTECTED ROUTE
    req.user = currentUser
    next()
})

exports.forgotPassword = catchAsync( async(req, res, next) => {
    // 1) Get user based on posted email
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return next(new AppError('There is no User with this email address', 404))
    }

    // 2) Generate the random token
    const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave: false})

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

    const message = `Forgot your passowd? Submit a PATCH request with your new password and confirmPassword to: ${resetURL}.\n If your didn't forget your password, Please ignore this email!`
    try{
        await sendEmail({

        email: user.email,
        subject: 'your password reset token(valid for 10 min)',
        message
        })

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        })

    }catch(err){
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({validateBeforeSave: false})

        return next(new AppError('Ther was an error sending the mail, Try again...', 500))
    }
})

exports.resetPassword = catchAsync( async (req, res, next) =>{
    // 1.) Get user based on the token
    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    })

    // 2.) If token has not expired, and there is user, set the new password
    if(!user){
        return next(new AppError('Token is invalid or has Expired', 400))
    }
    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    // 3.) Update changedPasswordAt property for the user
    // 4.) Log the user in, send JWT
    createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync( async(req, res, next) => {
    // 1.) Get user from collection
    const user = await User.findById(req.user.id).select('+password')

    // 2.) Check if POSTed pasword is correct
    if(!(user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong.', 401))
    }
    // 3.) If so, update password
    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    await user.save()
    // 4.) Log user in, send JWT
    createSendToken(user, 200, res)
})