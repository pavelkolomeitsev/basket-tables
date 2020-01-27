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
}