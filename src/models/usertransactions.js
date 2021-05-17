"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userTransactions.init(
    {
      customerId: DataTypes.INTEGER,
      count: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "userTransactions"
    }
  );
  return userTransactions;
};
