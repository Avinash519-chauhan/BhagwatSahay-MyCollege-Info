const express = require("express");
const router = express.Router();

const {signupUser,loginUser,getUser,updateProfile,deleteUser} = require("../controllers/userController")

const {authentication,authorization} = require("../middleware/auth")

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.get("/getuser",authentication,getUser);
router.put("/update",authentication,updateProfile);
router.delete("/delete",authentication,deleteUser);

module.exports = router;