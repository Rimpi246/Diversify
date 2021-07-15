const express = require("express");

const {
  getBlogById,
  updateBlog,
  deleteBlog,
  createBlog,
} = require("../controllers/blog");

const router = express.Router();

router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route("/").post(createBlog);

module.exports = router;
