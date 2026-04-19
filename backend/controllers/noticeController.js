const Notice = require('../models/Notice');

// Admin: post a notice
const createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = await Notice.create({
      title,
      content,
      society: req.user.society,
      postedBy: req.user._id,
    });
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// All: get all notices for society
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ society: req.user.society })
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: delete a notice
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });
    res.json({ message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNotice, getNotices, deleteNotice };