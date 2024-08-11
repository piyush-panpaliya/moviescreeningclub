const { config } = require('dotenv')
config({ path: './.env.prod' })
const mongoose = require('mongoose')
const MemModel = require('../backend/models/membership.model')
const UserModel = require('../backend/models/user/user.model')
const data = require('./json/memToGive.json')
const memData = require('../constants/memberships')

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		console.log('Connected to DB', mongoose.connection.db.databaseName)
	} catch (err) {
		console.log('Error connecting to DB', err)
	}
}

const init = async () => {
	await connectDB()
	data.forEach(async (d) => {
		const user = await UserModel.findOne({ email: d.email })
		const memd = memData.find((m) => m.name === d.memtype)
		const newusermem = new MemModel({
			user: user._id,
			memtype: d.memtype,
			txnId: 'migrated',
			validity: memd.validity,
			availQR: d.validQr,
			amount: memd.price.find((p) => p.type === user.designation).price,
			purchasedate: new Date(d.purchasedate),
			validitydate: new Date(
				// extra 20 days for safety
				Date.now() + (memd.validity + 20 * 24 * 3600) * 1000
			),
		})
		console.log('to add ', newusermem)
		newusermem.save()
	})
}
init()
