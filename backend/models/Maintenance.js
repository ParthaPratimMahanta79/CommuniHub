const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  society: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  breakdown: {
    maintenance: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    parking: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' },
  paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);