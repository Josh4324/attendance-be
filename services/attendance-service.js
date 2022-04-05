const Attendance = require("../models/index")["Attendance"];
const User = require("../models/index")["User"];
const { Op } = require("sequelize");

module.exports = class UserService {
  async findUser(userId) {
    return await User.findOne({ where: { id: userId } });
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
    return await User.findOne({ where: { staff_id } });
  }

  async findDailyAttendance() {
    const START = new Date();
    START.setHours(0, 0, 0, 0);
    const NOW = new Date();
    return await Attendance.findAll({
      include: [
        {
          model: User,
          as: "user",
        },
      ],
      where: {
        createdAt: {
          [Op.between]: [START.toISOString(), NOW.toISOString()],
        },
      },
    });
  }

  async findUserAttendance(staff_id) {
    return await Attendance.findAll({
      include: [
        {
          model: User,
          as: "user",
        },
      ],
      where: {
        staff_id,
      },
    });
  }

  async checkToday(staff_id) {
    const START = new Date();
    START.setHours(0, 0, 0, 0);
    const NOW = new Date();
    return await Attendance.findOne({
      where: {
        staff_id,
        createdAt: {
          [Op.between]: [START.toISOString(), NOW.toISOString()],
        },
      },
    });
  }

  async createAttendance(user) {
    return await Attendance.create(user);
  }

  async updateAttendanceWithStaffId(staff_id, payload) {
    return await Attendance.update(payload, {
      where: {
        staff_id,
      },
    });
  }
};
