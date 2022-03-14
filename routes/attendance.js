const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", attendanceController.createAttendance);

router.patch("/", attendanceController.updateAttendance);

router.get("/all", attendanceController.getTodayAttendance);

module.exports = router;
