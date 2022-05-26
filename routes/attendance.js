const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", attendanceController.createAttendance);

router.patch("/", attendanceController.updateAttendance);

router.patch("/clock-out", attendanceController.cloutOut);

router.get("/all", attendanceController.getTodayAttendance);

router.post("/range", attendanceController.getRangeAttendance);

router.get("/price", attendanceController.getPrice);

router.get("/users", attendanceController.getUsers);

router.post("/staff", attendanceController.getUserAttendance);

module.exports = router;
