const express =require('express');
const mongoose = require('mongoose');
const bodyParser= require( "body-parser");
const cors= require( "cors");
const { config }= require( "dotenv");
config({ path: "../screening/.env" });
const app = express();
const { createServer }= require( "http");
const https = createServer(app);
const Memdata = require ('./models/memdataModel.js');
app.use(cors());
const User = require ("./models/userModel.js");
const Movie = require('./models/movie.Model');

mongoose.connect(`${process.env.MongoDB}`,)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const PORT = 8000;
app.use(bodyParser.json());

app.put("/movie/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Error updating movie" });
  }
});

app.delete('/movie/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    // Find the movie by ID and delete it
    const result = await Movie.findByIdAndDelete(movieId);
    res.json(result); // Return the deleted movie
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Error deleting movie" });
  }
});

app.get('/movie/:movieId/showtimes', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie.showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/movie/:movieId/showtimes', async (req, res) => {
  try {
    const { movieId } = req.params;
    
    // Find the movie by its ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    // Extract the showtime data from the request body
    const { date, time } = req.body;

    // Add the new showtime to the movie's showtimes array
    movie.showtimes.push({ date, time });
    
    // Save the updated movie document
    await movie.save();
    
    // Return the updated movie document as the response
    res.json(movie);
  } catch (error) {
    console.error("Error adding showtime:", error);
    res.status(500).json({ error: "Error adding showtime" });
  }
});

app.delete('/movie/:movieId/showtimes/:showtimeId', async (req, res) => {
  try {
    const { movieId, showtimeId } = req.params;
    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    // Remove the showtime from the movie's showtimes array
    movie.showtimes.pull({ _id: showtimeId });
    await movie.save();
    res.json({ message: 'Showtime deleted successfully' });
  } catch (error) {
    console.error('Error deleting showtime:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const loginRouter = require('./routes/login.route.js');
app.use('/login', loginRouter);
const qrRouter = require('./routes/qr.route.js');
app.use('/QR', qrRouter); 
const movieRouter = require('./routes/movies.route.js');
app.use('/movie', movieRouter);
const paymentRouter = require('./routes/payment.route.js');
app.use('/payment', paymentRouter); 
const otpRouter = require('./routes/otpRoutes.js');
app.use('/otp', otpRouter);
const authRouter = require('./routes/authRoutes.js');
app.use('/auth', authRouter); 
const userRouter = require('./routes/userRoutes.js');
app.use('/user', userRouter);
const membershipsRouter = require('./routes/membershipsRoutes.js');
app.use('/memrouter', membershipsRouter);

// Start server 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
