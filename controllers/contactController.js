const Contact = require('./../models/contactModel')
const catchAsync = require('./../utils/catchAsync')

exports.getAllContacts = catchAsync( async (req, res, next) =>{

    const contacts = await Contact.find()

    // SEND RESPONCE
    res.status(200).json({
        status: 'success',
        results: contacts.length,
        data: {
            contacts
        }
    })
})