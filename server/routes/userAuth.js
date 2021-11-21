const express = require("express");
const router = express.Router();

const { userRegistration, userLogin, userLogout, mangasSubscribed } = require("../controllers/userController");

router.post("/", userRegistration);
router.post("/mangas", mangasSubscribed);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router