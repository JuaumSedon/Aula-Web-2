


module.exports = {
    getPaitings:(db, callback)=>{

        db.query('SELECT * FROM obrasdearte',callback);

    },

    salvarComentario:(db,dados,callback)=>{


        const sql = 'UPDATE obrasdearte SET comentarios=? WHERE id = ? ';
        const valores = [dados.comentarioTexto , dados.pinturaId];
        db.query(sql,valores,callback);

    }
}



