const mongoose = require('mongoose');

const generatedCodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalImage: {
    type: String,
    required: true,
  },
  htmlCode: {
    type: String,
  },
  cssCode: {
    type: String,
  },
  reactCode: {
    type: String,
  },
  outputType: {
    type: String,
    enum: ['html', 'react'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('GeneratedCode', generatedCodeSchema);