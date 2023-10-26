const LeaveService = require("../services/leave");
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

const leaveService = new LeaveService();

exports.createLeave = async (req, res) => {
  try {
    const leave = await leaveService.createLeave(req.body);

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

    const leave = await leaveService.approveLeave(id);

    const response = new Response(
      true,
      200,
      "Leave approved successfully",
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
