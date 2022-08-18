const MailService = require("../services/mail");
const { Response, Token } = require("../helpers");

const mailService = new MailService();

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // send verification mail
    const mail = await mailService.sendEmail(name, email, message);

    const response = new Response(true, 200, "Message sent successfully");
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
