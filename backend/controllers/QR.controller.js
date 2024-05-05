const QR = require('../models/qr.Model');
const nodemailer= require( "nodemailer");
const moment = require('moment');

exports.addQR= (req, res) => {
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
};

exports.sendQR= (req, res) => {
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
    text: `Your payment was successful for ${membership} membership`,
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
};

exports.getValidQRs = async (req, res) => {
  const { email } = req.params;
  try {
    const today = new Date();
    const validQRs = [];
    const allQRs = await QR.find({ email: email });

    allQRs.forEach((qr) => {
      // Extract date components from validitydate string
      const parts = qr.validitydate.split('-');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
      const year = parseInt(parts[2], 10);
      
      // Construct Date object
      const validityDate = new Date(year, month, day);

      // Check if validity date is after current date
      if (validityDate > today) {
        validQRs.push(qr);
      }
    });
    res.status(200).json({ qrCodes: validQRs });
  } catch (error) {
    console.error('Error fetching valid QR codes:', error);
    res.status(500).json({ error: 'Error fetching valid QR codes' });
  }
};

exports.markQRUsed = async (req, res) => {
  try {
    const { paymentId, seat } = req.params;
    const { date, showtime } = req.body; // Retrieve date and showtime from request body

    // Find the QR object based on the paymentId
    const qr = await QR.findOne({ paymentId:paymentId });

    // If QR object not found, return 404 Not Found error
    if (!qr) {
      return res.status(404).json({ error:'QR not found' });
    }

    // Parse date and showtime to construct expiration time
    const expirationTime = moment(`${date} ${showtime}`, 'DD-MM-YYYY hh:mm A').add({ hours: 8, minutes: 30 });
    console.log(expirationTime);
    // Update the 'used' field of the QR object
    qr.used = true;
    qr.seatnumber = seat;
    console.log("Seat assigned",seat);

    // Set the expiration date for the QR
    qr.expirationDate = expirationTime;
    console.log(expirationTime);

    // Save the updated QR object back to the database
    await qr.save();

    // Respond with success message and showtime & date
    res.status(200).json({ 
      message: 'QR marked as used successfully', 
      showtime: showtime, 
      date: date 
    });
  } catch (error) {
    console.error('Error marking QR as used:', error);
    res.status(500).json({ error: 'Error marking QR as used' });
  }
};


exports.isQRUsed = async (req, res) => {
  const {paymentId,seat} = req.params;

  try {
    // Find the QR data based on paymentId
    const qrData = await QR.findOne({ paymentId });

    if (!qrData) {
      // If QR data does not exist for the given paymentId, send 404 Not Found
      return res.status(404).json({ error: 'QR data not found' });
    }

    // Check if the QR data is used
    if (qrData.used) {
      // If QR data is already used, send a message indicating that it's used
      return res.status(400).json({ message: 'QR data already used' });
    }

    // If QR data exists, is valid, and not used, send the QR data
    res.json(200);
  } catch (error) {
    // If there's an error, send 500 Internal Server Error
    console.error('Error fetching QR data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.areallQRUsed = async (req, res) => {
  const { email } = req.params;
  try {
    const today = new Date();
    const validQRs = [];
    const allQRs = await QR.find({ email: email });

    allQRs.forEach((qr) => {
      // Extract date components from validitydate string
      const parts = qr.validitydate.split('-');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
      const year = parseInt(parts[2], 10);
      
      // Construct Date object
      const validityDate = new Date(year, month, day);

      // Check if validity date is after current date
      if (validityDate > today) {
        validQRs.push(qr);
      }
    });
    const allUsed = validQRs.every(qr => qr.used);
    if (allUsed) {
      // If all valid QRs are used, return success response
      console.log('All valid QRs are already used');
      res.status(200).json({ message: 'All valid QRs are already used' });
    } else {
      // If any valid QRs are not used, return 200 status with a custom message
      console.log('All valid QRs are not already used');
      res.status(200).json({ message: 'Some valid QRs are not used yet' });
    }
  } catch (error) {
    console.error('Error fetching valid QR codes:', error);
    res.status(500).json({ error: 'Error fetching valid QR codes' });
  }
};



exports.sendEmail = async (req, res) => {
  const { email, seatNumber, movie, date, time} = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Seat Booking Confirmation',
      html: `
        <body class="bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white">
          <div class="max-w-lg mx-auto p-4">
            <div class="bg-white dark:bg-zinc-900 shadow-lg rounded-lg p-5">
              <div class="flex-container" style="display: flex; align-items: center; justify-content: space-between;">
              <div class="mr-4 my-4" style="margin-right: 20px;">
              <img src="https://github.com/aryanjain2005/repo1/blob/main/logo2-DANloDCY.jpg?raw=true" alt="Logo" style="width: 100px; height: 100px;">
            </div>
            <div class="mx-5" style="margin-left: 20px;">
              <p class="text-sm mb-1">Your seat has been booked.</p>
              <div class="text-left">
                <p><strong>Movie Name:</strong> ${movie}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Seat Number:</strong> ${seatNumber}</p>
              </div>
            </div>
              </div>
              <div class="mt-6">
                <h2 class="font-bold text-xl mb-3">Rules and Regulation</h2>
                <ol class="list-decimal pl-4">
                  <li><strong>Respectful Behavior:</strong> All attendees must behave respectfully towards others, including fellow audience members, organizers, and staff.</li>
                  <li><strong>No Outside Food or Drink:</strong> For cleanliness and safety reasons, attendees should not bring outside food or drink into the auditorium. Food items purchased in lobby are also not allowed inside auditorium.</li>
                  <li><strong>Arrival Time:</strong> Attendees are encouraged to arrive 15 minutes before the screening time to minimize waiting times/disruptions once the movie starts.</li>
                  <li><strong>No Talking During the Movie:</strong> Attendees are requested to refrain from talking during the movie to ensure everyone can enjoy the film without distractions.</li>
                  <li><strong>Silence Mobile Devices:</strong> Attendees are asked to silence their mobile phones or set them to vibrate mode to avoid disruptions.</li>
                  <li><strong>Respect the Seating Arrangement:</strong> Attendees should sit only in designated seats and not block aisles or exits. Strict action would be taken if attendees are found to be sitting on seats not assigned to them.</li>
                  <li><strong>No Recording or Photography:</strong> The recording or photography of the movie screen during the screening is strictly prohibited. Legal action would be initiated against violators.</li>
                  <li><strong>Follow Instructions from Staff:</strong> Attendees should comply with any instructions given by event staff or volunteers.</li>
                  <li><strong>Children's Supervision:</strong> Parents are requested to supervise their children to ensure they do not disturb other attendees.</li>
                  <li><strong>Cleanliness:</strong> Attendees to keep the auditorium clean by disposing of trash properly and respecting the facility.</li>
                  <li><strong>Respect Intellectual Property:</strong> Movie being screened is for personal enjoyment only and not for any commercial purposes or distribution.</li>
                  <li><strong>Ticket Validity:</strong> Once a ticket is scanned you are not allowed to exit the auditorium premises, once exited ticket will not be valid.</li>
                </ol>
              </div>
            </div>
          </div>
        </body>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
