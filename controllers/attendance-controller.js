const AttendanceService = require("../services/attendance-service");
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

const attendanceService = new AttendanceService();

exports.createAttendance = async (req, res) => {
  try {
    const user = await attendanceService.createAttendance(req.body);

    const response = new Response(true, 201, "Attendance Created", user);
    return res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    return res.status(response.code).json(response);
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { staff_id } = req.body;

    const user = await attendanceService.updateAttendanceWithStaffId(staff_id, {
      attended: "true",
    });

    const response = new Response(true, 200, "Attendance updated", user);
    return res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    return res.status(response.code).json(response);
  }
};

exports.getTodayAttendance = async (req, res) => {
  try {
    console.log(new Date());
    const attendance = await attendanceService.findDailyAttendance();
    const response = new Response(true, 200, "Success", attendance);
    res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    res.status(response.code).json(response);
  }
};
