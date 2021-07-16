const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authenticate = async (req, res, next) => {
	let token
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRETKEY)
			req.user = await User.findById(decoded.id).select("-password")
			next()
		} catch (err) {
			console.error(err)
			res.status(401)
			throw new Error("Not authorized, token failed")
		}
	}
	if (!token) {
		res.status(401)
		throw new Error("Not authorized. No token")
	}
	next()
}

module.exports = { authenticate }
