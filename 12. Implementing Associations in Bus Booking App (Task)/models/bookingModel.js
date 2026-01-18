const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connnection");

const Booking = sequelize.define("booking", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  seatNumber: { type: DataTypes.INTEGER },
});

module.exports = Booking;
