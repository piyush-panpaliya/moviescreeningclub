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

app.post('/saveusermem', async (req, res) => {
  console.log("b");
  const{email,memtype,validity} = req.body;
  const newusermem = new Memdata({ email, memtype, validity });
  console.log("c");
  newusermem.save()
    .then((savedusermem) => {
      console.log("Usermem details saved:", savedusermem);
      res.status(200).json(savedusermem);
    })
    .catch((error) => {
      console.error("Error saving Usermem:", error);
      res.status(500).json({ error: "Error saving Usermem" });
    });
});

app.get('/memberships/:email', async (req, res) => {
  const { email } = req.params;
  try {
    // Find all memberships associated with the given email
    const memberships = await Memdata.find({ email });
    res.status(200).json({ memberships });
  } catch (error) {
    console.error('Error fetching memberships:', error);
    res.status(500).json({ error: 'Error fetching memberships' });
  }
});

app.get('/userType/:email', async (req, res) => {
  try {
    const { email } = req.params;
    // Find the user by email
    const user = await User.findOne({ email });
    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Return the user's userType
    res.status(200).json({ userType: user.usertype });
  } catch (error) {
    console.error('Error fetching user type:', error);
    res.status(500).json({ error: 'Error fetching user type' });
  }
});


app.post('/updateUserType', async (req, res) => {
  try {
    const { email, userType } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's userType
    user.usertype = userType;

    // Save the updated user
    await user.save();

    // Return success response
    res.status(200).json({ message: 'User type updated successfully', user });
  } catch (error) {
    console.error('Error updating user type:', error);
    res.status(500).json({ error: 'Error updating user type' });
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

// Start server 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
