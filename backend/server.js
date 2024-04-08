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

mongoose.connect(`${process.env.MongoDB}`,)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const PORT = 8000;
app.use(bodyParser.json());

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
