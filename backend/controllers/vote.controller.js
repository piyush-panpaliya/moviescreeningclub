const Movie = require('@/models/vote.model')

// Controller to fetch all movies
const getAllMovies = async (req, res) => {
	try {
		const movies = await Movie.find()
		res.status(200).json({ movies })
	} catch (error) {
		console.error('Error fetching movies:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

const voteMovie = async (req, res) => {
	const { movieId, voteType, userEmail } = req.body

	try {
		const movie = await Movie.findById(movieId)
		if (!movie) {
			return res.status(404).json({ message: 'Movie not found' })
		}
		if (movie.voters.includes(userEmail)) {
			return res
				.status(403)
				.json({ message: 'You have already voted for this movie' })
		}

		// Update the vote count based on the vote type
		if (voteType === 'yes') {
			movie.yesCount++
		} else if (voteType === 'no') {
			movie.noCount++
		}

		// Add the user to the voters list
		movie.voters.push(userEmail)

		// Save the updated movie
		await movie.save()

		res.status(200).json({ message: 'Vote recorded successfully' })
	} catch (error) {
		console.error('Error voting for movie:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

// admin,movievlun,volun
const addvotemovie = async (req, res) => {
	try {
		const { title, poster, genre } = req.body
		// Create a new movie document
		const newMovie = new Movie({ title, poster, genre })
		// Save the new movie to the database
		await newMovie.save()
		res.status(201).json({ message: 'Movie added successfully' })
	} catch (error) {
		console.error('Error adding movie:', error)
		res.status(500).json({ error: 'Failed to add movie' })
	}
}

// Route to delete a movie by ID
// admin,movievlun,volun
const deletevotemovie = async (req, res) => {
	try {
		const movieId = req.params.id
		await Movie.findByIdAndDelete(movieId)
		res.json({ message: 'Movie deleted successfully' })
	} catch (error) {
		console.error('Error deleting movie:', error)
		res.status(500).json({ error: 'Failed to delete movie' })
	}
}

module.exports = { getAllMovies, voteMovie, addvotemovie, deletevotemovie }
