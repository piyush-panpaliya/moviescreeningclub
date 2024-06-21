const mongoose = require('mongoose')

const Temp = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	degree: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	membership: {
		type: String,
		required: true
	},
	transactionId: {
		type: String,
		required: true
	},
	flag: {
		type: String,
		default: 'No'
	},
	imageUrl: {
		type: String,
		required: true
	}
})

const TempSchema = mongoose.model('TempSchema', Temp)

module.exports = TempSchema
