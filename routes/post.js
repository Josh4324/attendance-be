const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");
const { Token } = require("../helpers");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const token = new Token();

router.post(
  "/",
  token.verifyToken,
  upload.single("image"),
  postController.createPost
);

router.post(
  "/noimage",
  token.verifyToken,
  postController.createPostWithoutImage
);

router.get("/", postController.getAllPosts);

router.get("/all-users", postController.getAllUsersPosts);

router.get("/all", token.verifyToken, postController.getPosts);

router.get("/fanpost", postController.getFanPosts);

router.get("/:postId", postController.getPostAndUser);

router.patch("/:postId", token.verifyToken, postController.updatePost);

router.delete("/:postId", token.verifyToken, postController.deletePost);

module.exports = router;
