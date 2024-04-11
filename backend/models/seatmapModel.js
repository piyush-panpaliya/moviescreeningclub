const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }
});

const SeatMapSchema = new mongoose.Schema({
    showtimeid: {
        type: String,
        required: true
    },
    A1: SeatSchema,
    A2: SeatSchema,
    A3: SeatSchema,
    A4: SeatSchema,
    A5: SeatSchema,
    A6: SeatSchema,
    A7: SeatSchema,
    A8: SeatSchema,
    A9: SeatSchema,
    A10: SeatSchema
});

const SeatMap = mongoose.model('SeatMap', SeatMapSchema);

module.exports = SeatMap;
