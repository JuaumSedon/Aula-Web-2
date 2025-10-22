const {home} = require('../controllers/homeController');
const {tarsila} = require('../controllers/tarsilaController');
const {portinari} = require('../controllers/portinariController');


module.exports = {

    home: (app) => {

        app.get('/', (req, res) => {
            console.log("Cheguei na rota / ");
            home(app,req,res);
            

        });

    },
    tarsila: (app) => {
        app.get('/tarsila', (req, res) => {
            console.log("Cheguei na rota /Tarsila");
            tarsila(app,req,res);

        });

    },

    portinari: (app) => {
        app.get('/portinari', (req, res) => {
            console.log("usando rota /portinari");
            portinari(app,req,res);
        })
    }
}

