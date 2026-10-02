const express = require("express");
const router = express.Router();

const {createTeacherProfile,getTeacherProfile,updateTeacherProfile,deleteTeacher} = require("../controllers/teacherController")

const {authentication, authorization} = require("../middleware/auth")

const upload = require("../config/multer")

router.post("/create-teacher",authentication,authorization,upload.single("teacherImage"),createTeacherProfile);
router.get("/get-teacher",authentication,getTeacherProfile);
router.put("/update-teacher/:id",authentication,authorization,upload.single("teacherImage"),updateTeacherProfile);
router.delete("/delete-teacher/:id",authentication,authorization,deleteTeacher);

module.exports = router;