const express = require("express");
const multer = require('multer');
const router = express.Router();

const { multerService } = require('../helpers/multer');
const { createCharpters, getCharpters, getCharpter, deleteCharpters, updateCharpters} = require("../controllers/chapterController");

const upload = multer({ storage: multerService('../media/chapters')}).fields([{name:'files', maxCount:30}]);

router.post("/", upload ,createCharpters);
router.get("/show", getCharpters);
router.get("/:id", getCharpter);
router.put("/:id", updateCharpters);
router.delete("/:id", deleteCharpters);

module.exports = router