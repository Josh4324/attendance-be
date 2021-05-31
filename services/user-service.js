const User = require("../models/index")['User'];

module.exports = class UserService {
    async findUser(userId){
        return await User.findOne({where : {id : userId}});
    }

    async findUserWithEmail(email){
        return await User.findOne({where : {email}});
    }  

    async createUser(user){
        return await User.create(user);
    }

    async updateUser(id, payload){
        return await User.update(payload, {
            where: {
                id
            }
        })
    }


}