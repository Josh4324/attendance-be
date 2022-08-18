const UserService = require("../services/user-service");
const cloudinary = require("cloudinary").v2;
const argon2 = require("argon2");
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");
const token = new Token();

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

exports.reset = async (req, res) => {
  try {
    const { id } = req.payload;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      const response = new Response(
        false,
        401,
        "Password and confirmPassword to do match"
      );
      return res.status(response.code).json(response);
    }

    const pass = await argon2.hash(password);

    const user = await userService.updateUser(id, { password: pass });

    const response = new Response(true, 200, "Password reset successful");
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

    const payload1 = {
      id: userData.id,
      role: userData.role,
    };

    const Token = await token.generateToken(payload1);

    const data = {
      token: Token,
      userData,
    };

    const response = new Response(
      true,
      200,
      "User logged in Successfully",
      data
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
    const { staff_id } = req.body;

    const user = await userService.updateUserWithStaffId(staff_id, req.body);

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

exports.getProfile = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    const user = await userService.findUserWithName(name);

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
    const staff_id = req.body.staff_id;

    const user = await userService.deleteUser(staff_id);

    const response = new Response(true, 200, "Success", user);
    res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "Server Error", err);
    res.status(response.code).json(response);
  }
};
