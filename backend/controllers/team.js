const User = require("../models/User")
const Team = require("../models/Team")
const Department = require("../models/Department")
const asyncHandler = require("express-async-handler")

const getTeamById = async (req, res) => {
	try {
		const team = await Team.findById(req.params.id)
		if (!team) {
			return res.status(400).json("Team not found")
		} else {
			return res.status(200).json(team)
		}
	} catch (err) {
		return res.status(400).json(err)
	}
}

const createTeam = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
		const { name } = req.body
		const newTeam = new Team({
			name,
			admin: user,
		})
		await newTeam.save()
		return res.status(200).json(newTeam)
	} catch (err) {
		return res.status(500).json(err)
	}
}

const addMembers = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	const { member, role } = req.body
	const teamId = req.params.id
	const team = await Team.findById(teamId)

	if (team.admin.toString() !== user._id.toString()) {
		return res.status(401).json("Unauthorised")
	}
	const checkIfMember = team.members.filter((m) => m.id === member)
	if (checkIfMember.length > 0) {
		res.status(400)
		throw new Error("Member already added")
	} else {
		team.members.unshift({ id: member, role: role })
		await team.save()
		return res.json(team)
	}
})

const updateTeam = async (req, res) => {
	try {
		const team = await Team.findById(req.params.id)

		if (team.admin.toString() !== user._id.toString()) {
			return res.status(401).json("Unauthorised")
		}
		if (!team) {
			return res.status(400).json("Team not found")
		}
		team.name = req.body.name || team.name
		await team.save()
		return res.status(200).json(team)
	} catch (err) {
		return res.status(500).json(err)
	}
}

const deleteTeam = async (req, res) => {
	try {
		const team = await Team.findById(req.params.id)
		if (!team) {
			return res.status(400).json("Team not found")
		}
		await team.remove()
		return res.status(200).json("Team deleted")
	} catch (err) {
		return res.status(500).json(err)
	}
}

const getDeptsByTeam = async (req, res) => {
	try {
		const depts = await Department.find({ team: req.params.id })
		res.status(200).json(depts)
	} catch (err) {
		console.log(err)
		return res.status(500).json(err)
	}
}

module.exports = {
	getTeamById,
	createTeam,
	updateTeam,
	deleteTeam,
	getDeptsByTeam,
	addMembers,
}
