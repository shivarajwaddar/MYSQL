const { DataTypes } = require("sequelize");
// IMPORT the connection you already configured
const sequelize = require("../Utils/db-connection");

const IdentityCard = sequelize.define("identity_card", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cardNumber: { type: DataTypes.INTEGER, allowNull: false, unique: true },
});

module.exports = IdentityCard;
