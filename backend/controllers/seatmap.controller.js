const SeatMap = require('../models/seatmapModel');

exports.seatOccupancy = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    // Find the SeatMap document for the specified showtime ID
    const seatMap = await SeatMap.findOne({ showtimeid: showtimeId });

    // If the showtime ID is not found, return an error
    if (!seatMap) {
      return res.status(404).json({ message: "Showtime ID not found" });
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
    
    // Check if the selected seat is already occupied
    if (seatMap[seat].isOccupied) {
      return res.status(400).json({ message: `Seat ${seat} is already occupied` });
    }

    // Assign the seat for the specified showtime ID and update the email
    seatMap[seat].isOccupied = true; // Mark the seat as occupied
    seatMap[seat].email = email; // Assign the email to the seat

    // Save the updated SeatMap document
    await seatMap.save();

    // Return a success message
    res.json({ message: `Seat ${seat} assigned to ${email} for showtime ${showtimeId}` });
  } catch (error) {
    console.error("Error assigning seat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

