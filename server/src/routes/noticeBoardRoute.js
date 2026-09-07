const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {createNotice,getNotice,updateNotice,deleteNotice} = require("../controllers/noticeBoardController")

const {authentication,authorization} = require("../middleware/auth")

router.post("/create-notice",authentication,upload.single("postImage"),createNotice);
router.get("/get-notice",authentication,getNotice);
router.put("/update-notice/:id",authentication,upload.single("postImage"),updateNotice);
router.delete("/delete-notice/:id",authentication,deleteNotice);

module.exports = router;