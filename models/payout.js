"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payout.hasOne(models.User, {
        foreignKey: 'id',
        as: 'user',
      });
    }
  }
  Payout.init(
    {
      amount: DataTypes.INTEGER,
      account_bank: DataTypes.STRING,
      userId:  {type: DataTypes.STRING,primaryKey: true,},
      account_number: DataTypes.STRING,
      reference: DataTypes.STRING,
      narration: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Payout"
    }
  );
  return Payout;
};
