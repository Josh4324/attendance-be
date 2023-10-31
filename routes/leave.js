const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leave");

router.post("/", leaveController.createLeave);

router.post("/staff", leaveController.getUserLeave);

router.get("/pending", leaveController.getPendingLeave);

module.exports = router;
