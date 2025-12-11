const express = require('express');
const moviesRoutes = require('../routes/routes')

const app = express();
app.use(express.json());


app.use('/', moviesRoutes);


app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Rota não encontrada.'
    });
});

module.exports = app;