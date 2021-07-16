//jshint esversion:6
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const findOrCreate = require("mongoose-findorcreate")
const dotenv = require("dotenv")
const connectDB = require("./db")
const projectRoutes = require("./backend/routes/project")
const teamRoutes = require("./backend/routes/team")
const departmentRoutes = require("./backend/routes/department")
const blogRoutes = require("./backend/routes/blog")
const authRoutes = require("./backend/routes/auth")
const { notFound, errorHandler } = require("./backend/middleware/errorhandling")

dotenv.config()
connectDB()
const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())

app.use(
	session({
		secret: "Our little secret.",
		resave: false,
		saveUninitialized: false,
	})
)

app.use(passport.initialize())
app.use(passport.session())
app.use("/api/auth", authRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/team", teamRoutes)
app.use("/api/dept", departmentRoutes)
app.use("/api/blog", blogRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

app.listen(port, function () {
	console.log(`Server started on port ${port}`)
})
