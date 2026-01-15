const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shiva@123",
  database: "testdb",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");

  // TABLE SCHEMAS
  const usersQuery = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20)
  )`;

  const busesQuery = `CREATE TABLE IF NOT EXISTS buses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    busNumber INT,
    totalSeats INT,
    availableSeats INT
  )`;

  // Child Tables (Have Foreign Keys)
  const bookingQuery = `CREATE TABLE IF NOT EXISTS booking(
    id INT AUTO_INCREMENT PRIMARY KEY,
    seatNumber INT
    
  )`;

  const paymentQuery = `CREATE TABLE IF NOT EXISTS payment(
    id INT AUTO_INCREMENT PRIMARY KEY,
    amountPaid INT,
    paymentStatus VARCHAR(20)
   
  )`;

  // Put them in an array in order of creation
  const queries = [usersQuery, busesQuery, bookingQuery, paymentQuery];

  // Execute each query
  queries.forEach((q) => {
    connection.execute(q, (err) => {
      if (err) console.log("Error creating table:", err.message);
    });
  });

  console.log("All tables checked/created successfully.");
});

app.listen(3400, () => {
  console.log("Server running on port 3400");
});
