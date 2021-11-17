const express = require("express");
const multer = require('multer');
const router = express.Router();

const { multerService } = require('../helpers/multer');
const { shareManga } = require("../controllers/shareController");

const upload = multer({ storage: multerService('../media/manga')}).fields([{name:'files', maxCount:1}]);


router.get("/:id/share", shareManga);


module.exports = router