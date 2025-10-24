const express = require('express');
const router = express.Router();
const getController = require('../Controllers/getMoviesController');
const getMovieController = require('../Controllers/getMovieController');



router.get('/api/filmes',getController);
router.get('/api/filmes/:id',getMovieController);

module.exports = router;