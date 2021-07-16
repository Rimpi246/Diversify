const { login, register, getToken, verify } = require("../controllers/user")
const { authenticate } = require("../middleware/auth")

const express = require("express")
const router = express.Router()

router.route("/").post(register)
router.route("/login").post(login)
router.route("/token").get(authenticate, getToken)
router.route("/verify").post(authenticate, verify)

module.exports = router
