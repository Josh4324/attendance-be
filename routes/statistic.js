const express = require("express");
const router = express.Router();
const statisticController = require("../controllers/statistic-controller");
const {Token} = require('../helpers');
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");

const token = new Token();

router.get(
    '/',
    token.verifyToken,
    statisticController.getStatistic
);

router.get(
    '/supporters',
    token.verifyToken,
    statisticController.getAllSupporters
);

router.get(
    '/history',
    token.verifyToken,
    statisticController.getHistory
);

router.get(
    '/payment-history',
    token.verifyToken,
    statisticController.getPaymentHistory
);





module.exports = router;
