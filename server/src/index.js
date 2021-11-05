require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/userAuth");
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

app.use("/register", authRoutes);
app.use("/user", authRoutes);

app.listen(port, () => {
    console.log("Server running at port: " + port);
})