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
    settings.homeGuest = req.body.HOME === enums.HomeGuest.HOME ? enums.HomeGuest.HOME : enums.HomeGuest.GUEST;
    
    if(req.body.W1W1 === enums.FirstHalf.W1W1){
        settings.firstHalf = enums.FirstHalf.W1W1;
    }else if(req.body.W2W2 === enums.FirstHalf.W2W2){
        settings.firstHalf = enums.FirstHalf.W2W2;
    }else if(req.body.W1W2 === enums.FirstHalf.W1W2){
        settings.firstHalf = enums.FirstHalf.W1W2;
    }else{
        settings.firstHalf = enums.FirstHalf.W2W1;
    }
    
    Result.selectResults(settings)
        .then(([results, fieldData]) => {
            if (!results) {
                res.redirect('/results');
            }
            res.render('tables', { pageTitle: 'Tables', path: '/tables', results: results });
        })
        .catch(error => console.log(error));
}