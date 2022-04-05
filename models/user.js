"use strict";
const { Model } = require("sequelize");
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
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      staff_id: { type: DataTypes.STRING, primaryKey: true },
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      position: DataTypes.STRING,
      start_date: DataTypes.DATE,
      device_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
