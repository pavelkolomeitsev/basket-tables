// connect result-model
const Result = require('../models/result');

// connect enums
const enums = require('../utils/enums');

exports.getTables = (req, res, next) => {
    res.render('tables', { pageTitle: 'Tables', path: '/tables', results: [] });
}

exports.postTables = (req, res, next) => {
    // has to be implemented...
}