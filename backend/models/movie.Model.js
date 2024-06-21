const mongoose = require('mongoose')

const ShowtimeSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique identifier for the showtime
	date: { type: Date },
	time: { type: String }
})

const MovieSchema = new mongoose.Schema({
	title: { type: String, required: true },
	poster: { type: String },
	description: { type: String },
	releaseDate: { type: Date, required: true },
	genre: { type: String, required: true },
	currentscreening: { type: Boolean },
	showtimes: {
		type: [ShowtimeSchema]
	},
	trailer: { type: String } // New field for movie trailer
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
