const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

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
    // confirmEmail: {
    //     type: Boolean,
    //     default: false
    // },
    password: {
        type: String,
        required: [true, 'Please Enter a password'],
        minlength: [8, 'Password should minimum length 8'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please Confirm Your Password'],
        minlength: [8, 'Password should minimum length 8'],
        validate: {
            validator: function(el) {
                return el === this.password
            }
        },
        message: 'Password are not same'
    },
    mobile: {
        type: String,
        maxlength: [10, 'Mobile Number can not be greater than 10']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    //HASHING THE PASSWORD
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

userSchema.pre('save', function(next) {
    if(!this.isModified('password' || this.isNew)) return next()

    this.passwordChangedAt = Date.now() - 1000 // substracting 1s beacuse token always create after this time stamp
    next()
})

userSchema.pre('/^find/', function(next) {
    // this point to crrent query
    this.find({active: {$ne: false}})
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

        return JWTTimeStamp < changedTimestamp
    }
    return false
}

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    console.log({resetToken}, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken
}

const User = mongoose.model('User', userSchema)
module.exports = User