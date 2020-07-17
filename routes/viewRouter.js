const express = require('express')

const viewsController = require('../controllers/viewsController')

const router = express.Router()

router.get('/', viewsController.getHome)
router.get('/addContact', viewsController.getAddContact)

module.exports = router