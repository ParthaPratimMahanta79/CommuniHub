const Maintenance = require('../models/Maintenance');

// Admin: generate bill for a resident
const generateBill = async (req, res) => {
  try {
    const { residentId, month, year, breakdown } = req.body;
    const totalAmount = Object.values(breakdown).reduce((a, b) => a + b, 0);

    const bill = await Maintenance.create({
      resident: residentId,
      society: req.user.society,
      month, year, breakdown, totalAmount,
    });
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resident: get my bills
const getMyBills = async (req, res) => {
  try {
    const bills = await Maintenance.find({ resident: req.user._id }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Maintenance.find({ society: req.user.society })
      .populate('resident', 'name flatNumber')
      .sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resident: pay bill
const payBill = async (req, res) => {
  try {
    const bill = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status: 'Paid', paidAt: new Date() },
      { new: true }
    );
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateBill, getMyBills, getAllBills, payBill };