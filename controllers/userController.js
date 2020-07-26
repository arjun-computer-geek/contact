const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllUsers = catchAsync(async (req, res, next) => {
    
        const users = await User.find()
        
        // SEND RESPONCE
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    
})

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user post passsword data
    if(req.body.password || req.body.confirmPassword) {
        return next(new AppError('This route is not for password update please use /updateMyPassword', 400))
    }
    // 2.) filtered out unwanted fieldnames that are not allowed to updated
    const filteredBody = filterObj(req.body, 'firstName', 'lastName','email', 'mobile')
    // 3.) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true, 
        runValidators: true
    })


    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }

    })
})


exports.updateUser = (req, res) => {
    
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined...'
    })
}

exports.getUser = (req, res) => {
    
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined...'
    })
}

exports.deleteUser = (req, res) => {
    
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined...'
    })
}