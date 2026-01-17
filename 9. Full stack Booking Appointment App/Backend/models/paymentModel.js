const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connnection");

const Payment = sequelize.define("payment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amountPaid: { type: DataTypes.INTEGER },
  paymentStatus: { type: DataTypes.STRING(20) },
});

module.exports = Payment;
