const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shiva@123",
  database: "testDB",
});

connection.connect((err) => {
  if (err) {
    console.log("error while connection to Database", err.message);
    return;
  }

  console.log("Connected to MySQL database.");

  const userQuery = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50)
  )`;

  const busesQuery = `CREATE TABLE IF NOT EXISTS buses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    busNumber INT,
    totalSeats INT,
    availableSeats INT
  )`;

  // Put them in an array in order of creation
  const queries = [userQuery, busesQuery];

  // Execute each query
  queries.forEach((q) => {
    connection.execute(q, (err) => {
      if (err) console.log("Error creating table:", err.message);
    });
  });

  console.log("All tables checked/created successfully.");
});

module.exports = connection;
