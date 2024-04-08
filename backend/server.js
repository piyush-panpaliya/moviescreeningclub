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
