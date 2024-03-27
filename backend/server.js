const express =require('express');
const mongoose = require('mongoose');
const bodyParser= require( "body-parser");
const cors= require( "cors");
const { config }= require( "dotenv");
config({ path: "../screening/.env" });
const app = express();
const { createServer }= require( "http");
const https = createServer(app);
app.use(cors());

mongoose.connect(`${process.env.MongoDB}`,)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const PORT = 8000;

app.use(bodyParser.json());


const loginRouter=require('./routes/login.route.js');
app.use('/login',loginRouter);
const QRrouter=require('./routes/qr.route.js');
app.use('/QR',QRrouter);
const movieRouter=require('./routes/movies.route.js');
app.use('/movie',movieRouter);
const paymentRouter=require('./routes/payment.route.js');
app.use('/payment',paymentRouter);
const otpRouter = require('./routes/otpRoutes.js');
app.use('/otp', otpRouter);
const authRouter = require('./routes/authRoutes.js');
app.use('/auth', authRouter); 

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
