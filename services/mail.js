const EmailNotifications = require("../helpers/EmailNotifications");

module.exports = class EmailService {
  async sendEmail(name, email, message, receiver, group) {
    return EmailNotifications.sendMessage(
      name,
      email,
      message,
      receiver,
      group
    );
  }
};
