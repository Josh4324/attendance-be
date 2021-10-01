const PostService = require("../services/post-service");
const PaymentService = require("../services/payment-service");
const UserService = require("../services/user-service");

const {Response, Token } = require('../helpers');
const { v4: uuidv4 } = require('uuid');

const postService = new PostService();
const paymentService = new PaymentService();
const userService = new UserService();

exports.getStatistic = async (req, res) => {
    try {
        
        const {id} = req.payload;
        const creatorId = String(id);
        const posts = await postService.findAllPostwithUserId(id);
        const supporters = await paymentService.getSupporters(creatorId);
        const uniqueSupporters = await paymentService.getUniqueSupporters(creatorId);
        let total = 0
        const amount = supporters.map((item) => {
            total = total + Number(item.dataValues.amount);
        })

        let data = {
            posts : posts.length,
            supporters,
            amount: total,
            supporters_number: uniqueSupporters.length
        }

       const response = new Response(
            true,
            200,
            "Success",
            data
          );
        res.status(response.code).json(response);
        
    }catch(err){
        console.log(err);
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

exports.getAllSupporters = async (req, res) => {
    try {
        
        const uniqueSupporters = await paymentService.getAllUniqueSupporters();

        let data = {
    
            supporters: uniqueSupporters
        }

       const response = new Response(
            true,
            200,
            "Success",
            data
          );
        res.status(response.code).json(response);
        
    }catch(err){
        console.log(err);
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}


exports.getHistory = async (req, res) => {
    try {
        
        const {id} = req.payload;
        const email = req.query.email;
        const creatorId = String(id);

        const history = await paymentService.getSupporterHistory(creatorId, email);
        const user = await userService.findUserWithEmail(email);
        
        let data = {
            history,
            user
        }

       const response = new Response(
            true,
            200,
            "Success",
            data
          );
        res.status(response.code).json(response);
        
    }catch(err){
        console.log(err);
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

exports.getPaymentHistory = async (req, res) => {
    try {
        
        const {id} = req.payload;
        const email = req.query.email;
        const creatorId = String(id);

        const history = await paymentService.getPaymentHistory(email);

       const response = new Response(
            true,
            200,
            "Success",
            history
          );
        res.status(response.code).json(response);
        
    }catch(err){
        console.log(err);
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

