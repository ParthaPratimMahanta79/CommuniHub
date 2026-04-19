const express = require('express');
const router = express.Router();
const { bookFacility, getMyBookings, getAllBookings, updateBookingStatus } = require('../controllers/facilityController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, authorizeRoles('resident'), bookFacility);
router.get('/my', protect, authorizeRoles('resident'), getMyBookings);
router.get('/all', protect, authorizeRoles('admin'), getAllBookings);
router.put('/:id', protect, authorizeRoles('admin'), updateBookingStatus);

module.exports = router;