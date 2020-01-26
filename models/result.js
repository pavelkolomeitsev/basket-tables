module.exports = class Result {
    constructor(date, teams, score) {
        this.id = new Date().getTime().toString();
        this.date = date;
        this.teams = teams;
        this.score = score;
    }
}