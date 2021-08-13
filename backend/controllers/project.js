const asyncHandler = require("express-async-handler")
const Project = require("../models/Project")

const createProject = asyncHandler(async (req, res) => {
		const { name, teamId } = req.body
		const newProject = new Project({
			head: req.user._id,
			name,
			team: teamId,
		})
		await newProject.save()
		return res.status(200).json(newProject)
})

const getProjectById = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id)
	if (!project) {
		return res.status(400).json("Project not found")
	} else {
		return res.status(200).json(project)
	}
})

const updateProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id)
	if (!project) {
		res.status(400)
		throw new Error("Project not found")
	}
	project.name = req.body.name || project.name
	await project.save()
	return res.status(200).json(project)
})

const deleteProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id)
	if (!project) {
		res.status(400)
		throw new Error("Project not found")
	}
	await project.remove()
	return res.status(200).json("Project deleted")
})

module.exports = { getProjectById, createProject, updateProject, deleteProject }
