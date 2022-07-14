const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", bookController.createBook);

router.get("/", bookController.getBooks);

module.exports = router;
