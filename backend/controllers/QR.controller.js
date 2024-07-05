const QR = require('@/models/qr.model')
const QRCode = require('qrcode')
const Movie = require('@/models/movie.model')

const getQRs = async (req, res) => {
  const { userId } = req.user
  try {
    const allQRs = await QR.find({ user: userId })

    const resQr = {
      used: [],
      unused: [],
      expired: []
    }
    for (qr of allQRs) {
      if (qr.expirationDate > new Date()) {
        if (qr.used) {
          resQr.used.push({
            expirationDate: qr.expirationDate,
            isValid: qr.isValid,
            registrationDate: qr.registrationDate,
            seat: qr.seat,
            used: qr.used
          })
        } else {
          const movie = await Movie.findOne({ 'showtimes._id': qr.showtime })
          resQr.unused.push({
            qrData: await QRCode.toDataURL(
              Buffer.from(`${userId},${qr._id},${qr.seat},${qr.code}`).toString(
                'base64'
              )
            ),
            expirationDate: qr.expirationDate,
            isValid: qr.isValid,
            registrationDate: qr.registrationDate,
            seat: qr.seat,
            used: qr.used,
            movie: {
              title: movie.title,
              genre: movie.genre,
              showtime: movie.showtimes.id(qr.showtime)
            }
          })
        }
      } else {
        qr.isValid = false
        resQr.expired.push({
          expirationDate: qr.expirationDate,
          isValid: qr.isValid,
          registrationDate: qr.registrationDate,
          seat: qr.seat,
          used: qr.used
        })
        qr.save()
      }
    }

    res.status(200).json({ qrCodes: resQr })
  } catch (error) {
    console.error('Error fetching valid QR codes:', error)
    res.status(500).json({ error: 'Error fetching valid QR codes' })
  }
}
const check = async (req, res) => {
  try {
    const qrData = req.body.qrData
    if (!qrData) {
      return res.status(400).json({ error: 'No QR data provided' })
    }
    const decodedQR = Buffer.from(qrData, 'base64').toString('utf-8')
    const [userId, qrId, seat, hash] = decodedQR.split(',')
    const qr = await QR.findOne({ _id: qrId, user: userId, seat, code: hash })
      .populate('user')
      .populate('membership')

    if (!qr) {
      return res.json({ exists: false })
    }
    if (qr.used) {
      return res.json({
        exists: true,
        validityPassed: false,
        used: true
      })
    }
    if (qr.expirationDate < new Date()) {
      qr.isValid = false
      qr.save()
      return res.json({
        exists: true,
        validityPassed: true,
        used: false
      })
    }
    qr.used = true
    await qr.save()
    const movie = await Movie.findOne({ showtimes: qr.showtime })
    return res.json({
      exists: true,
      validityPassed: false,
      used: false,
      email: qr.user.email,
      seat: qr.seat,
      name: qr.user.name,
      show: movie.showtimes.id(qr.showtime).date,
      movie: movie.title
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
module.exports = {
  getQRs,
  check
}
