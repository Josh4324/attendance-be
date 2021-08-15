const EmailNotifications = require('../helpers/EmailNotifications');

module.exports = class EmailService {
    async sendSignupEmail(email, link, name){
        return EmailNotifications.signupEmail(email,link,name);
    } 

     async paymentEmail(email){
        return EmailNotifications.paymentEmail(email);
    } 
    
    async sendAnonymousSignupEmail(email, link, name){
        return EmailNotifications.anonymousSignupEmail(email,link,name);
    } 
}