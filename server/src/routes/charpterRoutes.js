const express = require("express");
const router = express.Router();

const { createCharpters, getCharpters, getCharpter, deleteCharpters, updateCharpters} = require("../controllers/charpterController");

router.post("/", createCharpters);
router.get("/show", getCharpters);
router.get("/:id", getCharpter);
router.put("/:id", updateCharpters);
router.delete("/:id", deleteCharpters);

module.exports = router