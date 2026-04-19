const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { 
    type: String, 
    enum: ['Plumbing', 'Electrical', 'Cleanliness', 'Security', 'Noise', 'Other'],
    required: true 
  },
  description: { type: String, required: true },
  photo: { type: String },
  status: { 
    type: String, 
    enum: ['Raised', 'Assigned', 'In Progress', 'Resolved'],
    default: 'Raised'
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  society: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);