const Department = require("../models/Department")
const Project = require("../models/Project")

const getDeptById = async (req, res) => {
	try {
		const dept = await Department.findById(req.params.id)
		if (!dept) {
			return res.status(400).json("Dept not found")
		} else {
			return res.status(200).json(dept)
		}
	} catch (err) {
		return res.status(400).json(err)
	}
}

const createDept = async (req, res) => {
	try {
		const { name, teamId } = req.body
		const newDepartment = new Department({
			name,
			team: teamId,
		})
		await newDepartment.save()
		return res.status(200).json(newDepartment)
	} catch (err) {
		return res.status(500).json(err)
	}
}

const updateDept = async (req, res) => {
	try {
		const dept = await Department.findById(req.params.id)
		if (!dept) {
			res.status(400)
			throw new Error("Department not found")
		}
		dept.name = req.body.name || dept.name
		await dept.save()
		return res.status(200).json(dept)
	} catch (err) {
		return res.status(500).json(err)
	}
}

const deleteDept = async (req, res) => {
	try {
		const dept = await Department.findById(req.params.id)
		if (!dept) {
			res.status(400)
			throw new Error("Department not found")
		}
		await dept.remove()
		return res.status(200).json("dept deleted")
	} catch (err) {
		return res.status(500).json(err)
	}
}

const getProjectsByDept = async (req, res) => {
	try {
		const projects = await Project.find({ dept: req.params.id })
		res.status(200).json(projects)
	} catch (err) {
		console.log(err)
		return res.status(500).json(err)
	}
}

module.exports = { getDeptById, createDept, updateDept, deleteDept, getProjectsByDept }
