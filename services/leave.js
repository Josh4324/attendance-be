const Leave = require("../models/index")["Leave"];
const { Op } = require("sequelize");

module.exports = class UserService {
  async findUserLeave(staff_id) {
    return await Record.findAll({ where: { staff_id } });
  }

  async findPendingLeave() {
    return await Leaves.findAll({
      where: { status: null },
    });
  }

  async createLeave(leave) {
    return await Leave.create(leave);
  }
};
