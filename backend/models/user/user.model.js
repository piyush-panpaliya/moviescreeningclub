const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	usertype: {
		type: String,
		default: 'standard'
	}
})

const User = mongoose.model('User', UserSchema)

module.exports = User
