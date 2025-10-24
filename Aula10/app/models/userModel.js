const Joi = require('joi');
const userSchema = Joi.object({

    email: Joi.string()
        .email()
        .max(255)
        .required().messages({
            'string.base': `Este campo deve ser um email`,
            'any.required': `Este campo é obrigatório`
        }),

    senha: Joi.string().pattern(/\d/, 'número')
        .pattern(/[A-Za-z]/, 'letra')
        .required()
        .messages({
            'string.pattern.name': 'A senha deve conter pelo menos 1 {#name}.',
            'string.empty': 'Senha é obrigatória.',
            'any.required': 'Senha é obrigatória.'
        })
});


module.exports = {

    schemas: {

        adcionarUser: userSchema

    },

    addUser: (db, dados, callback) => {

        const sql = 'INSERT INTO users (email,password) VALUES (?,?)';
        const info = [dados.email, dados.senha];

        db.query(sql, info, callback);

    }

}


