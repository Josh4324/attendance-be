const express = require("express");
const router = express.Router();
const {Token} = require('../helpers');
const userController = require("../controllers/user-controller");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const token = new Token();


router.post(
    '/signup', 
    validation.signUpValidationRules(), 
    validation.validate, 
    userController.signUp
);

router.post(
    '/login', 
    validation.loginValidationRules(), 
    validation.validate, 
    userController.logIn
);

router.post(
    '/verify', 
    userController.verifyEmail
);

router.post(
    '/resend-code', 
    userController.resendCode
);

router.patch(
    '/', 
    token.verifyToken,
    userController.updateProfile
);

router.patch(
    '/image', 
    token.verifyToken, 
    upload.single("picture"),
    userController.imageUpload
);







module.exports = router;
