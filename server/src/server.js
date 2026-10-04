require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const ConnectDB = require("./config/db");
const path = require("path")
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/userRoute");
const teacherRouter = require("./routes/teacherRoute");
const noticeBoardRoute = require("./routes/noticeBoardRoute");
const aiRoute = require("./routes/aiRoute");
const adminDashboard = require("./routes/adminDashboardRoute")

const app = express();
ConnectDB();

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));


const allowedOrigins = [
    "http://localhost:5173"
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json({limit: "100kb"}));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cookieParser());

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: { msg: "Too many attempts, please try again later" },
});

const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { msg: "Too many questions, please try again later" },
});

app.use("/users/login", authLimiter);
app.use("/users/signup", authLimiter);
app.use("/ai", aiLimiter);

app.use("/admin",adminDashboard);
app.use("/users",userRoute);
app.use("/teachers",teacherRouter);
app.use("/notice",noticeBoardRoute);
app.use("/ai",aiRoute);

app.use((req, res) => res.status(404).json({ msg: "Route not found" }));

app.use((err, req, res, next) => {
    console.log(err);
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ msg: "File is too large" });
    }
    return res.status(500).json({ msg: "Internal Server Error" });
});

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
        dotfiles: "deny",
        index: false,
        setHeaders: (res) => {
            res.setHeader("X-Content-Type-Options", "nosniff");
            res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        },
    })
);

const PORT = process.env.PORT
app.listen(PORT, (err) => err ? console.log(err):console.log(`Server is Running on PORT ${PORT}`));