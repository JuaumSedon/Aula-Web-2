//Importar model
const { addMovie } = require('../Models/moviesModel')

const Joi = require('joi');


const schema = Joi.object().keys({

    name: Joi.string().min(1).max(50).required(),
    director: Joi.string().min(1).max(50).required(),
    link: Joi.string().min(1).max(150).required(),
})




const addMovieController = async (req, res) => {


    console.log("add movie controller");

    const { error, value } = schema.validate(req.body);



    if (error) {

        const validationMessage = `Erro de validação: campo ${error.details[0].context.key} é obrigatório.`;


        res.status(400).json({
            code: 400,
            status: 'error',
            message: validationMessage
        })

    }


    try {

        const addedMovie = await addMovie(value);

        res.status(201).json({
            status: 'success',
            code: 201,
            message: "Filme cadastrado com sucesso.",
            data: [addedMovie]
        })


    } catch (error) {


        res.status(500).json({

            status: 'error',
            code: 500,
            message: "Erro ao adicionar filme",
            error: error.message,
        });

    }


}



module.exports = addMovieController;