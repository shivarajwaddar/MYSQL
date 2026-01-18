const express = require("express");
const expenseController = require("../controllers/expense");

const router = express.Router();

router.get("/getexpenses", expenseController.getExpenses);
router.post("/addexpense", expenseController.addExpense);
router.put("/editexpense/:id", expenseController.editExpense);
router.delete("/deleteexpense/:id", expenseController.deleteExpense);

module.exports = router;
