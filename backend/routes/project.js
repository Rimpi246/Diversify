const express = require("express")
const {
	getProjectById,
	updateProject,
	deleteProject,
	createProject,
} = require("../controllers/project")
const { authenticate } = require("../middleware/auth")

const router = express.Router()

router.route("/:id").get(authenticate, getProjectById).put(authenticate, updateProject).delete(authenticate, deleteProject)
router.route("/").post(authenticate, createProject)

module.exports = router
