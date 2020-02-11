// connect enums
const enums = require('../utils/enums');
// connect a reference to database
const database = require('../utils/database');


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

    static fetchAll() {
        return database.execute('SELECT * FROM results');
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

    static selectResults(settings, callback) {
        getResultsFromFile(results => {
            const selectedResults = [];
            results.forEach(item => {
                if (item.isMilwaukee === settings.isMilwaukee) {
                    if (item.homeGuest === settings.home) {
                        selectedResults.push(getSelectedItem(item, settings));
                    } else if (item.homeGuest === settings.guest) {
                        selectedResults.push(getSelectedItem(item, settings));
                    }
                } else if (item.isClippers === settings.isClippers) {
                    if (item.homeGuest === settings.home) {
                        selectedResults.push(getSelectedItem(item, settings));
                    } else if (item.homeGuest === settings.guest) {
                        selectedResults.push(getSelectedItem(item, settings));
                    }
                }
            });

            callback(selectedResults);
        });
    }
}

const getSelectedItem = (item, settings) => {
    let rightResult = null;
    switch (item.firstHalf) {
        case settings.W1W1:
            rightResult = item;
            break;
        case settings.W2W2:
            rightResult = item;
            break;
        case settings.W1W2:
            rightResult = item;
            break;
        case settings.W2W1:
            rightResult = item;
            break;
    }

    return rightResult;
}