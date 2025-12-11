const express = require('express');
const path = require('path');
const movieRoutes = require('../routes/routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); //Para interpretar forms html
app.use(express.json()); // Para interpretar o corpo da requisição como JSON

app.use('/', movieRoutes);

// 1. Rota Não Encontrada (404)
// Este middleware será executado se nenhuma rota anterior corresponder.
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada.',
  });
});

// 2. Tratamento de Erro Genérico (Error Handler)
// Este middleware "pega" qualquer erro que ocorrer nas rotas.
// Nota: Ele tem 4 argumentos (err, req, res, next).
app.use((err, req, res, next) => {
  console.error(err.stack); // Loga o erro no console para depuração
  res.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno no servidor.',
  });
});

module.exports = app;
