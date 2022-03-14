const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

module.exports = router;
