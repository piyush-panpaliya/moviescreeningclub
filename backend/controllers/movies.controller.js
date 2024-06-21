const Movie = require('@/models/movie.model')
const SeatMap = require('@/models/seatmap.model')

exports.addMovie = (req, res) => {
	const {
		title,
		poster,
		description,
		releaseDate,
		genre,
		trailer,
		currentscreening,
	} = req.body
	console.log(req.body)
	const newMovie = new Movie({
		title,
		poster,
		description,
		releaseDate,
		genre,
		trailer,
		currentscreening,
	})
	console.log(newMovie)
	newMovie
		.save()
		.then((movie) => res.status(201).json(movie))
		.catch((err) => res.status(400).json({ error: err.message }))
}

exports.getMovie = async (req, res) => {
	try {
		const movies = await Movie.find()
		res.json(movies)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

exports.updatemovie = async (req, res) => {
	const { id } = req.params
	try {
		const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		res.json(updatedMovie)
	} catch (error) {
		console.error('Error updating movie:', error)
		res.status(500).json({ error: 'Error updating movie' })
	}
}

exports.deletemovie = async (req, res) => {
	try {
		const movieId = req.params.id
		// Find the movie by ID and delete it
		const result = await Movie.findByIdAndDelete(movieId)
		res.json(result) // Return the deleted movie
	} catch (error) {
		console.error('Error deleting movie:', error)
		res.status(500).json({ error: 'Error deleting movie' })
	}
}

exports.movieshowtimes = async (req, res) => {
	try {
		const { movieId } = req.params
		const movie = await Movie.findById(movieId)
		if (!movie) {
			return res.status(404).json({ error: 'Movie not found' })
		}
		res.json(movie.showtimes)
	} catch (error) {
		console.error('Error fetching showtimes:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

exports.movietrailer = async (req, res) => {
	try {
		const { movieId } = req.params
		const movie = await Movie.findById(movieId)
		if (!movie) {
			return res.status(404).json({ error: 'Movie not found' })
		}
		res.json(movie.trailer)
	} catch (error) {
		console.error('Error fetching trailer:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

exports.addmovieshowtimes = async (req, res) => {
	try {
		const { movieId } = req.params

		// Find the movie by its ID
		const movie = await Movie.findById(movieId)
		if (!movie) {
			return res.status(404).json({ error: 'Movie not found' })
		}

		// Extract the showtime data from the request body
		const { date, time } = req.body

		// Add the new showtime to the movie's showtimes array
		movie.showtimes.push({ date, time })

		// Save the updated movie document
		await movie.save()

		// Create a new SeatMap object associated with the newly added showtime
		const showtime = movie.showtimes[movie.showtimes.length - 1]
		const seatMap = new SeatMap({ showtimeid: showtime._id })
		await seatMap.save()

		// Return the updated movie document as the response
		res.json(movie)
	} catch (error) {
		console.error('Error adding showtime:', error)
		res.status(500).json({ error: 'Error adding showtime' })
	}
}

exports.deletemovieshowtimes = async (req, res) => {
	try {
		const { movieId, showtimeId } = req.params
		// Find the movie by ID
		const movie = await Movie.findById(movieId)
		if (!movie) {
			return res.status(404).json({ error: 'Movie not found' })
		}
		// Remove the showtime from the movie's showtimes array
		movie.showtimes.pull({ _id: showtimeId })
		await movie.save()
		res.json({ message: 'Showtime deleted successfully' })
	} catch (error) {
		console.error('Error deleting showtime:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}
