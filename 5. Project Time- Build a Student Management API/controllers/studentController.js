const db = require("../Utils/db-connection");

// 1. Retrieve all students
const getStudents = (req, res) => {
  const getQuery = `SELECT * FROM students`;

  db.execute(getQuery, (err, result) => {
    if (err) {
      console.log("error while getting students", err.message);
      return res.status(500).send(err.message);
    }

    // FIXED: Use result.length for SELECT queries
    if (result.length === 0) {
      console.log("No students found");
      return res.status(404).send("No students found in the database.");
    }

    console.log("Students fetched successfully");
    res.status(200).json(result);
  });
};

// 2. Get single student
const getSingleStudent = (req, res) => {
  const { id } = req.params;
  const getQuery = `SELECT * FROM students WHERE id=?`;

  db.execute(getQuery, [id], (err, result) => {
    if (err) {
      console.log("error while getting student", err.message);
      return res.status(500).send(err.message);
    }

    // FIXED: Use result.length for SELECT queries
    if (result.length === 0) {
      console.log(`Student with ID ${id} is not found`);
      return res.status(404).send(`Student with ID ${id} is not found`);
    }

    console.log("Student fetched successfully");
    // OPTIMIZED: Return result[0] to send the object instead of an array
    res.status(200).json(result[0]);
  });
};

// 3. Adding a student
const addStudent = (req, res) => {
  const { name, email, age } = req.body;
  const insertQuery = `INSERT INTO students(name, email, age) VALUES(?,?, ?)`;

  db.execute(insertQuery, [name, email, age], (err) => {
    if (err) {
      console.log("error while adding student", err.message);
      return res.status(500).send(err.message);
    }
    console.log("student is added");
    res.status(201).send(`student with name ${name} is added`);
  });
};

// 4. Updating a student
const updateStudent = (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  const updateQuery = `UPDATE students SET name=?, email=? WHERE id=?`;
  db.execute(updateQuery, [name, email, id], (err, result) => {
    if (err) {
      console.log("error while updating student", err.message);
      return res.status(500).send(err.message);
    }

    if (result.affectedRows === 0) {
      console.log(`Student with ID ${id} is not found`);
      return res.status(404).send(`Student with ID ${id} is not found`);
    }

    console.log("Student updated successfully");
    res.status(200).send("Student updated successfully");
  });
};

// 5. Deleting a student
const deleteStudent = (req, res) => {
  const { id } = req.params;
  // FIXED: Changed table name to 'students' to stay consistent
  const deleteQuery = `DELETE FROM students WHERE id=?`;

  db.execute(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log("error while deleting student", err.message);
      return res.status(500).send(err.message);
    }

    if (result.affectedRows === 0) {
      console.log(`Student with ID ${id} is not found`);
      return res.status(404).send(`Student with ID ${id} is not found`);
    }

    console.log("Student deleted successfully");
    res.status(200).send("User deleted successfully");
  });
};

module.exports = {
  getStudents,
  getSingleStudent,
  addStudent,
  updateStudent,
  deleteStudent,
};
