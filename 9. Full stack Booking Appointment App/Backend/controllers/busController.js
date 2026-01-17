const { Op } = require("sequelize");

Bus = require("../models/busModel");

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

module.exports = {
  getbuses,
  addbuses,
};
