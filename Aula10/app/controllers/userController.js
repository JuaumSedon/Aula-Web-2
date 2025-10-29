// controllers/userController.js

const dbConn = require('../../config/dbConnection');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const mostrarFormularioRegistro = (req, res) => {
    res.render('insertUser.ejs', { errors: [], user: {} });
};

const adicionarUser = (req, res) => {
    const { email, password, confirmpassword } = req.body;

    const errors = [];
    if (!email || !password || !confirmpassword) {
        errors.push({ msg: 'Todos os campos são obrigatórios.' });
    }
    if (password !== confirmpassword) {
        errors.push({ msg: 'As senhas não coincidem.' });
    }
    if (password && password.length < 6) {
        errors.push({ msg: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    if (errors.length > 0) {
        return res.render('insertUser.ejs', { errors: errors, user: { email: email } });
    }

    userModel.findUserByEmail(dbConn, email, (err, userExists) => {
        if (err) {
            console.error("Erro ao verificar email:", err);
            errors.push({ msg: 'Erro no servidor ao verificar email.' });
            return res.render('insertUser.ejs', { errors: errors, user: { email: email } });
        }
        if (userExists) {
            errors.push({ msg: 'Este email já está cadastrado.' });
            return res.render('insertUser.ejs', { errors: errors, user: { email: email } });
        }

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error("Erro ao gerar hash:", err);
                return res.status(500).send("Erro no servidor ao processar senha.");
            }

            const dadosParaSalvar = {
                email: email,
                passwordHash: hash
            };

            userModel.addUser(dbConn, dadosParaSalvar, (err, result) => {
                if (err) {
                    console.error("Erro do banco ao salvar usuário:", err);
                    errors.push({ msg: 'Ocorreu um erro ao salvar no banco.' });
                    return res.render('insertUser.ejs', { errors: errors, user: { email: email } });
                }
                console.log("Usuário salvo com sucesso!");
                res.redirect('/login');
            });
        });
    });
};

const mostrarFormularioLogin = (req, res) => {
    res.render('authenticationform.ejs', { errors: [] });
};

const autenticarUsuario = (req, res) => {
    const { email, password } = req.body;

    userModel.findUserByEmail(dbConn, email, (err, user) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.render('authenticationform.ejs', { errors: [{ msg: 'Erro no servidor.' }] });
        }
        if (!user) {
            return res.render('authenticationform.ejs', { errors: [{ msg: 'Email ou senha inválidos.' }] });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Erro ao comparar senhas:", err);
                return res.render('authenticationform.ejs', { errors: [{ msg: 'Erro no servidor.' }] });
            }

            if (isMatch) {
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    // nome: user.nome // Adicione se tiver
                };
                console.log("Login bem-sucedido:", req.session.user);
                res.redirect('/');
            } else {
                return res.render('authenticationform.ejs', { errors: [{ msg: 'Email ou senha inválidos.' }] });
            }
        });
    });
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao fazer logout:", err);
            return res.status(500).send("Erro ao sair.");
        }
        res.redirect('/');
    });
};

module.exports = {
    mostrarFormularioRegistro,
    adicionarUser,
    mostrarFormularioLogin,
    autenticarUsuario,
    logout
};