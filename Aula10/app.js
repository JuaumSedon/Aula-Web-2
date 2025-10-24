const express = require('express');
const routes = require('./app/routes/routes');

const app = express();


app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('./public'))


app.use(express.json());
app.use(express.urlencoded({extended:true}));


routes.home(app);
routes.inserirPintura(app);
routes.obraSalvar(app);
routes.getPainting(app);
routes.updatePainting(app);
routes.inserirUsuario(app);


app.use((req,res,next)=>{

    res.status(404).render('erro.ejs',{message:'Pagina nao encontrada'});
    
})


module.exports = app;