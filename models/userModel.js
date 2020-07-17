const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Enter First Name'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Enter Last Name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A User must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter a valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter a password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please Confirm Your Password'],
        minlength: 8,
        validate: {
            validator: function(el) {
                return el === this.password;
            }
        },
        message: 'Password are not same'
    }

})

const User = mongoose.model('User', userSchema);
module.exports = User