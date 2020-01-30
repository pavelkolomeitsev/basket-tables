// connect result-model
const Result = require('../models/result');

// connect enums
const enums = require('../utils/enums');

exports.getTables = (req, res, next) => {
    res.render('tables', { pageTitle: 'Tables', path: '/tables', results: [] });
}

exports.postTables = (req, res, next) => {

    // create an object 'settings' where we hold user`s preferable results
    let settings = {};
    settings.isMilwaukee = req.body.MILWAUKEE === enums.FavoriteTeam.MILWAUKEE ? enums.FavoriteTeam.MILWAUKEE : 'no';
    settings.isClippers = req.body.CLIPPERS === enums.FavoriteTeam.CLIPPERS ? enums.FavoriteTeam.CLIPPERS : 'no';
    settings.home = req.body.HOME === enums.HomeGuest.HOME ? enums.HomeGuest.HOME : 'no';
    settings.guest = req.body.GUEST === enums.HomeGuest.GUEST ? enums.HomeGuest.GUEST : 'no';
    settings.W1W1 = req.body.W1W1 === enums.FirstHalf.W1W1 ? enums.FirstHalf.W1W1 : 'no';
    settings.W2W2 = req.body.W2W2 === enums.FirstHalf.W2W2 ? enums.FirstHalf.W2W2 : 'no';
    settings.W1W2 = req.body.W1W2 === enums.FirstHalf.W1W2 ? enums.FirstHalf.W1W2 : 'no';
    settings.W2W1 = req.body.W2W1 === enums.FirstHalf.W2W1 ? enums.FirstHalf.W2W1 : 'no';

    Result.selectResults(settings, results => {

        if (!results) {
            res.redirect('/results');
        }

        res.render('tables', { pageTitle: 'Tables', path: '/tables', results: results });
    });


}