const mongoose = require('mongoose')

const SeatMapSchema = new mongoose.Schema({
	showtimeid: {
		type: String,
		required: true,
	},
	seats: {
		type: Map,
		of: Boolean,
		required: true,
		default: () => {
			const defaultSeats = new Map()
			const rows = [
				'A',
				'B',
				'C',
				'D',
				'E',
				'F',
				'G',
				'H',
				'I',
				'J',
				'K',
				'L',
				'M',
				'N',
				'O',
				'P',
				'Q',
				'R',
				'S',
				'T',
			]
			for (let row of rows) {
				let rowCount
				switch (row) {
					case 'A':
					case 'B':
						rowCount = 27
						break
					case 'C':
					case 'D':
					case 'E':
						rowCount = 30
						break
					case 'F':
						rowCount = 36
						break
					case 'G':
						rowCount = 38
						break
					case 'H':
						rowCount = 40
						break
					case 'I':
						rowCount = 41
						break
					case 'J':
					case 'K':
					case 'L':
					case 'M':
					case 'N':
					case 'O':
					case 'P':
						rowCount = 36
						break
					case 'Q':
						rowCount = 42
						break
					case 'R':
					case 'S':
						rowCount = 43
						break
					case 'T':
						rowCount = 44
						break
					default:
						rowCount = 0
				}
				for (let i = 1; i <= rowCount; i++) {
					defaultSeats.set(row + i, false) // Set seat as false for each seat
				}
			}
			return defaultSeats
		},
	},
})

const SeatMap = mongoose.model('SeatMap', SeatMapSchema)

module.exports = SeatMap
