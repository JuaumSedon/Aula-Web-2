/*
para listar
curl http://localhost:4000/api/users

curl -X GET http://localhost:4000/api/users \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsYm9yZGlnbm9uQGdtYWlsLmNvbSIsImlhdCI6MTc2MjM0OTk1OSwiZXhwIjoxNzYyMzUzNTU5fQ.BFkW72MhGLUCOnteWMNJL3jTMcrfjc-yCMfESikMGQo' \
-H 'Content-Type: application/json' | jq


Para adicionar

curl -X POST http://localhost:4000/api/users \
     -H "Content-Type: application/json" \
      -d '{
      "email": "albordignon@gmail.com",
      "password": "ifsp@1234"
    }'

Para autenticar
curl -X POST http://localhost:4000/api/users/auth \
     -H "Content-Type: application/json" \
     -d '{
    "email": "albordignon@gmail.com",
    "password": "ifsp@1234"
  }'
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const util = require('util');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const UsersModel = require('../models/usersModel');

// O número de 'salt rounds' (o custo da criptografia).
// 10-12 é um bom valor padrão. Quanto maior, mais seguro, mas mais lento.
const saltRounds = 10;

const passwordRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<,>.?/|~`]).{5,}$/;

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Valida o formato de e-mail. 'tlds: { allow: false }' permite qualquer TLD (.com, .br, etc.)
    .required()
    .messages({
      'string.email': 'O e-mail fornecido não é válido.',
      'any.required': 'O e-mail é obrigatório.',
    }),
  password: Joi.string()
    .min(5) // Garante no mínimo 5 caracteres
    .required()
    .regex(passwordRegex)
    .messages({
      'string.min': 'A senha deve ter no mínimo 5 caracteres.',
      'any.required': 'A senha é obrigatória.',
      'string.regex.base':
        'A senha deve incluir pelo menos um número e um símbolo.',
    }),
});

const authSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(5).required(),
});

const getUsers = async (req, res) => {
  console.log('[Users Controller] getUsers');
  try {
    const users = await UsersModel.getUsers();
    if (!users || users.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Nenhum usuário encontrado.',
        data: [],
      });
    }
    console.log(`[Users controller: Encontrados ${users.length} usuários]`);
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    console.error(`[Users Controller Error] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Ocorreu um erro ao buscar os usuários.',
    });
  }
};

const addUser = async (req, res) => {
  console.log('[Add User Controller]');
  const { error, value } = schema.validate(req.body);

  if (error) {
    const validationMessage = `Erro de validação: campo "${error.details[0].context.key}" é obrigatório.`;
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: validationMessage,
    });
  }

  try {
    const plainPassword = value.password;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // 3. Substituir a senha em texto puro pela senha criptografada
    value.password = hashedPassword;

    const userToSave = { ...value, date: new Date() };

    const addedUser = await UsersModel.addUser(userToSave);
    if (addedUser && addedUser.password) {
      delete addedUser.password;
    }
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Usuário cadastrado com sucesso.',
      data: [addedUser],
    });
  } catch (err) {
    console.error('[Add User Error]', err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Erro interno ao adicionar usuário.',
      error: err.message,
    });
  }
};


const getUserByToken = async (req, res) => {

  console.log('[Users Controller] Acessando perfil do usuário');

  res.status(200).json({
    status: 'success',
    message: 'Perfil do usuário recuperado com sucesso.',
    data: req.user
  });
}



const authUser = async (req, res) => {
  console.log('[Authenticate User Controller]');
  const { error, value } = authSchema.validate(req.body);
  console.log(error);
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'E-mail ou senha em formato inválido.',
    });
  }

  try {
    // 2. Buscar o usuário pelo e-mail
    const user = await UsersModel.findByEmail(value.email);
    console.log(user);
    console.log(user.password, value.password);
    if (!user || !(await bcrypt.compare(value.password, user.password))) {
      // É uma boa prática de segurança retornar uma mensagem genérica para não dar dicas a invasores
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'E-mail ou senha incorretos.',
      });
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload: inclua dados essenciais (NUNCA a senha)
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Expira em 1 hora
    );
    // 4. Retornar a resposta com o token
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Autenticação bem-sucedida.',
      token: token,
      // Opcional: retornar dados básicos do usuário (sem a senha)
      data: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error('[Auth User Error]', err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Erro interno ao autenticar usuário.',
      error: err.message,
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  authUser,
  getUserByToken
};
