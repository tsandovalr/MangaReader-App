const express = require("express");
const router = express.Router();

const { mangaCreation, getMangas, getManga, updateManga, deleteManga } = require("../controllers/mangaController");

router.post("/creation", mangaCreation);
router.get("/show", getMangas);
router.get("/:id", getManga);
router.put("/:id", updateManga);
router.delete("/:id", deleteManga);

module.exports = router