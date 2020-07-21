const mongoose = require('mongoose')
const validator = require('validator');

const contacrSchema = new mongoose.Schema({
    photo: {
        type: String,
        default: 'avatar.png'
    },
    firstName: {
        type: String,
        required: [true, 'A Contact must have his first Name'],
        trim: true,
        maxlength: [20, 'A first name must have less or equal than 20 character'],
        minlength: [3, 'A first name must have more or equal than 3 character']
    },
    lastName: {
        type: String,
        required: [true, 'A Contact must have his last Name'],
        trim: true,
        maxlength: [20, 'A last name must have less or equal than 20 character'],
        minlength: [3, 'A last name must have more or equal than 3 character']
    },
    workPlace: {
        type: String,
    },
    contactNumber: {
        type: [String],
        require: [true, 'Please Enter a contact'],
        trim: true,
        minlength: [10, 'Invalid Contact!'],
        maxlength: [10, 'Invalid Contact!']
    },
    email: {
        type: String,
        required: [true, 'A User must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter a valid Email']
    },
    date:{
        type: [Date]

    },
    website: [String],
    address: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const Contact = mongoose.model('Contact', contacrSchema)
module.exports = Contact