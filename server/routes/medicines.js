const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');

// Add Medicine (Admin only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin access required' });

  const { name, quantity, expiryDate, facility } = req.body;
  try {
    const medicine = new Medicine({ name, quantity, expiryDate, facility, addedBy: req.user.id });
    await medicine.save();
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Medicines (Filtered by facility)
router.get('/', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ facility: req.user.facility });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
