const express = require("express");
const router = express.Router();

const { userRegistration } = require("../controllers/register");
const { userLogin } = require("../controllers/login");
const { userLogout } = require("../controllers/logout");

router.post("/", userRegistration);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router