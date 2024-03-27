const mongoose=require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String},
  description: { type: String},
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
});

const Movie = mongoose.model('Movie',MovieSchema);

module.exports=Movie;