const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  facility: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'feedback'], default: 'pending' },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);
