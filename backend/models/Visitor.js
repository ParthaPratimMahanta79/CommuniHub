const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  society: { type: String, required: true },
  visitorName: { type: String, required: true },
  visitorPhone: { type: String },
  vehicleNumber: { type: String },
  expectedArrival: { type: Date },
  otp: { type: String },
  otpVerified: { type: Boolean, default: false },
  entryTime: { type: Date },
  exitTime: { type: Date },
  photo: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Entered', 'Exited'],
    default: 'Pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);