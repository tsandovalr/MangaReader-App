const express = require("express");
const router = express.Router();

const { addComment, getComments, getComment, updateComment, deleteComment } = require("../controllers/commentController");

router.post("/create", addComment);
router.get("/show", getComments);
router.get("/:id", getComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router