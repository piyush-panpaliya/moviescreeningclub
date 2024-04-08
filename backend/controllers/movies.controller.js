const Movie = require('../models/movie.Model');

exports.addMovie= (req, res) => {
  const { title, poster, description, releaseDate, genre, currentscreening } = req.body;
  console.log(req.body);
  const newMovie = new Movie({title,poster,description,releaseDate,genre,currentscreening});
  console.log("hey post reached");
  console.log(newMovie);
  newMovie.save()
    .then(movie => res.status(201).json(movie))
    .catch(err => res.status(400).json({ error: err.message }));
};


exports.getMovie= async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Error updating movie" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    // Find the movie by ID and delete it
    const result = await Movie.findByIdAndDelete(movieId);
    res.json(result); // Return the deleted movie
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Error deleting movie" });
  }
};