const sequelize = require("../utils/db-connection");
const { DataTypes } = require("sequelize");

const Expense = sequelize.define("expenses", {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  category: {
    type: DataTypes.STRING,
  },
});

module.exports = Expense;
