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
		return res.status(400).json(err)
	}
}

const register = async (req, res) => {
	try {
		const { email, password, name } = req.body
		const userExists = await User.findOne({ email })
		if (userExists) {
			res.status(400)
			throw new Error("User already exists")
		}
		const user = await User.create({
			name,
			email,
			password,
		})
		if (user) {
			return res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "30d" }),
			})
		} else {
			return res.status(404).json("User not found")
		}
	} catch (err) {
		return res.status(400).json(err)
	}
}

module.exports = { login, register }
