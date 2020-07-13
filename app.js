const express = require('express')

const viewRouter = require('./routes/viewRouter')


const app = express()
app.set('view engine', 'pug')
app.set('views', 'views')

//ROUTES
app.use('/', viewRouter)

module.exports = app;
