const UserService = require("../services/user-service");
const cloudinary = require("cloudinary").v2;
const argon2 = require("argon2");
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

    const password = await argon2.hash(req.body.password);
    req.body.password = password;

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

exports.adminSignUp = async (req, res) => {
  try {
    console.log(req.body);

    const user = await userService.findUserWithEmail(email);
    if (user) {
      const response = new Response(true, 409, "This user already exists");
      return res.status(response.code).json(response);
    }

    const password = await argon2.hash(req.body.password);
    req.body.password = password;

    const newUser = await userService.createUser(req.body);

    const data = {
      id: newUser.id,
    };
    const response = new Response(true, 201, "User created successfully", data);
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

exports.adminlogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserWithEmail(email);

    if (!user) {
      const response = new Response(false, 401, "Incorrect email or password");
      return res.status(response.code).json(response);
    }

    const userData = user.dataValues;

    const userPassword = userData.password;
    const checkPassword = await argon2.verify(userPassword, password);

    if (!user || !checkPassword) {
      const response = new Response(false, 401, "Incorrect email or password");
      return res.status(response.code).json(response);
    }

    const response = new Response(
      true,
      200,
      "User logged in Successfully",
      userData
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

exports.updateProfile = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userService.updateUserWithEmail(email, req.body);

    const response = new Response(
      true,
      200,
      "User profile updated successfully",
      user
    );
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

exports.deleteUser = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await userService.deleteUser(email);

    const response = new Response(true, 200, "Success", user);
    res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};
