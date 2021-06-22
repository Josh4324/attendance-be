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

exports.updatePost = async (req, res) => {
    try {
        const {id} = req.payload;
        
        const post = await postService.updatePost(id, req.body)

        const response = new Response(
            true,
            200,
            "post updated successfully",
            post
          );
        res.status(response.code).json(response);

    }catch (err){
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const {id} = req.payload;

        const posts = await postService.findAllPostwithUserId(id);

       const response = new Response(
            true,
            200,
            "Success",
            posts
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


