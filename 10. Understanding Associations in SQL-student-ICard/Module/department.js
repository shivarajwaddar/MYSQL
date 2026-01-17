const { DataTypes } = require("sequelize");
const sequelize = require("../Utils/db-connection");

const department = sequelize.define("department", {
  // Changed from "identity_card"
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = department;
