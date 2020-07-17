const mongoose = require('mongoose')

const app = require('./app')

const DB = 'mongodb://localhost/contact'
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => console.log('DB connection successfull'))

const port = 8000
const server = app.listen(port, () =>{
    console.log(`app running on port ${port}....`)
})