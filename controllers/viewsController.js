exports.getHome = (req, res) => {
    res.status(200).render( 'addContact', {
        title: "Add Contact"
    })
}
