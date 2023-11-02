const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leave");

router.post("/", leaveController.createLeave);

router.post("/staff", leaveController.getUserLeave);

router.get("/pending", leaveController.getPendingLeave);

router.post("/approve", leaveController.approveLeave);

router.post("/reject", leaveController.rejectLeave);

module.exports = router;
