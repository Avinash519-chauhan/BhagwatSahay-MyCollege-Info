require("dotenv").config();

const express = require("express");
const ConnectDB = require("./config/db");

const userRoute = require("./routes/userRoute");

const app = express();
ConnectDB();

app.use(express.json());

app.use("/users",userRoute);

const PORT = process.env.PORT
app.listen(PORT, (err) => err ? console.log(err):console.log(`Server is Running on PORT ${PORT}`));