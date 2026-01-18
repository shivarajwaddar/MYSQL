const Student = require("../Module/students");

// CREATE
const addStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = await Student.create({ name, email });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE (Using findByPk)
const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).send("Student not found");

    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;

    await student.save();
    res.status(200).json({ message: "Updated", data: student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (Using findByPk)
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).send("Student not found");

    await student.destroy();
    res.status(200).send("Student deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
};
