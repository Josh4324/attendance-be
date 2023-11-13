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

  async sendhrEmail(email, name) {
    return EmailNotifications.sendHREmail(email, name);
  }

  async sendApprovalEmail(email, name) {
    return EmailNotifications.sendApprovalEmail(email, name);
  }

  async sendApprovalAcceptanceEmail(email, name) {
    return EmailNotifications.sendApprovalAcceptanceEmail(email, name);
  }

  async sendApprovalRejectEmail(email, name) {
    return EmailNotifications.sendApprovalRejectionEmail(email, name);
  }
};
