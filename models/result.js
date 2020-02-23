const mongodb = require('mongodb');

const getDB = require('../utils/database').getDB;

class Result {
    constructor(date, teams, score, isMilwaukee, isClippers, homeGuest, firstHalf, id) {
        this.date = date;
        this.teams = teams;
        this.score = score;
        this.isMilwaukee = isMilwaukee;
        this.isClippers = isClippers;
        this.homeGuest = homeGuest;
        this.firstHalf = firstHalf;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {

        const db = getDB();
        let optionalResult;
        if (this._id) {
            optionalResult = db.collection('results').updateOne({ _id: this._id }, { $set: this });
        } else {
            optionalResult = db.collection('results').insertOne(this);
        }

        return optionalResult;
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('results').find().toArray();
    }

    // this query means all results WHERE (isMilwaukee = true OR isClippers = true) AND homeGuest = true AND firstHalf = true
    static fetchExactResults(settingsObject) {
        const db = getDB();
        return db.collection('results')
            .find({
                $or: [{ isMilwaukee: settingsObject.isMilwaukee }, { isClippers: settingsObject.isClippers }],
                homeGuest: settingsObject.homeGuest, firstHalf: settingsObject.firstHalf
            }).toArray();
    }

    static findById(resultId) {
        const db = getDB();
        // _id is a BSON-object and productId is just a string
        // to solve this issue we create new ObjectId instance and pass productId as a param
        return db.collection('results').find({ _id: new mongodb.ObjectId(resultId) }).next();
    }

    static deleteById(resultId) {
        const db = getDB();
        return db.collection('results').deleteOne({ _id: new mongodb.ObjectId(resultId) });
    }
}

// export Result model
module.exports = Result;