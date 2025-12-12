const express = require('express');

const taskRoutes = require('./routes/routes');
const app = express();


app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use('/', taskRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada.',
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno no servidor.',
  });
});

module.exports = app;
