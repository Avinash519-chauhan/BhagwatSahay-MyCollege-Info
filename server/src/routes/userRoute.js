const express = require("express");
const router = express.Router();

const {signupUser,verifyEmail,loginUser,getUser,updateProfile,deleteUser,getAllUser,adminDeleteUser} = require("../controllers/userController")

const {authentication,authorization} = require("../middleware/auth")

router.post("/signup",signupUser);
router.get("/verify-email/:token",verifyEmail);
router.post("/login",loginUser);
router.get("/getuser",authentication,getUser);
router.put("/update",authentication,updateProfile);
router.delete("/delete",authentication,deleteUser);

//admin
router.get("/getalluser",authentication,authorization,getAllUser);
router.delete("/delete/:id",authentication,authorization,adminDeleteUser);

module.exports = router;