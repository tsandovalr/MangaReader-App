const express = require("express");
const router = express.Router();

const { setChapters, getChapters, getChapter } = require("../controllers/chapterController");

router.post("/chapters", setChapters);
router.get("/chapters", getChapters);
router.get("/:id", getChapter);


module.exports = router