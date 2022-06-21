"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.hasOne(models.User, {
        foreignKey: "staff_id",
        as: "user",
      });
    }
  }
  Attendance.init(
    {
      id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      attended: DataTypes.STRING,
      time: DataTypes.TIME,
      clock_out: DataTypes.DATE,
      location: DataTypes.STRING,
      staff_id: { type: DataTypes.STRING, primaryKey: true },
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
