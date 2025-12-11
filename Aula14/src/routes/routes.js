const express = require('express');
const router = express.Router();
const getController = require('../Controllers/getMoviesController');
const getMovieController = require('../Controllers/getMovieController');
const addMovieController = require('../Controllers/addMovieController');
const getDateController = require('../Controllers/getDateMovieController')



router.get('/api/filmes',getController);
router.get('/api/filmes/:id',getMovieController);
router.post('/api/filmes', addMovieController);
router.get('/api/filmesdata/:date',getDateController);

module.exports = router;