const User = require("../models/userModel");

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
module.exports = {
  adduser,
  getuser,
};
