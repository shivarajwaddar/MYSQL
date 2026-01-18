const { Bus, User, Booking } = require("../models/index");

// 1. Create a new Booking
const addBooking = async (req, res) => {
  try {
    const { userId, busId, seatNumber } = req.body;

    const user = await User.findByPk(userId);
    const bus = await Bus.findByPk(busId);

    if (!user || !bus) {
      return res.status(404).json({ error: "User or Bus not found" });
    }

    const newBooking = await Booking.create({
      seatNumber: seatNumber,
      userId: userId,
      busId: busId,
    });

    const bookingDetails = await Booking.findByPk(newBooking.id, {
      include: [
        { model: User, attributes: ["name", "email"] },
        { model: Bus, attributes: ["busNumber"] },
      ],
    });

    res.status(201).json(bookingDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get ALL Bookings in the system
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ["name", "email"] },
        { model: Bus, attributes: ["busNumber"] },
      ],
      // Optional: Sort by newest first
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addBooking,
  getAllBookings, // Don't forget to export it
};
