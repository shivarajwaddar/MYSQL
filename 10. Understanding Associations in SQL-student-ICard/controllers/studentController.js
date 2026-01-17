const Student = require("../Module/students");
const identity = require("../Module/identity-card");
const Department = require("../Module/department");

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

// send data from postman
// {

//     "student":{"name": "virat", "email": "virat@example.com"},
//     "identityCard":{"cardNumber": 12344}

// }

const addingValuesToStudentAndIdentityTable = async (req, res) => {
  try {
    const student = await Student.create(req.body.student);
    const idCard = await identity.create({
      ...req.body.identityCard,
      studentId: student.id,
    });

    res.status(201).json({ student, idCard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// send data fro postman
// {
//   "department": {
//     "name": "Commerce"
//   },
//   "Student": {
//     "name": "Shivaraj",
//     "email": "shiva@example.com"
//   }
// }
const addStudentToDepartment = async (req, res) => {
  try {
    // 1. Manually look for the department
    let dept = await Department.findOne({
      where: { name: req.body.department.name },
    });

    // 2. If it doesn't exist, create it
    if (!dept) {
      dept = await Department.create({ name: req.body.department.name });
    }

    // 3. Create student
    const newStudent = await Student.create({
      ...req.body.Student,
      departmentId: dept.id,
    });

    res.status(201).json({ student: newStudent, department: dept });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  addingValuesToStudentAndIdentityTable,
  addStudentToDepartment,
};
