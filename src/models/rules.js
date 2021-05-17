"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rules.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      redemptionLimit: DataTypes.INTEGER,
      appliedRedemptions: DataTypes.INTEGER,
      budgetLimit: DataTypes.INTEGER,
      appliedBudget: DataTypes.INTEGER,
      minTransactions: DataTypes.INTEGER,
      cashback: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "rules"
    }
  );
  return rules;
};
