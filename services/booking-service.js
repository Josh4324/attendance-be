const Book = require("../models/index")["Booking"];
const { Op } = require("sequelize");

module.exports = class UserService {
  async findBookWithEmail(email) {
    return await Book.findOne({ where: { email } });
  }

  async findBookings() {
    return await Book.findAll();
  }

  async createBook(user) {
    return await Book.create(user);
  }
};
