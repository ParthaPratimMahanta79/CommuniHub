const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: { 
    type: String, 
    enum: ['Clubhouse', 'Gym', 'Swimming Pool', 'Conference Room'],
    required: true 
  },
  society: { type: String, required: true },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  rejectionReason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Facility', facilitySchema);