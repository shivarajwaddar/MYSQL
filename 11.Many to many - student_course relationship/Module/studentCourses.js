const { DataTypes } = require("sequelize");
// IMPORT the connection you already configured
const sequelize = require("../Utils/db-connection");

const studentCourses = sequelize.define("studentCourses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = studentCourses;
