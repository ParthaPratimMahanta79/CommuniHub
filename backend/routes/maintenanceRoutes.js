const express = require('express');
const router = express.Router();
const { generateBill, getMyBills, getAllBills, payBill } = require('../controllers/maintenanceController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/generate', protect, authorizeRoles('admin'), generateBill);
router.get('/my', protect, authorizeRoles('resident'), getMyBills);
router.get('/all', protect, authorizeRoles('admin'), getAllBills);
router.put('/pay/:id', protect, authorizeRoles('resident'), payBill);

module.exports = router;