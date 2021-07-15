const Post = require("../models/index")['Post'];

module.exports = class UserService {
    async findPost(postId){
        return await Post.findOne({where : {id : postId}});
    }

    async findAllPostwithUserId(userId){
        return await Post.findAll({
            where : {userId},
            order: [ ['createdAt', 'DESC']]
        });
    }  

    async createPost(post){
        return await Post.create(post);
    }

    async updatePost(id, payload){
        return await Post.update(payload, {
            where: {
                id
            }
        })
    }

     async deletePost(postId){
        return await Post.destroy({
             where: {
                id: postId
            }
        });
    }


}