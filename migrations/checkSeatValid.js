const QR = require('./models/qr.model')
const { config } = require('dotenv')
config({ path: './.env' })
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to DB', mongoose.connection.db.databaseName)
  } catch (err) {
    console.log('Error connecting to DB', err)
  }
}

const checkSeatValid = async () => {
  await connectDB()
  const qrCodes = await QR.find({})
  const seatMap = {}
  const invalidSeats = []
  qrCodes.forEach((qr) => {
    if (seatMap[qr.showtime]) {
      if (seatMap[qr.showtime].includes(qr.seat)) {
        invalidSeats.push({
          seat: qr.seat,
          showtime: qr.showtime,
          count: qrCodes.filter(
            (q) => q.showtime === qr.showtime && q.seat === qr.seat
          ).length
        })
      } else {
        seatMap[qr.showtime].push(qr.seat)
      }
    } else {
      seatMap[qr.showtime] = [qr.seat]
    }
  })
  console.log(invalidSeats)
  process.exit(0)
}

checkSeatValid()
