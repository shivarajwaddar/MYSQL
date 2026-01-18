const { Op } = require("sequelize");
const { Bus, Booking, User } = require("../models/index");

const addbuses = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;
    const bus = await Bus.create({ busNumber, totalSeats, availableSeats });
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getbuses = async (req, res) => {
  try {
    const { seats } = req.params;
    const buses = await Bus.findAll({
      where: {
        availableSeats: {
          [Op.gt]: seats, // SQL: WHERE availableSeats >= seats
        },
      },
    });

    if (buses.length === 0) {
      return res
        .status(404)
        .json({ message: "No buses found with enough seats." });
    }

    res.status(200).json(buses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Bookings for a Specific Bus (with User Details)
const getBusBookings = async (req, res) => {
  try {
    const { id } = req.params; // Extracts the Bus ID from the URL

    // 1. Find the bus and include its bookings
    const busWithBookings = await Bus.findByPk(id, {
      include: {
        model: Booking,
        // 2. For every booking, include the User who bought it
        include: {
          model: User,
          attributes: ["name", "email"],
        },
      },
    });

    // 3. If bus doesn't exist, return 404
    if (!busWithBookings) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // 4. Send only the bookings array to match your expected response
    res.status(200).json(busWithBookings.bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getbuses,
  addbuses,
  getBusBookings,
};
