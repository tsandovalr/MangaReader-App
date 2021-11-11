require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/userAuth");
const uploadFilesRoutes = require('./routes/routesUploadFiles');
const mangaRoutes = require('./routes/mangaRoutes');
const chapterRoutes = require('./routes/chapterRoutes');

const port = process.env.PORT || 8200;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

// ---- USERS
app.use("/register", authRoutes);
app.use("/user", authRoutes);

// ---- Gestion De Archivos
app.use("/upload-files", uploadFilesRoutes);
app.use("/files", uploadFilesRoutes);
app.use("/delete", uploadFilesRoutes);

// ---- Gestion De Mangas
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);

// ---- Gestion De Chapters
app.use("/manga/chapter", chapterRoutes);
app.use("/manga/chapter", chapterRoutes);
app.use("/manga/chapter", chapterRoutes);



app.listen(port, () => {
    console.log("Server running at port: " + port);
})



/* const whitelist = ['http://localhost:8100', 'https://manga-reader-node.herokuapp.com/', undefined];
const dynamicCorsOptions = {
  origin(origin, callback) {
    console.log('Origin is: ', origin);
    if (whitelist.indexOf(origin) !== -1) { 
      callback(null, true);
    } else {
      callback(new Error(`${origin} blocked by CORS`));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}; */