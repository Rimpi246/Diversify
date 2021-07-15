const mongoose = require("mongoose")

const deptSchema = mongoose.Schema({
	head: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	name: {
		type: String,
		required: true,
	},
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "companies",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
})

const Department = mongoose.model("Department", deptSchema)
module.exports = Department
