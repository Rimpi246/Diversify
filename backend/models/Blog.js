const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	title: {
		type: String,
		required: true,
		required: true,
	},
	content: {
		type: String,
		required: true,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog
