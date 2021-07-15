const express = require("express")
const {
	getProjectById,
	updateProject,
	deleteProject,
	createProject,
} = require("../controllers/project")

const router = express.Router()

router.route("/:id").get(getProjectById).put(updateProject).delete(deleteProject)
router.route("/").post(createProject)

module.exports = router
