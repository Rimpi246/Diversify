const Project = require("../models/Project")

const createProject = async (req, res) => {
	try {
		const { name, deptId } = req.body
		const newProject = new Project({
			name,
			dept: deptId,
		})
		await newProject.save()
		return res.status(200).json(newProject)
	} catch (err) {
		return res.status(500).json(err)
	}
}

const getProjectById = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id)
		if (!project) {
			return res.status(400).json("Project not found")
		} else {
			return res.status(200).json(project)
		}
	} catch (err) {
		return res.status(400).json(err)
	}
}

const updateProject = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id)
		if (!project) {
			res.status(400)
			throw new Error("Project not found")
		}
		project.name = req.body.name || project.name
		await project.save()
		return res.status(200).json(project)
	} catch (err) {
		return res.status(500).json(err)
	}
}

const deleteProject = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id)
		if (!project) {
			res.status(400)
			throw new Error("Project not found")
		}
		await project.remove()
		return res.status(200).json("Project deleted")
	} catch (err) {
		return res.status(500).json(err)
	}
}

module.exports = { getProjectById, createProject, updateProject, deleteProject }
