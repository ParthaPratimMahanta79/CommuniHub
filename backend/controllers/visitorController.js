const Visitor = require('../models/Visitor');
const generateOTP = require('../utils/generateOTP');

// Resident: pre-approve a visitor
const preApproveVisitor = async (req, res) => {
  try {
    const { visitorName, visitorPhone, vehicleNumber, expectedArrival } = req.body;
    const otp = generateOTP();

    const visitor = await Visitor.create({
      resident: req.user._id,
      society: req.user.society,
      visitorName, visitorPhone, vehicleNumber, expectedArrival,
      otp, status: 'Approved',
    });

    res.status(201).json({ 
      visitor,
      message: `Share this OTP with your visitor: ${otp}` 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resident: get my visitors
const getMyVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({ resident: req.user._id }).sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Guard: verify OTP and log entry
const verifyAndLogEntry = async (req, res) => {
  try {
    const { otp, photo, vehicleNumber } = req.body;
    const visitor = await Visitor.findOne({ 
      otp, 
      society: req.user.society,
      status: 'Approved' 
    });

    if (!visitor) return res.status(404).json({ message: 'Invalid OTP or visitor not found' });

    visitor.otpVerified = true;
    visitor.entryTime = new Date();
    visitor.status = 'Entered';
    if (photo) visitor.photo = photo;
    if (vehicleNumber) visitor.vehicleNumber = vehicleNumber;
    await visitor.save();

    res.json({ message: 'Visitor entry logged', visitor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Guard: log exit
const logExit = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { exitTime: new Date(), status: 'Exited' },
      { new: true }
    );
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json({ message: 'Exit logged', visitor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Guard/Admin: get all visitors today
const getTodayVisitors = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const visitors = await Visitor.find({
      society: req.user.society,
      createdAt: { $gte: start, $lte: end }
    }).populate('resident', 'name flatNumber').sort({ createdAt: -1 });

    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { preApproveVisitor, getMyVisitors, verifyAndLogEntry, logExit, getTodayVisitors };