'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.hasMany(models.User, {
        foreignKey: 'id',
        as: 'user',
      });
    }
  };
  Payment.init({
    id: DataTypes.STRING,
    reference: DataTypes.STRING,
    amount: DataTypes.STRING,
    payment_plan: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    message: DataTypes.STRING,
    creatorId: {type: DataTypes.STRING,primaryKey: true,},
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};