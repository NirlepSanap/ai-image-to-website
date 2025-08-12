const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload'); // Make sure this path is correct

// POST /api/code/generate
router.post('/generate', 
  auth, 
  upload.single('image'), // Now this should work
  codeController.generateCode
);

// GET /api/code/history
router.get('/history', auth, codeController.getCodeHistory);

// GET /api/code/:id
router.get('/:id', auth, codeController.getCodeById);

module.exports = router;