const GeneratedCode = require('../models/GeneratedCode');
const { generateCodeFromImage } = require('../services/geminiService');
const path = require('path');
const fs = require('fs');

// @desc    Upload image and generate code
// @route   POST /api/code/generate
const generateCode = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const { outputType } = req.body;
    if (!['html', 'react'].includes(outputType)) {
      return res.status(400).json({ message: 'Invalid output type' });
    }

    const imagePath = path.join(__dirname, '../', req.file.path);
    const code = await generateCodeFromImage(imagePath, outputType);

    // Save to database
    const generatedCode = await GeneratedCode.create({
      user: req.userId,
      originalImage: req.file.filename,
      [outputType === 'html' ? 'htmlCode' : 'reactCode']: code,
      outputType,
    });

    // Delete the uploaded file after processing
    fs.unlink(imagePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.status(201).json({
      id: generatedCode._id,
      code,
      outputType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get all generated codes for user
// @route   GET /api/code/history
const getCodeHistory = async (req, res) => {
  try {
    const codes = await GeneratedCode.find({ user: req.userId })
      .sort('-createdAt')
      .select('-user -__v');

    res.status(200).json(codes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single generated code
// @route   GET /api/code/:id
const getCodeById = async (req, res) => {
  try {
    const code = await GeneratedCode.findOne({
      _id: req.params.id,
      user: req.userId,
    }).select('-user -__v');

    if (!code) {
      return res.status(404).json({ message: 'Code not found' });
    }

    res.status(200).json(code);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { generateCode, getCodeHistory, getCodeById };