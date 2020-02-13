// import sequelize methods and variables
const { Sequelize } = require('sequelize');

// connect to database
const sequelize = require('../utils/database');
// connect enums
const enums = require('../utils/enums');

// first arg - name of table
// second arg - object (names of columns with properties)
const Result = sequelize.define('results2', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    teams: {
        type: Sequelize.STRING,
        allowNull: false
    },
    score: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isMilwaukee: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isClippers: {
        type: Sequelize.STRING,
        allowNull: true
    },
    homeGuest: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstHalf: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// export Result model
module.exports = Result;