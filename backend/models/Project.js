const mongoose = require("mongoose")

const projectSchema = mongoose.Schema({
	head: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	members: [
		{
			id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
			role: { type: String, required: true },
		},
	],
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Teams",
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: "ongoing",
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	startDate: {
		type: Date,
		default: Date.now(),
	},
	dueDate: {
		type: Date,
	},
})

const Project = mongoose.model("Project", projectSchema)
module.exports = Project
