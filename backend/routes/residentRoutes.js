const express = require('express');
const router = express.Router();
const { getAllResidents, getResidentById, updateResident, deleteResident } = require('../controllers/residentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/', protect, authorizeRoles('admin'), getAllResidents);
router.get('/:id', protect, authorizeRoles('admin'), getResidentById);
router.put('/:id', protect, authorizeRoles('admin'), updateResident);
router.delete('/:id', protect, authorizeRoles('admin'), deleteResident);

module.exports = router;