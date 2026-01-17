const User = require("../models/userModel");

const adduser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    console.log(name, email, phone);
    const user = await User.create({ name, email, phone });
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

const deleteuser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("user not found");

    await user.destroy();
    res.status(200).send("user deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateuser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send("user not found");

    // Add phone here so it updates too
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    await user.save();
    res.status(200).json({ message: "Updated", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  adduser,
  getuser,
  deleteuser,
  updateuser,
};
