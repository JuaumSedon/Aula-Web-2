const homeController = require('../controllers/homeController');

module.exports = {
    home: (app) => {
        app.get('/', homeController.home);
        app.get('/enviar-comentario', homeController.enviarcomentario);
    },

};