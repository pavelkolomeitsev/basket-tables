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
    constructor(id, date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf) {
        this.id = id;
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

    // instead of static addResult
    save() {
        getResultsFromFile(results => {
            if (this.id) {
                // find index of edited result
                const index = results.findIndex(item => item.id === this.id);
                // copy existing list of results
                const updatedResults = [...results];
                // replace updated item in the newly created list
                updatedResults[index] = this; // this - it`s an instance of Result
                // write this data to the file
                fs.writeFile(path, JSON.stringify(updatedResults), error => {
                    console.log(error);
                });
            } else {
                // in the save-method we create a new property of class Product (Yes! You can do it in JavaScript!!!)
                this.id = new Date().getTime().toString();
                // and add it to the list of results
                results.push(this);
                // write it into the file
                fs.writeFile(path, JSON.stringify(results), error => {
                    console.log(error);
                });
            }
        });
    }

    static findById(id, callback) {
        getResultsFromFile(results => {
            const result = results.find(item => item.id === id);
            callback(result);
        });
    }

    static deleteById(id) {
        getResultsFromFile(results => {
            // method 'filter' returns all items to the new list which don`t match an id we pass
            const updatedList = results.filter(item => item.id !== id);
            // write newly created list to the file
            fs.writeFile(path, JSON.stringify(updatedList), error => {
                console.log(error);
            });
        });
    }
}