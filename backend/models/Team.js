const mongoose = require("mongoose")

const teamSchema = mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
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
	members: [
		{
			id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
			role: { type: String, required: true },
		},
	],
})

const Team = mongoose.model("Team", teamSchema)
module.exports = Team
