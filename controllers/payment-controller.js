const PaymentService = require("../services/payment-service");
const {Response, Token } = require('../helpers');
const { v4: uuidv4 } = require('uuid');


const paymentService = new PaymentService();

exports.initiatePayment = async (req, res) => {
    try {
        const reference = uuidv4();
        const status = "pending";
        
        req.body.reference = reference;
        req.body.status = status;

        const payment = await paymentService.initiatePayment(req.body)
                
        const response = new Response(
            true,
            200,
            "Payment initiated successfully",
            payment
            );
        return res.status(response.code).json(response);
                
    } catch (err) {
        console.log(err);
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        return res.status(response.code).json(response);
    }
}


exports.verifyPayment = async (req, res) => {
    try {
        const {reference, status} = req.body
        const payment = await paymentService.verifyPayment(reference, {status})
                
        const response = new Response(
            true,
            200,
            "Payment detail updated",
            payment
            );
        return res.status(response.code).json(response);
                
    } catch (err) {
        console.log(err);
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        return res.status(response.code).json(response);
    }
}

