const express = require("express");
const router = express.Router();
const payoutController = require("../controllers/payout-controller");
const { Token } = require("../helpers");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");

const token = new Token();

router.post("/", token.verifyToken, payoutController.initiatePayout);
router.get("/", token.verifyToken, payoutController.getAllPayout);
router.get("/history", token.verifyToken, payoutController.getPayoutHistory);

module.exports = router;
