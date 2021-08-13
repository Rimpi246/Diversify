const User = require("../models/User")
const Team = require("../models/Team")
const asyncHandler = require("express-async-handler")

const getTeamById = asyncHandler(async (req, res) => {
	const team = await Team.findById(req.params.id)
	if (!team) {
		throw new Error("Team not found")
	}
	if (team.admin.toString() !== req.user._id.toString()) {
		throw new Error("Unauthorised")
	}
	else {
		return res.status(200).json(team)
	}
})

const createTeam = asyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id)
		const { name } = req.body
		const newTeam = new Team({
			name,
			admin: user,
		})
		await newTeam.save()
		return res.status(200).json(newTeam)
})

const addMembers = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	const { member, role } = req.body
	const teamId = req.params.id
	const team = await Team.findById(teamId)

	if (team.admin.toString() !== user._id.toString()) {
		throw new Error("Unauthorised")
	}
	const checkIfMember = team.members.filter((m) => m.id === member)
	if (checkIfMember.length > 0) {
		res.status(400)
		throw new Error("Member is already part of the team")
	} else {
		team.members.unshift({ id: member, role: role })
		await team.save()
		return res.json(team)
	}
})

const updateTeam = asyncHandler(async (req, res) => {
	const team = await Team.findById(req.params.id)
	if (!team) {
		throw new Error("Team not found")
	}
	if (team.admin.toString() !== req.user._id.toString()) {
		throw new Error("Unauthorised")
	}
	team.name = req.body.name || team.name
	await team.save()
	return res.status(200).json(team)
})

const deleteTeam = asyncHandler(async (req, res) => {
		const team = await Team.findById(req.params.id)
		if (!team) {
			throw new Error("Team not found")
		}
		if (team.admin.toString() !== req.user._id.toString()) {
			throw new Error("Unauthorised")
		}
		await team.remove()
		return res.status(200).json("Team deleted")
})

module.exports = {
	getTeamById,
	createTeam,
	updateTeam,
	deleteTeam,
	addMembers,
}
