const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).render( 'base', {
        title: "Home"
    })
})

module.exports = router