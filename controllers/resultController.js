// connect result-model
const Result = require('../models/result');

// connect enums
const enums = require('../utils/enums');

exports.getAllResults = (req, res, next) => {
    // call static function of Result-class and pass into it 'res.render'-method
    Result.fetchAll(results => {
        res.render('results', { results: results, pageTitle: 'Results', path: '/results' });
    });
}

exports.getAddResult = (req, res, next) => {
    res.render('add-result', { pageTitle: 'Add Result', path: '/add-result' });
}

exports.postAddResult = (req, res, next) => {
    const date = req.body.date;
    const teams = req.body.teams;
    const score = req.body.score;
    const isMilwaukee = req.body.MILWAUKEE;
    const isClippers = req.body.CLIPPERS;
    const homeGuest = req.body.HOME === enums.HomeGuest.HOME ? enums.HomeGuest.HOME : enums.HomeGuest.GUEST;
    let firstHalf = enums.FirstHalf.W1W1;
    if (req.body.W1W1 === enums.FirstHalf.W1W1) {
        firstHalf = enums.FirstHalf.W1W1;
    } else if (req.body.W2W2 === enums.FirstHalf.W2W2) {
        firstHalf = enums.FirstHalf.W2W2;
    } else if (req.body.W1W2 === enums.FirstHalf.W1W2) {
        firstHalf = enums.FirstHalf.W1W2;
    } else {
        firstHalf = req.body.W2W1;
    }

    // create an instance of Result
    const result = new Result(date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf);

    console.log(result);

    // add result
    Result.addResult(result);

    res.redirect('/results');
}

exports.postDeleteResult = (req, res, next) => {
    const resultId = req.body.productId;
    Result.deleteById(resultId);
    res.redirect('/results');
}