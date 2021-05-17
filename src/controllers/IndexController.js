import model from "../models";
const { Op, col } = require("sequelize");
const { rules, userTransactions, appliedTransactions } = model;

export default {
  async rule(req, res) {
    const {
      startDate,
      endDate,
      cashback,
      redemptionLimit,
      budgetLimit,
      minTransactions
    } = req.body;
    try {
      await rules.create({
        startDate: startDate,
        endDate: endDate,
        cashback: cashback,
        redemptionLimit: redemptionLimit,
        budgetLimit: budgetLimit,
        minTransactions: minTransactions,
        appliedBudget: 0,
        appliedRedemptions: 0
      });
      return res.status(201).send({ message: "Rule created successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later."
      });
    }
  },

  async transaction(req, res) {
    const { tDate, customerId, id } = req.body;
    try {
      // get first rule matching date, redemption and budget limit
      const matchRule = await rules.findOne({
        where: {
          startDate: {
            [Op.lt]: tDate
          },
          endDate: {
            [Op.gt]: tDate
          },
          appliedRedemptions: {
            [Op.lt]: col("redemptionLimit")
          },
          appliedBudget: {
            [Op.lt]: col("budgetLimit")
          }
        },
        order: [["createdAt", "DESC"]]
      });

      if (matchRule !== null) {
        var userT = await userTransactions.findOne({
          where: {
            customerId: customerId
          }
        });

        if (userT === null) {
          // track user transaction counts
          userT = await userTransactions.create({
            customerId: customerId,
            count: 0
          });
        }

        // just record the transaction if the user doesn't meet min transactions
        if (userT.count < matchRule.minTransactions) {
          userT.count += 1;
          await userT.save();
          return res.status(200).send({
            message: "Transaction Processed"
          });
        }

        // increment redemption count and budget
        matchRule.appliedRedemptions += 1;
        matchRule.appliedBudget = matchRule.appliedBudget + matchRule.cashback;
        await matchRule.save();

        // record the user transaction count every time
        userT.count += 1;
        await userT.save();

        // save the transaction
        await appliedTransactions.create({
          amount: matchRule.cashback,
          customerId: userT.customerId,
          ruleId: matchRule.id,
          transactionId: id
        });
      }

      return res.status(200).send({
        message: "Transaction Processed"
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later."
      });
    }
  },

  async cashback(req, res) {
    try {
      const transactions = await appliedTransactions.findAll({
        attributes: ["transactionId", "amount"]
      });
      return res.status(200).send(transactions);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later."
      });
    }
  }
};
