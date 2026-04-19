const Facility = require('../models/Facility');

// Resident: book a facility
const bookFacility = async (req, res) => {
  try {
    const { name, date, startTime, endTime } = req.body;

    // Check for conflicts
    const conflict = await Facility.findOne({
      name, date, society: req.user.society,
      status: 'Approved',
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ 
        message: `${name} is already booked from ${conflict.startTime} to ${conflict.endTime} on ${date}` 
      });
    }

    const booking = await Facility.create({
      name, date, startTime, endTime,
      society: req.user.society,
      bookedBy: req.user._id,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resident: get my bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Facility.find({ bookedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Facility.find({ society: req.user.society })
      .populate('bookedBy', 'name flatNumber')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: approve or reject booking
const updateBookingStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const booking = await Facility.findByIdAndUpdate(
      req.params.id,
      { status, rejectionReason },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookFacility, getMyBookings, getAllBookings, updateBookingStatus };