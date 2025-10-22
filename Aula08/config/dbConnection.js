const mysql = require('mysql2');


const dbConn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'museu',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

module.exports = dbConn;    