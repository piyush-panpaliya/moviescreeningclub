const SeatMap = require('../models/seatmapModel');

exports.seatOccupancy = async (req, res) => {
  try {
    
    const { showtimeId } = req.params;

    let seatMap = await SeatMap.findOne({ showtimeid: showtimeId });

    // If the showtime ID is not found, create a new SeatMap document
    if (!seatMap) {
      seatMap = new SeatMap({ showtimeid: showtimeId });
    }
    // Extract seat occupancy information
    const seatOccupancy = {};
    Object.keys(seatMap._doc).forEach(seat => {
      if (seat !== "_id" && seat !== "showtimeid") {
        seatOccupancy[seat] = seatMap[seat].isOccupied;
      }
    });
    
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

    // Find the SeatMap document for the specified showtime ID
    let seatMap = await SeatMap.findOne({ showtimeid: showtimeId });

    // If the showtime ID is not found, create a new SeatMap document
    if (!seatMap) {
      seatMap = new SeatMap({ showtimeid: showtimeId });
    }
    
    // If the seat does not exist in the seatMap, initialize it
    if (!seatMap.seats[seat]) {
      seatMap.seats[seat] = { isOccupied: true, email: email };
    } else {
      // If the seat exists, set the 'isOccupied' property to true
      seatMap.seats[seat].isOccupied = true;
      seatMap.seats[seat].email = email; // Update the email
    }

    // Save the updated SeatMap document
    await seatMap.save();

    // Return a success message
    res.json({ message: `Seat ${seat} assigned to ${email} for showtime ${showtimeId}` });
  } catch (error) {
    console.error("Error assigning seat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};