const express = require('express');
const movieController = require('../controllers/movies.controller');
const router = express.Router();

router.post('/add-movies', movieController.addMovie);
router.get('/movies',movieController.getMovie);
router.put("/movies/:id",movieController.updatemovie);
router.delete('/movies/:id',movieController.deletemovie);
router.get('/:movieId/showtimes',movieController.movieshowtimes);
router.post('/:movieId/showtimes',movieController.addmovieshowtimes);
router.delete('/:movieId/showtimes/:showtimeId',movieController.deletemovieshowtimes);






module.exports = router;