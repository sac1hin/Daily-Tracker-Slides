const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  label: { type: String, default: '' },
  url: { type: String, default: '' }
}, { _id: false });

const entrySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    min: 1
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  problem: {
    type: String,
    default: '',
    trim: true
  },
  learned: {
    type: String,
    default: '',
    trim: true
  },
  links: {
    type: [linkSchema],
    default: []
  },
  iterations: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for efficient querying
entrySchema.index({ day: 1 });
entrySchema.index({ createdAt: -1 });

module.exports = mongoose.models.Entry || mongoose.model('Entry', entrySchema);
