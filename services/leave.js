const Leave = require("../models/index")["Leave"];
const { Op } = require("sequelize");

module.exports = class UserService {
  async findUserLeave(staff_id) {
    return await Leave.findAll({
      order: [["createdAt", "DESC"]],
      where: { staff_id },
    });
  }

  async findPendingLeave() {
    return await Leave.findAll({
      order: [["createdAt", "DESC"]],
      where: { status: null },
    });
  }

  async approveLeave(id) {
    return await Leave.update(
      { status: true },
      {
        where: {
          id,
        },
      }
    );
  }

  async rejectLeave(id) {
    return await Leave.update(
      { status: false },
      {
        where: {
          id,
        },
      }
    );
  }

  async createLeave(leave) {
    return await Leave.create(leave);
  }
};
