const Payout = require("../models/index")["Payout"];
const User = require("../models/index")["User"];

module.exports = class PayoutService {
  async createPayout(payout) {
    return await Payout.create(payout);
  }

  async getHistory(userId) {
    return await Payout.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]]
    });
  }
};
