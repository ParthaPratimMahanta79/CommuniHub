const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  society: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Lift Maintenance', 'Garden', 'Security Staff', 'Cleaning', 'Electricity', 'Other'],
    required: true 
  },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);