const express = require('express');
const movieController = require('../controllers/movies.controller');
const router = express.Router();

router.post('/add-movies', movieController.addMovie);
router.get('/movies',movieController.getMovie);
router.delete('/delete-movie/:id', movieController.deleteMovie);
router.post('/update-movie/:id', movieController.updateMovie);
module.exports = router;