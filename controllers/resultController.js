exports.getAllResults = (req, res, next) => {
    res.render('results', { pageTitle: 'Results', path: '/results' });
}