const express = require('express');
const router = express.Router();
const SeatMapController = require('../controllers/seatmap.controller');


router.get('/seatmap/:showtimeId/seats',SeatMapController.seatOccupancy);
router.put('/seatmap/:showtimeId/:seat',SeatMapController.seatassign);
module.exports = router;