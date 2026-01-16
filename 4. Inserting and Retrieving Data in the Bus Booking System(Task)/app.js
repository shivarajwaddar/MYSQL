const express = require("express");
const userRouter = require("./routers/userRouter");
const busesRouter = require("./routers//busesRouter");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to hmepage");
});

app.use("/users", userRouter);
app.use("/buses", busesRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
