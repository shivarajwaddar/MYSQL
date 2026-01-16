const express = require("express");
const db = require("./Utils/db-connection");
const studentRouter = require("./routes/studentRoute");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.use("/student", studentRouter);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
