const SeatMap = require('../models/seatmap.model');

exports.assignSeat = async (req, res) => {
  try {
    const { showtimeId, seat } = req.params;
    const { email } = req.body;

    // Find the seat map entry for the given showtimeId
    let seatMap = await SeatMap.findOne({ showtimeid: showtimeId });

    // If the seat map entry doesn't exist, create a new one
    if (!seatMap) {
      seatMap = new SeatMap({
        showtimeid: showtimeId
      });
    }

    // Mark the selected seat as occupied and assign the email
    seatMap[seat] = true;
    seatMap[`${seat}.email`] = email;

    // Save the updated seat map entry
    await seatMap.save();

    res.json({ message: `Seat ${seat} assigned for showtime ${showtimeId} to ${email}` });
  } catch (error) {
    console.error("Error assigning seat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
