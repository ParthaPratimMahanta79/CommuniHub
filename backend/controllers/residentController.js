const User = require('../models/User');

// Admin: get all residents in society
const getAllResidents = async (req, res) => {
  try {
    const residents = await User.find({ 
      society: req.user.society, 
      role: 'resident' 
    }).select('-password').sort({ createdAt: -1 });
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get single resident
const getResidentById = async (req, res) => {
  try {
    const resident = await User.findById(req.params.id).select('-password');
    if (!resident) return res.status(404).json({ message: 'Resident not found' });
    res.json(resident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: update resident (flat number, parking slot etc)
const updateResident = async (req, res) => {
  try {
    const { flatNumber, phone, name } = req.body;
    const resident = await User.findByIdAndUpdate(
      req.params.id,
      { flatNumber, phone, name },
      { new: true }
    ).select('-password');
    if (!resident) return res.status(404).json({ message: 'Resident not found' });
    res.json(resident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: remove resident
const deleteResident = async (req, res) => {
  try {
    const resident = await User.findByIdAndDelete(req.params.id);
    if (!resident) return res.status(404).json({ message: 'Resident not found' });
    res.json({ message: 'Resident removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllResidents, getResidentById, updateResident, deleteResident };