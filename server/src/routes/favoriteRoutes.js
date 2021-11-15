const express = require("express");
const router = express.Router();

const { addFavorite ,getFavoriteManga } = require("../controllers/favoritesController");

router.post("/show/addfavmanga", addFavorite);
router.get("/favorite", getFavoriteManga);

module.exports = router