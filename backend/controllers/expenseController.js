const Expense = require('../models/Expense');
const Maintenance = require('../models/Maintenance');

// Admin: add expense
const addExpense = async (req, res) => {
  try {
    const { category, description, amount, date } = req.body;
    const expense = await Expense.create({
      society: req.user.society,
      category, description, amount, date,
      addedBy: req.user._id,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ society: req.user.society })
      .populate('addedBy', 'name')
      .sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: delete expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: income vs expense dashboard
const getDashboard = async (req, res) => {
  try {
    const expenses = await Expense.find({ society: req.user.society });
    const bills = await Maintenance.find({ society: req.user.society });

    const totalIncome = bills
      .filter(b => b.status === 'Paid')
      .reduce((sum, b) => sum + b.totalAmount, 0);

    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Group expenses by category
    const expenseByCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

    // Group income by month
    const incomeByMonth = bills
      .filter(b => b.status === 'Paid')
      .reduce((acc, b) => {
        const key = `${b.month} ${b.year}`;
        acc[key] = (acc[key] || 0) + b.totalAmount;
        return acc;
      }, {});

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      expenseByCategory,
      incomeByMonth,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addExpense, getAllExpenses, deleteExpense, getDashboard };