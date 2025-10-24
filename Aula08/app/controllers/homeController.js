const dbConn = require('../../config/dbConnection');
const homeModel = require('../models/homeModel');


module.exports.home = (req, res) => {

    homeModel.getPaitings(dbConn, (err, result) => {

        if (err) {
            return res.status(500).send("Erro ao recarregar as obras");
        } else {

            return res.render("home.ejs", { paintings: result });

        }
    })


};


module.exports.atualizarPintura = (req, res) => {

    const dadosPintura = { ...req.body };

    homeModel.modificarPintura(dbConn, dadosPintura, (err, result) => {

        if (err) {
            console.log("Erro ao atualizar banco : ", err);

            return res.status(500).send("Erro ao atualizar banco de dados");
        } else {

            res.redirect('/');

        }   
    })
}

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
module.exports.addPainting = async (req, res) => {

    const dadosObra = req.body

    homeModel.addPainting(dbConn, dadosObra, (err, result) => {
        if (err) {
            console.log("Erro no addPainting home Controller : ", err);

            return res.status(500).send("Erro", err);
        } else {

            res.redirect('/');

        }
    })

};

module.exports.getPainting = (req, res) => {

    const pinturaId = req.query.idobra;
    console.log("ESSE É O ID DA OBRA", pinturaId);

    homeModel.getPaintingModel(pinturaId, dbConn, (error, result) => {

        if (error || !result || result.length === 0) {
            return res.status(404).send('Pintura nao encontrada')
        }
        res.render('showPainting.ejs', { painting: result[0] });
    })

};
