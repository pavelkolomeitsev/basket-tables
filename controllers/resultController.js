// connect result-model
const Result = require('../models/result');

// connect enums
const enums = require('../utils/enums');

exports.getAllResults = (req, res, next) => {
    // call static function of Result-class and pass into it 'res.render'-method
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
    const result = new Result(null, date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf);

    result.save();

    res.redirect('/results');
}

exports.getEditResult = (req, res, next) => {

    // check if query is true (?edit=true)
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/results'); // otherwise return to results-page
    }

    // get id of result as a param in url (/edit-result/1580239017793)
    const resId = req.params.resultId;
    Result.findById(resId, result => {

        if (!result) {
            res.redirect('/results');
        }

        // direct the user to the page add-result/edit-result with all necessary data
        res.render('add-result', { pageTitle: 'Edit Result', path: '/edit-result', editing: editMode, result: result });
    });
}

exports.postEditResult = (req, res, next) => {

    const resId = req.body.resultId;
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
    const result = new Result(resId, date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf);

    // edit result
    result.save();

    res.redirect('/results');
}

exports.postDeleteResult = (req, res, next) => {
    const resultId = req.body.productId;
    Result.deleteById(resultId);
    res.redirect('/results');
}