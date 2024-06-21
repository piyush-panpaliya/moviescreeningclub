require('module-alias/register')
const { config } = require('dotenv')
config({ path: './.env' })

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { createServer } = require('http')
const path = require('path')

const loginRouter = require('@/routes/user/login.route.js')
const votepagerouter = require('@/routes/voteroute.js')
const membershipsRouter = require('@/routes/user/membershipsRoutes.js')
const userRouter = require('@/routes/user/userRoutes.js')
const authRouter = require('@/routes/user/authRoutes.js')
const otpRouter = require('@/routes/user/otpRoutes.js')
const SeatMapRouter = require('@/routes/seatmapRoutes.js')
const paymentRouter = require('@/routes/payment.route.js')
const movieRouter = require('@/routes/movies.route.js')
const qrRouter = require('@/routes/qr.route.js')

const PORT = 8000

const app = express()
const https = createServer(app)

mongoose
	.connect(`${process.env.MongoDB}`)
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('MongoDB connection error:', error))

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.use((req, _, next) => {
	if (req.url.match(/(assets|images|index.html|.*.svg)$/)) return
	console.log(`${req.method} ${req.url}`)
	next()
})

app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/otp', otpRouter)

app.use('/QR', qrRouter)
app.use('/movie', movieRouter)
app.use('/seatmaprouter', SeatMapRouter)
app.use('/memrouter', membershipsRouter)
app.use('/voterouter', votepagerouter)

app.use('/payment', paymentRouter)

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
})

https.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
