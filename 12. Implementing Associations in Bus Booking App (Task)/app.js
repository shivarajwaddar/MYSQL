const express = require("express");
const db = require("./utils/db-connnection");
const userRouter = require("./routes/userRoute");
const busRouter = require("./routes/busRoute");
const bookingRouter = require("./routes/bookingRoute");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to homepage");
});

app.use("/users", userRouter);
app.use("/buses", busRouter);
app.use("/booking", bookingRouter);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
