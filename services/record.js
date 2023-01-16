const Record = require("../models/index")["Record"];
const { Op } = require("sequelize");

module.exports = class UserService {
  async findRecordWithEmail(email) {
    return await Record.findOne({ where: { email } });
  }

  async findRecords() {
    return await Record.findAll();
  }

  async createRecord(user) {
    return await Record.create(user);
  }
};
