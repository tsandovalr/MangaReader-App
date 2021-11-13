const express = require("express");
const multer = require('multer');
const router = express.Router();

const { multerService } = require('../helpers/multer');
const { mangaCreation, getMangas, getManga, updateManga, deleteManga } = require("../controllers/mangaController");

const upload = multer({ storage: multerService('../media/manga')}).fields([{name:'files', maxCount:1}]);

router.post("/creation",upload, mangaCreation);
router.get("/show", getMangas);
router.get("/:id", getManga);
router.put("/:id", updateManga);
router.delete("/:id", deleteManga);

module.exports = router