const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                msg: "Please login to continue"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        const user = await UserModel.findById(decoded.userId)
            .select("role isEmailVerified");

        if (!user) {
            return res.status(401).json({
                msg: "Account not found, please login again"
            });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                msg: "Please verify your email first"
            });
        }

        req.userId = user._id.toString();
        req.role = user.role;

        next();

    } catch (error) {
        console.log("Authentication error:", error);

        return res.status(401).json({
            msg: "Session expired, please login again"
        });
    }
};


const authorization = (req, res, next) => {
    if (req.role !== "admin") {
        return res.status(403).json({
            msg: "Access Denied, Admin only"
        });
    }

    next();
};

module.exports = { authentication, authorization };