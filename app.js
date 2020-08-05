const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const viewRouter = require('./routes/viewRouter')
const userRouter = require('./routes/userRouter')
const contactRouter = require('./routes/contactRouter')
const { mongo } = require('mongoose')


const app = express()
app.set('view engine', 'pug')
app.set('views', 'views')

// 1) GLOBLE MIDDLEWARE

// Set security HTTP headers
app.use(helmet())

// Limit request from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
})

app.use('/api/', limiter)


// Body parser, reading data from body into req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
// app.use(hpp({
//     whitelist: ['']
// }))

// Serving static files
app.use(express.static(`${__dirname}/public`))

// ROUTES
app.use('/', viewRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/contacts', contactRouter)

// Handling unhandled routes
app.all('*', (req, res, next) =>{
    next(new AppError(`can't find ${req.originalUrl} on this server`, 400))
})

// Globle Error handler
app.use(globalErrorHandler)

module.exports = app;
