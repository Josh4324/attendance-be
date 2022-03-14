const UserService = require("../services/user-service");
const cloudinary = require("cloudinary").v2;
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const userService = new UserService();

exports.signUp = async (req, res) => {
  try {
    const { staff_id } = req.body;
    const user = await userService.findUserWithStaffId(staff_id);
    if (user) {
      const response = new Response(true, 409, "This user already exists");
      return res.status(response.code).json(response);
    }

    const newUser = await userService.createUser(req.body);

    const response = new Response(
      true,
      201,
      "User created successfully",
      newUser
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

exports.logIn = async (req, res) => {
  try {
    const { staff_id } = req.body;

    const user = await userService.findUserWithStaffId(staff_id);

    if (!user) {
      const response = new Response(false, 401, "Incorrect staffID");
      return res.status(response.code).json(response);
    }

    const response = new Response(
      true,
      200,
      "User logged in Successfully",
      user
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
