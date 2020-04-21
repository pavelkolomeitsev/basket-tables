const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'basket_tables',
    password: 'My12SQL'
});

module.exports = pool.promise();
