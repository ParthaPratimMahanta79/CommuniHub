const express = require('express');
const router = express.Router();
const { preApproveVisitor, getMyVisitors, verifyAndLogEntry, logExit, getTodayVisitors } = require('../controllers/visitorController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/preapprove', protect, authorizeRoles('resident'), preApproveVisitor);
router.get('/my', protect, authorizeRoles('resident'), getMyVisitors);
router.post('/verify-entry', protect, authorizeRoles('guard'), verifyAndLogEntry);
router.put('/exit/:id', protect, authorizeRoles('guard'), logExit);
router.get('/today', protect, authorizeRoles('guard', 'admin'), getTodayVisitors);

module.exports = router;