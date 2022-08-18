const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Token = require("../helpers/Token");
const token = new Token();

router.post("/", attendanceController.createAttendance);

router.patch("/", token.verifyToken, attendanceController.updateAttendance);

router.patch("/clock-out", attendanceController.cloutOut);

router.get("/all", token.verifyToken, attendanceController.getTodayAttendance);

router.post(
  "/range",
  token.verifyToken,
  attendanceController.getRangeAttendance
);

router.get("/price", attendanceController.getPrice);

router.get("/users", token.verifyToken, attendanceController.getUsers);

//open
router.post("/staff", attendanceController.getUserAttendance);

module.exports = router;
