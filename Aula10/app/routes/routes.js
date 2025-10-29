// routes/routes.js

const homeController = require('../controllers/homeController');
const homeModel = require('../models/homeModel');
const userModel = require('../models/userModel');
const userController = require('../controllers/userController'); // Este controller agora tem addUser, mostrarLogin, autenticar, logout

module.exports = {
    // --- SUAS ROTAS EXISTENTES ---
    home: (app) => {
        app.get('/', homeController.home);
        // ... (sua rota de comentário) ...
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
                return res.render('insertPainting.ejs', { errors: error.details, painting: req.body });
            } else {
                homeController.addPainting(req, res);
            }
        });
    },
    getPainting: (app) => {
        app.get('/obradearte', (req, res) => {
            homeController.getPainting(req, res);
        });
    },
    updatePainting: (app) => {
        app.get('/atualizar-pintura', (req, res) => {
            res.render('updatePainting.ejs', { errors: [], painting: {} });
        });
        app.post('/atualizar-pintura', (req, res) => {
            const { error } = homeModel.schemas.atualizarObra.validate(req.body);
            if (!error) {
                homeController.atualizarPintura(req, res);
            } else {
                return res.render('updatePainting.ejs', { errors: error.details, painting: req.body });
            }
        });
    },


    inserirUsuario: (app) => {

        app.get('/registrar', (req, res) => { 
            
            userController.mostrarFormularioRegistro(req, res); 
        });

        app.post('/usuario/salvar', (req, res) => { 


            userController.adicionarUser(req, res); 
        });
    },


    mostrarLogin: (app) => {
        app.get('/login', (req, res) => {
            userController.mostrarFormularioLogin(req, res);
        });
    },

    autenticar: (app) => {
        app.post('/autenticarusuario', (req, res) => {
            userController.autenticarUsuario(req, res);
        });
    },


    sair: (app) => {
        app.get('/logout', (req, res) => {

            userController.logout(req, res);
        });
    }
};