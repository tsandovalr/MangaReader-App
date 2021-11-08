const express = require("express");
const router = express.Router();

const { mangaCreation, getMangas, getManga } = require("../controllers/mangaController");

router.post("/creation", mangaCreation);
router.get("/show", getMangas);
router.get("/:id", getManga);


module.exports = router