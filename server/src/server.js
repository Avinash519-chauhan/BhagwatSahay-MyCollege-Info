require("dotenv").config();

const express = require("express");
const ConnectDB = require("./config/db");

const app = express();
ConnectDB();

app.use(express.json());

const PORT = process.env.PORT
app.listen(PORT, (err) => err ? console.log(err):console.log(`Server is Running on PORT ${PORT}`));