const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Token = require("../helpers/Token");
const token = new Token();

router.post("/signup", userController.signUp);

router.post("/admin-signup", token.verifyToken, userController.adminSignUp);

router.post("/login", userController.logIn);

router.post("/admin-login", userController.adminlogIn);

router.patch("/", token.verifyToken, userController.updateProfile);

router.post("/profile", token.verifyToken, userController.getProfile);

router.post("/profile2", userController.getProfile2);

router.patch("/reset-password", token.verifyToken, userController.reset);

router.post("/delete", token.verifyToken, userController.deleteUser);

module.exports = router;
