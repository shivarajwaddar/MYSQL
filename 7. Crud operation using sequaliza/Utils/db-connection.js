const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

const sequelize = new Sequelize("testDB", "root", "Shiva@123", {
  host: "localhost",
  dialect: "mysql",
});

// Using a named function for better debugging
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
}

connectDB();

module.exports = sequelize;

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Shiva@123",
//   database: "testDB",
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Database connection failed: " + err.stack);
//     return;
//   }
//   console.log("Connected to MySQL database.");

//    Use IF NOT EXISTS to prevent errors on server restart
//   const createQuery = `CREATE TABLE IF NOT EXISTS students(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(50),
//     email VARCHAR(50),
//     age INT
//   )`;

//   connection.execute(createQuery, (err) => {
//     if (err) {
//       // If it fails, we just log it and keep the connection open
//       console.log("Table check/creation error:", err.message);
//       return;
//     }
//     console.log("Table 'student' is ready to use.");
//   });
// });

// module.exports = connection;
