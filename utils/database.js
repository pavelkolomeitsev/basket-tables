// import all neccessary methods, static variebles etc.
const {Sequelize} = require('sequelize');

// create a new instance of Sequelize
// args: database`s name, user`s name, password, forth arg is an object with settings
const sequelize = new Sequelize('basket_tables', 'root', 'My15SQL', {dialect: 'mysql', host: 'localhost', logging: false});

module.exports = sequelize;
