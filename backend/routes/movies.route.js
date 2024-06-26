const express = require('express')
const {
	addMovie,
	getMovie,
	updatemovie,
	deletemovie,
	getMovieById,
	addmovieshowtimes,
	deletemovieshowtimes
} = require('@/controllers/movies.controller')
const router = express.Router()

router.post('/add-movies', addMovie)
router.get('/movies', getMovie)
router.put('/movies/:id', updatemovie)
router.delete('/movies/:id', deletemovie)
router.get('/:movieId', getMovieById)
router.post('/:movieId/showtimes', addmovieshowtimes)
router.delete('/:movieId/showtimes/:showtimeId', deletemovieshowtimes)

module.exports = router
