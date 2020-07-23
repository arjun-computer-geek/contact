const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync')

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

// exports.createUser = catchAsync (  async (req, res) =>{

//     const newUser = await User.create(req.body)
//     res.status(201).json({
//         status: 'success',
//         data: {
//             user: newUser
//         }
//     })
// })

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