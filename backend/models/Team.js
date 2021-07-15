const mongoose = require("mongoose")

const teamSchema = mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	name: {
		type: String,
		required: true,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
})

const Team = mongoose.model("Team", teamSchema)
module.exports = Team
