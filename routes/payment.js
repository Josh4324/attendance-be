const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment-controller");
const {Token} = require('../helpers');
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");


const token = new Token();


router.post(
    '/',
    paymentController.initiatePayment
);

router.patch(
    '/',
    paymentController.verifyPayment
);

router.get(
    '/all',
    paymentController.getAllPayment
)






module.exports = router;
