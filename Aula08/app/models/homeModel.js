
const Joi = require('joi');

const comentarioSchema = Joi.object({
    comentario: Joi.string().min(10).max(255).required().messages({
        'string.base': `O campo "comentario" deve ser um texto.`,
        'string.min': `O campo "comentario" deve ter no mínimo {#limit} caracteres.`,
        'any.required': `O campo "comentario" é obrigatório.`
    }),
    pinturaId: Joi.number().integer().required()
});

const adicionarSchema = Joi.object({
    nome: Joi.string().min(5).max(100).required(),
    artista: Joi.string().min(5).max(100).required(),
    ano: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    urlimagem: Joi.string()
});

const atualizarSchema = Joi.object({
    nome: Joi.string().min(5).max(100).required(),
    artista: Joi.string().min(5).max(100).required(),
    ano: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    urlimagem: Joi.string(),
    id: Joi.number().integer().required()
});

module.exports = {
    schemas: {
        comentario: comentarioSchema,
        adicionarObra: adicionarSchema,
        atualizarObra: atualizarSchema,
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
    },
    getPaintingModel: (idObra, db, callback) => {

        const sql = `SELECT * FROM obrasdearte WHERE id=${idObra};`;
        db.query(sql, callback);


    },
    modificarPintura: (db, dados, callback) => {

        const sql = 'UPDATE obrasdearte SET nome = ?, artista = ?, ano = ?, urlimagem = ? WHERE id = ?';
        const valores = [dados.nome, dados.artista, dados.ano, dados.urlimagem, dados.id];
        db.query(sql, valores, callback);


    }
};


