require("dotenv").config();

const express = require("express");
const ConnectDB = require("./config/db");
const path = require("path")

const userRoute = require("./routes/userRoute");
const teacherRouter = require("./routes/teacherRoute");
const noticeBoardRoute = require("./routes/noticeBoardRoute");

const app = express();
ConnectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users",userRoute);
app.use("/teachers",teacherRouter);
app.use("/notice",noticeBoardRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT
app.listen(PORT, (err) => err ? console.log(err):console.log(`Server is Running on PORT ${PORT}`));