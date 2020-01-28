// connect file-system package
const fs = require('fs');
// constructing the path to the file
const pathConstructor = require('path');
const path = pathConstructor.join(pathConstructor.dirname(process.mainModule.filename), 'data', 'results.json');

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
    constructor(date, teams, score, favTeam, homeGuest, firstHalf) {
        this.id = new Date().getTime().toString();
        this.date = date;
        this.teams = teams;
        this.score = score;
        this.favTeam = favTeam;
        this.homeGuest = homeGuest;
        this.firstHalf = firstHalf;
    }

    static fetchAll(callback) {
        getResultsFromFile(callback);
    }


}