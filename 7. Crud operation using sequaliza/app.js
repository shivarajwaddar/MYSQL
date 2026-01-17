// npm install --save sequelize
const express = require("express");
const db = require("./Utils/db-connection");
const studentRouter = require("./routes/studentRoute");
// Student Model
const StudentModel = require("./Module/students");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.use("/students", studentRouter);

db.sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
