const homeController = require('../controllers/homeController');
const homeModel = require('../models/homeModel');

module.exports = {
    home: (app) => {
        app.get('/', homeController.home);

        app.get('/enviar-comentario', (req, res) => {
            // CORREÇÃO: Mude de 'erro' para 'error'
            const { error } = homeModel.schemas.comentario.validate(req.query);

            if (error) {
                console.log("Erro de validação do Joi: ", error.details[0].message);
                return res.status(400).send(error.details[0].message);
            }

            homeController.enviarcomentario(req, res);
        });
    },
    inserirPintura: (app) => {

        app.get('/inserirPintura', (req, res) => {
            res.render('insertPainting.ejs', { errors: [], painting: {} });
        });
    },
    obraSalvar: (app) => {
        app.post('/obra/salvar', (req, res) => {

            const { error } = homeModel.schemas.adicionarObra.validate(req.body);

            if (error) {

                console.log("Erro de validação do Joi:", error.details[0].message);
                return res.render('insertPainting.ejs', { errors: error.details, painting: req.body })

            } else {

                homeController.addPainting(req, res);
            }
        });
    },


};