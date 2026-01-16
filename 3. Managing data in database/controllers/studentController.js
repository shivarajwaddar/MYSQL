const db = require("../Utils/db-connection");

const addStudent = (req, res) => {
  const { name, email } = req.body;
  const insertQuery = `INSERT INTO student(name, email) VALUES(?,?)`;

  db.execute(insertQuery, [name, email], (err) => {
    if (err) {
      console.log("error while adding student", err.message);
      return res.status(500).send(err.message);
    }
    console.log("Value is added");
    res.status(200).send(`student with name ${name} is added`);
  });
};

const updateStudent = (req, res) => {
  const { name } = req.body;
  // FIX: Destructure id from req.params
  const { id } = req.params;

  const updateQuery = `UPDATE student SET name=? WHERE id=?`;

  // FIX: Passing the actual id value in the array
  db.execute(updateQuery, [name, id], (err, result) => {
    if (err) {
      console.log("eeror while updating student", err.message);
      return res.status(500).send(err.message);
    }

    if (result.affectedRows === 0) {
      console.log("Student not found");
      // Use 404 for "Not Found"
      return res.status(404).send("Student not found");
    }

    console.log("Student updated successfully");
    res.status(200).send("User updated successfully");
  });
};

const deleteStudent = (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM student WHERE id=?`;

  // FIX: Passing the actual id value in the array
  db.execute(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log("error while deleting studenmt", err.message);
      return res.status(500).send(err.message);
    }

    if (result.affectedRows === 0) {
      console.log("Student not found");
      // Use 404 for "Not Found"
      return res.status(404).send("Student not found");
    }

    console.log("Student Deleted successfully");
    res.status(200).send("User deleted successfully");
  });
};

// FIX: Export both functions
module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
};
