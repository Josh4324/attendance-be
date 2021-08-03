const Post = require("../models/index")['Post'];
const User = require("../models/index")['User'];
const { Op } = require("sequelize");

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

    async findAllPostwithOneOrMultipleUserId(list){
        return await Post.findAll({
            where:{
                userId: {
                [Op.and]: [null]
            },
            },
            include: [
                {
                    model: User,
                    as: 'user', 
                },
            ],
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