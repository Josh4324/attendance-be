const Email = require("../models/index")["email"];
const User = require("../models/index")["User"];
const { Op } = require("sequelize");

module.exports = class UserService {
  async findAllEmail(email) {
    return await Email.findAll();
  }

  async findEmail(email) {
    return await Email.findOne({ where: { email } });
  }

  async createEmail(user) {
    return await Email.create(user);
  }
};