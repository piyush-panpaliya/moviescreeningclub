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

app.post("/signup", async (req, res) => {
  const { name, phoneNumber, designation, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, phoneNumber, designation, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log("User details saved:", savedUser);
    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error saving User:", error);
    res.status(500).json({ error: "Error saving User" });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/saveQR", (req, res) => {
  const { email, paymentId, validity, memtype } = req.body;
  const newQR = new QR({ email, paymentId, validity, memtype });
  newQR.save()
    .then((savedQR) => {
      console.log("QR details saved:", savedQR);
      res.status(200).json(savedQR);
    })
    .catch((error) => {
      console.error("Error saving QR:", error);
      res.status(500).json({ error: "Error saving QR" });
    });
});

app.post("/send-email", (req, res) => {
  const { email, membership, paymentId, qrCodes } = req.body;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Using environment variables for email and password
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Payment Successful",
    text: `Your payment was successful. Membership: ${membership}`,
    attachments: qrCodes.map((qrCodeData, index) => ({
      filename: `QR_${index + 1}.jpg`,
      content: qrCodeData.split("base64,")[1],
      encoding: "base64",
    })),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.post("/checkPayment", async (req, res) => {
  try {
    const paymentId = req.body.paymentId;

    // Query the database to check if the payment ID exists
    const payment = await QR.findOne({ paymentId });

    if (!payment) {
      res.json({ exists: false });
    } else {
      const currentDate = new Date();
      const validityDate = new Date(payment.validitydate);

      if (currentDate > validityDate) {
        res.json({ exists: true, validityPassed: true });
      } else {
        if (payment.used) {
          res.json({ exists: true, validityPassed: false, alreadyScanned: true });
        } else {
          payment.used = true;
          await payment.save();
          res.json({ exists: true, validityPassed: false, alreadyScanned: false });
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/add-movies', (req, res) => {
  const { title, poster, description, releaseDate, genre } = req.body;
  console.log(req.body);
  const newMovie = new Movie({title,poster,description,releaseDate,genre});
  console.log("hey post reached");
  console.log(newMovie);
  newMovie.save()
    .then(movie => res.status(201).json(movie))
    .catch(err => res.status(400).json({ error: err.message }));
});


app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/memberships', async (req, res) => {
  try {
    const { email } = req.body;
    const memberships = await QR.find({ email });
    res.json(memberships);
  } catch (err) {
    console.error("Error fetching memberships:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const otpRouter = require('./routes/otpRoutes.js');
app.use('/otp', otpRouter);
const authRouter = require('./routes/authRoutes.js');
app.use('/auth', authRouter); 



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
