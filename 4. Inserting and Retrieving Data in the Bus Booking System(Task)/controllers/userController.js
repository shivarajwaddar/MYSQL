const db = require("../utils/db-connection");

const adduser = (req, res) => {
  const { name, email } = req.body;

  const insertQuery = `INSERT INTO users(name, email) VALUES(?, ?)`;

  db.execute(insertQuery, [name, email], (err) => {
    if (err) {
      console.log("error while adding user", err.message);
      return res.status(500).send("error while adding user");
    }

    console.log(`user ${name} added successfully`);
    res.status(201).send(`user ${name} added to database`);
  });
};

const getuser = (req, res) => {
  const getQuery = `SELECT * FROM users`;

  // Added 'results' to the callback to capture the rows from the DB
  db.execute(getQuery, (err, results) => {
    if (err) {
      console.log("Error fetching users:", err.message);
      return res.status(500).send("Error fetching users from database");
    }

    // 'results' is an array of objects representing your users
    console.log("Users retrieved successfully");

    // Send the data back as JSON
    res.status(200).json(results);
  });
};
module.exports = {
  adduser,
  getuser,
};
