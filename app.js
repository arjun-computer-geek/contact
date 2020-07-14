const express = require('express')

const viewRouter = require('./routes/viewRouter')


const app = express()
app.set('view engine', 'pug')
app.set('views', 'views')

//Serving the static files
app.use(express.static(`${__dirname}/public`))

//ROUTES
app.use('/', viewRouter)
app.get('/login', (req, res) => {
    res.status(200).render('login', {
        title: 'Login'
    })
})

module.exports = app;
