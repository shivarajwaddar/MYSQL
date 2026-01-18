const User = require("./userModel");
const Bus = require("./busModel");
const Booking = require("./bookingModel");

// 1. A User can have many bookings
User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

// 2. A Bus can have many bookings
Bus.hasMany(Booking, { foreignKey: "busId" });
Booking.belongsTo(Bus, { foreignKey: "busId" });

module.exports = {
  User,
  Bus,
  Booking,
};
