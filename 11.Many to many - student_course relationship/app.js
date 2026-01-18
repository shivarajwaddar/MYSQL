// npm install --save sequelize
const express = require("express");
const db = require("./Utils/db-connection");
const studentRouter = require("./routes/studentRoute");
const courseRouter = require("./routes/courseRoute");
// Student Model
const { Student, identityCard } = require("./Module/index");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.use("/students", studentRouter);
app.use("/course", courseRouter);

db.sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
