const User = require("../models/index")["User"];
const { Op } = require("sequelize");

module.exports = class UserService {
  async findUser(userId) {
    return await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["token"],
      },
    });
  }

  async findUserWithUserName(username) {
    return await User.findOne({
      where: { userName: username },
      attributes: {
        exclude: ["password", "token"],
      },
    });
  }

  async findUserWithEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findUserWithStaffId(staff_id) {
    return await User.findOne({
      where: { staff_id },
      attributes: {
        exclude: ["password", "token"],
      },
    });
  }

  async findUserWithName(first_name) {
    return await User.findOne({ where: { first_name } });
  }

  async findUsers() {
    return await User.findAll();
  }

  async createUser(user) {
    return await User.create(user);
  }

  async updateUser(id, payload) {
    return await User.update(payload, {
      where: {
        id,
      },
    });
  }

  async updateUserWithEmail(email, payload) {
    return await User.update(payload, {
      where: {
        email,
      },
    });
  }

  async updateUserWithStaffId(staff_id, payload) {
    return await User.update(payload, {
      where: {
        staff_id,
      },
    });
  }

  async findUserAndPasswordWithId(id) {
    return await User.findOne({
      where: { id },
    });
  }

  async deleteUser(staff_id) {
    return await User.destroy({
      where: {
        staff_id,
      },
    });
  }
};
