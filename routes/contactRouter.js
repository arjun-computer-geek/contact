const express = require('express')
const userController = require('../controllers/contactController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
    .route('/')
    .get(authController.protect, userController.getAllContacts)
    


module.exports = router

