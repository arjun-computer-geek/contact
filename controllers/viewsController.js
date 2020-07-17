exports.getHome = (req, res) => {
    res.status(200).render( 'home', {
        title: "Home"
    })
}

exports.getAddContact = (req, res) => {
    res.status(200).render( 'addContact', {
        title: "Add Contact"
    })
}