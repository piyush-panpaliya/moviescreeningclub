// const MemModel = require('../backend/models/membership.model')
const { config } = require('dotenv')
config({ path: './.env.prod' })
const UserModel = require('../backend/models/user/user.model')
const fs = require('fs')
const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		console.log('Connected to DB')
	} catch (err) {
		console.log('Error connecting to DB', err)
	}
}

const init = async () => {
	await connectDB()
	const usersCollection = mongoose.connection.collection('users')
	const rawUsers = await usersCollection.find().toArray()
	console.log(rawUsers.length)
	rawUsers.forEach((rawUser) => {
		const user = new UserModel(rawUser)
		const validationError = user.validateSync()
		if (validationError) {
			console.log(`User ID ${rawUser._id} is invalid:`)
		}
	})
	console.log('Validation complete')
}
init()
