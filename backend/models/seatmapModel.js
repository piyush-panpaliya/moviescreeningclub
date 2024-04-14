const mongoose = require('mongoose');

const SeatMapSchema = new mongoose.Schema({
    showtimeid: {
        type: String,
        required: true
    },
    seats: {
        type: [Boolean], // Changed to an array of Booleans
        required: true,
        default: () => {
            const defaultSeats = [];
            for (let i = 1; i <= 381; i++) {
                defaultSeats.push(false); // Push false for each seat
            }
            return defaultSeats;
        }
    }
});

const SeatMap = mongoose.model('SeatMap', SeatMapSchema);

module.exports = SeatMap;
