const express = require("express");
const router = express.Router();
const recordController = require("../controllers/record");

router.post("/", recordController.createRecord);

router.get("/", recordController.getRecords);

module.exports = router;
