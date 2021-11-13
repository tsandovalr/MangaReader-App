require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

const authRoutes = require("./routes/userAuth");
const mangaRoutes = require('./routes/mangaRoutes');
const charpterRoutes = require('./routes/chapterRoutes');

const port = process.env.PORT || 8000;

app.use(cors({ origin:"http://localhost:8100", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));  
app.use(express.static(__dirname + '/media/manga'));
app.use(express.static(__dirname + '/media/chapters'));

// ---- USERS
app.use("/register",authRoutes);
app.use("/user", authRoutes);
app.use("/user", authRoutes);

// ---- Gestion De Mangas
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);

// ---- Gestion De Los Capitulos
app.use("/chapter", charpterRoutes);
app.use("/chapter", charpterRoutes);
app.use("/chapter", charpterRoutes);
app.use("/chapter", charpterRoutes);
app.use("/chapter", charpterRoutes);


app.listen(port, () => {
    console.log("Server running at port: " + port);
})

