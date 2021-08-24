const PayoutService = require("../services/payout-service");
const MailService = require("../services/mail-service");
const UserService = require("../services/user-service");
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const payoutService = new PayoutService();
const mailService = new MailService();
const userService = new UserService();

exports.initiatePayout = async (req, res) => {
  try {
    const { id } = req.payload;
    console.log(id);
    const reference = uuidv4();
    req.body.userId = id;
    req.body.reference = "Trenduup" + reference;
    req.body.narration = "Payout - Trenduup - " + uuidv4();
    req.body.currency = "NGN";
    req.body.debit_currency = "NGN";

    axios.defaults.headers.common["Authorization"] =
      "FLWSECK-9d308326f6ed67b304ae825b0fa76356-X";
    const data = axios({
      method: "post",
      url: "https://api.flutterwave.com/v3/transfers",
      data: req.body
    }).then(async (response) => {
      //console.log(response);
      if (response.status === 200) {
        const payment = await payoutService.createPayout(req.body);
        if (payment) {
          const currentUser = await userService.findUser(id);
          let newamount = currentUser.amount - req.body.amount;
          const user = await userService.updateUser(id, { amount: newamount });
          if (user) {
            const response = new Response(
              true,
              200,
              "Payout initiated successfully",
              payment
            );
            return res.status(response.code).json(response);
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "An error occured", err);
    return res.status(response.code).json(response);
  }
};

exports.getPayoutHistory = async (req, res) => {
  try {
    const { id } = req.payload;
    console.log("id", id);
    const history = await payoutService.getHistory(id);

    const response = new Response(true, 200, "Success", history);
    res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(false, 500, "An error occurred", err);
    res.status(response.code).json(response);
  }
};
