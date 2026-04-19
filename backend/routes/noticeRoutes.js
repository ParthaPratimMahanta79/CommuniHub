const express = require('express');
const router = express.Router();
const { createNotice, getNotices, deleteNotice } = require('../controllers/noticeController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, authorizeRoles('admin'), createNotice);
router.get('/', protect, getNotices);
router.delete('/:id', protect, authorizeRoles('admin'), deleteNotice);

module.exports = router;