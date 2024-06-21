const express = require('express')
const router = express.Router()
const {
	getAllMovies,
	voteMovie,
	addvotemovie,
	deletevotemovie
} = require('@/controllers/vote.controller')

// Route to get all movies
router.get('/movies', getAllMovies)

// Route to vote for a movie
router.post('/vote', voteMovie)
router.post('/addvotemovie', addvotemovie)
router.delete('/deletevotemovie/:id', deletevotemovie)

module.exports = router
