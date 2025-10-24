const express = require('express');
const router = express.Router();
const getController = require('../Controllers/getController');



router.get('/api/filmes',getController);




module.exports = router;