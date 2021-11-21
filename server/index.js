require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path")

const app = express();

const authRoutes = require("./routes/userAuth");
const mangaRoutes = require('./routes/mangaRoutes');
const charpterRoutes = require('./routes/chapterRoutes');

let whitelist = ['http://localhost:8100'];
const port = process.env.PORT || 8000;

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods:'GET,POST,DELETE,PUT,OPTIONS'
}));

app.use(express.static(path.join(__dirname + '/media/manga')));
app.use(express.static(path.join(__dirname + '/media/chapters')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

// ---- USERS
app.use("/register",authRoutes);
app.use("/user", authRoutes);
app.use("/user", authRoutes);
app.use("/user", authRoutes);
app.use("/user", authRoutes);

// ---- Gestion De Mangas
app.use("/manga", mangaRoutes);
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

