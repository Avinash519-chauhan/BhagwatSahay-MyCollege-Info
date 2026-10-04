const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ msg: "Please login to continue" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithms: ["HS256"] });
        } catch (err) {
            return res.status(401).json({ msg: "Session expired, please login again" });
        }

        const user = await UserModel.findById(decoded.userId).select("role isEmailVerified");

        if (!user || !user.isEmailVerified) {
            return res.status(401).json({ msg: "Account not found, please login again" });
        }

        req.userId = user._id.toString();
        req.role = user.role;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const authorization = async(req,res,next)=>{
    try {
        
        if(req.role !== "admin"){
            return res.status(403).json({msg: "Access Denied, Admin only"})
        }
        
        next();
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", error})
    }
}

module.exports = {authentication, authorization}