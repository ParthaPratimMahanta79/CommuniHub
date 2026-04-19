const express = require('express');
const router = express.Router();
const { raiseComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, authorizeRoles('resident'), raiseComplaint);
router.get('/my', protect, authorizeRoles('resident'), getMyComplaints);
router.get('/all', protect, authorizeRoles('admin'), getAllComplaints);
router.put('/:id', protect, authorizeRoles('admin'), updateComplaintStatus);

module.exports = router;