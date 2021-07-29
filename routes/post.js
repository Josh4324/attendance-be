const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");
const {Token} = require('../helpers');
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const token = new Token();


router.post(
    '/',
    token.verifyToken,
    upload.single("image"),
    postController.createPost
);

router.get(
    '/',
    postController.getAllPosts
);

router.get(
    '/all',
    token.verifyToken,
    postController.getPosts
);

router.get(
    '/fanpost',
    token.verifyToken,
    postController.getFanPosts
);

router.patch(
    '/:postId',
    token.verifyToken,
    postController.updatePost
);

router.delete(
    '/:postId',
    token.verifyToken,
    postController.deletePost
);






module.exports = router;
