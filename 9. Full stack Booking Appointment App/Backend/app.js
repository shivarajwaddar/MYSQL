const express = require("express");
const db = require("./utils/db-connnection");
const userRouter = require("./routes/userRoute");
const cors = require("cors"); // 1. Import CORS
const busRouter = require("./routes/busRoute");
const app = express();
app.use(cors()); // 2. Enable CORS for all origins
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to homepage");
});

app.use("/users", userRouter);
// app.use("/buses", busRouter);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
