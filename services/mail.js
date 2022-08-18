const EmailNotifications = require("../helpers/EmailNotifications");

module.exports = class EmailService {
  async sendEmail(name, email, message) {
    console.log(name, email, message);
    return EmailNotifications.sendMessage(name, email, message);
  }
};
