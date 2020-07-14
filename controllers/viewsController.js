exports.getHome = (req, res) => {
    res.status(200).render( 'home', {
        title: "Home"
    })
}

exports.getLogin = (req, res) => {
    res.status(200).render( 'login', {
        title: "login"
    })
}