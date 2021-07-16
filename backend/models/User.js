const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		gender: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)
module.exports = User
