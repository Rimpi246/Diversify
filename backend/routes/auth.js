const { login, register } = require("../controllers/user")

const express = require("express")
const router = express.Router()

router.route("/").post(register)
router.route("/login").post(login)

module.exports = router
