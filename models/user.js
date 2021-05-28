'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    brandName: DataTypes.STRING,
    websiteUrl: DataTypes.STRING,
    picture: DataTypes.STRING,
    about: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    creating: DataTypes.STRING,
    role: DataTypes.STRING,
    userType: DataTypes.STRING,
    onboardingStep: DataTypes.STRING,
    bankName: DataTypes.STRING,
    accName: DataTypes.STRING,
    accNumber: DataTypes.STRING,
    facebookLink: DataTypes.STRING,
    twitterLink: DataTypes.STRING,
    youtubeLink: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    token:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
