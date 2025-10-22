const dbConn = require('../../config/dbConnection');
const homeModel = require('../models/homeModel');

module.exports.home = (req, res) => {



    homeModel.getPaitings(dbConn, (err, result) => {

        if (err) {
            console.log("Erro detalhado do banco : ", err);

            return res.status(500).send("Erro ao recarregar as obras");
        } else {

            return res.render("home.ejs", { paintings: result });

        }
    })


};

module.exports.enviarcomentario = (req, res) => {


    const dadosComentario = {
        comentarioTexto: req.query.comentario,
        pinturaId: req.query.pinturaId
    };


    homeModel.salvarComentario(dbConn, dadosComentario, (err, result) => {

        if (err) {
            console.log("Erro ao atualizar banco : ", err);

            return res.status(500).send("Erro ao atualizar banco de dados");
        } else {

            res.redirect('/');

        }
    })



};