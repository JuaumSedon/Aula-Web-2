const mysql = require('mysql2');


const host = 'localhost';
const dataBase = 'museu';
const user = 'root';
const password = '1234';

dbConn = mysql.createConnection({
    host:host,
    user:user,
    password:password,
    database:dataBase
});


console.log('[dbConnection]',dbConn.state);

dbConn.connect((erro)=>{
    console.log('[dbConnection error',erro)
});


module.exports = dbConn;