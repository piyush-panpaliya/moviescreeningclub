const SeatMap = require('../models/seatmapModel');
const nodemailer= require( "nodemailer");

exports.seatOccupancy = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    // Find or create a SeatMap document for the given showtimeId
    let seatMap = await SeatMap.findOne({ showtimeid: showtimeId });

    // If the showtime ID is not found, create a new SeatMap document
    if (!seatMap) {
      seatMap = new SeatMap({ showtimeid: showtimeId });
    }

    // Extract seat occupancy information
    const seatOccupancy = seatMap.seats;

    // Return seat occupancy information
    res.json(seatOccupancy);

  } catch (error) {
    console.error("Error fetching seat occupancy:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.seatassign = async (req, res) => {
  try {
    const { showtimeId, seat } = req.params;
    const { email } = req.body;

    // Find or create a SeatMap document for the given showtimeId
    let seatMap = await SeatMap.findOne({ showtimeid: showtimeId });

    if (!seatMap) {
      seatMap = new SeatMap({ showtimeid: showtimeId });
    }

    // If the seat is already occupied, return an error
    if (seatMap.seats[seat]) {
      return res.status(400).json({ error: `Seat ${seat} is already occupied` });
    }

    // Set the seat as occupied and assign the email
    seatMap.seats[seat] = true;

    // Save the updated SeatMap document
    await seatMap.save();

    // Return a success message
    res.json({ message: `Seat ${seat} assigned to ${email} for showtime ${showtimeId}` });
  } catch (error) {
    console.error("Error assigning seat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sendseatconfmail= (req, res) => {
  const { email,selectedSeat,movie,date1,time1 } = req.body;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Movie Screening Club Seat Assignment",
    text: `You have successfully reserved the seat no. ${selectedSeat} for the movie ${movie} on ${date1} at ${time1} `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Email sent successfully");
    }
  });
};