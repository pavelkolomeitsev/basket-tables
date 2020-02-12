// connect result-model
const Result = require('../models/result');

// connect enums
const enums = require('../utils/enums');

exports.getAllResults = (req, res, next) => {
    
    Result.fetchAll()
        .then(([results, fieldData]) => {
            res.render('results', { results: results, pageTitle: 'Results', path: '/results' });
        })
        .catch(error => console.log(error));
}

exports.getAddResult = (req, res, next) => {
    res.render('add-result', { pageTitle: 'Add Result', path: '/add-result', editing: false, result: null });
}

exports.postAddResult = (req, res, next) => {
    const date = req.body.date;
    const teams = req.body.teams;
    const score = req.body.score;
    const isMilwaukee = req.body.MILWAUKEE === enums.FavoriteTeam.MILWAUKEE ? enums.FavoriteTeam.MILWAUKEE : null;
    const isClippers = req.body.CLIPPERS === enums.FavoriteTeam.CLIPPERS ? enums.FavoriteTeam.CLIPPERS : null;
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
    const result = new Result(null, date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf);

    result.save()
        .then(() => {
            res.redirect('/results');
        })
        .catch(error => console.log(error));
}

exports.getEditResult = (req, res, next) => {

    // check if query is true (?edit=true)
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/results'); // otherwise return to results-page
    }

    // get id of result as a param in url (/edit-result/1)
    const resId = req.params.resultId;
    Result.findById(resId)
        .then(([results, fieldData]) => {
            
            if (!results[0]) {
                res.redirect('/results');
            }

            // direct the user to the page add-result/edit-result with all necessary data
            res.render('add-result', { pageTitle: 'Edit Result', path: '/edit-result', editing: editMode, result: results[0] });
        })
        .catch(error => console.log(error));
}

exports.postEditResult = (req, res, next) => {

    const resId = req.body.resultId;
    const date = req.body.date;
    const teams = req.body.teams;
    const score = req.body.score;
    const isMilwaukee = req.body.MILWAUKEE === enums.FavoriteTeam.MILWAUKEE ? enums.FavoriteTeam.MILWAUKEE : null;
    const isClippers = req.body.CLIPPERS === enums.FavoriteTeam.CLIPPERS ? enums.FavoriteTeam.CLIPPERS : null;
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
    const result = new Result(resId, date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf);

    // edit result
    result.editById(resId)
        .then(() => {
            res.redirect('/results');
        })
        .catch(error => console.log(error));
}

exports.postDeleteResult = (req, res, next) => {
    const resultId = req.body.productId;
    Result.deleteById(resultId)
        .then(() => {
            res.redirect('/results');
        })
        .catch(error => console.log(error));
}