// connect file-system package
const fs = require('fs');
// constructing the path to the file
const pathConstructor = require('path');
const path = pathConstructor.join(pathConstructor.dirname(process.mainModule.filename), 'data', 'results.json');

// connect enums
const enums = require('../utils/enums');

// fetching data from json-file
const getResultsFromFile = callback => {
    fs.readFile(path, (error, fileContent) => {
        // if where is nothing in the file we return an empty list
        if (error) {
            callback([]);
        } else { // otherwise we pass converted from JSON into normal js-objects list
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Result {
    constructor(date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf) {
        this.id = new Date().getTime().toString();
        this.date = date;
        this.teams = teams;
        this.score = score;
        this.isMilwaukee = isMilwaukee === enums.FavoriteTeam.MILWAUKEE ? enums.FavoriteTeam.MILWAUKEE : '';
        this.isClippers = isClippers === enums.FavoriteTeam.CLIPPERS ? enums.FavoriteTeam.CLIPPERS : '';
        this.homeGuest = homeGuest;
        this.firstHalf = firstHalf;
    }

    static fetchAll(callback) {
        getResultsFromFile(callback);
    }

    // pass an instance of Result, call 'getResultsFromFile'
    // pass-implement into 'getResultsFromFile'-method anonymous function with results as a list of objects
    static addResult(result) {
        getResultsFromFile(results => {
            results.push(result); // add new result to the list
            // write it into the file
            fs.writeFile(path, JSON.stringify(results), error => {
                console.log(error);
            });
        });
    }

    static findById(id, callback) {
        getResultsFromFile(products => {
            const result = products.find(item => item.id === id);
            callback(result);
        });
    }

    static deleteById(id) {
        getResultsFromFile(products => {
            // method 'filter' returns all items to the new list which don`t match an id we pass
            const updatedList = products.filter(item => item.id !== id);
            // write newly created list to the file
            fs.writeFile(path, JSON.stringify(updatedList), error => {
                console.log(error);
            });
        });
    }
}