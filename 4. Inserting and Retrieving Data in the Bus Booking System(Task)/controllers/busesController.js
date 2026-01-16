const db = require("../utils/db-connection");

const addbuses = (req, res) => {
  const { busNumber, totalSeats, availableSeats } = req.body;

  const insertQuery = `INSERT INTO buses(busNumber, totalSeats, availableSeats) VALUES(?,?,?)`;

  db.execute(insertQuery, [busNumber, totalSeats, availableSeats], (err) => {
    if (err) {
      console.log("Error while adding bus:", err.message);
      return res.status(500).send("Error while adding bus");
    }

    // Fixed: Changed "user" to "bus"
    console.log(`Bus ${busNumber} added successfully`);
    res.status(201).send(`Bus ${busNumber} added to database`);
  });
};

const getbuses = (req, res) => {
  const { seats } = req.params;

  // This query finds buses that have MORE THAN 'seats' available
  const getQuery = `SELECT * FROM buses WHERE availableSeats > ?`;

  db.execute(getQuery, [seats], (err, results) => {
    if (err) {
      console.log("Error fetching Buses:", err.message);
      return res.status(500).send("Error fetching buses from database");
    }

    // Using your blue console here would be great!
    console.log(
      `Found ${results.length} buses with more than ${seats} seats available.`
    );

    res.status(200).json(results);
  });
};

module.exports = {
  getbuses,
  addbuses,
};
