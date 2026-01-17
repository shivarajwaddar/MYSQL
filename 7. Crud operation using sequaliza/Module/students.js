const { DataTypes } = require("sequelize");
// IMPORT the connection you already configured
const sequelize = require("../Utils/db-connection");

const Students = sequelize.define("student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Students;
