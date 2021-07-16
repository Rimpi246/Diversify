const jwt = require("jsonwebtoken")
const User = require("../models/User")

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

module.exports = { login, register }
