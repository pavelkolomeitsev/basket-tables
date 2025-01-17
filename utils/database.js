// take a reference on module
const mongodb = require('mongodb');

// create MongoDB client
const MongoClient = mongodb.MongoClient;

let db;

// connect to MongoDB server
const mongoConnection = (callback) => {
    MongoClient.connect(`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@clusternodeshop-frwbo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
        .then((client) => {
            console.log('Connected!');
            db = client.db();
            callback();
        })
        .catch(error => {
            console.log(error)
            throw error;
        });
}

const getDB = () => {
    if (db) {
        return db;
    }

    throw 'No database found!';
}

exports.mongoConnection = mongoConnection;
exports.getDB = getDB;