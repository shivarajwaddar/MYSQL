const express = require("express");
const db = require("./utils/db-connection");
const cors = require("cors"); // 1. Import CORS
const expenseRouter = require("./routes/expense");

const app = express();
app.use(express.json());
// 2. Enable CORS for all origins
app.use(cors());

app.use("/expense", expenseRouter);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
