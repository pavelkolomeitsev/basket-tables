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
        this.isMilwaukee = isMilwaukee;
        this.isClippers = isClippers;
        this.homeGuest = homeGuest;
        this.firstHalf = firstHalf;
    }

    static fetchAll() {
        return database.execute('SELECT * FROM results');
    }

    // instead of static addResult
    save() {
        return database.execute(
            'INSERT INTO results (date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.date, this.teams, this.score, this.isMilwaukee, this.isClippers, this.homeGuest, this.firstHalf]);
    }

    editById(id) {
        return database.execute(
            'UPDATE results SET date = ?, teams = ?, score = ?, isMilwaukee = ?, isClippers = ?, homeGuest = ?, firstHalf = ? WHERE id = ?',
            [this.date, this.teams, this.score, this.isMilwaukee, this.isClippers, this.homeGuest, this.firstHalf, id]);
    }

    static findById(id){
        return database.execute('SELECT * FROM results WHERE id = ?', [id]);
    }

    static deleteById(id) {
        return database.execute('DELETE FROM results where id = ?', [id]);
    }

    static selectResults(settings) {

        return database.execute(
            'SELECT * FROM results WHERE (isMilwaukee = ? || isClippers = ?) AND homeGuest = ? AND firstHalf = ?',
            [settings.isMilwaukee, settings.isClippers, settings.homeGuest, settings.firstHalf]);
        }
}