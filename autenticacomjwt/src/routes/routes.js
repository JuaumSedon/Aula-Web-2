const express = require('express');
const router = express.Router(); 
const Users = require('../controllers/usersController');
const isAuth = require('../utils/isAuth');

router.get('/api/users',isAuth, Users.getUsers);
router.post('/api/users', Users.addUser);
router.post('/api/users/auth', Users.authUser);


//Nova rota 
router.get('/api/users/',isAuth,Users.getUserByToken);

module.exports = router;
