const express = require('express');
const router = express.Router();
const { categoriseComplaint, generateDueReminder, detectExpenseAnomaly } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/categorise', protect, categoriseComplaint);
router.post('/reminder', protect, authorizeRoles('admin'), generateDueReminder);
router.get('/anomaly', protect, authorizeRoles('admin'), detectExpenseAnomaly);

module.exports = router;