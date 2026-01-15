const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shiva@123",
  database: "testDB",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");

  // Use IF NOT EXISTS to prevent errors on server restart
  const createQuery = `CREATE TABLE IF NOT EXISTS student(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20)
  )`;

  connection.execute(createQuery, (err) => {
    if (err) {
      // If it fails, we just log it and keep the connection open
      console.log("Table check/creation error:", err.message);
      return;
    }
    console.log("Table 'student' is ready to use.");
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
