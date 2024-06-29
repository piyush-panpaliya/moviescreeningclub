const otpGenerator = require('otp-generator')
const OTP = require('@/models/user/otp.model')
const User = require('@/models/user/user.model')

const userOTP = async (req, res) => {
	const { email } = req.body
	try {
		const user = await User.findOne({ email })
		if (user) {
			return res.status(401).json({ error: 'User already exists please login' })
		}
		res.status(200).json({ message: 'User not found' })
	} catch (error) {
		console.error('Error during fetch:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

const userOTP1 = async (req, res) => {
	const { email } = req.body
	try {
		const user = await User.findOne({ email })
		if (user) {
			return res.status(200).json({ message: 'Userfound' })
		}
		res.status(401).json({ error: 'User not found please signup' })
	} catch (error) {
		console.error('Error during fetch:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

const sendOTP = async (req, res) => {
	try {
		const { email } = req.body

		// Generate OTP
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false
		})

		// Save OTP in the database
		await OTP.create({ email, otp })

		// Create Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: 'gmail', // e.g., 'Gmail'
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			}
		})

		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: 'Verify your Chalchitra Email Address',
			html: `<h1>Please confirm your OTP</h1>
      <p>Here is your OTP code: ${otp}</p>`
		}

		await transporter.sendMail(mailOptions)

		res.status(200).json({
			success: true,
			message: 'OTP sent successfully'
		})
	} catch (error) {
		console.error('Error sending OTP:', error)
		return res.status(500).json({
			success: false,
			message: 'Failed to send OTP. Please try again later.'
		})
	}
}

const sendOTPforgot = async (req, res) => {
	try {
		const { email } = req.body

		// Generate OTP
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false
		})

		// Save OTP in the database
		await OTP.create({ email, otp })

		// Create Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: 'gmail', // e.g., 'Gmail'
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			}
		})

		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: 'Password Reset',
			html: `<h1>Please confirm your OTP</h1>
      <p>Here is your OTP code: ${otp}</p>`
		}

		await transporter.sendMail(mailOptions)

		res.status(200).json({
			success: true,
			message: 'OTP sent successfully'
		})
	} catch (error) {
		console.error('Error sending OTP:', error)
		return res.status(500).json({
			success: false,
			message: 'Failed to send OTP. Please try again later.'
		})
	}
}

module.exports = { userOTP, userOTP1, sendOTP, sendOTPforgot }
