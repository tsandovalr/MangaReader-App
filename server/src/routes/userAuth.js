const express = require("express");
const router = express.Router();

const { userRegistration } = require("../controllers/register");
const { userLogin } = require("../controllers/login");

router.post("/", userRegistration);

router.post("/login", userLogin);

module.exports = router