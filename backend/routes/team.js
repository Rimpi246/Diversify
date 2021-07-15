const express = require("express")
const {
	getTeamById,
	updateTeam,
	deleteTeam,
	createTeam,
	getDeptsByTeam,
} = require("../controllers/team")

const router = express.Router()

router.route("/:id").get(getTeamById).put(updateTeam).delete(deleteTeam)
router.route("/").post(createTeam)
router.route("/:id/depts").get(getDeptsByTeam)

module.exports = router
