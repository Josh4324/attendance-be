const EmailNotifications = require('../helpers/EmailNotifications');

module.exports = class EmailService {
    async sendSignupEmail(email, link, name){
        return EmailNotifications.signupEmail(email,link,name);
    } 
    
    async sendAnonymousSignupEmail(email, link, name){
        return EmailNotifications.anonymousSignupEmail(email,link,name);
    } 
}