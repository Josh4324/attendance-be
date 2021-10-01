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
        exclude: ["password", "token"]
      }
    });
  }

  async findUserWithEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findCreators() {
    return await User.findAll({
      where: {
        userType: "creator"
      }
    });
  }

  async findUsers() {
    return await User.findAll();
  }

  async findAllUserwithOneOrMultipleUserId(list) {
    return await User.findAll({
      where: {
        id: {
          [Op.or]: list
        }
      },
      order: [["createdAt", "DESC"]]
    });
  }

  async createUser(user) {
    return await User.create(user);
  }

  async updateUser(id, payload) {
    return await User.update(payload, {
      where: {
        id
      }
    });
  }
  
  async updateUserWithEmail(email, payload) {
    return await User.update(payload, {
      where: {
        email
      }
    });
  }
};
