const express = require('express')

const viewRouter = require('./routes/viewRouter')
const userRouter = require('./routes/userRouter')


const app = express()
app.set('view engine', 'pug')
app.set('views', 'views')

//Serving the static files
app.use(express.static(`${__dirname}/public`))

//ROUTES
app.use('/', viewRouter)
app.use('/api/v1/users', userRouter);

module.exports = app;
