const Expense = require("../models/expensemodel");

const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const expense = await Expense.create({ amount, description, category });

    res.status(201).json(expense);
  } catch (err) {
    console.log(err.message);
    (res.status(5000), json({ error: err.message }));
  }
};

const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body; // 1. Get new data from body

    // 2. Find the expense in the database
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // 3. Update the values
    expense.amount = amount;
    expense.description = description;
    expense.category = category;

    // 4. Save to SQL
    await expense.save();

    // 5. Send back the updated object (Status 200 is better for updates)
    res.status(200).json(expense);
  } catch (err) {
    console.error("Error in editExpense:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    // 1. Find the record
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // 2. Await the destruction (crucial to ensure it's deleted from SQL)
    await expense.destroy();

    // 3. Send success response (204 No Content or 200 OK)
    res.status(200).json({ message: "Deleted successfully", id: id });
  } catch (err) {
    console.error("Delete Error:", err.message);
    // Fixed status code and syntax
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getExpenses = async (req, res) => {
  try {
    // 1. Fetch all records from the Expense table
    const expenses = await Expense.findAll();

    // 2. Send the data back to the frontend with a 200 OK status
    res.status(200).json(expenses);
  } catch (err) {
    console.log("Error in getExpenses:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addExpense,
  editExpense,
  deleteExpense,
  getExpenses,
};
