const jwt = require("jsonwebtoken")
const User = require("../models/User")
const asyncHandler = require("express-async-handler")

const login = async (req, res) => {
	try {
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
			return res.status(401).json("Invalid email or password")
		}
	} catch (err) {
		console.log(err)
		return res.status(400).json(err)
	}
}

const register = async (req, res) => {
	try {
		const { email, password, name, gender } = req.body
		const userExists = await User.findOne({ email })

		if (userExists) {
			return res.status(404).json("Email is already in use")
		}
		const user = await User.create({
			name,
			email,
			password,
			gender,
		})
		if (user) {
			return res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				gender: user.gender,
				token: jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "30d" }),
			})
		} else {
			return res.status(404).json("Error while creating user")
		}
	} catch (err) {
		return res.status(400).json(err)
	}
}

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
