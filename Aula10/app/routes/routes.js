const homeController = require('../controllers/homeController');
const homeModel = require('../models/homeModel');
const userModel = require('../models/userModel');
const userController = require('../controllers/userController')

module.exports = {
    home: (app) => {
        app.get('/', homeController.home);

        app.get('/enviar-comentario', (req, res) => {

            const { error } = homeModel.schemas.comentario.validate(req.body);

            if (error) {
                console.log("Erro de validação de atualizacao Joi: ", error.details[0].message);
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

                return res.render('insertPainting.ejs', { errors: error.details, painting: req.body })

            } else {

                homeController.addPainting(req, res);
            }
        });
    },
    getPainting: (app) => {

        app.get('/obradearte', (req, res) => {

            homeController.getPainting(req, res);

        })

    },
    updatePainting: (app) => {

        app.get('/atualizar-pintura', (req, res) => {

            res.render('updatePainting.ejs', { errors: [], painting: {} })
        });


        app.post('/atualizar-pintura', (req, res) => {

            const { error } = homeModel.schemas.atualizarObra.validate(req.body)


            if (!error) {

                homeController.atualizarPintura(req, res)

            } else {
                return res.render('updatePainting.ejs', { errors: error.details, painting: req.body })
            }
        })

    },
        inserirUsuario: (app) => {


            app.get('/user/inserir', (req, res) => {
                res.render('insertUser.ejs', { errors: [], user: {} });

            });

            app.post('/user/inserir', (req, res) => {


                const { error } = userModel.schemas.adcionarUser.validate(req.body);

                if (!error) {

                    userController.addUser(req,res);

                }else{

                    return res.render('insertUser.ejs',{errors:error.details,user:req.body});
                }

            })
        }

}
