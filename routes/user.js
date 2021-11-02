const express = require("express");
const router = express.Router();
const { Token } = require("../helpers");
const userController = require("../controllers/user-controller");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const token = new Token();

router.post(
  "/signup",
  validation.signUpValidationRules(),
  validation.validate,
  userController.signUp
);

router.post(
  "/social-signup",
  userController.socialSignUp
);

router.post(
  "/social-check",
  userController.socialCheck
);

router.post(
  "/social-login",
  userController.socialLogin
);

router.post("/anon-signup", userController.anonymousSignUp);

router.post(
  "/login",
  validation.loginValidationRules(),
  validation.validate,
  userController.logIn
);

router.post(
  "/login/admin",
  validation.loginValidationRules(),
  validation.validate,
  userController.adminLogIn
);

router.post("/verify", userController.verifyEmail);

router.post("/resend-code", userController.resendCode);

router.patch("/", token.verifyToken, userController.updateProfile);

router.get("/", token.verifyToken, userController.getProfileData);

router.post("/forgot-password", userController.forgotPassword);

router.get("/userdata", userController.getUserData);

router.get("/creators", token.verifyToken, userController.getCreators);

router.get("/all", userController.getUsers);

router.get(
  "/support-creators",
  token.verifyToken,
  userController.getSupportedCreators
);

router.get("/creators-support", userController.getSupportedCreators);

router.post("/checkUser", token.verifyToken, userController.checkUserName);

router.patch("/reset", token.verifyToken, userController.resetPassword);

router.patch("/reset-password", userController.resetPassword2);

router.patch(
  "/image",
  token.verifyToken,
  upload.single("picture"),
  userController.imageUpload
);

module.exports = router;
