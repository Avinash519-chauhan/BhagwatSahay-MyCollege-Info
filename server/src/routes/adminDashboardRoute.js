const express = require("express");
const router = express.Router();

const {authentication,authorization} = require("../middleware/auth")

const {getDashboardStats} = require("../controllers/adminDashboardController")

router.get("/admin-dashboard",authentication,authorization,getDashboardStats);

module.exports = router;