const mongoose = require('mongoose');

const ShowtimeSchema = new mongoose.Schema({
  date: { type: Date, default : Date.now()},
  time: { type: String,default : new Date().toLocaleTimeString()}
});

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String },
  description: { type: String },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  currentscreening: { type: Boolean },
  showtimes: {
    type: [ShowtimeSchema],
    default: [{ date: Date.now(), time: new Date().toLocaleTimeString() }]
  }});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
