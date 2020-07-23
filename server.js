const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', err =>{
    console.log('UNCAUGHT ERROR!')
    console.log(err.name, err.message)
    process.exit(1)
})

const app = require('./app')
dotenv.config({path: './config.env'})

// CONNECTION WITH MONGODB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successfull')
})


const port = 8000
const server = app.listen(port, () =>{
    console.log(`app running on port ${port}....`)
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDLED REJECTION!')
    server.close(() => {
        process.exit(1)
    })
})

