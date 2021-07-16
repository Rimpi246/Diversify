const express = require("express")
const {
	getTeamById,
	updateTeam,
	deleteTeam,
	createTeam,
	getDeptsByTeam,
	addMembers,
} = require("../controllers/team")
const { authenticate } = require("../middleware/auth")

const router = express.Router()

router
	.route("/:id")
	.get(authenticate, getTeamById)
	.put(authenticate, updateTeam)
	.delete(authenticate, deleteTeam)
router.route("/").post(authenticate, createTeam)
router.route("/:id/depts").get(authenticate, getDeptsByTeam)
router.route("/:id/add-member").post(authenticate, addMembers)

module.exports = router
