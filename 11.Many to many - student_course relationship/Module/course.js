const { DataTypes } = require("sequelize");
// IMPORT the connection you already configured
const sequelize = require("../Utils/db-connection");

const Courses = sequelize.define("courses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Courses;
