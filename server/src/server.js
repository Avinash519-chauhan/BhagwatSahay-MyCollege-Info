require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const path = require("path")
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/userRoute");
const teacherRouter = require("./routes/teacherRoute");
const noticeBoardRoute = require("./routes/noticeBoardRoute");
const aiRoute = require("./routes/aiRoute");

const app = express();
ConnectDB();

const allowedOrigins = [
    "http://localhost:5173/"
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/users",userRoute);
app.use("/teachers",teacherRouter);
app.use("/notice",noticeBoardRoute);
app.use("/ai",aiRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT
app.listen(PORT, (err) => err ? console.log(err):console.log(`Server is Running on PORT ${PORT}`));