const Movie = require('../models/movie.Model');

exports.addMovie= (req, res) => {
  const { title, poster, description, releaseDate, genre } = req.body;
  console.log(req.body);
  const newMovie = new Movie({title,poster,description,releaseDate,genre});
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