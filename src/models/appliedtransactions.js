"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appliedTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  appliedTransactions.init(
    {
      amount: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      ruleId: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "appliedTransactions"
    }
  );
  return appliedTransactions;
};
