const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
    },
    mobile: {
        type: String,
        required: true,
        minlength: [10, 'Mobile Number can not be less than 10'],
        maxlength: [10, 'Mobile Number can not be greater than 10']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt: Date
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    //HASHING THE PASSWORD
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

userSchema.methods.correctPassword = async function(candidatePswword, userPassword) {
    return await bcrypt.compare(candidatePswword, userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {

    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        )

        return JWTTimeStamp < changedTimestamp;
    }
    return false
}


const User = mongoose.model('User', userSchema)
module.exports = User