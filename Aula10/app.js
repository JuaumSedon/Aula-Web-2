const express = require('express');
const session = require('express-session');
const routes = require('./app/routes/routes'); // Ajuste o caminho se necessário

const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views"); // Ajuste o caminho se necessário
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'SEU_SEGREDO_SUPER_SECRETO', // Troque por uma variável de ambiente!
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 } // Em produção, use secure: true
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Chame todas as funções exportadas pelo seu arquivo routes.js
routes.home(app);
routes.inserirPintura(app);
routes.obraSalvar(app);
routes.getPainting(app);
routes.updatePainting(app);
routes.inserirUsuario(app); // Contém GET /registrar e POST /usuario/salvar
routes.mostrarLogin(app); // Contém GET /login
routes.autenticar(app); // Contém POST /autenticarusuario
routes.sair(app); // Contém GET /logout

// Middleware 404 (deve vir depois de todas as rotas)
app.use((req, res, next) => {
    res.status(404).render('erro.ejs', { message: 'Pagina nao encontrada' });
});

module.exports = app;