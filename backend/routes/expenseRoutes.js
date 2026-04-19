const express = require('express');
const router = express.Router();
const { addExpense, getAllExpenses, deleteExpense, getDashboard } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, authorizeRoles('admin'), addExpense);
router.get('/', protect, authorizeRoles('admin'), getAllExpenses);
router.delete('/:id', protect, authorizeRoles('admin'), deleteExpense);
router.get('/dashboard', protect, authorizeRoles('admin'), getDashboard);

module.exports = router;