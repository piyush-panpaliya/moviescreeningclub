const express = require('express')
const {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
  getMovieByShowTime,
  addMovieShowtimes,
  deleteMovieShowtimes
} = require('@/controllers/movies.controller')
const { verifyJWTWithRole } = require('@/middleware')

const router = express.Router()

router.get('/', getMovies)
router.get('/:movieId', verifyJWTWithRole('standard'), getMovieById)
router.get(
  '/show/:showtimeId',
  verifyJWTWithRole('standard'),
  getMovieByShowTime
)
router.post('/add', verifyJWTWithRole('movievolunteer'), addMovie)
router.put('/:id', verifyJWTWithRole('movievolunteer'), updateMovie)
router.delete('/:id', verifyJWTWithRole('movievolunteer'), deleteMovie)
router.post(
  '/:movieId/showtimes',
  verifyJWTWithRole('movievolunteer'),
  addMovieShowtimes
)
router.delete(
  '/:movieId/:showtimeId',
  verifyJWTWithRole('movievolunteer'),
  deleteMovieShowtimes
)

module.exports = router
