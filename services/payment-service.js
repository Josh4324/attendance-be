const Payment = require("../models/index")['Payment'];

module.exports = class PaymentService {
    async initiatePayment(payment){
        return await Payment.create(payment);
    }

    async verifyPayment(reference, payload){
        return await Payment.update(payload, {
            where: {
                reference
            }
        })
    }


}