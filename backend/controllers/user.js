const jwt = require("jsonwebtoken")
const User = require("../models/User")
const asyncHandler = require("express-async-handler")
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const login = asyncHandler(async (req, res) => {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (user && (await user.matchPassword(password))) {
			return res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "30d" }),
			})
		} else {
			throw new Error("Invalid email or password")
		}
})

const register = asyncHandler(async (req, res) => {
	const { email, password, name, gender, contact } = req.body
	const userExists = await User.findOne({ email })

	if (userExists) {
		throw new Error("Email is already in use")
	}
	const user = await User.create({
		name,
		email,
		password,
		gender,
		contact,
	})
	if (user) {
		return res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			gender: user.gender,
			contact: user.contact,
			token: jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "30d" }),
		})
	} else {
		throw new Error("Error while creating user")
	}
})

const getToken = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (!user) {
		res.status(401)
		throw new Error("User not authorized")
	}
	const { contact } = user
	client.verify
		.services(process.env.TWILIO_SERVICE_ID)
		.verifications.create({
			to: `+${contact}`,
			channel: "sms",
		})
		.then((data) => {
			res.status(200).send({
				message: "Verification is sent!",
				contact,
				data,
			})
		})
})

const verify = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (!user) {
		res.status(401)
		throw new Error("User not authorized")
	}
	const { contact } = user
	const { code } = req.body
	if (contact && code) {
		const data = await client.verify
			.services(process.env.TWILIO_SERVICE_ID)
			.verificationChecks.create({
				to: `+${contact}`,
				code,
			})
		if (data.status === "approved") {
			user.verified = true
			await user.save()
			res.status(200).send({
				message: "User is Verified!!",
				data,
			})
		}
	} else {
		res.status(400).send({
			message: "Wrong phone number or code",
			phonenumber: contact,
		})
	}
})

module.exports = { login, register, getToken, verify }
