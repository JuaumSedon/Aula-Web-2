const express = require('express');
const routes = require('./app/routes/routes');

const app = express();
const porta = 3000;

app.disable('view cache');
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('./public'))


routes.home(app);
routes.tarsila(app);
routes.portinari(app);


app.listen(porta, function () {

    console.log("Servidor aberto na porta",porta);
});


