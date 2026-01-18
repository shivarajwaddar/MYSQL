const { User, Bus, Booking } = require("../models/index");

const adduser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getuser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Bookings for a Specific User (with Bus Details)

const getUserBookings = async (req, res) => {
  try {
    const { id } = req.params; // Extracts the ID from the URL (:id)

    // Find the user and "include" their bookings
    const userWithBookings = await User.findByPk(id, {
      include: {
        model: Booking,
        include: { model: Bus, attributes: ["busNumber"] }, // Optional: also show which bus was booked
      },
    });

    if (!userWithBookings) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userWithBookings.bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  adduser,
  getuser,
  getUserBookings,
};
