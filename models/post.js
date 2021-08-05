'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasOne(models.User, {
        foreignKey: 'id',
        as: 'user',
      });
    }
  };
  Post.init({
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: {type: DataTypes.INTEGER,primaryKey: true,},
    postType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};