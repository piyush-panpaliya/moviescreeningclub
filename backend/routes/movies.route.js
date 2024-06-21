const express = require('express')
const {
	addMovie,
	getMovie,
	updatemovie,
	deletemovie,
	movieshowtimes,
	movietrailer,
	addmovieshowtimes,
	deletemovieshowtimes
} = require('@/controllers/movies.controller')
const router = express.Router()

router.post('/add-movies', addMovie)
router.get('/movies', getMovie)
router.put('/movies/:id', updatemovie)
router.delete('/movies/:id', deletemovie)
router.get('/:movieId/showtimes', movieshowtimes)
router.get('/:movieId/trailer', movietrailer)
router.post('/:movieId/showtimes', addmovieshowtimes)
router.delete('/:movieId/showtimes/:showtimeId', deletemovieshowtimes)

module.exports = router
