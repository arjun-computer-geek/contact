exports.getHome = (req, res) => {
    res.status(200).render( 'base', {
        title: "Home"
    })
}