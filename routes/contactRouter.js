const express = require('express')
const userController = require('../controllers/contactController');

const router = express.Router();

router
    .get('/', userController.getAllContacts)
    


module.exports = router

