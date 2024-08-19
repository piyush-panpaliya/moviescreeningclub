const QR = require('./models/qr.model')
const Movie = require('./models/movie.model')
const SeatMap = require('./models/seatmap.model')
const User = require('./models/user.model')
const { config } = require('dotenv')
config({ path: './.env' })
const mongoose = require('mongoose')
const fs = require('fs')
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
  const qrCodes = await QR.aggregate([
    {
      $match: {
        deleted: false
      }
    },
    {
      $group: {
        _id: {
          seat: '$seat',
          seatmap_id: '$showtime'
        },
        count: { $sum: 1 },
        docs: { $push: '$$ROOT' }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    },
    {
      $unwind: '$docs' // Unwind the array back to individual documents
    },
    {
      $sort: {
        'docs.registrationDate': -1 // Sort by 'created' in descending order
      }
    }
  ])
  console.log(qrCodes.length)
  fs.writeFileSync('./invalidSeats.json', JSON.stringify(qrCodes, null, 2))
  process.exit(0)
}

checkViaSeatMap = async () => {
  await connectDB()
  // const seatMaps = await SeatMap.find()
  // let ValidQrs = []

  // function collectMapValues(map) {
  //   if (map && map instanceof Map) {
  //     map.forEach((value) => {
  //       ValidQrs.push(value)
  //     })
  //   }
  // }
  // seatMaps.forEach((seatMap) => collectMapValues(seatMap.seats))
  // const nSMQR = await QR.find({ _id: { $nin: ValidQrs }, deleted: false })
  // console.log(nSMQR.length)
  // fs.writeFileSync('./invalidSeatsLatest.json', JSON.stringify(nSMQR, null, 2))
  // nSMQR.forEach(async (qr) => {
  //   qr.deleted = true
  //   qr.isValid = false
  //   await qr.save()
  // })
  const qr = await QR.find({ deleted: true, isValid: false })
  fs.writeFileSync('./invalidSeatsLatest.json', JSON.stringify(qr, null, 2))
  const vals = await Promise.all(
    qr.map(async (q) => {
      const user = await User.findOne({ _id: q.user })
      const mov = await Movie.findOne({ 'showtimes._id': q.showtime })
      return { user: user.email, mov: mov.title, seat: q.seat }
    })
  )
  fs.writeFileSync(
    './invalidSeatsLatestMail.json',
    JSON.stringify(vals, null, 2)
  )
  console.log(vals)
}

// checkSeatValid();
checkViaSeatMap()
