const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connnection");

const Bus = sequelize.define("bus", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  busNumber: { type: DataTypes.INTEGER },
  totalSeats: { type: DataTypes.INTEGER },
  availableSeats: { type: DataTypes.INTEGER },
});

module.exports = Bus;
