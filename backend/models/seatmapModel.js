const mongoose = require('mongoose');

const SeatMapSchema = new mongoose.Schema({
    showtimeid: {
        type: String,
        required: true
    },
    seats: {
        type: Object,
        required: true,
        default: () => {
            const defaultSeats = {};
            for (let i = 1; i <= 381; i++) {
                defaultSeats[i] = {
                    isOccupied: {
                        type: Boolean,
                        default: false
                    },
                    email: {
                        type: String,
                        default: null
                    }
                };
            }
            return defaultSeats;
        }
    }
});


const SeatMap = mongoose.model('SeatMap', SeatMapSchema);

module.exports = SeatMap;
