const EmailService = require("../services/email-service");

const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

const emailService = new EmailService();

exports.createEmail = async (req, res) => {
  try {
    const email = await emailService.createEmail(req.body);

    const response = new Response(true, 201, "Email Created", email);
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

exports.getAllEmail = async (req, res) => {
  try {
    const emails = await emailService.findAllEmail();
    const response = new Response(true, 200, "Success", emails);
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
