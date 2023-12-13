const Leave = require("../models/index")["Leave"];
const User = require("../models/index")["User"];
const { Op } = require("sequelize");

module.exports = class UserService {
  async findUserLeave(staff_id) {
    return await Leave.findAll({
      order: [["createdAt", "DESC"]],
      where: { staff_id },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
  }

  async findPendingLeave() {
    return await Leave.findAll({
      order: [["createdAt", "DESC"]],
      where: { status: null },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
  }

  async findLeave(id) {
    return await Leave.findOne({
      order: [["createdAt", "DESC"]],
      where: { id },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
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
