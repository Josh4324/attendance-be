const LeaveService = require("../services/leave");
const MailService = require("../services/mail");
const UserService = require("../services/user-service");
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

const leaveService = new LeaveService();
const userService = new UserService();
const mailService = new MailService();

function calculateBusinessDays(startDate, endDate) {
  // Copy the start date to avoid modifying the original date
  let currentDate = new Date(startDate);
  let currentEndDate = new Date(endDate);
  let businessDays = 0;

  while (currentDate <= currentEndDate) {
    // Check if the current day is not a weekend (0 = Sunday, 6 = Saturday)
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      businessDays++;
    }
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return businessDays;
}

exports.createLeave = async (req, res) => {
  try {
    const user = await userService.findUserWithStaffId(req.body.staff_id);

    let days = calculateBusinessDays(req.body.start_date, req.body.end_date);
    days = days + user.days_used;

    if (Number(days) > 20) {
      const response = new Response(
        true,
        409,
        "You cannot apply for the days you requested "
      );
      return res.status(response.code).json(response);
    }

    const leave = await leaveService.createLeave(req.body);

    mailService.sendhrEmail("hr@bakerindustries.io", user.first_name);

    const response = new Response(
      true,
      201,
      "Leave created successfully",
      leave
    );
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

exports.approveLeave = async (req, res) => {
  try {
    const { id } = req.body;

    const leave = await leaveService.findLeave(id);

    const user = await userService.findUserWithStaffId(leave.staff_id);

    let days = calculateBusinessDays(leave.start_date, leave.end_date);

    const days_left =
      Number(user.annual_leave) - (Number(days) + Number(user.days_left));

    const days_used = Number(days) + Number(user.days_used);

    const approve = await leaveService.approveLeave(id);

    mailService.sendApprovalEmail(user.email, user.first_name);

    if (leave.leave_type === "Annual Leave") {
      await userService.updateUserWithStaffId(leave.staff_id, {
        days_left,
        days_used,
      });
    }

    const response = new Response(
      true,
      200,
      "Leave approved successfully",
      approve
    );
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

exports.rejectLeave = async (req, res) => {
  try {
    const { id } = req.body;

    const leave = await leaveService.rejectLeave(id);

    const response = new Response(
      true,
      200,
      "Leave rejected successfully",
      leave
    );
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

exports.getUserLeave = async (req, res) => {
  try {
    const { id } = req.body;

    const leave = await leaveService.findUserLeave(id);

    const response = new Response(true, 200, "Success", leave);

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

exports.getPendingLeave = async (req, res) => {
  try {
    const leave = await leaveService.findPendingLeave();

    const response = new Response(true, 200, "Success", leave);

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
