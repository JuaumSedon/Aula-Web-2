const express = require('express');
const routes = require('./app/routes/routes');

const app = express();
const porta = 3000;


app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('./public'))


app.use(express.json())
app.use(express.urlencoded({extended:true}));

routes.home(app);
routes.inserirPintura(app);
routes.obraSalvar(app);
routes.getPainting(app);
routes.updatePainting(app);


app.listen(porta, function () {
    console.log("Servidor aberto na porta",porta);
});


