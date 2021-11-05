const express = require("express");
const router = express.Router();

const { uploadFiles } = require("../controllers/controllerUploadFiles");
const { getFiles } = require("../controllers/controllerUploadFiles");

router.post("/", uploadFiles);
router.get("/", getFiles);

module.exports = router