// connect result-model
const Result = require('../models/result');

exports.getAllResults = (req, res, next) => {
    // call static function of Result-class and pass into it 'res.render'-method
    Result.fetchAll(results => {
        res.render('results', { results: results, pageTitle: 'Results', path: '/results' });
    });
}

exports.postAddResult = (req, res, next) => {
    // has to be implemented...
}