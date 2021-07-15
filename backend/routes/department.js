const express = require("express")
const {
	getDeptById,
	updateDept,
	deleteDept,
	createDept,
	getProjectsByDept,
} = require("../controllers/department")

const router = express.Router()

router.route("/:id").get(getDeptById).put(updateDept).delete(deleteDept)
router.route("/").post(createDept)
router.route("/:id/projects").get(getProjectsByDept)

module.exports = router
