const User = require('./../models/userModel');

exports.getAllUsers =  async (req, res, next) => {
    try{
        const users = await User.find();
        
        // SEND RESPONCE
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            status: 'error',
            message: err
        })
    }
    next()
}

exports.createUser = async (req, res, next) =>{
    try{
        const newUser = await User.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })

    } catch(err){
        res.status(400).json({
            status: 'error',
            message: err
        })

    }
    next();
}

exports.updateUser = (req, res) => {
    
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