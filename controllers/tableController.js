exports.getAddResultToTable = (req, res, next) => {
    res.render('add-result', { pageTitle: 'Add Result', path: '/add-result' });
}

exports.getTables = (req, res, next) => {
    res.render('tables', { pageTitle: 'Tables', path: '/tables' });
}

exports.postTables = (req, res, next) => {
    // has to be implemented...
}