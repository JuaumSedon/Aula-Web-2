const app = require('./app');

const porta = 3000;

app.listen(porta, function () {
    console.log("Servidor aberto na porta",porta);
});


