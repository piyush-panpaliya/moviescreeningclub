const express = require('express')
const router = express.Router()
const movieController = require('@/controllers/vote.controller')

// Route to get all movies
router.get('/movies', movieController.getAllMovies)

// Route to vote for a movie
router.post('/vote', movieController.voteMovie)
router.post('/addvotemovie', movieController.addvotemovie)
router.delete('/deletevotemovie/:id', movieController.deletevotemovie)

module.exports = router
