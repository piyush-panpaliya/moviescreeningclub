const mongoose = require('mongoose')
const moment = require('moment')

const MemdataSchema = new mongoose.Schema({
	email: String,
	memtype: String,
	validity: Number,
	purchasedate: {
		type: String, // Change type to String
		default: function () {
			return moment().format('DD-MM-YYYY') // Format date as dd-mm-yyyy
		},
	},
	validitydate: {
		type: String, // Change type to String
		default: function () {
			const validityDate = moment(this.purchasedate, 'DD-MM-YYYY').add(
				this.validity,
				'days'
			)
			return validityDate.format('DD-MM-YYYY') // Format date as dd-mm-yyyy
		},
	},
})

const Memdata = mongoose.model('Memdata', MemdataSchema)

module.exports = Memdata
