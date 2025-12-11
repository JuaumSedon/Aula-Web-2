const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { MongoClient } = require('mongodb');
console.log('[db]',process.env.mongoURI);
const client = new MongoClient(process.env.mongoURI);
let db; 

async function connectToDatabase() {
    if (db) {
        return db;
    }
    try {
        await client.connect();
        console.log("Conectado ao MongoDB com sucesso!");
        db = client.db("CMPDWE2"); 
        return db;
    } catch (error) {
        console.error("Não foi possível conectar ao banco de dados.", error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;