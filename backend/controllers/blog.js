const Team = require("../models/Team");
const Department = require("../models/Department");

const getBlogById = async (req, res) => {
  try {
    const blog = await Team.findById(req.params.id);
    if (!blog) {
      return res.status(400).json("Blog not found");
    } else {
      return res.status(200).json(blog);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({
      title,
      content,
    });
    await newBlog.save();
    return res.status(200).json(newBlog);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json("Blog not found");
    }
    blog.title = req.body.title || blog.title;
    await blog.save();
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json("Blog not found");
    }
    await blog.remove();
    return res.status(200).json("Blog deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { getBlogById, createBlog, updateBlog, deleteBlog };
