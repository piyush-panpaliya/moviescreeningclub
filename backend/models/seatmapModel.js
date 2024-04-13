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
    A1:{isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A2: {isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A3: {isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A4: {isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A5:{isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A6: {isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A7: {isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A8:{isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A9: {isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
    A10: {isOccupied: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: null
    }},
});

const SeatMap = mongoose.model('SeatMap', SeatMapSchema);

module.exports = SeatMap;
