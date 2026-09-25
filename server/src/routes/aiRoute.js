const express = require("express");
const router = express.Router();

const {askAI} = require("../controllers/aiController");

const {authentication} = require("../middleware/auth")

router.post("/ask",authentication,askAI);

module.exports = router;