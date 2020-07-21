const express = require('express')
const bodyParser = require('body-parser')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const viewRouter = require('./routes/viewRouter')
const userRouter = require('./routes/userRouter')
const contactRouter = require('./routes/contactRouter')


const app = express()
app.set('view engine', 'pug')
app.set('views', 'views')

//Serving the static files
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//ROUTES

app.use('/', viewRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/contacts', contactRouter)


app.all('*', (req, res, next) =>{
    next(new AppError(`can't find ${req.originalUrl} on this server`, 400))
})

app.use(globalErrorHandler)
module.exports = app;
