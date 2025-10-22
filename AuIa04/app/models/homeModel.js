module.exports = {
    getPaitings:(db, callback)=>{
        console.log("[Model] função que fara a leitura das obras do dataBase");
        const sql = 'select * from obrasdearte';
        db.query(sql,callback);
    }
}