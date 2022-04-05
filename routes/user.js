const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/signup", userController.signUp);

router.post("/admin-signup", userController.adminSignUp);

router.post("/login", userController.logIn);

router.post("/admin-login", userController.adminlogIn);

module.exports = router;
