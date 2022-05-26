const AttendanceService = require("../services/attendance-service");
const UserService = require("../services/user-service");
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const attendanceService = new AttendanceService();
const userService = new UserService();

exports.createAttendance = async (req, res) => {
  try {
    const checkToday = await attendanceService.checkToday(req.body.staff_id);

    console.log(checkToday);

    if (checkToday) {
      const response = new Response(true, 400, "You have clocked in already");
      return res.status(response.code).json(response);
    }
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
    const { staff_id, status } = req.body;

    const user = await attendanceService.updateAttendanceWithStaffId(staff_id, {
      attended: status,
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

exports.cloutOut = async (req, res) => {
  try {
    const { staff_id } = req.body;

    const user = await attendanceService.updateAttendanceWithStaffId(staff_id, {
      clock_out: new Date(),
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
    const attendance = await attendanceService.findDailyAttendance();
    const allUsers = await userService.findUsers();
    const data = {
      allUsers,
      attendance,
    };
    const response = new Response(true, 200, "Success", data);
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

exports.getRangeAttendance = async (req, res) => {
  try {
    const { start, end } = req.body;
    const attendance = await attendanceService.findRangeAttendance(start, end);
    const allUsers = await userService.findUsers();
    const data = {
      allUsers,
      attendance,
    };
    const response = new Response(true, 200, "Success", data);
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

exports.getWeeklyAttendance = async (req, res) => {
  try {
    console.log(new Date());
    const attendance = await attendanceService.findDailyAttendance();
    const allUsers = await userService.findUsers();
    const data = {
      allUsers,
      attendance,
    };
    const response = new Response(true, 200, "Success", data);
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

exports.getPrice = async (req, res) => {
  try {
    const detail = await axios.get(
      "https://api.nomics.com/v1/currencies/ticker?key=354a86505f95f256b5d39b8c745ef473c92ea11f&ids=HFUEL"
    );
    const data = {
      price: detail.data[0].price,
    };
    const response = new Response(true, 200, "Success", data);
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

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await userService.findUsers();

    const response = new Response(true, 200, "Success", allUsers);
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

exports.getUserAttendance = async (req, res) => {
  try {
    const { staff_id } = req.body;
    const attendance = await attendanceService.findUserAttendance(staff_id);
    const response = new Response(true, 200, "Success", attendance);
    res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    res.status(response.code).json(response);
  }
};
