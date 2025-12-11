const {MongoClient} = require("mongodb"); 
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const client = new MongoClient(process.env.mongoURI);
let db;


async function connectDB(){

    if(db){
        return db;

    }else{
    try {
    
        console.log("Tentando conexao");
        await client.connect();
        console.log("Conectado ao DB");
        db= client.db("CMPDWE2");
        return db;

    } catch (error) {

        console.error("Erro ao se conectar ao banco de dados ",error);

        process.exit(1);

    }
}

}


module.exports = {
    connectDB
}






