    

const Joi = require('joi');

const comentarioSchema = Joi.object({
    comentario: Joi.string().min(10).max(255).required(),
    pinturaId: Joi.number().integer().required()
});

const adicionarSchema = Joi.object({
    nome: Joi.string().min(5).max(100).required(),
    artista: Joi.string().min(5).max(100).required(),
    ano: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    urlimagem: Joi.string()
});

module.exports = {
    schemas: {
        comentario: comentarioSchema,
        adicionarObra: adicionarSchema
    },

    getPaitings: (db, callback) => {
        db.query('SELECT * FROM obrasdearte', callback);
    },
    salvarComentario: (db, dados, callback) => {
        const sql = 'UPDATE obrasdearte SET comentarios=? WHERE id = ? ';
        const valores = [dados.comentarioTexto, dados.pinturaId];
        db.query(sql, valores, callback);
    },
    addPainting: (db, dados, callback) => {
        const sql = 'INSERT INTO obrasdearte (nome , artista , ano , urlimagem) VALUES(?,?,?,?)';
        const valores = [dados.nome, dados.artista, dados.ano, dados.urlimagem];
        db.query(sql, valores, callback);
    }
};


