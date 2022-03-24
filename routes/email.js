const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email-controller");

router.post("/", emailController.createEmail);

router.get("/", emailController.getAllEmail);

module.exports = router;
