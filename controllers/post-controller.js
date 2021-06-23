const PostService = require("../services/post-service");
const UserService = require("../services/user-service");
const cloudinary = require("cloudinary").v2;
const {Response, Token } = require('../helpers');
const { v4: uuidv4 } = require('uuid');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

const postService = new PostService();
const userService = new UserService();

exports.createPost = async (req, res) => {
    try {

        const {title, message, postType} = req.body;
        const {id} = req.payload;

        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            if (result) {
                let image = result.secure_url;
                const data = {
                    title,
                    message,
                    postType,
                    image,
                    userId: id
                }
                const post = await postService.createPost(data)
                
                const response = new Response(
                    true,
                    200,
                    "Post created successfully",
                    post
                  );
                return res.status(response.code).json(response);
                
            }
        });
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
        const {username} = req.query;

        const user =  await userService.findUserWithUserName(username);
        const id = user.id;

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

exports.getPosts = async (req, res) => {
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


