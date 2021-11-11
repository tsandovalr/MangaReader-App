require('dotenv').config();
const express = require("express");
const cors = require("cors");
//const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/userAuth");
const uploadFilesRoutes = require('./routes/routesUploadFiles');
const mangaRoutes = require('./routes/mangaRoutes');
const charpterRoutes = require('./routes/charpterRoutes');

const port = process.env.PORT || 8000;

//app.use(morgan('dev'));
app.use(cors({ origin:"http://localhost:8100", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

// ---- USERS
app.use("/register",authRoutes);
app.use("/user", authRoutes);

// ---- Gestion De Archivos
/* app.use("/upload-files", uploadFilesRoutes);
app.use("/files", uploadFilesRoutes); */
//app.use("/delete", uploadFilesRoutes);

// ---- Gestion De Mangas
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);
app.use("/manga", mangaRoutes);

// ---- Gestion De Los Capitulos
app.use("/charpter", charpterRoutes);
app.use("/charpter", charpterRoutes);
app.use("/charpter", charpterRoutes);
app.use("/charpter", charpterRoutes);
app.use("/charpter", charpterRoutes);


app.listen(port, () => {
    console.log("Server running at port: " + port);
})

