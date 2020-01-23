exports.errorPage = (req, res, next) => {
    res.status(404).render('404', { pageTitle: '404 Page not found!', path: '' });
}