const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const auth = require('../middleware/auth');

// Submit Report
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const report = new Report({
      title,
      content,
      submittedBy: req.user.id,
      facility: req.user.facility,
    });
    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Reports (Admin sees all, users see their own)
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? { facility: req.user.facility } : { submittedBy: req.user.id };
    const reports = await Report.find(query).populate('submittedBy', 'email');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Review Report (Admin only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin access required' });

  const { status, feedback } = req.body;
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ msg: 'Report not found' });

    report.status = status;
    report.feedback = feedback;
    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
